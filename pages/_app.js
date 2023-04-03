import React, { useEffect, memo } from 'react';
import { ThemeProvider } from 'next-themes'
import { DefaultSeo } from 'next-seo'
import AOS from "aos";
import { wrapper } from 'redux/store';
import { PersistGate } from "redux-persist/integration/react";
import { useStore } from "react-redux";

import '../styles/globals.css'
import "aos/dist/aos.css";

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
    <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
      <ThemeProvider storageKey="light" attribute="class">
        <DefaultSeo
          defaultTitle="Org Posture"
          titleTemplate="%s | Org Posture"
          description="Get real time summary reports on security solutions & controls implemented within your enterprise"
        />
        <Component {...pageProps} />
      </ThemeProvider>
    </PersistGate>
  )
}

const App = wrapper.withRedux(memo(MyApp));

export default App;
