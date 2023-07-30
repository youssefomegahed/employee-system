import React from "react";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  return (
    <div>
      {loggedIn ? <HomePage /> : <LoginPage setLoggedIn={setLoggedIn} />}
    </div>
  );
}

export default App;
