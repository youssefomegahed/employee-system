import React from "react";
import "./EmployeeList.css"; // Import the EmployeeList.css

const EmployeeList = ({ employees, onEditEmployee, onDeleteEmployee }) => {
  return (
    <div className="employee-list">
      {employees.length === 0 ? (
        <p
          style={{
            color: "white",
          }}
        >
          No employees found.
        </p>
      ) : (
        <>
          <h2
            style={{
              color: "white",
              textAlign: "center",
              marginBottom: "50px",
            }}
          >
            Employees
          </h2>

          <ul>
            {employees.map((employee) => (
              <li
                key={employee._id}
                className="employee-item"
                style={{
                  width: "100%",
                }}
              >
                <span>{employee.name}</span>
                <div>
                  <button onClick={() => onEditEmployee(employee)}>Edit</button>
                  <button
                    onClick={() => onDeleteEmployee(employee._id)}
                    className="delete-button"
                    style={{
                      marginLeft: "10px",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default EmployeeList;
