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

      // type file
      case "file" : 
        template = (
          <input 
            type="file"
            id={id}
            onChange={e => change(e)}
            name={name}
            accept="image/*"
            className="form-control"
          />
        );
        break;

        case "textarea": 
          template = (
            <textarea
            placeholder={placeholder}
            id={id}
            onChange={e => change(e)}
            name={name}
            className="form-control"
            value={value}
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
