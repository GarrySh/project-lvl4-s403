import React from 'react';
import { connect } from '../decorators';
import { filteredMessages } from '../selectors';

const mapStateToProps = state => {
  const props = { messages: filteredMessages(state) };
  return props;
};

@connect(mapStateToProps)
class Messages extends React.Component {
  render() {
    const { messages } = this.props;

    return messages.map(message => {
      return (
        <div className="row m-2 w-100" key={message.id}>
          <div className="w-100">
            <b>{message.userName}</b>
            <small className="p-2">{message.date}</small>
          </div>
          <p className="m-0">{message.text}</p>
        </div>
      );
    });
  }
}

export default Messages;
