import {call, put, select, takeEvery} from 'redux-saga/effects';
import {
  CHANGE_PASSWORD,
  GET_COLLEAGUES,
  GET_REWARDS,
  GET_USER_PROFILE,
  SEARCH_PEERS,
  SYNC_FCM_TOKEN,
  UPDATE_USER,
  UPLOAD_AVATAR,
} from './constants';
import UsersRepo from './repo';
import UsersAction from './actions';
import Toast from 'react-native-root-toast';
import {
  getColleagues,
  getCurrentUser,
  getPeers,
  getUserRewards,
} from './selectors';
import AppActions from '../App/actions';
import NavigationService from '../Navigation';
import Storage from '../Storage';
import Notification from '../Notification';
import i18n from '../../translation';

function* updateUserSaga({payload: {user}}) {
  try {
    const currentUser = yield select(getCurrentUser);
    const result = yield call(UsersRepo.updateUserRepo, {
      userId: currentUser.id,
      user,
    });
    if (Object.keys(result?.data?.user).length) {
      yield put(UsersAction.setCurrentUser(result?.data?.user));
      NavigationService.pop();
      Toast.show(i18n.t('info-updated'));
    }
  } catch (error) {
    yield put(
      AppActions.openAlertModal({
        title: 'Update profile failed',
        message:
          error.message || 'Something went wrong. Please try again later!',
      }),
    );
  }
}

function* uploadAvatarSaga({payload: {file}}) {
  try {
    const currentUser = yield select(getCurrentUser);
    const result = yield call(UsersRepo.uploadAvatarRepo, {
      userId: currentUser?.id,
      file,
    });
    if (result?.data?.file?.url) {
      yield put(
        UsersAction.setCurrentUser({
          ...currentUser,
          avatar: result?.data?.file?.url,
        }),
      );
      Toast.show(i18n.t('avatar-updated'));
    }
  } catch (error) {
    console.error('function*uploadAvatar -> error', error);
  }
}

function* searchPeersSaga({payload: {searchText, offset}}) {
  try {
    const peers = yield select(getPeers);
    const result = yield call(UsersRepo.searchPeersRepo, {searchText, offset});
    const users = result?.data?.users;

    if (Array.isArray(users)) {
      yield put(
        UsersAction.setPeers({
          peers: users.slice(0, 10),
          offset:
            users.length === 11
              ? peers.offset + 10
              : peers.offset + users.length,
          hasNext: users.length === 11,
        }),
      );
    }
  } catch (error) {
    console.error('function*searchPeersSaga -> error', error);
  }
}

function* getUserProfileSaga({payload: {userId}}) {
  try {
    const result = yield call(UsersRepo.getUserProfileRepo, {userId});
    if (result?.data?.user) {
      yield put(UsersAction.setCurrentUser(result?.data?.user));
    }
  } catch (error) {
    console.error('function*getUserProfileSaga -> error', error);
  }
}

function* getColleaguesSaga({payload: {userId, offset}}) {
  try {
    const currentUser = yield select(getCurrentUser);
    const currentColleagues = yield select(getColleagues);

    if (offset !== currentColleagues.offset - 1) {
      const result = yield call(UsersRepo.getColleaguesRepo, {
        userId: userId || currentUser?.id,
        offset,
      });
      const users = result?.data?.users;

      if (Array.isArray(users)) {
        // const colleagues = users.filter(
        //   (colleague) =>
        //     colleague?.id !== Number.parseInt(userId || currentUser?.id, 10),
        // );

        const tmpOffset =
          currentColleagues.offset === -1 ? 0 : currentColleagues.offset;

        yield put(
          UsersAction.setColleagues({
            colleagues: users.slice(0, 10),
            offset:
              users?.length === 11 ? tmpOffset + 10 : tmpOffset + users?.length,
            hasNext: users?.length === 11,
          }),
        );
      }
    }
  } catch (error) {
    console.error('function*getColleaguesSaga -> error', error);
  }
}

function* changePasswordSaga({payload: {newPassword, isEdit}}) {
  try {
    const currentUser = yield select(getCurrentUser);
    const userId = yield Storage.getUserId();
    const result = yield call(UsersRepo.changePasswordRepo, {
      userId: userId || currentUser?.id,
      newPassword,
    });
    if (!isEdit) {
      NavigationService.replace(NavigationService.Screens.MAIN);
    }
  } catch (error) {
    yield put(
      AppActions.openAlertModal({
        title: 'request-failed',
        message: error.message,
      }),
    );
    console.error('function*changePasswordSaga -> error', error);
  }
}

function* getRewardsSaga({payload: {userId, offset}}) {
  try {
    yield put(UsersAction.setUserRewardsLoading(true));
    const currentUser = yield select(getCurrentUser);
    const currentRewards = yield select(getUserRewards);
    const result = yield call(UsersRepo.getUserRewardsRepo, {
      userId: userId || currentUser?.id,
      offset,
    });
    const rewards = result?.data?.values;
    if (rewards && rewards?.length) {
      yield put(
        UsersAction.setUserRewards({
          rewards,
          offset: offset === 0 ? 0 : currentRewards.offset + rewards?.length,
          hasNext: rewards?.length === 10,
        }),
      );
    }
    yield put(UsersAction.setUserRewardsLoading(false));
  } catch (error) {
    yield put(UsersAction.setUserRewardsLoading(false));
    console.error('function*getRewardsSaga -> error', error);
  }
}

function* syncFCMTokenSaga({payload: {userId}}) {
  try {
    const fcmToken = yield call(Storage.getFCMToken);
    if (fcmToken) {
      const response = yield call(Notification.syncFcmToken, {
        userId,
        deviceToken: fcmToken,
      });
      if (response?.status === 'success') {
        console.log('Register FCMToken Succcessfully');
      }
    } else {
      throw new Error('Cannot find FCMToken');
    }
  } catch (e) {
    console.error('error', e);
  }
}

export default function* () {
  yield takeEvery(UPDATE_USER, updateUserSaga);
  yield takeEvery(UPLOAD_AVATAR, uploadAvatarSaga);
  yield takeEvery(SEARCH_PEERS, searchPeersSaga);
  yield takeEvery(GET_USER_PROFILE, getUserProfileSaga);
  yield takeEvery(GET_COLLEAGUES, getColleaguesSaga);
  yield takeEvery(CHANGE_PASSWORD, changePasswordSaga);
  yield takeEvery(GET_REWARDS, getRewardsSaga);
  yield takeEvery(SYNC_FCM_TOKEN, syncFCMTokenSaga);
}
