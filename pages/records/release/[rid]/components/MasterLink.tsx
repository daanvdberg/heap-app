import React from 'react';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ReleaseLinkProps {
  releaseId?: number | string;
  isMaster?: boolean;
}

function ReleaseLink({ releaseId, isMaster = false }: ReleaseLinkProps) {
  if (!releaseId) {
    return <></>;
  }

  return (
    <a
      href={
        typeof releaseId === 'number'
          ? `https://www.discogs.com/master/${releaseId}`
          : releaseId
      }
      target="_blank"
      rel="noreferrer"
      title={`View ${isMaster ? 'Master ' : ''}on Discogs`}
      className="inline-flex items-center justify-center self-start rounded border border-slate-200 px-2 py-1 text-sm text-slate-100"
    >
      {isMaster ? 'View Master' : 'View Release'}&nbsp;
      <FontAwesomeIcon
        icon={solid('arrow-up-right-from-square')}
        className="ml-1.5 h-3 w-3 text-slate-300"
      />
    </a>
  );
}

export default ReleaseLink;
