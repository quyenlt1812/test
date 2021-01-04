import {
  CHANGE_PASSWORD,
  GET_COLLEAGUES,
  GET_REWARDS,
  GET_USER_PROFILE,
  REFRESH_USER_REWARD,
  RESET_USER,
  SEARCH_PEERS,
  SET_COLLEAGUES,
  SET_CURRENT_USER,
  SET_PEERS,
  SET_REWARDS,
  SET_USER_REWARD_LOADING,
  SYNC_FCM_TOKEN,
  UPDATE_USER,
  UPLOAD_AVATAR,
} from './constants';

const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: {user},
  };
};

const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    payload: {user},
  };
};

const uploadAvatar = (file) => {
  return {
    type: UPLOAD_AVATAR,
    payload: {file},
  };
};

const setPeers = ({peers, offset, hasNext}) => {
  return {
    type: SET_PEERS,
    payload: {peers, offset, hasNext},
  };
};

const searchPeers = (searchText, offset) => {
  return {
    type: SEARCH_PEERS,
    payload: {searchText, offset},
  };
};

const getUserProfile = (userId) => {
  return {
    type: GET_USER_PROFILE,
    payload: {userId},
  };
};

const getColleagues = ({userId, offset}) => {
  return {
    type: GET_COLLEAGUES,
    payload: {userId, offset},
  };
};

const setColleagues = ({colleagues, offset, hasNext}) => {
  return {
    type: SET_COLLEAGUES,
    payload: {colleagues, offset, hasNext},
  };
};

const changePassword = ({newPassword, isEdit}) => {
  return {
    type: CHANGE_PASSWORD,
    payload: {newPassword, isEdit},
  };
};

const getUserRewards = ({userId, offset}) => {
  return {
    type: GET_REWARDS,
    payload: {userId, offset},
  };
};

const setUserRewards = ({rewards, offset, hasNext}) => {
  return {
    type: SET_REWARDS,
    payload: {rewards, offset, hasNext},
  };
};

const syncFCMToken = ({userId}) => {
  return {
    type: SYNC_FCM_TOKEN,
    payload: {userId},
  };
};

const refreshUserRewards = () => {
  return {
    type: REFRESH_USER_REWARD,
  };
};

const setUserRewardsLoading = (isLoading) => {
  return {
    type: SET_USER_REWARD_LOADING,
    payload: {isLoading},
  };
};

const resetUser = () => {
  return {
    type: RESET_USER,
  };
};

export default {
  setCurrentUser,
  updateUser,
  uploadAvatar,
  setPeers,
  searchPeers,
  getUserProfile,
  getColleagues,
  setColleagues,
  changePassword,
  getUserRewards,
  setUserRewards,
  syncFCMToken,
  refreshUserRewards,
  setUserRewardsLoading,
  resetUser,
};
