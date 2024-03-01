import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export const head: DocumentHead = {
  title: "Tardisly-Amazing!!",
  meta: [
    {
      name: "Tardisly-Amazing!!",
      content: "Tardisly-Amazing!!",
    },
  ],
};

export default component$(() => {
  return (
    <>
      <h1>Hi 👋</h1>
      <p class="font-madimi-one">
        Can't wait to see what you build with qwik!
        <br />
        Happy coding.
      </p>
    </>
  );
});
