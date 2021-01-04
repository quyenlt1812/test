import {takeEvery, call, put, select, delay} from 'redux-saga/effects';
import {
  GET_RECEIVED_RECOGNITIONS,
  GET_RECOGNITIONS,
  GET_SENT_RECOGNITIONS,
  GET_TOP_VALUES,
  SEND_RECOGNITION,
} from './constants';
import RecognitionActions from './actions';
import RecognitionRepo from './repo';
import {getCurrentUser} from '../Users/selectors';
import AppActions from '../App/actions';
import {
  getReceivedRecognition,
  getRecognitions,
  getSentRecognitions,
} from './selectors';
import Toast from 'react-native-root-toast';
import {GET_RECOGNITION_BADGES, GET_RECOGNITION_IMAGES} from '../App/constants';
import i18n from '../../translation';
import AppSocket from '../Socket/index';

function* sendRecognitionSaga({payload: {recognition}}) {
  try {
    // yield put(
    //   AppActions.openAlertModal({
    //     title: 'Send recognition failed',
    //     message: 'Something went wrong. Please try again later!',
    //   }),
    // );
    const currentUser = yield select(getCurrentUser);
    const result = yield call(RecognitionRepo.sendRecognitionRepo, {
      userId: currentUser?.id,
      recognition,
    });
    if (result?.data?.post && Object.keys(result?.data?.post).length) {
      // yield put(RecognitionActions.addRecognition(result?.recognitions));
      Toast.show(i18n.t('recognition-sent'));
      AppSocket.updateHomeFeed(result?.data?.post?.id);
      yield put(
        RecognitionActions.triggerHomeScrolling({value: new Date().getTime()}),
      );
    }
  } catch (error) {
    console.log('function*sendRecognition -> error', error);
    yield delay(250);
    yield put(
      AppActions.openAlertModal({
        title: 'Send recognition failed',
        message:
          error.message || 'Something went wrong. Please try again later!',
      }),
    );
  }
}

function* getRecognitionsSaga({payload: {offset}}) {
  try {
    const recognitions = yield select(getRecognitions);
    const result = yield call(RecognitionRepo.getPostRepo, {offset});
    if (result?.data?.posts) {
      yield put(
        RecognitionActions.setRecognitions({
          recognitions: result?.data?.posts,
          offset:
            offset === 0
              ? 0
              : recognitions.offset + result?.data?.posts?.length,
          hasNext: result?.data?.posts?.length === 10,
        }),
      );
    }
  } catch (error) {
    console.error('function*getRecognitions -> error', error);
  }
}

function* getSentRecognitionsSaga({payload: {offset, userId}}) {
  try {
    const recognitions = yield select(getSentRecognitions);
    const currentUser = yield select(getCurrentUser);
    const result = yield call(RecognitionRepo.getSentRecognitionsRepo, {
      userId: userId || currentUser?.id,
      offset,
      limit: 10,
    });
    if (result?.data?.recognitions) {
      yield put(
        RecognitionActions.setSentRecognitions({
          recognitions: result?.data?.recognitions,
          offset:
            offset === 0
              ? 0
              : recognitions.offset + result?.data?.recognitions?.length,
          hasNext: result?.data?.recognitions.length === 10,
          total: result?.data?.totalRecognitionsSend,
        }),
      );
    }
  } catch (error) {
    console.error('function*getSentRecognitionsSaga -> error', error);
  }
}

function* getReceivedRecognitionsSaga({payload: {offset, userId}}) {
  try {
    const currentRecognitions = yield select(getReceivedRecognition);
    const currentUser = yield select(getCurrentUser);
    const result = yield call(RecognitionRepo.getReceivedRecognitionsRepo, {
      userId: userId || currentUser?.id,
      offset,
      limit: 10,
    });
    const recognitions = result?.data?.recognitions;
    if (recognitions) {
      yield put(
        RecognitionActions.setReceivedRecognitions({
          recognitions,
          offset:
            offset === 0 ? 0 : currentRecognitions.offset + recognitions.length,
          hasNext: recognitions.length === 10,
          total: result?.data?.totalRecognitionsReceived,
        }),
      );
      yield put(
        AppActions.setNotification({
          notifications: recognitions,
          ping:
            Array.isArray(currentRecognitions.list) &&
            currentRecognitions.list[0].id !== recognitions[0].id,
        }),
      );
    }
  } catch (error) {
    console.error('function*getReceivedRecognitionsSaga -> error', error);
  }
}

function* getTopValuesSaga({payload: {userId}}) {
  try {
    const result = yield call(RecognitionRepo.getTopValuesRepo, {
      userId,
    });
    if (result?.data?.values) {
      yield put(RecognitionActions.setTopValues(result?.data?.values));
    }
  } catch (error) {
    console.error('function*getTopValuesSaga -> error', error);
  }
}

function* getRecognitionBadgesSaga() {
  try {
    const result = yield call(RecognitionRepo.getRecognitionBadgesRepo);
    if (result?.data?.recognitions_badges) {
      yield put(AppActions.setBadges(result?.data?.recognitions_badges));
    }
  } catch (error) {
    console.error('function*getRecognitionBadgesSaga -> error', error);
  }
}

function* getRecognitionImagesSaga() {
  try {
    const result = yield call(RecognitionRepo.getRecognitionImagesRepo);
    if (result?.data?.recognitions_images) {
      yield put(
        AppActions.setRecognitionImages(result?.data?.recognitions_images),
      );
    }
  } catch (error) {
    console.error('function*getRecognitionImagesSaga -> error', error);
  }
}

export default function* () {
  yield takeEvery(SEND_RECOGNITION, sendRecognitionSaga);
  yield takeEvery(GET_RECOGNITIONS, getRecognitionsSaga);
  yield takeEvery(GET_TOP_VALUES, getTopValuesSaga);
  yield takeEvery(GET_SENT_RECOGNITIONS, getSentRecognitionsSaga);
  yield takeEvery(GET_RECEIVED_RECOGNITIONS, getReceivedRecognitionsSaga);
  yield takeEvery(GET_RECOGNITION_BADGES, getRecognitionBadgesSaga);
  yield takeEvery(GET_RECOGNITION_IMAGES, getRecognitionImagesSaga);
}
