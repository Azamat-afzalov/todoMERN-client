import React from "react";
import "./Input.css";

const Input = React.forwardRef(
(
    { type, name, className, placeholder, value, onChange, id, label, error },
    ref
) => {
    console.log(error);
    return (
    <div className="Input-Box">
        {label && <label htmlFor={id}>{label}</label>}
        <input
            id={id}
            type={type || "text"}
            className={`Input ${className ? className : ""}`}
            name={name || ""}
            placeholder={placeholder || ""}
            value={value}
            onChange={onChange}
            ref={ref}
        />
        {error && <span className="Input-err-message">{error}</span>}
    </div>
    );
}
);

export default Input;
