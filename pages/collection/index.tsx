import React from 'react';
import Release from '../../components/Release';
import { useQueryAllReleases } from '../../hooks/discogs/useAllReleases';

const Collection = () => {

	const { status, data } = useQueryAllReleases();
	
	if (status === 'loading') {
		return <h1>Loading...</h1>;
	}

	if (status === 'error') {
		return <div>Error...</div>;
	}
	
	console.log(data);

	return (
		<div>
			Collection

			<div className="grid grid-cols-4 gap-4">
				{data.releases.map((release) => <Release release={release} key={release.id} />)}
			</div>
		</div>
	);
};

export default Collection;