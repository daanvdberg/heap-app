import React from 'react';
import { inferRouterInputs } from '@trpc/server';
import ReactPaginate from 'react-paginate';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from 'react-select';
import { AppRouter } from '../../server/routers/_app';

type RouterInput = inferRouterInputs<AppRouter>;
type PostsPerPageType = RouterInput['userCollection']['releases']['perPage'];

interface PaginateProps {
  postsPerPage?: PostsPerPageType;
  setPerPage?: (perPage: PostsPerPageType) => void;
  totalPages: number;
  paginate?: (page: number) => void;
  currentPage?: number;
  count?: number;
}

const perPageOptions: { value: PostsPerPageType, label: string }[] = [
  { value: 16, label: '16 / page' },
  { value: 32, label: '32 / page' }
];

const Pagination = ({ postsPerPage = 16, totalPages, paginate, currentPage = 1, count = 0, setPerPage}: PaginateProps) => {

  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const lowerLimit = 1 + (currentPage - 1) * postsPerPage;
  const upperLimit = Math.min((currentPage - 1) * postsPerPage + postsPerPage, count);

  return (
    <div className="flex justify-between items-center bg-white rounded-md shadow-lg my-6 py-3 px-4">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div className="basis-60">
          {count ? <p className="text-sm text-gray-700">
            Showing&nbsp;
            <span className="font-medium">{lowerLimit}</span>
            &nbsp;to&nbsp;
            <span className="font-medium">{upperLimit}</span>
            &nbsp;of&nbsp;
            <span className="font-medium">{count}</span>
            &nbsp;results
          </p> : ''}
        </div>
        <div className="flex justify-center grow">
          <ReactPaginate
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            previousLinkClassName="relative inline-flex items-center justify-center rounded-l-md border border-slate-300 bg-white h-9 px-3.5 text-sm font-medium text-slate-500 hover:bg-gray-50 focus:z-20"
            nextLinkClassName="relative inline-flex items-center justify-center rounded-r-md border border-slate-300 bg-white h-9 px-3.5 text-sm font-medium text-slate-500 hover:bg-gray-50 focus:z-20"
            pageLinkClassName="relative inline-flex items-center justify-center border border-slate-300 bg-white h-9 px-3.5 text-sm font-medium text-slate-500 hover:bg-gray-50 focus:z-20"
            activeLinkClassName="z-30 border-cyan-500 bg-cyan-50 text-cyan-600 focus:z-20"
            disabledLinkClassName="pointer-events-none border-slate-200 bg-gray-50 text-slate-300"
            pageCount={totalPages}
            forcePage={currentPage - 1}
            onPageChange={({ selected }) => paginate && paginate(selected + 1)}
            nextLabel={<FontAwesomeIcon icon={solid('arrow-right-long')} className="h-3 w-5" />}
            previousLabel={<FontAwesomeIcon icon={solid('arrow-left-long')} className="h-3 w-5" />}
            pageRangeDisplayed={4}
          />
        </div>
        <div className="hidden sm:flex basis-60 flex justify-end">
          <label id="per-page-label" htmlFor="per-page" className="sr-only">
            Items per Page
          </label>
          <Select
            aria-labelledby="per-page-label"
            inputId="per-page"
            name="select-per-page"
            className="w-44"
            defaultValue={perPageOptions[0]}
            options={perPageOptions}
            placeholder="Items per Page"
            value={perPageOptions.find((item) => item.value === postsPerPage)}
            onChange={(value) => setPerPage && value && setPerPage(value.value)}
            isSearchable={false}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25: '#0891b2',
                primary: '#0891b2'
              }
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default Pagination;