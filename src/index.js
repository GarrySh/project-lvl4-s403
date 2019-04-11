import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/all';
import '../assets/application.css';
import gon from 'gon';

import getApp from './app';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

getApp(gon);
