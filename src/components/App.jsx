import React from 'react';
import Chanels from './Channels';
import Messages from './Messages';
import NewMessageForm from './NewMessageForm';
import UserNameContext from '../context';

const App = props => {
  const { userName } = props;

  return (
    <UserNameContext.Provider value={userName}>
      <div className="row h-100 m-0">
        <div className="col-4 col-sm-3 col-md-3 col-lg-3 col-xl-2 bg-warning px-0 m-0">
          <Chanels />
        </div>
        <div className="col px-0 d-flex flex-column h-100">
          <div className="row m-0 overflow-auto">
            <Messages />
          </div>
          <div className="row m-0 mt-auto">
            <NewMessageForm />
          </div>
        </div>
      </div>
    </UserNameContext.Provider>
  );
};

export default App;
