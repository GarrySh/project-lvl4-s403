import React from 'react';
import { Row } from 'react-bootstrap';
import { withConnect } from '../decorators';
import { currentMessagesSelector } from '../selectors';

const mapStateToProps = state => {
  return { messages: currentMessagesSelector(state) };
};

@withConnect(mapStateToProps)
class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.messagesBottom = React.createRef();
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.messagesBottom.current.scrollIntoView({
      behavior: 'smooth',
    });
  }

  renderMessages() {
    const { messages } = this.props;
    return messages.map(message => (
      <Row className="m-2 w-100" key={message.id}>
        <div className="w-100">
          <b>{message.userName}</b>
          <small className="p-2">{message.date}</small>
        </div>
        <p className="m-0">{message.text}</p>
      </Row>
    ));
  }

  render() {
    return (
      <>
        {this.renderMessages()}
        <div ref={this.messagesBottom} />
      </>
    );
  }
}

export default Messages;
