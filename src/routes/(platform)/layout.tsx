import { Slot, component$, useComputed$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { UiDivider } from '~/components/ui/ui-divider';
import { cn } from '~/libs/style.util';

export default component$(() => {
  const location = useLocation();
  const pageHeading = useComputed$(() => {
    if (location.url.pathname.includes('/anon-posts/')) {
      return '익명게시판';
    }
    if (location.url.pathname.includes('/games/')) {
      return '방문자확인';
    }
    return '';
  });
  return (
    <section class={cn('mx-auto min-h-screen max-w-xl px-3 py-5 sm:py-8')}>
      <h1 class={cn('w-full text-center text-lg font-normal sm:text-xl')}>
        {pageHeading.value}
      </h1>

      <UiDivider />

      <Slot />
    </section>
  );
});
