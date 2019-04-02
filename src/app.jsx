import React from 'react';
import thunk from 'redux-thunk';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import App from './components/App';
import { fetchDataFromGon } from './actions';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default (gon, userName) => {
  store.dispatch(fetchDataFromGon(gon));

  render(
    <Provider store={store}>
      <App gon={gon} userName={userName} />
    </Provider>,
    document.querySelector('#app')
  );
};
