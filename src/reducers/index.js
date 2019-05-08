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
    [actions.renameChannelSuccess](state, { payload }) {
      const { allIds, byId } = state;
      const { channel } = payload;
      return {
        byId: { ...byId, [channel.id]: channel },
        allIds,
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
      const filtredByIds = _.omitBy(byId, message => _.isMatch(message, { channelId }));
      return {
        byId: filtredByIds,
        allIds: allIds.filter(id => filtredByIds[id]),
      };
    },
  },
  { byId: {}, allIds: [] }
);

const currentChannelId = handleActions(
  {
    [actions.initAppSuccess](state, { payload }) {
      const { channelId } = payload;
      return { defaultId: channelId, id: channelId };
    },
    [actions.changeCurrentChannel](state, { payload }) {
      const { channelId } = payload;
      return { ...state, id: channelId };
    },
    [actions.removeChannelSuccess](state, { payload }) {
      const { channelId } = payload;
      if (channelId === state.id) {
        return { ...state, id: state.defaultId };
      }
      return state;
    },
  },
  { id: null, defaultId: null }
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

const UIStateModal = handleActions(
  {
    [actions.showModalForm](state, { payload }) {
      const { showModal, formData = {} } = payload;
      return {
        showModal,
        formData,
      };
    },
    [actions.closeModalForm]() {
      return {
        showModal: 'none',
        formData: {},
      };
    },
  },
  { showModal: 'none', formData: {} }
);

export default combineReducers({
  currentChannelId,
  channels,
  messages,
  connectionStatus,
  UIStateModal,
  form: formReducer,
});
