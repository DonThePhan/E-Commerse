import React, { useState, useContext, useEffect } from 'react';
// import Button from '@material-ui/core/Button';
import Button from './Button';
import { SnackbarProvider, useSnackbar } from 'notistack';
import classes from './NotiStack.module.css';
import DataContext from '../../store/data-context';

function MyApp(props) {
	const [ firstRender, setfirstRender ] = useState(true);
	const { currentItem, order } = useContext(DataContext);

	const { enqueueSnackbar } = useSnackbar();

	const handleClick = () => {
		enqueueSnackbar(
			<span>
				<span className={classes.item}>{currentItem}</span> added to cart!
			</span>
		);
	};

	useEffect(
		() => {
			if (!firstRender) {
				handleClick();
			} else {
				setfirstRender(false);
			}
		},
		[ order ]
	);

	return <React.Fragment>{props.children}</React.Fragment>;
}

export default function Notistack(props) {
	return (
		<SnackbarProvider maxSnack={3}>
			<MyApp>{props.children}</MyApp>
		</SnackbarProvider>
	);
}
