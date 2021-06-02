let timerID;

export function setNotification(message, seconds) {
  return dispatch => {
    if (timerID)
      clearTimeout(timerID);
    timerID = setTimeout(() => dispatch(removeNotification()), seconds * 1000);
    dispatch({ type: 'NOTIFICATION', msg: message });
  };
}

export function removeNotification() {
  if (timerID)
    clearTimeout(timerID);
  timerID = undefined;
  return { type: 'REM_NOTIFICATION' };
}

const initialMessage = '';

function notificationReducer(state = initialMessage, action) {
  switch (action.type) {
    case 'NOTIFICATION':
      return action.msg;
    case 'REM_NOTIFICATION':
      return '';
    default:
      return state;
  }
}

export default notificationReducer;