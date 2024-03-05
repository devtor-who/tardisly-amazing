import { Slot, component$ } from '@builder.io/qwik';
import { RequestHandler } from '@builder.io/qwik-city';

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // cache 하지 않기
  cacheControl({
    public: false,
    maxAge: 0,
    sMaxAge: 0,
    staleWhileRevalidate: 0,
  });
};

export default component$(() => {
  return <Slot />;
});
