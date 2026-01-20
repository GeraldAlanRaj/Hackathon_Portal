import { useEffect, useState } from "react";
import axios from "../../utils/axiosInterceptor";
import "../../styles/Leaderboard.css";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get("/user/leaderboard");
      setLeaderboard(res.data);
    } catch (err) {
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
            <th>Team ID</th>
            <th>Problem</th>
            <th>Marks</th>
          </tr>
        </thead>

        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={entry._id}>
              <td>{index + 1}</td>
              <td>{entry.teamId.teamId}</td>
              <td>{entry.problemId.title}</td>
              <td>{entry.marks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

};

export default Leaderboard;
