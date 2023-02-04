import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ReleaseCard from '../../../components/ReleaseCard';
import ReleaseListItem from '../../../components/ReleaseListItem';
import Pagination from '../../../components/Pagination';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { DiscogsRouter } from '../../../server/routers/discogs';
import { ReleaseViewType } from '../../../types/custom';
import { Folder } from '../../../types/discogs';
import { isMobile } from '../../../utils';
import { trpc } from '../../../utils/trpc';
import CollectionToolbar from './components/CollectionToolbar';
import type { inferRouterInputs } from '@trpc/server';

type RouterInput = inferRouterInputs<DiscogsRouter>;
type QueryParam = { key: number | string; value: number | string };
type PerPageType = RouterInput['userCollection']['releases']['perPage'];

const Collection = () => {
  const { replace, query } = useRouter();

  const [folder, setFolder] = useState<Folder>();
  const [viewType, setViewType] = useLocalStorage<ReleaseViewType>('view-type', 'grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useLocalStorage<PerPageType>('items-per-page', 16);

  const { data: folderData = { folders: [] } } = trpc.discogs.userCollection.folders.useQuery();

  const { status, data } = trpc.discogs.userCollection.releases.useQuery(
    { folder, page: currentPage, perPage: postsPerPage },
    { enabled: !!folder }
  );

  useEffect(() => {
    if (isMobile()) setViewType('list');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (query?.page) setCurrentPage(parseInt(query.page as string, 10));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.page]);

  useEffect(() => {
    const { folder = 0 } = query;
    handleSetFolder(parseInt(folder as string, 10), true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.folder, folderData.folders]);

  const handleSetPostsPerPage = (perPage: PerPageType) => {
    if (perPage) setPostsPerPage(perPage);
  };

  const handleSetFolder = (id: number, initialize = false) => {
    if (id >= 0 && folderData.folders.length) {
      const newFilter = folderData.folders.find((f) => f.id === id);
      if (newFilter) {
        setFolder(newFilter);
        const params: QueryParam[] = [{ key: 'folder', value: newFilter.id.toString() }];
        if (!initialize) {
          setCurrentPage(1);
          params.push({ key: 'page', value: 1 });
        }
        updateQueryParams(params);
      }
    }
  };

  const handleSetViewType = (type: ReleaseViewType) => {
    setViewType(type);
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    updateQueryParams([{ key: 'page', value: pageNumber }]);
  };

  const updateQueryParams = (params: QueryParam[]) => {
    const newParams = params.reduce((prev, curr) => ({ ...prev, [curr.key]: curr.value }), {});
    replace({ query: { ...query, ...newParams } }, undefined, {
      shallow: true,
    });
  };

  if (status === 'loading') {
    return <h1>Loading...</h1>;
  }

  if (status === 'error') {
    return <div>Error...</div>;
  }

  return (
    <div>
      <CollectionToolbar
        filterOptions={folderData.folders}
        currentFilter={folder}
        setFilter={handleSetFolder}
        count={data.pagination.items}
        type={viewType}
        setType={handleSetViewType}
      />

      <div
        className={`grid gap-4 sm:grid-gap-6${
          viewType === 'grid' ? ' grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : ''
        }`}
      >
        {data.releases.map((release) =>
          viewType === 'grid' ? (
            <ReleaseCard release={release} key={release.id} />
          ) : (
            <ReleaseListItem release={release} key={release.id} />
          )
        )}
      </div>

      <Pagination
        totalPages={data.pagination.pages}
        postsPerPage={postsPerPage}
        setPerPage={handleSetPostsPerPage}
        paginate={paginate}
        currentPage={currentPage}
        count={data.pagination.items}
      />
    </div>
  );
};

export default Collection;
