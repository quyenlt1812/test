import React from 'react';
import {TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Text, {TextWeight} from 'components/Text';
import colors from 'constants/colors';
import styles from './styles';
import Box from 'components/Box';
import Avatar from 'components/Avatar';
import Icon from 'components/Icon';

class UserItem extends React.PureComponent {
  render() {
    const {isSelected, onPress, user} = this.props;
    return (
      <TouchableOpacity activeOpacity={0.5} onPress={() => onPress(user)}>
        <Box
          flexDirection="row"
          alignItems="center"
          px={15}
          py={12}
          backgroundColor={isSelected ? colors.BACKGROUND : colors.WHITE}>
          <Avatar src={user?.avatar} alt={user?.name} size={50} />
          <Box mx={16} flex={1}>
            <Text size={18} weight={TextWeight.BOLD} numberOfLines={1}>
              {user?.name || 'Dummy user'}
            </Text>
            <Text size={14} color={colors.SECONDARY_TEXT} numberOfLines={1}>
              {user?.role?.title || 'Tribee newbee'}
            </Text>
          </Box>
          <LinearGradient
            start={{x: 0.0, y: 0.25}}
            end={{x: 0.5, y: 1.0}}
            locations={[0, 0.9]}
            style={[styles.selectedIcon, isSelected ? styles.checkIcon : {}]}
            colors={
              isSelected
                ? ['rgba(10, 196, 186, 0.8)', 'rgba(43, 218, 142, 0.8)']
                : ['#fff', '#fff']
            }>
            <Icon name="check" color={colors.WHITE} size={14} />
          </LinearGradient>
        </Box>
      </TouchableOpacity>
    );
  }
}

export default UserItem;
