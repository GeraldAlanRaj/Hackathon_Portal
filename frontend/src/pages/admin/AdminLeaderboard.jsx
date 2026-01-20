import { useEffect, useState } from "react";
import axios from "../../utils/axiosInterceptor";
import "../../styles/Leaderboard.css"; // 🔥 REUSE SAME STYLES

const AdminLeaderboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get("/admin/leaderboard");
      setData(res.data);
    } catch {
      alert("Failed to load leaderboard");
    }
  };

  const publishResults = async () => {
  if (!window.confirm("Publish leaderboard to all participants?")) return;

  try {
    await axios.post("/admin/leaderboard/publish");
    alert("Leaderboard published successfully");
  } catch {
    alert("Failed to publish leaderboard");
  }
};


  return (
    <div className="leaderboard-page">

      <h2 className="leaderboard-title">Leaderboard</h2>
          <button
      style={{
        marginBottom: "20px",
        padding: "10px 18px",
        background: "linear-gradient(135deg, #ffd700, #ffb703)",
        border: "none",
        borderRadius: "8px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "transform 0.25s ease, box-shadow 0.25s ease"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow =
          "0 0 16px rgba(255, 215, 0, 0.8)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
      onClick={publishResults}
    >
      Publish Leaderboard
    </button>


      <div className="leaderboard-card">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Team</th>
              <th>Problem</th>
              <th>Marks</th>
            </tr>
          </thead>

          <tbody>
            {data.map((d, i) => (
              <tr key={d._id}>
                <td>{i + 1}</td>
                <td>{d.teamId.teamId}</td>
                <td>{d.problemId.title}</td>
                <td>{d.marks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLeaderboard;
