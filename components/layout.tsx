import React, { ReactNode } from 'react';
import Head from 'next/head';
import Navigation from './Navigation';

type Props = {
  children?: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="relative w-full">
      <Head>
        <title>Heap</title>
        <meta name="description" content="Heap app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />

      <main className="container mx-auto max-w-7xl overflow-auto px-4 pt-20 pb-10 sm:px-6 sm:pt-24 md:pt-28">
        {children}
      </main>
    </div>
  );
}
