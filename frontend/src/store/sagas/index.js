import { all } from 'redux-saga/effects';

import userSaga from './user';
import postsSaga from './posts';

import notificationSaga from './notification';

export default function* rootSaga() {
  yield all([userSaga(), postsSaga(), notificationSaga()]);
}
