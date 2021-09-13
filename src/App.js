/**
 * Project Console:
 * https://console.firebase.google.com/project/e-commerse-21d75/overview
 * 
 * Hosting URL: 
 * https://e-commerse-21d75.web.app
 */

import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';

import MainNavigation from './components/MainNavigation/MainNavigation';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Layout from './components/UI/Layout';

function App() {
	return (
		<div className="App">
			<MainNavigation />
			<Layout>
				<Switch>
					<Route path="/" exact>
						<Home />
					</Route>
					<Route path="/cart" exact>
						<Cart />
					</Route>
					<Route path="*">
						<Redirect to="/" />
					</Route>
				</Switch>
			</Layout>
		</div>
	);
}

export default App;
