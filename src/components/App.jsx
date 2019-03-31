import React from 'react';
import Chanels from './Chanels';
import NewMessageForm from './NewMessageForm';
import { UserNameContext } from '../context';

const App = props => {
  const {
    gon: { channels },
    // gon: { channels, messages, currentChannelId },
    userName,
  } = props;

  return (
    <UserNameContext.Provider value={userName}>
      <Chanels channels={channels} />
      <NewMessageForm />
    </UserNameContext.Provider>
  );
};

export default App;
