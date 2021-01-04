import React from 'react';
import Text, {TextWeight} from 'components/Text';
import colors from 'constants/colors';
import {toNow} from 'utils/DateHelper';
import {StyleSheet} from 'react-native';
import Box from 'components/Box';
import Avatar from 'components/Avatar';

const styles = StyleSheet.create({
  contentContainer: {borderColor: colors.WHITESMOKE, borderWidth: 1},
});

const CommentItem = ({commenter, created_at, content}) => {
  return (
    <Box flexDirection="row">
      <Avatar size={40} src={commenter?.avatar} alt={commenter?.name} />
      <Box ml={8} flex={1}>
        <Box
          mb={4}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <Box flexDirection="row" alignItems="center">
            <Text weight={TextWeight.BOLD}>{commenter?.name} </Text>
            {commenter?.department?.name && (
              <Text size={12} color={colors.SECONDARY_TEXT}>
                • {commenter?.department?.name}
              </Text>
            )}
          </Box>
          <Text size={12} color={colors.SECONDARY_TEXT}>
            {toNow(created_at)}
          </Text>
        </Box>
        <Box p={12} borderRadius={12} style={styles.contentContainer}>
          <Text>{content}</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default CommentItem;
