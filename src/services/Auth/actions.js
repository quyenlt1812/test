import {SET_SIGN_IN_STATUS, SIGN_IN, SIGN_OUT} from './constants';

const signIn = ({email, password}) => {
  return {
    type: SIGN_IN,
    payload: {
      email,
      password,
    },
  };
};

const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

const setSignInStatus = (status) => {
  return {
    type: SET_SIGN_IN_STATUS,
    payload: {status},
  };
};

export default {
  signIn,
  setSignInStatus,
  signOut,
};
