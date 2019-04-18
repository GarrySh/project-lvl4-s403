import React from 'react';
import cn from 'classnames';
import { Nav, Badge } from 'react-bootstrap';
import context from '../context';
import { withConnect } from '../decorators';

const mapStateToProps = ({ channels, currentChannelId }) => {
  const { byId, allIds } = channels;
  const props = {
    channels: allIds.map(id => byId[id]),
    currentChannelId,
  };
  return props;
};

const { UserNameContext } = context;

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

  handleChannelRemove = channelId => event => {
    event.preventDefault();
    const { removeChannelRequest } = this.props;
    removeChannelRequest(channelId);
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
            const { id, name, removable } = channel;
            const channelLinkClasses = cn({
              'rounded-0 text-white flex-grow-1 py-1': true,
              'active bg-secondary': id === currentChannelId,
            });
            const channelIconClasses = cn({
              'rounded-0 text-white p-1': true,
              'active bg-secondary': id === currentChannelId,
            });
            return (
              <Nav.Item key={id} className="d-flex align-items-center">
                <Nav.Link
                  className={channelLinkClasses}
                  href={`/channel/${id}`}
                  onClick={this.handleChannelChange(id)}
                >
                  <span className="fab fa-slack-hash mr-2" />
                  {name}
                </Nav.Link>
                {removable && (
                  <>
                    <Nav.Link className={channelIconClasses}>
                      <span className="far fa-edit" />
                    </Nav.Link>
                    <Nav.Link className={channelIconClasses} onClick={this.handleChannelRemove(id)}>
                      <span className="fas fa-trash" />
                    </Nav.Link>
                  </>
                )}
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
