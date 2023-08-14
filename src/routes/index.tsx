import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div class="container mx-auto">
      <h1 class="dark:text-white">Wet Labs Market</h1>
      <a class="dark:text-white" href="/v1/">
        Play
      </a>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Wet Labs Market",
  meta: [
    {
      name: "Join the fun",
      content: "Wet Labs Market",
    },
  ],
};
