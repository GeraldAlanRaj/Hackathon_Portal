import { useEffect, useState } from "react";
import axios from "../../utils/axiosInterceptor";
import "../../styles/AdminSubmissions.css";

const AdminSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [marks, setMarks] = useState({});

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const res = await axios.get("/admin/submissions");
      setSubmissions(res.data);

      const initialMarks = {};
      res.data.forEach((s) => {
        if (s.marks !== null && s.marks !== undefined) {
          initialMarks[s._id] = s.marks;
        }
      });
      setMarks(initialMarks);
    } catch {
      alert("Failed to load submissions");
    }
  };

  const handleGrade = async (submissionId) => {
    if (marks[submissionId] === "" || marks[submissionId] === undefined) {
      alert("Please enter marks");
      return;
    }

    try {
      await axios.put(`/admin/submissions/${submissionId}/grade`, {
        marks: Number(marks[submissionId])
      });
      alert("Marks updated successfully");
      fetchSubmissions();
    } catch {
      alert("Failed to update marks");
    }
  };

  if (submissions.length === 0) {
    return (
      <div className="admin-empty-wrapper">
        <h3 className="empty-text">No submissions yet</h3>
      </div>
    );
  }

  return (
    <div className="admin-submissions-page">
      <h1 className="page-title">Submissions</h1>

      <div className="submissions-grid">
        {submissions.map((s) => (
          <div
            key={s._id}
            className={`submission-card ${s.marks !== null ? "graded" : ""}`}
          >
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

            <div className="grade-section">
              <input
                type="number"
                min="0"
                max="100"
                placeholder="Marks"
                value={marks[s._id] ?? ""}
                onChange={(e) =>
                  setMarks({ ...marks, [s._id]: e.target.value })
                }
              />

              <button onClick={() => handleGrade(s._id)}>
                {s.marks !== null ? "Update Marks" : "Submit Marks"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSubmissions;
