import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  checkContainer: {
    shadowColor: 'rgba(10, 107, 102, 0.25)',
    shadowOffset: {
      width: 3,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 1,
    elevation: 4,
    position: 'absolute',
    top: -15,
    right: 10,
    zIndex: 10,
  },
  voucherBackground: {position: 'absolute'},
  fullFlex: {flex: 1},
});

export default styles;
