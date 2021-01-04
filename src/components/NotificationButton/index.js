import React from 'react';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from '../Icon';
import colors from '../../constants/colors';
import {useDispatch, useSelector} from 'react-redux';
import {getNotification} from '../../services/App/selectors';
import AppActions from '../../services/App/actions';
import NavigationService from '../../services/Navigation';

const styles = StyleSheet.create({
  notificationBadge: {
    width: 10,
    height: 10,
    backgroundColor: colors.RED,
    borderRadius: 10,
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

const AnimatedIcon = Animatable.createAnimatableComponent(Icon);

const NotificationButton = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const noti = useSelector(getNotification);

  const navigateToCenter = () => {
    dispatch(AppActions.updateNotification({ping: false}));
    navigation.navigate(NavigationService.Screens.NOTIFICATION_CENTER);
  };

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={navigateToCenter}>
      {noti.ping ? (
        <AnimatedIcon
          animation="tada"
          iterationCount="infinite"
          duration={2000}
          name="bell"
          size={22}
          color={colors.PRIMARY_TEXT}
        />
      ) : (
        <Icon name="bell" size={22} color={colors.PRIMARY_TEXT} />
      )}
      {noti.ping && (
        <Animatable.View animation="zoomIn" style={styles.notificationBadge} />
      )}
    </TouchableOpacity>
  );
};

export default NotificationButton;
