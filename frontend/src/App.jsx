import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Authentication from "./pages/Authentication";
import Home from "./pages/user/Home";
import Problems from "./pages/user/Problems";
import Leaderboard from "./pages/user/Leaderboard";

import AdminProblems from "./pages/admin/AdminProblems";
import AdminTeams from "./pages/admin/AdminTeams";
import AdminSubmissions from "./pages/admin/AdminSubmissions";
import AdminHackathon from "./pages/admin/AdminHackathon";
import AdminLeaderboard from "./pages/admin/AdminLeaderboard";

import Navbar from "./components/Navbar";
import { isAuthenticated, getRole } from "./utils/auth";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const auth = isAuthenticated();
    setLoggedIn(auth);
    if (auth) setRole(getRole());
  }, []);

  return (
    <BrowserRouter>
      {loggedIn && (
  <Navbar
    role={role}
    setLoggedIn={setLoggedIn}
    setRole={setRole}
  />
)}


      <Routes>
        <Route
          path="/auth"
          element={
            loggedIn ? (
              <Navigate to={role === "admin" ? "/admin/problems" : "/home"} />
            ) : (
              <Authentication setLoggedIn={setLoggedIn} setRole={setRole} />
            )
          }
        />

        <Route
          path="/home"
          element={loggedIn ? <Home /> : <Navigate to="/auth" />}
        />

        <Route
          path="/problems"
          element={loggedIn ? <Problems /> : <Navigate to="/auth" />}
        />

        <Route
          path="/leaderboard"
          element={loggedIn ? <Leaderboard /> : <Navigate to="/auth" />}
        />

        <Route
          path="/admin/problems"
          element={
            loggedIn && role === "admin"
              ? <AdminProblems />
              : <Navigate to="/auth" />
          }
        />

        <Route
          path="/admin/teams"
          element={
            loggedIn && role === "admin"
              ? <AdminTeams />
              : <Navigate to="/auth" />
          }
        />

        <Route
          path="/admin/submissions"
          element={
            loggedIn && role === "admin"
              ? <AdminSubmissions />
              : <Navigate to="/auth" />
          }
        />

        <Route
          path="/admin/hackathon"
          element={
            loggedIn && role === "admin"
              ? <AdminHackathon />
              : <Navigate to="/auth" />
          }
        />

        <Route
          path="/admin/leaderboard"
          element={
            loggedIn && role === "admin"
              ? <AdminLeaderboard />
              : <Navigate to="/auth" />
          }
        />

        <Route
          path="*"
          element={<Navigate to={loggedIn ? "/home" : "/auth"} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
