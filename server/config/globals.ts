// Environment variables imported from .env file
export const env = {
	NODE_ENV: process.env.NODE_ENV || 'development',
	NODE_PORT: process.env.NODE_PORT || process.env.PORT || 5000,
	DOMAIN: process.env.DOMAIN,

	SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID || '',
	SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET || '',
	SPOTIFY_CALLBACK_URL: process.env.DOMAIN + '/spotify/callback',
	SPOTIFY_PERMISSION_SCOPE: ['user-read-email', 'user-read-private'],

	REACT_APP_DISCOGS_USERNAME: process.env.REACT_APP_DISCOGS_USERNAME,
	REACT_APP_DISCOGS_API_BASE_URL: process.env.REACT_APP_DISCOGS_API_BASE_URL,
	REACT_APP_DISCOGS_API_CONSUMER_KEY: process.env.REACT_APP_DISCOGS_API_CONSUMER_KEY,
	REACT_APP_DISCOGS_API_CONSUMER_SECRET: process.env.REACT_APP_DISCOGS_API_CONSUMER_SECRET,
	REACT_APP_DISCOGS_API_USER_TOKEN: process.env.REACT_APP_DISCOGS_API_USER_TOKEN
};
