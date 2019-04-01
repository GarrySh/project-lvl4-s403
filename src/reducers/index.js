import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const channels = handleActions(
  {
    [actions.fetchChannelsSuccess](state, { payload }) {
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

export default combineReducers({
  channels,
  form: formReducer,
});
