import React, { useEffect, useState } from 'react';
import './App.css';
import Bowser from "bowser";
import ConstituencySelect from './Components/ContituencySelect/ConstituencySelect';
import VotingMachine from './Components/VotingMachine/VotingMachine';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

function App() {


const [selectedConstituency, setSelectedConstituency] = useState('');
const [constituencySelectFlag, setConstituencySelectFlag] = useState(false);

useEffect(() => {
	console.log( MediaDeviceInfo.deviceId);
	console.log(Bowser.parse(window.navigator.userAgent));
}, [])



return (
	<div className="App">
		<Router>
			<Switch>
				<Route  path="/"  exact render={props => 
					<ConstituencySelect {...props} selectedConstituency={selectedConstituency} 
						setSelectedConstituency={setSelectedConstituency} 
						setConstituencySelectFlag={setConstituencySelectFlag} 
					/>
					}
				/>
				
				<Route path="/vote"  exact render={props => 
					<VotingMachine {...props} selectedConstituency={selectedConstituency}/>}
				/>
			</Switch>
		</Router>
	</div>
);
}

export default App;
