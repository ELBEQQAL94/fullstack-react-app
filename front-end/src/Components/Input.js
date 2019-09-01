import React from "react";

 

const Input = ({ type, id, value, placeholder, name, change }) => {
  let template = null;

  switch (type) {
    // text input type
    case "text":
      template = (
        <input
          type={type}
          id={id}
          value={value}
          className="form-control"
          placeholder={placeholder}
          name={name}
          onChange={e => change(e)}
        />
      );
      break;

    // email input type
    case "email":
      template = (
        <input
          type={type}
          id={id}
          value={value}
          className="form-control"
          placeholder={placeholder}
          name={name}
          onChange={e => change(e)}
        />
      );

      break;

    // email input type
    case "password":
      template = (
        <input
          type={type}
          id={id}
          value={value}
          className="form-control"
          placeholder={placeholder}
          name={name}
          onChange={e => change(e)}
        />
      );
      break;

    default:
      template = null;
      break;
  };

  return template;

};

export default Input;
