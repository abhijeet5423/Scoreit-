import React, { useState } from "react";
import "../styles/MatchSetup.css";
import b from "../assets/b.png";

const MatchSetup = () => {
  const [teamAPlayers, setTeamAPlayers] = useState([""]);
  const [teamBPlayers, setTeamBPlayers] = useState([""]);

  const [matchDetails, setMatchDetails] = useState({
    teamA: "",
    teamB: "",
    overs: "",
    customOvers: "",
    venue: "",
    ballType: "Leather",
    umpire1: "",
    umpire2: "",
    umpire3: "",
    matchType: "Day",
    tossWonBy: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMatchDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleTeamAPlayerChange = (index, value) => {
    const updated = [...teamAPlayers];
    updated[index] = value;
    setTeamAPlayers(updated);
  };
  const addPlayerToTeamA = () => setTeamAPlayers([...teamAPlayers, ""]);

  const handleTeamBPlayerChange = (index, value) => {
    const updated = [...teamBPlayers];
    updated[index] = value;
    setTeamBPlayers(updated);
  };
  const addPlayerToTeamB = () => setTeamBPlayers([...teamBPlayers, ""]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const oversValue =
      matchDetails.overs === "Custom" ? matchDetails.customOvers : matchDetails.overs;
    const finalData = {
      teamA: matchDetails.teamA,
      teamB: matchDetails.teamB,
      playersA: teamAPlayers,
      playersB: teamBPlayers,
      overs: oversValue,
      venue: matchDetails.venue,
      ballType: matchDetails.ballType,
      umpire1: matchDetails.umpire1,
      umpire2: matchDetails.umpire2,
      umpire3: matchDetails.umpire3,
      matchType: matchDetails.matchType,
      tossWonBy: matchDetails.tossWonBy
    };
    console.log("Match Setup Data:", finalData);
    alert("Match setup saved! Check console for details.");
  };

  return (
    <div className="match-setup-page">
      <h2>Match Setup</h2>
      <div className="setup-layout">
        {/* LEFT COLUMN */}
        <div className="left-column">
          {/* Team A */}
          <div className="card">
            <h3>Team A</h3>
            <input
              type="text"
              placeholder="Enter Team A Name"
              name="teamA"
              value={matchDetails.teamA}
              onChange={handleChange}
              required
            />
            <div className="players-section">
              <h4>Players</h4>
              {teamAPlayers.map((player, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Player ${index + 1}`}
                  value={player}
                  onChange={(e) => handleTeamAPlayerChange(index, e.target.value)}
                />
              ))}
              <button type="button" className="add-player-btn" onClick={addPlayerToTeamA}>
                + Add Player
              </button>
            </div>
          </div>

          {/* Overs */}
          <div className="card">
            <h3>Overs</h3>
            <div className="options">
              <label>
                <input
                  type="radio"
                  name="overs"
                  value="20"
                  checked={matchDetails.overs === "20"}
                  onChange={handleChange}
                />{" "}
                20
              </label>
              <label>
                <input
                  type="radio"
                  name="overs"
                  value="50"
                  checked={matchDetails.overs === "50"}
                  onChange={handleChange}
                />{" "}
                50
              </label>
              <label>
                <input
                  type="radio"
                  name="overs"
                  value="Test"
                  checked={matchDetails.overs === "Test"}
                  onChange={handleChange}
                />{" "}
                Test
              </label>
              <label>
                <input
                  type="radio"
                  name="overs"
                  value="Custom"
                  checked={matchDetails.overs === "Custom"}
                  onChange={handleChange}
                />{" "}
                Custom
              </label>
            </div>
            {matchDetails.overs === "Custom" && (
              <input
                type="number"
                name="customOvers"
                placeholder="Enter Overs"
                value={matchDetails.customOvers}
                onChange={handleChange}
              />
            )}
          </div>

          {/* Ball Type */}
          <div className="card">
            <h3>Ball Type</h3>
            <div className="options">
              <label>
                <input
                  type="radio"
                  name="ballType"
                  value="Leather"
                  checked={matchDetails.ballType === "Leather"}
                  onChange={handleChange}
                />{" "}
                Leather
              </label>
              <label>
                <input
                  type="radio"
                  name="ballType"
                  value="Tennis"
                  checked={matchDetails.ballType === "Tennis"}
                  onChange={handleChange}
                />{" "}
                Tennis
              </label>
              <label>
                <input
                  type="radio"
                  name="ballType"
                  value="Rubber"
                  checked={matchDetails.ballType === "Rubber"}
                  onChange={handleChange}
                />{" "}
                Rubber
              </label>
            </div>
          </div>

          {/* Match Type */}
          <div className="card">
            <h3>Match Type</h3>
            <div className="options">
              <label>
                <input
                  type="radio"
                  name="matchType"
                  value="Day"
                  checked={matchDetails.matchType === "Day"}
                  onChange={handleChange}
                />{" "}
                Day
              </label>
              <label>
                <input
                  type="radio"
                  name="matchType"
                  value="Day-Night"
                  checked={matchDetails.matchType === "Day-Night"}
                  onChange={handleChange}
                />{" "}
                Day-Night
              </label>
              <label>
                <input
                  type="radio"
                  name="matchType"
                  value="Night"
                  checked={matchDetails.matchType === "Night"}
                  onChange={handleChange}
                />{" "}
                Night
              </label>
            </div>
          </div>
        </div>

        {/* CENTER IMAGE */}
        <div className="center-image">
          <img src={b} alt="Cricket" />
        </div>

        {/* RIGHT COLUMN */}
        <div className="right-column">
          {/* Team B */}
          <div className="card">
            <h3>Team B</h3>
            <input
              type="text"
              placeholder="Enter Team B Name"
              name="teamB"
              value={matchDetails.teamB}
              onChange={handleChange}
              required
            />
            <div className="players-section">
              <h4>Players</h4>
              {teamBPlayers.map((player, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Player ${index + 1}`}
                  value={player}
                  onChange={(e) => handleTeamBPlayerChange(index, e.target.value)}
                />
              ))}
              <button type="button" className="add-player-btn" onClick={addPlayerToTeamB}>
                + Add Player
              </button>
            </div>
          </div>

          {/* Venue */}
          <div className="card">
            <h3>Venue</h3>
            <input
              type="text"
              name="venue"
              placeholder="Enter Venue"
              value={matchDetails.venue}
              onChange={handleChange}
              required
            />
          </div>

          {/* Umpires */}
          <div className="card">
            <h3>Umpires</h3>
            <input
              type="text"
              name="umpire1"
              placeholder="Enter Umpire 1 Name"
              value={matchDetails.umpire1}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="umpire2"
              placeholder="Enter Umpire 2 Name"
              value={matchDetails.umpire2}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="umpire3"
              placeholder="Enter Umpire 3 Name (optional)"
              value={matchDetails.umpire3}
              onChange={handleChange}
            />
          </div>

          {/* Toss */}
          <div className="card">
            <h3>Toss Won By</h3>
            <select
              name="tossWonBy"
              value={matchDetails.tossWonBy}
              onChange={handleChange}
            >
              <option value="">Select Team</option>
              <option value={matchDetails.teamA || "Team A"}>
                {matchDetails.teamA || "Team A"}
              </option>
              <option value={matchDetails.teamB || "Team B"}>
                {matchDetails.teamB || "Team B"}
              </option>
            </select>
          </div>
        </div>
      </div>

      <button type="submit" className="submit-btn" onClick={handleSubmit}>
        Save & Start Match
      </button>
    </div>
  );
};

export default MatchSetup;
