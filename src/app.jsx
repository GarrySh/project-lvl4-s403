import React from 'react';
import thunk from 'redux-thunk';
import faker from 'faker';
import cookies from 'js-cookie';
import io from 'socket.io-client';
import Rollbar from 'rollbar';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import App from './components/App';
import {
  initAppRequest,
  addMessageSuccess,
  addChannelSuccess,
  appDisconnected,
  removeChannelSuccess,
  renameChannelSuccess,
} from './actions';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default gon => {
  const rollbar = new Rollbar({
    accessToken: '7f727886056142c2903442fa02b52306',
    captureUncaught: true,
    captureUnhandledRejections: true,
  });

  rollbar.info('app started');

  let userName = cookies.get('userName');
  if (!userName) {
    userName = faker.name.findName();
    cookies.set('userName', userName, { expires: 1 });
  }

  const socket = io.connect();

  socket.on('connect', () => {
    const { channels, messages, currentChannelId } = gon;
    store.dispatch(initAppRequest({ channels, messages, currentChannelId }));
  });

  socket.on('disconnect', () => {
    store.dispatch(appDisconnected());
  });

  socket.on('newMessage', res => {
    store.dispatch(addMessageSuccess({ message: res.data.attributes }));
  });

  socket.on('newChannel', res => {
    store.dispatch(addChannelSuccess({ channel: res.data.attributes }));
  });

  socket.on('removeChannel', res => {
    store.dispatch(removeChannelSuccess({ channelId: res.data.id }));
  });

  socket.on('renameChannel', res => {
    store.dispatch(renameChannelSuccess({ channel: res.data.attributes }));
  });

  render(
    <Provider store={store}>
      <App userName={userName} />
    </Provider>,
    document.querySelector('#app-root')
  );
};
