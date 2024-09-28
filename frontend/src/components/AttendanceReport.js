import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css"; // Import styles for report

const AttendanceReport = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reports, setReports] = useState([]);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const employeeUsers = response.data.filter(
          (user) => user.role === "employee"
        );
        setUsers(employeeUsers);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users.");
      }
    };

    fetchUsers();
  }, []);

  const handleGenerateReport = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/attendance/report`,
        {
          userId: selectedUserId,
          startDate,
          endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (Array.isArray(response.data.data)) {
        // Sort reports by date in ascending order
        const sortedReports = response.data.data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setReports(sortedReports);
        setError(""); // Clear error if successful
        setIsModalOpen(true); // Open modal when report is generated
      } else {
        setReports([]);
        setError("No records found for the selected dates.");
      }
    } catch (err) {
      console.error("Error generating report:", err);
      if (err.response && err.response.status === 404) {
        setError("No records found for user on the selected dates.");
      } else {
        setError("Failed to generate report.");
      }
      setReports([]);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  // Helper function to capitalize first letter and extract name
  const getDisplayName = (email) => {
    const name = email.split("@")[0];
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  return (
    <div className="attendance-report">
      <h1>Attendance Report</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <select
        onChange={(e) => setSelectedUserId(e.target.value)}
        value={selectedUserId}
      >
        <option value="">Select User</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {getDisplayName(user.email)} {/* Display formatted name */}
          </option>
        ))}
      </select>
      <input type="date" onChange={(e) => setStartDate(e.target.value)} />
      <input type="date" onChange={(e) => setEndDate(e.target.value)} />
      <button className="generate-button" onClick={handleGenerateReport}>
        Generate Report
      </button>

      {/* Modal for displaying reports */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Generated Report</h2>
            <ul>
              {reports.map((report) => (
                <li
                  key={report._id}
                  className={report.status === "present" ? "present" : "absent"}
                >
                  {new Date(report.date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                  <span className="status">
                    {report.status === "present" ? "Present" : "Absent"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceReport;
