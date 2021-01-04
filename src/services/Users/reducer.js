import {isArrayEqual} from 'utils/Comparison';
import {
  RESET_USER,
  SET_COLLEAGUES,
  SET_CURRENT_USER,
  SET_PEERS,
  SET_REWARDS,
  SET_USER_REWARD_LOADING,
} from './constants';

const initialState = {
  currentUser: null,
  peers: {
    list: null,
    offset: 0,
    hasNext: false,
  },
  colleagues: {
    list: null,
    offset: 0,
    hasNext: false,
  },
  rewards: {
    list: null,
    offset: 0,
    hasNext: true,
    isLoading: true,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER: {
      const {user} = action.payload;
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...user,
        },
      };
    }
    case SET_PEERS: {
      const {peers, offset, hasNext} = action.payload;
      let tmpPeers = [];
      if (offset > 10 && Array.isArray(state?.peers?.list)) {
        tmpPeers = state?.peers?.list?.concat(peers);
      } else {
        tmpPeers = peers;
      }
      if (tmpPeers?.length === state?.peers?.list?.length && offset > 0)
        return state;
      return {
        ...state,
        peers: {
          list: tmpPeers,
          offset,
          hasNext,
        },
      };
    }
    case SET_COLLEAGUES: {
      const {colleagues, offset, hasNext} = action.payload;
      let list = [];
      if (offset <= 10) {
        list = colleagues;
      } else {
        list = state.colleagues.list.concat(colleagues);
      }
      return {
        ...state,
        colleagues: {
          list,
          offset,
          hasNext,
        },
      };
    }
    case SET_REWARDS: {
      const {rewards, offset, hasNext} = action.payload;
      let list = [];
      let offs = 0;
      if (offset === 0) {
        list = rewards;
        offs = rewards.length;
      } else {
        list = state.rewards.list.concat(rewards);
        offs = offset;
      }
      return {
        ...state,
        rewards: {
          ...state.rewards,
          list,
          offset: offs,
          hasNext,
        },
      };
    }
    case SET_USER_REWARD_LOADING: {
      const {isLoading} = action.payload;
      return {
        ...state,
        rewards: {
          ...state.rewards,
          isLoading,
        },
      };
    }
    case RESET_USER: {
      return initialState;
    }
  }
  return state;
};
