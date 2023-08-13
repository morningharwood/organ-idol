import { component$ } from "@builder.io/qwik";
import type { CountStore } from "~/routes/types";
import { ItemProgress } from "~/components/item-progress/item-progress";

type TimelineProps = {
  state: CountStore;
};
const Timeline = component$<TimelineProps>((props) => {
  const { state } = props;
  return (
    <ol class="relative border-l border-gray-200 dark:border-gray-700">
      {state.buffer.map((entity) => {
        return (
          <li class="mb-10 ml-4">
            <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              {entity.startTime}
            </time>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              {entity.label}
            </h3>
            <ItemProgress entity={entity} />
          </li>
        );
      })}
    </ol>
  );
});

export { Timeline };
