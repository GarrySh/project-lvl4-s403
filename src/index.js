import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import gon from 'gon';
import faker from 'faker';
import cookies from 'js-cookie';
import io from 'socket.io-client';

import getApp from './app';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

let userName = cookies.get('userName');
if (!userName) {
  userName = faker.name.findName();
  cookies.set('userName', userName, { expires: 1 });
}

const socket = io.connect('/');
socket.on('newMessage', data => console.log({ data }));

getApp(gon, userName);
