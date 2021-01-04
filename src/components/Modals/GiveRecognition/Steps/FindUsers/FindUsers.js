import SearchEmpty from 'assets/images/search-empty.svg';
import Box from 'components/Box';
import Icon from 'components/Icon';
import Text, {TextWeight} from 'components/Text';
import UserItem from 'components/UserItem';
import colors from 'constants/colors';
import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import uuid from 'react-native-uuid';
import {useDispatch, useSelector} from 'react-redux';
import UsersActions from 'services/Users/actions';
import {getPeers} from 'services/Users/selectors';
import {useDebounce} from 'use-debounce';
import ColleagueList from './components/ColleagueList';
import styles from './styles';

const FindUsers = ({selectedUser, selectUser}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const peers = useSelector(getPeers);
  const [searchText, setSearchText] = useState('');
  const [searching, setSearching] = useState('');
  const [lastSearchText, setLastSearchText] = useState('');
  const [value] = useDebounce(searchText, 500);

  useEffect(() => {
    setSearching(false);
  }, [peers.list]);

  const handleSearch = useCallback(
    (searchValue) => {
      if (searchValue?.length > 0 && searchValue !== lastSearchText) {
        setSearching(true);
        setLastSearchText(searchValue);
        dispatch(
          UsersActions.setPeers({peers: null, offset: 0, hasNext: false}),
        );
        dispatch(UsersActions.searchPeers(searchValue, 0));
      }
    },
    [dispatch, lastSearchText],
  );

  useEffect(() => {
    if (value.length > 0) {
      setSearching(true);
      handleSearch(value);
    }
  }, [dispatch, value, handleSearch]);

  const handleLoadMorePeers = () => {
    if (peers.hasNext) {
      dispatch(UsersActions.searchPeers(searchText, peers.offset));
    }
  };

  const renderListHeader = () => {
    return (
      <Box backgroundColor="white">
        <Box mx={15} mb={16}>
          <Box
            backgroundColor={colors.BACKGROUND}
            flexDirection="row"
            alignItems="center"
            width="100%"
            height={48}
            px={20}
            borderRadius={24}>
            <Icon name="search" size={16} color={colors.SECONDARY_TEXT} />
            <TextInput
              value={searchText}
              onChangeText={(v) => setSearchText(v)}
              selectionColor={colors.PRIMARY}
              placeholder={t('search-colleague')}
              style={styles.searchInput}
              returnKeyType="search"
              onEndEditing={(e) => handleSearch(e.target.value)}
              placeholderTextColor={colors.SECONDARY_TEXT}
              maxFontSizeMultiplier={1}
            />
            {searchText.length > 0 && (
              <Box>
                {searching ? (
                  <ActivityIndicator />
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                      setSearchText('');
                      dispatch(
                        UsersActions.setPeers({
                          peers: null,
                          offset: 0,
                          hasNext: false,
                        }),
                      );
                    }}>
                    <Icon
                      name="circle-cross"
                      size={16}
                      color={colors.LIGHTGRAY}
                    />
                  </TouchableOpacity>
                )}
              </Box>
            )}
          </Box>
        </Box>
        <Text px={15} mb={12} size={14} color={colors.SECONDARY_TEXT}>
          {searchText.length > 0 && Array.isArray(peers?.list)
            ? t('results')
            : t('people-you-work-with')}
        </Text>
      </Box>
    );
  };

  const renderItem = ({item}) => (
    <UserItem
      isSelected={selectedUser?.id === item.id}
      onPress={selectUser}
      user={item}
    />
  );

  const renderEmptyComponent = () => (
    <Box mt={100} flex={1} alignItems="center" justifyContent="center">
      <Text mb={10} weight={TextWeight.SEMIBOLD} size={18}>
        {t('no-results')}
      </Text>
      <Box>
        <SearchEmpty />
      </Box>
      {searchText.length > 0 && (
        <Text mt={10} align="center" size={18}>
          {t('no-results-message')}
        </Text>
      )}
    </Box>
  );

  return (
    <Box mt={10} style={styles.fullFlex}>
      {renderListHeader()}
      {searchText.length > 0 && Array.isArray(peers?.list) ? (
        <FlatList
          data={peers?.list || []}
          onScroll={() => Keyboard.dismiss()}
          keyExtractor={({id}) => `user-${id}-${uuid.v4()}`}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ListEmptyComponent={renderEmptyComponent}
          onEndReachedThreshold={0.8}
          initialNumToRender={10}
          onEndReached={handleLoadMorePeers}
          // ListHeaderComponent={renderListHeader}
          // stickyHeaderIndices={[0]}
        />
      ) : (
        <ColleagueList
          selectedUser={selectedUser}
          selectUser={selectUser}
          t={t}
        />
      )}
    </Box>
  );
};

export default FindUsers;
