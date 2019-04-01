import React from 'react';
import _ from 'lodash';
import { Field, reduxForm, SubmissionError } from 'redux-form';

import connect from '../connect';
// import * as actions from '../actions';

const mapStateToProps = ({ channels }) => {
  const { currentChannelId } = channels;
  const props = {
    currentChannelId,
  };
  return props;
};

@connect(mapStateToProps)
class newMessageForm extends React.Component {
  handleSubmit = async values => {
    const { addMessage, reset, currentChannelId } = this.props;
    const message = { ...values, id: _.uniqueId(), channelId: currentChannelId };
    // console.log('submit message', { props: this.props, values, message });
    try {
      await addMessage({ message });
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
              {error && <div className="ml-3">{error}</div>}
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'newMessage',
})(newMessageForm);
