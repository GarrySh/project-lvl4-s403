import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const channels = handleActions(
  {
    [actions.initAppSuccess](state, { payload }) {
      return {
        byId: _.keyBy(payload.channels, 'id'),
        allIds: payload.channels.map(channel => channel.id),
      };
    },
    [actions.addChannel](state, { payload }) {
      const { allIds, byId } = state;
      const { channel } = payload;
      return {
        allIds: [...allIds, channel.id],
        byId: { ...byId, [channel.id]: channel },
      };
    },
  },
  { byId: {}, allIds: [] }
);

const messages = handleActions(
  {
    [actions.initAppSuccess](state, { payload }) {
      return payload.messages;
    },
    [actions.addMessage](state, { payload }) {
      return [...state, payload.message];
    },
  },
  []
);

const currentChannelId = handleActions(
  {
    [actions.initAppSuccess](state, { payload }) {
      return payload.currentChannelId;
    },
    [actions.changeCurrentChannel](state, { payload }) {
      return payload.currentChannelId;
    },
  },
  0
);

const connectionStatus = handleActions(
  {
    [actions.appConnected]() {
      return 'connected';
    },
    [actions.appDisconnected]() {
      return 'disconnected';
    },
  },
  'none'
);

const uiState = handleActions(
  {
    [actions.openModalForm](state) {
      return {
        ...state,
        displayModalForm: true,
      };
    },
    [actions.closeModalForm](state) {
      return {
        ...state,
        displayModalForm: false,
      };
    },
  },
  { displayModalForm: false }
);

export default combineReducers({
  currentChannelId,
  channels,
  messages,
  connectionStatus,
  uiState,
  form: formReducer,
});
