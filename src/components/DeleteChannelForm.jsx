import React from 'react';
import { SubmissionError } from 'redux-form';
import { Modal, Button, Form } from 'react-bootstrap';
import { withConnect, withForm } from '../decorators';

const mapStateToProps = state => {
  const { isShow, channelId, channelName } = state.UIStateDeleteChannel;
  return {
    isShow,
    channelId,
    channelName,
  };
};

@withForm('deleteChannel')
@withConnect(mapStateToProps)
class DeleteModalForm extends React.Component {
  handleFormClose = () => {
    const { removeChannelProcessFinish } = this.props;
    removeChannelProcessFinish();
  };

  handleSubmit = async () => {
    const { removeChannelRequest, removeChannelProcessFinish, channelId } = this.props;
    try {
      await removeChannelRequest(channelId);
      removeChannelProcessFinish();
    } catch (err) {
      throw new SubmissionError({ _error: err.message });
    }
  };

  render() {
    console.log('render form ', this.props);
    const { channelName, handleSubmit, submitting, error, isShow } = this.props;

    return (
      <Modal show={isShow} onHide={this.handleFormClose}>
        <Form onSubmit={handleSubmit(this.handleSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>
              {'Do you really want to delete channel '}
              <b className="text-danger">{channelName}</b>
              {'? This process cannot be undone.'}
            </p>
            {error && <div className="mx-2 text-danger">{error}</div>}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleFormClose}>
              Cancel
            </Button>
            <Button type="submit" variant="danger" disabled={submitting}>
              Delete
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default DeleteModalForm;
