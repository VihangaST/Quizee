import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user authentication data (e.g., token)
    localStorage.removeItem("questionsClicked");
    localStorage.removeItem("token");
    // Navigate to the login page
    navigate("/");
  };

  return (
    <nav className="navbar">
    <h1 className="text-red-400 text-3xl font-bold">Merry Christmas...!</h1>
      <div className="">
        {/* Left: Logo */}
        {/* text-center text-2xl font-bold text-gray-900 */}
        <h1 className="text-xl font-bold">FestIQ</h1>
        {/* Right: Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
        >
          End
        </button>
      </div>
      
    </nav>
  );
}
