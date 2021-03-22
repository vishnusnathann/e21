import React, { useEffect, useState } from 'react';
import { CONSTITUENCY, DISTRICT } from '../Constants';
import makeAnimated from 'react-select/animated';
import './ConstituencySelect.css';
import Select, { components } from 'react-select';
import { Link } from 'react-router-dom';
import { FaVoteYea } from "react-icons/fa";


const ConstituencySelect = (props) => {

    // let constituencyOptions = [];
    let districtOptions = [];

    const [constituencyOptions, setConstituencyOptions] = useState([]);

    const [selectDistrict, setSelectDistrict] = useState(null);

    const animatedComponents = makeAnimated();

    const [selectedConstituency, setselectedConstituency] = useState(null);

    


    const IndicatorsContainer = props => {
        return (
        <div style={{  }}>
            <components.IndicatorsContainer {...props} />
            <components.IndicatorSeparator {...props} />    
        </div>
        );
        };

    useEffect(() => {

        console.log("hai iam working")

        setConstituencyOptions([]);

        CONSTITUENCY.sort((a,b)=> {return (a.constituency > b.constituency) ? 1 : ((b.constituency > a.constituency) ? -1 : 0);} ).map((item)=>{  
            
            if(selectDistrict == null){
                setConstituencyOptions(constituencyOptions => [...constituencyOptions,{
                    value:item.constituency,
                    label:item.constituency
                }])
                
            }
            else{
                if(selectDistrict.value == item.district){
                    console.log(item.constituency)
                    setConstituencyOptions(constituencyOptions => [...constituencyOptions,{
                        value:item.constituency,
                        label:item.constituency
                    }])
                }
            }
        })

    },[selectDistrict])


    useEffect(() => {

        if(localStorage.getItem("e21_vote_cast"))
            props.history.push("/vote_casted");

        DISTRICT.sort().map(item=>{
            districtOptions.push({
                value:item,
                label:item
            })
        }
        )
    })

    const handleChange  = (contituency) =>{
        setselectedConstituency(contituency);
        if(contituency)
            props.setSelectedConstituency(contituency.value);
        else
            props.setSelectedConstituency(null);

    }

    const handleChangeDistrict  = (district) =>{
        setSelectDistrict(district)
    }



    return (
        <div className="constituency-select-container">
            
            <div className="select-action-container">
                <h1>Choose your Constituency</h1>
                <div className="select-wrapper">
                    <Select
                        isClearable
                        components={animatedComponents}
                        value={selectedConstituency}
                        onChange={handleChange}
                        options={constituencyOptions}
                        className='select'
                        placeholder="Select Constituency"
                        components={{ IndicatorsContainer }}
                    />
                    <Select
                        isClearable
                        components={animatedComponents}
                        value={selectDistrict}
                        onChange={handleChangeDistrict}
                        options={districtOptions}
                        className='select-distict'
                        placeholder="All"
                    />
                </div>
                <div>
                    {
                        selectedConstituency ?
                        <Link to="/vote" style={{textDecoration:"none"}}>
                            <button onClick={()=>props.setConstituencySelectFlag(true)} className="go-vote-button">
                                <FaVoteYea className="icon"/> Vote now
                            </button>
                        </Link>
                            :
                            <button disabled className="go-vote-button">
                                <FaVoteYea className="icon"/> Vote now
                            </button>
                    }
                </div>
            </div>
            

        </div>
    )
}

export default ConstituencySelect;
