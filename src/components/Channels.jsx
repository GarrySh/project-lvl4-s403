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
    const { changeCurrentChannel } = this.props;
    changeCurrentChannel({ currentChannelId: id });
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
        <p className="h2 p-3 text-white">
          <span className="fab fa-slack mr-2" />
          simple slack
        </p>
        <div className="p-3 lead">
          <p className="text-white font-weight-bold mb-1">Signed in as</p>
          <Badge variant="secondary">{this.context}</Badge>
        </div>
        <div className="p-3 lead text-white font-weight-bold">Channels</div>
        <Nav variant="pills" className="flex-column">
          {channels.map(channel => {
            const channelClasses = cn({
              'rounded-0 text-white py-1': true,
              'active bg-secondary': channel.id === currentChannelId,
            });
            return (
              <Nav.Item key={channel.id} className="">
                <Nav.Link
                  className={channelClasses}
                  href={`/channel/${channel.id}`}
                  onClick={this.handleChannelChange(channel.id)}
                >
                  <span className="fab fa-slack-hash mr-2" />
                  {channel.name}
                </Nav.Link>
              </Nav.Item>
            );
          })}
          <Nav.Link className="mt-3 text-white" onClick={this.handleChannelAdd}>
            <span className="fas fa-plus mr-2" />
            Add new channel
          </Nav.Link>
        </Nav>
      </>
    );
  }
}

export default Chanels;
