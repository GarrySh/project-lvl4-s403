import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const fetchDataFromGonSuccess = createAction('DATA_FETCH_SUCCESS');

export const fetchDataFromGon = ({ channels, messages, currentChannelId }) => dispatch => {
  dispatch(fetchDataFromGonSuccess({ channels, messages, currentChannelId }));
};

export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');

export const addMessage = ({ message }) => async dispatch => {
  const route = routes.messagesUrl(message.channelId);
  // console.log({ route });
  const apiRequest = {
    data: {
      attributes: {
        date: new Date(),
        ...message,
      },
    },
  };
  const response = await axios.post(route, apiRequest);
  console.log('message post response', response);
  dispatch(addMessageSuccess({ message: response.data }));
};
