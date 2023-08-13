import { component$ } from "@builder.io/qwik";
import type { CountStore } from "~/routes/types";

type TimelineProps = {
  state: CountStore;
};
const Timeline = component$<TimelineProps>(() => {
  return (
    <ol class="relative border-l border-gray-200 dark:border-gray-700">
      <li class="mb-10 ml-4">
        <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <div role="status" class="max-w-sm animate-pulse">
          <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        </div>
        {/*<time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">*/}
        {/*  */}
        {/*</time>*/}
        <div role="status" class="max-w-sm animate-pulse">
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
        </div>
        {/*<h3 class="text-lg font-semibold text-gray-900 dark:text-white">*/}
        {/*  what*/}
        {/*</h3>*/}
      </li>
    </ol>
  );
});

export { Timeline };
