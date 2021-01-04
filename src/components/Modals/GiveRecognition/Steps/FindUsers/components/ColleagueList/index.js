import React from 'react';
import {ActivityIndicator, FlatList, Keyboard} from 'react-native';
import {connect} from 'react-redux';
import {getColleagues} from 'services/Users/selectors';
import uuid from 'react-native-uuid';
import UserActions from 'services/Users/actions';
import UserItem from 'components/UserItem';
import styles from '../../styles';
import Text, {TextWeight} from 'components/Text';
import SearchEmpty from 'assets/images/search-empty.svg';
import Box from 'components/Box';

class ColleagueList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      onEndReachedCalledDuringMomentum: true,
    };
  }

  componentDidMount() {
    const {colleagues, fetchColleagues} = this.props;
    if (!colleagues.list) {
      fetchColleagues(0);
    }
  }

  handleLoadMore = () => {
    const {colleagues, fetchColleagues} = this.props;
    const {onEndReachedCalledDuringMomentum} = this.state;
    if (!onEndReachedCalledDuringMomentum) {
      this.setState(
        {
          onEndReachedCalledDuringMomentum: true,
        },
        () => {
          if (colleagues.hasNext) {
            fetchColleagues(colleagues.offset);
          }
        },
      );
    }
  };

  renderItem = ({item}) => {
    const {selectedUser, selectUser} = this.props;
    return (
      <UserItem
        isSelected={selectedUser?.id === item.id}
        onPress={selectUser}
        user={item}
      />
    );
  };

  renderEmptyComponent = () => {
    const {t} = this.props;
    return (
      <Box mt={100} flex={1} alignItems="center" justifyContent="center">
        <Text mb={10} weight={TextWeight.SEMIBOLD} size={18}>
          {t('no-results')}
        </Text>
        <Box>
          <SearchEmpty />
        </Box>
      </Box>
    );
  };

  // ? Check if list has started scrolling
  onMomentumScrollBegin = () => {
    this.setState({onEndReachedCalledDuringMomentum: false});
  };

  render() {
    const {colleagues} = this.props;

    if (!colleagues.list) {
      return (
        <Box my={50}>
          <ActivityIndicator />
        </Box>
      );
    }

    return (
      <FlatList
        data={colleagues.list || []}
        onScroll={() => Keyboard.dismiss()}
        keyExtractor={({id}) => `user-${id}-${uuid.v4()}`}
        renderItem={this.renderItem}
        ListEmptyComponent={this.renderEmptyComponent}
        onEndReachedThreshold={0.8}
        initialNumToRender={10}
        onEndReached={this.onMomentumScrollBegin}
        contentContainerStyle={styles.list}
        onMomentumScrollBegin={this.handleLoadMore}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  colleagues: getColleagues(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchColleagues: (offset) => dispatch(UserActions.getColleagues({offset})),
});

export default connect(mapStateToProps, mapDispatchToProps)(ColleagueList);
