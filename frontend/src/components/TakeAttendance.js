import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeList from "./EmployeeList";
import "./styles.css"; // Import styles for attendance

const TakeAttendance = () => {
  const [employees, setEmployees] = useState([]);
  const [attendanceDate, setAttendanceDate] = useState("");
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const filteredEmployees = response.data.filter(
          (user) => user.role === "employee"
        );
        setEmployees(filteredEmployees);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleAttendanceChange = (userId, status) => {
    setAttendance((prev) => ({ ...prev, [userId]: status }));
  };

  const handleTakeAttendance = async () => {
    const attendanceArray = Object.keys(attendance).map((userId) => ({
      userId,
      status: attendance[userId],
    }));
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/attendance/take`,
        { date: attendanceDate, attendance: attendanceArray },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Attendance recorded successfully!");

      // Reset attendance and date
      setAttendance({});
      setAttendanceDate("");
    } catch (error) {
      console.error("Error recording attendance:", error);
    }
  };

  return (
    <div className="take-attendance">
      <h1>Take Attendance</h1>
      <input
        type="date"
        value={attendanceDate} // Bind the input value to state
        onChange={(e) => setAttendanceDate(e.target.value)}
      />
      <EmployeeList
        employees={employees}
        onAttendanceChange={handleAttendanceChange}
        attendance={attendance} // Pass attendance state to EmployeeList
      />
      <button className="submit-button" onClick={handleTakeAttendance}>
        Submit Attendance
      </button>
    </div>
  );
};

export default TakeAttendance;
