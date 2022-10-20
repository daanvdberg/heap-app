import type { NextApiRequest, NextApiResponse } from 'next';
import discogsClient from '../../../services/discogs';

const { DISCOGS_USERNAME } = process.env;

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { fid = 0 } = req.query;
	let url = `users/${DISCOGS_USERNAME}/collection/folders/${fid}/releases`;
	let params = new URLSearchParams();

	// TODO: make dynamic
	params.append('page', '1');
	params.append('perPage', '48');

	discogsClient(url + '?' + params.toString()).then(
		(data) => res.status(200).json(data),
		(error) => res.status(500).json({ message: 'Something went wrong', error })
	)
}