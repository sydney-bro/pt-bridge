import Head from 'next/head';

import styles from '../styles/Home.module.css';

import { useState, useEffect } from 'react';

import Link from 'next/link';

export
  default function
  TokenInfo() {

  return (

    <div
      className={styles.container}>

      <Head>
        <title>pointless</title>

        <meta

          content="Generated by @rainbow-me/create-rainbowkit"

          name="pointless"

        />

        <link
          href="images/favicon.ico"
          rel="icon"
        />

      </Head>

      <main
        className={styles.main}>


        
    <div>
      <h2>$pointless Token Info</h2>
      <p>$pointless has been deployed on Base, Polygon and Zksync chains <br />
      Below are the pointless token CAs <br />
      Base: 0xaF13924f23Be104b96c6aC424925357463b0d105 <br />
      Polygon: 0x9B8cc6320F22325759B7D2CA5CD27347bB4eCD86 <br />
      Zksync Era: 0xFD21D5E148dF3B93AE6deC416544Fb3d3E21260C</p>

      <Link href="/">
        <button className={styles.customButton}>Home</button>
      </Link>
      <Link href="/bridge">
        <button className={styles.customButton}>Bridge</button>
      </Link>

    </div>


      </main>



      <footer
        className={styles.footer}>

        <a
          href="https://rainbow.me"
          rel="noopener noreferrer"
          target="_blank">

          Made with ❤️ by @sydney-bro

        </a>

      </footer>

    </div>

  );

};



//export default Home;
