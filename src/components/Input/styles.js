import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  input: {
    fontFamily: 'Nunito-Regular',
    fontSize: 18,
    color: colors.PRIMARY_TEXT,
    marginHorizontal: 10,
    flex: 1,
  },
  inputContainer: {borderColor: colors.SECONDARY_TEXT, borderBottomWidth: 1},
  inputError: {
    position: 'absolute',
    bottom: -42,
    height: 40,
  },
  showPasswordButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
