import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./Components/Alert";
import Signup from "./Components/Signup";
import Login from "./Components/Login";

function App() {
  const [alert, setAlert] = useState({msg:"",type:""});
  const showAlert = (message,type) => {
    setAlert({ msg:message, type:type });
    setTimeout(()=>{
      setAlert({msg:"",type:""})
    },1500)
  };
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert = {alert}/>
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/" element={<Home showAlert={showAlert} />} />
            <Route path="/signup" element={<Signup showAlert={showAlert} />} />
            <Route path="/login" element={<Login showAlert={showAlert}  />} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
