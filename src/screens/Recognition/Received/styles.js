import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  topValueIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    width: 16,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 3,
  },
  fullFlex: {flex: 1},
  segment: {marginBottom: -90},
  segmentContentContainer: {position: 'absolute', top: 70},
});

export default styles;
