import React from "react";
import { countercontext } from "./App";
import * as types from "./types";
function First(props) {
  const { state, dispatch } = React.useContext(countercontext);

  return (
    <>
      <button onClick={() => dispatch({ type: types.ADDITION, payload: 6 })}>
        add
      </button>

      <button onClick={() => dispatch({ type: types.SUBT, payload: 10 })}>
        sub
      </button>
      <h2>{state}</h2>
    </>
  );
}

export default First;
