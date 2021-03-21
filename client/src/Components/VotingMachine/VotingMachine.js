import React, { useEffect, useState } from 'react';
import './VotingMachine.css';
import { BsCircleFill } from "react-icons/bs";
import { candidateData } from '../Constants';
import Bowser from "bowser";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { baseURL } from '../../config';
import DeviceDetector from "device-detector-js";
import {
    mobileVendor,mobileModel,getUA
  } from "react-device-detect"; 


const VotingMachine = (props) => {

    const [voterContituencyObject, setVoterContituencyObject] = useState(null);
    const [notaSelected, setNotaSelected] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [voteSubmitted, setVoteSubmitted] = useState(false);
    const [voteData, setVoteData] = useState({});
    

    const deviceDetector = new DeviceDetector();
    const userAgent = getUA;
    const device = deviceDetector.parse(userAgent);

    let audio = new Audio("/beep.mp3")

    useEffect(() => {

        console.log("device details",device);

        if(!props.selectedConstituency){
            props.history.push("/");
        }

        let obj = candidateData.find(o => o.constituency_name === props.selectedConstituency);
        console.log(obj);

        setVoterContituencyObject(obj);

       

    }, []);
    

    const onVoteSubmit = async (candidateDetails,index) =>{

        setVoteSubmitted(true);

        await setSelectedIndex(index);

        let userInfo = await Bowser.parse(window.navigator.userAgent);
        
        console.log(userInfo);

        audio.play()

        let payload = {};

        if(index  === -1){

            payload = {
                voter_id: uuidv4(),
                party_id:32,
                alliance_id: 4,
                constituency_id: voterContituencyObject.constituency_id,
                candidate_name:'NOTA',
                datetime:new Date().toLocaleString(),
                browser_name:userInfo.browser.name,
                os_name:userInfo.os.name,
                os_version:userInfo.os.version,
                device_platform:userInfo.platform.type
            }
        }
        else{
            payload = {
                voter_id: uuidv4(),
                party_id:candidateDetails.party_id,
                alliance_id: candidateDetails.alliance ? candidateDetails.alliance : 4,
                constituency_id: voterContituencyObject.constituency_id,
                candidate_name:candidateDetails.candidate_name,
                datetime:new Date().toLocaleString(),
                browser_name:userInfo.browser.name,
                os_name:userInfo.os.name,
                os_version:userInfo.os.version,
                device_platform:userInfo.platform.type
            }
            
            if(notaSelected)
                setNotaSelected(false)
            }

            await axios.post(`${baseURL}/api/vote/add_vote`,payload).then(response =>{
                if(response.data.type = 'success'){

                    localStorage.setItem("e21_vote_cast", true);

                    setTimeout(() => {
                        props.history.push("/vote_casted");
                    }, 1000);
                    
                }
            });
        

        
        
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
                                        <span className="candidate-order-number">{index+1}</span>{` ${item.candidate_name}`}
                                    </div>
                                    <div className="election-symbol">
                                        <img src={`/e21Symbols/${item.party_code}.png`} alt={item.party_code}/>
                                    </div>  
                                </div>  
                                <div className="ballot-unit">
                                    <div className={selectedIndex === index?"signal ballot-submit":"signal"}>
                                        <BsCircleFill/>
                                    </div>
                                    <button className="ballot-button" disabled={voteSubmitted} onClick={()=>onVoteSubmit(item,index)}>
                                    </button>
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
                                <span className="candidate-order-number">{voterContituencyObject.candidates.length+1}</span> NOTA
                            </div>
                            <div className="election-symbol">
                                <img src={`/e21Symbols/NOTA.png`} alt="NOTA"/>
                            </div>  
                        </div>  
                        <div className="ballot-unit">
                            <div className={notaSelected?"signal ballot-submit":"signal"}>
                                <BsCircleFill />
                            </div>
                            <button className="ballot-button"
                                disabled={voteSubmitted}
                                onClick={async()=>{
                                    await setNotaSelected(true)
                                    await onVoteSubmit({candidate_name:"NOTA"},-1)
                                }
                                }>

                            </button>
                        </div>
                    </div>
                }

                
                
            </div>
        </div>
    )
}

export default VotingMachine
