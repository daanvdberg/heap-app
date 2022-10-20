import React, { useState } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {
	DehydratedState,
	Hydrate,
	QueryClient,
	QueryClientProvider
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Layout from '../components/layout';

function MyApp({ Component, pageProps }: AppProps<{ dehydratedState: DehydratedState }>) {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</Hydrate>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

export default MyApp;
