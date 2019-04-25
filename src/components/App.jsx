import React from 'react';
import { Row, Col } from 'react-bootstrap';
import context from '../context';
import AppAlert from './AppAlert';
import Chanels from './Channels';
import Messages from './Messages';
import NewMessageForm from './NewMessageForm';
import ChannelModalForm from './ChannelModalForm';
import ChannelDeleteModalForm from './ChannelDeleteModalForm';

const App = props => {
  const { userName } = props;
  const { UserNameContext } = context;

  return (
    <UserNameContext.Provider value={userName}>
      <Row className="row h-100 m-0">
        <Col xs="5" sm="4" md="4" lg="3" xl="2" className="bg-primary px-0 m-0">
          <Chanels />
        </Col>
        <Col className="px-0 d-flex flex-column h-100">
          <Row className="m-0 overflow-auto">
            <AppAlert />
            <Messages />
          </Row>
          <Row className="m-0 mt-auto">
            <NewMessageForm />
          </Row>
        </Col>
        <ChannelModalForm />
        <ChannelDeleteModalForm />
      </Row>
    </UserNameContext.Provider>
  );
};

export default App;
