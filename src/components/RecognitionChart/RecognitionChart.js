import React, {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import SegmentedRoundDisplay from '../../libs/ReactNativeSegment';
import colors from '../../constants/colors';
import Box from '../Box';
import Text, {TextWeight} from '../Text';
import Cellphone from '../../assets/images/cellphone.svg';
import Icon from '../Icon';
import {TouchableOpacity} from 'react-native';

const RecognitionChart = ({total, filled}) => {
  const {t} = useTranslation();
  const _btnRef = useRef();
  const [showTooltip, setShowTooltip] = useState(false);

  const example = {
    displayValue: false,
    animated: false,
    formatValue: (value) => `R$ ${value.toFixed(2)}`,
    filledArcWidth: 12,
    emptyArcWidth: 12,
    totalArcSize: 210,
    radius: 130,
    emptyArcColor: colors.WHITESMOKE,
    arcSpacing: 0,
    segments: [
      {
        total,
        filled,
      },
    ],
  };

  return (
    <Box
      mt={80}
      height={150}
      alignItems="center"
      justifyContent="center"
      style={{oveflow: 'hidden'}}>
      <SegmentedRoundDisplay {...example} />
      <Box alignItems="center" style={{position: 'absolute', top: -10}}>
        <Cellphone />
        <Text
          mt={6}
          weight={TextWeight.EXTRABOLD}
          color={colors.SECONDARY_TEXT}>
          {t('you-have-sent')}
        </Text>
        <Text weight={TextWeight.BOLD} size={32}>
          {filled}
        </Text>
        <Box flexDirection="row" alignItems="center">
          <Text
            mr={8}
            size={14}
            weight={TextWeight.SEMIBOLD}
            color={colors.SECONDARY_TEXT}>
            {t('of-total', {total})}
          </Text>
          {/* <TouchableOpacity
            activeOpacity={0.5}
            ref={_btnRef}
            onPress={() => setShowTooltip(true)}>
            <Icon name="circle-info" size={20} color={colors.SECONDARY_TEXT} />
          </TouchableOpacity> */}
        </Box>
      </Box>
    </Box>
  );
};

export default RecognitionChart;
