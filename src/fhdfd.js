import React, { useState, useEffect } from "react";

import axios from "axios";
import Questionhandler from "./function";
import data from "./data.json";

function App() {
  const initialformstate = {
    userresponse: [],
  };

  const [questions, setquestions] = useState([]);
  const [text, settext] = useState("");
  const [storedquestions, setstoredquestions] = useState({});
  const [isText, setisText] = useState(false);
  const [currentquestion, setcurrentquestion] = useState({});
  const [counter, setcounter] = useState(0);
  const [form, setform] = useState(initialformstate);
  const [fetched, setfetched] = useState(false);

  useEffect(() => {
    axios
      .get("https://tbsdemos.com/bot_uat/api/Login/question")
      .then((res) => {
        let req = res.data.data.slice(1, res.data.data.length - 1);
        console.log(req);
        setquestions(req);
        setfetched(true);
        if (window.localStorage.getItem("lastleftquestion")) {
          console.log(
            questions[parseInt(window.localStorage.getItem("lastleftquestion"))]
          );
          setcounter(parseInt(window.localStorage.getItem("lastleftquestion")));
          setcurrentquestion(
            questions[parseInt(window.localStorage.getItem("lastleftquestion"))]
          );
        } else {
          console.log(req[0]);
          setcurrentquestion(req[0]);
          console.log(currentquestion);
        }
        if (window.localStorage.getItem("chatbotdata")) {
          console.log(JSON.parse(window.localStorage.getItem("chatbotdata")));
          setform(JSON.parse(window.localStorage.getItem("chatbotdata")));
          setstoredquestions(
            JSON.parse(window.localStorage.getItem("chatbotdata")).userresponse
          );
        }
      })
      .catch((err) => console.log(err));
    console.log("1st");
  }, []);

  useEffect(() => {
    if (window.localStorage.getItem("lastleftquestion") !== "full") {
      setcurrentquestion(questions[counter]);
    }

    console.log(counter);
  }, [counter]);

  const handleSubmit = async (obj1, value) => {
    console.log(obj1, value);
    let uservalues = [...form.userresponse, { item: obj1, response: value }];

    setform({ ...form, userresponse: uservalues });
    console.log({ ...form, userresponse: uservalues });
    window.localStorage.setItem(
      "chatbotdata",
      JSON.stringify({ ...form, userresponse: uservalues })
    );

    setstoredquestions({ ...form, userresponse: uservalues }.userresponse);
    if (counter >= questions.length - 1) {
      window.localStorage.setItem("lastleftquestion", "full");
      const array = window.localStorage.getItem("chatbotdata");
      console.log(JSON.stringify(array));
      axios
        .post("https://tbsdemos.com/bot_uat/api/Login/test", {
          json: JSON.stringify({ array }),
        })
        .then((res) => {
          console.log(res.status);
        })
        .catch(function (error) {
          console.log(error);
        });
      // const res = await fetch("https://tbsdemos.com/bot_uat/api/Login/test", {
      //   method: "POST",
      //   json: JSON.stringify(array),
      // });
      // const data = await res.json();
      // console.log(data);
      alert("thanks");
    } else {
      window.localStorage.setItem("lastleftquestion", counter + 1);
      // setcurrentquestion((counter) => questions[counter + 1]);
      setcounter((counter) => counter + 1);
    }
  };
  const handlebutton = () => {
    handleSubmit(currentquestion, text);
    settext("");
  };
  const textchangehandler = (e) => {
    settext(e.target.value);
  };

  return (
    <div className="App">
      {Object.keys(storedquestions).length > 0 && (
        <div style={{ backgroundColor: "black", color: "white" }}>
          {storedquestions.map((question, index) => (
            <div key={index}>
              <p> {question.item.question}</p>
              {question.item.type !== "multi" && <p>{question.response}</p>}
              {question.item.type === "multi" && (
                <ul>
                  {question.response.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
      {window.localStorage.getItem("lastleftquestion") === "full" ? (
        <p>you have answered all questions</p>
      ) : (
        <></>
      )}
      {fetched === true && currentquestion ? (
        Questionhandler(currentquestion, handleSubmit)
      ) : (
        <></>
      )}

      {fetched === true && currentquestion ? (
        <>
          <input
            id={currentquestion.id}
            placeholder={currentquestion.placeholder}
            value={text}
            type="text"
            onChange={(e) => {
              textchangehandler(e);
            }}
            style={{ marginTop: "20px", marginLeft: "130px" }}
            disabled={currentquestion.type_of_control !== "text"}
          />
          {currentquestion.type_of_control === "textarea" && (
            <textarea
              rows="4"
              cols="50"
              placeholder={currentquestion.Message}
              name={"textarea"}
              onChange={(e) => {
                textchangehandler(e);
              }}
            ></textarea>
          )}
          <button
            onClick={() => handlebutton()}
            disabled={
              currentquestion.type_of_control !== "text" ||
              currentquestion.type_of_control === "textarea"
            }
          >
            send
          </button>{" "}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
