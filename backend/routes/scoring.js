const express = require("express");
const router = express.Router();
const Scoring = require("../models/Scoring");
const MatchSetup = require("../models/MatchSetup");
const TeamSetup = require("../models/TeamSetup");

// 🎯 Start scoring
router.post("/start", async (req, res) => {
  try {
    const { matchId, teamSetupId, battingTeam } = req.body;

    const match = await MatchSetup.findById(matchId);
    const teamSetup = await TeamSetup.findById(teamSetupId);

    if (!match || !teamSetup) {
      return res.status(404).json({ error: "Match or Teams not found" });
    }

    const scoring = new Scoring({
      matchId,
      teamSetupId,
      innings: [{ team: battingTeam, overs: [] }],
      matchCompleted: false
    });

    await scoring.save();
    res.status(201).json(scoring);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🎯 Update ball
router.post("/ball", async (req, res) => {
  try {
    const { scoringId, runs, wicket, extra } = req.body;

    const scoring = await Scoring.findById(scoringId)
      .populate("matchId")
      .populate("teamSetupId");

    if (!scoring) return res.status(404).json({ error: "Scoring not found" });

    if (scoring.matchCompleted) {
      return res.status(400).json({ error: "Match already completed" });
    }

    const match = scoring.matchId;
    const teamSetup = scoring.teamSetupId;

    let innings = scoring.innings[scoring.currentInnings - 1];
    let over = innings.overs.find(o => o.overNumber === scoring.currentOver);

    if (!over) {
      over = { overNumber: scoring.currentOver, balls: [] };
      innings.overs.push(over);
    }

    over.balls.push({
      ballNumber: scoring.currentBall,
      runs,
      wicket,
      extra
    });

    innings.totalRuns += runs;
    if (wicket) innings.wickets += 1;

    // Handle ball/over progression
    if (scoring.currentBall === 6) {
      scoring.currentBall = 1;
      scoring.currentOver += 1;
    } else {
      scoring.currentBall += 1;
    }

    // 🔄 Check if innings should end
    const maxOvers = match.overs;
    const maxWickets = 10;

    const oversBowled = scoring.currentOver - 1;
    const allOversDone = oversBowled >= maxOvers;
    const allWicketsLost = innings.wickets >= maxWickets;

    if ((allOversDone || allWicketsLost)) {
      if (scoring.currentInnings === 1) {
        // 👉 Switch to second innings
        let nextTeam =
          innings.team === teamSetup.teamAName
            ? teamSetup.teamBName
            : teamSetup.teamAName;

        scoring.innings.push({ team: nextTeam, overs: [], totalRuns: 0, wickets: 0 });
        scoring.currentInnings = 2;
        scoring.currentOver = 1;
        scoring.currentBall = 1;
      } else {
        // 👉 Match is completed
        scoring.matchCompleted = true;

        const team1 = scoring.innings[0];
        const team2 = scoring.innings[1];

        if (team1.totalRuns > team2.totalRuns) {
          scoring.winner = team1.team;
          scoring.result = `${team1.team} won by ${team1.totalRuns - team2.totalRuns} runs`;
        } else if (team2.totalRuns > team1.totalRuns) {
          scoring.winner = team2.team;
          scoring.result = `${team2.team} won by ${10 - team2.wickets} wickets`;
        } else {
          scoring.winner = "Draw";
          scoring.result = "Match tied";
        }
      }
    }

    await scoring.save();
    res.json(scoring);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🎯 Get live score
router.get("/:id", async (req, res) => {
  try {
    const scoring = await Scoring.findById(req.params.id)
      .populate("matchId")
      .populate("teamSetupId");
    res.json(scoring);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
