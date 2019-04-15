import { reduxForm } from 'redux-form';
import { connect as reduxConnect } from 'react-redux';
import * as actionCreators from './actions';

export const withConnect = mapStateToProps => reduxConnect(mapStateToProps, actionCreators);

export const withForm = formName =>
  reduxForm({
    form: formName,
  });
