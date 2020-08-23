import { Provider } from 'next-auth/client'

import '@exampledev/new.css'

function MyApp({ Component, pageProps }) {
	return (
		<Provider session={pageProps.session}>
			<Component {...pageProps} />
		</Provider>
	)
}

export default MyApp
