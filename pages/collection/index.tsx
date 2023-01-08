import React from 'react';
import Release from '../../components/ReleaseCard';
import { trpc } from '../../utils/trpc';
import CollectionToolbar from './components/CollectionToolbar';

const Collection = () => {

  const { status, data } = trpc.releases.all.useQuery({ page: 2 });

  if (status === 'loading') {
    return <h1>Loading...</h1>;
  }

  if (status === 'error') {
    return <div>Error...</div>;
  }

  console.log(data);

  return (
    <div>

      <CollectionToolbar count={data.releases.length} />

      <div className="grid grid-cols-4 gap-6">
        {data.releases.map((release) => <Release release={release} key={release.id} />)}
      </div>

    </div>
  );
};

export default Collection;