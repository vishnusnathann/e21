import React, { useEffect, useState } from 'react';
import './App.css';
import Bowser from "bowser";
import ConstituencySelect from './Components/ContituencySelect/ConstituencySelect';
import VotingMachine from './Components/VotingMachine/VotingMachine';

function App() {


const [selectedConstituency, setSelectedConstituency] = useState('');

useEffect(() => {
	console.log( MediaDeviceInfo.deviceId);
	console.log(Bowser.parse(window.navigator.userAgent));
}, [])



return (
	<div className="App">
		{/* <ConstituencySelect selectedConstituency={selectedConstituency} setSelectedConstituency={setSelectedConstituency}/> */}
		<VotingMachine/>
	</div>
);
}

export default App;
