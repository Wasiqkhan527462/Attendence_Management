import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import TakeAttendance from "./TakeAttendance";
import AttendanceReport from "./AttendanceReport";
import "./styles.css"; // Updated to use AdminDashboard.css

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Use navigate for redirection
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="admin-dashboard">
      <div className="header">
        <button className="register-button" onClick={goToRegister}>
          Register User
        </button>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="center-options">
        <div className="attendance-container">
          <TakeAttendance />
        </div>
        <div className="report-container">
          <AttendanceReport />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
