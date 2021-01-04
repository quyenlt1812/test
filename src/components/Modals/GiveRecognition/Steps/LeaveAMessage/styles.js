import {StyleSheet} from 'react-native';
import colors from '../../../../../constants/colors';

const styles = StyleSheet.create({
  fullSize: {flex: 1},
  header: {borderBottomWidth: 1, borderColor: colors.WHITESMOKE},
  removeButton: {
    width: 16,
    height: 16,
  },
  input: {
    fontFamily: 'Nunito-Regular',
    marginVertical: 12,
    paddingHorizontal: 15,
    fontSize: 20,
    flex: 1,
  },
});

export default styles;
