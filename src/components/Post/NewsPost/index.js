import React from 'react';
import FastImage from 'react-native-fast-image';
import colors from '../../../constants/colors';
import {toNow} from '../../../utils/DateHelper';
import Box from '../../Box';
import Icon from '../../Icon';
import Image from '../../Image';
import Text, {TextWeight} from '../../Text';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import NavigationService from '../../../services/Navigation';
import Recognition from '../../../constants/recognition';
import PostActions from '../PostActions';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {getPost} from 'services/Recognition/selectors';

const styles = StyleSheet.create({
  readMoreButton: {
    width: 110,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.PRIMARY_TEXT,
    borderWidth: 1,
    borderRadius: 4,
  },
  commentBox: {
    backgroundColor: colors.BACKGROUND,
    borderRadius: 8,
    flex: 1,
    height: 35,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
});

const NewsPost = ({postId, showActions = true}) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const post = useSelector((state) => getPost(state, postId));
  const {count_comments, count_reactions, reaction, created_at} = post;

  const navigateToDetail = () => {
    navigation.navigate(NavigationService.Screens.POST_DETAIL, {
      postId,
      focusInput: false,
      type: Recognition.PostType.NEWS,
    });
  };

  return (
    <Box pt={20} px={15} alignItems="flex-start">
      <Box
        mb={14}
        width="100%"
        flexDirection="row"
        justifyContent="space-between">
        <Box flexDirection="row" alignItems="center" flex={1}>
          <Box
            width={40}
            height={40}
            borderRadius={20}
            backgroundColor={colors.BACKGROUND}
            alignItems="center"
            justifyContent="center">
            <Icon name="speaker" size={18} />
          </Box>
          <Box ml={8} flex={1}>
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between">
              <Text
                weight={TextWeight.BOLD}
                lineHeight={24}
                style={{flex: 1}}
                mr={20}
                numberOfLines={1}>
                {t('company-news')}
              </Text>
              <Text size={12} lineHeight={18} color={colors.SECONDARY_TEXT}>
                {`${created_at ? toNow(created_at) : t('just-now')}`}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box mb={12}>
        <Text mb={8} weight={TextWeight.BOLD}>
          {post?.news?.title}
        </Text>
        <Text>{post?.news?.summary}</Text>
      </Box>
      {!!post?.news?.cover && (
        <Image
          src={post?.news?.cover}
          width="100%"
          height={150}
          resizeMode={FastImage.resizeMode.cover}
          borderRadius={6}
        />
      )}
      <Box mt={12} pb={12} width="100%" flexDirection="row" alignItems="center">
        {showActions && (
          <Box mr={10} flexDirection="row" alignItems="center" flex={1}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate(NavigationService.Screens.LIKE_LIST, {
                  postId,
                })
              }>
              <Box width={60} flexDirection="row" alignItems="center">
                <Icon
                  name={reaction && reaction !== 0 ? 'heart' : 'heart-outlined'}
                  color={
                    reaction && reaction !== 0
                      ? colors.RED
                      : colors.PRIMARY_TEXT
                  }
                  size={18}
                />
                <Text ml={8} weight={TextWeight.SEMIBOLD}>
                  {count_reactions}
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
                {count_comments}
              </Text>
            </Box>
          </Box>
        )}
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.readMoreButton}
          onPress={navigateToDetail}>
          <Text weight={TextWeight.BOLD}>{t('read-more')}</Text>
        </TouchableOpacity>
      </Box>
      <PostActions postId={postId} type={Recognition.PostType.NEWS} />
    </Box>
  );
};

export default NewsPost;
