import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const appConnected = createAction('APP_CONNECTED');
export const appDisconnected = createAction('APP_DISCONNECTED');

export const changeCurrentChannel = createAction('CURRENT_CHANNEL_CHANGE');

export const initAppSuccess = createAction('APP_INIT_SUCCESS');

export const initAppRequest = ({ channels, messages, currentChannelId }) => dispatch => {
  dispatch(appConnected());
  dispatch(initAppSuccess({ channels, messages, channelId: currentChannelId }));
};

export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');

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

export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');

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

export const removeChannelSuccess = createAction('CHANNEL_REMOVE_SUCCESS');

export const removeChannelRequest = channelId => async () => {
  const route = routes.channelUrl(channelId);
  await axios.delete(route);
};

export const renameChannelSuccess = createAction('CHANNEL_RENAME_SUCCESS');

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

export const showModalForm = createAction('MODAL_FORM_SHOW');
export const closeModalForm = createAction('MODAL_FORM_CLOSE');
