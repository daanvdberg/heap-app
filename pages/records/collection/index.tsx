import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ReleaseCard from '../../../components/ReleaseCard';
import ReleaseListItem from '../../../components/ReleaseListItem';
import Pagination from '../../../components/Pagination';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { ReleaseViewType } from '../../../types/custom';
import { Folder } from '../../../types/discogs';
import { isMobile } from '../../../utils';
import { trpc } from '../../../utils/trpc';
import CollectionToolbar from './components/CollectionToolbar';
import type { inferRouterInputs } from '@trpc/server';
import type { AppRouter } from '../../../server/routers/_app';

type RouterInput = inferRouterInputs<AppRouter>;
type PerPageType = RouterInput['userCollection']['releases']['perPage'];

const Collection = () => {

  const { replace, query } = useRouter();

  const [folder, setFolder] = useState<Folder>();
  const [viewType, setViewType] = useLocalStorage<ReleaseViewType>('view-type', 'grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useLocalStorage<PerPageType>('items-per-page', 16);

  const { status: folderStatus, data: folderData = { folders: [] } } = trpc.userCollection.folders.useQuery();
  const { status, data } = trpc.userCollection.releases.useQuery({ folder, page: currentPage, perPage: postsPerPage });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (isMobile()) setViewType('list');
  }, []);

  const handleSetPostsPerPage = (perPage: PerPageType) => {
    if (perPage) setPostsPerPage(perPage);
  };

  const handleSetFolder = (id: number) => {
    if (id >= 0 && folderData.folders.length) {
      const newFilter = folderData.folders.find(f => f.id === id);
      if (newFilter) {
        setFolder(newFilter);
        setCurrentPage(1);
        updateQueryParams([{ key: 'page', value: 1 }, { key: 'folder', value: newFilter.id.toString() }]);
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

  const updateQueryParams = (params: { key: number | string, value: number | string }[]) => {
    const newParams = params.reduce((prev, curr) => ({ ...prev, [curr.key]: curr.value }), {});
    replace({ query: { ...query, ...newParams } }, undefined, { shallow: true });
  }

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

      <div className={`grid gap-4 sm:grid-gap-6${viewType === 'grid' ? ' grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : ''}`}>
        {data.releases.map((release) => (viewType === 'grid'
          ? <ReleaseCard release={release} key={release.id} />
          : <ReleaseListItem release={release} key={release.id} />
        ))}
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