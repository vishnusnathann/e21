import React from 'react';
import './WebShare.css';
import {isMobile} from "react-device-detect"; 

const WebShare = () => {

    const onShare =()=>{
        if (navigator.share) {
            console.log("hai");
            navigator.share({
                title: "Kerala Virtual elections",
                text:"Kerala Virtual Election 2021 - Be part of the largest election survey of the state. Click on the link to participate.",
                url: "https://kerala.virtualelections.live"
            });
        }
        else{
            console.log("sorry")
        }
    }

    
        return (
            <>
                {
                    isMobile ?
                    <div className="web-share-api-container" onClick={()=>onShare()}>
                        <img src={"./share.svg"}/>
                        {/* Share */}
                    </div>
                    :
                    null
                }
            </>
        )
    
}

export default WebShare

