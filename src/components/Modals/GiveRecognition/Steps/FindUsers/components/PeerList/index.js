import React from 'react';
import {FlatList, Keyboard} from 'react-native';
import {connect} from 'react-redux';
import {getPeers} from 'services/Users/selectors';
import uuid from 'react-native-uuid';
import UserActions from 'services/Users/actions';
import UserItem from 'components/UserItem';
import styles from '../../styles';
import Text, {TextWeight} from 'components/Text';
import SearchEmpty from 'assets/images/search-empty.svg';
import Box from 'components/Box';

class PeerList extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  handleLoadMore = () => {
    // const {peers, fetchColleagues} = this.props;
    // if (peers.hasNext) {
    //   fetchColleagues(peers.offset + 1);
    // }
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
        <Text mt={10} align="center" size={18}>
          {t('no-results-message')}
        </Text>
      </Box>
    );
  };

  render() {
    const {peers} = this.props;
    return (
      <FlatList
        data={peers.list || []}
        onScroll={() => Keyboard.dismiss()}
        keyExtractor={({id}) => `user-${id}-${uuid.v4()}`}
        renderItem={this.renderItem}
        ListEmptyComponent={this.renderEmptyComponent}
        onEndReachedThreshold={0.8}
        initialNumToRender={10}
        onEndReached={this.handleLoadMore}
        contentContainerStyle={styles.list}
        // ListHeaderComponent={renderListHeader}
        // stickyHeaderIndices={[0]}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  peers: getPeers(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchColleagues: (offset) => dispatch(UserActions.getColleagues({offset})),
});

export default connect(mapStateToProps, mapDispatchToProps)(PeerList);
