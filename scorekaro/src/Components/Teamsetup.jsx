import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Teamsetup.css";
import centerImg from "../assets/b.png";
import axios from "axios";
import BackButton from "./BackButton";

const MAX_PLAYERS = 11;

const TeamCard = ({ teamName, setTeamName, players, setPlayers, label }) => {
  const handlePlayerChange = (index, value) => {
    const updated = [...players];
    updated[index] = value;
    setPlayers(updated);
  };

  const addPlayer = () => {
    if (players.length >= MAX_PLAYERS) {
      alert("Maximum 11 players allowed.");
      return;
    }
    setPlayers([...players, ""]);
  };

  return (
    <div className="team-card">
      <h3>{label}</h3>
      <input
        type="text"
        placeholder={`Enter ${label} Name`}
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        maxLength={25}
      />
      <div className="players-section">
        <h4>Players</h4>
        {players.map((player, index) => {
          if (index > 0 && players[index - 1].trim() === "") return null;

          return (
            <input
              key={index}
              id={`${label}-player-${index}`}
              type="text"
              placeholder={`Player ${index + 1}`}
              value={player}
              maxLength={25}
              onChange={(e) => handlePlayerChange(index, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const trimmed = player.trim();
                  if (trimmed !== "") {
                    const nextInput = document.getElementById(
                      `${label}-player-${index + 1}`
                    );
                    if (nextInput) {
                      nextInput.focus();
                      nextInput.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                    }
                  }
                }
              }}
            />
          );
        })}
        <button onClick={addPlayer} disabled={players.length >= MAX_PLAYERS}>
          + Add Player
        </button>
      </div>
    </div>
  );
};

const TeamSetupPage = () => {
  const navigate = useNavigate();
  const [teamSaveSuccess, setTeamSaveSuccess] = useState(false);

  const [teamAName, setTeamAName] = useState("");
  const [teamBName, setTeamBName] = useState("");
  const [teamAPlayers, setTeamAPlayers] = useState(Array(MAX_PLAYERS).fill(""));
  const [teamBPlayers, setTeamBPlayers] = useState(Array(MAX_PLAYERS).fill(""));

  const hasDuplicates = (arr) => {
    const trimmed = arr.map((p) => p.trim().toLowerCase());
    return new Set(trimmed).size !== trimmed.length;
  };

  const handleSubmit = async () => {
    if (!teamAName.trim() || !teamBName.trim()) {
      alert("Please enter both team names.");
      return;
    }
    if (teamAPlayers.some((p) => !p.trim()) || teamBPlayers.some((p) => !p.trim())) {
      alert("Please fill all player names.");
      return;
    }
    if (hasDuplicates(teamAPlayers)) {
      alert("Duplicate player names in Team A are not allowed.");
      return;
    }
    if (hasDuplicates(teamBPlayers)) {
      alert("Duplicate player names in Team B are not allowed.");
      return;
    }

    const data = {
      teamAName: teamAName.trim(),
      teamBName: teamBName.trim(),
      teamAPlayers: teamAPlayers.map((p) => p.trim()),
      teamBPlayers: teamBPlayers.map((p) => p.trim()),
    };

    try {
      const res = await axios.post("http://localhost:5000/api/team-setup/save", data);
      alert(res.data.message || "Teams saved successfully!");
      setTeamSaveSuccess(true);
    } catch (err) {
      console.error(err);
      alert("Error saving team data.");
    }
  };

  const handleNext = () => {
    if (teamSaveSuccess) {
      navigate("/matchsetup", {
        state: { teamAName, teamBName, teamAPlayers, teamBPlayers },
      });
    } else {
      alert("Please save the teams before proceeding.");
    }
  };

  return (
    <div className="team-setup-page">
      <h2>Team Setup</h2>
      <div className="team-setup-container">
        <TeamCard
          teamName={teamAName}
          setTeamName={setTeamAName}
          players={teamAPlayers}
          setPlayers={setTeamAPlayers}
          label="Team A"
        />

        <div className="center-image">
          <img src={centerImg} alt="Center" />
        </div>

        <TeamCard
          teamName={teamBName}
          setTeamName={setTeamBName}
          players={teamBPlayers}
          setPlayers={setTeamBPlayers}
          label="Team B"
        />
      </div>

      <div className="button-group">
        <div className="back-button">
          <BackButton />
        </div>
        <button className="submit-button" onClick={handleSubmit}>
          Save Teams
        </button>
        <button
          className="next-button"
          onClick={handleNext}
          disabled={!teamSaveSuccess}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TeamSetupPage;
