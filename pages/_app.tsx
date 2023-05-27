import '@component/styles/globals.scss';
import type { AppProps } from 'next/app';
import { SessionProvider } from "next-auth/react";
import SpotifyContextProvider from '@component/context/SpotifyContext';
import Layout from '@component/components/Layout';
import "@fortawesome/fontawesome-svg-core/styles.css"; 
import { config } from "@fortawesome/fontawesome-svg-core";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ThemeProvider } from '../context/ThemeContext';
import { getTheme, setTheme } from '@component/context/Themes';

// Tell Font Awesome to skip adding the CSS automatically 
// since it's already imported above
config.autoAddCss = false; 

interface CustomAppProps {
  myGlobalVar: string,
  test: string // define the type of test
}
export async function getInitialProps() {
  // Set global variables
  const myGlobalVar = 'Hello world!';
  const anotherGlobalVar = 42;
  const test = "test"
  return {
    props: {
      // Pass global variables to the component
      myGlobalVar,
      anotherGlobalVar,
      test
    }
  }
}

export default function App({ Component, pageProps, myGlobalVar, test }: AppProps & { myGlobalVar: string, test: string }) {
  const mytest = "test"
  const router = useRouter();
  const [currentTheme, nextTheme] = useState(getTheme());

    useEffect(() => {
        setTheme(currentTheme);
    }, [currentTheme]);

  return (
    <SessionProvider session={pageProps.session} >
      <SpotifyContextProvider session={pageProps.session} value={{
      test: mytest, // specify your test value here
    }}>
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        </ThemeProvider>
      </SpotifyContextProvider>
    </SessionProvider>
    
  )
}
