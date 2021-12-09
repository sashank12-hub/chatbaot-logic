import React from "react";
export default function Question(
  item,
  callback,
  fetched,
  checkboxhandler,
  textchangehandler,
  imageHandler
) {
  const radiobuttonhandler = (e) => {
    console.log(e.target.value);

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
    let file = event.target.files[0];
    let answer;
    if (file) {
      const fileReader = new FileReader();
      //Implement onLoad function
      fileReader.addEventListener("load", () => {
        answer = fileReader.result;
      });

      let answers = [
        {
          answer: answer,
        },
      ];
      callback(item, answers);
    }
  };

  let htmlElement;
  switch (item.type_of_control) {
    case "Button":
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
    case "Multiselect":
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
          <label htmlFor={item.option_id}>{item.question}</label>
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
    case "Text":
      htmlElement = (
        <div>
          <label htmlFor={item.id}>{item.message}</label>
        </div>
      );
      break;
    case "Textarea":
      htmlElement = (
        <div>
          <label htmlFor={item.id}>{item.message}</label>
        </div>
      );
      break;

    case "Dropdown":
      htmlElement = (
        <div>
          <label htmlFor="dropdown">{item.question}</label>

          <select
            name="dropdown"
            id="dropdown"
            onChange={(e) => selecthandler(e)}
          >
            <option>select option from list</option>
            {item.options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.value}
              </option>
            ))}
          </select>
        </div>
      );
      break;
    case "File":
      htmlElement = (
        <div>
          <label htmlFor="myfile">{item.message}</label>

          <input
            type="file"
            id="myfile"
            name="myfile"
            accept="image/*"
            onChange={(e) => {
              // console.log(e.target.files[0]);
              imageHandler(item, e);
            }}
          />
        </div>
      );
      break;

    case "Datepicker":
      htmlElement = (
        <div>
          <label htmlFor="datepicker">{item.message}</label>

          <input
            type="date"
            id="datepicker"
            name="datepicker"
            onChange={(e) => textchangehandler(e)}
          />
        </div>
      );
      break;
    case "Timepicker":
      htmlElement = (
        <div>
          <label htmlFor="timepicker">{item.message}</label>

          <input
            type="time"
            id="timepicker"
            name="timepicker"
            onChange={(e) => textchangehandler(e)}
          />
        </div>
      );
      break;
    default:
      return htmlElement;
  }
  return htmlElement;
}
