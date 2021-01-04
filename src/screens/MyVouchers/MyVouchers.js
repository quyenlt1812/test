import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Box from '../../components/Box';
import Text from '../../components/Text';
import Header from '../../components/Header';
import colors from '../../constants/colors';
import styles from './styles';
import ActiveVouchers from './components/ActiveVouchers';
import ExpiredVouchers from './components/ExpiredVouchers';
import {useTranslation} from 'react-i18next';

const TAB_WIDTH = (Dimensions.get('window').width - 46) / 2;
const WIDTH = Dimensions.get('window').width;

const MyVouchers = ({}) => {
  const {t} = useTranslation();
  const [selectedTab, setSelectedTab] = useState(0);
  const _selected = useRef(new Animated.Value(0));
  const _contentRef = useRef();

  useEffect(() => {
    Animated.timing(_selected.current, {
      toValue: selectedTab,
      duration: 250,
      useNativeDriver: false,
    }).start();

    const scrollNumber = selectedTab === 0 ? 0 : WIDTH;
    _contentRef.current.scrollTo({x: scrollNumber, y: 0, animated: true});
  }, [selectedTab]);

  const _indicatorPosition = _selected.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 15 + TAB_WIDTH],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header title={t('my-vouchers')} backable />
      <Box mx={15} mt={10} pb={17}>
        <Box flexDirection="row" alignItems="center">
          <Animated.View
            style={[
              styles.indicator,
              {
                width: TAB_WIDTH,
                left: _indicatorPosition,
                backgroundColor: colors.WHITESMOKE,
              },
            ]}
          />
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setSelectedTab(0)}
            style={styles.tabTouchable}>
            <Box
              borderRadius={15}
              justifyContent="center"
              alignItems="center"
              height={25}
              style={styles.tabTouchable}>
              <Text
                size={14}
                color={
                  selectedTab === 0
                    ? colors.PRIMARY_TEXT
                    : colors.SECONDARY_TEXT
                }
                weight={selectedTab === 0 ? 'extrabold' : 'regular'}>
                {t('active').toUpperCase()}
              </Text>
            </Box>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setSelectedTab(1)}
            style={{flex: 1, marginLeft: 8}}>
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
                {t('expired').toUpperCase()}
              </Text>
            </Box>
          </TouchableOpacity>
        </Box>
      </Box>
      <ScrollView
        ref={_contentRef}
        style={styles.fullFlex}
        horizontal
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        disableIntervalMomentum
        disableScrollViewPanResponder
        decelerationRate="normal"
        snapToAlignment={'start'}
        snapToInterval={WIDTH}>
        <Box width={WIDTH}>
          <ActiveVouchers />
        </Box>
        <Box width={WIDTH}>
          <ExpiredVouchers />
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyVouchers;
