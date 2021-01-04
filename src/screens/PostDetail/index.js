import {useNavigation} from '@react-navigation/native';
import Box from 'components/Box';
import CommentItem from 'components/CommentItem';
import Header from 'components/Header';
import Icon from 'components/Icon';
import Text, {TextWeight} from 'components/Text';
import colors from 'constants/colors';
import recognition from 'constants/recognition';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import NavigationService from 'services/Navigation';
import PostActions from 'services/Post/actions';
import {getComments} from 'services/Post/selectors';
import {getPost} from 'services/Recognition/selectors';
import AppSocket from 'services/Socket';
import Composer from './components/Composer';
import Event from './components/Event';
import News from './components/News';
import Recognition from './components/Recognition';
import styles from './styles';

const PostDetail = ({route}) => {
  const {postId, focusInput, type} = route.params;
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const comments = useSelector((state) => getComments(state, postId));
  const post = useSelector((state) => getPost(state, postId));
  console.log(
    '🚀 ~ file: index.js ~ line 37 ~ PostDetail ~ post',
    post.count_reactions,
  );
  const _listRef = useRef();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    AppSocket.joinPostRoom(postId);
    return () => {
      AppSocket.leavePostRoom(postId);
    };
  }, [postId]);

  useEffect(() => {
    if (!Array.isArray(comments?.list)) {
      dispatch(PostActions.getCommentsForPost({postId: postId, offset: 0}));
    }
  }, [postId, dispatch, comments]);

  const renderTitle = () => {
    switch (type) {
      case recognition.PostType.NEWS:
        return t('news');
      case recognition.PostType.RECOGNITION:
        return t('recognition-to', {
          name: post?.recognition?.receiver?.name,
        });
      case recognition.PostType.EVENT:
        return t('event');
    }
  };

  const renderHeaderContent = () => {
    switch (type) {
      case recognition.PostType.NEWS:
        return <News postId={postId} />;
      case recognition.PostType.RECOGNITION:
        return <Recognition postId={postId} />;
      case recognition.PostType.EVENT:
        return <Event />;
    }
  };

  const handleLoadMore = () => {
    if (comments.hasNext) {
      dispatch(
        PostActions.getCommentsForPost({
          postId: postId,
          offset: comments.offset + 1,
        }),
      );
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(PostActions.getCommentsForPost({postId: postId, offset: 0}));
    setRefreshing(false);
  };

  const renderItem = ({item}) => {
    return <CommentItem {...item} />;
  };

  const renderListHeader = () => {
    return (
      <Box mb={16}>
        {renderHeaderContent()}
        <Box
          mt={16}
          py={16}
          flexDirection="row"
          alignItems="center"
          style={styles.actionsContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              navigation.navigate(NavigationService.Screens.LIKE_LIST, {
                postId,
              })
            }>
            <Box width={60} flexDirection="row" alignItems="center">
              <Icon
                name={
                  post?.reaction && post?.reaction !== 0
                    ? 'heart'
                    : 'heart-outlined'
                }
                color={
                  post?.reaction && post?.reaction !== 0
                    ? colors.RED
                    : colors.PRIMARY_TEXT
                }
                size={18}
              />
              <Text ml={8} weight={TextWeight.SEMIBOLD}>
                {post?.count_reactions}
              </Text>
            </Box>
          </TouchableOpacity>
          <Box
            width={60}
            ml={10}
            mr={16}
            flexDirection="row"
            alignItems="center">
            <Icon name="comment" size={17} />
            <Text ml={8} weight={TextWeight.SEMIBOLD}>
              {post?.count_comments}
            </Text>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <SafeAreaView>
        <Header backable title={renderTitle()} />
      </SafeAreaView>
      <FlatList
        ref={_listRef}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        initialNumToRender={10}
        onEndReachedThreshold={0.5}
        onEndReached={handleLoadMore}
        keyExtractor={({id}) => `comment-${id}`}
        ListHeaderComponent={renderListHeader}
        data={comments?.list || []}
        ItemSeparatorComponent={() => <Box height={16} />}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={() => (
          <Box pt={15}>
            <Text color={colors.SECONDARY_TEXT}>No comments</Text>
          </Box>
        )}
      />
      <Composer listRef={_listRef} postId={postId} autoFocus={focusInput} />
    </KeyboardAvoidingView>
  );
};

export default PostDetail;
