import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
import { FolderRelease } from '../../types/discogs';
import Image from '../Image';

interface ReleaseProps {
  release: FolderRelease;
}

const ReleaseListItem = ({ release: { basic_information: release }}: ReleaseProps) => {
  return (
    <div className="card w-full h-full rounded-md flex bg-white dark:bg-slate-800 dark:text-slate-100 overflow-hidden transition-colors">
      <Link href={`/release/${release.id}`} className="flex-shrink flex items-center md:w-44 w-36 bg-slate-800 dark:bg-black">
        <Image
          className="relative w-full aspect-square transition overflow-hidden opacity-80 hover:opacity-100"
          src={release.cover_image}
          alt={release.title}
          sizes="100vw" fill
          unoptimized
        />
      </Link>
      <div id="description" className="flex flex-col w-full p-3 pt-2.5 sm:p-4">
        <Link href={`/release/${release.id}`}>
          <h2 className="sm:mb-1.5 font-semibold text-md sm:text-2xl transition hover:text-sky-600 dark:hover:text-sky-600">
            {release.title}
          </h2>
        </Link>
        <Link href={`/release/${release.id}`}
              className="flex items-center sm:mb-1.5 font-medium text-sm sm:text-md text-slate-600 dark:text-slate-300 transition hover:text-sky-600 dark:hover:text-sky-600 rounded-full overflow-hidden">
          {release.artists[0] ? release.artists[0].name : ''}
        </Link>
        <div className="flex items-center pt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-300 font-light">
          <span className="flex justify-between items-center mr-3 select-none">
            <FontAwesomeIcon icon={solid('music')} className="h-2.5 sm:h-3 w-2.5 sm:w-3 mr-1" title="Genre" />
            {release.genres[0] ? release.genres[0] : ''}
          </span>
          <span className="flex justify-between items-center select-none">
            <FontAwesomeIcon icon={regular('calendar')} className="h-2.5 sm:h-3 w-2.5 sm:w-3 mr-1" title="Release Year" />
            {release.year || 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReleaseListItem;