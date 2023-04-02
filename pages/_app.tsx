import '@component/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react";
import { ChakraProvider, extendBaseTheme } from '@chakra-ui/react'
import chakraTheme from '@chakra-ui/theme'
import { extendTheme } from "@chakra-ui/react"
import { SpotifyContextProvider } from '@component/context/SpotifyContext';


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


export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <SpotifyContextProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SpotifyContextProvider>
    </SessionProvider>
    
  )
}