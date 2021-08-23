import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {DataContextProvider} from './store/data-context';

import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
	<DataContextProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</DataContextProvider>,
	document.getElementById('root')
);
