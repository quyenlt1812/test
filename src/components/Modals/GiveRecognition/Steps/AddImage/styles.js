import Color from 'color';
import {StyleSheet} from 'react-native';
import colors from '../../../../../constants/colors';

const styles = StyleSheet.create({
  fullSize: {flex: 1},
  scrollView: {width: '100%', flex: 1},
  scrollViewContent: {paddingHorizontal: 15, paddingVertical: 24},
  imageSelectedContainer: {
    position: 'absolute',
    zIndex: 10,
    elevation: 10,
    backgroundColor: Color.rgb(colors.WHITE).alpha(0.7).toString(),
    padding: 10,
    alignItems: 'flex-end',
  },
});

export default styles;
