import React from 'react';

const Button = ({title, disabled}) => (
    <button className="btn btn-raised btn-primary" disabled={disabled}>
        {title}
    </button>
);

export default Button;