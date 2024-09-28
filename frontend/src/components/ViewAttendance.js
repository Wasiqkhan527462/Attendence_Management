import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import "./EmployeeDashboard.css"; // Import your CSS file

const ViewAttendance = () => {
  const { user } = useAuth();
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAttendanceRecords = async () => {
    try {
      setLoading(true);
      if (!user || !user.id || !user.token) {
        throw new Error("User is not authenticated");
      }

      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0,
        23,
        59,
        59
      );

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/attendance/user`,
        {
          userId: user.id,
          startDate: startOfMonth.toISOString().split("T")[0],
          endDate: endOfMonth.toISOString().split("T")[0],
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setAttendanceRecords(response.data.data);
      setError(null);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Error fetching records");
      } else {
        setError("Network error, please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchAttendanceRecords();
    } else {
      setAttendanceRecords([]);
    }
  }, [user]);

  if (loading) {
    return <p>Loading attendance records...</p>;
  }

  // Sort records by date (oldest to newest)
  const sortedRecords = attendanceRecords.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="attendance-container">
      <h2 className="attendance-title">
        Your Attendance Overview for{" "}
        {new Date().toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
      </h2>
      {error && <p className="error-message">{error}</p>}
      {sortedRecords.length === 0 ? (
        <p>No attendance records found for this month.</p>
      ) : (
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedRecords.map((record) => {
              const formattedDate = new Date(record.date).toLocaleString(
                "default",
                {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }
              );

              return (
                <tr key={record._id}>
                  <td>{formattedDate}</td>
                  <td className={record.status}>{record.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewAttendance;
