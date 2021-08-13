import React from 'react';
import Head from 'next/head';

import DataMap from '../components/data-map';

class Home extends React.Component {
  render(): JSX.Element {
    return (
      <div>
        <Head>
          <title>C19 Tracker</title>
        </Head>
        <section className="section">
          <DataMap />
        </section>
      </div>
    );
  }
}

export default Home;
