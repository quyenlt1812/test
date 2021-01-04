import {call, put, select, takeEvery} from 'redux-saga/effects';
import {GET_COMMENTS_FOR_POST} from './constants';
import PostRepo from './repo';
import PostActions from './actions';
import {getComments} from './selectors';

function* getCommentsForPostSaga({payload: {postId, offset}}) {
  try {
    const currentComments = yield select((state) => getComments(state, postId));
    const result = yield call(PostRepo.getCommentsRepo, {postId, offset});
    const comments = result?.data?.comments;

    if (Array.isArray(comments)) {
      const tmpOffset = comments.length === 11 ? 10 : comments.length;
      yield put(
        PostActions.setCommentsForPost({
          postId,
          comments: comments.slice(0, 10),
          offset:
            offset === 0 ? tmpOffset : currentComments?.offset + tmpOffset,
          hasNext: comments.length === 11,
        }),
      );
    }
  } catch (error) {
    console.error('function*getCategoriesSaga -> error', error);
  }
}

function* sendCommentSaga({payload: {postId, comment}}) {
  try {
    const result = yield call(PostRepo.sendCommentsRepo, {
      postId,
      content: comment,
    });
    console.log('function*sendCommentSaga -> result', result);
  } catch (error) {
    console.log('function*sendCommentSaga -> error', error);
  }
}

export default function* () {
  yield takeEvery(GET_COMMENTS_FOR_POST, getCommentsForPostSaga);
}
