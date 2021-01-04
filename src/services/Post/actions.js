const {
  GET_COMMENTS_FOR_POST,
  SET_COMMENTS_FOR_POST,
  ADD_COMMENT_TO_POST,
  GET_REACTEES_FOR_POST,
  SET_REACTEES_FOR_POST,
} = require('./constants');

const getCommentsForPost = ({postId, offset = 0}) => {
  return {
    type: GET_COMMENTS_FOR_POST,
    payload: {postId, offset},
  };
};

const setCommentsForPost = ({postId, comments, offset, hasNext}) => {
  return {
    type: SET_COMMENTS_FOR_POST,
    payload: {postId, comments, offset, hasNext},
  };
};

const addCommentToPost = ({postId, comment}) => {
  return {
    type: ADD_COMMENT_TO_POST,
    payload: {postId, comment},
  };
};

const getReactees = ({postId, offset = 0}) => {
  return {
    type: GET_REACTEES_FOR_POST,
    payload: {postId, offset},
  };
};

const setReactees = ({postId, reactees, offset, hasNext}) => {
  return {
    type: SET_REACTEES_FOR_POST,
    payload: {postId, reactees, offset, hasNext},
  };
};

export default {
  getCommentsForPost,
  setCommentsForPost,
  addCommentToPost,
  getReactees,
  setReactees,
};
