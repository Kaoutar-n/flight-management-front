
interface ILoginModel{
  email: string;
  password: string;
}


import apiClient from "../api/apiClient";
import { Link, useNavigate } from "react-router-dom";
// import "./LoginCss.css"
// import '../styles/main.css'
import { useState } from "react";
// import axios from "axios";
import { jwtDecode } from "jwt-decode";
function Login(){
  let navigate=useNavigate();
    
     const [data,setData] = useState<ILoginModel>({email:"", password:""});

     
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id= event.target.id;
    const value= event.target.value;
    

    setData({...data,[id]: value});
  };
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    if( data.password =="" || data.email ==""){
     alert("Please fill the form");
      return;
    }
    else{
      const response = await apiClient.post("/auth/authenticate", data);
      const token = response.data.token;
      const decodedToken: { authorities: string[] } = jwtDecode(token);

      console.log("Decoded token:", decodedToken);
      console.log("Login successful, token:", token);
      localStorage.setItem("authToken", token);
      const role = decodedToken.authorities[0];
      if (role === "ADMIN") {
        navigate("/adminhome");
      } else if (role === "USER") {
        navigate("/booking");}
    }

  }


return (
    <div className="loginBody">
    <form onSubmit={handleFormSubmit}>
        <h3>Welcome Back</h3>
        <p>Enter your email and password to access your account</p>

        <label >Email</label>
        <input type="email" placeholder="Email" id="email"  value={data.email}
          onChange={handleInputChange}/>

        <label >Password</label>
        <input type="password" placeholder="Password" id="password"  value={data.password}
          onChange={handleInputChange}/>

        <button type="submit">Log In</button>
        {/* <div className="social">
          <div className="go"><i className="fab fa-google"></i>  Google</div>
          <div className="fb"><i className="fab fa-facebook"></i>  Facebook</div>
          
        </div> */}
        <h4>Don't have an account? register <Link to="/register">here</Link></h4>
        
    </form>
    </div>);
}

export default Login;