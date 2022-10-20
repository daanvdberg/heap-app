import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { NextPage } from 'next';
import { fetchAllReleases } from '../services/query-discogs';

const Home: NextPage = () => {
	return (
		<>Home</>
	);
};

export async function getStaticProps() {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery(['posts', 10], () => fetchAllReleases())

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	}
}

export default Home;
