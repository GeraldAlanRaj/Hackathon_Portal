import { useEffect, useState } from "react";
import axios from "../../utils/axiosInterceptor";
import "../../styles/AdminHackathon.css";

/* ================= TIME HELPERS ================= */

// Convert UTC string → datetime-local value
const toLocalDatetimeInput = (utcString) => {
  if (!utcString) return "";
  const d = new Date(utcString);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
};

const AdminHackathon = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    fetchWindow();
  }, []);

  /* ================= FETCH ================= */
  const fetchWindow = async () => {
    try {
      const res = await axios.get("/admin/hackathon");
      if (res.data) {
        setStartTime(toLocalDatetimeInput(res.data.startTime));
        setEndTime(toLocalDatetimeInput(res.data.endTime));
      }
    } catch {
      alert("Failed to load hackathon window");
    }
  };

  /* ================= SAVE ================= */
  const saveWindow = async () => {
    try {
      const startUTC = new Date(startTime).toISOString();
      const endUTC = new Date(endTime).toISOString();

      await axios.post("/admin/hackathon", {
        startTime: startUTC,
        endTime: endUTC
      });

      alert("Hackathon window updated");
    } catch {
      alert("Failed to update window");
    }
  };

  return (
    <div className="hackathon-page">
      <h1 className="page-title">Hackathon Window</h1>

      <div className="window-card">
        <div className="field">
          <label>Start Time</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        <div className="field">
          <label>End Time</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>

        <button className="save-btn" onClick={saveWindow}>
          Save Hackathon Window
        </button>
      </div>
    </div>
  );
};

export default AdminHackathon;
