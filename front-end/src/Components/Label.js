import React from 'react';

const Label = ({title, name}) => (
    <label htmlFor={name}>{title}</label>
);

export default Label;