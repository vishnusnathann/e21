import React from 'react';
import './VotingMachine.css';
import { BsCircleFill } from "react-icons/bs";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const VotingMachine = () => {
    return (
        <div className="voting-machine-container">
            <div className="top-unit">
                Ready <BsCircleFill className="ready-icon"/>
            </div>
            <div className="action-unit">
                <div className="candidate">
                    <div className="candidate-details">
                        <div className="candiate-name">
                            1. Ashams Mathew
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

                <div className="candidate">
                    <div className="candidate-details">
                        <div className="candiate-name">
                            2. Jerin
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
