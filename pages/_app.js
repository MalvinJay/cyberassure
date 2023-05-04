import React, { useEffect, memo } from 'react';
import { ThemeProvider } from 'next-themes'
import { wrapper } from 'redux/store';
import { PersistGate } from "redux-persist/integration/react";
import { useStore } from "react-redux";
import { DefaultSeo } from 'next-seo'
import AOS from "aos";

import '../styles/globals.css'
import "aos/dist/aos.css";
import "../styles/antd.custom.scss"
import LoadingScreen from '@/components/ui/LoadingScreen';

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
        loading={<LoadingScreen />}
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
