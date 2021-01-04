import {useNavigation} from '@react-navigation/native';
import Recognition from 'constants/recognition';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Dimensions, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {getPost} from 'services/Recognition/selectors';
import {isLiked} from 'utils/PostHelper';
import colors from '../../../constants/colors';
import NavigationService from '../../../services/Navigation';
import {toNow} from '../../../utils/DateHelper';
import Avatar from '../../Avatar';
import Box from '../../Box';
import Icon from '../../Icon';
import Image from '../../Image';
import Tag from '../../Tag';
import Text, {TextWeight} from '../../Text';
import PostActions from '../PostActions';

const RecognitionPost = ({postId, data, showActions = true}) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  let post = useSelector((state) => getPost(state, postId));

  if (!post) {
    post = data;
  }

  const navigateToDetail = () => {
    navigation.navigate(NavigationService.Screens.POST_DETAIL, {
      postId,
      type: Recognition.PostType.RECOGNITION,
      focusInput: false,
    });
  };

  const navigateToLikeList = () => {
    navigation.navigate(NavigationService.Screens.LIKE_LIST, {
      postId,
    });
  };

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={navigateToDetail}>
      <Box pt={20} px={15} alignItems="flex-start">
        <Box
          mb={14}
          width="100%"
          flexDirection="row"
          justifyContent="space-between">
          <Box flexDirection="row" alignItems="center" flex={1}>
            <Avatar
              src={post?.recognition?.receiver?.avatar}
              alt={post?.recognition?.receiver?.name}
              size={40}
            />
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
                  {post?.recognition?.receiver?.name}
                </Text>
                <Text size={12} lineHeight={18} color={colors.SECONDARY_TEXT}>
                  {`${
                    post?.recognition?.created_at
                      ? toNow(post?.recognition?.created_at)
                      : t('just-now')
                  }`}
                </Text>
              </Box>
              <Text size={12} lineHeight={18} numberOfLines={1}>
                {`${t('recognited-by')} `}
                <Text size={12} weight={TextWeight.EXTRABOLD}>
                  {post?.recognition?.sender?.name}
                </Text>
              </Text>
            </Box>
          </Box>
        </Box>
        <Text mb={8} lineHeight={24}>
          {post?.recognition?.message}
        </Text>
        <Tag text={post?.recognition?.badge?.title} />
        {!!post?.recognition?.image && (
          <Box mt={12} width="100%">
            <Image
              src={post?.recognition?.image?.url}
              width={Dimensions.get('window').width - 30}
              height={(Dimensions.get('window').width - 30) / 2.65}
              resizeMode={FastImage.resizeMode.contain}
              borderRadius={16}
            />
          </Box>
        )}
        {showActions && (
          <Box mt={17} pb={12} flexDirection="row" alignItems="center">
            <TouchableOpacity activeOpacity={0.5} onPress={navigateToLikeList}>
              <Box width={60} flexDirection="row" alignItems="center">
                <Icon
                  name={isLiked(post?.reaction) ? 'heart' : 'heart-outlined'}
                  color={
                    isLiked(post?.reaction) ? colors.RED : colors.PRIMARY_TEXT
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
        )}
        {showActions && (
          <PostActions
            postId={post?.id}
            type={Recognition.PostType.RECOGNITION}
          />
        )}
      </Box>
    </TouchableOpacity>
  );
};

export default RecognitionPost;
