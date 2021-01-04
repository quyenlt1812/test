import React from 'react';
import {TouchableOpacity} from 'react-native';
import colors from '../../constants/colors';
import Avatar from '../Avatar';
import Box from '../Box';
import Icon from '../Icon';
import Text, {TextWeight} from '../Text';
import styles from './styles';

const GiveRecognitionUser = ({user, removeSelectedUser}) => {
  return (
    <Box
      width="100%"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      px={15}
      pt={10}
      pb={24}
      style={styles.contentContainer}>
      <Box
        flexDirection="row"
        alignItems="center"
        style={styles.fullFlex}
        mr={20}>
        <Avatar src={user?.avatar} size={50} />
        <Box ml={16} style={styles.fullFlex}>
          <Text size={18} weight={TextWeight.BOLD} numberOfLines={1}>
            {user?.name}
          </Text>
          <Text size={14} color={colors.SECONDARY_TEXT}>
            {user?.role?.title || 'Tribee newbee'}
          </Text>
        </Box>
      </Box>
      {/* <TouchableOpacity
        activeOpacity={0.5}
        onPress={removeSelectedUser}
        style={styles.deleteIcon}>
        <Icon name="circle-cross" size={16} color={colors.LIGHTGRAY} />
      </TouchableOpacity> */}
    </Box>
  );
};

export default GiveRecognitionUser;
