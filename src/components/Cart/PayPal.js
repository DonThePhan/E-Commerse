import { useRef, useEffect, useState, useContext } from 'react';
import classes from './PayPal.module.css';
import DataContext from '../../store/data-context';


let buttonComponent = null;

export default function PayPal(props) {
	const paypal = useRef();
	const { total, setOrder } = useContext(DataContext);

	useEffect(
		() => {
			if (buttonComponent) {
				buttonComponent.close();
			}
			buttonComponent = window.paypal.Buttons({
				createOrder: (data, actions, err) => {
					return actions.order.create({
						intent: 'CAPTURE',
						purchase_units: [
							{
								description: 'Cool looking table',
								amount: {
									currency_code: 'CAD',
									value: total
								}
							}
						]
					});
				},
				onApprove: async (data, actions) => {
					const order = await actions.order.capture();
					props.setOrderSubmitted(true);

					console.log(order);
					setOrder({});
				},
				onError: (err) => {
					console.log(err);
				}
			});

			buttonComponent.render(paypal.current);
		},
		[ total ]
	);

	return (

			<div className={classes.buttonContainer}>
				<div className={classes.paypal} ref={paypal} />
			</div>
		
	);
}
