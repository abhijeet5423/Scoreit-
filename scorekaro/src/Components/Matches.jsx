import React from "react";
import "../styles/Matches.css"; // Temporary CSS import, replace when integrating backend

const matches = [
  {
    id: 1,
    teamA: "Warriors",
    teamB: "Titans",
    winner: "Warriors",
    by: "6 wickets",
    score: "Warriors: 145/4, Titans: 144 all out"
  },
  {
    id: 2,
    teamA: "Strikers",
    teamB: "Blasters",
    winner: "Blasters",
    by: "15 runs",
    score: "Strikers: 170/8, Blasters: 185/6"
  },
  {
    id: 3,
    teamA: "Riders",
    teamB: "Kings",
    winner: "Kings",
    by: "2 wickets",
    score: "Riders: 132/9, Kings: 135/8"
  }
];

const Matches = () => {
  return (
    <div className="matches-page-container-temp"> {/* Replace with: className="matches-page-container" */}
      <h2 className="matches-page-title-temp">Past Matches</h2> {/* Replace with: className="matches-page-title" */}
      <div className="matches-card-grid-temp"> {/* Replace with: className="matches-card-grid" */}
        {matches.map((match) => (
          <div className="matches-card-temp" key={match.id}> {/* Replace with: className="matches-card" */}
            <p className="matches-summary-temp">
              {match.winner} won the match by {match.by}
            </p>
            <div className="matches-scorecard-temp">
              <strong>Scorecard:</strong>
              <p>{match.score}</p>
            </div>
            <button className="view-scorecard-btn-temp">View Full Scorecard</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Matches;
