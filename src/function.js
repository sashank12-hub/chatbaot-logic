import React from "react";
export default function Question(item, callback, fetched, checkboxhandler) {
  const reader = new FileReader();
  const radiobuttonhandler = (e) => {
    let answers = [
      {
        answer: e.target.value,
      },
    ];
    callback(item, answers);
  };

  const selecthandler = (e) => {
    let answers = [
      {
        answer: e.target.value,
      },
    ];
    callback(item, answers);
  };
  const filechangehandler = (item, event) => {
    let answers = [
      {
        answer: event.target.files[0].name,
      },
    ];
    callback(item, answers);
  };
  let htmlElement;
  switch (item.type_of_control) {
    case "select":
      htmlElement = (
        <div key={item.id}>
          <label htmlFor={item.id}>{item.message}</label>
          {item.options.map((item) => {
            return (
              <div key={item.label}>
                <label htmlFor={item.label}>{item.label}</label>
                <input
                  type="radio"
                  name="radiobutton"
                  value={item.value}
                  id={item.label}
                  onChange={(e) => radiobuttonhandler(e)}
                />
              </div>
            );
          })}
        </div>
      );
      break;
    case "Checkbox":
      let array = item.options.map(({ label, option_id, trigger, value }) => {
        return {
          label: label,
          value: value,
          ischecked: false,
          option_id: option_id,
          trigger: trigger,
        };
      });
      console.log("array", array);
      htmlElement = (
        <div>
          <label style={{ margin: "10px" }} htmlFor={item.option_id}>
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
        </div>
      );
      break;
    case "text":
      htmlElement = (
        <div>
          <label htmlFor={item.id}>{item.message}</label>
        </div>
      );
      break;
    case "textarea":
      htmlElement = (
        <div>
          <label htmlFor={item.id}>{item.message}</label>
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
          <label htmlFor="myfile">{item.message}</label>

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
