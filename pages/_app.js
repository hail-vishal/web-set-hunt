import { SessionProvider } from 'next-auth/react'
import '../styles/globals.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { configuredStore } from '../reducers/Store';
import storage from '../reducers/Store';

export default function App({ Component, pageProps, session }) {
  if(typeof window === 'undefined'){
    const {store}=configuredStore(storage);
    <Provider store={store}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
    </Provider>
  }

  const {store,persistor}=configuredStore(storage);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </PersistGate>
    </Provider>
  )
}
