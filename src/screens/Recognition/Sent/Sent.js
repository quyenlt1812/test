import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, TouchableOpacity} from 'react-native';
import {getCurrentUser} from 'services/Users/selectors';
import {getSentRecognitions} from 'services/Recognition/selectors';
import {toNow} from 'utils/DateHelper';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import ArrowDown from 'assets/images/arrow-down.svg';
import colors from 'constants/colors';
import Dino from 'assets/images/dino.svg';
import LottieView from 'lottie-react-native';
import NavigationService from 'services/Navigation';
import RecognitionActions from 'services/Recognition/actions';
import Text, {TextWeight} from 'components/Text';
import uuid from 'react-native-uuid';
import Box from 'components/Box';
import RecognitionChart from 'components/RecognitionChart';
import Avatar from 'components/Avatar';

const Sent = ({}) => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const currentUser = useSelector(getCurrentUser);
  const recognitions = useSelector(getSentRecognitions);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setRefreshing(false);
    if (!recognitions.list) {
      dispatch(RecognitionActions.getSentRecognitions(0));
      dispatch(RecognitionActions.getReceivedRecognitions(0));
      dispatch(RecognitionActions.getTopValues(currentUser.id));
    }
  }, [recognitions, dispatch, currentUser]);

  const handleLoadMore = () => {
    if (recognitions.hasNext) {
      dispatch(RecognitionActions.getSentRecognitions(recognitions.offset + 1));
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(RecognitionActions.getSentRecognitions(0));
  };

  if (!recognitions?.list?.length) {
    return (
      <Box width={Dimensions.get('window').width} alignItems="center" px={15}>
        <Box px={15}>
          <RecognitionChart
            total={Number.parseInt(currentUser?.recognition_budget, 10)}
            filled={Number.parseInt(currentUser?.recognition_send, 10)}
          />
        </Box>
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
        {/* <ArrowDown /> */}
      </Box>
    );
  }

  const renderItem = ({item}) => {
    switch (item.id) {
      case 'title':
        return (
          <Box pb={10} backgroundColor={colors.WHITE}>
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
                  title: item?.receiver?.name,
                },
              )
            }>
            <Box
              flexDirection="row"
              alignItems="flex-start"
              height={95}
              style={{borderBottomWidth: 1, borderColor: '#EFEFEF'}}
              pt={14}
              pb={12}>
              <Avatar
                src={item?.receiver?.avatar}
                alt={item?.receiver?.name}
                size={50}
              />
              <Box ml={16} style={{flex: 1}}>
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
                    {item?.receiver?.name}
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
        ListHeaderComponent={() => (
          <Box px={15}>
            <RecognitionChart
              total={Number.parseInt(currentUser?.recognition_budget, 10)}
              filled={Number.parseInt(currentUser?.recognition_send, 10)}
            />
          </Box>
        )}
        data={[{id: 'title'}, ...recognitions.list]}
        keyExtractor={({id}) => `sent-recognition-${id}`}
        stickyHeaderIndices={[1]}
        renderItem={renderItem}
        contentContainerStyle={{paddingHorizontal: 15, paddingBottom: 24}}
        ListEmptyComponent={() => (
          <Box alignItems="center" style={{flex: 1}}>
            <Text weight={TextWeight.SEMIBOLD} size={18} mt={20} mb={10}>
              This space needs some love
            </Text>
            <Dino />
            <Text mt={5} mb={20}>
              Let’s start by sending a recognition
            </Text>
            <ArrowDown />
          </Box>
        )}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        onEndReached={handleLoadMore}
      />
    </Box>
  );
};

export default Sent;
