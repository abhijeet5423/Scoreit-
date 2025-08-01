import React, { useEffect, useState } from "react";
import '../styles/TeamManage.css';

const TeamManage = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // TODO: ❌ REMOVE this temporary data block once backend is connected
    const dummyTeams = [
      { _id: "1", name: "Team A", players: ["P1", "P2", "P3"] },
      { _id: "2", name: "Team B", players: ["P4", "P5"] },
    ];
    setTeams(dummyTeams);

    /* ✅ UNCOMMENT and use this once backend is ready
    fetch("/api/teams")
      .then(res => res.json())
      .then(data => setTeams(data));
    */
  }, []);

  const handleAddTeam = () => {
    alert("Add team logic goes here");
  };

  const handleViewTeam = (team) => {
    alert(`Viewing team: ${team.name}`);
  };

  const handleDeleteTeam = (id) => {
    alert(`Delete team with id: ${id}`);
  };

  return (
    <div className="team-manage-wrapper">
      <h2 className="team-manage-title">Manage Teams</h2>
      <div className="team-manage-grid">
        {teams.length === 0 ? (
          <p className="team-manage-empty">No teams available. Add a new team.</p>
        ) : (
          teams.map((team) => (
            <div key={team._id} className="team-manage-card">
              <h3 className="team-manage-name">{team.name}</h3>
              <p className="team-manage-count">Players: {team.players?.length || 0}</p>
              <div className="team-manage-actions">
                <button onClick={() => handleViewTeam(team)} className="team-manage-btn view">
                  View
                </button>
                <button onClick={() => handleDeleteTeam(team._id)} className="team-manage-btn delete">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <button className="team-manage-add-btn" onClick={handleAddTeam}>
        Add Team
      </button>
    </div>
  );
};

export default TeamManage;
