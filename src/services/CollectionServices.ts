import { useQuery } from 'react-query';
import { GetFolderReleasesResponse, GetFolderResponse } from './types';

const {
	REACT_APP_DISCOGS_USERNAME
} = process.env;

const useQueryAllReleases = (folder = 0, page = 1, perPage = 48) => useQuery<GetFolderReleasesResponse, Error>([
	'GET',
	`/users/${REACT_APP_DISCOGS_USERNAME}/collection/folders/${folder}/releases`,
	{ page, per_page: perPage }
]);

const useQueryCollectionFolders = () => useQuery<GetFolderResponse, Error>([
	'GET',
	`/users/${REACT_APP_DISCOGS_USERNAME}/collection/folders`,
	{}
]);

export {
	useQueryAllReleases,
	useQueryCollectionFolders
};
