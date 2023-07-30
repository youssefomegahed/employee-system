import React, { useState } from "react";
import { verifyHRUser } from "../api/employee";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    if (email && password) {
      try {
        const response = await verifyHRUser(email, password);

        if (response === false) {
          setErrorMessage("Invalid email or password.");
        } else {
          window.location.href = "/dashboard";
        }

        setErrorMessage("");
      } catch (error) {
        console.error("Error while verifying HR user:", error);
        setErrorMessage("Error occurred while verifying HR user.");
      }
    } else {
      setErrorMessage("Please enter a valid email and password.");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="form-group">
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
        />
      </div>
      <button className="btn-login" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default LoginForm;
