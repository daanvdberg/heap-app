import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import IndexRouter from './routes';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<IndexRouter />
	</React.StrictMode>
);
