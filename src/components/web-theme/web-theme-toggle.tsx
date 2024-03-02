import { $, component$, useOnDocument } from '@builder.io/qwik';
import { useWebTheme } from './web-theme.hook';
import { LuSun, LuMoon } from '@qwikest/icons/lucide';
import { cn } from '~/libs/style.util';

export const WebThemeToggle = component$(() => {
  const { toggleWebTheme, isDarkThemeSig, checkIsDarkTheme } = useWebTheme();

  const toggleThemeAction = $(async () => {
    await toggleWebTheme();
  });

  const onDocumentAction = $(async () => {
    await checkIsDarkTheme();
  });

  useOnDocument('DOMContentLoaded', onDocumentAction);

  return (
    <div>
      <button
        class={cn('text-2xl')}
        onClick$={toggleThemeAction}
      >
        {isDarkThemeSig.value ? <LuSun /> : <LuMoon />}
      </button>
    </div>
  );
});
