// routes/scoringRoutes.js
const express = require("express");
const router = express.Router();
const Scoring = require("../models/Scoring");
const MatchSetup = require("../models/MatchSetup");
const TeamSetup = require("../models/TeamSetup");


// 🎯 1️⃣ Start Scoring (Inning 1)
router.post("/start", async (req, res) => {
  try {
    const { matchId, teamSetupId, battingTeam, bowlingTeam } = req.body;

    const match = await MatchSetup.findById(matchId);
    const teamSetup = await TeamSetup.findById(teamSetupId);

    if (!match || !teamSetup) {
      return res.status(404).json({ error: "Match or Teams not found" });
    }

    const scoring = new Scoring({
      matchId,
      teamSetupId,
      innings: [
        {
          battingTeam,
          bowlingTeam,
          runs: 0,
          wickets: 0,
          overs: 0,
          balls: 0,
          oversDetail: [],
          batsmen: [],
          bowlers: [],
          extras: { wides: 0, noBalls: 0, legByes: 0, byes: 0 },
          fallOfWickets: [],
          commentary: [],
        },
      ],
      currentInnings: 1,
      currentOver: 0,
      currentBall: 0,
      matchCompleted: false,
    });

    await scoring.save();
    res.status(201).json(scoring);
  } catch (err) {
    console.error("Error starting scoring:", err.message);
    res.status(500).json({ error: err.message });
  }
});


// 🎯 2️⃣ Save / Update Over Data
router.put("/:id/over-update", async (req, res) => {
  try {
    const { overNumber, balls, runs, wickets, batsmen, bowlers } = req.body;
    const scoring = await Scoring.findById(req.params.id);

    if (!scoring) return res.status(404).json({ error: "Scoring not found" });

    let inning = scoring.innings[scoring.currentInnings - 1];

    // ✅ Check if over already exists — update or push new
    const existingOver = inning.oversDetail.find(o => o.overNumber === overNumber);
    if (existingOver) {
      existingOver.balls = balls;
    } else {
      inning.oversDetail.push({ overNumber, balls });
    }

    // ✅ Update current inning summary
    inning.runs = runs;
    inning.wickets = wickets;
    inning.overs = overNumber;
    inning.balls = balls.length;
    inning.batsmen = batsmen;
    inning.bowlers = bowlers;

    // ✅ Update scoring progress
    scoring.currentOver = overNumber;
    scoring.currentBall = balls.length;

    await scoring.save();
    res.status(200).json({
      message: `✅ Over ${overNumber} updated successfully.`,
      scoring,
    });
  } catch (err) {
    console.error("Error updating over:", err.message);
    res.status(500).json({ error: err.message });
  }
});


// 🎯 3️⃣ End Inning
router.post("/inning-complete/:id", async (req, res) => {
  try {
    const scoring = await Scoring.findById(req.params.id).populate("teamSetupId");
    if (!scoring) return res.status(404).json({ error: "Scoring not found" });

    if (scoring.currentInnings === 1) {
      const teamSetup = scoring.teamSetupId;
      const firstBatting = scoring.innings[0].battingTeam;
      const secondBatting =
        firstBatting === teamSetup.teamAName ? teamSetup.teamBName : teamSetup.teamAName;
      const secondBowling = firstBatting;

      scoring.innings.push({
        battingTeam: secondBatting,
        bowlingTeam: secondBowling,
        runs: 0,
        wickets: 0,
        overs: 0,
        balls: 0,
        oversDetail: [],
        batsmen: [],
        bowlers: [],
        extras: { wides: 0, noBalls: 0, legByes: 0, byes: 0 },
        fallOfWickets: [],
        commentary: [],
      });

      scoring.currentInnings = 2;
      scoring.currentOver = 0;
      scoring.currentBall = 0;
    }

    await scoring.save();
    res.json({ message: "✅ Inning completed and next inning initialized.", scoring });
  } catch (err) {
    console.error("Error completing inning:", err.message);
    res.status(500).json({ error: err.message });
  }
});


// 🎯 4️⃣ End Match
router.post("/match-complete/:id", async (req, res) => {
  try {
    const scoring = await Scoring.findById(req.params.id);
    if (!scoring) return res.status(404).json({ error: "Scoring not found" });

    const team1 = scoring.innings[0];
    const team2 = scoring.innings[1];

    scoring.matchCompleted = true;

    if (team1.runs > team2.runs) {
      scoring.winner = team1.battingTeam;
      scoring.result = `${team1.battingTeam} won by ${team1.runs - team2.runs} runs`;
    } else if (team2.runs > team1.runs) {
      scoring.winner = team2.battingTeam;
      scoring.result = `${team2.battingTeam} won by ${10 - team2.wickets} wickets`;
    } else {
      scoring.winner = null;
      scoring.result = "Match tied";
    }

    await scoring.save();
    res.json({ message: "✅ Match completed successfully.", scoring });
  } catch (err) {
    console.error("Error completing match:", err.message);
    res.status(500).json({ error: err.message });
  }
});


// 🎯 5️⃣ Get Scoring State by ID
router.get("/:id", async (req, res) => {
  try {
    const scoring = await Scoring.findById(req.params.id)
      .populate("matchId")
      .populate("teamSetupId");

    if (!scoring) return res.status(404).json({ error: "Scoring not found" });

    res.json(scoring);
  } catch (err) {
    console.error("Error fetching scoring:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
