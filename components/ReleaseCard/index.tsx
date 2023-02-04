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

const ReleaseCard = ({
  release: { basic_information: release },
}: ReleaseCardProps) => {
  return (
    <div className="card flex h-full w-full flex-col overflow-hidden rounded-md bg-white transition-colors hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-100">
      <Link
        href={`/records/release/${release.id}`}
        className="flex-shrink shadow-sm"
      >
        <Image
          className="relative aspect-square w-full overflow-hidden bg-slate-800 opacity-80 transition-all hover:opacity-100"
          src={release.cover_image}
          alt={release.title}
          sizes="100vw"
          fill
          unoptimized
        />
      </Link>
      <div id="description" className="flex flex-grow flex-col space-y-2 p-5">
        <Link
          href={`/records/release/${release.id}`}
          className="flex-grow"
          title={release.title}
        >
          <h2 className="text-xl font-semibold transition hover:text-sky-600 dark:hover:text-sky-600">
            {truncate(release.title, 36)}
          </h2>
        </Link>
        {release.artists[0] ? (
          <Link
            href={`/records/release/${release.id}`}
            className="text-md flex items-center overflow-hidden rounded-full text-slate-600 transition hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-600"
          >
            {release.artists[0].name}
          </Link>
        ) : (
          ''
        )}
        <div className="flex items-center pt-1 text-sm font-light text-slate-500 dark:text-slate-300">
          <span className="mr-3 flex select-none items-center justify-between">
            <FontAwesomeIcon
              icon={solid('music')}
              className="mr-1 h-3 w-3"
              title="Genre"
            />
            {release.genres[0] ? release.genres[0] : ''}
          </span>
          <span className="flex select-none items-center justify-between">
            <FontAwesomeIcon
              icon={regular('calendar')}
              className="mr-1 h-3 w-3"
              title="Release Year"
            />
            {release.year || 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReleaseCard;
