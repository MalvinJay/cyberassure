import { ThemeProvider } from 'next-themes'
import { DefaultSeo } from 'next-seo'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
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
