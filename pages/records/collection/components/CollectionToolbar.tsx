import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import Select from 'react-select';
import colors from 'tailwindcss/colors';
import { ReleaseViewType } from '../../../../types/custom';
import { Folder } from '../../../../types/discogs';

interface CollectionToolbarProps {
  filterOptions?: Folder[];
  currentFilter?: Folder;
  setFilter?: (id: number) => void;
  count: number;
  type?: ReleaseViewType;
  setType?: (type: ReleaseViewType) => void;
}

const parseFilter = (folder: Folder) => ({
  value: folder.id,
  label: `${folder.name} (${folder.count})`,
});

const CollectionToolbar = ({
  filterOptions,
  currentFilter,
  setFilter,
  count,
  type = 'grid',
  setType,
}: CollectionToolbarProps) => {
  const isDarkMode = false;
  const [options, setOptions] = useState<{ value: number; label: string }[]>();

  useMemo(() => {
    if (filterOptions && filterOptions.length) {
      setOptions(filterOptions.filter((f) => f.count > 0).map((f) => parseFilter(f)));
    }
  }, [filterOptions]);

  return (
    <div className="-ml-4 -mr-4 mb-6 flex items-center justify-between bg-white py-3 px-4 dark:bg-slate-800 sm:ml-0 sm:mr-0 sm:rounded-md">
      <div className="flex items-center">
        {options && options.length ? (
          <>
            <label id="filter-label" htmlFor="filter" className="sr-only">
              Items per Page
            </label>
            <Select
              aria-labelledby="filter-label"
              inputId="filter"
              name="select-filter"
              className="rs-container mr-4 w-44"
              classNamePrefix="rs-select"
              defaultValue={options[0]}
              options={options}
              value={currentFilter && parseFilter(currentFilter)}
              onChange={(option) => option && setFilter && setFilter(option.value)}
              placeholder="Filter by Folder"
            />
          </>
        ) : (
          ''
        )}
        <div className="hidden text-sm dark:text-slate-200 sm:block">
          {count > 0 ? `${count} Releases` : 'No Releases'}
        </div>
      </div>
      {setType ? (
        <div className="relative flex items-center">
          <button
            onClick={() => setType && setType('grid')}
            className={`focus:bg-primary inline-flex items-center justify-center rounded-l-md border border-slate-200 bg-white px-4 py-2.5 text-center dark:border-slate-300 dark:bg-slate-800 dark:text-slate-400 [&.active]:bg-slate-100 [&.active]:dark:bg-slate-300 [&.active]:dark:text-slate-800${
              type === 'grid' ? ' active' : ''
            }`}
          >
            <FontAwesomeIcon icon={solid('border-all')} className="mr-1 h-4 w-4" />
          </button>
          <button
            onClick={() => setType && setType('list')}
            className={`focus:bg-primary inline-flex items-center justify-center rounded-r-md border border-l-0 border-slate-200 bg-white px-4 py-2.5 text-center dark:border-slate-300 dark:bg-slate-800 dark:text-slate-400 [&.active]:bg-slate-100 [&.active]:dark:bg-slate-300 [&.active]:dark:text-slate-800${
              type === 'list' ? ' active' : ''
            }`}
          >
            <FontAwesomeIcon icon={solid('list')} className="mr-1 h-4 w-4" />
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default CollectionToolbar;
