import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const fetchDataFromGonSuccess = createAction('DATA_FETCH_SUCCESS');

export const fetchDataFromGon = ({ channels, messages, currentChannelId }) => dispatch => {
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

export const getMessage = createAction('GET_MESSAGE');
