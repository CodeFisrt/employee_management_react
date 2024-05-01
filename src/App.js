import "./App.css";
import LayoutPage from "./pages/LayoutPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import React, { useEffect, useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("token") == null ? false : true
  );

  const [loggedIn1, setLoggedIn1] = useState(false);

  return (
    <div className="App">
     
        <Router>
          <Routes>
            <Route
              path="/login"
              element={<Login setLoggedIn={setLoggedIn} />}
            />
            <Route
              path="/*"
              element={
                loggedIn ? <LayoutPage /> : <Navigate to="/login" replace />
              }
            />
          </Routes>
        </Router>
      
    </div>
  );
}

export default App;
