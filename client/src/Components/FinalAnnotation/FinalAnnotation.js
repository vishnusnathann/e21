import React, { useEffect, useRef, useState } from 'react';
import './FinalAnnotation.css';
import Confetti from 'react-canvas-confetti';

const FinalAnnotation = () => {
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
    
    setTimeout(() => {
        setfire(!fire );
    }, 200);

    setTimeout(() => {
        localStorage.setItem("e21_vote_done", true);
    }, 1500);
    
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

                <img src={'./vote.png'} />
                {
                    localStorage.getItem("e21_vote_done") ?
                    <h1 className="fade-in-fwd">
                        You have already voted!
                    </h1>
                    :
                    <h1 className="fade-in-fwd">
                        Thank you for Voting!
                    </h1>
                }
            
            
        </div>
    )
}

export default FinalAnnotation