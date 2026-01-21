import { useEffect, useState } from "react";
import axios from "../../utils/axiosInterceptor";
import "../../styles/AdminSubmissions.css";

const SECTIONS = [
  { key: "executiveSummary", label: "Executive Summary" },
  { key: "methodology", label: "Methodology" },
  { key: "resultsAnalysis", label: "Results & Analysis" },
  { key: "limitations", label: "Limitations" },
  { key: "improvements", label: "Improvements" }
];

const AdminSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [marks, setMarks] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  /* ================= LOAD SUBMISSIONS + EVALUATIONS ================= */
  const loadData = async () => {
    try {
      const [subRes, evalRes] = await Promise.all([
        axios.get("/evaluator/submissions"),
        axios.get("/evaluator/evaluations")
      ]);

      setSubmissions(subRes.data);

      // 🔥 hydrate marks from DB
      const hydrated = {};
      evalRes.data.forEach((e) => {
        hydrated[e.submissionId] = {
          executiveSummary: e.executiveSummary,
          methodology: e.methodology,
          resultsAnalysis: e.resultsAnalysis,
          limitations: e.limitations,
          improvements: e.improvements
        };
      });

      setMarks(hydrated);
    } catch {
      alert("Failed to load submissions or evaluations");
    }
  };

  const updateMark = (submissionId, field, value) => {
    const v = Math.max(0, Math.min(10, Number(value)));

    setMarks((prev) => ({
      ...prev,
      [submissionId]: {
        ...prev[submissionId],
        [field]: v
      }
    }));
  };

  const handleGrade = async (submissionId) => {
    const data = marks[submissionId];
    if (!data) {
      alert("Please fill all sections");
      return;
    }

    for (const s of SECTIONS) {
      if (data[s.key] === undefined) {
        alert(`Missing marks for ${s.label}`);
        return;
      }
    }

    try {
      await axios.post(`/evaluator/submissions/${submissionId}/evaluate`, data);
      alert("Evaluation saved");
    } catch {
      alert("Failed to save evaluation");
    }
  };

  const filtered = submissions.filter((s) =>
    `${s.teamId.teamId} ${s.problemId.title}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

return (
  <div className="admin-submissions-page">
    {submissions.length === 0 ? (
      <div className="no-submissions-empty">
        <h3 className="no-submissions">No submissions yet</h3>
      </div>
    ) : (
      <>
        <h1 className="page-title">Submissions</h1>

        <div className="search-wrapper">
          <input
            placeholder="Search by Team or Problem..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="submissions-grid">
          {filtered.map((s) => {
            const m = marks[s._id] || {};
            const total = SECTIONS.reduce(
              (sum, sec) => sum + (m[sec.key] || 0),
              0
            );

            return (
              <div key={s._id} className="submission-card graded">
                <div className="submission-header">
                  <span className="team">{s.teamId.teamId}</span>
                  <span className="problem">{s.problemId.title}</span>
                </div>

                <a
                  href={s.solutionLink}
                  target="_blank"
                  rel="noreferrer"
                  className="solution-link"
                >
                  View Solution
                </a>

                <div className="evaluation-grid">
                  {SECTIONS.map((sec) => (
                    <div key={sec.key} className="evaluation-field">
                      <label>{sec.label}</label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={m[sec.key] ?? ""}
                        onChange={(e) =>
                          updateMark(s._id, sec.key, e.target.value)
                        }
                      />
                    </div>
                  ))}
                </div>

                <div className="total-row">
                  <span>Total</span>
                  <strong>{total} / 50</strong>
                </div>

                <button
                  className="submit-eval-btn"
                  onClick={() => handleGrade(s._id)}
                >
                  Save Evaluation
                </button>
              </div>
            );
          })}
        </div>
      </>
    )}
  </div>
);

};

export default AdminSubmissions;
