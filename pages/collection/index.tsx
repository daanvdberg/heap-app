import { useCallback } from 'preact/compat';
import React, { useState } from 'react';
import ReleaseCard from '../../components/ReleaseCard';
import ReleaseListItem from '../../components/ReleaseListItem';
import { ReleaseViewType } from '../../types/custom';
import { trpc } from '../../utils/trpc';
import CollectionToolbar from './components/CollectionToolbar';

const options = [
  { value: 'all', label: 'All Releases' },
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

const Collection = () => {

  const { status, data } = trpc.releases.all.useQuery({ page: 2 });

  const [viewType, setViewType] = useState<ReleaseViewType>('grid');

  const handleSetViewType = (type: ReleaseViewType) => {
    console.log(type);
    setViewType(type);
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
        filterOptions={options}
        count={data.releases.length}
        type={viewType}
        setType={handleSetViewType}
      />

      <div className={`grid gap-6${viewType === 'grid' ? ' grid-cols-4' : ''}`}>
        {data.releases.map((release) => (viewType === 'grid'
          ? <ReleaseCard release={release} key={release.id} />
          : <ReleaseListItem release={release} key={release.id} />
        ))}
      </div>

    </div>
  );
};

export default Collection;