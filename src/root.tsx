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
          'font-ibm-plex-sans',
          'transition-colors duration-200',
          'bg-indigo-950 text-sm text-indigo-100 sm:text-base',
        )}
      >
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
