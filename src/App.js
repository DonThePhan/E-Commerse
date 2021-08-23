import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';

import MainNavigation from './components/MainNavigation/MainNavigation';
import Home from './pages/home';

function App() {
	return (
		<div className="App">
			<MainNavigation />
			<Route path="/">
				<Home />
			</Route>
			<Route path="*">
				<Redirect to="/" />
			</Route>
		</div>
	);
}

export default App;
