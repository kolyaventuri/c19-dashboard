import * as React from 'react';
import {Disclosure} from '@headlessui/react';
import {AppProps} from 'next/dist/next-server/lib/router/router';
import 'tailwindcss/tailwind.css';

const App = ({Component, pageProps}: AppProps): JSX.Element => (
  <div className="min-h-screen bg-white">
    <Disclosure as="nav" className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center select-none">
              <h1 className="text-3xl font-bold">
                <a href="/">
                  C<span className="text-blue-500">19</span>.kolyaventuri.dev
                </a>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </Disclosure>

    <div className="py-10">
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900 py-2">
            U.S. COVID Data Tracker
          </h1>
          <p className="text-gray-700">
            A Covid-19 data tracker, extending the data available on{' '}
            <a
              href="https://covidactnow.org"
              target="_blank"
              className="underline"
              rel="noreferrer"
            >
              CovidActNow.org
            </a>
            .
          </p>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Component {...pageProps} />
        </div>
      </main>
    </div>
  </div>
);

export default App;
