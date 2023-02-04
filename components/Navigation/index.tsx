import React, { useEffect, useState } from 'react';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ThemeSwitch from '../ThemeSwitch';

const Navigation = () => {
  const router = useRouter();

  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    if (showNav) {
      document.documentElement.classList.add('modal');
    } else {
      document.documentElement.classList.remove('modal');
    }
  }, [showNav]);

  useEffect(() => {
    setShowNav(() => false);
  }, [router.asPath]);

  return (
    <header>
      <nav
        className={`fixed z-10 ${
          showNav ? 'h-full ' : ''
        }w-full navbar peer-checked:navbar-active border-b border-gray-300 bg-white bg-opacity-70 backdrop-blur dark:border-slate-500 dark:bg-slate-900 md:absolute`}
      >
        <div className="container m-auto h-full max-w-7xl px-6">
          <div className="flex h-full flex-col items-center justify-between gap-6 sm:flex-row sm:flex-wrap md:gap-0 md:py-3">
            <div className="flex w-full justify-between lg:w-max">
              <Link
                href="/"
                aria-label="logo"
                className="flex items-center space-x-2 dark:text-white"
              >
                <FontAwesomeIcon icon={solid('otter')} className="h-7 w-7" />
                <span className="text-base font-bold text-gray-400">HEAP</span>
              </Link>
              <label
                htmlFor="hbr"
                className="peer-checked:hamburger relative z-20 -mr-6 block cursor-pointer p-6 lg:hidden"
                onClick={() => setShowNav((s) => !s)}
              >
                <div
                  aria-hidden="true"
                  className={`m-auto h-0.5 w-6 rounded bg-slate-800 transition dark:bg-gray-200 duration-300${
                    showNav ? ' translate-y-[6px] rotate-45' : ''
                  }`}
                ></div>
                <div
                  aria-hidden="true"
                  className={`m-auto mt-2 h-0.5 w-6 rounded bg-slate-800 transition dark:bg-gray-200 duration-300${
                    showNav ? ' -translate-y-[4px] -rotate-45' : ''
                  }`}
                ></div>
              </label>
            </div>
            <div
              className={`${
                showNav ? 'block' : 'hidden'
              } mb-7 h-full w-full flex-wrap items-center justify-end space-y-7 rounded-xl bg-white p-6 shadow-lg dark:bg-slate-800 md:flex-nowrap lg:m-0 lg:flex lg:w-10/12 lg:space-y-0 lg:bg-transparent lg:p-0 lg:shadow-none lg:dark:bg-slate-900`}
            >
              <div className="border-b border-slate-400 pb-6 text-gray-600 dark:text-gray-200 lg:border-b-0 lg:border-l lg:border-sky-400 lg:px-2 lg:pb-0">
                <ul className="text-md space-y-6 font-medium tracking-wide lg:flex lg:space-y-0 lg:text-lg lg:text-sm">
                  <li
                    className="flex items-center text-slate-400 lg:px-4"
                    title="My Records"
                  >
                    <FontAwesomeIcon
                      icon={solid('record-vinyl')}
                      className="h-5 w-5"
                    />
                    <span className="pl-2 lg:hidden">My Records</span>
                  </li>
                  <li>
                    <Link
                      href="/records/collection"
                      className="block transition hover:text-sky-700 dark:hover:text-sky-500 lg:px-4"
                    >
                      <span>Collection</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/records/wishlist"
                      className="block transition hover:text-sky-700 dark:hover:text-sky-500 lg:px-4"
                    >
                      <span>Wishlist</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="border-b border-slate-400 pb-6 text-gray-600 dark:text-gray-200 lg:border-b-0 lg:border-l lg:border-sky-400 lg:px-2 lg:pb-0">
                <ul className="text-md space-y-6 font-medium tracking-wide lg:flex lg:space-y-0 lg:text-sm">
                  <li
                    className="flex items-center text-slate-400 lg:px-4"
                    title="My Books"
                  >
                    <FontAwesomeIcon icon={solid('book')} className="h-5 w-5" />
                    <span className="pl-2 lg:hidden">My Books</span>
                  </li>
                  <li>
                    <Link
                      href="/books/read"
                      className="block transition hover:text-sky-700 dark:hover:text-sky-500 lg:px-4"
                    >
                      <span>Read</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/books/want-to-read"
                      className="block transition hover:text-sky-700 dark:hover:text-sky-500 lg:px-4"
                    >
                      <span>Want to Read</span>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="grid w-full items-center gap-2 border-sky-400 text-center text-xs lg:w-max lg:grid-flow-col lg:space-x-4 lg:border-l lg:pl-2 lg:text-sm">
                <div className="text-md col-span-3 mb-7 flex items-center font-medium text-slate-400 lg:hidden lg:text-lg">
                  <FontAwesomeIcon
                    icon={solid('record-vinyl')}
                    className="h-5 w-5"
                  />
                  <span className="pl-2">Tools</span>
                </div>
                <Link
                  href="/scanner"
                  title="Scanner"
                  className="mr-2 inline-flex flex-col items-center justify-center rounded-md border border-sky-400 p-3 transition-colors hover:bg-sky-100 dark:hover:bg-sky-900 lg:mr-4 lg:mr-0 lg:h-7 lg:w-7 lg:flex-row lg:p-0"
                >
                  <FontAwesomeIcon
                    icon={solid('barcode')}
                    className="h-5 w-5 text-sky-600 lg:h-4 lg:w-4"
                  />
                  <span className="mt-2 text-sky-600 lg:hidden">Scanner</span>
                </Link>
                <a
                  href="https://www.discogs.com/developers"
                  target="_blank"
                  rel="noreferrer"
                  title="Discogs API Documentation"
                  className="mr-2 inline-flex flex-col items-center justify-center rounded-md border border-sky-400 p-3 transition-colors hover:bg-sky-100 dark:hover:bg-sky-900 lg:mr-4 lg:mr-0 lg:h-7 lg:w-7 lg:flex-row lg:p-0"
                >
                  <FontAwesomeIcon
                    icon={solid('record-vinyl')}
                    className="h-5 w-5 text-sky-600 lg:h-4 lg:w-4"
                  />
                  <span className="mt-2 text-sky-600 lg:hidden">
                    Discogs API Docs
                  </span>
                </a>
                <ThemeSwitch />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
