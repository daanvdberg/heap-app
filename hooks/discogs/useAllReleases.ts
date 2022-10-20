import { useQuery } from '@tanstack/react-query';
import { GetFolderReleasesResponse } from '../../types/discogs';

const fetchAllReleases = async (folder = 0, page = 1, perPage = 48) => {
	return await fetch(`/api/records/${folder}`).then((response) => response.json());
}

const useQueryAllReleases = (folder = 0, page = 1, perPage = 48) =>
	useQuery<GetFolderReleasesResponse, Error>(['get-all-releases'], () => fetchAllReleases());

export {
	fetchAllReleases,
	useQueryAllReleases
};