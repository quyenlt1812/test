import Color from 'color';
import {Platform, StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    shadowColor: Color.rgb(colors.DARKGRAY).alpha(0.3).toString(),
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 14,
    shadowOpacity: 1,
    borderColor: Color.rgb(colors.DARKGRAY).alpha(0.3).toString(),
    borderTopWidth: Platform.OS === 'android' ? 1 : 0,
  },
  addPointButtonContainer: {paddingTop: 5},
  addPointButton: {
    width: 45,
    height: 45,
    borderRadius: 45,
    backgroundColor: colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Color.rgb(colors.DARKGRAY).alpha(0.6).toString(),
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 3,
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    width: 50,
    height: 4,
    backgroundColor: colors.PRIMARY,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
  tabButton: {
    paddingTop: 10,
    paddingBottom: 7,
    width: 60,
    position: 'relative',
    alignItems: 'center',
  },
});

export default styles;
