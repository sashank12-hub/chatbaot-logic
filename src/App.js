import React, { useState, useEffect, useReducer } from "react";

import Questionhandler from "./function";
import data from "./data.json";

function App() {
  const questions = data;
  const initialformstate = {
    uniqueid: 123,
    userresponse: [],
  };
  const [text, settext] = useState("");
  const [isText, setisText] = useState(false);
  const [currentquestion, setcurrentquestion] = useState({});
  const [counter, setcounter] = useState(0);
  const [form, setform] = useState(initialformstate);
  useEffect(() => {
    setcurrentquestion(questions[0]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setcurrentquestion(questions[counter]);
    console.log(counter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);

  const handleSubmit = async (obj1, value) => {
    console.log(obj1, value);
    let uservalues = [...form.userresponse, { item: obj1, response: value }];

    setform({ ...form, userresponse: uservalues });

    if (counter >= questions.length - 1) {
      window.localStorage.setItem(
        "chatbotdata",
        JSON.stringify({ ...form, userresponse: uservalues })
      );
      alert("thanks");
    } else {
      setcounter((counter) => counter + 1);
    }
  };
  const handlebutton = () => {
    handleSubmit(currentquestion, text);
    settext("");
  };
  const textchangehandler = (e) => {
    //  console.log(e.target.value);
    settext(e.target.value);
  };
  return (
    <div className="App">
      {Questionhandler(currentquestion, handleSubmit)}

      <input
        id={currentquestion.id}
        value={text}
        type="text"
        onChange={(e) => {
          textchangehandler(e);
        }}
        style={{ marginTop: "20px", marginLeft: "130px" }}
        disabled={currentquestion.type !== "text"}
      />
      <button
        onClick={() => handlebutton()}
        disabled={currentquestion.type !== "text"}
      >
        send
      </button>
    </div>
  );
}

export default App;
