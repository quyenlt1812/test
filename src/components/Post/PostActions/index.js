import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Box from 'components/Box';
import Icon from 'components/Icon';
import LikeButton from 'components/LikeButton';
import Text, {TextWeight} from 'components/Text';
import colors from 'constants/colors';
import {StyleSheet, TouchableOpacity} from 'react-native';
import NavigationService from 'services/Navigation';
import {useTranslation} from 'react-i18next';

const styles = StyleSheet.create({
  container: {borderTopWidth: 1, borderColor: colors.WHITESMOKE},
  commentButton: {flex: 1},
});

const PostActions = ({postId, type}) => {
  const navigation = useNavigation();
  const {t} = useTranslation();

  const navigateToDetail = () => {
    navigation.navigate(NavigationService.Screens.POST_DETAIL, {
      postId,
      type,
      focusInput: true,
    });
  };

  return (
    <Box
      height={56}
      flexDirection="row"
      alignItems="center"
      style={styles.container}>
      <LikeButton postId={postId} iconSize={18} iconOnly={false} />
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.commentButton}
        onPress={navigateToDetail}>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          flex={1}>
          <Icon name="comment" size={18} />
          <Text weight={TextWeight.SEMIBOLD} ml={9}>
            {t('comment')}
          </Text>
        </Box>
      </TouchableOpacity>
    </Box>
  );
};

export default PostActions;
