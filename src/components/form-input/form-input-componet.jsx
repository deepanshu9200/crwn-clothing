import React from "react";
import "./form-input-styles.scss";

const FormInput = ({ handlechange, label, ...otherProps }) => (
  <div className="group">
    <input className="form-input" onChange={handlechange}  />
  
  {
      label ? (
          <label
          className={`${
              otherProps.value.length ?'shrink':''
              } form-imput-label`}        
          >
          {label}
          </label>

      ): null }
  </div>

);

export default FormInput;