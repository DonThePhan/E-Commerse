import React from 'react';
import fakeData from './fakeData';
import { useState, useEffect } from 'react';

const DataContext = React.createContext({
	data: [],
	order: []
});

export function DataContextProvider(props) {
	const [ order, setOrder ] = useState({});

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
                    console.log('here')
				} else {
					newOrder = { ...prevOrder, [id]: qty };
				}

				return newOrder;
			});
		}
	}

	useEffect(
		() => {
			console.log(order);
		},
		[ order ]
	);

	const value = {
		data: fakeData,
		order,
        addToOrder,
        removeFromOrder
	};
	return <DataContext.Provider value={value}>{props.children}</DataContext.Provider>;
}

export default DataContext;
