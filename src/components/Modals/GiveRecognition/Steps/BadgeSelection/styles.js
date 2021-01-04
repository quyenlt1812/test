import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {flex: 1},
  badgeItem: {
    marginHorizontal: 5,
    marginVertical: 6,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: (Dimensions.get('window').width - 40) / 2,
    height: 105,
    borderRadius: 6,
  },
  badgeTitle: {flex: 1},
  deleteIcon: {
    width: 16,
    height: 16,
  },
  badgeContainer: {flexWrap: 'wrap'},
});

export default styles;
