import React from 'react';
import { UserNameContext } from '../context';

class Chanels extends React.Component {
  static contextType = UserNameContext;

  render() {
    console.log('chanels props', this.props, 'context', this.context);
    const { channels } = this.props;
    return (
      <>
        <span>
          Login as:
          {this.context}
        </span>
        <h2>Chanels</h2>
        {channels.map(({ id, name }) => (
          <div key={id}>{name}</div>
        ))}
      </>
    );
  }
}

export default Chanels;
