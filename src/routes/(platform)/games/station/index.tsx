import { component$ } from '@builder.io/qwik';
import type { RequestHandler } from '@builder.io/qwik-city';
import { routeLoader$ } from '@builder.io/qwik-city';

export const onRequest: RequestHandler = async (requestEv) => {
  const { next, redirect, cookie } = requestEv;
  const visitor = cookie.get('visitor');

  if (!visitor) {
    throw redirect(308, '/games');
  }

  await next();
};

export const useVisitorData = routeLoader$(async (requestEv) => {
  const visitor = requestEv.cookie.get('visitor');
  return visitor?.value;
});

export default component$(() => {
  const visitorData = useVisitorData();

  return (
    <section>
      <h1>{visitorData.value}님 환영합니다.</h1>
    </section>
  );
});
