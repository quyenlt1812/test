import axios from 'axios';

import jwtDecode from 'jwt-decode';

import Config from 'react-native-config';

import {call} from 'redux-saga/effects';

import Storage from '../Storage';

// const btServerRequest = new BugsTracking(BUGS_FILTER.SERVER_REQUEST);
export const RequestMethod = {
  POST: 'post',
  GET: 'get',
};

const requestConfig = {
  baseURL: Config.SERVER_URL,
  timeout: 15000,
  validateStatus: (status) => status < 400,
};

const instance = axios.create(requestConfig);

instance.interceptors.request.use(async (config) => {
  const {url} = config;
  if (
    url &&
    url.includes('/auth/') &&
    !url.includes('/logout') &&
    url.includes('/magic-link')
  ) {
    return {
      ...config,
    };
  }
  const {token} = await Storage.getAccessToken();
  if (token) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  } else {
    return {
      ...config,
    };
  }
});

instance.interceptors.response.use(
  (response) => {
    const {data} = response;
    const {token, accessToken} = data;

    const extendResponseData = {};
    if (token) {
      extendResponseData.decodedToken = jwtDecode(token);
    }
    if (accessToken) {
      extendResponseData.decodedAccessToken = jwtDecode(accessToken);
    }

    return {
      ...response,
      data: {
        ...data,
        ...extendResponseData,
      },
    };
  },
  (error) => {
    // btServerRequest.notify(error, {requestConfig: error.config});

    // if (Config.APP_ENV === 'staging') {
    //   btServerRequest.notify(error, {requestConfig: error.config});
    // }
    throw error;
  },
);

const Api = ({url, method, data, params}) => {
  return instance.request({
    method,
    url,
    data,
    params,
  });
};

export function* sendRequest(args) {
  try {
    return yield call(Api, args);
  } catch (e) {
    console.error('[Api]: function*sendRequest -> e', e);
  }
}

export default Api;
