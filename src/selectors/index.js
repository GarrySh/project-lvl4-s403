import { createSelector } from 'reselect';
import { format } from 'date-fns';

export const getChannelsById = state => state.channels.byId;
const getChannelIds = state => state.channels.allIds;

export const channelsSelector = createSelector(
  [getChannelsById, getChannelIds],
  (byId, allIds) => allIds.map(id => byId[id])
);

export const channelNamesSelector = createSelector(
  [channelsSelector],
  channels => channels.map(channel => channel.name)
);

const getMessagesById = state => state.messages.byId;
const getMessageIds = state => state.messages.allIds;

export const messagesSelector = createSelector(
  [getMessagesById, getMessageIds],
  (byId, allIds) =>
    allIds.map(id => {
      const message = byId[id];
      return {
        ...message,
        date: format(message.date, 'HH:mm'),
      };
    })
);

const getCurrentChannelId = state => state.currentChannelId.id;

export const currentMessagesSelector = createSelector(
  [messagesSelector, getCurrentChannelId],
  (messages, currentChannelId) => messages.filter(message => message.channelId === currentChannelId)
);
