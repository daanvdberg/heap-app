import React from 'react';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface MasterLinkProps {
	masterId?: number
}

function MasterLink({ masterId }: MasterLinkProps) {

	if (!masterId) {
		return <></>;
	}

	return (
		<a
			href={`https://www.discogs.com/master/${masterId}`}
			target='_blank' rel='noreferrer'
			title='View Master Release on Discogs'
			className='inline-flex items-center self-start px-2 py-1 border border-current rounded text-sm'
		>
			View Master&nbsp;
			<FontAwesomeIcon icon={solid('arrow-up-right-from-square')}
			                 className="h-4 w-4 mr-1" />
		</a>
	);
}

export default MasterLink;