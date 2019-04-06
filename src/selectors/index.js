import { createSelector } from 'reselect';
import { format } from 'date-fns';

const getChannelsById = state => state.channels.byId;
const getChannelIds = state => state.channels.allIds;
export const channelsSelector = createSelector(
  [getChannelsById, getChannelIds],
  (byId, allIds) => allIds.map(id => byId[id])
);

const getMessages = state => state.messages;
export const messagesSelector = createSelector(
  getMessages,
  messages =>
    messages.map(message => ({
      ...message,
      date: format(message.date, 'HH:mm'),
    }))
);

const getCurrentChannelId = state => state.currentChannelId;
export const filteredMessages = createSelector(
  [messagesSelector, getCurrentChannelId],
  (messages, currentChannelId) => messages.filter(message => message.channelId === currentChannelId)
);
