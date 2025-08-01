const express = require('express');
const router = express.Router();
const TeamManage = require('../models/TeamManage' );       
const TeamSetup = require('../models/TeamSetup.js');

router.post('/save', async (req, res) =>{
    try {
        const teamSetup = new TeamSetup(req.body);
        await teamSetup.save();
        res.status(201).json(teamSetup);
    } catch (error) {
        res.status(500).json({ message: 'Error saving team setup', error });
    }           

});
module.exports = router;