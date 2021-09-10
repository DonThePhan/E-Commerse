import React, { useState, useEffect } from 'react';
import fakeData from './fakeData';

const DataContext = React.createContext({
	data: [],
	order: [],
	total: 0,
	setOrder: () => {},
	currentItem: null,
	setCurrentItem: () => {}
});

function retrieveStoredToken() {
	const storedOrder = JSON.parse(localStorage.getItem('order'));

	return { order: storedOrder };
}

const formatter = new Intl.NumberFormat('en-US', {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
});

export function DataContextProvider(props) {
	const [ currentItem, setCurrentItem ] = useState('');

	let initialTokenData = retrieveStoredToken();
	let initialOrder = {};
	const [ total, setTotal ] = useState(500);
	// let total = 500;

	if (initialTokenData) {
		if (initialTokenData.order) {
			initialOrder = initialTokenData.order;
		}
	}

	const [ order, setOrder ] = useState(initialOrder);

	function addToOrder(id) {
		let qty = 0;
		if (order && order[id]) {
			qty = order[id] + 1;
		} else {
			qty = 1;
		}
		setOrder((prevOrder) => {
			return { ...prevOrder, [id]: qty };
		});
	}

	function removeFromOrder(id) {
		if (order && order[id]) {
			let qty = order[id] - 1;

			setOrder((prevOrder) => {
				let newOrder = {};

				if (qty <= 0) {
					newOrder = { ...prevOrder };
					delete newOrder[id];
					console.log('here');
				} else {
					newOrder = { ...prevOrder, [id]: qty };
				}

				return newOrder;
			});
		}
	}

	useEffect(
		() => {
			localStorage.setItem('order', JSON.stringify(order));

			let orderDetails = Object.keys(order).map((key) => {
				return { ...fakeData.find((item) => item.id === +key), qty: order[key] };
			});

			if (orderDetails.length !== 0) {
				let totalUnrounded = orderDetails
					.map((orderDetail) => orderDetail.price * orderDetail.qty)
					.reduce((a, b) => a + b);
				setTotal(+formatter.format(totalUnrounded));
				// total = +formatter.format(totalUnrounded);
				// console.log(total);
			}
		},
		[ order ]
	);

	const value = {
		data: fakeData,
		order,
		setOrder,
		total,
		addToOrder,
		removeFromOrder,
		currentItem,
		setCurrentItem
	};
	return <DataContext.Provider value={value}>{props.children}</DataContext.Provider>;
}

export default DataContext;
