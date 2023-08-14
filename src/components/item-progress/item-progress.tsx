import { component$ } from "@builder.io/qwik";
import type { Entity } from "~/routes/types";

type ItemProgressProps = {
  entity: Entity;
};

const ItemProgress = component$<ItemProgressProps>((props) => {
  const { entity } = props;

  const currentProgress = (entity.progress / entity.timeToCraft) * 100;
  return (
    <div class="overflow-x-hidden w-full bg-gray-200 rounded-full dark:bg-gray-700 w-80">
      <div
        class=" w-full bg-purple-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full dark:bg-purple-500"
        style={{ transform: `translateX(${currentProgress}%` }}
      />
    </div>
  );
});

export { ItemProgress };
export type { ItemProgressProps };
