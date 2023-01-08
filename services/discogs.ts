const {
	DISCOGS_API_BASE_URL,
	DISCOGS_API_USER_TOKEN
} = process.env;

const authorization = DISCOGS_API_USER_TOKEN ? `Discogs token=${DISCOGS_API_USER_TOKEN}` : '';

const headers = {
	'Content-Type': 'application/json',
	'Authorization': authorization
};

const discogsClient = (
	endpoint: string,
	{ body, ...customConfig }: RequestInit = {}
) => {

	const { headers: customHeaders = {} } = customConfig;
	const config: RequestInit = {
		method: body ? 'POST' : 'GET',
		...customConfig,
		headers: {
			...headers,
			...customHeaders
		}
	};

	if (body) {
		config.body = JSON.stringify(body)
	}

	return fetch(`${DISCOGS_API_BASE_URL}/${endpoint}`, config)
		.then(async response => {
      console.log(response);
			if (response.ok) {
				return await response.json()
			} else {
				const errorMessage = await response.text()
				return Promise.reject(new Error(errorMessage))
			}
		});
};

export default discogsClient;