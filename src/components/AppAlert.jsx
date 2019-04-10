import React from 'react';
import { Alert } from 'react-bootstrap';
import { withConnect } from '../decorators';

const mapStateToProps = state => {
  const { connectionStatus } = state;
  return { connectionStatus };
};

const alerts = {
  none: {
    msg: '',
    isShown: false,
  },
  connected: {
    msg: '',
    isShown: false,
  },
  disconnected: {
    msg: 'Your computer seems to be offline. We`ll keep trying to reconnect, or you can try now.',
    isShown: true,
  },
};

@withConnect(mapStateToProps)
class AppAlert extends React.Component {
  render() {
    const { connectionStatus } = this.props;

    return (
      <div className="container">
        <Alert
          variant="danger"
          show={alerts[connectionStatus].isShown}
          className="fade position-absolute m-3"
        >
          {alerts[connectionStatus].msg}
        </Alert>
      </div>
    );
  }
}

export default AppAlert;
