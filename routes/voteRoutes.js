const express = require('express');
const pool = require('../config/db');
const Vote = require('../models/Vote');
const voteRoutes = express.Router();

const requestIp = require('request-ip');

const ipMiddleware = function(req, res, next) {
    req.clientIp = requestIp.getClientIp(req); 
    next();
};
 

voteRoutes.post("/add_vote",ipMiddleware ,async (req,res) => {
    
    let {voter_id,party_id,alliance_id,constituency_id,
        candidate_name,datetime,browser_name,os_name,os_version,
        device_platform} = req.body;


    try {
		pool.query(Vote.addVote(),[voter_id,party_id,alliance_id,constituency_id,
            candidate_name,datetime,browser_name,os_name,os_version,
            device_platform,req.clientIp]).then((response)=>{
                res.status(200).json({type:'success'})
            });
	} catch (err) {
		console.log(err);
	}
    
})
module.exports =  voteRoutes;