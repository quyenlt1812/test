import {SET_SIGN_IN_LOADING, SET_SIGN_IN_STATUS} from './constants';

const initialState = {
  signInStatus: {
    statusCode: 200,
    message: '',
    data: null,
  },
  signInLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SIGN_IN_STATUS: {
      const {status} = action.payload;
      return {
        ...state,
        signInStatus: {
          ...state.signInStatus,
          ...status,
        },
      };
    }
    case SET_SIGN_IN_LOADING: {
      const {loading} = action.payload;
      return {
        ...state,
        signInLoading: loading,
      };
    }
  }
  return state;
};
