import {ADD_COMMENT_TO_POST, SET_COMMENTS_FOR_POST} from './constants';

const initialState = {
  commentList: {},
  commenterList: {},
  reacteeList: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMENTS_FOR_POST: {
      const {postId, comments, offset, hasNext} = action.payload;
      console.log('🚀 ~ file: reducer.js ~ line 11 ~ offset', offset);
      const commentList = state.commentList[postId];
      let mergedList = [];
      let off = 0;
      if (offset > 10) {
        mergedList = commentList.list.concat(comments);
        off = commentList.offset + offset;
      } else {
        mergedList = comments;
        off = offset;
      }
      return {
        ...state,
        commentList: {
          ...state.commentList,
          [postId]: {
            list: mergedList,
            offset: off,
            hasNext,
          },
        },
      };
    }
    case ADD_COMMENT_TO_POST: {
      const {postId, comment} = action.payload;
      return {
        ...state,
        commentList: {
          ...state.commentList,
          [postId]: {
            ...state.commentList[postId],
            list: [comment, ...state.commentList[postId].list],
            offset: state.commentList[postId].offset + 1,
          },
        },
      };
    }
  }
  return state;
};
