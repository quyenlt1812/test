import {
  RESET_REWARDS,
  SET_ALL_REWARDS,
  SET_COLLECTIONS,
  SET_REWARDS_LOADING,
} from './constants';

const initialState = {
  collections: [],
  allRewards: null,
  isLoading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_COLLECTIONS: {
      const {collections} = action.payload;
      return {
        ...state,
        collections,
      };
    }
    case SET_ALL_REWARDS: {
      const {rewards} = action.payload;
      return {
        ...state,
        allRewards: rewards,
      };
    }
    case SET_REWARDS_LOADING: {
      const {isLoading} = action.payload;
      return {
        ...state,
        isLoading,
      };
    }
    case RESET_REWARDS: {
      return initialState;
    }
  }
  return state;
};
