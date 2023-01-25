import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import Select from 'react-select';
import { ReleaseViewType } from '../../../types/custom';
import { Folder } from '../../../types/discogs';

interface CollectionToolbarProps {
  filterOptions?: Folder[];
  currentFilter?: Folder;
  setFilter?: (id: number) => void;
  count: number;
  type?: ReleaseViewType;
  setType?: (type: ReleaseViewType) => void;
}

const parseFilter = (folder: Folder) => ({ value: folder.id, label: `${folder.name} (${folder.count})` });

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

  const [options, setOptions] = useState<{ value: number, label: string }[]>();

  useMemo(() => {
    if (filterOptions && filterOptions.length) {
      setOptions(filterOptions.filter(f => f.count > 0).map(f => parseFilter(f)));
    }
  }, [filterOptions]);

  return (
    <div className="flex justify-between items-center bg-white rounded-md shadow-lg mb-6 py-3 px-4">
      <div className="flex items-center">
        {(options && options.length) ?
          <>
            <label id="filter-label" htmlFor="filter" className="sr-only">
              Items per Page
            </label>
            <Select
              aria-labelledby="filter-label"
              inputId="filter"
              name="select-filter"
              className="mr-4 w-44"
              defaultValue={options[0]}
              options={options}
              value={currentFilter && parseFilter(currentFilter)}
              onChange={(option) => option && setFilter && setFilter(option.value)}
              placeholder="Filter by Folder"
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary25: '#d3e5ea',
                  primary: '#0891b2'
                }
              })}
            />
          </> : ''}
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