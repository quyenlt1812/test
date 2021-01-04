import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  indicator: {
    position: 'absolute',
    height: 25,
    borderRadius: 15,
  },
  tabTouchable: {flex: 1, marginRight: 8},
  tabContainer: {flex: 1},
  fullFlex: {flex: 1},
  activeVouchers: {
    paddingHorizontal: 15,
    paddingTop: 24,
    paddingBottom: 30,
  },
  expiredVoucher: {paddingHorizontal: 15},
  cancelButton: {
    borderColor: colors.PRIMARY,
    borderWidth: 1,
    borderRadius: 8,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
});

export default styles;
