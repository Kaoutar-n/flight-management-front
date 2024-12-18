

  
  
  import apiClient from "../api/apiClient";
  import { useNavigate } from "react-router-dom";
  // import "./LoginCss.css"
  import '../styles/main.css'
  import { useState } from "react";
 

  function ValidateAccount(){
    const navigate = useNavigate();
    const [code, setCode] = useState<number | "">(""); 
    
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setCode(value === "" ? "" : Number(value)); 
    };
  
    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      
        console.log("Validation Code:", code); 
      
        if (code === "" || isNaN(Number(code))) {
          alert("Please enter a valid numeric validation code.");
          return;
        }
      
        try {
          const response = await apiClient.get(`/auth/activate-account`, { params: { token: code }, });
          console.log("Response:", response); 
          
          navigate("/login");
        } catch (error) {
          
          alert("Validation failed. Please try again.");
        }
      };
    
  
  
  return (
    <div className="loginBody">
    <form onSubmit={handleFormSubmit}>
      <h3>Validate Your Account</h3>

      <label>Validation Code</label>
      <input
        type="number"
        placeholder="Enter your validation code"
        value={code === "" ? "" : code} 
        onChange={handleInputChange}
      />

      <button type="submit">Validate</button>
    </form>
  </div>);
  }
  
  export default ValidateAccount;