import '@component/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react";
import { ChakraProvider, extendBaseTheme } from '@chakra-ui/react'
import chakraTheme from '@chakra-ui/theme'
import { extendTheme } from "@chakra-ui/react"


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
      <div className='bg-background1'>
        <SessionProvider session={pageProps.session}>
              <Component {...pageProps} />
        </SessionProvider>
      </div>
    
  )
}