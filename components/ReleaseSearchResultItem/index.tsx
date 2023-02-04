import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
import { SearchRelease } from '../../types/discogs';
import Image from '../Image';

interface ReleaseProps {
  release: SearchRelease;
}

const ReleaseSearchResultItem = ({ release }: ReleaseProps) => {
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
        <div className="flex flex-col items-start pt-2 text-sm font-light text-slate-500 dark:text-slate-300 sm:text-sm">
          <span className="mr-3 flex select-none items-center justify-between">
            <FontAwesomeIcon icon={solid('music')} className="mr-2 h-3 w-3 sm:h-4 sm:w-4" title="Genre" />
            {release.genre ? release.genre.join(', ') : ''}
          </span>
          <span className="flex select-none items-center justify-between">
            <FontAwesomeIcon icon={regular('calendar')} className="mr-2 h-3 w-3 sm:h-4 sm:w-4" title="Release Year" />
            {release.year || 'N/A'}
          </span>
          {release.user_data?.in_collection ? (
            <span className="flex select-none items-center justify-between">
              <FontAwesomeIcon
                icon={solid('record-vinyl')}
                className="mr-2 h-3 w-3 sm:h-4 sm:w-4"
                title="Release Year"
              />
              In my collection
            </span>
          ) : null}
          {release.user_data?.in_wantlist ? (
            <span className="flex select-none items-center justify-between">
              <FontAwesomeIcon icon={solid('heart')} className="mr-2 h-3 w-3 sm:h-4 sm:w-4" title="Release Year" />
              In my wishlist
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ReleaseSearchResultItem;