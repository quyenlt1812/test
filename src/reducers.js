import {combineReducers} from 'redux';
import usersReducer from './services/Users/reducer';
import authReducer from './services/Auth/reducer';
import appReducer from './services/App/reducer';
import recognitionReducer from './services/Recognition/reducer';
import rewardReducer from './services/Reward/reducer';
import postReducer from './services/Post/reducer';

export default combineReducers({
  users: usersReducer,
  auth: authReducer,
  app: appReducer,
  recognition: recognitionReducer,
  reward: rewardReducer,
  post: postReducer,
});
