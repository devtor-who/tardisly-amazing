import { $, useSignal } from '@builder.io/qwik';
import { mustOnBrowser } from '~/libs/runtime.util';

/**
 * 브라우저 Theme Enum
 */
export const WEB_THEME = {
  light: 'light',
  dark: 'dark',
} as const;
export type WEB_THEME = (typeof WEB_THEME)[keyof typeof WEB_THEME];

/**
 * localstorage에 저장되는 브라우저 Theme key
 * @example
 * localStorage.getItem(WEB_THEME_KEY);
 * // => localStorage.getItem("WEB_THEME");
 */
export const WEB_THEME_KEY = 'WEB_THEME';

/**
 * 기본 브라우저 Theme
 */
export const DEFAULT_WEB_THEME = WEB_THEME.dark;

/**
 * 브라우저 Theme hook
 * @example
 * const { toggleWebTheme, changeWebTheme, getCurrentTheme } = useWebTheme();
 */
export function useWebTheme() {
  const isDarkThemeSig = useSignal<boolean>(false);

  const getCurrentTheme = $(async () => {
    mustOnBrowser();
    const theme = localStorage.getItem(WEB_THEME_KEY);

    if (!theme) {
      changeWebTheme(DEFAULT_WEB_THEME);
      return DEFAULT_WEB_THEME;
    }

    return theme;
  });

  const checkIsDarkTheme = $(async () => {
    const theme = await getCurrentTheme();
    isDarkThemeSig.value = theme === WEB_THEME.dark;
  });

  const changeWebTheme = $(async (theme: WEB_THEME) => {
    mustOnBrowser();
    localStorage.setItem(WEB_THEME_KEY, theme);

    document.documentElement.classList.remove(WEB_THEME.dark);
    document.documentElement.classList.remove(WEB_THEME.light);
    document.documentElement.classList.add(theme);
  });

  const toggleWebTheme = $(async () => {
    mustOnBrowser();
    const curTheme = await getCurrentTheme();

    switch (curTheme) {
      case WEB_THEME.dark:
        await changeWebTheme(WEB_THEME.light);
        break;
      case WEB_THEME.light:
        await changeWebTheme(WEB_THEME.dark);
        break;
      default:
        await changeWebTheme(DEFAULT_WEB_THEME);
        break;
    }

    await checkIsDarkTheme();
  });

  return {
    /**
     * 현재 브라우저 theme가 dark theme인지 아닌지를 저장하는 signal
     */
    isDarkThemeSig,
    /**
     * 현재 브라우저 theme가 dark theme인지 아닌지 확인
     */
    checkIsDarkTheme,
    /**
     * 브라우저의 현재 Theme 가져오기
     * - 설정된 Theme가 없으면 기본 Theme를 설정하고 기본 Theme를 가져옵니다.
     */
    getCurrentTheme,
    /**
     * 브라우저 Theme를 변경하기
     */
    changeWebTheme,
    /**
     * 브라우저 Theme 전환하기
     */
    toggleWebTheme,
  };
}
