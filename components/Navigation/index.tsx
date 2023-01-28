import React, { useEffect, useState } from 'react';
import { brands, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
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
        className={`fixed z-10 ${showNav ? 'h-full ' : ''}w-full border-b border-gray-300 dark:border-slate-500 bg-white dark:bg-slate-900 bg-opacity-70 backdrop-blur navbar peer-checked:navbar-active md:absolute`}>
        <div className="container h-full max-w-7xl m-auto px-6">
          <div className="h-full flex flex-col sm:flex-row sm:flex-wrap items-center justify-between gap-6 md:py-3 md:gap-0">
            <div className="w-full flex justify-between lg:w-max">
              <Link href="/" aria-label="logo" className="flex space-x-2 items-center dark:text-white">
                <FontAwesomeIcon icon={solid('otter')} className="h-7 w-7" />
                <span className="text-base font-bold text-gray-400">HEAP</span>
              </Link>
              <label htmlFor="hbr"
                     className="peer-checked:hamburger block relative z-20 p-6 -mr-6 cursor-pointer lg:hidden"
                     onClick={() => setShowNav((s) => !s)}
              >
                <div aria-hidden="true"
                     className={`m-auto h-0.5 w-6 rounded bg-slate-800 dark:bg-gray-200 transition duration-300${showNav ? ' rotate-45 translate-y-[6px]' : ''}`}></div>
                <div aria-hidden="true"
                     className={`m-auto mt-2 h-0.5 w-6 rounded bg-slate-800 dark:bg-gray-200 transition duration-300${showNav ? ' -rotate-45 -translate-y-[4px]' : ''}`}></div>
              </label>
            </div>
            <div
              className={`${showNav ? 'block' : 'hidden'} h-full w-full flex-wrap justify-end items-center mb-7 space-y-7 p-6 rounded-xl shadow-lg bg-white dark:bg-slate-800 lg:space-y-0 lg:p-0 lg:m-0 lg:flex md:flex-nowrap lg:bg-transparent lg:w-10/12 lg:shadow-none`}>
              <div className="text-gray-600 dark:text-gray-200 pb-6 lg:pb-0 lg:px-2 border-b lg:border-b-0 lg:border-l border-slate-400 lg:border-sky-400">
                <ul className="space-y-6 tracking-wide font-medium text-md lg:text-lg lg:text-sm lg:flex lg:space-y-0">
                  <li className="flex items-center lg:px-4 text-slate-400">
                    <FontAwesomeIcon icon={solid('record-vinyl')} className="h-5 w-5" title="My Records" />
                    <span className="lg:hidden pl-2">My Records</span>
                  </li>
                  <li>
                    <Link href="/records/collection" className="block lg:px-4 transition hover:text-sky-700 dark:hover:text-sky-500">
                      <span>Collection</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/records/wishlist" className="block lg:px-4 transition hover:text-sky-700 dark:hover:text-sky-500">
                      <span>Wishlist</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="text-gray-600 dark:text-gray-200 pb-6 lg:pb-0 lg:px-2 border-b lg:border-b-0 lg:border-l border-slate-400 lg:border-sky-400">
                <ul className="space-y-6 tracking-wide font-medium text-md lg:text-sm lg:flex lg:space-y-0">
                  <li className="flex items-center lg:px-4 text-slate-400">
                    <FontAwesomeIcon icon={solid('book')} className="h-5 w-5" title="My Books" />
                    <span className="lg:hidden pl-2">My Books</span>
                  </li>
                  <li>
                    <Link href="/books/read" className="block lg:px-4 transition hover:text-sky-700 dark:hover:text-sky-500">
                      <span>Read</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/books/want-to-read" className="block lg:px-4 transition hover:text-sky-700 dark:hover:text-sky-500">
                      <span>Want to Read</span>
                    </Link>
                  </li>
                </ul>
              </div>

              <div
                className="w-full grid lg:space-x-4 lg:grid-flow-col gap-2 items-center text-center lg:pl-2 lg:w-max lg:border-l border-sky-400 text-xs lg:text-sm">
                <div className="lg:hidden col-span-3 mb-7 flex items-center font-medium text-md lg:text-lg text-slate-400">
                  <FontAwesomeIcon icon={solid('record-vinyl')} className="h-5 w-5" title="My Records" />
                  <span className="pl-2">Tools</span>
                </div>
                <a href="https://developer.spotify.com/documentation/web-api/reference/#/" target="_blank" rel="noreferrer"
                   title="Spotify API Documentation"
                   className="inline-flex flex-col lg:flex-row items-center justify-center lg:w-7 lg:h-7 mr-2 lg:mr-4 lg:mr-0 p-3 lg:p-0 border border-sky-400 rounded-md hover:bg-sky-100 dark:hover:bg-sky-900 transition-colors">
                  <FontAwesomeIcon icon={brands('spotify')} className="w-5 lg:w-4 h-5 lg:h-4 text-sky-600" />
                  <span className="lg:hidden text-sky-600 mt-2">Spotify API Docs</span>
                </a>
                <a href="https://www.discogs.com/developers" target="_blank" rel="noreferrer"
                   title="Discogs API Documentation"
                   className="inline-flex flex-col lg:flex-row items-center justify-center lg:w-7 lg:h-7 mr-2 lg:mr-4 lg:mr-0 p-3 lg:p-0 border border-sky-400 rounded-md hover:bg-sky-100 dark:hover:bg-sky-900 transition-colors">
                  <FontAwesomeIcon icon={solid('record-vinyl')} className="w-5 lg:w-4 h-5 lg:h-4 text-sky-600" />
                  <span className="lg:hidden text-sky-600 mt-2">Discogs API Docs</span>
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