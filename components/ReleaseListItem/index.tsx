import Link from 'next/link';
import React from 'react';
import { FolderRelease } from '../../types/discogs';
import Image from '../Image';

interface ReleaseProps {
  release: FolderRelease;
}

const ReleaseListItem = ({ release: { basic_information: release }}: ReleaseProps) => {
  return (
    <div className="card w-full h-full rounded-md flex bg-white shadow-lg overflow-hidden">
      <Link href={`/release/${release.id}`} className="flex-shrink md:w-44 w-36 shadow-sm">
        <Image
          className="relative w-full aspect-square transition overflow-hidden"
          src={release.cover_image}
          alt={release.title}
          sizes="100vw" fill
          unoptimized
        />
      </Link>
      <div id="description" className="flex flex-col w-full p-4">
        <Link href={`/release/${release.id}`}>
          <h2 className="font-semibold text-xl transition hover:text-cyan-600">
            {release.title}
          </h2>
        </Link>
        <Link href={`/release/${release.id}`}
              className="flex items-center pt-0.5 text-md text-gray-500 transition hover:text-cyan-600">
          {release.artists[0] ? release.artists[0].name : ''}
        </Link>
        <div className="flex items-center pt-0.5 text-sm text-slate-500 font-light">
          <span id="price" className="flex justify-between items-center">
            {release.genres[0] ? release.genres[0] : ''}
          </span>&nbsp;/&nbsp;
          <span className="flex justify-between items-center select-none">
            {release.year || 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReleaseListItem;