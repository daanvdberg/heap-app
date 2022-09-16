import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FolderRelease } from '../../services/types';

interface ReleaseProps {
	release: FolderRelease
}

const Release = ({ release: { basic_information: release } }: ReleaseProps) => {
	return (
		<div className="card bg-[#15263F] w-fit h-full rounded-xl p-6 space-y-4 flex flex-col">
			<a href={`/release/${release.id}`} className="flex-shrink">
				<img
					className="w-full h-64 rounded-md transition hover:bg-cyan-300"
					src={release.cover_image}
					alt={release.title}
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
				<div className="flex text-sm items-center">

					<img src="https://i.pravatar.cc/30?img=56" alt="avatar"
					     className="rounded-full border border-white"/>
                    <span className="ml-2 text-slate-500">
                        <a href={`/release/${release.id}`} className="text-gray-300 transition hover:text-cyan-300">
                            {release.artists[0] ? release.artists[0].name : ''}
                        </a>
                    </span>
				</div>
			</div>
		</div>
	);
}

export default Release;