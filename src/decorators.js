import { reduxForm } from 'redux-form';
import { connect as reduxConnect } from 'react-redux';
import * as actionCreators from './actions';

export const connect = mapStateToProps => Component =>
  reduxConnect(mapStateToProps, actionCreators)(Component);

export const addForm = formName => Component =>
  reduxForm({
    form: formName,
  })(Component);