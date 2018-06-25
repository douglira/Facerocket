export const Types = {
  CHECK_AUTH: 'user/CHECK_AUTH',

  SIGNIN_REQUEST: 'user/SIGNIN_REQUEST',
  AUTHORIZED: 'user/AUTHORIZED',
  UNAUTHORIZED: 'user/UNAUTHORIZED',

  SIGNOUT_REQUEST: 'user/SIGNOUT_REQUEST',
  SIGNOUT_RESET: 'user/SIGNOUT_RESET',

  USER_PROFILE_REQUEST: 'user/USER_PROFILE_REQUEST',
  USER_PROFILE_SUCCESS: 'user/USER_PROFILE_SUCCESS',
  USER_PROFILE_FAILURE: 'user/USER_PROFILE_FAILURE',

  UPDATE_PROFILE_REQUEST: 'user/UPDATE_PROFILE_REQUEST',
  UPDATE_PROFILE_SUCCESS: 'user/UPDATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_FAILURE: 'user/UPDATE_PROFILE_FAILURE',

  CHANGE_PASS_REQUEST: 'user/CHANGE_PASS_REQUEST',
  CHANGE_PASS_SUCCESS: 'user/CHANGE_PASS_SUCCESS',
  CHANGE_PASS_FAILURE: 'user/CHANGE_PASS_FAILURE',

  REALTIME_EDIT_REQUEST: 'user/REALTIME_EDIT_REQUEST',
  REALTIME_EDIT_SUCCESS: 'user/REALTIME_EDIT_SUCCESS',

  SEND_FRIEND_REQUEST: 'user/SEND_FRIEND_REQUEST',
  ACCEPT_FRIEND_REQUEST: 'user/ACCEPT_FRIEND_REQUEST',
  DECLINE_FRIEND_REQUEST: 'user/DECLINE_FRIEND_REQUEST',
  REMOVE_FRIEND: 'user/REMOVE_FRIEND',
};

export const Creators = {
  checkAuth: () => ({
    type: Types.CHECK_AUTH,
  }),

  signinRequest: credentials => ({
    type: Types.SIGNIN_REQUEST,
    payload: { credentials },
  }),

  authorized: user => ({
    type: Types.AUTHORIZED,
    payload: { user },
  }),

  unauthorized: error => ({
    type: Types.UNAUTHORIZED,
    payload: { error },
  }),

  signoutRequest: ({ redirect }) => ({
    type: Types.SIGNOUT_REQUEST,
    payload: { redirect },
  }),

  signoutReset: () => ({
    type: Types.SIGNOUT_RESET,
  }),

  profileRequest: id => ({
    type: Types.USER_PROFILE_REQUEST,
    payload: { id },
  }),

  profileSuccess: user => ({
    type: Types.USER_PROFILE_SUCCESS,
    payload: { user },
  }),

  profileFailure: error => ({
    type: Types.USER_PROFILE_FAILURE,
    payload: { error },
  }),

  updateProfileRequest: user => ({
    type: Types.UPDATE_PROFILE_REQUEST,
    payload: { user },
  }),

  updateProfileSuccess: user => ({
    type: Types.UPDATE_PROFILE_SUCCESS,
    payload: { user },
  }),

  updateProfileFailure: error => ({
    type: Types.UPDATE_PROFILE_FAILURE,
    payload: { error },
  }),

  changePassRequest: data => ({
    type: Types.CHANGE_PASS_REQUEST,
    payload: { data },
  }),

  changePassSuccess: () => ({
    type: Types.CHANGE_PASS_SUCCESS,
  }),

  changePassFailure: error => ({
    type: Types.CHANGE_PASS_FAILURE,
    payload: { error },
  }),

  realtimeEditUserRequest: () => ({
    type: Types.REALTIME_EDIT_REQUEST,
  }),

  realtimeEditUserSuccess: user => ({
    type: Types.REALTIME_EDIT_SUCCESS,
    payload: { user },
  }),

  sendFriendRequest: id => ({
    type: Types.SEND_FRIEND_REQUEST,
    payload: { id },
  }),

  acceptFriendRequest: id => ({
    type: Types.ACCEPT_FRIEND_REQUEST,
    payload: { id },
  }),

  declineFriendRequest: id => ({
    type: Types.DECLINE_FRIEND_REQUEST,
    payload: { id },
  }),

  removeFriend: id => ({
    type: Types.REMOVE_FRIEND,
    payload: { id },
  }),
};

const INITIAL_STATE = {
  data: {},
  loading: false,
  error: null,
  isAuthenticated: false,
  info: {},
};

export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.CHECK_AUTH:
      return { ...state, loading: true };
    case Types.SIGNIN_REQUEST:
      return { ...state, loading: true, error: null };
    case Types.AUTHORIZED:
      return {
        ...state,
        data: action.payload.user,
        loading: false,
        error: null,
        isAuthenticated: true,
      };
    case Types.UNAUTHORIZED:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
        isAuthenticated: false,
      };
    case Types.SIGNOUT_RESET:
      return { ...INITIAL_STATE };

    case Types.USER_PROFILE_REQUEST:
      return { ...state, loading: true, error: null };
    case Types.USER_PROFILE_SUCCESS:
      return { ...state, loading: false, info: action.payload.user };
    case Types.USER_PROFILE_FAILURE:
      return { ...state, loading: false, error: action.payload.error };

    case Types.UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true, error: null };
    case Types.UPDATE_PROFILE_SUCCESS:
      return { ...state, loading: false, info: action.payload.user };
    case Types.UPDATE_PROFILE_FAILURE:
      return { ...state, loading: false, error: action.payload.error };

    case Types.CHANGE_PASS_REQUEST:
      return { ...state, loading: true, error: null };
    case Types.CHANGE_PASS_SUCCESS:
      return state;
    case Types.CHANGE_PASS_FAILURE:
      return { ...state, loading: false, error: action.payload.error };

    case Types.REALTIME_EDIT_SUCCESS:
      return { ...state, data: action.payload.user };
    default:
      return state;
  }
}
