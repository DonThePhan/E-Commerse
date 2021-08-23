import React from 'react';
import classes from './MainNavigation.module.css';
import { NavLink } from 'react-router-dom';

export default function MainNavigation() {
	return (
		<div className={classes.mainNav}>
			<div className={classes.navContainer}>
				<div className={classes.logo}>
					<p>The Everthing Store</p>
				</div>
				<div className={classes.nav}>
					<NavLink to="/login">Login</NavLink>
					<NavLink to="/cart">Cart</NavLink>
				</div>
			</div>
		</div>
	);
}
