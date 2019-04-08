import React from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { Field } from 'redux-form';
import { withForm, withConnect } from '../decorators';

const mapStateToProps = state => {
  const { displayModalForm } = state.uiState;
  const props = { displayModalForm };
  return props;
};

@withForm('channelName')
@withConnect(mapStateToProps)
class ModalChannelForm extends React.Component {
  handleClose = () => {
    const { closeModalForm } = this.props;
    closeModalForm();
  };

  render() {
    const { displayModalForm } = this.props;
    return (
      <Modal show={displayModalForm} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <InputGroup>
              <Form.Label>Enter a unique channel name</Form.Label>
              <Field name="name" type="text" component={Form.Control} />
            </InputGroup>
          </Form>
        </Modal.Body>
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
