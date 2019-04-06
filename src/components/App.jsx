import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Chanels from './Channels';
import Messages from './Messages';
import NewMessageForm from './NewMessageForm';
import UserNameContext from '../context';

const App = props => {
  const { userName } = props;

  return (
    <UserNameContext.Provider value={userName}>
      <Row className="row h-100 m-0">
        <Col xs="4" sm="3" md="3" lg="3" xl="2" className="bg-warning px-0 m-0">
          <Chanels />
        </Col>
        <Col className="px-0 d-flex flex-column h-100">
          <Row className="m-0 overflow-auto">
            <Messages />
          </Row>
          <Row className="m-0 mt-auto">
            <NewMessageForm />
          </Row>
        </Col>
      </Row>
    </UserNameContext.Provider>
  );
};

export default App;
