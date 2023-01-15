import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import Select from 'react-select';
import { ReleaseViewType } from '../../../types/custom';

interface FilterOption {
  value: string,
  label: string
}

interface CollectionToolbarProps {
  filterOptions?: FilterOption[];
  currentFilter?: FilterOption;
  setFilter?: (filter: FilterOption) => void;
  count: number;
  type?: ReleaseViewType;
  setType?: (type: ReleaseViewType) => void;
}

const CollectionToolbar = (
  {
    filterOptions,
    currentFilter,
    setFilter,
    count,
    type = 'grid',
    setType
  }: CollectionToolbarProps
) => {
  if (!setType && !filterOptions) return null;
  return (
    <div className="flex justify-between items-center bg-white rounded-md shadow-lg mb-6 py-3 px-4">
      <div className="flex items-center">
        {(filterOptions && filterOptions.length) ?
          <Select
              className="mr-4 w-44" defaultValue={filterOptions[0]} options={filterOptions} placeholder="Filter Category"
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary25: '#0891b2',
                  primary: '#0891b2'
                }
              })}
          /> : ''}
        <div className="text-sm">
          {count > 0 ? `${count} Releases` : 'No Releases'}
        </div>
      </div>
      {setType ?
        <div className="flex relative items-center">
          <button
            onClick={() => setType && setType('grid')}
            className={`px-4 py-2.5 inline-flex items-center justify-center border rounded-l-md border-gray-200 text-center focus:bg-primary bg-white [&.active]:bg-gray-100${type === 'grid' ? ' active' : ''}`}
          >
            <FontAwesomeIcon icon={solid('border-all')} className="h-4 w-4 mr-1" />
          </button>
          <button
            onClick={() => setType && setType('list')}
            className={`px-4 py-2.5 inline-flex items-center justify-center border border-l-0 rounded-r-md border-gray-200 text-center focus:bg-primary bg-white [&.active]:bg-gray-100${type === 'list' ? ' active' : ''}`}
          >
            <FontAwesomeIcon icon={solid('list')} className="h-4 w-4 mr-1" />
          </button>
        </div> : ''}
    </div>
  );
};

export default CollectionToolbar;