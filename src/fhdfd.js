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
import localdata from "./data.json";

function App() {
  var selected = [];
  const initialformstate = {
    userresponse: [],
  };

  const [questions, setquestions] = useState([]);
  const [text, settext] = useState("");
  const [storedquestions, setstoredquestions] = useState({});
  const [islastitem, setislastitem] = useState(false);
  const [currentquestion, setcurrentquestion] = useState({});
  const [counter, setcounter] = useState(0);
  const [form, setform] = useState(initialformstate);
  const [fetched, setfetched] = useState(false);
  const [error, setError] = useState;

  useEffect(() => {
    axios
      .get("https://tbsdemos.com/bot_uat/api/Login/question")
      .then((res) => {
        console.log(res.data);
        let req = res.data.data;

        setquestions(req);
        setfetched(true);
        if (
          !window.localStorage.getItem("campaign_id") ||
          !window.localStorage.getItem("user_id")
        ) {
          window.localStorage.setItem("campaign_id", res.data.campaign_id);
          window.localStorage.setItem("user_id", res.data.user_id);
        }
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (window.localStorage.getItem("lastleftquestion") !== "full") {
      setcurrentquestion(questions[counter]);
    }

    console.log(counter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);

  const handleSubmit = async (obj1, answers) => {
    let x = document.getElementById("chatMiddlee");
    console.log(x.scrollHeight - x.clientHeight);
    console.log(obj1, answers);
    const response = {
      question: obj1.question,
      answers: answers,
    };
    let uservalues = [...form.userresponse, { item: obj1, response: response }];

    setform({ ...form, userresponse: uservalues });
    console.log({ ...form, userresponse: uservalues });
    window.localStorage.setItem(
      "chatbotdata",
      JSON.stringify({ ...form, userresponse: uservalues })
    );

    setstoredquestions({ ...form, userresponse: uservalues }.userresponse);
    if (counter >= questions.length - 1) {
      window.localStorage.setItem("lastleftquestion", "full");
      axios
        .post("https://tbsdemos.com/bot_uat/api/Login/test", {
          user_id: window.localStorage.getItem("user_id"),
          campaign_id: window.localStorage.getItem("campaign_id"),
          flag: "submit",

          json: JSON.parse(window.localStorage.getItem("chatbotdata"))
            .userresponse,
        })
        .then((res) => {
          console.log(res);
          setislastitem(true);
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
     // TODO: this code for validation start
    switch (currentquestion.type_of_control) {
      case "Text":
          if(text.trim() === ""){
            setError("Value Required")
          }else{
            handleSubmit(currentquestion, [{ answer: text }]);
            settext("");
          }
        break;
      case "Textarea":
          if(text.trim() === ""){
            alert("Value Required")
          }else{
            handleSubmit(currentquestion, [{ answer: text }]);
            settext("");
          }  
      default:
        return;
        break;
    }
    // TODO: this code for validation end
    if (currentquestion.type_of_control === "Multiselect") {
      let answers = selected.filter((item) => item.ischecked === true);

      handleSubmit(currentquestion, [
        { answer: answers.map((item) => item.value).join(",") },
      ]);
    } else {
      if (
//         currentquestion.type_of_control === "Text" ||
        currentquestion.type_of_control === "Textarea" ||
        currentquestion.type_of_control === "Datepicker" ||
        currentquestion.type_of_control === "Timepicker"
      ) {
        if (text.trim() === "") {
          alert("value required");
        } else {
          handleSubmit(currentquestion, [{ answer: text }]);
          settext("");
        }
      }

      // handleSubmit(currentquestion, [{ answer: text }]);
    }
  };
  const textchangehandler = (e) => {
    settext(e.target.value);
  };

  const checkboxhandler = (e, array) => {
    array.forEach((fruite) => {
      if (fruite.value === e.target.value) fruite.ischecked = e.target.checked;
    });
    selected = [...array];
    console.log("selected", selected);
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
                    <p> {question.item.message}</p>
                  </div>
                  {question.item.type_of_control === "Checkbox" && (
                    <div className="response-3">
                      <ul className="ul-response-1">
                        {question.response.answers[0].answer
                          .split(",")
                          .map((item, index) => (
                            <li key={index} className="li-response-1">
                              <img src={fav} alt={"listicon"} /> {item}
                            </li>
                          ))}
                      </ul>
                      <img src={avatarorange} alt={"avatar"} />
                    </div>
                  )}
                  {question.item.type_of_control !== "Checkbox" && (
                    <div className="response-3">
                      <ul className="ul-response-1">
                        {question.item.type_of_control === "File" && (
                          <img
                            alt="hello"
                            src={question.response.answers.answer}
                          />
                        )}
                        {question.item.type_of_control !== "File" &&
                          question.response.answers.map((item, index) => (
                            <li key={index} className="li-response-1">
                              <img src={fav} alt={"listicon"} /> {item.answer}
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
          {window.localStorage.getItem("lastleftquestion") !== "full" &&
          currentquestion ? (
            <div className="response-2">
              {Questionhandler(
                currentquestion,
                handleSubmit,
                fetched,
                checkboxhandler,
                textchangehandler
              )}
            </div>
          ) : (
            <></>
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
                    currentquestion.type_of_control === "Textarea"
                      ? "none"
                      : "block",
                }}
                disabled={currentquestion.type_of_control !== "Text"}
              />
                  {
                    !error ? 
                    <div className="error" style={{display:"none"}}> {error} </div>:
                    <div className="error" style={{display:"block"}}> {error} </div>
                  }
              {currentquestion.type_of_control === "Textarea" && (
                <textarea
                  rows="4"
                  cols="50"
                  placeholder={currentquestion.message}
                  name={"Textarea"}
                  onChange={(e) => {
                    textchangehandler(e);
                  }}
                ></textarea>
              )}
              <button
                className="sendBtn"
                onClick={() => handlebutton()}
                disabled={
                  // currentquestion.type_of_control !== "Text" ||
                  // currentquestion.type_of_control !== "Textarea" ||
                  currentquestion.type_of_control === "Button" ||
                  currentquestion.type_of_control === "Dropdown" ||
                  // currentquestion.type_of_control === "Datepicker" ||
                  // currentquestion.type_of_control === "Timepicker" ||
                  currentquestion.type_of_control === "File"
                }
              >
                <img src={send} />
              </button>
            </>
          ) : (
            <></>
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
