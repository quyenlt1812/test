import {call, put, takeEvery} from 'redux-saga/effects';
import {GET_ALL_REWARDS, GET_COLLECTIONS, REFRESH_REWARDS} from './constants';
import RewardRepo from './repo';
import RewardActions from './actions';

function* getCollectionsSaga({}) {
  try {
    const result = yield call(RewardRepo.getCollectionsRepo);
    const collections = result?.data?.collections;
    if (collections && collections.length) {
      yield put(RewardActions.setCollections(collections));
    }
  } catch (error) {
    console.error('function*getCategoriesSaga -> error', error);
  }
}

function* getProductsByCollectionSaga({payload: {collectionId}}) {
  try {
    const result = yield call(RewardRepo.getProductsByCollectionRepo, {
      collectionId,
    });
    const rewards = result?.data?.rewards;
    if (rewards && rewards.length) {
      yield put();
    }
  } catch (error) {
    console.error('function*getProductsByCollectionSaga -> error', error);
  }
}

function* getAllRewardsSaga() {
  try {
    const results = yield call(RewardRepo.getAllRewardsRepo);
    const rewards = results?.data?.rewards;
    if (rewards && rewards.length > 0) {
      yield put(RewardActions.setAllRewards(rewards));
    }
    yield put(RewardActions.setRewardsLoading(false));
  } catch (error) {
    console.error('function*getAllRewardsSaga -> error', error);
  }
}

function* refreshRewardsSaga() {
  try {
    yield put(RewardActions.setRewardsLoading(true));
    const collectionResults = yield call(RewardRepo.getCollectionsRepo);
    const collections = collectionResults?.data?.collections;
    if (collections && collections.length) {
      yield put(RewardActions.setCollections(collections));
    }
    const rewardsResults = yield call(RewardRepo.getAllRewardsRepo);
    const rewards = rewardsResults?.data?.rewards;
    if (rewards && rewards.length > 0) {
      yield put(RewardActions.setAllRewards(rewards));
    }
    yield put(RewardActions.setRewardsLoading(false));
  } catch (error) {}
}

export default function* () {
  yield takeEvery(GET_COLLECTIONS, getCollectionsSaga);
  yield takeEvery(GET_ALL_REWARDS, getAllRewardsSaga);
  yield takeEvery(REFRESH_REWARDS, refreshRewardsSaga);
}
