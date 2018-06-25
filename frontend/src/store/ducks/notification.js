export const Types = {
  PUSH_NOTIFICATION: 'notification/PUSH_NOTIFICATION',
  SHOW_NOTIFICATION: 'notification/SHOW_NOTIFICATION',
  HIDE_NOTIFICATION: 'notification/HIDE_NOTIFICATION',
};

export const Creators = {
  pushNotification: notification => ({
    type: Types.PUSH_NOTIFICATION,
    payload: { ...notification },
  }),

  showNotification: notification => ({
    type: Types.SHOW_NOTIFICATION,
    payload: { ...notification },
  }),

  hideNotification: () => ({
    type: Types.HIDE_NOTIFICATION,
  }),
};

const INITIAL_STATE = {
  text: '',
  topic: '',
  visible: false,
};

export default function notificationReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SHOW_NOTIFICATION:
      return { text: action.payload.text, topic: action.payload.topic, visible: true };
    case Types.HIDE_NOTIFICATION:
      return { ...state, visible: false };
    default:
      return state;
  }
}
