import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const appConnect = createAction('APP_CONNECTED');
export const appDisconnect = createAction('APP_DISCONNECTED');
export const fetchDataFromGonSuccess = createAction('DATA_FETCH_SUCCESS');

export const appInit = gon => dispatch => {
  const { channels, messages, currentChannelId } = gon;
  dispatch(appConnect());
  dispatch(fetchDataFromGonSuccess({ channels, messages, currentChannelId }));
};

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

export const getMessage = createAction('GET_MESSAGE_FROM_SOCKET');

export const changeChannel = createAction('CHANGE_CHANNEL');

export const openModalForm = createAction('OPEN_MODAL_FORM');
export const closeModalForm = createAction('CLOSE_MODAL_FORM');

export const addChannel = createAction('ADD_CHANNEL');
