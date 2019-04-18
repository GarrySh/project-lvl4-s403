const hostAPI = '/api/v1';

export default {
  messagesUrl: channelId => `${hostAPI}/channels/${channelId}/messages`,
  channelUrl: channelId => `${hostAPI}/channels/${channelId}`,
  channelsUrl: () => `${hostAPI}/channels`,
};
