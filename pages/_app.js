/* eslint-disable react/jsx-props-no-spreading */
import Head from 'next/head';
import '../public/css/all.min.css';
import '../scss/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
