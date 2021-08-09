import React from 'react';
import Head from 'next/head';

import RiskMap from '../components/risk-map';

class Home extends React.Component {
  render(): JSX.Element {
    return (
      <div>
        <Head>
          <title>C19 Tracker</title>
        </Head>
        <section className="section">
          <RiskMap />
        </section>
      </div>
    );
  }
}

export default Home;
