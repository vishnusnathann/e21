import React, { useEffect, useState } from 'react';
import { CONSTITUENCY } from '../Constants';
import makeAnimated from 'react-select/animated';
import './ConstituencySelect.css';
import Select from 'react-select';
import { Link } from 'react-router-dom';


const ConstituencySelect = (props) => {

    let constituencyOptions = [];

    const animatedComponents = makeAnimated();

    const [selectedConstituency, setselectedConstituency] = useState('');


    // const customStyles = {

        
    // }

    useEffect(() => {


        if(localStorage.getItem("e21_vote_cast"))
            props.history.push("/vote_casted");

        CONSTITUENCY.sort().map((contituency)=>{
            constituencyOptions.push({
                value:contituency,
                label:contituency
            })
        })
    })

    const handleChange  = (contituency) =>{
        setselectedConstituency(contituency);
        if(contituency)
            props.setSelectedConstituency(contituency.value);
        else
            props.setSelectedConstituency('');
            
        console.log(contituency);
    }

    return (
        <div className="constituency-select-container">
            <h1>Choose your Constituency</h1>
            <div className="select-action-container">
                <div className="select-wrapper">
                    <Select
                        isClearable
                        components={animatedComponents}
                        value={selectedConstituency}
                        onChange={handleChange}
                        options={constituencyOptions}
                        className='select'
                        
                    />
                </div>
                <div>
                    {
                        selectedConstituency ?
                        <Link to="/vote">
                            <button onClick={()=>props.setConstituencySelectFlag(true)} className="go-vote-button">
                                Go Vote
                            </button>
                        </Link>
                            :
                            <button disabled={selectedConstituency} className="go-vote-button">
                                Go Vote
                            </button>
                    }
                </div>
            </div>
            

        </div>
    )
}

export default ConstituencySelect;
