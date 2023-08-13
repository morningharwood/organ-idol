import { $, component$, useStore, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Button } from "~/components/button/button";

import type { CountStore, Entity } from "~/routes/types";
import { ItemProgress } from "~/components/item-progress/item-progress";
import { Timeline } from "~/components/timeline/timeline";

export default component$(() => {
  const state = useStore<CountStore>({
    count: 0,
    time: 0,
    buffer: [],
    inventory: [],
    increment: $(function (this: CountStore) {
      this.count++;
    }),
    updateTime: $(function (this: CountStore, time: number) {
      this.time = time;
    }),
    addEntityToBuffer: $(function (this: CountStore, entity: Entity) {
      this.buffer.push(entity);
      console.log(this.buffer);
    }),
    removeEntityFromBuffer: $(function (this: CountStore) {
      this.buffer.shift();
      console.log(this.buffer);
    }),
    addEntityToInventory: $(function (this: CountStore, entity: Entity) {
      this.inventory.push(entity);
    }),
  });

  useVisibleTask$(({ cleanup }) => {
    let id: number | null = null;
    const execute = (entity: Entity, t: DOMHighResTimeStamp) => {
      console.log(entity.status);
      if (entity.status === "pending") {
        entity.status = "executing";
        entity.startTime = t;
      }
      if (entity.status === "executing") {
        // console.log(t - entity.startTime);
        entity.progress = t - entity.startTime;
        const entityIsComplete = entity.progress >= entity.timeToCraft;
        if (entityIsComplete) {
          state.addEntityToInventory(entity);
          entity.status = "done";
        }
      }
      if (entity.status === "done") {
        state.removeEntityFromBuffer();
      }
    };
    const tick: any = (t: DOMHighResTimeStamp) => {
      if (state.buffer.length) {
        state.buffer.map((entity) => execute(entity, t));
      }
      id = window.requestAnimationFrame(tick);
    };

    id = window.requestAnimationFrame(tick);
    cleanup(() => window.cancelAnimationFrame(id as number));
  });

  return (
    <div class="container mx-auto">
      <Button state={state} />
      <div class="grid grid-cols-4 gap-4">
        <div class="col-span-2">
          <h3 class="text-3xl font-bold dark:text-white">Crafting:</h3>
          <Timeline state={state} />
        </div>
        <div class="col-span-2">
          <h3 class="text-3xl font-bold dark:text-white">Inventory:</h3>
          {state.inventory.map((entity, i) => {
            return <p key={i}>{entity.label}</p>;
          })}
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
