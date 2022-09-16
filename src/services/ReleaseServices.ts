import { useQuery } from 'react-query';
import { GetReleaseResponse } from './types';

type ReleaseCurrency = 'USD' | 'GBP' | 'EUR' | 'CAD' | 'AUD' | 'JPY' | 'CHF' | 'MXN' | 'BRL' | 'NZD' | 'SEK' | 'ZAR';

const useQueryRelease = (releaseId: string, currency: ReleaseCurrency = 'EUR') => useQuery<GetReleaseResponse, Error>([
	'GET',
	`/releases/${releaseId}`,
	{ curr_abbr: currency }
], {
	enabled: !!releaseId
});

export {
	useQueryRelease
};
