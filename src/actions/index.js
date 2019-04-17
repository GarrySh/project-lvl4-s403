import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const appConnected = createAction('APP_CONNECTED');
export const appDisconnected = createAction('APP_DISCONNECTED');
export const initAppSuccess = createAction('INIT_APP_SUCCESS');

export const initApp = gon => dispatch => {
  const { channels, messages, currentChannelId } = gon;
  dispatch(appConnected());
  dispatch(initAppSuccess({ channels, messages, currentChannelId }));
};

export const addMessage = createAction('ADD_MESSAGE');

export const sendMessage = ({ message }) => async () => {
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

export const openModalForm = createAction('OPEN_MODAL_FORM');
export const closeModalForm = createAction('CLOSE_MODAL_FORM');

export const addChannel = createAction('ADD_CHANNEL');
export const changeCurrentChannel = createAction('CHANGE_CURRENT_CHANNEL');

export const sendChannel = ({ channel }) => async () => {
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
