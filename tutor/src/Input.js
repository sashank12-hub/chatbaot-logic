import React, { useState } from "react";

function Input(props) {
  const [state, setstate] = useState("");
  const { type = "checkbox", value } = props;
  return (
    <div>
      <input type="checkbox" value={value} type={type} />
    </div>
  );
}

export default Input;
