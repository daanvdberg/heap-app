import React from 'react';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ReleaseLinkProps {
	releaseId?: number | string,
  isMaster?: boolean
}

function ReleaseLink({ releaseId, isMaster = false }: ReleaseLinkProps) {

	if (!releaseId) {
		return <></>;
	}

	return (
		<a
			href={typeof releaseId === 'number' ? `https://www.discogs.com/master/${releaseId}` : releaseId}
			target='_blank' rel='noreferrer'
			title={`View ${isMaster ? 'Master ' : ''}on Discogs`}
			className='inline-flex items-center self-start px-2 py-1 border border-current rounded text-sm justify-center'
		>
      {isMaster ? 'View Master' : 'View Release'}&nbsp;
			<FontAwesomeIcon icon={solid('arrow-up-right-from-square')}
			                 className="h-4 w-4 mr-1" />
		</a>
	);
}

export default ReleaseLink;