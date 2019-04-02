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
  },
  { byId: {}, allIds: [] }
);

const messages = handleActions(
  {
    [actions.fetchDataFromGonSuccess](state, { payload }) {
      return payload.messages;
    },
    [actions.getMessage](state, { payload }) {
      console.log('get message from socks', payload.message);
      return [...state];
    },
  },
  []
);

const currentChannelId = handleActions(
  {
    [actions.fetchDataFromGonSuccess](state, { payload }) {
      return payload.currentChannelId;
    },
  },
  0
);

export default combineReducers({
  currentChannelId,
  channels,
  messages,
  form: formReducer,
});
