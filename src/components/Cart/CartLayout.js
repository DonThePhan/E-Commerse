import React, { Fragment, useContext, useState, useEffect } from 'react';
import DataContext from '../../store/data-context';
import Button from '../UI/Button';
import CartItemCard from './CartItemCard';
import classes from './CartLayout.module.css';
import PayPal from './PayPal';
import Modal from '../UI/Modal';

const formatter = new Intl.NumberFormat('en-US', {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
});

export default function CartLayout() {
	const [ orderSubmitted, setOrderSubmitted ] = useState(false);
	const { order, data } = useContext(DataContext);
	const [ checkout, setCheckout ] = useState(false);
	const orderDetails = Object.keys(order).map((key) => {
		return { ...data.find((item) => item.id === +key), qty: order[key] };
	});

	function orderSubmittedOkayHandler() {
		setOrderSubmitted(false);
	}

	function checkoutHandler() {
		setCheckout(true);
	}

	function onClickAwayHandler() {
		setCheckout(false);
	}

	let content = undefined;

	if (Object.keys(order).length === 0) {
		content = (
			<div>
				{orderSubmitted ? (
					<Modal onClick={orderSubmittedOkayHandler}>
						<h2>Order Successfully Submitted!</h2>
						<Button onClick={orderSubmittedOkayHandler}>Okay</Button>
					</Modal>
				) : (
					<p className={classes.noItems}>Your Cart is empty</p>
				)}
			</div>
		);
	} else {
		let totalUnrounded = orderDetails
			.map((orderDetail) => orderDetail.price * orderDetail.qty)
			.reduce((a, b) => a + b);
		let total = formatter.format(totalUnrounded);

		content = (
			<Fragment>
				{orderDetails.map((orderDetail) => <CartItemCard key={orderDetail.id} item={orderDetail} />)}
				<div className={classes.totalContainer}>
					<h3 className={classes.totalText}>Total</h3>
					<h3 className={classes.total}>{`$${total}`}</h3>
				</div>
				<Button onClick={checkoutHandler}>Checkout</Button>
				{checkout && (
					<Modal onClick={onClickAwayHandler}>
						<PayPal orderSubmitted={orderSubmitted} setOrderSubmitted={setOrderSubmitted} />
						<Button className={classes.cancel} onClick={onClickAwayHandler}>
							Cancel
						</Button>
					</Modal>
				)}
			</Fragment>
		);
	}

	useEffect(
		() => {
			if (orderSubmitted) {
				setCheckout(false);
			}
		},
		[ orderSubmitted ]
	);

	return <div>{content}</div>;
}
