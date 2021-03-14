import React, { useEffect, useState } from 'react';
import { CONSTITUENCY } from '../Constants';
import makeAnimated from 'react-select/animated';
import './ConstituencySelect.css';
import Select from 'react-select';


const ConstituencySelect = (props) => {

    let constituencyOptions = [];

    const animatedComponents = makeAnimated();

    const [selectedConstituency, setselectedConstituency] = useState('');

    useEffect(() => {

        CONSTITUENCY.map((contituency)=>{
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
            <Select
                isClearable
                components={animatedComponents}
                value={selectedConstituency}
                onChange={handleChange}
                options={constituencyOptions}
            />
        </div>
    )
}

export default ConstituencySelect;
