import React, { useState } from "react";
import EmployeeList from "../components/EmployeeList";
import AddEditEmployee from "../components/AddEditEmployee";
import AddAttendance from "../components/AddAttendance";
import "./HomePage.css";

const HomePage = () => {
  const [employees, setEmployees] = useState([
    {
      _id: 1,
      name: "John Doe",
      email: "john@gmail.com",
      password: "mypass",
      group: "HR",
    },
    {
      _id: 2,
      name: "Jane Doe",
      email: "jane@gmail.com",
      password: "mypass",
      group: "Normal Employee",
    },
  ]);

  const [editEmployee, setEditEmployee] = useState(null);

  const [attendanceDate, setAttendanceDate] = useState(null);

  const addEmployee = (employee) => {
    setEmployees([...employees, employee]);
  };

  const editEmployeeData = (updatedEmployee) => {
    if (updatedEmployee === null) return;
    const updatedEmployees = employees.map((employee) =>
      employee._id === updatedEmployee._id ? updatedEmployee : employee
    );
    setEmployees(updatedEmployees);
    setEditEmployee(null);
  };

  const deleteEmployee = (id) => {
    const updatedEmployees = employees.filter(
      (employee) => employee._id !== id
    );
    setEmployees(updatedEmployees);
  };

  const addAttendance = (employeeId, date) => {};

  return (
    <div>
      <EmployeeList
        employees={employees}
        onEditEmployee={setEditEmployee}
        onDeleteEmployee={deleteEmployee}
      />

      <AddEditEmployee
        employee={editEmployee}
        setEmployee={setEditEmployee}
        onAddEmployee={addEmployee}
        onEditEmployee={editEmployeeData}
      />
      {/*
      <AddAttendance
        employees={employees}
        selectedDate={attendanceDate}
        onAddAttendance={addAttendance}
        onDateChange={setAttendanceDate}
      /> */}
    </div>
  );
};

export default HomePage;
