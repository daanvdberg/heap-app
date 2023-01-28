import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import Select from 'react-select';
import colors from 'tailwindcss/colors';
import useDarkMode from '../../../../hooks/useDarkMode';
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

  const { isDarkMode } = useDarkMode();
  const [options, setOptions] = useState<{ value: number, label: string }[]>();

  useMemo(() => {
    if (filterOptions && filterOptions.length) {
      setOptions(filterOptions.filter(f => f.count > 0).map(f => parseFilter(f)));
    }
  }, [filterOptions]);

  return (
    <div className="flex justify-between items-center bg-white dark:bg-slate-800 sm:rounded-md -ml-4 sm:ml-0 -mr-4 sm:mr-0 mb-6 py-3 px-4">
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
              styles={{
                control: (styles) => ({
                  ...styles,
                  backgroundColor: isDarkMode ? colors.slate['800'] : 'white',
                  borderColor: isDarkMode ? colors.slate['300'] : 'white'
                }),
                indicatorSeparator: (styles) => ({
                  ...styles,
                  backgroundColor: isDarkMode ? colors.slate['300'] : 'white'
                }),
                dropdownIndicator: (styles) => ({
                  ...styles,
                  color: isDarkMode ? colors.slate['300'] : 'white',
                }),
                singleValue: (styles) => ({ ...styles, color: isDarkMode ? colors.slate['300'] : colors.slate['800'] })
              }}
            />
          </> : ''}
        <div className="text-sm hidden sm:block dark:text-slate-200">
          {count > 0 ? `${count} Releases` : 'No Releases'}
        </div>
      </div>
      {setType ?
        <div className="flex relative items-center">
          <button
            onClick={() => setType && setType('grid')}
                className={`px-4 py-2.5 inline-flex items-center justify-center border rounded-l-md border-slate-200 dark:border-slate-300 text-center focus:bg-primary bg-white dark:bg-slate-800 [&.active]:bg-slate-100 [&.active]:dark:bg-slate-300 dark:text-slate-400 [&.active]:dark:text-slate-800${type === 'grid' ? ' active' : ''}`}
          >
            <FontAwesomeIcon icon={solid('border-all')} className="h-4 w-4 mr-1" />
          </button>
          <button
            onClick={() => setType && setType('list')}
            className={`px-4 py-2.5 inline-flex items-center justify-center border border-l-0 rounded-r-md border-slate-200 dark:border-slate-300 text-center focus:bg-primary bg-white dark:bg-slate-800 [&.active]:bg-slate-100 [&.active]:dark:bg-slate-300 dark:text-slate-400 [&.active]:dark:text-slate-800${type === 'list' ? ' active' : ''}`}
          >
            <FontAwesomeIcon icon={solid('list')} className="h-4 w-4 mr-1" />
          </button>
        </div> : ''}
    </div>
  );
};

export default CollectionToolbar;