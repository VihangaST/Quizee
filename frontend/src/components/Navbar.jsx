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
    <h1>Merry Christmas</h1>
      <div className="">
        {/* Left: Logo */}
        <h1 className="text-xl font-bold">Quizee</h1>
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
