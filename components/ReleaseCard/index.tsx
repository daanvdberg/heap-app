import Link from 'next/link';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FolderRelease } from '../../types/discogs';
import Image from '../Image';

interface ReleaseCardProps {
  release: FolderRelease;
}

const ReleaseCard = ({ release: { basic_information: release }}: ReleaseCardProps) => {
  return (
    <div className="card w-full h-full rounded-md flex flex-col bg-white shadow-lg overflow-hidden">
      <Link href={`/release/${release.id}`} className="flex-shrink shadow-sm">
        <Image
          className="relative w-full aspect-square transition overflow-hidden"
          src={release.cover_image}
          alt={release.title}
          sizes="100vw" fill
          unoptimized
        />
      </Link>
      <div id="description" className="space-y-4 flex flex-col flex-grow p-5">
        <Link href={`/release/${release.id}`} className="flex-grow">
          <h2 className="font-semibold text-xl transition hover:text-cyan-600">
            {release.title}
          </h2>
        </Link>
        <div className="flex items-center justify-between font-semibold text-sm border-b border-slate-500 pb-5">
          <span id="price" className="text-cyan-600 flex justify-between items-center">
            <FontAwesomeIcon icon={solid('music')} className="h-4 w-4 mr-1" />
            {release.genres[0] ? release.genres[0] : ''}
          </span>
          <span className="text-slate-500 flex justify-between items-center select-none">
            {release.year || 'N/A'}
          </span>
        </div>
        <Link href={`/release/${release.id}`}
           className="flex items-center text-sm text-gray-500 transition hover:text-cyan-600">
          <Image
            className="relative mr-2 rounded-full border border-white overflow-hidden"
            src="https://i.pravatar.cc/40?img=56"
            alt="avatar"
            sizes="100vw" fill
          />
          {release.artists[0] ? release.artists[0].name : ''}
        </Link>
      </div>
    </div>
  );
};

export default ReleaseCard;