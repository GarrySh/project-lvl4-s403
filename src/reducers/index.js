import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const channels = handleActions(
  {
    [actions.fetchDataFromGonSuccess](state, { payload }) {
      const { channels: newChannels, currentChannelId } = payload;
      return {
        byId: _.keyBy(newChannels, 'id'),
        allIds: newChannels.map(channel => channel.id),
        currentChannelId,
      };
    },
  },
  { byId: {}, allIds: [], currentChannelId: 0 }
);

const messages = handleActions(
  {
    [actions.fetchDataFromGonSuccess](state, { payload }) {
      return payload.messages;
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
