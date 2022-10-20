import { useQuery } from '@tanstack/react-query';
import { GetFolderReleasesResponse } from '../../types/discogs';

const fetchCollectionFolders = async () => {
	return await fetch(`/api/records/folders`).then((response) => response.json());
}

const useQueryCollectionFolders = () =>
	useQuery<GetFolderReleasesResponse, Error>(['get-collection-folders'], () => fetchCollectionFolders());

export {
	fetchCollectionFolders,
	useQueryCollectionFolders
};