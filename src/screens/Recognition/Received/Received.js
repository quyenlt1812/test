import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, FlatList, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import LottieView from 'lottie-react-native';
import uuid from 'react-native-uuid';
import Box from '../../../components/Box';
import Text, {TextWeight} from '../../../components/Text';
import colors from '../../../constants/colors';
import SegmentedRoundDisplay from '../../../libs/ReactNativeSegment';
import Cellphone from '../../../assets/images/cellphone.svg';
import {useDispatch, useSelector} from 'react-redux';
import {getCurrentUser} from '../../../services/Users/selectors';
import {
  getReceivedRecognition,
  getTopValues,
} from '../../../services/Recognition/selectors';
import Avatar from '../../../components/Avatar';
import styles from './styles';
import {SvgUri} from 'react-native-svg';
import RecognitionActions from '../../../services/Recognition/actions';
import Dino from '../../../assets/images/dino.svg';
import {toNow} from '../../../utils/DateHelper';
import BlankValue from '../../../assets/images/blank-value.svg';
import NavigationService from '../../../services/Navigation';

const WIDTH = Dimensions.get('window').width;

const example = {
  displayValue: false,
  animated: true,
  formatValue: (value) => `R$ ${value.toFixed(2)}`,
  filledArcWidth: 12,
  emptyArcWidth: 12,
  totalArcSize: 210,
  radius: 130,
  emptyArcColor: colors.WHITESMOKE,
  arcSpacing: 0,
  segments: [
    {
      total: 1000,
      filled: 1000,
    },
  ],
};

const ListHeader = () => {
  const {t} = useTranslation();
  const currentUser = useSelector(getCurrentUser);
  const topValues = useSelector(getTopValues);
  const [activeTab, setActiveTab] = useState(0);
  const _carousel = useRef();

  const _renderItem = ({item}) => {
    switch (item.type) {
      case 'chart':
        return (
          <Box
            key={0}
            width={WIDTH}
            height={220}
            alignItems="center"
            justifyContent="center">
            <SegmentedRoundDisplay {...example} style={styles.segment} />
            <Box alignItems="center" style={styles.segmentContentContainer}>
              <Cellphone />
              <Text
                mt={6}
                weight={TextWeight.EXTRABOLD}
                color={colors.SECONDARY_TEXT}>
                {t('you-have-received')}
              </Text>
              <Text weight={TextWeight.BOLD} size={32}>
                {currentUser?.recognition_receive}
              </Text>
              <Text
                size={14}
                weight={TextWeight.SEMIBOLD}
                color={colors.SECONDARY_TEXT}>
                {Number.parseInt(currentUser?.recognition_receive, 10) > 1
                  ? t('points').toLowerCase()
                  : t('point').toLowerCase()}
              </Text>
            </Box>
          </Box>
        );
      case 'topValues':
        return (
          <Box key={1} width={WIDTH} mt={20} justifyContent="center">
            <Box px={15}>
              {topValues.length !== 0 && (
                <Text size={20} weight={TextWeight.BOLD} mb={18}>
                  {t('your-top-values')}
                </Text>
              )}
              {topValues.length !== 0 ? (
                <Box
                  flexDirection="row"
                  alignItems="flex-start"
                  justifyContent={'space-between'}>
                  {topValues.map((value) => (
                    <Box
                      key={value?.badge_id}
                      alignItems="center"
                      px={10}
                      width={(Dimensions.get('window').width - 30) / 3}>
                      <LinearGradient
                        start={{x: 0.0, y: 0.25}}
                        end={{x: 0.5, y: 1.0}}
                        locations={[0, 0.9]}
                        colors={['rgb(43, 218, 142)', 'rgb(10, 196, 186)']}
                        style={styles.topValueIcon}>
                        <Box width={40} height={40}>
                          <SvgUri
                            width="100%"
                            height="100%"
                            uri={value?.icon_url}
                            fill={colors.WHITE}
                          />
                        </Box>
                      </LinearGradient>
                      <Text
                        align="center"
                        mt={10}
                        lineHeight={26}
                        numberOfLines={2}>
                        {value?.title}
                      </Text>
                    </Box>
                  ))}
                  {[...new Array(3 - topValues.length)].map((_, index) => (
                    <Box
                      key={index}
                      alignItems="center"
                      px={10}
                      width={(Dimensions.get('window').width - 30) / 3}>
                      <Box width={72} height={72}>
                        <BlankValue />
                      </Box>
                      <Box
                        width={50}
                        height={14}
                        backgroundColor={colors.GAINSBORO}
                        borderRadius={4}
                        mt={15}
                      />
                      <Box
                        width={70}
                        height={14}
                        backgroundColor={colors.GAINSBORO}
                        borderRadius={4}
                        mt={15}
                      />
                    </Box>
                  ))}
                </Box>
              ) : (
                <Text
                  color={colors.SECONDARY_TEXT}
                  align="center"
                  py={60}
                  style={{width: '100%'}}>
                  {t('top-values-empty')}
                </Text>
              )}
            </Box>
          </Box>
        );
    }
  };

  return (
    <Box width="100%" height={230}>
      <Carousel
        currentIndex={activeTab}
        useScrollView
        ref={_carousel}
        data={[{type: 'chart'}, {type: 'topValues'}]}
        renderItem={_renderItem}
        sliderWidth={WIDTH}
        itemWidth={WIDTH}
        onSnapToItem={(index) => setActiveTab(index)}
      />
      <Box
        mb={16}
        flexDirection="row"
        alignItems="center"
        justifyContent="center">
        <LinearGradient
          colors={
            activeTab === 0
              ? [colors.LIGHTGREEN, colors.GREEN]
              : [colors.GAINSBORO, colors.GAINSBORO]
          }
          style={styles.indicator}
        />
        <LinearGradient
          colors={
            activeTab === 1
              ? [colors.LIGHTGREEN, colors.GREEN]
              : [colors.GAINSBORO, colors.GAINSBORO]
          }
          style={styles.indicator}
        />
      </Box>
    </Box>
  );
};

const Received = ({}) => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const recognitions = useSelector(getReceivedRecognition);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setRefreshing(false);
  }, [recognitions]);

  const handleLoadMore = () => {
    if (recognitions.hasNext) {
      dispatch(
        RecognitionActions.getReceivedRecognitions(recognitions.offset + 1),
      );
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(RecognitionActions.getReceivedRecognitions(0));
  };

  if (!recognitions?.list?.length) {
    return (
      <Box width={Dimensions.get('window').width} alignItems="center">
        <ListHeader />
        <Box alignItems="center" justifyContent="center" style={{flex: 1}}>
          <Text weight={TextWeight.SEMIBOLD} size={18} mb={10}>
            {t('need-love')}
          </Text>
          <Dino />
          <Text mt={5} mb={20} color={colors.SECONDARY_TEXT}>
            {t('giving-recommend')}
          </Text>
        </Box>
        <Box width={50} height={50} mb={15}>
          <LottieView source={require('./arrow.json')} autoPlay loop />
        </Box>
      </Box>
    );
  }

  const renderItem = ({item}) => {
    switch (item.id) {
      case 'title':
        return (
          <Box backgroundColor={colors.WHITE} pb={10} px={15}>
            <Text size={20} weight={TextWeight.BOLD} lineHeight={30}>
              {t('recognition-list', {total: recognitions.total})}
            </Text>
          </Box>
        );
      default:
        return (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              navigation.navigate(
                NavigationService.Screens.RECOGNITION_DETAIL,
                {
                  ...item,
                  title: item?.sender?.name,
                },
              )
            }>
            <Box
              flexDirection="row"
              alignItems="flex-start"
              height={95}
              style={{borderBottomWidth: 1, borderColor: '#EFEFEF'}}
              pt={14}
              pb={12}
              px={15}>
              <Avatar
                src={item?.sender?.avatar}
                alt={item?.sender?.name}
                size={50}
              />
              <Box ml={16} style={styles.fullFlex}>
                <Box
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between">
                  <Text
                    size={18}
                    weight={TextWeight.BOLD}
                    style={{flex: 1}}
                    mr={20}
                    numberOfLines={1}>
                    {item?.sender?.name}
                  </Text>
                  <Text size={12} color={colors.SECONDARY_TEXT}>
                    {`${toNow(item?.created_at)}`}
                  </Text>
                </Box>
                <Text numberOfLines={2}>{item?.message?.trim()}</Text>
              </Box>
            </Box>
          </TouchableOpacity>
        );
    }
  };

  return (
    <Box width={Dimensions.get('window').width}>
      <FlatList
        ListHeaderComponent={ListHeader}
        data={[{id: 'title'}, ...recognitions.list]}
        keyExtractor={({id}) => `received-recognition-${id}`}
        stickyHeaderIndices={[1]}
        renderItem={renderItem}
        // ItemSeparatorComponent={() => <Box height={30} />}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        onEndReached={handleLoadMore}
      />
    </Box>
  );
};

export default Received;
