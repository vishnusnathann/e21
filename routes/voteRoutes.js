const express = require('express');
const pool = require('../config/db');
const Vote = require('../models/Vote');
const voteRoutes = express.Router();
const hash = require('object-hash');
const requestIp = require('request-ip');
const csrf = require('csurf');
const e = require('express');
const csrfProtection = csrf({  cookie: {
    key: 'H#^$*D&E&*F@HF',
    httpOnly: true,
    maxAge: 90 // 1-hour
} })



voteRoutes.get('/csrf', csrfProtection, function (req, res) {
    
    res.status(200).json({ csrfToken: req.csrfToken() });
})

voteRoutes.post("/add_vote" ,csrfProtection,async (req,res) => {

    let {voter_id,party_id,alliance_id,constituency_id,
        candidate_name,datetime,browser_name,os_name,os_version,
        device_platform,voter_ip} = req.body;


        console.log(req.body);

    let voter_uid = await hash({
        voter_id:voter_id,
        ip:voter_ip
    });


    const voterIdCheckPromise = new Promise((resoleve,rej)=>{
        try{
            pool.query(Vote.checkVotedId(),[voter_uid]).then((respone)=>{

                console.log("----",respone.rows[0].exists);

                if(respone.rows[0].exists)
                    resoleve(true)
                else
                    resoleve(false)
            })
        }
        catch(e){
            rej(e);
        }
        
    });

    voterIdCheckPromise.then(result=>{

        console.log(typeof result);
        
        if(!result){
            try {
                pool.query(Vote.addVote(),[voter_uid,party_id,alliance_id,constituency_id,
                    candidate_name,datetime,browser_name,os_name,os_version,
                    device_platform,voter_ip]).then((response)=>{
                        res.status(200).json({vote_done:true,type:'sucess'})
                    });
            } catch (err) {
                console.log(err);
            }
        }
        else{
            res.status(200).json({vote_done:false,type:'sucess'})
        }
    }).catch(e=>{
        res.status(500).json({type:'error'})
    })


    
})
module.exports =  voteRoutes;