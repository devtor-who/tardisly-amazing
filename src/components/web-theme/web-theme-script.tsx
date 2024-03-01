import { component$ } from "@builder.io/qwik";
import { DEFAULT_WEB_THEME, WEB_THEME_KEY } from "./web-theme.hook";

export const WebThemeScript = component$(() => {
  const scriptText = `
  (() => {
    function getCurrentTheme() {
      const theme = localStorage.getItem('${WEB_THEME_KEY}');
    
      if (!theme) {
        localStorage.setItem('${WEB_THEME_KEY}', '${DEFAULT_WEB_THEME}');
        return '${DEFAULT_WEB_THEME}';
      }
    
      return theme;
    }

    document.documentElement.classList.add(getCurrentTheme())
  })()
  `;
  return <script dangerouslySetInnerHTML={scriptText}></script>;
});
