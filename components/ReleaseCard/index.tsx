import Link from 'next/link';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FolderRelease } from '../../types/discogs';
import { truncate } from '../../utils';
import Image from '../Image';

interface ReleaseCardProps {
  release: FolderRelease;
}

const ReleaseCard = ({ release: { basic_information: release }}: ReleaseCardProps) => {
  return (
    <div className="card w-full h-full rounded-md flex flex-col bg-white hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-100 overflow-hidden transition-colors">
      <Link href={`/release/${release.id}`} className="flex-shrink shadow-sm">
        <Image
          className="relative w-full aspect-square transition-all overflow-hidden bg-slate-800 opacity-80 hover:opacity-100"
          src={release.cover_image}
          alt={release.title}
          sizes="100vw" fill
          unoptimized
        />
      </Link>
      <div id="description" className="space-y-2 flex flex-col flex-grow p-5">
        <Link href={`/release/${release.id}`} className="flex-grow" title={release.title}>
          <h2 className="font-semibold text-xl transition hover:text-sky-600 dark:hover:text-sky-600">
            {truncate(release.title, 36)}
          </h2>
        </Link>
        {release.artists[0] ?
          <Link href={`/release/${release.id}`}
                className="flex items-center text-md text-slate-600 dark:text-slate-300 transition hover:text-sky-600 dark:hover:text-sky-600 rounded-full overflow-hidden">
            {release.artists[0].name}
          </Link> : ''}
        <div className="flex items-center pt-1 text-sm text-slate-500 dark:text-slate-300 font-light">
          <span className="flex justify-between items-center mr-3 select-none">
            <FontAwesomeIcon icon={solid('music')} className="h-3 w-3 mr-1" title="Genre" />
            {release.genres[0] ? release.genres[0] : ''}
          </span>
          <span className="flex justify-between items-center select-none">
            <FontAwesomeIcon icon={regular('calendar')} className="h-3 w-3 mr-1" title="Release Year" />
            {release.year || 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReleaseCard;