class Vote{
    static addVote(){
        let sql = 'INSERT INTO vote(voter_id,party_id,alliance_id,constituency_id, \
                    candidate_name,datetime,browser_namr,os_name,os_version,device_platform,voter_ip) \
                    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11);';
        return sql;
        }
}

module.exports = Vote;