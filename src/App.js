import React, { useState, useEffect } from "react";
import "./App.scss";
import Questionhandler from "./function";
import data from "./data.json";
import A from "./fhdfd";

function App() {
  const initialformstate = {
    userresponse: [],
  };
  return <A />;
}
//   const [questions, setquestions] = useState(data);
//   const [text, settext] = useState("");
//   const [storedquestions, setstoredquestions] = useState({});
//   const [isText, setisText] = useState(false);
//   const [currentquestion, setcurrentquestion] = useState({});
//   const [counter, setcounter] = useState(0);
//   const [form, setform] = useState(initialformstate);
//   console.log(new Date().getUTCMilliseconds());
//   useEffect(() => {
//     if (window.localStorage.getItem("lastleftquestion")) {
//       setcounter(parseInt(window.localStorage.getItem("lastleftquestion")));
//     } else {
//       setcurrentquestion(questions[0]);
//     }
//     if (window.localStorage.getItem("chatbotdata")) {
//       console.log(JSON.parse(window.localStorage.getItem("chatbotdata")));
//       setform(JSON.parse(window.localStorage.getItem("chatbotdata")));
//       setstoredquestions(
//         JSON.parse(window.localStorage.getItem("chatbotdata")).userresponse
//       );
//     }

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
//   useEffect(() => {
//     // let q=fetchquestions();
//     // if(q){
//     //   setquestions(q)
//     // }
//     if (window.localStorage.getItem("lastleftquestion") !== "full") {
//       setcurrentquestion(questions[counter]);
//     }

//     console.log(counter);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [counter]);

//   const handleSubmit = async (obj1, value) => {
//     console.log(obj1, value);
//     let uservalues = [...form.userresponse, { item: obj1, response: value }];

//     setform({ ...form, userresponse: uservalues });
//     console.log(JSON.stringify({ ...form, userresponse: uservalues }));
//     window.localStorage.setItem(
//       "chatbotdata",
//       JSON.stringify({ ...form, userresponse: uservalues })
//     );

//     setstoredquestions({ ...form, userresponse: uservalues }.userresponse);
//     if (counter >= questions.length - 1) {
//       window.localStorage.setItem("lastleftquestion", "full");
//       const body = {
//         id: new Date().getTime(),
//         json: { ...form, userresponse: uservalues },
//       };
//       console.log(body);
//       const res = await fetch("https://tbsdemos.com/bot_uat/api/Login/test", {
//         method: "POST",
//         body: body,
//       });
//       const data = await res.json();
//       console.log(data);
//       alert("thanks");
//     } else {
//       window.localStorage.setItem("lastleftquestion", counter + 1);
//       setcounter((counter) => counter + 1);
//     }
//   };
//   const handlebutton = () => {
//     handleSubmit(currentquestion, text);
//     settext("");
//   };
//   const textchangehandler = (e) => {
//     settext(e.target.value);
//   };

//   const fetchquestions = async () => {
//     const res = await fetch("https://tbsdemos.com/bot_uat/api/Login/question");
//     const data = res.json();
//     return data;
//   };
//   return (
//     <div className="app">
//       <div className="container">
//         <header>your response</header>
//         <div>
//           {Object.keys(storedquestions).length > 0 && (
//             <>
//               {storedquestions.map((question, index) => (
//                 <div key={index}>
//                   <div className="incoming">
//                     <div className="bubble"> {question.item.question}</div>
//                   </div>
//                   {question.item.type !== "multi" && <p>{question.response}</p>}
//                   {question.item.type === "multi" && (
//                     <ul>
//                       {question.response.map((item, index) => (
//                         <li key={index}>{item}</li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//               ))}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

export default App;
