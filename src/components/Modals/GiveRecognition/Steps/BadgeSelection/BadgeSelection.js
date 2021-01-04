import React from 'react';
import {useSelector} from 'react-redux';
import {ScrollView, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SvgUri} from 'react-native-svg';
import colors from '../../../../../constants/colors';
import Box from '../../../../Box';
import Text from '../../../../Text';
import {getBadges} from '../../../../../services/App/selectors';
import styles from './styles';
import GiveRecognitionUser from '../../../../GiveRecognitionUser';

const BadgeItem = ({badge, onPress, isSelected}) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        locations={[0, 0.9]}
        colors={
          isSelected
            ? ['rgb(10, 196, 186)', 'rgb(43, 218, 142)']
            : [colors.WHITESMOKE, colors.WHITESMOKE]
        }
        style={styles.badgeItem}>
        <Text
          mr={10}
          color={isSelected ? 'white' : colors.PRIMARY_TEXT}
          style={styles.badgeTitle}>
          {badge?.title}
        </Text>
        <Box width={50} height={50}>
          <SvgUri
            width="100%"
            height="100%"
            uri={badge.icon_url}
            fill={isSelected ? colors.WHITE : colors.PRIMARY_TEXT}
          />
        </Box>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const BadgeSelection = ({
  selectedUser,
  removeSelectedUser,
  selectedBadge,
  selectBadge,
}) => {
  const badges = useSelector(getBadges);

  return (
    <Box style={styles.container}>
      <GiveRecognitionUser
        user={selectedUser}
        removeSelectedUser={removeSelectedUser}
      />
      <ScrollView style={{flex: 1}}>
        <Box mt={6} mx={10} flexDirection="row" style={styles.badgeContainer}>
          {badges.map((badge) => (
            <BadgeItem
              key={badge.id}
              badge={badge}
              onPress={() => selectBadge(badge)}
              isSelected={badge?.id === selectedBadge?.id}
            />
          ))}
        </Box>
      </ScrollView>
    </Box>
  );
};

export default BadgeSelection;
