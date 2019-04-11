const hostAPI = '/api/v1';

export default {
  messagesUrl: channelId => `${hostAPI}/channels/${channelId}/messages`,
  channelsUrl: () => `${hostAPI}/channels`,
};
