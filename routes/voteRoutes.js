const express = require('express');
const pool = require('../config/db');
const Vote = require('../models/Vote');
const voteRoutes = express.Router();


voteRoutes.post("/add_vote",async (req,res) => {
    
    let {voter_id,party_id,alliance_id,constituency_id,
        candidate_name,datetime,browser_namr,os_name,os_version,
        device_platform,voter_ip} = req.body;

        console.log(req.body);

    try {
		pool.query(Vote.addVote(),[voter_id,party_id,alliance_id,constituency_id,
            candidate_name,datetime,browser_namr,os_name,os_version,
            device_platform,voter_ip]).then((response)=>{
                res.status(200).json({type:'success'})
            });
	} catch (err) {
		console.log(err);
	}
    
})
module.exports =  voteRoutes;