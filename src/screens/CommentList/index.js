import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import Avatar from '../../components/Avatar';
import Box from '../../components/Box';
import Header from '../../components/Header';
import Text, {TextWeight} from '../../components/Text';
import colors from '../../constants/colors';
import PostRepo from 'services/Post/repo';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.WHITE},
});

const CommentListItem = ({user}) => {
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

const CommentList = ({route}) => {
  const [commenters, setCommenters] = useState();
  const [offset, setOffset] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const data = route?.params;

  const fetchCommenters = useCallback(
    async ({off}) => {
      const result = await PostRepo.getCommentersRepo({
        postId: data.postId,
        offset: off,
      });
      const commenterList = result?.data?.commenters;
      if (Array.isArray(commenterList)) {
        setCommenters(commenterList.slice(0, 10));
        const tmpOffset = commenterList === 11 ? 10 : commenterList.length;
        setOffset(off === 0 ? tmpOffset : offset + tmpOffset);
        setHasNext(commenterList.length === 11);
        setRefreshing(false);
      }
    },
    [data.postId, offset],
  );

  const handleRefresh = () => {
    setRefreshing(true);
    fetchCommenters({off: 0});
  };

  const handleLoadMore = useCallback(() => {
    if (hasNext) {
      fetchCommenters({off: offset});
    }
  }, [offset, hasNext, fetchCommenters]);

  useEffect(() => {
    if (!commenters) {
      fetchCommenters({off: 0});
    }
  }, [commenters, fetchCommenters]);

  const renderItem = ({item}) => <CommentListItem user={item} />;
  return (
    <SafeAreaView style={styles.container}>
      <Header backable title="Commenters" />
      <FlatList
        refreshing={refreshing}
        onRefresh={handleRefresh}
        initialNumToRender={10}
        keyExtractor={({user_id}) => `user-${user_id}`}
        contentContainerStyle={{paddingHorizontal: 15, paddingTop: 24}}
        data={commenters || []}
        renderItem={renderItem}
        onEndReachedThreshold={0.8}
        onEndReached={handleLoadMore}
      />
    </SafeAreaView>
  );
};

export default CommentList;
