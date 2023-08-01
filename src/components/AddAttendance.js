import React, { useState } from "react";
import "./AddAttendance.css"; // Import the AddAttendance.css

const AddAttendance = ({
  employees,
  selectedDate,
  onAddAttendance,
  onDateChange,
}) => {
  const [attendanceData, setAttendanceData] = useState({
    employeeName: "",
    date: selectedDate,
    status: "Present",
  });

  const handleEmployeeChange = (e) => {
    const { name, value } = e.target;
    setAttendanceData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (e) => {
    const { value } = e.target;
    onDateChange(value);
    setAttendanceData((prevData) => ({ ...prevData, date: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !attendanceData.employeeName ||
      !attendanceData.date ||
      !attendanceData.status
    ) {
      alert("Please fill all fields.");
      return;
    }

    onAddAttendance(attendanceData);

    setAttendanceData({
      employeeName: "",
      date: selectedDate,
      status: "Present",
    });
  };

  return (
    <div className="add-attendance-form">
      <h2
        style={{
          textAlign: "center",
          color: "black",
        }}
      >
        Add Attendance
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Employee:</label>
          <select
            name="employeeName"
            value={attendanceData.employeeName}
            onChange={handleEmployeeChange}
            className="form-control"
          >
            <option value="">Select an employee</option>
            {employees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Select Date:</label>
          <input
            type="date"
            name="date"
            value={attendanceData.date}
            onChange={handleDateChange}
            className="form-control"
            style={{
              width: "90%",
            }}
          />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select
            name="status"
            value={attendanceData.status}
            onChange={handleEmployeeChange}
            className="form-control"
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Late">Late</option>
          </select>
        </div>
        <div className="button-container">
          <button
            type="submit"
            className="submit-button"
            style={{
              backgroundColor: "#ff8040",
              color: "white",
              padding: "14px 20px",
              margin: "8px 0",
              border: "none",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Add Attendance
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAttendance;
