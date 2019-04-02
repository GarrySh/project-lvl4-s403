import React from 'react';

import connect from '../connect';
// import * as actions from '../actions';

const mapStateToProps = state => {
  const props = {
    messages: state.messages,
  };
  return props;
};

@connect(mapStateToProps)
class Messages extends React.Component {
  render() {
    const { messages } = this.props;
    console.log('render messages in', messages);

    return messages.map(message => (
      <div className="row m-2 w-100" key={message.id}>
        <div className="w-100">
          <b>username</b>
          <small className="p-2">20:20</small>
        </div>
        <p className="m-0">{message.text}</p>
      </div>
    ));
  }
}

export default Messages;
