import React, { useState } from "react";

const CheckBox = (props) => {
  const [checked, setChecked] = useState(props.defaultChecked);

  const checkBoxHandler = (id) => {
    props.checkBoxHandler(checked, id);
    setChecked(checked => !checked);
  }

  return (
    <label className="form-group form-check m-0 pointer">
      <div className="d-flex justify-content-between clearfix">
        {props.values.map((value, index) => (<React.Fragment key={index}><h6 class="pt-2 text-dark" style={{ fontSize: "0.875rem" }}>{value}</h6></React.Fragment>))}
      </div>
      <input
        type="checkbox"
        checked={checked}
        key={props.id}
        onChange={() => checkBoxHandler(props.id)}
        id={props.id}
      />
      <span className="checkmark" ></span>
    </label>

  );
}

export default CheckBox;