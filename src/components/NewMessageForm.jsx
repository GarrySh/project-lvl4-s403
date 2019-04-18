import React from 'react';
import { Field, SubmissionError } from 'redux-form';
import { Form, InputGroup } from 'react-bootstrap';
import context from '../context';
import { withConnect, withForm } from '../decorators';

const mapStateToProps = ({ currentChannelId }) => {
  const props = {
    currentChannelId,
  };
  return props;
};

const { UserNameContext } = context;

@withForm('newMessage')
@withConnect(mapStateToProps)
class newMessageForm extends React.Component {
  static contextType = UserNameContext;

  handleSubmit = async values => {
    const { addMessageRequest, reset, currentChannelId } = this.props;
    // console.log('props', this.props);
    const message = { ...values, userName: this.context, channelId: currentChannelId };
    try {
      await addMessageRequest({ message });
    } catch (err) {
      throw new SubmissionError({ _error: err.message });
    }
    reset();
  };

  render() {
    const { handleSubmit, submitting, pristine, error } = this.props;

    return (
      <Form className="w-100" onSubmit={handleSubmit(this.handleSubmit)}>
        <Form.Row className="m-0">
          {error && <div className="mx-2 text-danger">{error}</div>}
          <InputGroup className="m-2">
            <Field
              name="text"
              type="text"
              component="input"
              className="form-control"
              placeholder="Enter new message"
            />
            <InputGroup.Append>
              <Form.Control
                className="btn btn-outline-secondary"
                disabled={pristine || submitting}
                type="submit"
                value="Add message"
              />
            </InputGroup.Append>
          </InputGroup>
        </Form.Row>
      </Form>
    );
  }
}

export default newMessageForm;
