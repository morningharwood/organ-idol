import { $, component$, useStore, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import type { CountStore, Entity } from "~/routes/types";

import { SideNavigationButton } from "~/components/button/side-navigation-button";
import { ItemProgress } from "~/components/item-progress/item-progress";

export default component$(() => {
  const state = useStore<CountStore>({
    inventoryCapacity: 3,
    time: 0,
    buffer: [],
    inventory: [],
    upgrades: [],
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
      if (entity.status === "pending") {
        entity.status = "executing";
        entity.startTime = t;
      }
      if (entity.status === "executing") {
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
        if (state.upgrades.includes("parallel_research")) {
          state.buffer.map((entity) => execute(entity, t));
        } else {
          execute(state.buffer[0], t);
        }
      }
      id = window.requestAnimationFrame(tick);
    };

    id = window.requestAnimationFrame(tick);
    cleanup(() => window.cancelAnimationFrame(id as number));
  });

  return (
    <div class={"h-full w-full grid grid-cols-[58px_auto] "}>
      <nav class="border-r border-white h-full grid grid-rows-[1fr_auto] justify-center">
        <div class="py-3 flex flex-col gap-3">top</div>
        <div class="py-3 flex flex-col gap-3">
          <SideNavigationButton state={state} />
          {/*<ItemProgress entity={entity} />*/}
          {/*<SideNavigationButton state={state} />*/}
          {/*<SideNavigationButton state={state} />*/}
          <div class="text-white text-xs border-t border-white pt-3 justify-center">
            <p class="text-center font-bold">$300</p>
          </div>
        </div>
      </nav>
      <main>
        {state.inventory.map((entity, i) => {
          return (
            <p class="mb-3 text-black dark:text-white" key={i}>
              {entity.label}
            </p>
          );
        })}
      </main>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Wet Labs Market",
  meta: [
    {
      name: "Grow organs and save the world",
      content: "Grow organs and save the world",
    },
  ],
};
