import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Dimensions, SafeAreaView, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import Text, {TextWeight} from 'components/Text';
import colors from 'constants/colors';
import NavigationService from 'services/Navigation';
import {getCurrentUser} from 'services/Users/selectors';
import {toNow} from 'utils/DateHelper';
import RecognitionActions from 'services/Recognition/actions';
import styles from './styles';
import {getPost} from 'services/Recognition/selectors';
import Header from 'components/Header';
import Box from 'components/Box';
import Icon from 'components/Icon';
import Avatar from 'components/Avatar';
import Tag from 'components/Tag';
import Image from 'components/Image';

const RecognitionDetail = ({route}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const currentUser = useSelector(getCurrentUser);
  const data = route?.params;
  let post = useSelector((state) => getPost(state, data?.post?.id));

  if (!post) {
    post = {recognition: data};
  }

  // useEffect(() => {
  //   if (data.fromNotification) {
  //     dispatch(RecognitionActions.addRecognition(data?.post));
  //     dispatch(
  //       RecognitionActions.addReceivedRecognition(data?.post?.recognition),
  //     );
  //   }
  // }, [data, dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <Header backable title={post?.recognition?.sender?.name} />
      <Box mt={15} px={15} alignItems="flex-start">
        <Box
          mb={14}
          width="100%"
          flexDirection="row"
          justifyContent="space-between">
          <Box flexDirection="row" alignItems="center" flex={1}>
            <Avatar
              src={post?.recognition?.receiver?.avatar}
              alt={post?.recognition?.receiver?.name || currentUser?.name}
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
                  {post?.recognition?.receiver?.name || t('you')}
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
                  {post?.recognition?.sender?.name || t('you')}
                </Text>
              </Text>
            </Box>
          </Box>
        </Box>
        <Text mb={8} lineHeight={24}>
          {post?.recognition?.message}
        </Text>
        <Box flexDirection="row" alignItems="center">
          <Tag text={post?.recognition?.badge?.title} mr={8} />
          <Tag
            text={`${
              currentUser?.id === post?.recognition?.sender_id ? '-' : '+'
            } ${post?.recognition?.value} ${t(
              post?.recognition?.value > 1 ? 'points' : 'point',
            ).toLowerCase()}`}
            color={colors.PRIMARY}
          />
        </Box>
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
      </Box>
      {data?.showActions && (
        <Box
          mt={16}
          py={16}
          px={15}
          flexDirection="row"
          alignItems="center"
          style={styles.actionsContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              navigation.navigate(NavigationService.Screens.LIKE_LIST, {
                postId: post?.id,
              })
            }>
            <Box flexDirection="row" alignItems="center">
              <Icon name="heart-outlined" size={18} />
              <Text ml={8} weight={TextWeight.SEMIBOLD}>
                145
              </Text>
            </Box>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              navigation.navigate(NavigationService.Screens.COMMENT_LIST)
            }>
            <Box ml={10} mr={16} flexDirection="row" alignItems="center">
              <Icon name="comment" size={17} />
              <Text ml={8} weight={TextWeight.SEMIBOLD}>
                47
              </Text>
            </Box>
          </TouchableOpacity>
        </Box>
      )}
    </SafeAreaView>
  );
};

export default RecognitionDetail;
