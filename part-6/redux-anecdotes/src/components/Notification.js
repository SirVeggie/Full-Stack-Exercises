import React from 'react';
import { connect } from 'react-redux';

//====| Presentation |====//

function Notification({ notification }) {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  };

  if (!notification)
    return '';

  return (
    <>
      <div style={style}>
        {notification}
      </div>
      <br />
    </>
  );
};

//====| Logic |====//

const ConnectedNotification = connect(state => ({ notification: state.notification }))(Notification);

export default ConnectedNotification;