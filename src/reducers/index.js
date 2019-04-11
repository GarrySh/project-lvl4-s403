import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const channels = handleActions(
  {
    [actions.fetchDataFromGonSuccess](state, { payload }) {
      return {
        byId: _.keyBy(payload.channels, 'id'),
        allIds: payload.channels.map(channel => channel.id),
      };
    },
    [actions.addChannelFromSocket](state, { payload }) {
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
    [actions.fetchDataFromGonSuccess](state, { payload }) {
      return payload.messages;
    },
    [actions.addMessageFromSocket](state, { payload }) {
      return [...state, payload.message];
    },
  },
  []
);

const currentChannelId = handleActions(
  {
    [actions.fetchDataFromGonSuccess](state, { payload }) {
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
    [actions.appConnect]() {
      return 'connected';
    },
    [actions.appDisconnect]() {
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
