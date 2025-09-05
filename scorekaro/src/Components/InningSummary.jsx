import React, { useState } from "react";
import "../styles/InningSummary.css";

const FullScorecard = () => {
  const [expanded, setExpanded] = useState(false);

  // Dummy data (replace with backend API data)
  const match = {
    teamA: "Warriors",
    teamB: "Titans",
    venue: "Wankhede Stadium",
    date: "August 2, 2025",
    innings: [
      {
        battingTeam: "Warriors",
        batting: [
          { name: "Player A1", runs: 45, balls: 30 },
          { name: "Player A2", runs: 33, balls: 27 },
          { name: "Player A3", runs: 10, balls: 15 },
        ],
        bowling: [
          { name: "Bowler B1", overs: 4, runs: 25, wickets: 2 },
          { name: "Bowler B2", overs: 4, runs: 30, wickets: 1 },
        ],
      },
      {
        battingTeam: "Titans",
        batting: [
          { name: "Player B1", runs: 60, balls: 35 },
          { name: "Player B2", runs: 20, balls: 18 },
        ],
        bowling: [
          { name: "Bowler A1", overs: 4, runs: 35, wickets: 3 },
          { name: "Bowler A2", overs: 3, runs: 22, wickets: 0 },
        ],
      },
    ],
  };

  return (
    <div className="full-scorecard">
      <div className="match-summary">
        <h2>{match.teamA} vs {match.teamB}</h2>
        <p>{match.date} | {match.venue}</p>
        <button onClick={() => setExpanded(!expanded)}>
          {expanded ? "Hide Full Scorecard" : "View Full Scorecard"}
        </button>
      </div>

      {expanded && (
        <div className="innings-container">
          {match.innings.map((inning, index) => (
            <div className="inning-card" key={index}>
              <h3>{inning.battingTeam} Innings</h3>

              <div className="section">
                <h4>Batting</h4>
                {inning.batting.map((player, i) => (
                  <p key={i}>
                    {player.name} – {player.runs} ({player.balls} balls)
                  </p>
                ))}
              </div>

              <div className="section">
                <h4>Bowling</h4>
                {inning.bowling.map((bowler, i) => (
                  <p key={i}>
                    {bowler.name} – {bowler.overs} overs, {bowler.runs} runs, {bowler.wickets} wickets
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TODO: Replace dummy data with backend API call */}
    </div>
  );
};

export default FullScorecard;
