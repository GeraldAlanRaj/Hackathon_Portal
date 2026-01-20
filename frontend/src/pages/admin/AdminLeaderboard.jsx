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

  return (
    <div className="leaderboard-page">
      <h2 className="leaderboard-title">Leaderboard</h2>

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
