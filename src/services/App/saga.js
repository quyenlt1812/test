import {takeEvery, call, put} from 'redux-saga/effects';

import VersionNumber from 'react-native-version-number';

import {Linking, Platform} from 'react-native';

import AppNavigation from '../Navigation';
import Storage from '../Storage';
import i18n from '../../translation';
import RecognitionActions from '../Recognition/actions';
import RecognitionRepo from '../Recognition/repo';
import {SOCKET_CONNECT} from '../Socket/constants';
import UsersActions from '../Users/actions';
import UsersRepo from '../Users/repo';
import {detachVersion} from '../../utils/VersionHelper';

import AppActions from './actions';
import {GET_APP_DATA} from './constants';
import AppRepo from './repo';

function* getAppData() {
  try {
    const {token, isExpired} = yield Storage.getAccessToken();
    const userId = yield Storage.getUserId();
    if (!token || isExpired() || !userId) {
      AppNavigation.replace(AppNavigation.Screens.AUTH);
      return;
    }
    const appVersionResult = yield call(AppRepo.checkAppVersionRepo);
    if (appVersionResult?.version) {
      const currentAppVersion = detachVersion(VersionNumber.appVersion);
      const appStoreVersion = detachVersion(appVersionResult.version);
      if (
        currentAppVersion.major < appStoreVersion.major ||
        currentAppVersion.minor < appStoreVersion.minor ||
        currentAppVersion.patch < appStoreVersion.patch
      ) {
        yield put(
          AppActions.openConfirmModal({
            isRequired: appVersionResult.update,
            title: i18n.t('new-version-title'),
            message: appVersionResult.update
              ? i18n.t('new-version-message-required')
              : i18n.t('new-version-message'),
            confirmTitle: i18n.t('update'),
            onConfirm: () => {
              if (Platform.OS === 'android') {
                Linking.openURL('market://details?id=vn.tribee');
              } else {
                Linking.openURL(
                  'itms-apps://itunes.apple.com/us/app/apple-store/1533756916?mt=8',
                );
              }
            },
            cancelTitle: i18n.t('later'),
          }),
        );
      }
    }
    yield put(UsersActions.getUserProfile(userId));
    yield put(UsersActions.syncFCMToken({userId}));
    yield put(RecognitionActions.getReceivedRecognitions(0, userId)); //
    yield put(RecognitionActions.getSentRecognitions(0, userId)); //
    yield put(RecognitionActions.getRecognitionBadges()); //
    yield put(RecognitionActions.getRecognitionImages()); //
    const userR = yield call(UsersRepo.getUserProfileRepo, {userId});
    yield put({
      type: SOCKET_CONNECT,
      payload: {schema: userR.data.user.schema, token},
    });
    console.log(
      'function*getAppData -> schema',
      Platform.OS,
      userR.data.user.schema,
    );
    const result = yield call(UsersRepo.getUserProfileRepo, {userId});
    const currentUser = result?.data?.user;
    const recognitionResult = yield call(RecognitionRepo.getPostRepo, {
      offset: 0,
    });
    if (recognitionResult?.data?.posts) {
      yield put(
        RecognitionActions.setRecognitions({
          recognitions: recognitionResult?.data?.posts,
          offset: recognitionResult?.data?.posts?.length,
          hasNext: recognitionResult?.data?.posts?.length === 10,
        }),
      );
    }

    if (currentUser?.setup_password) {
      AppNavigation.navigate(AppNavigation.Screens.SET_PASSWORD);
    } else {
      AppNavigation.replace(AppNavigation.Screens.MAIN);
    }
  } catch (error) {
    console.error('function*getAppData -> error', error);
    yield put(
      AppActions.openAlertModal({
        title: i18n.t('error'),
        message: i18n.t('server-contacting'),
      }),
    );
  }
}

export default function* () {
  yield takeEvery(GET_APP_DATA, getAppData);
}
