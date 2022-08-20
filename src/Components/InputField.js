import React from "react";

const InputField = (props) => {
  const { type, name, onChange, onBlur, value, errors, title, disabled } =
    props;
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label" htmlFor={name}>
        <span className="label-text text-2xl">{title}</span>
      </label>
      <input
        className={`input input-bordered w-full max-w-xs ${
          errors && "input-error"
        }`}
        type={type}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        disabled={disabled}
      />
    </div>
  );
};

export default InputField;
