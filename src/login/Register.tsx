interface IUserModel {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

import { useState } from "react";
import "./LoginCss.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import apiClient from "../api/apiClient";


function Register() {
   let navigate=useNavigate();


  const [data, setData] = useState<IUserModel>({
    firstname: "",
    lastname: "",
    email:"",
    password: "",
  });
  const [message, setMessage] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id= event.target.id;
    const value= event.target.value;

    setData({...data,[id]: value});
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    if(data.firstname ==="" || data.password ==="" || data.lastname ===""|| data.email ===""){
      setMessage("Please fill the fields");
      return;
    }
    else{
      await apiClient.post("/auth/register", data)
      navigate("/activate");
      console.log("Data being sent:", data);

    }

  }


  return (
    <div className="loginBody">
      <form onSubmit={handleFormSubmit}>
        <h3>Register</h3>
        <label>First Name</label>
        <input
          type="text"
          placeholder="First name"
          id="firstname"
          value={data.firstname}
          onChange={handleInputChange}
        />
           <label>Last Name</label>
        <input
          type="text"
          placeholder="Last name"
          id="lastname"
          value={data.lastname}
          onChange={handleInputChange}
        />

        <label>Email</label>
        <input
          type="text"
          placeholder="Email"
          id="email"
          value={data.email}
          onChange={handleInputChange}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={data.password}
          onChange={handleInputChange}
        />

        <button >Register</button>
        <div className="social">
          {message && <p> {message}</p>}
          <h4>Already have an account? login <Link to ="/login">here</Link> </h4>
          
        </div>
      </form>
      </div>
  );
}

export default Register;
