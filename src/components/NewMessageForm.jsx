import React from 'react';
import { Field, SubmissionError } from 'redux-form';
import UserNameContext from '../context';
import { connect, addForm } from '../decorators';

const mapStateToProps = ({ channels }) => {
  const { currentChannelId } = channels;
  const props = {
    currentChannelId,
  };
  return props;
};

@addForm('newMessage')
@connect(mapStateToProps)
class newMessageForm extends React.Component {
  static contextType = UserNameContext;

  handleSubmit = async values => {
    const { sendMessage, reset, currentChannelId } = this.props;
    const message = { ...values, userName: this.context, channelId: currentChannelId };
    try {
      await sendMessage({ message });
    } catch (err) {
      throw new SubmissionError({ _error: err.message });
    }
    reset();
  };

  render() {
    const { handleSubmit, submitting, pristine, error } = this.props;

    return (
      <form className="w-100" onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="form-row m-0">
          {error && <div className="mx-2 text-danger">{error}</div>}
          <div className="input-group m-2">
            <Field
              name="text"
              type="text"
              component="input"
              className="form-control"
              placeholder="Enter new message"
            />
            <div className="input-group-append">
              <input
                className="btn btn-outline-secondary"
                disabled={pristine || submitting}
                type="submit"
                value="Add message"
              />
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default newMessageForm;
