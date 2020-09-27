import React from "react";
import Switch from "react-switch";

function ToggleInput({ id, disabled, checked, onChange }) {
  return (
    <Switch
      id={id}
      disabled={disabled}
      checked={checked}
      onChange={onChange}
      width={48}
      height={20}
      onColor="#95c5d8"
      onHandleColor="#118ab2"
      handleDiameter={28}
      uncheckedIcon={false}
      checkedIcon={false}
      boxShadow="0px 0px 0px 1px rgba(0, 0, 0, 0.5)"
      activeBoxShadow="0px 0px 0px 8px rgba(0, 0, 0, 0.2)"
    />
  );
}

export default ToggleInput;
