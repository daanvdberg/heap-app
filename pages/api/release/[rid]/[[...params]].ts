import type { NextApiRequest, NextApiResponse } from 'next';
import discogsClient from '../../../../services/discogs';

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { rid, curr_abbr } = req.query;
	console.log(req.query);

	let url = `releases/${rid}`;

	discogsClient(url).then(
		(data) => res.status(200).json(data),
		(error) => res.status(500).json({ message: 'Something went wrong', error })
	)
}