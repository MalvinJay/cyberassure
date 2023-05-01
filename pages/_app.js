import React, { useEffect, memo } from 'react';
import { ThemeProvider } from 'next-themes'
import { DefaultSeo } from 'next-seo'
import AOS from "aos";
import { wrapper } from 'redux/store';
import { PersistGate } from "redux-persist/integration/react";
import { useStore } from "react-redux";

import '../styles/globals.css'
import "aos/dist/aos.css";
import "../styles/antd.custom.scss"

const MyApp = ({ Component, pageProps }) => {
  const store = useStore();

  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, []);
  
  return (
    <main className='relative'>
      <PersistGate persistor={store.__persistor} 
        loading={
          <div className='absolute inset-0 flex items-center justify-center bg-white bg-opacity-25 min-h-[35rem]'>
            <div className="w-20 h-20 rounded-full border-4 border-gray-300 border-t-white animate-spin flex items-center">
            </div>
          </div>
        }
      >
        <ThemeProvider storageKey="light" attribute="class">
          <DefaultSeo
            defaultTitle="Org Posture"
            titleTemplate="%s | Org Posture"
            description="Get real time summary reports on security solutions & controls implemented within your enterprise"
          />
          <Component {...pageProps} />
        </ThemeProvider>
      </PersistGate>
    </main>
  )
}

const App = wrapper.withRedux(memo(MyApp));

export default App;
