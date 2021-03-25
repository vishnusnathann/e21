import React from 'react';
import './Loader.css';
import PuffLoader from "react-spinners/PuffLoader";

const Loader = () => {
    const loading = true;
    return (
        <div className="loader">
            <PuffLoader color={'#407fb4'} loading={loading}/>
        </div>
    )
}

export default Loader