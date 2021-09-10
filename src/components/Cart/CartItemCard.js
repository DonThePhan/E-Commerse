import React, { useState, useContext, Fragment } from 'react';
import classes from './CartItemCard.module.css';
import Button from '../UI/Button';
import DataContext from '../../store/data-context';

const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,      
    maximumFractionDigits: 2,
});


export default function CartItemCard(props) {
	const { qty, id, title, price, description, category, image } = props.item;
	const { addToOrder, removeFromOrder } = useContext(DataContext);

	function addToOrderHandler() {
		addToOrder(id);
	}

	function removeFromOrderHandler() {
		removeFromOrder(id);
	}

	return (
		<Fragment>
			<div className={`${props.className} ${classes.itemCard}`}>
				<div className={classes.addToCartContainer}>
					<Button className={classes.addToCartItem} onClick={addToOrderHandler}>
						+
					</Button>
					<p className={classes.addToCartItem}>{qty}</p>
					<Button className={classes.addToCartItem} onClick={removeFromOrderHandler}>
						-
					</Button>
				</div>
				<img className={classes.img} src={image} alt="" />
				<p className={classes.title}>{title}</p>
				<p className={classes.price}>${formatter.format(price)}</p>
			</div>
			<hr />
		</Fragment>
	);
}
