import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { WebThemeToggle } from "~/components/web-theme/web-theme-toggle";

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
      <h1 class="font-gowun-dodum">안녕하세요~!! 👋</h1>
      <WebThemeToggle />
      <p class="font-ibm-plex-sans-kr">한글로 이것저것 써보기</p>
      <p class="font-madimi-one">
        Can't wait to see what you build with qwik!
        <br />
        Happy coding.
      </p>
    </>
  );
});
