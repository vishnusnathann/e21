import React, { useEffect, useRef, useState } from 'react';
import './FinalAnnotation.css';
import Confetti from 'react-canvas-confetti';
import { HiSpeakerphone } from "react-icons/hi";

const FinalAnnotation = (props) => {

    const ref = useRef(false);
    
    const style = {
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        zIndex: -1
    };
    
    const [fire, setfire] = useState(false);
    const [reset, setreset] = useState(false);

useEffect(() => {

    if(!localStorage.getItem("e21_vote_cast"))
        props.history.push("/");
    else{
        setTimeout(() => {
            
            if(localStorage.getItem("attempts")===null)
                localStorage.setItem("attempts", 1);
            else
                localStorage.setItem("attempts", parseInt(localStorage.getItem("attempts"))+1);
        }, 0);

        setTimeout(() => {
            setfire(!fire );
        }, 200);
    }
    


    
}, [])
        
    


    return (
        <div className="final-annotation-container" 
        onClick={()=>{
            setfire(!fire)
        }}
        >
            <Confetti
                style={style}
                className={'confetti'}
                particleCount={700}
                fire={fire}
                resize={true}
                shapes={['circle', 'circle', 'square']}
                origin={{
                    x:0,
                    y:0
                    }}
                ticks={500}
                startVelocity={55}
                scalar={0.8}
                gravity={.9}
                angle={180}
                spread={360}
            />

            <Confetti
                style={style}
                className={'confetti'}
                particleCount={700}
                fire={fire}
                resize={true}
                shapes={['circle', 'circle', 'square']}
                origin={{
                    x:1,
                    y: 0
                    }}
                ticks={500}
                startVelocity={55}
                scalar={0.8}
                gravity={.9}
                angle={180}
                spread={360}
            />
            <Confetti
                style={style}
                className={'confetti'}
                particleCount={700}
                fire={fire}
                resize={true}
                shapes={['circle', 'circle', 'square']}
                origin={{
                    x:0,
                    y: 1
                    }}
                ticks={500}
                startVelocity={55}
                scalar={0.8}
                gravity={.9}
                angle={180}
                spread={360}
            />
            <Confetti
                style={style}
                className={'confetti'}
                particleCount={700}
                fire={fire}
                resize={true}
                shapes={['circle', 'circle', 'square']}
                origin={{
                    x:1,
                    y:1
                    }}
                ticks={500}
                startVelocity={55}
                scalar={0.8}
                gravity={.9}
                angle={180}
                spread={360}
                zIndex={9999}
            />

                <div className="annotation-card">
                    <img src={'./voteicon.jpg'} className="final-annotation-icon"/>
                    {
                    
                        parseInt(localStorage.getItem("attempts"))>1 ?
                        <div className="annotation-text-container">
                            <h1 className="fade-in-fwd">
                                You have already voted!
                            </h1>
                            <small><HiSpeakerphone/> Results will be announced on <b>7th April 2021</b></small>
                        </div>
                        :
                        <div  className="annotation-text-container">
                            <h1 className="fade-in-fwd">
                                Thank you for Voting!
                            </h1>
                            <small><HiSpeakerphone/> Results will be announced on <b>7th April 2021</b></small>
                        </div>
                        
                    }
                </div>
            
            
        </div>
    )
}

export default FinalAnnotation