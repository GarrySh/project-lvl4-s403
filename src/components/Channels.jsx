import React from 'react';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlack, faSlackHash } from '@fortawesome/free-brands-svg-icons';
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Nav, Badge } from 'react-bootstrap';
import context from '../context';
import { withConnect } from '../decorators';
import { channelsSelector } from '../selectors';

const mapStateToProps = state => {
  const props = {
    channels: channelsSelector(state),
    currentChannelId: state.currentChannelId.id,
  };
  return props;
};

const { UserNameContext } = context;

@withConnect(mapStateToProps)
class Chanels extends React.Component {
  static contextType = UserNameContext;

  handleClickChannel = id => event => {
    event.preventDefault();
    const { changeCurrentChannel } = this.props;
    changeCurrentChannel({ channelId: id });
  };

  handleClickAddChannel = event => {
    event.preventDefault();
    const { showModalForm } = this.props;
    showModalForm({ showModal: 'channelAdd' });
  };

  handleClickEdit = (channelId, channelName) => event => {
    event.preventDefault();
    const { showModalForm } = this.props;
    showModalForm({ showModal: 'channelEdit', formData: { channelId, channelName } });
  };

  handleClickDelete = (channelId, channelName) => event => {
    event.preventDefault();
    const { showModalForm } = this.props;
    showModalForm({ showModal: 'channelDelete', formData: { channelId, channelName } });
  };

  render() {
    const { channels, currentChannelId } = this.props;

    return (
      <>
        <p className="h2 p-3 text-white">
          <FontAwesomeIcon className="mr-2" icon={faSlack} />
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
            const commonClassNames = {
              'rounded-0 text-white': true,
              'active bg-secondary': id === currentChannelId,
            };
            const channelLinkClasses = cn({
              ...commonClassNames,
              'flex-grow-1 py-1': true,
            });
            const channelIconClasses = cn({
              ...commonClassNames,
              ' p-1': true,
            });
            return (
              <Nav.Item key={id} className="d-flex align-items-center">
                <Nav.Link
                  className={channelLinkClasses}
                  href={`/channel/${id}`}
                  onClick={this.handleClickChannel(id)}
                >
                  <FontAwesomeIcon className="mr-2" icon={faSlackHash} />
                  {name}
                </Nav.Link>
                {removable && (
                  <>
                    <Nav.Link
                      className={channelIconClasses}
                      onClick={this.handleClickEdit(id, name)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Nav.Link>
                    <Nav.Link
                      className={channelIconClasses}
                      onClick={this.handleClickDelete(id, name)}
                    >
                      <FontAwesomeIcon className="mr-1" icon={faTrash} />
                    </Nav.Link>
                  </>
                )}
              </Nav.Item>
            );
          })}
          <Nav.Link className="mt-3 text-white" onClick={this.handleClickAddChannel}>
            <FontAwesomeIcon className="mr-2" icon={faPlus} />
            Add new channel
          </Nav.Link>
        </Nav>
      </>
    );
  }
}

export default Chanels;
