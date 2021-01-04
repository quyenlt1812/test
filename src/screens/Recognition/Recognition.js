import RecognitionSkeleton from 'components/Skeletons/RecognitionSkeleton';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Animated,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import RecognitionActions from 'services/Recognition/actions';
import {
  getReceivedRecognition,
  getSentRecognitions,
  getTopValues,
} from 'services/Recognition/selectors';
import Storage from 'services/Storage';
import Box from '../../components/Box';
import Header from '../../components/Header';
import Text from '../../components/Text';
import colors from '../../constants/colors';
import Received from './Received';
import Sent from './Sent';

const TAB_WIDTH = (Dimensions.get('window').width - 46) / 2;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  tabIndicator: {
    width: TAB_WIDTH,
    position: 'absolute',
    backgroundColor: colors.WHITESMOKE,
    height: 25,
    borderRadius: 15,
  },
  fullFlex: {flex: 1},
  rightTab: {flex: 1, marginLeft: 8},
  leftTab: {flex: 1, marginRight: 8},
});

const Recognition = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const topValues = useSelector(getTopValues);
  const sentRecognitions = useSelector(getSentRecognitions);
  const receivedRecognitions = useSelector(getReceivedRecognition);
  const [selectedTab, setSelectedTab] = useState(0);
  const _selected = useRef(new Animated.Value(0));
  const _contentRef = useRef();

  useEffect(() => {
    const getData = async () => {
      const userId = await Storage.getUserId();
      dispatch(RecognitionActions.getSentRecognitions(0, userId));
      dispatch(RecognitionActions.getReceivedRecognitions(0, userId));
      dispatch(RecognitionActions.getTopValues(userId));
    };

    if (!topValues || !sentRecognitions.list || !receivedRecognitions.list) {
      getData();
    }
  }, [topValues, sentRecognitions, receivedRecognitions, dispatch]);

  useEffect(() => {
    Animated.timing(_selected.current, {
      toValue: selectedTab,
      duration: 250,
      useNativeDriver: false,
    }).start();

    const scrollNumber = selectedTab === 0 ? 0 : WIDTH;
    _contentRef?.current?.scrollTo({x: scrollNumber, y: 0, animated: true});
  }, [selectedTab]);

  const _indicatorPosition = _selected.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 15 + TAB_WIDTH],
    extrapolate: 'clamp',
  });

  const scrollViewPaging = (event) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    if (scrollX < WIDTH) {
      setSelectedTab(0);
    } else {
      setSelectedTab(1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={t('recognition')} />
      {!topValues || !sentRecognitions.list || !receivedRecognitions.list ? (
        <RecognitionSkeleton />
      ) : (
        <React.Fragment>
          <Box mx={15} mt={10} pb={10}>
            <Box flexDirection="row" alignItems="center">
              <Animated.View
                style={[styles.tabIndicator, {left: _indicatorPosition}]}
              />
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => setSelectedTab(0)}
                style={styles.leftTab}>
                <Box
                  borderRadius={15}
                  justifyContent="center"
                  alignItems="center"
                  height={25}
                  style={styles.fullFlex}>
                  <Text
                    size={14}
                    color={
                      selectedTab === 0
                        ? colors.PRIMARY_TEXT
                        : colors.SECONDARY_TEXT
                    }
                    weight={selectedTab === 0 ? 'extrabold' : 'regular'}>
                    {t('sent').toUpperCase()}
                  </Text>
                </Box>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => setSelectedTab(1)}
                style={styles.rightTab}>
                <Box
                  borderRadius={15}
                  justifyContent="center"
                  alignItems="center"
                  height={25}>
                  <Text
                    size={14}
                    color={
                      selectedTab === 1
                        ? colors.PRIMARY_TEXT
                        : colors.SECONDARY_TEXT
                    }
                    weight={selectedTab === 1 ? 'extrabold' : 'regular'}>
                    {t('received').toUpperCase()}
                  </Text>
                </Box>
              </TouchableOpacity>
            </Box>
          </Box>
          <ScrollView
            ref={_contentRef}
            style={styles.fullFlex}
            // onScroll={scrollViewPaging}
            horizontal
            scrollEventThrottle={16}
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            disableIntervalMomentum
            disableScrollViewPanResponder
            decelerationRate="fast"
            snapToAlignment={'start'}
            snapToInterval={WIDTH}>
            <Sent />
            <Received />
          </ScrollView>
        </React.Fragment>
      )}
    </SafeAreaView>
  );
};

export default Recognition;
