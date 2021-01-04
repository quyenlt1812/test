import {
  OPEN_ALERT_MODAL,
  CLOSE_ALERT_MODAL,
  GET_APP_DATA,
  SET_BADGES,
  SET_RECOGNITION_IMAGES,
  OPEN_CONFIRM_MODAL,
  CLOSE_CONFIRM_MODAL,
  SET_NOTIFICATION,
  ADD_NOTIFICATION,
  UPDATE_NOTIFICATION,
} from './constants';

const openAlertModal = ({title, message, customButton}) => {
  return {
    type: OPEN_ALERT_MODAL,
    payload: {
      title,
      message,
      customButton,
    },
  };
};

const openConfirmModal = ({
  title,
  message,
  onConfirm,
  onCancel,
  confirmTitle,
  cancelTitle,
  isDanger,
  isRequired,
}) => {
  return {
    type: OPEN_CONFIRM_MODAL,
    payload: {
      title,
      message,
      onConfirm,
      onCancel,
      confirmTitle,
      cancelTitle,
      isDanger,
      isRequired,
    },
  };
};

const closeConfirmModal = () => {
  return {
    type: CLOSE_CONFIRM_MODAL,
  };
};

const closeAlertModal = () => {
  return {
    type: CLOSE_ALERT_MODAL,
  };
};

const getAppData = () => {
  return {
    type: GET_APP_DATA,
  };
};

const setBadges = (badges) => {
  return {
    type: SET_BADGES,
    payload: {badges},
  };
};

const setRecognitionImages = (recognitionImages) => {
  return {
    type: SET_RECOGNITION_IMAGES,
    payload: {recognitionImages},
  };
};

const setNotification = ({notifications, ping = false}) => {
  return {
    type: SET_NOTIFICATION,
    payload: {notifications, ping},
  };
};

const addNotification = ({notification}) => {
  return {
    type: ADD_NOTIFICATION,
    payload: {notification},
  };
};

const updateNotification = ({ping}) => {
  return {
    type: UPDATE_NOTIFICATION,
    payload: {ping},
  };
};

export default {
  openAlertModal,
  closeAlertModal,
  getAppData,
  setBadges,
  setRecognitionImages,
  openConfirmModal,
  closeConfirmModal,
  setNotification,
  addNotification,
  updateNotification,
};
