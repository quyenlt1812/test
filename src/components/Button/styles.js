import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const buttonCommonStyle = {
  height: 45,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 8,
  borderWidth: 1,
  paddingHorizontal: 25,
};

const styles = StyleSheet.create({
  normalButton: {
    ...buttonCommonStyle,
    backgroundColor: colors.PRIMARY,
    borderColor: colors.PRIMARY,
  },
  outlineButton: {
    ...buttonCommonStyle,
    backgroundColor: colors.WHITE,
    borderColor: colors.PRIMARY,
  },
  dangerButton: {
    ...buttonCommonStyle,
    backgroundColor: colors.RED,
    borderColor: colors.RED,
  },
});

export default styles;
