import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Navigation from './Navigation';

type Props = {
  children?: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const [windowSize, setWindowSize] = useState<number>();

  useEffect(() => {
    setWindowSize(window.innerHeight);
  }, []);

  return (
    <div className="relative w-full">
      <Head>
        <title>Heap</title>
        <meta name="description" content="Heap app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />

      <main
        className="container mx-auto max-w-7xl overflow-auto px-4 pt-20 pb-10 sm:px-6 sm:pt-24 md:pt-28"
        style={{ height: windowSize ? `${windowSize}px` : '0' }}
      >
        {children}
      </main>
    </div>
  );
}
