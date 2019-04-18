import React from 'react';
import thunk from 'redux-thunk';
import faker from 'faker';
import cookies from 'js-cookie';
import io from 'socket.io-client';
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
} from './actions';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default gon => {
  let userName = cookies.get('userName');
  if (!userName) {
    userName = faker.name.findName();
    cookies.set('userName', userName, { expires: 1 });
  }

  const socket = io.connect();

  socket.on('connect', () => {
    store.dispatch(initAppRequest(gon));
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

  render(
    <Provider store={store}>
      <App userName={userName} />
    </Provider>,
    document.querySelector('#app')
  );
};
