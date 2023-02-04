import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
import { FolderRelease } from '../../types/discogs';
import Image from '../Image';

interface ReleaseProps {
  release: FolderRelease;
}

const ReleaseListItem = ({
  release: { basic_information: release },
}: ReleaseProps) => {
  return (
    <div className="card flex h-full w-full overflow-hidden rounded-md bg-white transition-colors dark:bg-slate-800 dark:text-slate-100">
      <Link
        href={`/records/release/${release.id}`}
        className="flex w-36 flex-shrink items-center bg-slate-800 dark:bg-black md:w-44"
      >
        <Image
          className="relative aspect-square w-full overflow-hidden opacity-80 transition hover:opacity-100"
          src={release.cover_image}
          alt={release.title}
          sizes="100vw"
          fill
          unoptimized
        />
      </Link>
      <div id="description" className="flex w-full flex-col p-3 pt-2.5 sm:p-4">
        <Link href={`/records/release/${release.id}`}>
          <h2 className="text-md font-semibold transition hover:text-sky-600 dark:hover:text-sky-600 sm:mb-1.5 sm:text-2xl">
            {release.title}
          </h2>
        </Link>
        <Link
          href={`/records/release/${release.id}`}
          className="sm:text-md flex items-center overflow-hidden rounded-full text-sm font-medium text-slate-600 transition hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-600 sm:mb-1.5"
        >
          {release.artists[0] ? release.artists[0].name : ''}
        </Link>
        <div className="flex items-center pt-2 text-xs font-light text-slate-500 dark:text-slate-300 sm:text-sm">
          <span className="mr-3 flex select-none items-center justify-between">
            <FontAwesomeIcon
              icon={solid('music')}
              className="mr-1 h-2.5 w-2.5 sm:h-3 sm:w-3"
              title="Genre"
            />
            {release.genres[0] ? release.genres[0] : ''}
          </span>
          <span className="flex select-none items-center justify-between">
            <FontAwesomeIcon
              icon={regular('calendar')}
              className="mr-1 h-2.5 w-2.5 sm:h-3 sm:w-3"
              title="Release Year"
            />
            {release.year || 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReleaseListItem;
