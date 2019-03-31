import React from 'react';
import _ from 'lodash';
import { Field, reduxForm, SubmissionError } from 'redux-form';

import connect from '../connect';
// import * as actions from '../actions';

const mapStateToProps = state => {
  const props = {
    text: state.text,
  };
  return props;
};

@connect(mapStateToProps)
class newMessageForm extends React.Component {
  handleSubmit = async values => {
    const { addMessage, reset } = this.props;
    const message = { ...values, id: _.uniqueId(), channelId: 2 };
    console.log('submit message', { props: this.props, values, message });
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
      <form className="form-inline" onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="input-group mb-3">
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
      </form>
    );
  }
}

export default reduxForm({
  form: 'newMessage',
})(newMessageForm);
