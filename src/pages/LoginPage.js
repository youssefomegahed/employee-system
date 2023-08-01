import React from "react";
import LoginForm from "../components/LoginForm";
import "./LoginPage.css";

const LoginPage = ({ setUser }) => {
  return (
    <div>
      <LoginForm setUser={setUser} />
    </div>
  );
};

export default LoginPage;
