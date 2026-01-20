import { useEffect, useState } from "react";
import axios from "../../utils/axiosInterceptor";
import "../../styles/AdminHackathon.css";

const AdminHackathon = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    fetchWindow();
  }, []);

  const fetchWindow = async () => {
    try {
      const res = await axios.get("/admin/hackathon");
      if (res.data) {
        setStartTime(res.data.startTime.slice(0, 16));
        setEndTime(res.data.endTime.slice(0, 16));
      }
    } catch {}
  };

  const saveWindow = async () => {
    try {
      await axios.post("/admin/hackathon", { startTime, endTime });
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
