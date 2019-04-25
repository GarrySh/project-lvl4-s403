import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Field, SubmissionError } from 'redux-form';
import { withConnect, withForm } from '../decorators';
import { getChannelsById } from '../selectors';

const mapStateToProps = state => {
  const { displayModalForm, channelId } = state.UIState;
  return {
    displayModalForm,
    // channel: getChannelsById[channelId],
    channelId,
  };
};

@withForm('channelDelete')
@withConnect(mapStateToProps)
class ChannelDeleteModalForm extends React.Component {
  handleFormClose = () => {
    const { removeChannelConfirmFinish } = this.props;
    removeChannelConfirmFinish();
  };

  handleSubmit = async channelId => {
    console.log(channelId);
    const { removeChannelRequest } = this.props;
    try {
      await removeChannelRequest(channelId);
    } catch (err) {
      throw new SubmissionError({ _error: err.message });
    }
  };

  render() {
    const { displayModalForm, channel, handleSubmit, submitting } = this.props;
    const isShow = displayModalForm === 'channelDelete';

    return (
      <Modal show={isShow} onHide={this.handleFormClose}>
        <Form onSubmit={handleSubmit(this.handleSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>
              Do you really want to delete channel
              {/* {channel.name} */}
              \? This process cannot be undone.
            </p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleFormClose}>
              Cancel
            </Button>
            {/* id */}
            <Button type="submit" variant="danger" disabled={submitting}>
              Delete
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default ChannelDeleteModalForm;
