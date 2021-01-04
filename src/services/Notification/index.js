import Api, {RequestMethod} from '../Api';
import {FCMService} from './FCMService';
import LocalNotificationService from './LocalService';
import Storage from '../Storage';
import {handleServerMessage} from 'utils/MessageHelper';
import NavigationService from 'services/Navigation';

async function syncFcmToken({userId, deviceToken}) {
  try {
    const response = await Api({
      method: RequestMethod.POST,
      url: `/users/${userId}/profile/update`,
      data: {
        device_token: deviceToken,
      },
    });
    const schema = response.data.data.user.schema;
    if (schema) {
      FCMService.subscribeToNews(schema);
    }
    return response.data;
  } catch (e) {
    console.log(handleServerMessage(e));
  }
}

async function onRegister(token) {
  Storage.setFCMToken(token);
}

function onNotification(notify) {
  const options = {
    soundName: 'default',
    playSound: true,
  };
  LocalNotificationService.showNotification(
    0,
    notify.title,
    notify.body,
    notify,
    options,
  );
}

function onOpenNotification(notify) {
  try {
    if (notify?.data?.post) {
      const post = JSON.parse(notify?.data?.post);
      if (post && Object.keys(post).length > 0) {
        NavigationService.navigate(NavigationService.Screens.HOME, {
          fromNotification: true,
        });
      }
    }
  } catch (error) {
    console.log(
      '🚀 ~ file: index.js ~ line 50 ~ onOpenNotification ~ error',
      error,
    );
  }
}

function setup() {
  // Register for remote notification.
  FCMService.registerAppWithFCM();
  FCMService.register(onRegister, onNotification, onOpenNotification);
  LocalNotificationService.configure(onOpenNotification);
}

function cleanup() {
  FCMService.cleanup();
  LocalNotificationService.cleanup();
}

export default {
  setup,
  syncFcmToken,
  cleanup,
};
