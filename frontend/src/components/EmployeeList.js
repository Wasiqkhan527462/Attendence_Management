import React from "react";
import "./styles.css";

const EmployeeList = ({ employees, onAttendanceChange, attendance }) => {
  return (
    <div>
      <h2>Employee List</h2>
      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        employees.map((employee) => {
          const employeeName = employee.email.split("@")[0];
          const capitalizedName =
            employeeName.charAt(0).toUpperCase() +
            employeeName.slice(1).toLowerCase(); // Capitalize the first letter

          return (
            <div key={employee._id} className="employee-item">
              <span className="employee-name">{capitalizedName}</span>
              <div className="attendance-radio-group">
                <label>
                  <input
                    type="radio"
                    name={`attendance-${employee._id}`}
                    value="present"
                    checked={attendance[employee._id] === "present"}
                    onChange={() => onAttendanceChange(employee._id, "present")}
                  />
                  Present
                </label>
                <label>
                  <input
                    type="radio"
                    name={`attendance-${employee._id}`}
                    value="absent"
                    checked={attendance[employee._id] === "absent"}
                    onChange={() => onAttendanceChange(employee._id, "absent")}
                  />
                  Absent
                </label>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default EmployeeList;
