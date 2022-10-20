import React from 'react';
import Head from 'next/head';
import Navigation from './Navigation';

type Props = {
	children?: React.ReactNode
};

export default function Layout({ children }: Props) {
	return (
		<div className="relative w-full">
			<Head>
				<title>Create Next App</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Navigation />

			<main className="container pt-32 px-6 max-w-7xl mx-auto">{children}</main>

		</div>
	)
}
