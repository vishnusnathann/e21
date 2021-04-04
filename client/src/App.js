import React, { useEffect, useState } from 'react';
import  { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Loader from './Components/Loader/Loader';
import VotingMachine from './Components/VotingMachine/VotingMachine';
import FinalAnnotation from './Components/FinalAnnotation/FinalAnnotation';
import WebShare from './Components/WebShare/WebShare';
import ReactGA from 'react-ga';
const ConstituencySelect = lazy(() => import('./Components/ContituencySelect/ConstituencySelect'));
// const VotingMachine = lazy(() => import('./Components/VotingMachine/VotingMachine'));
// const FinalAnnotation = lazy(() => import('./Components/FinalAnnotation/FinalAnnotation'));
const Navbar = lazy(() => import ('./Components/Navbar/Navbar'));



function App() {


const [selectedConstituency, setSelectedConstituency] = useState('');
const [constituencySelectFlag, setConstituencySelectFlag] = useState(false);


useEffect(() => {
	ReactGA.initialize('UA-192977829-1');
	ReactGA.pageview(window.location.pathname + window.location.search);
}, [])

return (

	<Suspense fallback={<Loader/>}>
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
					
					{/* <Route path="/vote"  exact render={props => 
						<VotingMachine {...props} selectedConstituency={selectedConstituency}/>}
					/>

					<Route path="/vote_casted"  exact render={props => 
						<FinalAnnotation {...props} />}
					/> */}
					<Redirect to="/"/>
				</Switch>
				<WebShare/>
			</Router>
		</div>
	</Suspense>
);
}

export default App;
