import React from 'react';
import cn from 'classnames';
import { Nav, Badge } from 'react-bootstrap';
import UserNameContext from '../context';
import { withConnect } from '../decorators';

const mapStateToProps = ({ channels, currentChannelId }) => {
  const { byId, allIds } = channels;
  const props = {
    channels: allIds.map(id => byId[id]),
    currentChannelId,
  };
  return props;
};

@withConnect(mapStateToProps)
class Chanels extends React.Component {
  static contextType = UserNameContext;

  handleChannelChange = id => event => {
    event.preventDefault();
    const { changeChannel } = this.props;
    changeChannel({ currentChannelId: id });
  };

  handleChannelAdd = event => {
    event.preventDefault();
    const { openModalForm } = this.props;
    openModalForm();
  };

  render() {
    const { channels, currentChannelId } = this.props;

    return (
      <>
        <p className="h2 p-3">simple slack</p>
        <div className="p-3 lead">
          <div>Signed in as</div>
          <Badge variant="secondary">{this.context}</Badge>
        </div>
        <div className="p-3 lead">Channels</div>
        <Nav variant="pills" className="flex-column">
          {channels.map(channel => {
            const channelClasses = cn({
              'rounded-0': true,
              'active bg-secondary': channel.id === currentChannelId,
            });
            return (
              <Nav.Item key={channel.id}>
                <Nav.Link
                  className={channelClasses}
                  href={`/channel/${channel.id}`}
                  onClick={this.handleChannelChange(channel.id)}
                >
                  {`# ${channel.name}`}
                </Nav.Link>
              </Nav.Item>
            );
          })}
          <Nav.Link className="mt-3" onClick={this.handleChannelAdd}>
            + Add new channel
          </Nav.Link>
        </Nav>
      </>
    );
  }
}

export default Chanels;
