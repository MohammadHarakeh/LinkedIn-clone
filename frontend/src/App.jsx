import LoginPage from "./Pages/loginPage";
import HomePage from "./Pages/homePage";
import Header from "./Pages/homePage/componenets/Header/Header";
import Profile from "./Pages/homePage/componenets/Profile/profile";
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
          element={
            <>
              <Header></Header>
              <HomePage userId={userId} setUserId={setUserId} />
            </>
          }
        />

        <Route
          path="/profile"
          element={
            <>
              <Header></Header> <Profile></Profile>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
