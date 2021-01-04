import io from 'socket.io-client';

import Config from 'react-native-config';

import {
  DECREASE_REACTION_NUMBER,
  INCREASE_COMMENTS_NUMBER,
  INCREASE_REACTION_NUMBER,
} from 'services/Recognition/constants';

import {Reactions} from 'constants/post';

import AppActions from '../App/actions';
import PostActions from '../Post/actions';
import RecognitionActions from '../Recognition/actions';
import UsersActions from '../Users/actions';

import {
  ADD_POST,
  CONNECT,
  DECREASE_POST_REACTION_NUMBER,
  DISCONNECT,
  INCREASE_POST_COMMENT_NUMBER,
  INCREASE_POST_REACTION_NUMBER,
  JOIN_HOME_FEED_ROOM,
  JOIN_POST_ROOM,
  LEAVE_POST_ROOM,
  RECEIVE_HOME_FEED,
  RECEIVE_POST_COMMENT,
  SEND_POST_COMMENT,
  SEND_POST_REACTION,
  SEND_RECOGNITION,
  SOCKET_CONNECT,
  UPDATE_HOME_FEED,
} from './constants';

class AppSocket {
  static instance = null;
  static reduxStore = null;

  constructor() {
    throw new Error('AppSocket singleton cannot be instantiated.');
  }

  static connect({schema, token}) {
    console.log(
      'TRY TO CONNECT SOCKET WITH SCHEMA:',
      schema,
      Config.SOCKET_URL,
    );
    try {
      AppSocket.instance = io(Config.SOCKET_URL, {
        transports: ['polling', 'websocket'],
        // query: `token=${token}`,
      });

      AppSocket.on('connect_failed', () => {
        console.log('Socket connect failed');
      });

      AppSocket.on('connect_error', (error) => {
        console.log('Socket connect error', JSON.parse(JSON.stringify(error)));
      });
    } catch (e) {
      console.log('AppSocket -> connect -> e', e);
    }
  }

  static disconnect() {
    try {
      if (AppSocket.instance) {
        AppSocket.instance.disconnect();
      }
    } catch (e) {
      console.error(e);
    }
  }

  static get connected() {
    let connected = false;
    try {
      connected = AppSocket.instance && AppSocket.instance.connected;
    } catch (e) {
      console.error(e);
    } finally {
      return connected;
    }
  }

  static on(event, fn) {
    try {
      if (AppSocket.instance) {
        AppSocket.instance.on(event, fn);
      }
    } catch (e) {
      console.error(e);
    }
  }

  static off(event, fn) {
    try {
      if (AppSocket.instance) {
        AppSocket.instance.off(event, fn);
      }
    } catch (e) {
      console.error(e);
    }
  }

  static emit(event, ...args) {
    try {
      if (AppSocket.instance) {
        AppSocket.instance.emit(event, ...args);
      }
    } catch (e) {
      console.error(e);
    }
  }

  static onConnect() {
    try {
      console.log('Socket has been connected');
    } catch (e) {
      console.error(e);
    }
  }

  static onDisconnect(reason) {
    console.warn(`Disconnected: ${reason}`);
  }

  static joinHomeFeedRoom() {
    AppSocket.emit(JOIN_HOME_FEED_ROOM);
  }

  static joinPostRoom(postId) {
    console.log('🚀 Join room:', postId);
    AppSocket.emit(JOIN_POST_ROOM, {room: postId});
  }

  static leavePostRoom(postId) {
    console.log('🚀 Leave room:', postId);

    AppSocket.emit(LEAVE_POST_ROOM, {room: postId});
  }

  static sendPostComment({
    commenterId,
    postId,
    content,
    schema,
    commenterName,
  }) {
    console.log('Send comment to postId:', postId);
    AppSocket.emit(SEND_POST_COMMENT, {
      commenterId,
      postId,
      content,
      schema,
      commenterName,
    });
  }

  static sendPostReaction({postId, userId, type, schema}) {
    console.log('Send reaction to post', postId);
    AppSocket.emit(SEND_POST_REACTION, {postId, userId, type, schema});
  }

  static sendRecognition(recognition) {
    console.log('Send recognition', recognition);
    AppSocket.emit(SEND_RECOGNITION, recognition);
  }

  static updateHomeFeed(postId) {
    const currentUser = AppSocket.reduxStore.getState().users?.currentUser;
    AppSocket.emit(UPDATE_HOME_FEED, {postId, schema: currentUser?.schema});
  }

  static onReceiveHomeFeed(data) {
    console.log(
      '🚀 ~ file: index.js ~ line 132 ~ AppSocket ~ onReceiveHomeFeed ~ data',
      data,
    );
    try {
      const event = data?.event;
      const schema = data?.data?.schema;
      const currentUser = AppSocket.reduxStore.getState().users?.currentUser;
      if (schema === currentUser?.schema) {
        switch (event) {
          case INCREASE_POST_COMMENT_NUMBER: {
            const postId = data?.data?.postId;
            AppSocket.reduxStore.dispatch({
              type: INCREASE_COMMENTS_NUMBER,
              payload: {
                postId,
                number: 1,
              },
            });
            break;
          }
          case INCREASE_POST_REACTION_NUMBER: {
            const postId = data?.data?.postId;
            const actorId = data?.data?.actorId;
            const payload = {postId, number: 1};
            if (currentUser?.id === actorId) {
              payload.reaction = Reactions.LIKE;
            }
            AppSocket.reduxStore.dispatch({
              type: INCREASE_REACTION_NUMBER,
              payload,
            });
            break;
          }
          case DECREASE_POST_REACTION_NUMBER: {
            const postId = data?.data?.postId;
            const actorId = data?.data?.actorId;
            const payload = {postId, number: 1};
            if (currentUser?.id === actorId) {
              payload.reaction = Reactions.NONE;
            }
            AppSocket.reduxStore.dispatch({
              type: DECREASE_REACTION_NUMBER,
              payload,
            });
            break;
          }
          case ADD_POST: {
            const post = data?.data?.post;
            if (post && Object.keys(post).length > 0) {
              console.log('Add to post', post);
              AppSocket.reduxStore.dispatch(
                RecognitionActions.addRecognition(post),
              );
              const recognition = post?.recognition;
              if (recognition && Object.keys(recognition).length > 0) {
                if (currentUser?.id === recognition?.sender?.id) {
                  AppSocket.reduxStore.dispatch(
                    UsersActions.setCurrentUser({
                      recognition_send:
                        Number.parseInt(currentUser?.recognition_send, 10) +
                        Number.parseInt(recognition?.value, 10),
                    }),
                  );
                  AppSocket.reduxStore.dispatch(
                    RecognitionActions.addSentRecognition(recognition),
                  );
                }
                if (currentUser?.id === recognition?.receiver?.id) {
                  console.log('set current user received recognition');
                  AppSocket.reduxStore.dispatch(
                    UsersActions.setCurrentUser({
                      recognition_receive:
                        Number.parseInt(currentUser?.recognition_receive, 10) +
                        Number.parseInt(recognition.value, 10),
                    }),
                  );
                  console.log(
                    'add to received list',
                    RecognitionActions.addReceivedRecognition(recognition),
                  );
                  AppSocket.reduxStore.dispatch(
                    RecognitionActions.addReceivedRecognition(recognition),
                  );
                  console.log('add to notification list');
                  AppSocket.reduxStore.dispatch(
                    AppActions.addNotification({notification: recognition}),
                  );
                }
              }
            }
            break;
          }
        }
      }
    } catch (error) {
      console.error('AppSocket -> onReceiveNewsFeed -> error', error);
    }
  }

  static onReceivePostComment(data) {
    console.log(
      '🚀 ~ file: index.js ~ line 198 ~ AppSocket ~ onReceivePostComment ~ data',
      data,
    );
    const schema = data?.data?.schema;
    const comment = data?.data?.comment;
    const currentUser = AppSocket.reduxStore.getState().users?.currentUser;
    if (
      currentUser?.schema === schema &&
      comment &&
      Object.keys(comment).length > 0
    ) {
      AppSocket.reduxStore.dispatch(
        PostActions.addCommentToPost({
          postId: comment?.post_id,
          comment,
        }),
      );
    }
  }

  static createReduxMiddleware() {
    return (store) => (next) => (action) => {
      switch (action.type) {
        case SOCKET_CONNECT: {
          if (!AppSocket.connected) {
            AppSocket.connect({
              schema: action.payload.schema,
              token: action.payload.token,
            });
            AppSocket.reduxStore = store;
            AppSocket.on(CONNECT, AppSocket.onConnect);
            AppSocket.on(DISCONNECT, AppSocket.onDisconnect);
            AppSocket.emit(JOIN_HOME_FEED_ROOM);
            AppSocket.on(RECEIVE_HOME_FEED, AppSocket.onReceiveHomeFeed);
            AppSocket.on(RECEIVE_POST_COMMENT, AppSocket.onReceivePostComment);
          }
          break;
        }
        default: {
          return next(action);
        }
      }
    };
  }
}

export default AppSocket;
export const createSocketMiddleware = AppSocket.createReduxMiddleware;
