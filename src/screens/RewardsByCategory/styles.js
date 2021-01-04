import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.WHITE},
  list: {flex: 1},
  listContentContainer: {
    paddingHorizontal: 7,
    paddingTop: 15,
    paddingBottom: 30,
  },
});

export default styles;
