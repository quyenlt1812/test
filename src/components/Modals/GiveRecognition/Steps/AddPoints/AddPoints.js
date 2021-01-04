import React from 'react';
import Slider from 'react-native-slider';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import {useSelector} from 'react-redux';
import {getCurrentUser} from 'services/Users/selectors';
import colors from 'constants/colors';
import Box from 'components/Box';
import Text, {TextWeight} from 'components/Text';

const AddPoints = ({points, setPoints}) => {
  const {t} = useTranslation();
  const currentUser = useSelector(getCurrentUser);
  const recognitionLimit =
    currentUser?.department?.company?.recognition_limit_send || 50;
  return (
    <Box style={styles.fullSize} alignItems="center">
      <Text size={42} color={colors.PRIMARY} my={40}>
        {Math.round(points) * 5}
      </Text>
      <Box width="100%" px={15} flexDirection="row" alignItems="center">
        <Text size={18} color={colors.LIGHTGRAY} mr={8}>
          0
        </Text>
        <Slider
          // step={5}
          minimumValue={0}
          maximumValue={recognitionLimit / 5}
          minimumTrackTintColor={colors.PRIMARY}
          maximumTrackTintColor={colors.WHITESMOKE}
          value={points}
          onValueChange={(value) => setPoints(value)}
          style={styles.slider}
          trackStyle={styles.sliderTrack}
          thumbImage={require('../../../../../assets/images/smiley-face.png')}
          thumbStyle={styles.sliderThumb}
        />
        <Text size={18} color={colors.LIGHTGRAY} ml={8}>
          {recognitionLimit}
        </Text>
      </Box>
      <Box mx={15} mt={100}>
        <Text size={18} mb={12}>
          {t('youre-having')}
          <Text size={18} weight={TextWeight.BOLD} color={colors.PRIMARY}>
            {` ${
              Number.parseInt(currentUser?.recognition_budget, 10) -
              Number.parseInt(currentUser?.recognition_send, 10)
            } `}
          </Text>
          {t('add-points-1')}
        </Text>
        <Text size={18}>{t('add-points-2')}</Text>
      </Box>
    </Box>
  );
};

export default AddPoints;
