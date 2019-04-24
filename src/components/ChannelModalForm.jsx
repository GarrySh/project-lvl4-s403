import React from 'react';
import cn from 'classnames';
import { Modal, Button, Form } from 'react-bootstrap';
import { Field, SubmissionError, reduxForm } from 'redux-form';
import { exclusion, length } from 'redux-form-validators';
import { connect } from 'react-redux';
// import { withForm, withConnect } from '../decorators';
import { channelsNameSelector } from '../selectors';
import * as actionCreators from '../actions';

const mapStateToProps = state => {
  const { displayModalForm } = state.UIState;
  const props = {
    displayModalForm,
    channels: channelsNameSelector(state),
    initialValues: state.UIState.channelFormInitialValues,
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

// initialValue in mapStateToProps does not work when @decorators are used, in redux-form
// @withForm('channelName')
// @withConnect(mapStateToProps)
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
    const isShow = displayModalForm === 'channelEdit';
    // console.log('modal props', this.props);
    return (
      <Modal show={isShow} onHide={this.handleFormClose}>
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

const ConnectedNewTaskForm = reduxForm({
  form: 'channelName',
  enableReinitialize: true,
})(ModalChannelForm);

export default connect(
  mapStateToProps,
  actionCreators
)(ConnectedNewTaskForm);

// export default ModalChannelForm;