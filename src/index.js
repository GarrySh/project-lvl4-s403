import 'bootstrap';
import '../scss/custom.scss';
import gon from 'gon';

import getApp from './app';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

getApp(gon);
