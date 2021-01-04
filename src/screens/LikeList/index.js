import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import PostRepo from 'services/Post/repo';
import {getPost} from 'services/Recognition/selectors';
import Avatar from '../../components/Avatar';
import Box from '../../components/Box';
import Header from '../../components/Header';
import Text, {TextWeight} from '../../components/Text';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.WHITE},
});

const LikeListItem = ({user}) => {
  return (
    <Box flexDirection="row" alignItems="center" mb={26}>
      <Avatar src={user.avatar} alt={user.name} size={40} />
      <Box ml={8}>
        <Text weight={TextWeight.BOLD} lineHeight={24}>
          {user.name}
        </Text>
        <Text size={12} color={colors.SECONDARY_TEXT}>
          {user?.role}
        </Text>
      </Box>
    </Box>
  );
};

const LikeList = ({route}) => {
  const [reactees, setReactees] = useState();
  const [offset, setOffset] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const data = route?.params;
  const post = useSelector((state) => getPost(state, data.postId));

  const fetchReactees = useCallback(
    async ({off}) => {
      const result = await PostRepo.getReacteesRepo({
        postId: data.postId,
        offset: off,
      });
      const reacteeList = result?.data?.reactee;
      if (Array.isArray(reacteeList)) {
        setReactees(reacteeList.slice(0, 10));
        const tmpOffset = reacteeList === 11 ? 10 : reacteeList.length;
        setOffset(off === 0 ? tmpOffset : offset + tmpOffset);
        setHasNext(reacteeList.length === 11);
        setRefreshing(false);
      }
    },
    [data.postId, offset],
  );

  const handleRefresh = () => {
    setRefreshing(true);
    fetchReactees({off: 0});
  };

  const handleLoadMore = useCallback(() => {
    if (hasNext) {
      fetchReactees({off: offset});
    }
  }, [offset, hasNext, fetchReactees]);

  useEffect(() => {
    if (!reactees) {
      fetchReactees({off: 0});
    }
  }, [reactees, fetchReactees]);

  const renderItem = ({item}) => <LikeListItem user={item} />;
  return (
    <SafeAreaView style={styles.container}>
      <Header backable title={`${post.count_reactions} likes`} />
      <FlatList
        refreshing={refreshing}
        onRefresh={handleRefresh}
        initialNumToRender={10}
        keyExtractor={({user_id}) => `user-${user_id}`}
        contentContainerStyle={{paddingHorizontal: 15, paddingTop: 24}}
        data={reactees || []}
        renderItem={renderItem}
        onEndReachedThreshold={0.8}
        onEndReached={handleLoadMore}
      />
    </SafeAreaView>
  );
};

export default LikeList;
