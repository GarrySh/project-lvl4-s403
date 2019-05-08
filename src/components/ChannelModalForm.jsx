import React from 'react';
import cn from 'classnames';
import { Modal, Button, Form } from 'react-bootstrap';
import { Field, SubmissionError, reduxForm } from 'redux-form';
import { exclusion, length } from 'redux-form-validators';
import { withConnect } from '../decorators';
import { channelNamesSelector } from '../selectors';

const mapStateToProps = state => {
  const { showModal, formData } = state.UIStateModal;
  const { channelId, channelName = '' } = formData;
  return {
    isShow: showModal === 'channelAdd' || showModal === 'channelEdit',
    isEdit: showModal === 'channelEdit',
    channelId,
    channelNames: channelNamesSelector(state),
    initialValues: { channelName },
  };
};

const renderField = ({
  input,
  label,
  componentRef,
  type,
  meta: { error, pristine, submitting },
}) => {
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
        ref={componentRef}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </Form.Group>
  );
};

@withConnect(mapStateToProps)
@reduxForm({
  form: 'channelEdit',
  enableReinitialize: true,
})
class ChannelModalForm extends React.Component {
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
    const { closeModalForm, reset } = this.props;
    closeModalForm();
    reset();
  };

  handleSubmit = async ({ channelName }) => {
    const {
      addChannelRequest,
      renameChannelRequest,
      reset,
      closeModalForm,
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
    closeModalForm();
    reset();
  };

  render() {
    const { channelNames, handleSubmit, submitting, pristine, valid, isShow, isEdit } = this.props;

    return (
      <Modal show={isShow} onHide={this.handleFormClose}>
        <Form onSubmit={handleSubmit(this.handleSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>{isEdit ? 'Rename channel' : 'Add new channel'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Field
              name="channelName"
              type="text"
              component={renderField}
              label="Enter a unique channel name"
              componentRef={this.channelNameInput}
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

export default ChannelModalForm;
