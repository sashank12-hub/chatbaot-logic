import React, { useState, useEffect } from "react";
import "./App.scss";

import axios from "axios";
import Questionhandler from "./function";
import avatar from "./images/avatar.png";
import avatarorange from "./images/avatar-orange.png";
import avatarwhite from "./images/avatar-white.png";
import chat from "./images/chat.png";
import chatbotorange from "./images/chatbot-orange.png";
import chatbotwhite from "./images/chatbot-white.png";
import chatbot from "./images/chatbot.png";
import chaticon from "./images/chaticon.png";
import close from "./images/close.png";
import email from "./images/email.png";
import fav from "./images/favicon.png";
import paper_plane from "./images/paper-plane.png";
import send from "./images/send.png";
import tick from "./images/tick.png";
import voice from "./images/voice.png";

function App() {
  const initialformstate = {
    userresponse: [],
  };

  const [questions, setquestions] = useState([]);
  const [text, settext] = useState("");
  const [storedquestions, setstoredquestions] = useState({});

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (window.localStorage.getItem("lastleftquestion") !== "full") {
      setcurrentquestion(questions[counter]);
    }

    console.log(counter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);

  const handleSubmit = async (obj1, value) => {
    let x = document.getElementById("chatMiddlee");
    console.log(x.scrollHeight - x.clientHeight);
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

      alert("thanks");
    } else {
      x.scrollTop = x.scrollHeight - x.clientHeight;

      window.localStorage.setItem("lastleftquestion", counter + 1);
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
    <>
      <img className="chatIcon" src={chaticon} alt={"chatIcon"} />
      <div className="chatBox">
        <div className="chatHeader">
          <h1>ICICI Foundation</h1>
          <button className="emailIcon">
            <img src={email} alt={"email"} />
          </button>
          <button className="closeIcon">
            <img src={chatbot} alt={"chatBot"} />
          </button>
        </div>
        <div className="chatMiddle" id="chatMiddlee">
          {Object.keys(storedquestions).length > 0 && (
            <div className="results">
              {storedquestions.map((question, index) => (
                <div key={index} className="response-1">
                  <div className="response-2">
                    <img src={chatbot} alt={"chatBot"} />
                    <p> {question.item.Message}</p>
                  </div>
                  {question.item.type_of_control !== "multi" && (
                    <div className="response-3">
                      <p>{question.response}</p>
                      <img src={avatarorange} alt={"avatar"} />
                    </div>
                  )}
                  {question.item.type_of_control === "multi" && (
                    <div className="response-3">
                      <ul className="ul-response-1">
                        {question.response.map((item, index) => (
                          <li key={index} className="li-response-1">
                            <img src={fav} alt={"listicon"} /> {item}
                          </li>
                        ))}
                      </ul>
                      <img src={avatarorange} alt={"avatar"} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {window.localStorage.getItem("lastleftquestion") === "full" ? (
            <p className="submitMsg">You have answered all questions.</p>
          ) : (
            <></>
          )}
          {fetched === true && currentquestion ? (
            <div className="response-2">
              {Questionhandler(currentquestion, handleSubmit)}
            </div>
          ) : (
            <h1> ...Loading</h1>
          )}
        </div>
        <div className="inputFooter">
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
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    console.log(event);
                    handlebutton();
                  }
                }}
                style={{
                  display:
                    currentquestion.type_of_control === "textarea"
                      ? "none"
                      : "block",
                }}
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
                className="sendBtn"
                onClick={() => handlebutton()}
                // disabled={currentquestion.type !== "text"}
              >
                <img src={send} />
              </button>
            </>
          ) : (
            <h1> ...Loading</h1>
          )}

          <button className="mikeBtn">
            <img src={voice} alt="mic button" />
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
