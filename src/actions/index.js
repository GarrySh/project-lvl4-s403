import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const appConnected = createAction('APP_CONNECTED');
export const appDisconnected = createAction('APP_DISCONNECTED');

export const changeCurrentChannel = createAction('CHANGE_CURRENT_CHANNEL');

export const initAppSuccess = createAction('INIT_APP_SUCCESS');

export const initAppRequest = ({ channels, messages, currentChannelId }) => dispatch => {
  dispatch(appConnected());
  dispatch(initAppSuccess({ channels, messages, currentChannelId }));
};

export const addMessageSuccess = createAction('ADD_MESSAGE_SUCCESS');

export const addMessageRequest = ({ message }) => async () => {
  const route = routes.messagesUrl(message.channelId);
  const apiRequest = {
    data: {
      attributes: {
        date: new Date(),
        ...message,
      },
    },
  };
  await axios.post(route, apiRequest);
};

export const addChannelSuccess = createAction('ADD_CHANNEL_SUCCESS');

export const addChannelRequest = ({ channel }) => async () => {
  const route = routes.channelsUrl();
  const apiRequest = {
    data: {
      attributes: {
        ...channel,
      },
    },
  };
  await axios.post(route, apiRequest);
};

export const removeChannelSuccess = createAction('REMOVE_CHANNEL_SUCCESS');

export const removeChannelRequest = channelId => async () => {
  const route = routes.channelUrl(channelId);
  await axios.delete(route);
};

export const editChannelProcessStart = createAction('EDIT_CHANNEL_PROCESS_START');
export const addChannelProcessStart = createAction('ADD_CHANNEL_PROCESS_START');
export const editChannelProcessFinish = createAction('EDIT_CHANNEL_PROCESS_FINISH');

export const renameChannelSuccess = createAction('RENAME_CHANNEL_SUCCESS');

export const renameChannelRequest = ({ channel }) => async () => {
  const route = routes.channelUrl(channel.id);
  const apiRequest = {
    data: {
      attributes: {
        ...channel,
      },
    },
  };
  await axios.patch(route, apiRequest);
};

export const removeChannelProcessStart = createAction('REMOVE_CHANNEL_PROCESS_START');
export const removeChannelProcessFinish = createAction('REMOVE_CHANNEL_PROCESS_FINISH');
