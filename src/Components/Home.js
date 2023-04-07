import React from "react";
import Notes from "./Notes";
import Addnote from "./Addnote";

const Home = (props) => {
  return (
    <>
    <Notes showAlert={props.showAlert} />
    </>
  );
};

export default Home;
