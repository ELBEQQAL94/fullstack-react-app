import React from 'react';

const SuccessMessage = ({success}) => (
    <div 
          className="alert alert-info text-success"
          style={{display: success ? "": "none"}}
        >
         {success}
      </div>
);

export default SuccessMessage;