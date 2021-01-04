import React, {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Animated,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {HtmlParseAndView} from '@react-native-html/renderer';
import Box from '../../components/Box';
import Header from '../../components/Header';
import ClaimReward from '../../components/Modals/ClaimReward';
import Text, {TextWeight} from '../../components/Text';
import colors from '../../constants/colors';
import {getCurrentUser} from '../../services/Users/selectors';
import AppActions from '../../services/App/actions';
import styles from './styles';
import Button from '../../components/Button';
import FastImage from 'react-native-fast-image';
import Image from '../../components/Image';

const htmlStyles = {
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.PRIMARY,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.PRIMARY_TEXT,
    fontFamily: 'Nunito-Regular',
  },
};

const AnimatedImage = Animated.createAnimatedComponent(FastImage);

const RewardDetail = ({route}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const reward = route?.params;
  const currentUser = useSelector(getCurrentUser);
  const [activeTab, setActiveTab] = useState('des');
  const [claimConfirm, setClaimConfirm] = useState(false);
  const _scroll = useRef(new Animated.Value(0));

  const handleClaimOnPress = () => {
    // setClaimConfirm(true);
    if (Number.parseInt(currentUser?.recognition_receive, 10) < reward?.value) {
      dispatch(
        AppActions.openAlertModal({
          title: t('claim-failed'),
          message: t('claim-failed-not-enough-budget'),
        }),
      );
    } else {
      setClaimConfirm(true);
    }
  };

  const onScroll = (e) => {
    const scrollY = e.nativeEvent.contentOffset.y;
    _scroll.current.setValue(scrollY);
  };

  const imageScale = _scroll.current.interpolate({
    inputRange: [-Dimensions.get('window').height, 0, 300],
    outputRange: [7, 1, 1],
    extrapolate: 'clamp',
  });

  const imageY = _scroll.current.interpolate({
    inputRange: [0, 500],
    outputRange: [0, -200],
    extrapolate: 'clamp',
  });

  return (
    <Box style={styles.container}>
      <SafeAreaView
        style={{
          position: 'relative',
          zIndex: 1,
          backgroundColor: colors.WHITE,
        }}>
        <Header backable title={reward?.vendor?.title} />
      </SafeAreaView>
      <Box style={styles.contentContainer}>
        <AnimatedImage
          source={{uri: reward?.cover}}
          style={[
            styles.cover,
            {transform: [{scale: imageScale}, {translateY: imageY}]},
          ]}
        />
        <ScrollView
          decelerationRate="fast"
          onScroll={onScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContentContainer}>
          <Box
            px={15}
            py={30}
            mt={-30}
            backgroundColor="white"
            style={styles.scrollViewContent}>
            <Box flexDirection="row" alignItems="center" mb={20}>
              <Image
                src={reward?.vendor?.image}
                width={100}
                height={50}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text
                ml={14}
                size={18}
                lineHeight={27}
                weight={TextWeight.EXTRABOLD}>
                {reward?.vendor?.title}
              </Text>
            </Box>
            <Box flexDirection="row" mb={24}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => setActiveTab('des')}>
                <Text
                  mr={36}
                  size={14}
                  lineHeight={20}
                  weight={TextWeight.BLACK}
                  color={
                    activeTab === 'des' ? colors.PRIMARY : colors.LIGHTGRAY
                  }>
                  {t('description').toUpperCase()}
                </Text>
              </TouchableOpacity>
              {reward?.acceptedVenues && (
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => setActiveTab('accept')}>
                  <Text
                    size={14}
                    weight={TextWeight.BLACK}
                    lineHeight={20}
                    color={
                      activeTab === 'accept' ? colors.PRIMARY : colors.LIGHTGRAY
                    }>
                    {t('accepted-venues').toUpperCase()}
                  </Text>
                </TouchableOpacity>
              )}
            </Box>
            <Box>
              <Text mb={16} lineHeight={24}>
                {reward?.title}
              </Text>
              <HtmlParseAndView
                rawHtml={reward.description}
                htmlStyles={htmlStyles}
                // containerStyle={styles.container}
                // scrollRef={scrollRef.current}
                // eslint-disable-next-line react/jsx-props-no-spreading
                // {...htmlViewProps}
              />
              {/* <Text lineHeight={24}></Text> */}
            </Box>
          </Box>
        </ScrollView>
      </Box>
      <SafeAreaView style={styles.claimContainer}>
        <Box
          px={15}
          py={17}
          width="100%"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          backgroundColor={colors.WHITE}>
          <Text weight={TextWeight.EXTRABOLD} size={26} lineHeight={42}>
            {reward?.value || 0}
            <Text weight={TextWeight.EXTRABOLD} size={14} lineHeight={42}>
              {` ${t('points').toLowerCase()}`}
            </Text>
          </Text>
          <Button onPress={handleClaimOnPress}>{t('claim-now')}</Button>
        </Box>
      </SafeAreaView>
      <ClaimReward
        reward={reward}
        isVisible={claimConfirm}
        handleClose={() => setClaimConfirm(false)}
      />
    </Box>
  );
};

export default RewardDetail;
