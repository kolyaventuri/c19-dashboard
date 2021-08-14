import * as React from 'react';
import {Disclosure} from '@headlessui/react';
import {AppProps} from 'next/dist/next-server/lib/router/router';
import Head from 'next/head';
import Blagl from '@kolyaventuri/blagl-icon';
import 'tailwindcss/tailwind.css';

const App = ({Component, pageProps}: AppProps): JSX.Element => {
  const openBlagl = () => {
    window?.open('https://blagl.xyz/?ref=c19', '_blank');
  };

  return (
    <>
      <Head>
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env
            .GA_TRACKING_ID!}`}
        />
        <script>{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.GA_TRACKING_ID!}');
        `}</script>
      </Head>
      <div className="min-h-screen bg-white">
        <Disclosure as="nav" className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center select-none">
                  <h1 className="text-3xl font-bold">
                    <a href="/">
                      C<span className="text-blue-500">19</span>.blagl.xyz
                    </a>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </Disclosure>

        <div className="py-10 px-2">
          <header>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-5xl font-bold leading-tight text-gray-900 py-2">
                U.S. COVID Data Tracker
              </h1>
              <p className="text-gray-700 text-xl pb-4">
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
              <hr />
            </div>
          </header>
          <main>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <Component {...pageProps} />
            </div>
          </main>
          <footer className="fixed bottom-1 right-2">
            <Blagl onClick={openBlagl} />
          </footer>
        </div>
      </div>
    </>
  );
};

export default App;
