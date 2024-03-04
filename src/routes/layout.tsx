import {
  component$,
  Slot,
  useSignal,
  useTask$,
  useVisibleTask$,
} from '@builder.io/qwik';
import { useLocation, type RequestHandler } from '@builder.io/qwik-city';
import { cn } from '~/libs/style.util';

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 2,
  });
};

export default component$(() => {
  const isPageRender = useSignal(true);
  const location = useLocation();

  // 페이지가 화면에 렌더링 되기 전
  useTask$(({ track }) => {
    // url이 변경될 때 마다 실행
    track(() => location.url);
    // 이동하는 url이 이전 url과 다른 경우
    if (location.prevUrl?.href !== location.url.href) {
      isPageRender.value = false;
    }
  });

  // 페이지가 화면에 렌더링 된 후
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    // url이 변경될 때 마다 실행
    track(() => location.url);
    setTimeout(() => {
      isPageRender.value = true;
    }, 200);
  });

  return (
    <main
      class={cn(
        isPageRender.value ? 'animate-fade-down' : 'opacity-0', // 페이지가 렌더링 되면 fade down 효과
      )}
    >
      <Slot />
    </main>
  );
});
