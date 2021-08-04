import * as React from 'react';
import {AppProps} from 'next/dist/next-server/lib/router/router';
import '../styles/index.scss';

const App = ({Component, pageProps}: AppProps): JSX.Element => <Component {...pageProps} />;

export default App;
