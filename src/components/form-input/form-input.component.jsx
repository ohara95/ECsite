import React from "react";

import "./form-input.styles.scss";

// その他属性をotherでまとめる
const FormInput = ({ handleChange, label, ...other }) => (
  <div className="group">
    {/* valueだけじゃだめ？ → いいのでは*/}
    <input className="form-input" onChange={handleChange} {...other} />
    {label ? (
      <label className={`${other.value ? "shrink" : ""} form-input-label`}>
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
