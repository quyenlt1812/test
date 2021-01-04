const {
  SET_COLLECTIONS,
  GET_COLLECTIONS,
  GET_ALL_REWARDS,
  SET_ALL_REWARDS,
  REFRESH_REWARDS,
  SET_REWARDS_LOADING,
  RESET_REWARDS,
} = require('./constants');

const setCollections = (collections) => {
  return {
    type: SET_COLLECTIONS,
    payload: {collections},
  };
};

const getCollections = () => {
  return {
    type: GET_COLLECTIONS,
  };
};

const getAllRewards = () => {
  return {
    type: GET_ALL_REWARDS,
  };
};

const setAllRewards = (rewards) => {
  return {
    type: SET_ALL_REWARDS,
    payload: {rewards},
  };
};

const refreshRewards = () => {
  return {
    type: REFRESH_REWARDS,
  };
};

const setRewardsLoading = (isLoading) => {
  return {
    type: SET_REWARDS_LOADING,
    payload: {isLoading},
  };
};

const resetRewards = () => {
  return {
    type: RESET_REWARDS,
  };
};

export default {
  setCollections,
  getCollections,
  getAllRewards,
  setAllRewards,
  refreshRewards,
  setRewardsLoading,
  resetRewards,
};
