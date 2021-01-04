import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import Box from '../Box';
import Text, {TextWeight} from '../Text';
import Image from '../Image';
import Icon from '../Icon';
import {CATEGORIES} from '../../constants/categories';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {getCollections} from '../../services/Reward/selectors';
import colors from '../../constants/colors';
import FastImage from 'react-native-fast-image';
import NavigationService from '../../services/Navigation';

const styles = StyleSheet.create({
  popularItem: {
    width: 50,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriesContainer: {
    flexWrap: 'wrap',
  },
});

const Categories = ({}) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const collections = useSelector(getCollections);

  return (
    <Box>
      <Text mb={24} size={20} lineHeight={30} weight={TextWeight.SEMIBOLD}>
        {t('categories')}
      </Text>
      <Box flexDirection="row" style={styles.categoriesContainer}>
        {/* <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            navigation.navigate(NavigationService.Screens.REWARDS_BY_CATEGORY, {
              category: {name: 'Popular'},
            })
          }>
          <Box
            width={Dimensions.get('window').width / 4}
            mb={24}
            alignItems="center">
            <LinearGradient
              start={{x: 0.0, y: 0.25}}
              end={{x: 0.5, y: 1.0}}
              locations={[0, 0.9]}
              colors={['rgb(10, 196, 186)', 'rgb(43, 218, 142)']}
              style={styles.popularItem}>
              <Icon name="fire" size={20} color="white" />
            </LinearGradient>
            <Text mt={9} lineHeight={27}>
              {t('popular')}
            </Text>
          </Box>
        </TouchableOpacity> */}
        {collections.map((collection) => (
          <TouchableOpacity
            key={collection.id}
            activeOpacity={0.5}
            onPress={() =>
              navigation.navigate(
                NavigationService.Screens.REWARDS_BY_CATEGORY,
                {collection},
              )
            }>
            <Box
              width={(Dimensions.get('window').width - 30) / 4}
              mb={24}
              alignItems="center">
              <Image
                src={collection?.image}
                width={50}
                height={50}
                borderRadius={8}
                resizeMode={FastImage.resizeMode.cover}
              />
              <Text mt={9} lineHeight={20} size={14} align="center">
                {collection.title}
              </Text>
            </Box>
          </TouchableOpacity>
        ))}
      </Box>
    </Box>
  );
};

export default Categories;
