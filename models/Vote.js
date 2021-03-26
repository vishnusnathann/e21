class Vote{
    static checkVotedId(){
        let sql = 'select exists(select 1 from vote where voter_id=$1)';
        return sql;
    }
    static addVote(){
        let sql = 'INSERT INTO vote(voter_id,party_id,alliance_id,constituency_id, \
                    candidate_name,datetime,browser_name,os_name,os_version,device_platform,voter_ip) \
                    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11);';
        return sql;
        }
}

module.exports = Vote;