import React from "react";
import { useAuth } from "../contexts/AuthContext";
import ViewAttendance from "./ViewAttendance";
import "./EmployeeDashboard.css"; // Import the CSS file for styling

const EmployeeDashboard = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/"; // Redirect to login route
  };

  return (
    <div className="employee-dashboard">
      <div className="header">
        <h1></h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <ViewAttendance />
    </div>
  );
};

export default EmployeeDashboard;
