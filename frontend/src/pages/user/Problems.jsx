import { useEffect, useState } from "react";
import axios from "../../utils/axiosInterceptor";
import "../../styles/Problems.css";

/* ================= TIME HELPERS ================= */

// Format date in IST clearly for users
const formatIST = (utc) =>
  new Date(utc).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  });

// Countdown formatter
const formatTime = (ms) => {
  const s = Math.floor(ms / 1000);
  return `${String(Math.floor(s / 3600)).padStart(2, "0")}:${String(
    Math.floor((s % 3600) / 60)
  ).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
};

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [solutionLink, setSolutionLink] = useState("");

  const [hackathonStatus, setHackathonStatus] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  const [isLastHour, setIsLastHour] = useState(false);
  const [hackathonStartTime, setHackathonStartTime] = useState("");

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submittedProblem, setSubmittedProblem] = useState(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    checkSubmissionStatus();
    fetchHackathonWindow();
  }, []);

  /* ================= TIMER ================= */
  useEffect(() => {
    if (!hackathonStatus) return;
    const timer = setInterval(fetchHackathonWindow, 1000);
    return () => clearInterval(timer);
  }, [hackathonStatus]);

  /* ================= CHECK SUBMISSION ================= */
  const checkSubmissionStatus = async () => {
    try {
      const res = await axios.get("/user/my-submission");

      if (res.data) {
        setHasSubmitted(true);
        setSubmittedProblem(res.data.problemId?.title);
      } else {
        fetchProblems();
      }
    } catch {
      alert("Failed to verify submission status");
    }
  };

  /* ================= FETCH PROBLEMS ================= */
  const fetchProblems = async () => {
    try {
      const res = await axios.get("/user/problems");
      setProblems(res.data);
    } catch {
      alert("Failed to load problems");
    }
  };

  /* ================= HACKATHON WINDOW ================= */
  const fetchHackathonWindow = async () => {
    try {
      const res = await axios.get("/user/hackathon");
      if (!res.data) return;

      const now = Date.now();
      const start = new Date(res.data.startTime).getTime();
      const end = new Date(res.data.endTime).getTime();

      // Display IST time properly
      setHackathonStartTime(formatIST(res.data.startTime));

      if (now < start) {
        setHackathonStatus("NOT_STARTED");
        setTimeLeft(formatTime(start - now));
        setIsLastHour(false);
      } else if (now > end) {
        setHackathonStatus("ENDED");
        setTimeLeft("");
        setIsLastHour(false);
      } else {
        const remaining = end - now;
        setHackathonStatus("RUNNING");
        setTimeLeft(formatTime(remaining));
        setIsLastHour(remaining <= 60 * 60 * 1000);
      }
    } catch {
      setHackathonStatus("ERROR");
    }
  };

  /* ================= CARD SELECTION ================= */
  const handleCardClick = (problem) => {
    if (hasSubmitted || hackathonStatus !== "RUNNING") return;
    setSelectedProblem(problem);
    setShowConfirm(true);
  };

  /* ================= FINAL SUBMISSION ================= */
  const submitSolution = async () => {
    try {
      await axios.post("/user/submit", {
        problemId: selectedProblem._id,
        solutionLink
      });

      alert("Solution submitted successfully");
      setShowSubmit(false);
      setHasSubmitted(true);
      setSubmittedProblem(selectedProblem.title);
    } catch (err) {
      alert(err.response?.data?.message || "Submission failed");
    }
  };

  return (
    <div className="problems-page">
      {/* ⏳ TIMER */}
      {hackathonStatus === "RUNNING" && (
        <div className={`problem-timer ${isLastHour ? "danger" : ""}`}>
          ⏳ Time Remaining: <span>{timeLeft}</span>
        </div>
      )}

      {/* TITLE */}
      {!hasSubmitted && hackathonStatus === "RUNNING" && (
        <h1 className="page-title">Problem Statements</h1>
      )}

      {/* ✅ SUBMITTED */}
      {hasSubmitted && (
        <div className="locked-card">
          <h3>✅ Submission Completed</h3>
          <p>
            You have successfully submitted for:
            <strong> {submittedProblem}</strong>
          </p>
          <p>Results will be available after evaluation.</p>
        </div>
      )}

      {/* ⏳ BEFORE HACKATHON */}
      {!hasSubmitted && hackathonStatus === "NOT_STARTED" && (
        <div className="locked-card">
          <h3>🚧 Hackathon Not Started</h3>
          <p>
            Problem statements will be available from:
            <strong> {hackathonStartTime}</strong>
          </p>
        </div>
      )}

      {/* 🔴 AFTER HACKATHON */}
      {!hasSubmitted && hackathonStatus === "ENDED" && (
        <div className="locked-card">
          <h3>⛔ Hackathon Completed</h3>
          <p>The hackathon has ended.</p>
          <p>Submissions are no longer accepted.</p>
        </div>
      )}

      {/* 🟢 DURING HACKATHON */}
      {!hasSubmitted && hackathonStatus === "RUNNING" && (
        problems.length === 0 ? (
          <div className="locked-card">
            <h3>⚠️ No Problems Available</h3>
            <p>Please wait while problem statements are being published.</p>
          </div>
        ) : (
          <div className="problems-grid">
            {problems.map((p) => (
              <div
                key={p._id}
                className={`problem-card ${
                  selectedProblem?._id === p._id ? "selected" : ""
                }`}
                onClick={() => handleCardClick(p)}
              >
                <h3>{p.title}</h3>
                <a href={p.driveLink} target="_blank" rel="noreferrer">
                  View Details
                </a>
              </div>
            ))}
          </div>
        )
      )}

      {/* CONFIRM MODAL */}
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Selection</h3>
            <p>
              Are you sure you want to choose
              <strong> {selectedProblem.title}</strong>?
            </p>
            <div className="modal-actions">
              <button onClick={() => setShowConfirm(false)}>Cancel</button>
              <button
                className="primary"
                onClick={() => {
                  setShowConfirm(false);
                  setShowSubmit(true);
                }}
              >
                Yes, Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUBMISSION MODAL */}
      {showSubmit && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Submit Solution</h3>
            <p className="warning">
              ⚠️ This submission is final. Changes cannot be made.
            </p>
            <input
              type="url"
              placeholder="Google Drive solution link"
              value={solutionLink}
              onChange={(e) => setSolutionLink(e.target.value)}
              required
            />
            <div className="modal-actions">
              <button onClick={() => setShowSubmit(false)}>Cancel</button>
              <button className="primary" onClick={submitSolution}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Problems;
