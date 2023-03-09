import React, { useEffect } from 'react';
import { ThemeProvider } from 'next-themes'
import { DefaultSeo } from 'next-seo'
import Aos from "aos";
import '../styles/globals.css'
import "aos/dist/aos.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    Aos.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, [])
  
  return (
    <ThemeProvider storageKey="light" attribute="class">
      <DefaultSeo
				defaultTitle="Org Posture"
				titleTemplate="%s | Org Posture"
				description="Get real time summary reports on security solutions & controls implemented within your enterprise"
			/>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
