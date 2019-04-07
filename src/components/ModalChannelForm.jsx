import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { withForm, withConnect } from '../decorators';

const mapStateToProps = state => {
  const { displayModalForm } = state.uiState;
  const props = { displayModalForm };
  return props;
};

@withForm('channelName')
@withConnect(mapStateToProps)
class ModalChannelForm extends React.Component {
  handleClose = event => {
    event.preventDefault();
    const { toggleModalForm } = this.props;
    toggleModalForm();
  };

  render() {
    console.log(this.props);
    const { displayModalForm } = this.props;
    return (
      <Modal show={displayModalForm} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you&#39;re reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalChannelForm;
