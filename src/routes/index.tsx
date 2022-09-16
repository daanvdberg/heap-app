import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../components/header';
import CollectionPage from '../pages/collection';
import ReleasePage from '../pages/release';
import Wishlist from '../pages/wishlist';
import { defaultQueryFn } from '../services/api';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			queryFn: defaultQueryFn
		}
	}
});

function IndexRouter() {
	return (
		<QueryClientProvider client={queryClient}>
			<div className="relative w-full">

				<Header />

				<div className="container pt-32 px-6 max-w-7xl mx-auto">
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<CollectionPage />} />
							<Route path="release/:releaseId" element={<ReleasePage />} />
							<Route path="wishlist" element={<Wishlist />} />
						</Routes>
					</BrowserRouter>
				</div>

			</div>
		</QueryClientProvider>
	);
}

export default IndexRouter;
