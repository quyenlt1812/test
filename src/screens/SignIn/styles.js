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
  imageBg: {position: 'absolute', top: -10},
});

export default styles;
