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
import { fetchDataFromGon, getMessage } from './actions';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default gon => {
  store.dispatch(fetchDataFromGon(gon));

  let userName = cookies.get('userName');
  if (!userName) {
    userName = faker.name.findName();
    cookies.set('userName', userName, { expires: 1 });
  }

  const socket = io.connect('/');
  socket.on('newMessage', res => {
    console.log('data attibutes', res.data);
    store.dispatch(getMessage({ message: res.data }));
  });

  render(
    <Provider store={store}>
      <App userName={userName} />
    </Provider>,
    document.querySelector('#app')
  );
};
