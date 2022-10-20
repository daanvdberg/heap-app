import { useQuery } from '@tanstack/react-query';
import { GetReleaseResponse } from '../../types/discogs';

type ReleaseCurrency = 'USD' | 'GBP' | 'EUR' | 'CAD' | 'AUD' | 'JPY' | 'CHF' | 'MXN' | 'BRL' | 'NZD' | 'SEK' | 'ZAR';

const fetchRelease = async (releaseId: string, currency: ReleaseCurrency = 'EUR') => {
	const query = new URLSearchParams({ curr_abbr : currency });
	return await fetch(`/api/release/${releaseId}?${query.toString()}`).then((response) => response.json());
}

const useRelease = (releaseId: string, currency: ReleaseCurrency = 'EUR') =>
	useQuery<GetReleaseResponse, Error>(
		['get-release'],
		() => fetchRelease(releaseId, currency), {
			enabled: !!releaseId
		}
	);

export {
	fetchRelease,
	useRelease
};
