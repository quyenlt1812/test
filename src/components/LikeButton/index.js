import React, {useCallback, useRef} from 'react';
import {TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'components/Icon';
import AppSocket from 'services/Socket';
import {useSelector} from 'react-redux';
import {getCurrentUser} from 'services/Users/selectors';
import {Reactions} from 'constants/post';
import colors from 'constants/colors';
import {getPost} from 'services/Recognition/selectors';
import Text, {TextWeight} from 'components/Text';
import Box from 'components/Box';
import {useTranslation} from 'react-i18next';
import {isLiked} from 'utils/PostHelper';

const LikeButton = ({postId, iconSize, iconOnly}) => {
  const {t} = useTranslation();
  const currentUser = useSelector(getCurrentUser);
  const post = useSelector((state) => getPost(state, postId));
  const _heartRef = useRef();

  const sendReaction = useCallback(() => {
    AppSocket.sendPostReaction({
      postId: postId,
      userId: currentUser.id,
      type: Reactions.LIKE,
      schema: currentUser.schema,
    });
    _heartRef.current.bounceIn(1000);
  }, [postId, currentUser]);

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={sendReaction}
      style={iconOnly ? {} : {flex: 1}}>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        flex={1}>
        <Animatable.View ref={_heartRef} animation="bounceIn" duration={1000}>
          <Icon
            name={isLiked(post?.reaction) ? 'heart' : 'heart-outlined'}
            color={isLiked(post?.reaction) ? colors.RED : colors.PRIMARY_TEXT}
            size={iconSize}
          />
        </Animatable.View>
        {!iconOnly && (
          <Text
            weight={TextWeight.SEMIBOLD}
            color={isLiked(post?.reaction) ? colors.RED : colors.PRIMARY_TEXT}
            ml={9}>
            {t('love-it')}
          </Text>
        )}
      </Box>
    </TouchableOpacity>
  );
};

LikeButton.defaultProps = {
  iconSize: 24,
  iconOnly: true,
};

export default LikeButton;
