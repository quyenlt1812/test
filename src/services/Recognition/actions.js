import {GET_RECOGNITION_BADGES, GET_RECOGNITION_IMAGES} from '../App/constants';

const {
  ADD_RECOGNITION,
  SET_SENT_RECOGNITIONS,
  GET_SENT_RECOGNITIONS,
  SET_RECEIVED_RECOGNITIONS,
  SEND_RECOGNITION,
  SET_RECOGNITIONS,
  GET_RECOGNITIONS,
  ADD_SENT_RECOGNITION,
  ADD_RECEIVED_RECOGNITION,
  GET_TOP_VALUES,
  SET_TOP_VALUES,
  GET_RECEIVED_RECOGNITIONS,
  TRIGGER_HOME_SCROLLING,
  GET_COMMENTS,
  SET_COMMENTS,
  ADD_COMMENT,
  SEND_COMMENT,
  RESET_RECOGNITION,
} = require('./constants');

const addRecognition = (recognition) => {
  return {
    type: ADD_RECOGNITION,
    payload: {recognition},
  };
};

const addSentRecognition = (recognition) => {
  return {
    type: ADD_SENT_RECOGNITION,
    payload: {recognition},
  };
};

const addReceivedRecognition = (recognition) => {
  return {
    type: ADD_RECEIVED_RECOGNITION,
    payload: {recognition},
  };
};

const sendRecognition = (recognition) => {
  return {
    type: SEND_RECOGNITION,
    payload: {recognition},
  };
};

const setSentRecognitions = ({recognitions, offset, hasNext, total}) => {
  return {
    type: SET_SENT_RECOGNITIONS,
    payload: {recognitions, offset, hasNext, total},
  };
};

const getSentRecognitions = (offset, userId) => {
  return {
    type: GET_SENT_RECOGNITIONS,
    payload: {offset, userId},
  };
};

const setReceivedRecognitions = ({recognitions, offset, hasNext, total}) => {
  return {
    type: SET_RECEIVED_RECOGNITIONS,
    payload: {recognitions, offset, hasNext, total},
  };
};

const getReceivedRecognitions = (offset, userId) => {
  return {
    type: GET_RECEIVED_RECOGNITIONS,
    payload: {offset, userId},
  };
};

const setRecognitions = ({recognitions, offset, hasNext}) => {
  return {
    type: SET_RECOGNITIONS,
    payload: {recognitions, offset, hasNext},
  };
};

const getRecognitions = (offset) => {
  return {
    type: GET_RECOGNITIONS,
    payload: {offset},
  };
};

const getTopValues = (userId) => {
  return {
    type: GET_TOP_VALUES,
    payload: {userId},
  };
};

const setTopValues = (values) => {
  return {
    type: SET_TOP_VALUES,
    payload: {values},
  };
};

const getRecognitionBadges = () => {
  return {
    type: GET_RECOGNITION_BADGES,
  };
};

const getRecognitionImages = () => {
  return {
    type: GET_RECOGNITION_IMAGES,
  };
};

const triggerHomeScrolling = ({value}) => {
  return {
    type: TRIGGER_HOME_SCROLLING,
    payload: {value},
  };
};

const getComments = ({postId, offset}) => {
  return {
    type: GET_COMMENTS,
    payload: {postId, offset},
  };
};

const setComments = ({postId, comments, offset, hasNext}) => {
  return {
    type: SET_COMMENTS,
    payload: {postId, comments, offset, hasNext},
  };
};

const sendComment = ({postId, comment}) => {
  return {
    type: SEND_COMMENT,
    payload: {postId, comment},
  };
};

const addComment = ({postId, comment}) => {
  return {
    type: ADD_COMMENT,
    payload: {postId, comment},
  };
};

const resetRecognition = () => {
  return {
    type: RESET_RECOGNITION,
  };
};

export default {
  addRecognition,
  addSentRecognition,
  addReceivedRecognition,
  sendRecognition,
  setSentRecognitions,
  getSentRecognitions,
  setReceivedRecognitions,
  getReceivedRecognitions,
  setRecognitions,
  getRecognitions,
  getTopValues,
  setTopValues,
  getRecognitionBadges,
  getRecognitionImages,
  triggerHomeScrolling,
  getComments,
  setComments,
  sendComment,
  addComment,
  resetRecognition,
};
