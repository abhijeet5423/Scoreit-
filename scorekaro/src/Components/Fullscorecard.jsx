import React, { useState } from "react";
import "../styles/Fullscorecard.css"; // Adjust the path as needed

// ===== DUMMY DATA SECTION =====
// Replace this with dynamic data from your backend/database later
const dummyData = [
  {
    teamName: "Team A",
    batting: [
      { player: "Player A1", runs: 45, balls: 30 },
      { player: "Player A2", runs: 12, balls: 20 },
    ],
    bowling: [
      { player: "Player B1", overs: 4, wickets: 2, runs: 22 },
      { player: "Player B2", overs: 3, wickets: 1, runs: 18 },
    ],
  },
  {
    teamName: "Team B",
    batting: [
      { player: "Player B1", runs: 50, balls: 25 },
      { player: "Player B2", runs: 15, balls: 18 },
    ],
    bowling: [
      { player: "Player A1", overs: 4, wickets: 3, runs: 20 },
      { player: "Player A2", overs: 4, wickets: 1, runs: 24 },
    ],
  },
];
// ===== END OF DUMMY DATA =====

const FullScorecard = () => {
  const [expanded, setExpanded] = useState([false, false]);

  // Function to toggle each team's card expansion
  const toggleExpand = (index) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  return (
    <div className="fullscorecard-wrapper">
      <h2 className="scorecard-title">Full Match Scorecard</h2>
      <div className="scorecard-flex">
        {dummyData.map((team, index) => (
          <div className="team-card" key={index}>
            <div className="card-header">
              <h3>{team.teamName} Innings</h3>
              <button
                onClick={() => toggleExpand(index)}
                className="expand-btn"
              >
                {expanded[index] ? "Collapse" : "Expand"}
              </button>
            </div>

            {/* Render batting and bowling tables only if expanded */}
            {expanded[index] && (
              <div className="card-body">
                {/* Batting Table */}
                <div className="score-section">
                  <h4>Batting</h4>
                  <table className="stats-table">
                    <thead>
                      <tr>
                        <th>Player</th>
                        <th>Runs</th>
                        <th>Balls</th>
                      </tr>
                    </thead>
                    <tbody>
                      {team.batting.map((batsman, i) => (
                        <tr key={i}>
                          <td>{batsman.player}</td>
                          <td>{batsman.runs}</td>
                          <td>{batsman.balls}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Bowling Table */}
                <div className="score-section">
                  <h4>Bowling</h4>
                  <table className="stats-table">
                    <thead>
                      <tr>
                        <th>Player</th>
                        <th>Overs</th>
                        <th>Wickets</th>
                        <th>Runs</th>
                      </tr>
                    </thead>
                    <tbody>
                      {team.bowling.map((bowler, i) => (
                        <tr key={i}>
                          <td>{bowler.player}</td>
                          <td>{bowler.overs}</td>
                          <td>{bowler.wickets}</td>
                          <td>{bowler.runs}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FullScorecard;
