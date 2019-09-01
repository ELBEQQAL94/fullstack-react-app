import React from 'react';

const ErrorMessage = ({error}) => (
    <div 
        className="alert alert-primary text-danger"
        style={{display: error.show ? "": "none"}}
        >
        {error.Error}
      </div>
);

export default ErrorMessage;