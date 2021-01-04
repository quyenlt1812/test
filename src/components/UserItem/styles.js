import {Dimensions, StyleSheet} from 'react-native';
import colors from 'constants/colors';

const styles = StyleSheet.create({
  fullFlex: {
    flex: 1,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    marginLeft: 10,
  },
  list: {
    paddingBottom: 24,
  },
  selectedIcon: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: colors.WHITE,
  },
  checkIcon: {
    shadowColor: 'rgba(10, 107, 102, 0.25)',
    shadowOpacity: 1,
    shadowRadius: 8,
    shadowOffset: {
      width: 3,
      height: 2,
    },
    elevation: 3,
  },
});

export default styles;
