import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useRouter } from 'next/router';
import Carousel from '../../../components/Carousel';
import { useRelease } from '../../../hooks/discogs/useRelease';
import MasterLink from './components/MasterLink';

function Release() {

	const router = useRouter();
	const { rid = '' } = router.query;

	const { status, data } = useRelease(rid as string);

	if (status === 'loading') {
		return <h1>Loading...</h1>;
	}

	if (status === 'error') {
		return <div>Error...</div>;
	}

	console.log(data);

	return (
		<div className="min-h-screen py-12 sm:pt-20 max-w-6xl mx-auto">
			<div
				className="flex flex-col justify-center items-center md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-4 lg:space-x-8">

				<div className="w-96">
					<Carousel images={data.images} />
				</div>

				<div
					className="relative flex-grow grid grid-cols-1 auto-cols-auto gap-y-4 h-full w-full mx-auto min-h-128">
					<h2 className="text-5xl font-semibold pr-36">{data.title}</h2>
					<h3 className="text-xl text-gray-500">{data.artists.map(i => i.name).join(', ')}</h3>
					{data.notes ? <p>{data.notes}</p> : ''}
					<div className="absolute top-3 right-0 space-y-0">
						<MasterLink masterId={data.master_id} />
					</div>
				</div>

			</div>

			<div
				className="grid auto-cols-auto grid-cols-2 gap-x-6 gap-y-6 px-20 py-10 md:grid-cols-3c my-10 bg-gray-100 rounded-xl">
				<h2 className="text-2xl font-medium col-span-2">Release Details</h2>
				<div className="flex items-center py-2 px-4 bg-white rounded-md">
					<FontAwesomeIcon icon={solid('barcode')} className="h-5 w-5" />
					<div className="ml-4">
						<span className="block font-semibold">ID</span>
						<span className="block">{data.id}</span>
					</div>
				</div>
				<div className="flex items-center py-2 px-4 bg-white rounded-md">
					<FontAwesomeIcon icon={solid('calendar')} className="h-5 w-5" />
					<div className="ml-4">
						<span className="block font-semibold">Released</span>
						<span className="block">{data.released}</span>
					</div>
				</div>
				<div className="flex items-center py-2 px-4 bg-white rounded-md">
					<FontAwesomeIcon icon={solid('music')} className="h-5 w-5" />
					<div className="ml-4">
						<span className="block font-semibold">Genres</span>
						<span className="block">{data.genres.join(', ')}</span>
					</div>
				</div>
				<div className="flex items-center py-2 px-4 bg-white rounded-md">
					<FontAwesomeIcon icon={solid('microphone-lines')} className="h-5 w-5" />
					<div className="ml-4">
						<span className="block font-semibold">Styles</span>
						<span className="block">{(data.styles || []).join(', ')}</span>
					</div>
				</div>
				<div className="flex items-center py-2 px-4 bg-white rounded-md">
					<FontAwesomeIcon icon={solid('building')} className="h-5 w-5" />
					<div className="ml-4">
						<span className="block font-semibold">Labels</span>
						<span className="block">{data.labels.map(i => i.name).join(', ')}</span>
					</div>
				</div>
				<div className="flex items-center py-2 px-4 bg-white rounded-md">
					<FontAwesomeIcon icon={solid('compact-disc')} className="h-5 w-5" />
					<div className="ml-4">
						<span className="block font-semibold">Formats</span>
						<span className="block">
							{data.formats.map(f => f.name).join(', ')}
						</span>
					</div>
				</div>
			</div>

			<div className="flex">
				<div className="basis-7/12 py-20 px-24 space-y-4 bg-black text-white rounded-xl">
					<h3 className="font-semibold text-3xl mb-10">Tracklist</h3>
					{data.tracklist.map(t => (
						<div key={t.position} className="flex items-center">
							<span
								className="inline-flex items-center px-3 mr-4 bg-white text-sm text-black border border-white rounded-md">{t.position}</span>
							<span className="flex-grow">{t.title}</span>
							<span>{t.duration}</span>
						</div>
					))}
				</div>
				<div className="basis-5/12 pl-10">
					<iframe className="border-1"
					        src="https://open.spotify.com/embed/track/1lH9OA5toIFUGsvU20rV4m?utm_source=generator"
					        width="100%" height="352" frameBorder="0"
					        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
					        loading="lazy"></iframe>
				</div>
			</div>

		</div>
	);
}

export default Release;