import React from 'react';
import Release from '../../components/release';
import ReleaseToolbar from '../../components/releases-toolbar';
import { useQueryAllReleases } from '../../services/CollectionServices';

function CollectionPage() {
	
	const { data, error, isLoading, isIdle } = useQueryAllReleases();

	if (error) {
		return <div>Error...</div>;
	}

	if (isLoading || isIdle) {
		return <h1>Loading...</h1>;
	}

	return (
		<div>

			<ReleaseToolbar />

			<div className="grid grid-cols-4 gap-4">
				{data.releases.map((release) => <Release release={release} key={release.id} />)}
			</div>

		</div>
	);
}

export default CollectionPage;