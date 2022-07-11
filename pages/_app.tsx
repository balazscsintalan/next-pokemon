import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Navbar from '../components/navbar/Navbar';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Pokedex</title>
      <meta name="description" content="Pokedex with pokemonapi" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Navbar />
    <Component {...pageProps} />
  </>
);

export default MyApp;
