import React, { useState, useEffect } from "react";
import "./AddEditEmployee.css";

const AddEditEmployee = ({
  employee,
  setEmployee,
  onAddEmployee,
  onEditEmployee,
  setShowAddEmployeeModal,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    group: "",
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        email: employee.email,
        password: employee.password,
        group: employee.group,
      });
    } else {
      setFormData({ name: "", email: "", password: "", group: "" });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.group ||
      !formData.email ||
      !formData.password
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (!verifyEmail(formData.email)) {
      alert("Please enter a valid email.");
      return;
    }

    if (employee) {
      onEditEmployee({ ...employee, ...formData });
    } else {
      const newEmployee = { ...formData, id: Date.now() };
      onAddEmployee(newEmployee);
    }

    setFormData({ name: "", email: "", password: "", group: "" });
  };

  const verifyEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
      return true; // Valid email
    } else {
      return false; // Invalid email
    }
  };

  return (
    <div className="add-edit-employee-form">
      <h2
        style={{
          textAlign: "center",
          color: "black",
        }}
      >
        {employee ? "Edit Employee" : "Add Employee"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Group:</label>
          <input
            type="text"
            name="group"
            value={formData.group}
            onChange={handleChange}
            className="form-control"
          />
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
            {employee ? "Save Changes" : "Add Employee"}
          </button>
          {employee && (
            <button
              type="button"
              className="cancel-button"
              onClick={() => {
                setEmployee(null);
                setShowAddEmployeeModal(false);
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddEditEmployee;
