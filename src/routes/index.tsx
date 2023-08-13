import { $, component$, useStore, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Button } from "~/components/button/button";

import type { CountStore, Entity } from "~/routes/types";
import { ItemProgress } from "~/components/item-progress/item-progress";

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
    <>
      <br />
      <Button state={state} />
      <h2>Crafting:</h2>
      {state.buffer.map((entity, i) => {
        return (
          <>
            <p key={i}>{entity.label}</p>
            <ItemProgress entity={entity} />
          </>
        );
      })}
      <h2>Inventory:</h2>
      {state.inventory.map((entity, i) => {
        return <p key={i}>{entity.label}</p>;
      })}
    </>
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
