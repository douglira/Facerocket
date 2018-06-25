import { takeLatest, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import {
  Types as NotificationTypes,
  Creators as NotificationActions,
} from 'store/ducks/notification';

function* pushAsync(action) {
  yield put(NotificationActions.showNotification({ ...action.payload }));

  yield delay(4500);

  yield put(NotificationActions.hideNotification());
}

export default function* rootNotification() {
  yield takeLatest(NotificationTypes.PUSH_NOTIFICATION, pushAsync);
}
