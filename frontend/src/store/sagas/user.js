import { takeLatest, call, put } from 'redux-saga/effects';
import { api } from 'services/api';

import { Types as UserTypes, Creators as UserActions } from 'store/ducks/user';
import { Creators as NotificationActions } from 'store/ducks/notification';
import { Creators as PostsActions } from 'store/ducks/posts';

function* authentication(action) {
  try {
    const { data } = yield call(api.post, '/signin', action.payload.credentials);

    localStorage.setItem('access_token', data.token);

    yield put(UserActions.authorized(data.user));
  } catch (err) {
    if (err.response.data && err.response.data.error) {
      yield put(UserActions.unauthorized(err.response.data.error));
      yield put(NotificationActions.pushNotification({ text: err.response.data.error, topic: 'error' }));
      return;
    }

    yield put(NotificationActions.pushNotification({
      text: 'Unexpected error. Try again later',
      topic: 'error',
    }));
  }
}

function* update(action) {
  try {
    const { data } = yield call(api.put, '/user/profile', action.payload.user, {
      headers: { 'Content-type': 'multipart/form-data' },
    });

    put(UserActions.updateProfileSuccess(data));
  } catch (err) {
    if (err.response.data && err.response.data.error) {
      yield put(UserActions.editProfileFailure(err.response.data.error));
      yield put(NotificationActions.pushNotification({ text: err.response.data.error, topic: 'error' }));
      return;
    }

    yield put(NotificationActions.pushNotification({
      text: 'Unexpected error. Try again later',
      topic: 'error',
    }));
  }
}

function* changePassword(action) {
  try {
    const { data } = yield call(api.put, '/user/password', action.payload.data);

    yield put(NotificationActions.pushNotification({ text: data.message, topic: 'success' }));
  } catch (err) {
    if (err.response.data && err.response.data.error) {
      yield put(UserActions.changePassFailure(err.response.data.error));
      yield put(NotificationActions.pushNotification({ text: err.response.data.error, topic: 'error' }));
      return;
    }

    yield put(NotificationActions.pushNotification({
      text: 'Unexpected error. Try again later',
      topic: 'error',
    }));
  }
}

function* getInfo(action) {
  try {
    const { data } = yield call(api.get, `/user/profile/${action.payload.id}`);

    yield put(UserActions.profileSuccess(data));
  } catch (err) {
    if (err.response.data && err.response.data.error) {
      yield put(UserActions.profileFailure(err.response.data.error));
      yield put(NotificationActions.pushNotification({ text: err.response.data.error, topic: 'error' }));
      return;
    }

    yield put(NotificationActions.pushNotification({
      text: 'Unexpected error. Try again later',
      topic: 'error',
    }));
  }
}

function* verify() {
  const token = localStorage.getItem('access_token');
  if (token) {
    try {
      const { data } = yield call(api.get, 'user/me');
      yield put(UserActions.authorized(data));
    } catch (err) {
      localStorage.removeItem('access_token');
      yield put(UserActions.unauthorized('User not authorized'));
      yield put(NotificationActions.pushNotification({ text: 'User not authorized', topic: 'error' }));
    }
  } else {
    localStorage.removeItem('access_token');
    yield put(UserActions.unauthorized('User not authorized'));
  }
}

function* realtimeEdit() {
  try {
    const { data: user } = yield call(api.get, '/user/me');

    yield put(UserActions.realtimeEditUserSuccess(user));
    yield put(PostsActions.postsRequest());
  } catch (err) {
    // console.log(err);
  }
}

function* friendRequest(action) {
  try {
    yield call(api.post, `/friend/${action.payload.id}/request`);
    yield put(NotificationActions.pushNotification({
      text: 'Solicitação de amizade enviada com sucesso',
      topic: 'success',
    }));
  } catch (err) {
    if (err.response.data && err.response.data.error) {
      yield put(NotificationActions.pushNotification({ text: err.response.data.error, topic: 'error' }));
      return;
    }
    yield put(NotificationActions.pushNotification({
      text: 'Não foi possível recusar a solicitação de amizade. Tente novamente',
      topic: 'error',
    }));
  }
}

function* acceptFriend(action) {
  try {
    yield call(api.post, `/friend/${action.payload.id}`);
    yield put(NotificationActions.pushNotification({
      text: 'Agora vocês são amigos',
      topic: 'success',
    }));
  } catch (err) {
    if (err.response.data && err.response.data.error) {
      yield put(NotificationActions.pushNotification({ text: err.response.data.error, topic: 'error' }));
      return;
    }
    yield put(NotificationActions.pushNotification({
      text: 'Não foi possível aceitar a solicitação de amizade. Tente novamente',
      topic: 'error',
    }));
  }
}

function* declineFriend(action) {
  try {
    yield call(api.put, `/friend/${action.payload.id}/request/decline`);
  } catch (err) {
    if (err.response.data && err.response.data.error) {
      yield put(NotificationActions.pushNotification({ text: err.response.data.error, topic: 'error' }));
      return;
    }
    yield put(NotificationActions.pushNotification({
      text: 'Não foi possível recusar ou cancelar a solicitação de amizade. Tente novamente',
      topic: 'error',
    }));
  }
}

function* removeFriend(action) {
  try {
    yield call(api.delete, `/friend/${action.payload.id}`);
    yield put(NotificationActions.pushNotification({
      text: 'Agora vocês não são mais amigos',
      topic: 'success',
    }));
  } catch (err) {
    if (err.response.data && err.response.data.error) {
      yield put(NotificationActions.pushNotification({ text: err.response.data.error, topic: 'error' }));
      return;
    }
    yield put(NotificationActions.pushNotification({
      text: 'Não foi possível remover amizade',
      topic: 'error',
    }));
  }
}

function* signout(action) {
  localStorage.removeItem('access_token');

  yield put(UserActions.signoutReset());

  yield call(action.payload.redirect);
}

export default function* root() {
  yield takeLatest(UserTypes.CHECK_AUTH, verify);
  yield takeLatest(UserTypes.SIGNIN_REQUEST, authentication);
  yield takeLatest(UserTypes.UPDATE_PROFILE_REQUEST, update);
  yield takeLatest(UserTypes.CHANGE_PASS_REQUEST, changePassword);
  yield takeLatest(UserTypes.USER_PROFILE_REQUEST, getInfo);
  yield takeLatest(UserTypes.REALTIME_EDIT_REQUEST, realtimeEdit);

  yield takeLatest(UserTypes.SEND_FRIEND_REQUEST, friendRequest);
  yield takeLatest(UserTypes.ACCEPT_FRIEND_REQUEST, acceptFriend);
  yield takeLatest(UserTypes.DECLINE_FRIEND_REQUEST, declineFriend);
  yield takeLatest(UserTypes.REMOVE_FRIEND, removeFriend);

  yield put(UserActions.checkAuth());
  yield takeLatest(UserTypes.SIGNOUT_REQUEST, signout);
}
