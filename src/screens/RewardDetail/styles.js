import {StyleSheet} from 'react-native';

import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  contentContainer: {flex: 1, backgroundColor: colors.WHITE},
  cover: {position: 'absolute', top: 0, width: '100%', height: 274, zIndex: 0},
  scrollViewContentContainer: {paddingTop: 274},
  scrollViewContent: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: 'rgba(166, 179, 194, 0.2)',
    shadowOffset: {
      width: 0,
      height: -40,
    },
    shadowRadius: 14,
    shadowOpacity: 1,
    elevation: 30,
  },
  claimContainer: {
    width: '100%',
    backgroundColor: colors.WHITE,
    shadowColor: 'rgba(166, 179, 194, 0.3)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 14,
    shadowOpacity: 1,
    elevation: 30,
  },
});

export default styles;
