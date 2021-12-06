import React from "react";

function Home(props) {
  return (
    <div>
      {props.render("sashank")}
      <div>
        <p>hekk</p>
      </div>
    </div>
  );
}

export default Home;
