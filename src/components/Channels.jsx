import React from 'react';
import cn from 'classnames';
import { UserNameContext } from '../context';
import connect from '../connect';

const mapStateToProps = ({ channels, currentChannelId }) => {
  const { byId, allIds } = channels;
  const props = {
    channels: allIds.map(id => byId[id]),
    currentChannelId,
  };
  return props;
};

@connect(mapStateToProps)
class Chanels extends React.Component {
  static contextType = UserNameContext;

  render() {
    // console.log('render chanels props', this.props);
    const { channels, currentChannelId } = this.props;

    return (
      <>
        <p className="h2 p-3">simple slack</p>
        <div className="p-3 lead">
          Signed in as
          <span className="badge badge-secondary m-2">{this.context}</span>
        </div>
        <div className="p-3 lead">Channels</div>
        <ul className="nav nav-pills flex-column">
          {channels.map(channel => {
            const channelClasses = cn({
              'nav-link rounded-0': true,
              'active bg-secondary': channel.id === currentChannelId,
            });
            return (
              <li className="nav-item" key={channel.id}>
                <a className={channelClasses} href="#/">
                  {channel.name}
                </a>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

export default Chanels;
