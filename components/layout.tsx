import React from 'react';
import Head from 'next/head';
import Navigation from './Navigation';

type Props = {
  children?: React.ReactNode
};

export default function Layout({ children }: Props) {
  return (
    <div className="relative w-full pb-20">
      <Head>
        <title>Heap</title>
        <meta name="description" content="Heap app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />

      <main className="container pt-20 sm:pt-24 md:pt-28 px-4 sm:px-6 max-w-7xl mx-auto">{children}</main>

    </div>
  );
}
