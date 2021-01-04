import AsyncStorage from '@react-native-community/async-storage';
import jwtDecode from 'jwt-decode';
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  USER_ID,
  LANGUAGE,
  FCM_TOKEN,
} from './constants';
class Storage {
  storage() {
    return AsyncStorage;
  }

  setRefreshToken = async (value) => {
    await this.storage().setItem(
      `token-${REFRESH_TOKEN}`,
      JSON.stringify(value),
    );
  };

  getRefreshToken = async () => {
    const token = JSON.parse(
      await this.storage().getItem(`token-${REFRESH_TOKEN}`),
    );
    return {
      token,
      isExpired: () => {
        const decodedData = jwtDecode(token);
        if (decodedData) {
          const {exp} = decodedData;
          return new Date(exp * 1000) < new Date();
        } else {
          return true;
        }
      },
    };
  };

  setAccessToken = async (value) => {
    await this.storage().setItem(
      `token-${ACCESS_TOKEN}`,
      JSON.stringify(value),
    );
  };

  setUserId = async (value) => {
    await this.storage().setItem(USER_ID, JSON.stringify(value));
  };

  getUserId = async () => {
    return await this.storage().getItem(USER_ID);
  };

  setLanguage = async (language) => {
    await this.storage().setItem(LANGUAGE, language);
  };

  getLanguage = async () => {
    return await this.storage().getItem(LANGUAGE);
  };

  getAccessToken = async () => {
    const token = JSON.parse(
      await this.storage().getItem(`token-${ACCESS_TOKEN}`),
    );
    return {
      token,
      isExpired: () => {
        const decodedData = jwtDecode(token);
        if (decodedData) {
          const {exp} = decodedData;
          return new Date(exp * 1000) < new Date();
        } else {
          return true;
        }
      },
    };
  };

  isSeenIntro = async () => {
    const isSeen = await this.storage().getItem('seenIntroduction');
    if (isSeen) {
      return true;
    }
    return false;
  };

  isSeenWelcome = async () => {
    const isSeen = await this.storage().getItem('seenWelcome');
    if (isSeen) {
      return true;
    }
    return false;
  };

  setSeenWelcome = async () => {
    await this.storage().setItem('seenWelcome', 'true');
  };

  setFCMToken = async (value) => {
    await this.storage().setItem(`token-${FCM_TOKEN}`, value);
  };

  getFCMToken = async () => {
    const token = await this.storage().getItem(`token-${FCM_TOKEN}`);
    return token;
  };

  clear = async () => {
    const allKeys = await this.storage().getAllKeys();
    await this.storage().removeItem(USER_ID);
    await Promise.all(
      allKeys.map((k) => k.includes('token') && this.storage().removeItem(k)),
    );
  };
}

export default new Storage();
