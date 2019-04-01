import React from 'react';

const Messages = props => {
  const { messages } = props;
  return messages.map(message => (
    <div className="row m-2 w-100" key={message.id}>
      <div className="w-100">
        <b>GarrySh</b>
        <small className="p-2">20:20</small>
      </div>
      <p className="m-0">{message.text}</p>
    </div>
  ));
};

export default Messages;
