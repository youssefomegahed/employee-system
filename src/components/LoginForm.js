import React, { useState } from "react";
import { verifyHRUser } from "../api/employee";
import LoadingOverlay from "react-loading-overlay";

const LoginForm = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (email && password) {
      try {
        setLoading(true);
        const response = await verifyHRUser(email, password);
        setLoading(false);

        console.log("RESPONSE", response);
        if (!response) {
          setErrorMessage("Invalid HR user credentials.");
        } else {
          setErrorMessage("");
          setUser(response);
          console.log("Login successful.");
        }
      } catch (error) {
        console.error("Error while verifying HR user:", error);
        setLoading(false);
        setErrorMessage("Error occurred while verifying HR user.");
      }
    } else {
      setErrorMessage("Please enter a valid email and password.");
    }
  };

  console.log(loading);

  return (
    <div
      className="container"
      style={{
        filter: loading ? "brightness(50%)" : "brightness(100%)",
      }}
    >
      <h1>Login</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <LoadingOverlay active={loading} spinner></LoadingOverlay>
      </div>
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
