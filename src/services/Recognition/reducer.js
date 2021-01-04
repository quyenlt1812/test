import {Reactions} from 'constants/post';

import {
  ADD_RECEIVED_RECOGNITION,
  ADD_RECOGNITION,
  ADD_SENT_RECOGNITION,
  INCREASE_COMMENTS_NUMBER,
  INCREASE_REACTION_NUMBER,
  DECREASE_REACTION_NUMBER,
  RESET_RECOGNITION,
  SET_RECEIVED_RECOGNITIONS,
  SET_RECOGNITIONS,
  SET_SENT_RECOGNITIONS,
  SET_TOP_VALUES,
  TRIGGER_HOME_SCROLLING,
} from './constants';

const initialState = {
  recognitions: {
    list: null,
    offset: 0,
    hasNext: true,
  },
  sentRecognitions: {
    list: null,
    offset: 0,
    hasNext: true,
    total: 0,
  },
  receivedRecognitions: {
    list: null,
    offset: 0,
    hasNext: true,
    total: 0,
  },
  topValues: null,
  triggerHomeScrollToTop: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_RECOGNITIONS: {
      const {recognitions, offset, hasNext} = action.payload;
      let list = [];
      let offs = 0;
      if (offset < 11) {
        list = recognitions;
        offs = recognitions.length;
      } else {
        list = state.recognitions.list.concat(recognitions);
        offs = offset;
      }
      return {
        ...state,
        recognitions: {
          list,
          offset: offs,
          hasNext,
        },
      };
    }
    case ADD_RECOGNITION: {
      const {recognition} = action.payload;
      console.log('🚀 ~ file: reducer.js ~ line 64 ~ recognition', recognition);
      return {
        ...state,
        recognitions: {
          ...state.recognitions,
          list: [recognition, ...state.recognitions.list],
          offset: state.recognitions.list.length + 1,
        },
      };
    }
    case SET_SENT_RECOGNITIONS: {
      const {recognitions, offset, hasNext, total} = action.payload;
      let list = [];
      let offs = 0;
      if (offset === 0) {
        list = recognitions;
        offs = recognitions.length;
      } else {
        list = state.sentRecognitions.list.concat(recognitions);
        offs = offset;
      }
      return {
        ...state,
        sentRecognitions: {
          list,
          offset: offs,
          hasNext,
          total,
        },
      };
    }
    case ADD_SENT_RECOGNITION: {
      const {recognition} = action.payload;
      const sentRecog = state.sentRecognitions.list || [];
      return {
        ...state,
        sentRecognitions: {
          ...state.sentRecognitions,
          list: [recognition, ...sentRecog],
          offset: state.sentRecognitions.offset + 1,
          total: state.sentRecognitions.total + 1,
        },
      };
    }
    case SET_RECEIVED_RECOGNITIONS: {
      const {recognitions, offset, hasNext, total} = action.payload;
      let list = [];
      let offs = 0;
      if (offset === 0) {
        list = recognitions;
        offs = recognitions.length;
      } else {
        list = state.receivedRecognitions.list.concat(recognitions);
        offs = offset;
      }
      return {
        ...state,
        receivedRecognitions: {
          list,
          offset: offs,
          hasNext,
          total,
        },
      };
    }
    case ADD_RECEIVED_RECOGNITION: {
      const {recognition} = action.payload;
      return {
        ...state,
        receivedRecognitions: {
          ...state.receivedRecognitions,
          list: [recognition, ...state.receivedRecognitions.list],
          offset: state.receivedRecognitions.offset + 1,
          total: state.receivedRecognitions.total + 1,
        },
      };
    }
    case SET_TOP_VALUES: {
      const {values} = action.payload;
      return {
        ...state,
        topValues: values,
      };
    }
    case TRIGGER_HOME_SCROLLING: {
      const {value} = action.payload;
      return {
        ...state,
        triggerHomeScrollToTop: value,
      };
    }
    case RESET_RECOGNITION: {
      return initialState;
    }
    case INCREASE_COMMENTS_NUMBER: {
      const {postId, number} = action.payload;
      console.log('🚀 ~ file: reducer.js ~ line 155 ~ postId', postId);
      const tmpPosts = state?.recognitions?.list?.map((post) => {
        if (post.id === postId) {
          console.log(
            '🚀 ~ file: reducer.js ~ line 157 ~ tmpPosts ~ post.id === postId',
            post.id === postId,
          );
          return {
            ...post,
            count_comments: post.count_comments + number,
          };
        }
        return post;
      });
      return {
        ...state,
        recognitions: {
          ...state.recognitions,
          list: tmpPosts,
        },
      };
    }
    case INCREASE_REACTION_NUMBER: {
      const {postId, number, reaction = Reactions.NONE} = action.payload;
      const tmpPosts = state?.recognitions?.list?.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            count_reactions: post.count_reactions + number,
            reaction,
          };
        }
        return post;
      });
      return {
        ...state,
        recognitions: {
          ...state.recognitions,
          list: tmpPosts,
        },
      };
    }
    case DECREASE_REACTION_NUMBER: {
      const {postId, number, reaction = Reactions.NONE} = action.payload;
      const tmpPosts = state?.recognitions?.list?.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            count_reactions: post.count_reactions - number,
            reaction,
          };
        }
        return post;
      });
      return {
        ...state,
        recognitions: {
          ...state.recognitions,
          list: tmpPosts,
        },
      };
    }
  }
  return state;
};
