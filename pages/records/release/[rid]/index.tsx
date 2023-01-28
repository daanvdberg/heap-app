import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useRouter } from 'next/router';
import Carousel from '../../../../components/Carousel';
import { trpc } from '../../../../utils/trpc';
import ReleaseLink from './components/MasterLink';

function Release() {

	const router = useRouter();
	const { rid } = router.query;

  const { status, data } = trpc.userCollection.byId.useQuery({ id: rid as string }, { enabled: !!rid });

  let query = '';
  if (data) {
    query = 'album:' + data.title + (data.artists[0] ? ' artist:' + data.artists[0].name : '');
  }
  const { data: spotifyData } = trpc.spotify.search.useQuery({ query }, { enabled: !!query });

	if (status === 'loading') {
		return <h1>Loading...</h1>;
	}

	if (status === 'error') {
		return <div>Error...</div>;
	}

	return (
		<div className="min-h-screen pt-0 sm:pt-20 max-w-6xl mx-auto">
			<div
				className="flex flex-col justify-center items-center md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-4 lg:space-x-8">

				<div className="w-96">
					<Carousel images={data.images} />
				</div>

				<div
					className="relative flex-grow grid grid-cols-1 auto-cols-auto gap-y-4 h-full w-full mx-auto min-h-128">
					<h2 className="text-5xl font-semibold pr-36">{data.title}</h2>
					<h3 className="text-xl text-gray-500 pr-36">{data.artists.map(i => i.name).join(', ')}</h3>
					{data.notes ? <p>{data.notes}</p> : ''}
          <div className="space-y-0 flex space-x-3">
            <ReleaseLink releaseId={data.uri} />
						<ReleaseLink releaseId={data.master_id} isMaster={true} />
					</div>
				</div>

			</div>

			<div
				className="grid auto-cols-auto sm:grid-cols-2 gap-x-6 gap-y-6 sm:px-20 sm:py-10 md:grid-cols-3c my-10 bg-gray-100 rounded-xl">
				<h2 className="text-2xl font-medium col-span-2">Release Details</h2>
				<div className="flex items-center col-span-2 sm:col-span-1 py-2 px-4 bg-white rounded-md">
					<FontAwesomeIcon icon={solid('barcode')} className="h-5 w-5" />
					<div className="ml-4">
						<span className="block font-semibold">ID</span>
						<span className="block">{data.id}</span>
					</div>
				</div>
				<div className="flex items-center col-span-2 sm:col-span-1 py-2 px-4 bg-white rounded-md">
					<FontAwesomeIcon icon={solid('calendar')} className="h-5 w-5" />
					<div className="ml-4">
						<span className="block font-semibold">Released</span>
						<span className="block">{data.released_formatted || data.released || 'N/A'}</span>
					</div>
				</div>
				<div className="flex items-center col-span-2 sm:col-span-1 py-2 px-4 bg-white rounded-md">
					<FontAwesomeIcon icon={solid('music')} className="h-5 w-5" />
					<div className="ml-4">
						<span className="block font-semibold">Genre(s)</span>
						<span className="block">{data.genres.join(', ')}</span>
					</div>
				</div>
				<div className="flex items-center col-span-2 sm:col-span-1 py-2 px-4 bg-white rounded-md">
					<FontAwesomeIcon icon={solid('microphone-lines')} className="h-5 w-5" />
					<div className="ml-4">
						<span className="block font-semibold">Style(s)</span>
						<span className="block">{(data.styles || []).join(', ')}</span>
					</div>
				</div>
				<div className="flex items-center col-span-2 sm:col-span-1 py-2 px-4 bg-white rounded-md">
					<FontAwesomeIcon icon={solid('building')} className="h-5 w-5" />
					<div className="ml-4">
						<span className="block font-semibold">Label(s)</span>
						<span className="block">{data.labels.map(i => i.name).join(', ')}</span>
					</div>
				</div>
				<div className="flex items-center col-span-2 sm:col-span-1 py-2 px-4 bg-white rounded-md">
					<FontAwesomeIcon icon={solid('compact-disc')} className="h-5 w-5" />
					<div className="ml-4">
						<span className="block font-semibold">Format(s)</span>
						<span className="block">
							{data.formats.map(f => f.name).join(', ')}
						</span>
					</div>
				</div>
			</div>

			<div className="sm:flex">
				<div className="basis-7/12 pt-6 pb-8 sm:py-20 px-8 sm:px-24 space-y-4 bg-black text-white rounded-xl sm:min-h-[500px]">
					<h3 className="font-semibold text-3xl mb-10">Tracklist</h3>
					{data.tracklist.map((track, index, elements) => {
            const next = elements[index+1];
            return (
              <div key={track.position} className={`flex items-center${(next && track.position[0] !== next.position[0]) ? ' pb-4 border-b border-white/50' : ''}`}>
                <span
                  className="inline-flex items-center px-3 mr-4 bg-white text-sm text-black border border-white rounded-md">{track.position}</span>
                <span className="flex-grow">{track.title}</span>
                <span>{track.duration}</span>
              </div>
            );
          })}
				</div>
				<div className="flex flex-col sm:block basis-5/12 pt-5 sm:pt-0 sm:pl-10 sm:min-h-[500px]">
          {spotifyData?.albums?.items?.length ?
              <iframe
                className="border-1 h-full min-h-[600px] sm:min-h-0"
                src={`https://open.spotify.com/embed/album/${spotifyData.albums.items[0].id}`}
                width="100%" frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            : ''}
				</div>
			</div>

		</div>
	);
}

export default Release;
