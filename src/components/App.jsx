import React from 'react';
import Chanels from './Chanels';
import NewMessageForm from './NewMessageForm';

const App = props => {
  const { gon } = props;
  return (
    <>
      <Chanels gon={gon} />
      <NewMessageForm />
    </>
  );
};

export default App;
