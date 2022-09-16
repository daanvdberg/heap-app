import axios, { Method } from 'axios';

const {
	REACT_APP_DISCOGS_API_BASE_URL,
	REACT_APP_DISCOGS_API_USER_TOKEN
} = process.env;

const defaultOptions = {
	baseURL: REACT_APP_DISCOGS_API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	}
};

const instance = axios.create(defaultOptions);

instance.interceptors.request.use(function (config) {
	if (!config.headers) {
		config.headers = {};
	}

	config.headers.Authorization = REACT_APP_DISCOGS_API_USER_TOKEN ? `Discogs token=${REACT_APP_DISCOGS_API_USER_TOKEN}` : '';

	return config;
});

const request = <T>(
	method: Method,
	url: string,
	params: any
): Promise<T> => {
	return instance.request<T>({
		method,
		url,
		params
	}).then((response) => response.data);
};

export const defaultQueryFn = async ({ queryKey }: any): Promise<unknown> => {
	return await request(queryKey[0], queryKey[1], queryKey[2]);
};

export default instance;