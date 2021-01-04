import {StyleSheet} from 'react-native';
import colors from '../../../../../constants/colors';

const styles = StyleSheet.create({
  fullSize: {flex: 1},
  additionBar: {
    position: 'absolute',
    width: 100,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.WHITESMOKE,
    right: 50,
  },
  sliderTrack: {
    height: 8,
    borderRadius: 4,
  },
  sliderThumb: {
    backgroundColor: 'pink',
    top: -5,
    width: 45,
    height: 45,
    borderRadius: 25,
  },
  slider: {flex: 1},
});

export default styles;
