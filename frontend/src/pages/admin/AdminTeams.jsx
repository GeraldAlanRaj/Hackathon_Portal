import { useEffect, useState } from "react";
import axios from "../../utils/axiosInterceptor";
import "../../styles/AdminTeams.css";

const AdminTeams = () => {
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const res = await axios.get("/admin/teams");
      setTeams(res.data);
    } catch {
      alert("Failed to load teams");
    }
  };

  /* ===== CSV EXPORT ===== */
  const exportCSV = () => {
    const rows = [["Team ID", "Member Name", "Register No", "Email"]];

    teams.forEach((team) => {
      team.members.forEach((m) => {
        rows.push([team.teamId, m.name, m.regNo, m.email]);
      });
    });

    const csvContent = rows
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "registered_teams.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  /* ===== SEARCH FILTER ===== */
  const filteredTeams = teams.filter((team) =>
    team.teamId.toLowerCase().includes(search.toLowerCase())
  );

  /* EMPTY STATE */
  if (teams.length === 0) {
    return (
      <div className="admin-teams-empty">
        <h3 className="empty-text">No registrations yet</h3>
      </div>
    );
  }

  return (
    <div className="admin-teams-page">
      {/* HEADER */}
      <div className="page-header">
        <h1 className="page-title">Registered Teams</h1>

        <button className="export-btn" onClick={exportCSV}>
          Export CSV
        </button>

        {/* SEARCH BAR */}
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search by Team Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* GRID */}
      <div className="teams-grid">
        {filteredTeams.length === 0 ? (
          <p className="no-results">No matching teams found</p>
        ) : (
          filteredTeams.map((team) => (
            <div key={team._id} className="team-card">
              <div className="team-header">
                <span className="team-id">{team.teamId}</span>
              </div>

              <div className="members-table">
                {team.members.map((m, i) => (
                  <div key={i} className="member-row">
                    <span className="name">{m.name}</span>
                    <span>{m.regNo}</span>
                    <span>{m.email}</span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminTeams;
