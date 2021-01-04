import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import Image from '../Image';
// import PriceTag from '../../assets/images/price-tag.png';
import PriceTag from '../../assets/images/price-tag.svg';
import Box from '../Box';
import Text, {TextWeight} from '../Text';
import colors from '../../constants/colors';
import {useTranslation} from 'react-i18next';
import Color from 'color';
import NavigationService from '../../services/Navigation';

const PictureSliderItem = (props) => {
  const {cover, value} = props;
  const {t} = useTranslation();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.container}
      onPress={() =>
        navigation.navigate(NavigationService.Screens.REWARD_DETAIL, {...props})
      }>
      <Box style={styles.shadow}>
        <Box
          px={20}
          borderRadius={16}
          backgroundColor={Color.rgb(colors.WHITESMOKE).alpha(0.7).toString()}
          style={styles.newTag}>
          <Text color={colors.RED} weight={TextWeight.BOLD} lineHeight={30}>
            {t('new').toUpperCase()}
          </Text>
        </Box>
        <Image
          src={cover}
          width="100%"
          height={184}
          resizeMode={FastImage.resizeMode.cover}
          borderRadius={16}
        />
        <Box style={styles.priceTag}>
          <PriceTag style={{width: 100, height: 27}} />
          {/* <Image
          src={PriceTag}
          width={100}
          height={27}
          resizeMode={FastImage.resizeMode.contain}
        /> */}
          <Text
            size={14}
            color={colors.WHITE}
            weight={TextWeight.BOLD}
            align="center"
            style={{
              position: 'absolute',
              top: 3,
              left: 30,
            }}>
            {`${value} ${t('pts').toLowerCase()}`}
          </Text>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // overflow: 'hidden',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  shadow: {
    shadowColor: colors.WHITESMOKE,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    backgroundColor: 'white',
    elevation: 4,
    borderRadius: 16,
  },
  priceTag: {
    position: 'absolute',
    bottom: 10,
    left: 0,
  },
  priceTagBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  newTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
  },
});

export default PictureSliderItem;
