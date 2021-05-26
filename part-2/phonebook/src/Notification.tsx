import React from 'react';

const error: React.CSSProperties = {
  'color': 'red',
  'background': 'lightgrey',
  'fontSize': '20px',
  'borderStyle': 'solid',
  'borderRadius': '5px',
  'padding': '10px',
  'marginBottom': '10px'
};

const success: React.CSSProperties = {
  'color': 'green',
  'background': 'lightgrey',
  'fontSize': '20px',
  'borderStyle': 'solid',
  'borderRadius': '5px',
  'padding': '10px',
  'marginBottom': '10px'
};

function Display(alert: Alert) {
  return alert.type === 'success' ? Success(alert.msg) : Error(alert.msg);
}

function Success(message: string) {
  return <p style={success}>{message}</p>;
}

function Error(message: string) {
  return <p style={error}>{message}</p>;
}

const ex = { Display, Success, Error };
export default ex;