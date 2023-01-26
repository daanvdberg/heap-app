import querystring from 'query-string';

const {
  SPOTIFY_API_BASE_URL,
  SPOTIFY_API_CLIENT_ID,
  SPOTIFY_API_CLIENT_SECRET
} = process.env;

const basic = Buffer.from(`${SPOTIFY_API_CLIENT_ID}:${SPOTIFY_API_CLIENT_SECRET}`).toString('base64');

const getAccessToken = async () => {
  const response = await fetch(`https://accounts.spotify.com/api/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: querystring.stringify({ grant_type: 'client_credentials' })
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
};

const headers = {
  'Content-Type': 'application/json'
};

const spotifyClient = async (
	endpoint: string,
	{ body, ...customConfig }: RequestInit = {}
) => {

  const { access_token } = await getAccessToken();

  if (!access_token) return null;

  let { headers: customHeaders = {
    ...headers,
    'Authorization': `Bearer ${access_token}`
  } } = customConfig;

	const config: RequestInit = {
		method: body ? 'POST' : 'GET',
		...customConfig,
		headers: {
			...headers,
			...customHeaders
		}
	};

	if (body) {
    config.body = JSON.stringify(body);
	}

	return fetch(`${SPOTIFY_API_BASE_URL}/${endpoint}`, config)
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

export default spotifyClient;