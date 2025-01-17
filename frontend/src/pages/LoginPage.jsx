// import React,{useState,useContext} from 'react';
// import { useNavigate } from 'react-router-dom';
// import { BASE_URL } from '../constants/config';

// export default function LoginPage() {
//     const [username, setUsername] = useState('');
//     // const [password, setPassword] = useState('');
//     const [validationMessage, setValidationMessage] = useState({ username: '', password: '' });
//     const navigate = useNavigate();
//     // const {login}  = useContext(AuthContext);

// const handleSubmit = async (e) => {
// e.preventDefault();
//     if (!username) { 
//     setValidationMessage({ ...validationMessage, username: 'Username is required' });
//     return;
//     }
//     try {
    
//         const response = await fetch(`${BASE_URL}/login`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         },
//         body: JSON.stringify({ username }),
//         });

//         if (response.ok) {
//             const data = await response.json();
//             alert(`Response: ${JSON.stringify(data)}`);
//             // alert(Response: ${JSON.stringify(data)});
//             localStorage.setItem('token', data.token);
//             // alert(token:${JSON.stringify(data.token)});
//             console.log("Server Response:", data);
//             // login(data);
//             navigate("/Dashboard", { state: { score: data.score, username } });

//         } else {
//             // alert(Login failed: ${response.statusText});
//             setValidationMessage({...validationMessage, password: 'Invalid Credentials' });
//         }
//     } catch (error) {
//         alert(`Error: ${error.message}`);
//         console.error('Error:', error);
//     }
// };

// return (
// <>
// <div className="">
// <div className="sm:mx-auto sm:w-full sm:max-w-sm">
// <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-200">
//     Login...
// </h2>
// </div>
// <div className="mt-10 w-full">
// <form className="space-y-2">
//     <div >
//     <div className="flex items-center justify-between">
//     <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
//         Enter mobile Number:
//     </label>
//     </div>
//     <div className="mt-2">
//         <input
//         id="username"
//         name="username"
//         type="text"
//         autoComplete="username"
//         required
//         value={username}
//         // onChange={(e) => setUsername(e.target.value)}
//         onChange={(e) => {
//         setUsername(e.target.value);
//         setValidationMessage({ ...validationMessage, username: '' });
//         }}
//         className="block w-full bg-gray-300 rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-dark sm:text-sm sm:leading-6"
//         />
//         {validationMessage.username && <p className="text-red-500 text-sm mt-1">{validationMessage.username}</p>}
//     </div>
//     </div>

//     <div>
//     <button
//         type="submit"
//         className="h-8 w-full flex items-center justify-center px-4 py-2 text-sm custom-button"
//         onClick={handleSubmit}
//     >
//         GO
//     </button>
//     {/* {message && <p>{message}</p>} */}
 
//     </div>
    
// </form>
// </div>
// </div>
// </>
// );
// }


import React, { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/config";
import loginImage from "../assets/image1.jpg"; // Update with your image path

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
        alert(`Response: ${JSON.stringify(data)}`);
        localStorage.setItem("token", data.token);
        
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
      {/* Left Section: Image */}
      {/* <div className="hidden md:block md:w-1/2 h-screen"> */}
        <img
          src={loginImage}
          alt="Login Illustration"
          className="w-full h-full object-fit"
        />
      {/* </div> */}

      {/* Right Section: Login Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center"style={{ backgroundColor: "rgb(255, 240, 240)" }}>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-center font-bold text-red-500 mb-20">
          FestIQ
          </h1>
          <h1 className="text-center text-2xl font-bold text-gray-900">Login</h1>
         
        </div>
        <div className="mt-10 w-full px-8">
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
