import React, { useEffect, useState } from 'react';
import './App.css';

import ConstituencySelect from './Components/ContituencySelect/ConstituencySelect';
import VotingMachine from './Components/VotingMachine/VotingMachine';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import FinalAnnotation from './Components/FinalAnnotation/FinalAnnotation';
import Navbar from './Components/Navbar/Navbar';

function App() {


const [selectedConstituency, setSelectedConstituency] = useState('');
const [constituencySelectFlag, setConstituencySelectFlag] = useState(false);



return (
	<div className="App" >

		<Router>
			<Navbar/>
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

				<Route path="/vote_casted"  exact render={props => 
					<FinalAnnotation {...props} />}
				/>
			</Switch>
		</Router>
	</div>
);
}

export default App;
