import '@component/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react";
import { ChakraProvider, extendBaseTheme } from '@chakra-ui/react'
import chakraTheme from '@chakra-ui/theme'
import { extendTheme } from "@chakra-ui/react"
import SpotifyContextProvider from '@component/context/SpotifyContext';
import axios from 'axios';
import { getSession, GetSessionParams } from 'next-auth/react'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}
const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "white",
      },
    }),
  },
});

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
  return (
    <SessionProvider session={pageProps.session} >
      <SpotifyContextProvider session={pageProps.session} value={{
      test: mytest, // specify your test value here
    }}>
        <Component {...pageProps} />
        {mytest}
      </SpotifyContextProvider>
    </SessionProvider>
    
  )
}
