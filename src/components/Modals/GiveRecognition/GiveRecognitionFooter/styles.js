import {StyleSheet} from 'react-native';
import colors from '../../../../constants/colors';

const styles = StyleSheet.create({
  safeView: {
    backgroundColor: colors.WHITE,
    shadowColor: 'rgba(166, 179, 194, 0.3)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 14,
    shadowOpacity: 1,
    elevation: 3,
  },
  progressBar: {
    height: 2,
    backgroundColor: colors.PRIMARY,
    position: 'absolute',
    top: -2,
    left: 0,
    borderRadius: 2,
  },
  backButton: {
    width: 85,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderColor: colors.PRIMARY_TEXT,
    borderWidth: 1,
  },
  nextStep: {
    width: 85,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: colors.PRIMARY_TEXT,
    borderColor: colors.PRIMARY_TEXT,
    borderWidth: 1,
  },
  fullFlex: {flex: 1},
});

export default styles;
