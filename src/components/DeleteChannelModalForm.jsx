import React from 'react';
import { reduxForm, SubmissionError } from 'redux-form';
import { Modal, Button, Form } from 'react-bootstrap';
import { withConnect } from '../decorators';

const mapStateToProps = state => {
  const { showModal, formData } = state.UIStateModal;
  const { channelId, channelName } = formData;
  return {
    isShow: showModal === 'channelDelete',
    channelId,
    channelName,
  };
};

@withConnect(mapStateToProps)
@reduxForm({
  form: 'channelDelete',
})
class DeleteChannelModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.cancelBtn = React.createRef();
  }

  componentDidUpdate() {
    const { isShow } = this.props;
    if (isShow) {
      this.cancelBtn.current.focus();
    }
  }

  handleFormClose = () => {
    const { modalFormClose } = this.props;
    modalFormClose();
  };

  handleSubmit = async () => {
    const { channelRemoveRequest, modalFormClose, channelId } = this.props;
    try {
      await channelRemoveRequest(channelId);
      modalFormClose();
    } catch (err) {
      throw new SubmissionError({ _error: err.message });
    }
  };

  render() {
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
            <Button variant="secondary" onClick={this.handleFormClose} ref={this.cancelBtn}>
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

export default DeleteChannelModalForm;
