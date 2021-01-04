import {call, put, select, takeEvery} from 'redux-saga/effects';
import {SET_SIGN_IN_LOADING, SIGN_IN, SIGN_OUT} from './constants';
import AuthRepo from './repo';
import AppActions from '../App/actions';
import Storage from '../Storage';
import NavigationService from '../Navigation';
import Notification from '../Notification';
import {getCurrentUser} from '../Users/selectors';
import RecognitionActions from '../Recognition/actions';
import RewardActions from '../Reward/actions';
import UserActions from '../Users/actions';

function* signInSaga({payload: {email, password}}) {
  try {
    yield put({type: SET_SIGN_IN_LOADING, payload: {loading: true}});
    const result = yield call(AuthRepo.signInRepo, {
      email: email.toLowerCase(),
      password,
    });
    if (result?.data && Object.keys(result?.data).length) {
      const {user, token} = result?.data;
      Storage.setAccessToken(token);
      Storage.setUserId(user?.id);
      Storage.setLanguage(user?.language);
      yield put(UserActions.syncFCMToken({userId: user?.id}));
      yield put(AppActions.getAppData());
      // yield put(UsersActions.setCurrentUser(result?.data?.user));
    } else {
      const message =
        typeof result?.message === 'string'
          ? result?.message
          : result?.message[0];
      yield put(
        AppActions.openAlertModal({
          title: 'Sign in failed',
          message: message || 'Something went wrong. Please try again later!',
        }),
      );
    }
    yield put({type: SET_SIGN_IN_LOADING, payload: {loading: false}});
  } catch (error) {
    yield put({type: SET_SIGN_IN_LOADING, payload: {loading: false}});
    yield put(
      AppActions.openAlertModal({
        title: 'Sign in failed',
        message:
          error.message || 'Something went wrong. Please try again later!',
      }),
    );
  }
}

function* signOutSaga() {
  try {
    const currentUser = yield select(getCurrentUser);
    const response = yield call(Notification.syncFcmToken, {
      userId: currentUser.id,
      deviceToken: null,
    });
    if (response?.status === 'success') {
      console.log('Remove FCMToken Succcessfully');
    }
    yield put(AppActions.closeConfirmModal());
    NavigationService.replace(NavigationService.Screens.AUTH);
    yield Storage.clear();
    yield put(RecognitionActions.resetRecognition());
    yield put(RewardActions.resetRewards());
    yield put(UserActions.resetUser());
  } catch (error) {
    console.error('function*signOutSaga -> error', error);
  }
}

export default function* () {
  yield takeEvery(SIGN_IN, signInSaga);
  yield takeEvery(SIGN_OUT, signOutSaga);
}
