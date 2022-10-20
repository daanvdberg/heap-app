import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FolderRelease } from '../../types/discogs';
import Image from '../Image';

interface ReleaseProps {
	release: FolderRelease;
}

const Release = ({ release: { basic_information: release } }: ReleaseProps) => {
	return (
		<div className="card bg-[#15263F] w-full h-full rounded-xl p-6 space-y-4 flex flex-col">
			<a href={`/release/${release.id}`} className="flex-shrink">
				<Image
					className="relative w-full aspect-square rounded-md transition overflow-hidden"
					src={release.cover_image}
					alt={release.title}
					sizes="100vw" fill
					unoptimized
				/>
			</a>
			<div id="description" className="space-y-4 flex flex-col flex-grow">
				<a href={`/release/${release.id}`} className="flex-grow">
					<h2 className="text-white font-semibold text-xl transition hover:text-cyan-300">
						{release.title}
					</h2>
				</a>
				<div className="flex items-center justify-between font-semibold text-sm border-b border-slate-500 pb-6">
                    <span id="price" className="text-cyan-300 flex justify-between items-center">
	                    <FontAwesomeIcon icon={solid('music')} className="h-4 w-4 mr-1" fill="#67E7F9" />
	                    {release.genres[0] ? release.genres[0] : ''}
                    </span>
					<span className="text-slate-500 flex justify-between items-center select-none">
                        {release.year}
                    </span>
				</div>
                <a href={`/release/${release.id}`} className="flex items-center text-sm text-gray-300 transition hover:text-cyan-300">
					<Image
						className="relative mr-2 rounded-full border border-white overflow-hidden"
						src="https://i.pravatar.cc/40?img=56"
						alt="avatar"
						sizes="100vw" fill
					/>
                    {release.artists[0] ? release.artists[0].name : ''}
                </a>
			</div>
		</div>
	);
};

export default Release;