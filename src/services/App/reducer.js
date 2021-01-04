import {
  CLOSE_ALERT_MODAL,
  OPEN_CONFIRM_MODAL,
  OPEN_ALERT_MODAL,
  SET_BADGES,
  SET_RECOGNITION_IMAGES,
  CLOSE_CONFIRM_MODAL,
  SET_NOTIFICATION,
  ADD_NOTIFICATION,
  UPDATE_NOTIFICATION,
} from './constants';

const initialState = {
  alertModal: {
    open: false,
    title: '',
    message: '',
    customButton: null,
  },
  confirmModal: {
    open: false,
    isDanger: false,
    title: '',
    message: '',
    onConfirm: () => {},
    onCancel: () => {},
    confirmTitle: 'Yes',
    cancelTitle: 'No',
  },
  badges: [],
  recognitionImages: [],
  notification: {
    list: [],
    offset: 0,
    ping: false,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_ALERT_MODAL: {
      const payload = action.payload;
      return {
        ...state,
        alertModal: {
          ...state.alertModal,
          ...payload,
          open: true,
        },
      };
    }
    case OPEN_CONFIRM_MODAL: {
      const payload = action.payload;
      return {
        ...state,
        confirmModal: {
          ...state.confirmModal,
          ...payload,
          open: true,
        },
      };
    }
    case CLOSE_CONFIRM_MODAL: {
      return {
        ...state,
        confirmModal: initialState.confirmModal,
      };
    }
    case CLOSE_ALERT_MODAL: {
      return {
        ...state,
        alertModal: initialState.alertModal,
      };
    }
    case SET_BADGES: {
      const {badges} = action.payload;
      return {
        ...state,
        badges,
      };
    }
    case SET_RECOGNITION_IMAGES: {
      const {recognitionImages} = action.payload;
      return {
        ...state,
        recognitionImages,
      };
    }
    case SET_NOTIFICATION: {
      const {notifications, ping} = action.payload;
      return {
        ...state,
        notification: {
          ...state.notification,
          list: notifications,
          ping,
        },
      };
    }
    case ADD_NOTIFICATION: {
      const {notification} = action.payload;
      return {
        ...state,
        notification: {
          ...state.notification,
          list: [notification, ...state.notification.list],
          ping: true,
        },
      };
    }
    case UPDATE_NOTIFICATION: {
      const {ping} = action.payload;
      return {
        ...state,
        notification: {
          ...state.notification,
          ping,
        },
      };
    }
  }
  return state;
};
