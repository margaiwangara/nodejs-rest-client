import React from 'react';

function ErrorDisplay({ error }) {
  return error ? (
    <div className="alert alert-danger">
      {Array.isArray(error.message) ? (
        <ul className="list-unstyled p-0 m-0">
          {error.message.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      ) : (
        error.message
      )}
    </div>
  ) : (
    ''
  );
}

export default ErrorDisplay;
