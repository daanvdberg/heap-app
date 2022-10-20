import type { NextApiRequest, NextApiResponse } from 'next';
import discogsClient from '../../../services/discogs';

const { DISCOGS_USERNAME } = process.env;

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	let url = `users/${DISCOGS_USERNAME}/collection/folders/`;

	discogsClient(url).then(
		(data) => res.status(200).json(data),
		(error) => res.status(500).json({ message: 'Something went wrong', error })
	)
}