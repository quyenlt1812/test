import Box from 'components/Box';
import Icon from 'components/Icon';
import LikeButton from 'components/LikeButton';
import colors from 'constants/colors';
import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Keyboard,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useSelector} from 'react-redux';
import {getComments} from 'services/Post/selectors';
import {getPost} from 'services/Recognition/selectors';
import AppSocket from 'services/Socket';
import {getCurrentUser} from 'services/Users/selectors';
import styles from '../../styles';

const Composer = ({postId, autoFocus = false, listRef}) => {
  const {t} = useTranslation();
  const currentUser = useSelector(getCurrentUser);
  const post = useSelector((state) => getPost(state, postId));
  const comments = useSelector((state) => getComments(state, postId));
  const [content, setContent] = useState('');

  const sendComment = useCallback(() => {
    // dispatch(
    //   PostActions.addCommentToPost({
    //     postId: data.id,
    //     comment: {
    //       content: comment,
    //       commenter: currentUser,
    //       created_at: new Date(),
    //     },
    //   }),
    // );
    const data = {
      commenterId: currentUser?.id,
      postId,
      content,
      schema: currentUser?.schema,
      commenterName: currentUser?.name,
    };
    if (content.trim().length) {
      AppSocket.sendPostComment(data);
      if (comments.length) {
        listRef?.current?.scrollToIndex({index: 0, animated: true});
      }
    }
    setContent('');
    Keyboard.dismiss();
  }, [content, postId, currentUser, listRef, comments]);

  return (
    <SafeAreaView style={styles.inputContainer}>
      <Box px={10} py={12} flexDirection="row" alignItems="center">
        <LikeButton postId={postId} />
        <Box
          flex={1}
          ml={12}
          borderRadius={8}
          flexDirection="row"
          alignItems="center"
          backgroundColor={colors.BACKGROUND}
          px={15}>
          <TextInput
            value={content}
            onChangeText={(text) => setContent(text)}
            autoFocus={autoFocus || false}
            placeholder={t('write-a-comment')}
            style={styles.commentInput}
            returnKeyType="send"
            onSubmitEditing={sendComment}
            blurOnSubmit
            placeholderTextColor={colors.SECONDARY_TEXT}
            selectionColor={colors.PRIMARY}
          />
          <Animatable.View animation="bounceIn" duration={1000}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={sendComment}
              style={{
                width: 32,
                height: 32,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                name="send"
                color={
                  content.trim().length > 0
                    ? colors.PRIMARY
                    : colors.SECONDARY_TEXT
                }
                size={22}
              />
            </TouchableOpacity>
          </Animatable.View>
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default Composer;
