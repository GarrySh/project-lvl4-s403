import React from 'react';
import cn from 'classnames';
import { Modal, Button, Form } from 'react-bootstrap';
import { Field, SubmissionError } from 'redux-form';
import { exclusion } from 'redux-form-validators';
import { withForm, withConnect } from '../decorators';
import { channelsSelector } from '../selectors';

const mapStateToProps = state => {
  const { displayModalForm } = state.uiState;
  const props = { displayModalForm, channels: channelsSelector(state) };
  return props;
};

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => {
  console.log({ input, error });
  return (
    <div>
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  );
};

@withForm('channelName')
@withConnect(mapStateToProps)
class ModalChannelForm extends React.Component {
  handleFormClose = () => {
    const { closeModalForm } = this.props;
    closeModalForm();
  };

  handleSubmit = ({ channelName }) => {
    const { channels } = this.props;
    const normalizeName = channelName.trim().toLowerCase();
    const findResult = channels.find(channel => channel.name === normalizeName);
    if (findResult) {
      throw new SubmissionError({ _error: 'channel name is not unique' });
    }
  };

  render() {
    const { channels, handleSubmit, submitting, pristine, error, displayModalForm } = this.props;
    const channelNameClass = cn({
      'form-control': true,
      'is-invalid': error,
    });
    console.log({ channels });
    return (
      <Modal show={displayModalForm} onHide={this.handleFormClose}>
        <Form onSubmit={handleSubmit(this.handleSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Add new channel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Enter a unique channel name</Form.Label>
              <Field
                className={channelNameClass}
                name="channelName"
                type="text"
                component={renderField}
                validate={exclusion({ in: ['gen'], caseSensitive: false })}
              />
              <div className="invalid-feedback">{error}</div>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleFormClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" disabled={pristine || submitting}>
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default ModalChannelForm;
