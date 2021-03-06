import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.WHITE},
  listContent: {paddingHorizontal: 15, paddingBottom: 24},
  commentInput: {
    flex: 1,
    // marginLeft: 12,
    fontSize: 16,
    paddingVertical: 10,
    fontFamily: 'Nunito-Regular',
    marginRight: 10,
  },
  inputContainer: {
    width: '100%',
    shadowColor: 'rgba(166, 179, 194, 0.3)',
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 14,
    shadowOpacity: 1,
    backgroundColor: colors.WHITE,
    elevation: 3,
  },
  actionsContainer: {
    borderColor: colors.WHITESMOKE,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
});

export default styles;
