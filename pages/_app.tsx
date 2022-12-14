import { useState } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';

import {
  Hydrate,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { IntlProvider } from 'react-intl';

import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';

import createEmotionCache from '../src/styles/createEmotionCache';
import { NavbarFixed } from '../src/components/ui/NavbarFixed';
import { AccountMenu } from '../src/components/AccountMenu';

import theme from '../src/styles/theme';

import en from '../src/lang/en.json';
import es from '../src/lang/es.json';

const messages = {
  es,
  en
};

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const [queryClient] = useState(() => new QueryClient());
  //if locale is not defined, use the browser language
  const { locale, defaultLocale } = useRouter();

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <CacheProvider value={emotionCache}>
            <Head>
              {/* <meta name="viewport" content="initial-scale=1, width=device-width" /> */}
              <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
              />
            </Head>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <AccountMenu />
              <Component {...pageProps} />
              <NavbarFixed />
              <ReactQueryDevtools initialIsOpen={false} position={'top-left'} />
            </ThemeProvider>
          </CacheProvider>
        </Hydrate>
      </QueryClientProvider>
    </IntlProvider>
  );
}
