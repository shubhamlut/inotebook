import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import Alert from "./Components/Alert";

const Signup = (props) => {
  const [createUserCred, setCreateUserCred] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const navigate = useNavigate();

  const onSubmitHandle = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: createUserCred.name,
        email: createUserCred.email,
        password: createUserCred.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
        localStorage.setItem("token",json.jwtToken)
        navigate('/')
    }
    else{
        console.log("Test failure")
    props.showAlert("Invalid Credentials","danger")
    }
  };

  const onChange = (e) => {
    setCreateUserCred({ ...createUserCred, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <form onSubmit = {onSubmitHandle}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            name="name"
            value={createUserCred.name}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={createUserCred.email}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={createUserCred.password}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            value={createUserCred.cpassword}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Signup;
