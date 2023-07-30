import React from "react";
import LoginForm from "../components/LoginForm";
import "./LoginPage.css";

const LoginPage = ({ setLoggedIn }) => {
  return (
    <div>
      <LoginForm setLoggedIn={setLoggedIn} />
    </div>
  );
};

export default LoginPage;
