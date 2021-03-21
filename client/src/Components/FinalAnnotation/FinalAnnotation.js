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
    }, 500);
}, [])
        
    


    return (
        <div className="final-annotation-container" 
        onClick={()=>{
            setfire(!fire)
        }}
        >
            <Confetti
                style={style}
                className={'yourClassName'}
                particleCount={700}
                fire={fire}
                resize={true}
                shapes={['circle', 'circle', 'square']}
                origin={{
                    x:.5,
                    y: .5
                    }}
                ticks={700}
                startVelocity={55}
                scalar={0.8}
                gravity={.6}
                // angle={90}
                spread={360}
            />

            {/* <Confetti
                style={style}
                className={'yourClassName'}
                particleCount={700}
                fire={fire}
                ticks={120}
                // onReset={reset}
                shapes={['circle', 'circle', 'square']}
                origin={{
                    x: .9,
                    y: .1
                    }}
                scalar={0.9}
                gravity={.6}
                angle={90}
                spread={360}
            /> */}

                

            Thank you for voting
        </div>
    )
}

export default FinalAnnotation