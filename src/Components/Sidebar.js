import React from "react";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";


const Sidebar = () => {
  const handleLogout = () => {
    signOut(auth).catch((error) => alert("Logout failed"));
  };

  return (
    <div className="sidebar">
      <NavLink to="/" className="sidebar-link">Weather</NavLink>
      <NavLink to="/profile" className="sidebar-link">Profile</NavLink>
      <button onClick={handleLogout} className="sidebar-link">Logout</button>
    </div>
  );
};

export default Sidebar;
