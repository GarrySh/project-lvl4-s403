import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import { render } from 'react-dom';
import gon from 'gon';
import App from './components/App';

// import faker from 'faker';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

console.log(gon);

const app = App(gon);
render(app, document.querySelector('#chat'));
