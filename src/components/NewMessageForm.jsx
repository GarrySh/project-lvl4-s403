import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
// import * as actions from '../actions';

const mapStateToProps = state => {
  const props = {
    text: state.text,
  };
  return props;
};

const actionCreators = {};

const handleSubmitMessage = () => {
  console.log('submit message');
};

const newMessageForm = props => {
  const { text, handleSubmit } = props;

  return (
    <form className="form-inline" onSubmit={handleSubmit(handleSubmitMessage)}>
      <div className="input-group mb-3">
        <Field
          name="text"
          type="text"
          component="input"
          className="form-control"
          placeholder="Enter new message"
          value={text}
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="submit">
            Add message
          </button>
        </div>
      </div>
    </form>
  );
};

const ConnectedNewMessageForm = connect(
  mapStateToProps,
  actionCreators
)(newMessageForm);
export default reduxForm({
  form: 'newMessage',
})(ConnectedNewMessageForm);
