import React from 'react';
import cn from 'classnames';
import { Modal, Button, Form } from 'react-bootstrap';
import { Field, SubmissionError, reduxForm } from 'redux-form';
import { exclusion, length } from 'redux-form-validators';
import { connect } from 'react-redux';
// import { withForm, withConnect } from '../decorators';
import { channelNamesSelector } from '../selectors';
import * as actionCreators from '../actions';

const mapStateToProps = state => {
  const { isShow, isEdit, channelId, channelName } = state.UIStateEditChannel;
  return {
    isShow,
    isEdit,
    channelId,
    channelNames: channelNamesSelector(state),
    initialValues: { channelName },
  };
};

const renderField = ({ input, label, cRef, type, meta: { error, pristine, submitting } }) => {
  const channelNameClass = cn({
    'form-control': true,
    'is-invalid': !pristine && !submitting && error,
    'is-valid': !pristine && !submitting && !error,
  });

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        {...input}
        placeholder={label}
        type={type}
        className={channelNameClass}
        ref={cRef}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </Form.Group>
  );
};

// initialValue in mapStateToProps does not work when @decorators are used in redux-form
// @withForm('channelName')
// @withConnect(mapStateToProps)
class ModalChannelForm extends React.Component {
  constructor(props) {
    super(props);
    this.channelNameInput = React.createRef();
  }

  componentDidUpdate() {
    const { isShow } = this.props;
    if (isShow) {
      this.channelNameInput.current.focus();
    }
  }

  handleFormClose = () => {
    const { editChannelProcessFinish, reset } = this.props;
    editChannelProcessFinish();
    reset();
  };

  handleSubmit = async ({ channelName }) => {
    const {
      addChannelRequest,
      renameChannelRequest,
      reset,
      editChannelProcessFinish,
      isEdit,
      channelId,
    } = this.props;

    try {
      if (isEdit) {
        await renameChannelRequest({ channel: { name: channelName, id: channelId } });
      } else {
        await addChannelRequest({ channel: { name: channelName } });
      }
    } catch (err) {
      throw new SubmissionError({ _error: err.message });
    }
    editChannelProcessFinish();
    reset();
  };

  render() {
    const { channelNames, handleSubmit, submitting, pristine, valid, isShow } = this.props;

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
              cRef={this.channelNameInput}
              validate={[
                length({ minimum: 3 }),
                exclusion({ in: channelNames, caseSensitive: false, msg: 'name is not unique' }),
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
