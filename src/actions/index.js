import axios from 'axios';
import { createAction } from 'redux-actions';

import routes from '../routes';

export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
// export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
// export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const addMessage = ({ message }) => async dispatch => {
  const route = routes.messagesUrl(message.channelId);
  // console.log({ route });
  const apiRequest = {
    data: {
      attributes: {
        ...message,
      },
    },
  };
  const response = await axios.post(route, apiRequest);
  dispatch(addMessageSuccess({ message: response.data }));
};

export const fetchChannelsSuccess = createAction('CHANNELS_FETCH_SUCCESS');
export const fetchChannels = ({ channels, currentChannelId }) => dispatch => {
  dispatch(fetchChannelsSuccess({ channels, currentChannelId }));
};
