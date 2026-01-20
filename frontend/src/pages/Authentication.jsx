import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInterceptor";
import { setAuth } from "../utils/auth";
import "../styles/Authentication.css";

const Authentication = ({ setLoggedIn, setRole }) => {
  const [mode, setMode] = useState("login");
  const navigate = useNavigate();

  const [teamId, setTeamId] = useState("");
  const [password, setPassword] = useState("");

  const [members, setMembers] = useState([
    { name: "", regNo: "", email: "" },
    { name: "", regNo: "", email: "" },
    { name: "", regNo: "", email: "" }
  ]);

  const handleMemberChange = (i, field, value) => {
    const updated = [...members];
    updated[i][field] = value;
    setMembers(updated);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", { teamId, password });
      setAuth(res.data.token, res.data.user);
      setLoggedIn(true);
      setRole(res.data.user.role);
      navigate(
        res.data.user.role === "admin"
          ? "/admin/problems"
          : "/home"
      );
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/signup", { teamId, password, members });
      alert("Team registered successfully");
      setMode("login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-toggle">
          <button
            className={mode === "login" ? "active" : ""}
            onClick={() => setMode("login")}
          >
            Log in
          </button>
          <button
            className={mode === "register" ? "active" : ""}
            onClick={() => setMode("register")}
          >
            Register
          </button>
        </div>

        {mode === "login" && (
          <form className="auth-form fade" onSubmit={handleLogin}>
            <input
              placeholder="Team ID / Admin ID"
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Log in</button>
          </form>
        )}

        {mode === "register" && (
          <form className="auth-form fade" onSubmit={handleRegister}>
            <input
              placeholder="Team ID"
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {members.map((m, i) => (
              <div key={i} className="member-block">
                <h4>Member {i + 1}</h4>
                <div className="member-grid">
                  <input
                    placeholder="Name"
                    value={m.name}
                    onChange={(e) =>
                      handleMemberChange(i, "name", e.target.value)
                    }
                    required
                  />
                  <input
                    placeholder="Register No"
                    value={m.regNo}
                    onChange={(e) =>
                      handleMemberChange(i, "regNo", e.target.value)
                    }
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={m.email}
                    onChange={(e) =>
                      handleMemberChange(i, "email", e.target.value)
                    }
                    required
                  />
                </div>
              </div>
            ))}

            <button type="submit">Register</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Authentication;
