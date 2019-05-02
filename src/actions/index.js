import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const appConnected = createAction('APP_CONNECTED');
export const appDisconnected = createAction('APP_DISCONNECTED');

export const currentChannelChange = createAction('CURRENT_CHANNEL_CHANGE');

export const appInitSuccess = createAction('APP_INIT_SUCCESS');

export const appInitRequest = ({ channels, messages, currentChannelId }) => dispatch => {
  dispatch(appConnected());
  dispatch(appInitSuccess({ channels, messages, channelId: currentChannelId }));
};

export const messageAddSuccess = createAction('MESSAGE_ADD_SUCCESS');

export const messageAddRequest = ({ message }) => async () => {
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

export const channelAddSuccess = createAction('CHANNEL_ADD_SUCCESS');

export const channelAddRequest = ({ channel }) => async () => {
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

export const channelRemoveSuccess = createAction('CHANNEL_REMOVE_SUCCESS');

export const channelRemoveRequest = channelId => async () => {
  const route = routes.channelUrl(channelId);
  await axios.delete(route);
};

export const channelRenameSuccess = createAction('CHANNEL_RENAME_SUCCESS');

export const channelRenameRequest = ({ channel }) => async () => {
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

export const modalFormShow = createAction('MODAL_FORM_SHOW');
export const modalFormClose = createAction('MODAL_FORM_CLOSE');
