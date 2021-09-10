import React, { Fragment } from 'react';

import Card from './Card';
import Button from './Button';
import classes from './Modal.module.css';

import ReactDOM from 'react-dom';

function Backdrop(props) {
	return <div className={classes.backdrop} onClick={props.onClick} />;
}
function ModalOverlay(props) {
	return <Card className={classes.modal}>{props.children}</Card>;
}

const Modal = (props) => {
	return (
		<React.Fragment>
			{ReactDOM.createPortal(<Backdrop onClick={props.onClick} />, document.getElementById('backdrop-root'))}
			{ReactDOM.createPortal(
				<ModalOverlay onClick={props.onClick}>{props.children}</ModalOverlay>,
				document.getElementById('overlay-root')
			)}
		</React.Fragment>
	);
};

export default Modal;
