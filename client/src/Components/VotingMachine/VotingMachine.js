import React, { useEffect, useState } from 'react';
import './VotingMachine.css';
import { BsCircleFill } from "react-icons/bs";
import { candidateData } from '../Constants';
import Bowser from "bowser";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { baseURL } from '../../config';

const VotingMachine = (props) => {

    const [voterContituencyObject, setVoterContituencyObject] = useState(null);
    const [notaSelected, setNotaSelected] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [voteData, setVoteData] = useState({});

    let audio = new Audio("/beep.mp3")

    useEffect(() => {

        let obj = candidateData.find(o => o.constituency_name === props.selectedConstituency);
        console.log(obj);

        setVoterContituencyObject(obj);

    }, []);
    

    const onVoteSubmit = async (candidateDetails,index) =>{

        await setSelectedIndex(index);

        let userInfo = await Bowser.parse(window.navigator.userAgent);
        
        // audio.play()

        if(index  === -1){
            await axios.post(`${baseURL}/api/vote/add_vote`, 
            {
                    voter_id: uuidv4(),
                    party_id:32,
                    alliance_id: 4,
                    constituency_id: voterContituencyObject.constituency_id,
                    candidate_name:'NOTA',
                    datetime:new Date(),
                    browser_name:userInfo.browser.name,
                    os_name:userInfo.os.name,
                    os_version:userInfo.os.version,
                    device_platform:userInfo.platform.type
                }
            );
        }
        else{

            await axios.post(`${baseURL}/api/vote/add_vote`, 
            {
                voter_id: uuidv4(),
                party_id:candidateDetails.party_id,
                alliance_id: ((index+1) > 3 ? 4 : index+1),
                constituency_id: voterContituencyObject.constituency_id,
                candidate_name:candidateDetails.candidate_name,
                datetime:new Date(),
                browser_name:userInfo.browser.name,
                os_name:userInfo.os.name,
                os_version:userInfo.os.version,
                device_platform:userInfo.platform.type
            });
            
            if(notaSelected)
                setNotaSelected(false)
            }

        

        
        
    }

    return (
        <div className="voting-machine-container">
            <div className="top-unit">
                Ready <BsCircleFill className="ready-icon"/>
            </div>
            <div className="action-unit">
                
                {
                    voterContituencyObject &&
                    
                    voterContituencyObject.candidates.map((item,index)=>{
                        return(
                            <div className="candidate" key={index}>
                                <div className="candidate-details">
                                    <div className="candiate-name">
                                        {`${index+1} ${item.candidate_name}`}
                                    </div>
                                    <div className="election-symbol">
                                        <img src={`/e21Symbols/${item.party_code}.png`} alt={item.party_code}/>
                                    </div>  
                                </div>  
                                <div className="ballot-unit">
                                    <div className={selectedIndex === index?"signal ballot-submit":"signal"}>
                                        <BsCircleFill/>
                                    </div>
                                    <div className="ballot-button" onClick={()=>onVoteSubmit(item,index)}>
                                    </div>
                                </div>
                            </div>
                    )
                    })
                    
                }
                

                {
                    voterContituencyObject &&
                    <div className="candidate">
                        <div className="candidate-details">
                            <div className="candiate-name">
                                {voterContituencyObject.candidates.length+1}. NOTA
                            </div>
                            <div className="election-symbol">
                                <img src={`/e21Symbols/NOTA.png`} alt="NOTA"/>
                            </div>  
                        </div>  
                        <div className="ballot-unit">
                            <div className={notaSelected?"signal ballot-submit":"signal"}>
                                <BsCircleFill />
                            </div>
                            <div className="ballot-button" onClick={async()=>{
                                await setNotaSelected(true)
                                await onVoteSubmit({candidate_name:"NOTA"},-1)
                            }
                                }>

                            </div>
                        </div>
                    </div>
                }

                
                
            </div>
        </div>
    )
}

export default VotingMachine
