// import React from "react";
// //useEffcet,usestate,usereducer,context,redux,usecall,memo

import React, { useState, useEffect, useReducer } from "react";
import First from "./First";
import * as types from "./types";
export const countercontext = React.createContext();
function App() {
  const reducer = (state, { type, payload }) => {
    switch (type) {
      case types.ADDITION:
        return state + payload;
      case types.SUBT:
        return state - payload;
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, 0);

  useEffect(() => {
    alert(`state is changed`);
  }, [state]);

  return (
    <div>
      <h2>{state}</h2>
      <countercontext.Provider value={{ state: state, dispatch: dispatch }}>
        <First />
      </countercontext.Provider>
    </div>
  );
}

export default App;
