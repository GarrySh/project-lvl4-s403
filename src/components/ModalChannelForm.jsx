import React from 'react';
import cn from 'classnames';
import { Modal, Button, Form } from 'react-bootstrap';
import { Field, SubmissionError } from 'redux-form';
import { exclusion, length } from 'redux-form-validators';
import { withForm, withConnect } from '../decorators';
import { channelsNameSelector } from '../selectors';

const initialValues = { channelName: 'initisss', test: 'ttt' };

const mapStateToProps = state => {
  const { displayModalForm } = state.channelsUIState;
  console.log('initialValues', initialValues);
  const props = {
    displayModalForm,
    channels: channelsNameSelector(state),
    initialValues,
  };
  return props;
};

const renderField = ({ input, label, type, meta: { error, pristine } }) => {
  const channelNameClass = cn({
    'form-control': true,
    'is-invalid': !pristine && error,
    'is-valid': !pristine && !error,
  });

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control {...input} placeholder={label} type={type} className={channelNameClass} />
      {error && <div className="invalid-feedback">{error}</div>}
    </Form.Group>
  );
};

@withForm('channelName')
@withConnect(mapStateToProps)
class ModalChannelForm extends React.Component {
  handleFormClose = () => {
    const { registerChannelSuccess } = this.props;
    registerChannelSuccess();
  };

  handleSubmit = async ({ channelName }) => {
    const { addChannelRequest, reset, registerChannelSuccess } = this.props;
    const channel = { name: channelName };
    try {
      await addChannelRequest({ channel });
    } catch (err) {
      throw new SubmissionError({ _error: err.message });
    }
    reset();
    registerChannelSuccess();
  };

  render() {
    const { channels, handleSubmit, submitting, pristine, valid, displayModalForm } = this.props;
    console.log('modal props', this.props);
    return (
      <Modal show={displayModalForm} onHide={this.handleFormClose}>
        <Form onSubmit={handleSubmit(this.handleSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Add new channel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Field
              name="channelName"
              type="text"
              component={renderField}
              label="Enter a unique channel name"
              validate={[
                length({ minimum: 3 }),
                exclusion({ in: channels, caseSensitive: false, msg: 'name is not unique' }),
              ]}
            />
            <Field name="test" type="text" component="input" value="sd" />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleFormClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" disabled={pristine || !valid || submitting}>
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default ModalChannelForm;
