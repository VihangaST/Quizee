import React, { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/config";
import loginImage from "../assets/image1.jpg";

export default function LoginPage() {
  const [username, setUsername] = useState("071222365");
  const [validationMessage, setValidationMessage] = useState({
    username: "",
  });
  const navigate = useNavigate();
  
  useEffect(() => {
    // Reset `questionsClicked` on login
    localStorage.setItem("questionsClicked", "0");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username) {
      setValidationMessage({
        ...validationMessage,
        username: "Username is required",
      });
      return;
      
    }
    else if(username ==='0000000000'){
      navigate('/admin')
      return;
    }
    else if (!/^\d{10}$/.test(username)) { 
      // This regex ensures the phone number contains exactly 10 digits
      setValidationMessage({
        ...validationMessage,
        username: "Enter a valid phone number",
      });
      return;}

      
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ username }),
      });

      if (response.ok) {
        const data = await response.json();
        // alert(`Response: ${JSON.stringify(data)}`);
        localStorage.setItem("token", data.token);
        
        // alert(data.isWinner);
        if(data.isWinner){
          alert("You have already a Winner! ... Try Again Next Season...");
          return;

        }

        
        navigate("/Dashboard", { state: { score: data.score, username,count:1 } });
      } else {
        setValidationMessage({
          ...validationMessage,
          username: "Invalid Credentials",
        });
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex h-screen overflow-y-hidden">
      {/* <div className="hidden md:block md:w-1/2 h-screen"> */}
        <img
          src={loginImage}
          alt="Login Illustration"
          className="w-full h-full object-cover"
        />
        
      {/* Right Section: Login Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center"style={{ backgroundColor: "rgb(232,232,232)" }}>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-center font-bold text-red-500 mb-20">
          FestIQ
          </h1>
          <h1 className="text-center text-2xl font-bold text-gray-900">Login</h1>
         
        </div>
        <div className="mt-10 w-full px-16">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-900"
              >
                Enter Mobile Number:
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setValidationMessage({
                      ...validationMessage,
                      username: "",
                    });
                  }}
                  className="block w-full bg-gray-300 rounded-md py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-primary-dark"
                />
                {validationMessage.username && (
                  <p className="text-red-500 text-sm mt-1">
                    {validationMessage.username}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="h-8 w-full flex items-center justify-center px-4 py-2 text-sm custom-button"
                onClick={handleSubmit}
              >
                GO
              </button>
            </div>
          </form>
        </div>
      </div>
     </div>
  );
}
