import { useEffect, useState } from "react";
import axios from "../../utils/axiosInterceptor";
import "../../styles/AdminLeaderboard.css";

const TOTAL_EVALUATORS = 4;

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

    // 🚨 Safety check
    const incomplete = data.some(
      (d) => d.evaluatorCount < TOTAL_EVALUATORS
    );

    if (incomplete) {
      alert(
        "Some submissions are not evaluated by all evaluators yet!"
      );
      return;
    }

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

      <button className="publish-btn" onClick={publishResults}>
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
              <th>Evaluations</th>
            </tr>
          </thead>

          <tbody>
            {data.map((d, i) => (
              <tr key={d.submissionId}>
                <td>{i + 1}</td>
                <td>{d.teamId}</td>
                <td>{d.problemTitle}</td>
                <td>{d.totalMarks}</td>
                <td>
                  <span
                    className={
                      d.evaluatorCount === TOTAL_EVALUATORS
                        ? "eval-complete"
                        : "eval-pending"
                    }
                  >
                    {d.evaluatorCount} / {TOTAL_EVALUATORS}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLeaderboard;
