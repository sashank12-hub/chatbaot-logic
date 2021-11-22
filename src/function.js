import React from "react";
export default function Question(item, callback) {
  var selected = [];
  const reader = new FileReader();
  const radiobuttonhandler = (e) => {
    callback(item, e.target.value);
  };
  const checkboxhandler = (e, array) => {
    array.forEach((fruite) => {
      if (fruite.value === e.target.value) fruite.ischecked = e.target.checked;
    });
    selected = [...array];
  };
  const selecthandler = (e) => {
    callback(item, e.target.value);
    console.log(e.target.value);
  };
  const filechangehandler = (item, event) => {
    console.log("here", event.target.files[0]);

    callback(item, event.target.files[0].name);
  };
  let htmlElement;
  switch (item.type) {
    case "select":
      htmlElement = (
        <div key={item.id}>
          <label htmlFor={item.id}>{item.question}</label>
          {item.options.map((option, index) => {
            return (
              <div key={index}>
                <label htmlFor={option}>{option}</label>
                <input
                  type="radio"
                  name="radiobutton"
                  value={option}
                  id={option}
                  onChange={(e) => radiobuttonhandler(e)}
                />
              </div>
            );
          })}
        </div>
      );
      break;
    case "multi":
      let array = item.options.map((item) => {
        return {
          value: item,
          ischecked: false,
        };
      });

      htmlElement = (
        <div>
          <label style={{ margin: "10px" }} htmlFor={item.id}>
            {item.question}
          </label>
          {array.map((option, index) => {
            return (
              <div key={index}>
                <input
                  type="checkbox"
                  name="checkbox"
                  value={option.value}
                  id={option.value}
                  onChange={(event) => checkboxhandler(event, array)}
                />
                <label htmlFor={option.value}>{option.value}</label>
              </div>
            );
          })}
          <button
            onClick={() => {
              let selectedcheckboxes = selected.filter(
                (item) => item.ischecked === true
              );
              callback(item, [...selectedcheckboxes.map((item) => item.value)]);
            }}
          >
            submit response
          </button>
        </div>
      );
      break;
    case "text":
      htmlElement = (
        <div>
          <label htmlFor={item.id}>{item.question}</label>
        </div>
      );
      break;
    case "dropdown":
      htmlElement = (
        <div>
          <label htmlFor="dropdown">{item.question}</label>

          <select
            name="dropdown"
            id="dropdown"
            onChange={(e) => selecthandler(e)}
          >
            <option>select option from list</option>
            {item.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );
      break;
    case "file":
      htmlElement = (
        <div>
          <label htmlFor="myfile">Select a file:</label>

          <input
            type="file"
            id="myfile"
            name="myfile"
            accept="image/*"
            onChange={(e) => {
              console.log(e.target.files[0]);
              filechangehandler(item, e);
            }}
          />
        </div>
      );
      break;
    default:
      return htmlElement;
  }
  return htmlElement;
}
