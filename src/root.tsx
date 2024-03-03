import { component$ } from '@builder.io/qwik';
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';
import './global.css';
import { WebThemeScript } from './components/web-theme/web-theme-script';
import { cn } from './libs/style.util';

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link
          rel="manifest"
          href="/manifest.json"
        />
        <WebThemeScript />
        <RouterHead />
      </head>
      <body
        class={cn(
          'font-ibm-plex-sans-kr',
          'transition-colors duration-200',
          'bg-white text-neutral-800',
          'dark:bg-neutral-900 dark:text-neutral-100',
        )}
      >
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
