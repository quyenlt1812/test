import React from 'react';
import {useTranslation} from 'react-i18next';
import {Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {getPost} from 'services/Recognition/selectors';
import Avatar from '../../../../components/Avatar';
import Box from '../../../../components/Box';
import Image from '../../../../components/Image';
import Tag from '../../../../components/Tag';
import Text, {TextWeight} from '../../../../components/Text';
import colors from '../../../../constants/colors';
import {toNow} from '../../../../utils/DateHelper';

const Recognition = ({postId}) => {
  const {t} = useTranslation();
  const post = useSelector((state) => getPost(state, postId));
  return (
    <Box mt={15} alignItems="flex-start">
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
      <Tag text={post?.recognition?.badge.title} />
      {post?.recognition?.image && (
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
  );
};

export default Recognition;
