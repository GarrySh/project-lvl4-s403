import React from 'react';
import { Row } from 'react-bootstrap';
import { connect } from '../decorators';
import { filteredMessagesSelector } from '../selectors';

const mapStateToProps = state => {
  const props = { messages: filteredMessagesSelector(state) };
  return props;
};

@connect(mapStateToProps)
class Messages extends React.Component {
  render() {
    const { messages } = this.props;

    return messages.map(message => {
      return (
        <Row className="m-2 w-100" key={message.id}>
          <div className="w-100">
            <b>{message.userName}</b>
            <small className="p-2">{message.date}</small>
          </div>
          <p className="m-0">{message.text}</p>
        </Row>
      );
    });
  }
}

export default Messages;
