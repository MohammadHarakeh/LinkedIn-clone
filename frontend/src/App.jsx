import LoginPage from "./Pages/loginPage";
import HomePage from "./Pages/homePage";
import { React, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [userId, setUserId] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LoginPage userId={userId} setUserId={setUserId} />}
        />
        <Route
          path="/home"
          element={<HomePage userId={userId} setUserId={setUserId} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
