import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Dimensions, TouchableOpacity} from 'react-native';
import colors from '../../constants/colors';
import NavigationService from '../../services/Navigation';
import Box from '../Box';
import Image from '../Image';
import Text, {TextWeight} from '../Text';

const IMAGE_WIDTH = (Dimensions.get('window').width - 45) / 2;
const IMAGE_HEIGHT =
  ((Dimensions.get('window').width - 30 - 16) / 2 / 75) * 100;

const RewardItem = (props) => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() =>
        navigation.navigate(NavigationService.Screens.REWARD_DETAIL, {...props})
      }>
      <Box ml={15} width={IMAGE_WIDTH}>
        <Image
          src={props?.image}
          width="100%"
          height={IMAGE_HEIGHT}
          borderRadius={12}
          style={{borderWidth: 2, borderColor: '#F8F8F8'}}
        />

        <Box width="80%">
          <Text
            size={12}
            lineHeight={18}
            color={colors.SECONDARY_TEXT}
            numberOfLines={1}
            mb={4}
            mt={8}>
            {props?.vendor?.title}
          </Text>
          <Box height={40} mb={8}>
            <Text size={14} lineHeight={20} numberOfLines={2}>
              {props?.title}
            </Text>
          </Box>
          <Text lineHeight={21} weight={TextWeight.EXTRABOLD}>
            {`${props?.value || 0} ${t('pts').toLowerCase()}`}
          </Text>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default RewardItem;
