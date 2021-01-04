import {all} from 'redux-saga/effects';
import usersSaga from './services/Users/saga';
import authSaga from './services/Auth/saga';
import appSaga from './services/App/saga';
import recognitionSaga from './services/Recognition/saga';
import rewardSaga from './services/Reward/saga';
import postSaga from './services/Post/saga';

export default function* () {
  yield all([
    usersSaga(),
    authSaga(),
    appSaga(),
    recognitionSaga(),
    rewardSaga(),
    postSaga(),
  ]);
}
