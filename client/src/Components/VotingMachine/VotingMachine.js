import React, { useEffect, useState } from 'react';
import './VotingMachine.css';
import { BsCircleFill } from "react-icons/bs";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { candidateData } from '../Constants';

const VotingMachine = (props) => {

    const [voterContituencyObject, setVoterContituencyObject] = useState(null);

    useEffect(() => {
        
        
        let obj = candidateData.find(o => o.constituency_name === props.selectedConstituency);
        
        console.log(obj);

        setVoterContituencyObject(obj);

    }, []);
    

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
                            <div className="candidate">
                            <div className="candidate-details">
                                <div className="candiate-name">
                                    {`${index+1} ${item.candidate_name}`}
                                </div>
                                <div className="election-symbol">

                                </div>  
                            </div>  
                            <div className="ballot-unit">
                                <div className="signal">
                                    <BsCircleFill/>
                                </div>
                                <div className="ballot-button">

                                </div>
                            </div>
                        </div>
                    )
                    })
                }
                

                <div className="candidate">
                    <div className="candidate-details">
                        <div className="candiate-name">
                            4. Nota
                        </div>
                        <div className="election-symbol">

                        </div>  
                    </div>  
                    <div className="ballot-unit">
                        <div className="signal">
                            <BsCircleFill />
                        </div>
                        <div className="ballot-button">

                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default VotingMachine
