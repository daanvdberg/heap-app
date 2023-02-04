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

  const { status, data } = trpc.discogs.resources.release.useQuery(
    { id: rid as string },
    { enabled: !!rid }
  );

  let query = '';
  if (data) {
    query =
      'album:' +
      data.title +
      (data.artists[0] ? ' artist:' + data.artists[0].name : '');
  }
  const { data: spotifyData } = trpc.spotify.search.useQuery(
    { query },
    { enabled: !!query }
  );

  if (status === 'loading') {
    return <h1>Loading...</h1>;
  }

  if (status === 'error') {
    return <div>Error...</div>;
  }

  return (
    <div className="mx-auto min-h-screen max-w-6xl pt-0 sm:pt-10">
      <div className="flex flex-col items-center justify-center space-y-8 md:flex-row md:items-start md:space-y-0 md:space-x-4 lg:space-x-8">
        <div className="w-96">
          <Carousel images={data.images} />
        </div>

        <div className="min-h-128 relative mx-auto grid h-full w-full flex-grow auto-cols-auto grid-cols-1 gap-y-4">
          <h2 className="pr-36 text-5xl font-semibold">{data.title}</h2>
          <h3 className="pr-36 text-xl text-gray-500">
            {data.artists.map((i) => i.name).join(', ')}
          </h3>
          {data.notes ? <p>{data.notes}</p> : ''}
          <div className="flex space-y-0 space-x-3">
            <ReleaseLink releaseId={data.uri} />
            <ReleaseLink releaseId={data.master_id} isMaster={true} />
          </div>
        </div>
      </div>

      <div className="md:grid-cols-3c my-10 grid auto-cols-auto gap-x-6 gap-y-6 rounded-xl bg-white dark:bg-slate-800 sm:grid-cols-2 sm:px-20 sm:py-10">
        <h2 className="col-span-2 text-2xl font-medium">Release Details</h2>
        <div className="col-span-2 flex items-center rounded-md bg-slate-100 py-2 px-4 dark:bg-slate-900 sm:col-span-1">
          <FontAwesomeIcon icon={solid('barcode')} className="h-5 w-5" />
          <div className="ml-4">
            <span className="block font-semibold">ID</span>
            <span className="block">{data.id}</span>
          </div>
        </div>
        <div className="col-span-2 flex items-center rounded-md bg-slate-100 py-2 px-4 dark:bg-slate-900 sm:col-span-1">
          <FontAwesomeIcon icon={solid('calendar')} className="h-5 w-5" />
          <div className="ml-4">
            <span className="block font-semibold">Released</span>
            <span className="block">
              {data.released_formatted || data.released || 'N/A'}
            </span>
          </div>
        </div>
        <div className="col-span-2 flex items-center rounded-md bg-slate-100 py-2 px-4 dark:bg-slate-900 sm:col-span-1">
          <FontAwesomeIcon icon={solid('music')} className="h-5 w-5" />
          <div className="ml-4">
            <span className="block font-semibold">Genre(s)</span>
            <span className="block">{data.genres.join(', ')}</span>
          </div>
        </div>
        <div className="col-span-2 flex items-center rounded-md bg-slate-100 py-2 px-4 dark:bg-slate-900 sm:col-span-1">
          <FontAwesomeIcon
            icon={solid('microphone-lines')}
            className="h-5 w-5"
          />
          <div className="ml-4">
            <span className="block font-semibold">Style(s)</span>
            <span className="block">{(data.styles || []).join(', ')}</span>
          </div>
        </div>
        <div className="col-span-2 flex items-center rounded-md bg-slate-100 py-2 px-4 dark:bg-slate-900 sm:col-span-1">
          <FontAwesomeIcon icon={solid('building')} className="h-5 w-5" />
          <div className="ml-4">
            <span className="block font-semibold">Label(s)</span>
            <span className="block">
              {data.labels.map((i) => i.name).join(', ')}
            </span>
          </div>
        </div>
        <div className="col-span-2 flex items-center rounded-md bg-slate-100 py-2 px-4 dark:bg-slate-900 sm:col-span-1">
          <FontAwesomeIcon icon={solid('compact-disc')} className="h-5 w-5" />
          <div className="ml-4">
            <span className="block font-semibold">Format(s)</span>
            <span className="block">
              {data.formats.map((f) => f.name).join(', ')}
            </span>
          </div>
        </div>
      </div>

      <div className="sm:flex">
        <div className="basis-7/12 space-y-4 rounded-xl bg-slate-900 px-8 pt-6 pb-8 text-slate-100 dark:bg-slate-100 dark:text-slate-900 sm:min-h-[500px] sm:py-20 sm:px-24">
          <h3 className="mb-10 text-3xl font-semibold">Tracklist</h3>
          {data.tracklist.map((track, index, elements) => {
            const next = elements[index + 1];
            return (
              <div
                key={track.position}
                className={`flex items-center${
                  next && track.position[0] !== next.position[0]
                    ? ' border-b border-white/50 pb-4 dark:border-slate-900/50'
                    : ''
                }`}
              >
                <span className="bg-slate-90 mr-4 inline-flex h-6 items-center rounded-md bg-slate-100 px-3 text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                  {track.position}
                </span>
                <span className="flex-grow">{track.title}</span>
                <span>{track.duration}</span>
              </div>
            );
          })}
        </div>
        <div className="flex basis-5/12 flex-col pt-5 sm:block sm:min-h-[500px] sm:pt-0 sm:pl-10">
          {spotifyData?.albums?.items?.length ? (
            <iframe
              className="border-1 h-full min-h-[600px] sm:min-h-0"
              src={`https://open.spotify.com/embed/album/${spotifyData.albums.items[0].id}`}
              width="100%"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}

export default Release;
