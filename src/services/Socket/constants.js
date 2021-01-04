// Common socket events
export const AUTHENTICATION = 'authentication';
export const CONNECT = 'connect';
export const AUTHENTICATED = 'authenticated';
export const UNAUTHORIZED = 'unauthorized';
export const DISCONNECT = 'disconnect';
export const RECONNECT = 'reconnect';

// Redux middleware action
export const SOCKET_CONNECT = 'SOCKET_CONNECT';
export const SOCKET_DISCONNECT = 'SOCKET_DISCONNECT';

// App events
export const RECEIVE_HOME_FEED = 'NewsFeed';
export const JOIN_HOME_FEED_ROOM = 'join-home-feed-room';
export const SEND_RECOGNITION = 'send-recognition';
export const UPDATE_HOME_FEED = 'update-home-feed';

export const HOME_JOIN_ROOM = 'home-join-room';
export const HOME_ADD_NEWS = 'home-add-news';
export const HOME_ADD_RECOGNITION = 'home-add-recognition';
export const HOME_ADD_EVENT = 'home-add-event';

// Comment & Reaction
export const JOIN_POST_ROOM = 'join-post-room';
export const POST_JOIN = 'post-join';
export const LEAVE_POST_ROOM = 'leave-post-room';

export const SEND_POST_COMMENT = 'send-post-comment';
export const ADD_POST_COMMENT = 'add-post-comment';
export const UPDATE_POST_COMMENT = 'update-post-comment';
export const DELETE_POST_COMMENT = 'delete-post-comment';
export const RECEIVE_POST_COMMENT = 'receive-post-comment';

export const SEND_POST_REACTION = 'send-post-reaction';

export const LIKE_POST = 'like-post';
export const UNLIKE_POST = 'unlike-post';

// Events
export const INCREASE_POST_COMMENT_NUMBER = 'increase-comment-number';
export const INCREASE_POST_REACTION_NUMBER = 'increase-reaction-number';
export const DECREASE_POST_REACTION_NUMBER = 'decrease-reaction-number';
export const ADD_POST = 'add-post';
