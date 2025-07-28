import React, { useState } from "react";
import "../styles/MatchSetup.css";
import b from "../assets/b.png";

const MatchSetup = () => {
  const [matchDetails, setMatchDetails] = useState({
    overs: "",
    customOvers: "",
    venue: "",
    ballType: "Leather",
    umpire1: "",
    umpire2: "",
    umpire3: "",
    matchType: "Day",
    tossWinner: "",
    tossDecision: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMatchDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const oversValue =
      matchDetails.overs === "Custom"
        ? matchDetails.customOvers
        : matchDetails.overs;

    const finalData = {
      overs: oversValue,
      venue: matchDetails.venue,
      ballType: matchDetails.ballType,
      matchType: matchDetails.matchType,
      umpire1: matchDetails.umpire1,
      umpire2: matchDetails.umpire2,
      umpire3: matchDetails.umpire3,
      tossWinner: matchDetails.tossWinner,
      tossDecision: matchDetails.tossDecision,
    };

    console.log("Match Setup:", finalData);
    alert("Match setup saved! Check console for data.");
  };

  return (
    <div className="match-setup-page">
      <h2>Match Setup</h2>
      <div className="setup-layout">
        {/* LEFT COLUMN */}
        <div className="left-column">
          {/* Overs */}
          <div className="card">
            <h3>Overs</h3>
            <div className="options">
              {["20", "50", "Test", "Custom"].map((type) => (
                <label key={type}>
                  <input
                    type="radio"
                    name="overs"
                    value={type}
                    checked={matchDetails.overs === type}
                    onChange={handleChange}
                  />{" "}
                  {type}
                </label>
              ))}
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
              {["Leather", "Tennis", "Rubber"].map((type) => (
                <label key={type}>
                  <input
                    type="radio"
                    name="ballType"
                    value={type}
                    checked={matchDetails.ballType === type}
                    onChange={handleChange}
                  />{" "}
                  {type}
                </label>
              ))}
            </div>
          </div>

          {/* Match Type */}
          <div className="card">
            <h3>Match Type</h3>
            <div className="options">
              {["Day", "Day-Night", "Night"].map((type) => (
                <label key={type}>
                  <input
                    type="radio"
                    name="matchType"
                    value={type}
                    checked={matchDetails.matchType === type}
                    onChange={handleChange}
                  />{" "}
                  {type}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER IMAGE */}
        <div className="center-image">
          <img src={b} alt="Cricket" />
        </div>

        {/* RIGHT COLUMN */}
        <div className="right-column">
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
              placeholder="Enter Umpire 1"
              value={matchDetails.umpire1}
              onChange={handleChange}
            />
            <input
              type="text"
              name="umpire2"
              placeholder="Enter Umpire 2"
              value={matchDetails.umpire2}
              onChange={handleChange}
            />
            {matchDetails.umpire2.trim() !== "" && (
              <input
                type="text"
                name="umpire3"
                placeholder="Enter Umpire 3 (Optional)"
                value={matchDetails.umpire3}
                onChange={handleChange}
              />
            )}
          </div>

          {/* Toss Section */}
          <div className="card">
            <h3>Toss</h3>
            <input
              type="text"
              name="tossWinner"
              placeholder="Who won the toss?"
              value={matchDetails.tossWinner}
              onChange={handleChange}
            />
            <select
              name="tossDecision"
              value={matchDetails.tossDecision}
              onChange={handleChange}
            >
              <option value="">Select Decision</option>
              <option value="Bat">Bat</option>
              <option value="Bowl">Bowl</option>
            </select>
          </div>
        </div>
      </div>

      <button className="submit-btn" onClick={handleSubmit}>
       Start Match
      </button>
    </div>
  );
};

export default MatchSetup;
