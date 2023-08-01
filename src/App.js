import React from "react";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
  const [user, setUser] = React.useState(null);
  return (
    <div>
      {user ? <HomePage user={user} /> : <LoginPage setUser={setUser} />}
    </div>
  );
}

export default App;
