import React from 'react';
import { useParams } from 'react-router-dom';
import Carousel from '../../components/carousel';
import { useQueryRelease } from '../../services/ReleaseServices';
import { GetReleaseResponse } from '../../services/types';
import MasterLink from './master-link.component';

type ReleaseDetails = {
	[K in 'id' | 'released' | 'genres' | 'styles' | 'labels' | 'formats']: string;
}

function ReleasePage() {

	const { releaseId = '' } = useParams();
	const { data, error, isLoading, isIdle } = useQueryRelease(releaseId);

	const details: ReleaseDetails = {
		id: 'ID',
		released: 'Released',
		genres: 'Genres',
		styles: 'Styles',
		labels: 'Labels',
		formats: 'Format',
	}

	if (error) {
		return <div>Error...</div>;
	}

	if (isLoading || isIdle) {
		return <h1>Loading...</h1>;
	}

	console.log(data);

	return (
		<div className='min-h-screen py-12 sm:pt-20'>
			<div className='flex flex-col justify-center items-center md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto'>

				<div className='w-96'>
					<Carousel images={data.images} />
				</div>

				<div className='relative flex-grow grid grid-cols-1 auto-cols-auto gap-y-4 h-full w-full mx-auto min-h-128'>
					<h2 className='text-5xl font-semibold pr-36'>{data.title}</h2>
					<h3 className='text-xl text-gray-500'>{data.artists.map(i => i.name).join(', ')}</h3>
					{data.notes ? <p>{data.notes}</p> : ''}
					<div className='absolute top-3 right-0 space-y-0'>
						<MasterLink masterId={data.master_id} />
					</div>
				</div>

			</div>


			<div className='grid auto-cols-auto grid-cols-2 md:grid-cols-4'>
				{Object.keys(details).map(k => (
					<div key={k}>
						<span>{details[k]}</span>
						<span>{data[k]}</span>
					</div>
				))}
			</div>

		</div>
	);
}

export default ReleasePage;