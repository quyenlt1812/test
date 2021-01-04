import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';

class FirebaseCloudMessagingService {
  register = (onRegister, onNotification, onOpenNotification) => {
    this.checkPermission(onRegister);
    this.createNotificationListeners(
      onRegister,
      onNotification,
      onOpenNotification,
    );
  };

  subscribeToNews = (schema) => {
    messaging()
      .subscribeToTopic(`${schema}-news`)
      .then(() => {
        console.log('Subscribed to channel', `${schema}-news`);
      })
      .catch((error) => {
        console.log('subscribe error', error);
      });
  };

  registerAppWithFCM = async () => {
    if (Platform.OS === 'ios') {
      // await messaging().registerDeviceForRemoteMessages();
      await messaging().setAutoInitEnabled(true);
    }
  };

  checkPermission = (onRegister) => {
    messaging()
      .hasPermission()
      .then((enabled) => {
        if (enabled) {
          this.getToken(onRegister);
        } else {
          this.requestPermission(onRegister);
        }
      })
      .catch((error) => {
        console.error('[FCMService] Permission rejected', error);
      });
  };

  getToken = (onRegister) => {
    messaging()
      .getToken()
      .then((fcmToken) => {
        console.log('FCMToken:', fcmToken);
        if (fcmToken) {
          onRegister(fcmToken);
        } else {
          console.error('[FCMService] User does not have a device token');
        }
      })
      .catch((error) => {
        console.error('[FCMService] getToken rejected', error);
      });
  };

  requestPermission = (onRegister) => {
    messaging()
      .requestPermission()
      .then((authorizationStatus) => {
        switch (authorizationStatus) {
          case messaging.AuthorizationStatus.AUTHORIZED:
            console.error('The app is authorized to create notifications.');
            this.getToken(onRegister);
            break;
          case messaging.AuthorizationStatus.DENIED:
            console.error('The app is not authorized to create notifications.');
            break;
          case messaging.AuthorizationStatus.NOT_DETERMINED:
            console.error(
              'The app user has not yet chosen whether to allow the application to create notifications. Usually this status is returned prior to the first call of `requestPermission`.',
            );
            break;
          case messaging.AuthorizationStatus.PROVISIONAL:
            console.error(
              'The app is currently authorized to post non-interrupting user notifications',
            );
            break;
        }
      })
      .catch((error) => {
        console.error('[FCMService] Request permission rejected', error);
      });
  };

  deleteToken = () => {
    messaging()
      .deleteToken()
      .catch((error) => {
        console.error('[FCMService] Delete token error', error);
      });
  };

  createNotificationListeners = (
    onRegister,
    onNotification,
    onOpenNotification,
  ) => {
    // When app is running in background
    messaging().onNotificationOpenedApp((remoteMessage) => {
      if (remoteMessage) {
        const notification = remoteMessage?.notification;
        const data = remoteMessage?.data;
        onOpenNotification({notification, data});
      }
    });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Message handled in the background!', remoteMessage);
      // if (remoteMessage) {
      //   let notification = null;
      //   if (Platform.OS === 'ios') {
      //     notification = remoteMessage?.data?.notification;
      //   } else {
      //     notification = remoteMessage?.notification;
      //   }
      //   onNotification(notification);
      // }
    });

    // When app is opened from a quit state
    // messaging()
    //   .getInitialNotification()
    //   .then((remoteMessage) => {
    //     if (remoteMessage) {
    //       const notification = remoteMessage?.notification;
    //       onOpenNotification(notification);
    //     }
    //   });

    // Foreground state message
    this.messageListner = messaging().onMessage(async (remoteMessage) => {
      console.log(
        '🚀 ~ file: FCMService.js ~ line 128 ~ FirebaseCloudMessagingService ~ this.messageListner=messaging ~ remoteMessage',
        remoteMessage,
      );
      // if (remoteMessage) {
      //   let notification = null;
      //   if (Platform.OS === 'ios') {
      //     notification = remoteMessage?.data?.notification;
      //   } else {
      //     notification = remoteMessage?.notification;
      //   }
      //   onNotification(notification);
      // }
    });

    // Triggered when have new token
    messaging().onTokenRefresh((fcmToken) => {
      onRegister(fcmToken);
    });
  };

  unregister = () => {
    this.messageListner();
  };
}

export const FCMService = new FirebaseCloudMessagingService();
