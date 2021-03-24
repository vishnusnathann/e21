import React, { useEffect, useState } from 'react';
import { CONSTITUENCY, DISTRICT } from '../Constants';
import makeAnimated from 'react-select/animated';
import './ConstituencySelect.css';
import Select, { components } from 'react-select';
import { Link } from 'react-router-dom';
import { FaVoteYea } from "react-icons/fa";
// import bg from '/keralabg1.jpg';


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

        <div className="constituency-main-wrapper"  style={{backgroundImage:"url('./keralabg1.jpg')"}}>
            <div className="virtual-election-info" >
            <div className="main">
            
            <div className="timeline">
                <h3>Virtual Election</h3>
                <label>Kerala Legislative Assembly - 2021</label>
                <div className="box">
                    <div className="container">
                        <div className="lines">
                            <div className="dot"></div>
                            <div className="line"></div>
                            <div className="dot"></div>
                            <div className="line"></div>
                            <div className="dot"></div>
                            {/* <div className="line"></div> */}
                        </div>
                        <div className="cards">
                            <div className="card" style={{backgroundColor: "#e67e22",color:"#fff"}}>
                                <h4>Step 1</h4>
                                <p>Select Constituency</p>
                            </div>
                            <div className="card mid" style={{backgroundColor: "#ecf0f1"}}>
                                <h4>Step 2</h4>
                                <p>Cast your Vote</p>
                            </div>
                            <div className="card" style={{backgroundColor: "#27ae60",color:"#fff"}}>
                                <h4>Step 3</h4>
                                <p>See Results on 7th April 2021</p>
                            </div>
                            <small className="user-msg">
                            The survey is conducted purly for <br/> 
                            research purpose,The site never <br/> 
                            gurantee any validity for the data <br/> 
                            displayed.
                            </small>
                            
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>


            </div>


            <div className="constituency-select-container" >
                    <div className="select-action-container">
                        <h1>Select your Constituency</h1>
                        <div className="select-wrapper">
                            <Select
                                isClearable
                                components={animatedComponents}
                                value={selectedConstituency}
                                onChange={handleChange}
                                options={constituencyOptions}
                                className='select'
                                placeholder="Choose Constituency"
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
        </div>


    )
}

export default ConstituencySelect;
