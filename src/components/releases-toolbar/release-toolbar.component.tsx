import React, { useCallback } from 'react';
import { useQueryCollectionFolders } from '../../services/CollectionServices';

const ReleaseToolbar = () => {

	const { data: { folders = [] } = {}, error, isLoading, isIdle } = useQueryCollectionFolders();

	if (error) {
		return <div>Error...</div>;
	}

	if (isLoading || isIdle) {
		return <h1>Loading...</h1>;
	}

	const activeFolders = folders.filter((item) => item.count > 0);

	console.log(activeFolders);

	return (
		<div>
			TOOLBAR
		</div>
	);
};

export default ReleaseToolbar;