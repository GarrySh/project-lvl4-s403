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
    [actions.addChannelSuccess](state, { payload }) {
      const { allIds, byId } = state;
      const { channel } = payload;
      return {
        byId: { ...byId, [channel.id]: channel },
        allIds: [...allIds, channel.id],
      };
    },
    [actions.removeChannelSuccess](state, { payload }) {
      const { allIds, byId } = state;
      const { channelId } = payload;
      return {
        byId: _.omit(byId, channelId),
        allIds: allIds.filter(id => id !== channelId),
      };
    },
  },
  { byId: {}, allIds: [] }
);

const messages = handleActions(
  {
    [actions.initAppSuccess](state, { payload }) {
      return {
        byId: _.keyBy(payload.messages, 'id'),
        allIds: payload.messages.map(message => message.id),
      };
    },
    [actions.addMessageSuccess](state, { payload }) {
      const { allIds, byId } = state;
      const { message } = payload;
      return {
        byId: { ...byId, [message.id]: message },
        allIds: [...allIds, message.id],
      };
    },
    [actions.removeChannelSuccess](state, { payload }) {
      const { allIds, byId } = state;
      const { channelId } = payload;
      const idsForRemove = [];
      return {
        byId: _.omitBy(byId, message => {
          const compareResult = message.channelId === channelId;
          if (compareResult) {
            idsForRemove.push(message.id);
          }
          return compareResult;
        }),
        allIds: allIds.filter(id => !idsForRemove.includes(id)),
      };
    },
  },
  { byId: {}, allIds: [] }
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

const channelsUIState = handleActions(
  {
    [actions.registerChannelRequest](state) {
      return {
        ...state,
        initialValues: { channelName: 'initisss', test: 'ttt' },
        displayModalForm: true,
      };
    },
    [actions.registerChannelSuccess](state) {
      return {
        ...state,
        initialValues: { channelName: '12', test: '12' },
        displayModalForm: false,
      };
    },
    [actions.editChannelRequest](state, { payload }) {
      const { initialValues } = payload;
      return {
        ...state,
        initialValues,
        displayModalForm: false,
      };
    },
  },
  { displayModalForm: true, initialValues: { channelName: '1', test: '1' } }
);

export default combineReducers({
  currentChannelId,
  channels,
  messages,
  connectionStatus,
  channelsUIState,
  form: formReducer,
});
