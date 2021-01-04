import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.WHITE},
  signInButton: {
    backgroundColor: colors.PRIMARY,
    height: 54,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    marginTop: 50,
  },
  forgotPassword: {textDecorationLine: 'underline'},
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
  imageBg: {position: 'absolute', top: -10},
});

export default styles;
