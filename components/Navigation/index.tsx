import Link from 'next/link';
import React from 'react';

const Navigation = () => {
	return (
		<header>
			<nav
				className="fixed z-10 w-full border-b bg-white bg-opacity-70 backdrop-blur navbar peer-checked:navbar-active md:absolute md:bg-transparent">
				<div className="container max-w-7xl m-auto px-6">
					<div className="flex flex-wrap items-center justify-between gap-6 md:py-3 md:gap-0">
						<div className="w-full px-6 flex justify-between lg:w-max md:px-0">
							<Link href="/" aria-label="logo">
								<a className="flex space-x-2 items-center">
									<div aria-hidden="true" className="flex space-x-1">
										<div className="flex items-center justify-center h-7 w-7 rounded-full bg-gray-900">
											<div className="z1 h-2 w-2 rounded-full bg-white"></div>
										</div>
									</div>
									<span className="text-base font-bold text-gray-400">HEAP</span>
								</a>
							</Link>
							<label htmlFor="hbr"
							       className="peer-checked:hamburger block relative z-20 p-6 -mr-6 cursor-pointer lg:hidden">
								<div aria-hidden="true"
								     className="m-auto h-0.5 w-6 rounded bg-sky-900 transition duration-300"></div>
								<div aria-hidden="true"
								     className="m-auto mt-2 h-0.5 w-6 rounded bg-sky-900 transition duration-300"></div>
							</label>
						</div>
						<div
							className="navmenu hidden w-full flex-wrap justify-end items-center mb-16 mx-6 space-y-20 p-6 rounded-xl shadow-lg bg-white lg:space-y-0 lg:p-0 lg:m-0 lg:flex md:flex-nowrap lg:bg-transparent lg:w-7/12 lg:shadow-none">
							<div className="text-gray-600 lg:pr-4">
								<ul className="space-y-6 tracking-wide font-medium text-lg lg:text-sm lg:flex lg:space-y-0">
									<li>
										<Link href="/collection"
										      className="block md:px-4 transition hover:text-sky-700">
											<a><span>Collection</span></a>
										</Link>
									</li>
									<li>
										<Link href="/wishlist">
											<a className="block md:px-4 transition hover:text-sky-700">
												<span>Wishlist</span>
											</a>
										</Link>
									</li>
								</ul>
							</div>

							<div
								className="w-full space-y-2 border-sky-200 flex flex-col items-center -ml-1 sm:flex-row lg:space-y-0 md:w-max lg:border-l">

								<Link href="https://www.discogs.com/developers" target="_blank" rel="noreferrer">
									<a className="block md:px-4 transition hover:text-sky-700">
										<span className="block text-sky-800 font-semibold lg:text-sm">
											Discogs API
										</span>
									</a>
								</Link>

							</div>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Navigation;