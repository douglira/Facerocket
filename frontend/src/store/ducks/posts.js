export const Types = {
  POSTS_REQUEST: 'posts/POSTS_REQUEST',
  POSTS_SUCCESS: 'posts/POSTS_SUCCESS',
  POSTS_FAILURE: 'posts/POSTS_FAILURE',

  REALTIME_ADD_REQUEST: 'post/REALTIME_ADD_REQUEST',
  REALTIME_ADD_SUCCESS: 'post/REALTIME_ADD_SUCCESS',
  REALTIME_REPLACE_REQUEST: 'post/REALTIME_REPLACE_REQUEST',
  REALTIME_REPLACE_SUCCESS: 'post/REALTIME_REPLACE_SUCCESS',
  REALTIME_DELETE: 'post/REALTIME_DELETE',

  POST_ADD_REQUEST: 'post/POST_ADD_REQUEST',
  POST_ADD_SUCCESS: 'post/POST_ADD_SUCCESS',
  POST_ADD_FAILURE: 'post/POST_ADD_FAILURE',

  POST_EDIT_REQUEST: 'post/POST_EDIT_REQUEST',
  POST_EDIT_SUCCESS: 'post/POST_EDIT_SUCCESS',
  POST_EDIT_FAILURE: 'post/POST_EDIT_FAILURE',

  POST_DELETE_REQUEST: 'post/POST_DELETE_REQUEST',
  POST_DELETE_SUCCESS: 'post/POST_EDIT_SUCCESS',
  POST_DELETE_FAILURE: 'post/POST_DELETE_FAILURE',

  TOGGLE_LIKE_REQUEST: 'post/TOGGLE_LIKE_REQUEST',
  TOGGLE_LIKE_FAILURE: 'post/TOGGLE_LIKE_FAILURE',

  NEW_COMMENT_REQUEST: 'post/NEW_COMMENT_REQUEST',
  NEW_COMMENT_SUCCESS: 'post/NEW_COMMENT_SUCCESS',
  NEW_COMMENT_FAILURE: 'post/NEW_COMMENT_FAILURE',

  POSTS_NOTIFICATION_REQUEST: 'post/POSTS_NOTIFICATION_REQUEST',
  POSTS_NOTIFICATION_SUCCESS: 'post/POSTS_NOTIFICATION_SUCCESS',
  POSTS_NOTIFICATION_REMOVE: 'post/POSTS_NOTIFICATION_REMOVE',

  REALTIME_ADD_NOTIFICATION_REQUEST: 'post/REALTIME_ADD_NOTIFICATION_REQUEST',
  REALTIME_ADD_NOTIFICATION_SUCCESS: 'post/REALTIME_ADD_NOTIFICATION_SUCCESS',
};

export const Creators = {
  postsRequest: () => ({
    type: Types.POSTS_REQUEST,
  }),

  postsSuccess: posts => ({
    type: Types.POSTS_SUCCESS,
    payload: { posts },
  }),

  postsFailure: error => ({
    type: Types.POSTS_FAILURE,
    payload: { error },
  }),

  realtimeAddPostRequest: id => ({
    type: Types.REALTIME_ADD_REQUEST,
    payload: { id },
  }),

  realtimeAddPostSuccess: post => ({
    type: Types.REALTIME_ADD_SUCCESS,
    payload: { post },
  }),

  realtimeReplacePostRequest: id => ({
    type: Types.REALTIME_REPLACE_REQUEST,
    payload: { id },
  }),

  realtimeReplacePostSuccess: post => ({
    type: Types.REALTIME_REPLACE_SUCCESS,
    payload: { post },
  }),

  realtimeDeletePost: post => ({
    type: Types.REALTIME_DELETE,
    payload: { post },
  }),

  addPost: post => ({
    type: Types.POST_ADD_REQUEST,
    payload: { post },
  }),

  addPostSuccess: fullPost => ({
    type: Types.POST_ADD_SUCCESS,
    payload: { fullPost },
  }),

  addPostFailure: error => ({
    type: Types.POST_ADD_FAILURE,
    payload: { error },
  }),

  editPostRequest: post => ({
    type: Types.POST_EDIT_REQUEST,
    payload: { ...post },
  }),

  editPostFailure: error => ({
    type: Types.POST_EDIT_FAILURE,
    payload: { error },
  }),

  deletePostRequest: postId => ({
    type: Types.POST_DELETE_REQUEST,
    payload: { postId },
  }),

  deletePostFailure: error => ({
    type: Types.POST_DELETE_FAILURE,
    payload: { error },
  }),

  toggleLikeRequest: postId => ({
    type: Types.TOGGLE_LIKE_REQUEST,
    payload: { postId },
  }),

  toggleLikeFailure: error => ({
    type: Types.TOGGLE_LIKE_FAILURE,
    payload: { error },
  }),

  newCommentRequest: comment => ({
    type: Types.NEW_COMMENT_REQUEST,
    payload: { ...comment },
  }),

  newCommentFailure: error => ({
    type: Types.NEW_COMMENT_FAILURE,
    payload: { error },
  }),

  postsNotificationsRequest: () => ({
    type: Types.POSTS_NOTIFICATION_REQUEST,
  }),

  postsNotificationsSuccess: notifications => ({
    type: Types.POSTS_NOTIFICATION_SUCCESS,
    payload: { notifications },
  }),

  postsNotificationsRemove: notificationId => ({
    type: Types.POSTS_NOTIFICATION_REMOVE,
    payload: { notificationId },
  }),

  realtimeAddNotificationRequest: id => ({
    type: Types.REALTIME_ADD_NOTIFICATION_REQUEST,
    payload: { id },
  }),

  realtimeAddNotificationSuccess: notification => ({
    type: Types.REALTIME_ADD_NOTIFICATION_SUCCESS,
    payload: { notification },
  }),
};

const INITIAL_STATE = {
  data: [],
  loading: { status: false, topic: '' },
  error: null,
  notifications: [],
};

function realtimeReplacePost(state, action) {
  const { post } = action.payload;
  const { data } = state;

  const index = data.findIndex(postState => postState._id === post._id);
  if (index !== -1) {
    data.splice(index, 1, post);
    return { ...state, data };
  }

  return state;
}

function realtimeDeletePost(state, action) {
  const { post } = action.payload;
  const { data } = state;

  const index = data.findIndex(postState => postState._id === post._id);
  if (index !== -1) {
    data.splice(index, 1);
    return { ...state, data };
  }

  return state;
}

function postsNotificationsRemove(state, action) {
  const id = action.payload.notificationId;
  const { notifications } = state;

  const index = notifications.findIndex(notificationState => notificationState._id === id);
  if (index !== -1) {
    notifications.splice(index, 1);
    return { ...state, notifications };
  }

  return state;
}

export default function postsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.POSTS_REQUEST:
      return { ...state, loading: { status: true, topic: 'posts.request' } };
    case Types.POSTS_SUCCESS:
      return {
        ...state,
        data: action.payload.posts,
        loading: { status: false, topic: 'posts.request' },
        error: null,
      };
    case Types.POSTS_FAILURE:
      return {
        ...state,
        loading: { status: false, topic: 'posts.request' },
        error: action.payload.error,
      };

    case Types.REALTIME_ADD_SUCCESS:
      return { ...state, data: [action.payload.post, ...state.data] };
    case Types.REALTIME_REPLACE_SUCCESS:
      return realtimeReplacePost(state, action);
    case Types.REALTIME_DELETE:
      return realtimeDeletePost(state, action);

    case Types.POST_ADD_REQUEST:
      return { ...state, loading: { status: true, topic: 'post.add' } };
    case Types.POST_ADD_FAILURE:
      return {
        ...state,
        loading: { status: false, topic: 'post.add' },
        error: action.payload.error,
      };

    case Types.POST_EDIT_REQUEST:
      return { ...state, loading: { status: true, topic: 'post.edit' } };
    case Types.POST_EDIT_FAILURE:
      return {
        ...state,
        loading: { status: false, topic: 'post.edit' },
        error: action.payload.error,
      };

    case Types.POST_DELETE_REQUEST:
      return { ...state, loading: { status: true, topic: 'post.delete' } };
    case Types.POST_DELETE_FAILURE:
      return {
        ...state,
        loading: { status: false, topic: 'post.delete' },
        error: action.payload.error,
      };

    case Types.TOGGLE_LIKE_FAILURE:
      return {
        ...state,
        loading: { status: false, topic: 'post.toggleLike' },
        error: action.payload.error,
      };
    case Types.NEW_COMMENT_FAILURE:
      return {
        ...state,
        loading: { status: false, topic: 'post.newComment' },
        error: action.payload.error,
      };

    case Types.POSTS_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notifications: action.payload.notifications,
        error: null,
      };
    case Types.REALTIME_ADD_NOTIFICATION_SUCCESS:
      return { ...state, notifications: [action.payload.notification, ...state.notifications] };
    case Types.POSTS_NOTIFICATION_REMOVE:
      return postsNotificationsRemove(state, action);
    default:
      return state;
  }
}
