import React from 'react';
import './WebShare.css';
import {isMobile} from "react-device-detect"; 

const WebShare = () => {

    const onShare =()=>{
        if (navigator.share) {
            //console.log("hai");
            navigator.share({
                title: "Kerala Virtual elections",
                text:`LDF ന് തുടർഭരണം ഉണ്ടാവുമോ? അതോ UDF ഭരണം തിരിച്ചു പിടിക്കുമോ? BJP എത്ര സീറ്റ്‌ വരെ നേടും?
ഇന്ന് തന്നെ നിങ്ങളുടെ അഭിപ്രായം രേഖപ്പെടുത്തു...

Kerala Virtual Election 2021 Survey - Be part of the largest election survey of the state.
Click on the link to participate.`,
                url: "https://kerala.virtualelections.live"
            });
        }
        else{
            //console.log("sorry")
        }
    }

    
        return (
            <>
                {
                    (isMobile && navigator.share)?
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

