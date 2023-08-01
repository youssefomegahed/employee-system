import React, { useState, useEffect } from "react";
import LoadingOverlay from "react-loading-overlay";
import EmployeeList from "../components/EmployeeList";
import AddEditEmployee from "../components/AddEditEmployee";
import AddAttendance from "../components/AddAttendance";
import {
  addEmployee as addEmployeeAPI,
  updateEmployees,
  getEmployees,
  deleteEmployee as deleteEmployeeAPI,
} from "../api/employee";
import "./HomePage.css";

const HomePage = ({ user }) => {
  const [employees, setEmployees] = useState([]);

  const [editEmployee, setEditEmployee] = useState(null);

  const [attendanceDate, setAttendanceDate] = useState(null);

  const [loading, setLoading] = useState(false);

  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showAddAttendanceModal, setShowAddAttendanceModal] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const employees = await getEmployees();
        setLoading(false);
        if (employees === false) {
          alert("An error occurred while fetching employees.");
          return;
        }
        setEmployees(employees);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  const addEmployee = async (employee) => {
    try {
      const name = employee.name;
      const email = employee.email;
      const password = employee.password;
      const group = employee.group;

      const response = await addEmployeeAPI(name, email, password, group);
      if (response === false) {
        alert("This email is already registered.");
      } else {
        setEmployees([...employees, response]);
        setShowAddEmployeeModal(false);
      }
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("An error occurred while adding the employee.");
    }
  };

  const editEmployeeData = (updatedEmployee) => {
    if (updatedEmployee === null) return;

    const updatedEmployees = employees.map((employee) =>
      employee._id === updatedEmployee._id ? updatedEmployee : employee
    );

    try {
      setLoading(true);
      updateEmployees(updatedEmployees);
      setLoading(false);
      setEmployees(updatedEmployees);
      setEditEmployee(null);
      setShowAddEmployeeModal(false);
    } catch (error) {
      console.error("Error updating employees:", error);
      alert("An error occurred while updating the employees.");
    }
  };

  const deleteEmployee = (id) => {
    if (id === user._id) {
      alert("You cannot delete your own account!");
      return;
    }

    try {
      setLoading(true);
      deleteEmployeeAPI(id);
      setLoading(false);
      setEmployees(employees.filter((employee) => employee._id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("An error occurred while deleting the employee.");
    }
  };

  const addAttendance = (attendanceData) => {
    if (attendanceData === null) return;

    const { date, employeeId, status } = attendanceData;

    const updatedEmployees = employees.map((employee) => {
      if (employee._id === employeeId) {
        employee.attendance.push({ date, status });
      }
      return employee;
    });

    try {
      setLoading(true);
      updateEmployees(updatedEmployees);
      setLoading(false);
      setEmployees(updatedEmployees);
      setShowAddAttendanceModal(false);
    } catch (error) {
      console.error("Error updating employees:", error);
      alert("An error occurred while updating the employees.");
    }
  };

  return (
    <div
      style={{
        filter: loading ? "brightness(50%)" : "brightness(100%)",
      }}
    >
      <EmployeeList
        employees={employees}
        onEditEmployee={setEditEmployee}
        onDeleteEmployee={deleteEmployee}
        setShowAddEmployeeModal={setShowAddEmployeeModal}
        user={user}
      />

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <LoadingOverlay active={loading} spinner></LoadingOverlay>
      </div>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button onClick={() => setShowAddEmployeeModal(true)}>
          Add Employee
        </button>

        <div
          style={{
            width: "20px",
          }}
        ></div>

        <button onClick={() => setShowAddAttendanceModal(true)}>
          Add Attendance
        </button>
      </div>

      {/* Modal for Add Employee */}
      {showAddEmployeeModal && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close"
              onClick={() => setShowAddEmployeeModal(false)}
            >
              &times;
            </span>
            <AddEditEmployee
              employee={editEmployee}
              setEmployee={setEditEmployee}
              onAddEmployee={addEmployee}
              onEditEmployee={editEmployeeData}
              setShowAddEmployeeModal={setShowAddEmployeeModal}
            />
          </div>
        </div>
      )}

      {/* Modal for Add Attendance */}
      {showAddAttendanceModal && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close"
              onClick={() => setShowAddAttendanceModal(false)}
            >
              &times;
            </span>
            <AddAttendance
              employees={employees}
              selectedDate={attendanceDate}
              onAddAttendance={addAttendance}
              onDateChange={setAttendanceDate}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
