import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import "../styles/Navbar.css";

const Navbar = ({ role, setLoggedIn, setRole }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    setRole(null);
    navigate("/auth");
  };

  return (
    <nav className="navbar">
      {/* LEFT MENU */}
      <div className="navbar-left">
        {role === "team" && (
          <>
            <Link to="/home">Home</Link>
            <Link to="/problems">Problems</Link>
            <Link to="/leaderboard">Leaderboard</Link>
          </>
        )}

        {role === "admin" && (
          <>
            <Link to="/admin/problems">Problems</Link>
            <Link to="/admin/teams">Teams</Link>
            <Link to="/admin/submissions">Submissions</Link>
            <Link to="/admin/hackathon">Hackathon Window</Link>
            <Link to="/admin/leaderboard">Leaderboard</Link>
          </>
        )}

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* RIGHT LOGOS */}
      <div className="navbar-right">
        <img src="/srm.png" alt="SRM" />
        <img src="/soc.jpeg" alt="SOC" />
        <img src="/dsbs.png" alt="DSBS" />
      </div>
    </nav>
  );
};

export default Navbar;
