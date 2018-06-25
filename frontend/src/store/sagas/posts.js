import { takeLatest, call, put } from 'redux-saga/effects';

import { Types as PostsTypes, Creators as PostsActions } from 'store/ducks/posts';
import { Creators as NotificationActions } from 'store/ducks/notification';
import { api } from 'services/api';

function* realtimeAdd(action) {
  try {
    const { data: post } = yield call(api.get, `/posts/${action.payload.id._id}`);

    yield put(PostsActions.realtimeAddPostSuccess(post));
  } catch (err) {
    if (err.response.data && err.response.data.error) {
      yield put(NotificationActions.pushNotification({ text: err.response.data.error, topic: 'error' }));
      return;
    }

    yield put(NotificationActions.pushNotification({ text: 'Unexpected error. Try again later', topic: 'error' }));
  }
}

function* realtimeReplace(action) {
  try {
    const { data: post } = yield call(api.get, `/posts/${action.payload.id._id}`);

    yield put(PostsActions.realtimeReplacePostSuccess(post));
  } catch (err) {
    if (err.response.data && err.response.data.error) {
      yield put(NotificationActions.pushNotification({ text: err.response.data.error, topic: 'error' }));
      return;
    }

    yield put(NotificationActions.pushNotification({ text: 'Unexpected error. Try again later', topic: 'error' }));
  }
}

function* realtimeAddNotification(action) {
  try {
    const { data: notification } = yield call(api.get, `/posts/notifications/${action.payload.id._id}`);

    yield put(PostsActions.realtimeAddNotificationSuccess(notification));
  } catch (err) {
    if (err.response.data && err.response.data.error) {
      yield put(NotificationActions.pushNotification({ text: err.response.data.error, topic: 'error' }));
      return;
    }

    yield put(NotificationActions.pushNotification({ text: 'Unexpected error. Try again later', topic: 'error' }));
  }
}

function* getAll() {
  try {
    const response = yield call(api.get, '/posts');

    yield put(PostsActions.postsSuccess(response.data));
  } catch (err) {
    if (err.response.data && err.response.data.error) {
      yield put(NotificationActions.pushNotification({ text: err.response.data.error, topic: 'error' }));
      return;
    }

    yield put(NotificationActions.pushNotification({ text: 'Unexpected error. Try again later', topic: 'error' }));
  }
}

function* add(action) {
  try {
    const response = yield call(api.post, '/posts', { content: action.payload.post });

    yield put(PostsActions.addPostSuccess(response.data));
  } catch (err) {
    if (err.response.data && err.response.data.error) {
      yield put(NotificationActions.pushNotification({ text: err.response.data.error, topic: 'error' }));
    }

    yield put(NotificationActions.pushNotification({ text: 'Unexpected error. Try again later', topic: 'error' }));
  }
}

function* edit(action) {
  try {
    const { content, postId } = action.payload;

    yield call(api.put, `/posts/${postId}`, { content });
  } catch (err) {
    if (err.response.data && err.response.data.error) {
      yield put(NotificationActions.pushNotification({ text: err.response.data.error, topic: 'error' }));
    }

    yield put(NotificationActions.pushNotification({ text: 'Unexpected error. Try again later', topic: 'error' }));
  }
}

function* destroy(action) {
  try {
    const { postId } = action.payload;

    yield call(api.delete, `/posts/${postId}`);
  } catch (err) {
    if (err.response.data && err.response.data.error) {
      yield put(NotificationActions.pushNotification({ text: err.response.data.error, topic: 'error' }));
    }

    yield put(NotificationActions.pushNotification({ text: 'Unexpected error. Try again later', topic: 'error' }));
  }
}

function* toggleLike(action) {
  try {
    const { postId } = action.payload;

    yield call(api.put, `/posts/${postId}/like`);
  } catch (err) {
    if (err.response.data && err.response.data.error) {
      yield put(NotificationActions.pushNotification({ text: err.response.data.error, topic: 'error' }));
    }

    yield put(NotificationActions.pushNotification({ text: 'Unexpected error. Try again later', topic: 'error' }));
  }
}

function* newComment(action) {
  try {
    const { content, postId } = action.payload;

    yield call(api.post, `/post/${postId}/comment`, { content });
  } catch (err) {
    if (err.response.data && err.response.data.error) {
      yield put(NotificationActions.pushNotification({ text: err.response.data.error, topic: 'error' }));
    }

    yield put(NotificationActions.pushNotification({ text: 'Unexpected error. Try again later', topic: 'error' }));
  }
}

function* getAllNotifications() {
  try {
    const { data } = yield call(api.get, '/posts/notifications');

    yield put(PostsActions.postsNotificationsSuccess(data));
  } catch (err) {
    yield put(NotificationActions.pushNotification({ text: 'It was not possible to import post notifications', topic: 'error' }));
  }
}

export default function* rootPosts() {
  yield takeLatest(PostsTypes.REALTIME_ADD_REQUEST, realtimeAdd);
  yield takeLatest(PostsTypes.REALTIME_REPLACE_REQUEST, realtimeReplace);
  yield takeLatest(PostsTypes.REALTIME_ADD_NOTIFICATION_REQUEST, realtimeAddNotification);
  yield takeLatest(PostsTypes.POSTS_REQUEST, getAll);
  yield takeLatest(PostsTypes.POST_ADD_REQUEST, add);
  yield takeLatest(PostsTypes.POST_EDIT_REQUEST, edit);
  yield takeLatest(PostsTypes.POST_DELETE_REQUEST, destroy);
  yield takeLatest(PostsTypes.TOGGLE_LIKE_REQUEST, toggleLike);
  yield takeLatest(PostsTypes.NEW_COMMENT_REQUEST, newComment);
  yield takeLatest(PostsTypes.POSTS_NOTIFICATION_REQUEST, getAllNotifications);
}
