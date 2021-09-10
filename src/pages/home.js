import React from 'react';
import ItemsLayout from '../components/UI/ItemsLayout';
import Notistack from '../components/UI/NotiStack';

export default function Home() {
	return (
		<div>
			<Notistack>
				<ItemsLayout />
			</Notistack>
		</div>
	);
}
