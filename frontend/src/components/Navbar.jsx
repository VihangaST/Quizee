import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user authentication data (e.g., token)
    localStorage.removeItem("token");
    // Navigate to the login page
    navigate("/login");
  };

  return (
    <nav className="navbar">
    <h1>hello</h1>
      <div className="">
        {/* Left: Logo */}
        <h1 className="text-xl font-bold">Quizee</h1>

        {/* Center: Navigation Links */}
        {/* <div className="space-x-24">
          <a
            href="/userprofile"
            className="text-gray-400 hover:text-gray-100 transition duration-200"
          >
            User Profile
          </a>
          <a
            href="/QuizzesList"
            className="text-gray-400 hover:text-gray-100 transition duration-200"
          >
            Rent places
          </a>
        </div> */}

        {/* Right: Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
        >
          Back
        </button>
      </div>
    </nav>
  );
}
