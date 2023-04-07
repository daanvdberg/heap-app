import type { NextPage } from 'next';
import Link from 'next/link';
import pageBackground from '../assets/bg-page.jpg';
import recordsBackground from '../assets/bg-records.jpg';
import booksBackground from '../assets/bg-books.jpg';

const Home: NextPage = () => {
  return (
    <div
      className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${pageBackground.src}` }}
    >
      <Link href="/records/collection" className="flex items-center justify-center px-2 text-center hover:text-sky-600">
        <div
          className="relative z-10 m-4 flex h-80 w-72 flex-col items-center justify-center overflow-hidden rounded-2xl bg-slate-800 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${recordsBackground.src}` }}
        >
          <div className="flex w-full grow items-center justify-center text-xl text-slate-700 transition-colors hover:bg-slate-900/10">
            <div className="rounded bg-white py-1 px-2 text-xl font-semibold text-slate-700 shadow">My Collection</div>
          </div>
        </div>
      </Link>
      <Link href="/records/wishlist" className="flex items-center justify-center px-2 text-center hover:text-sky-600">
        <div
          className="relative z-10 m-4 flex h-80 w-72 flex-col items-center justify-center overflow-hidden rounded-2xl bg-slate-800 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${booksBackground.src}` }}
        >
          <div className="flex w-full grow items-center justify-center text-xl text-slate-700 transition-colors hover:bg-slate-900/10">
            <div className="transition-colorsfont-semibold rounded bg-white py-1  px-2 shadow">My Wishlist</div>
          </div>
        </div>
      </Link>
      <div className="fixed top-0 right-0 bottom-0 left-0 bg-slate-200 opacity-70 dark:bg-slate-900"></div>
    </div>
  );
};

export default Home;
