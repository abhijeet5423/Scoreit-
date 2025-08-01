import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/InningSummary.css"; // Make sure this CSS is for this component only

const InningSummary = () => {
  const navigate = useNavigate();

  const teamA = "Team Alpha";
  const teamB = "Team Bravo";
  const inning = 1;
  const score = 120;
  const overs = "15.2";
  const wickets = 3;
  const runRate = 7.83;
  const topScorer = "John Doe - 56 (34)";
  const topPerformerBat = "Alex Smith - 45 (28)";
  const topPerformerBall = "Tom Lee - 3/20";
  const mostWickets = "Tom Lee - 3 wickets";
  const bestFielder = "Chris Jordan - 2 catches";

  return (
    <div className="inning-summary-container">
      <div className="match-card">
        <h2>{teamA} vs {teamB}</h2>
        <h3>Inning: {inning}</h3>
        <p className="score">{score}/{wickets} in {overs} overs</p>
        <p className="run-rate">Run Rate: {runRate}</p>
      </div>

      <div className="summary-card">
        <h4>Top Scorer:</h4>
        <p>{topScorer}</p>

        <h4>Top Performer (Batting):</h4>
        <p>{topPerformerBat}</p>

        {inning > 1 && (
          <>
            <h4>Top Performer (Bowling):</h4>
            <p>{topPerformerBall}</p>

            <h4>Most Wickets:</h4>
            <p>{mostWickets}</p>

            <h4>Best Fielder:</h4>
            <p>{bestFielder}</p>
          </>
        )}
      </div>

      <div className="summary-buttons">
        <button onClick={() => navigate("/scorecard")}>View Full Scorecard</button>
        {inning === 1 ? (
          <button>Start Next Inning</button>
        ) : (
          <button>End Match</button>
        )}
      </div>
    </div>
  );
};

export default InningSummary;
