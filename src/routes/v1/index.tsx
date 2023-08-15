import { $, component$, useStore, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import type { CountStore, Entity } from "~/routes/types";

import { SideNavigationButton } from "~/components/button/side-navigation-button";
import { SellButton } from "~/components/button/sell-button";
import { EquipButton } from "~/components/button/equip-button";

export default component$(() => {
  const state = useStore<CountStore>({
    attack: 0,
    defense: 0,
    inventoryCapacity: 3,
    money: 0,
    time: 0,
    buffer: [],
    inventory: [],
    upgrades: [],
    updateTime: $(function (this: CountStore, time: number) {
      this.time = time;
    }),
    sellItem: $(function (this: CountStore, entity: Entity) {
      this.money += entity.sellValue;
      this.removeItemFromInventory(entity);
    }),
    removeItemFromInventory: $(function (this: CountStore, entity: Entity) {
      console.log("hello");
      this.inventory = this.inventory.filter((e: Entity) => {
        return e.id !== entity.id;
      });
    }),
    addEntityToBuffer: $(function (this: CountStore, entity: Entity) {
      this.buffer.push(entity);
      console.log("add", this.buffer);
    }),
    removeEntityFromBuffer: $(function (this: CountStore) {
      this.buffer.shift();
      console.log("remove", this.buffer);
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
        console.log(entity.status);
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
    <div class="h-full w-full grid grid-cols-[58px_auto] overflow-hidden">
      <nav class="border-r border-white h-full grid grid-rows-[1fr_auto] justify-center">
        <div class="py-3 flex flex-col gap-3">top</div>
        <div class="py-3 flex flex-col gap-3">
          <SideNavigationButton state={state} />

          <div class="text-white text-xs border-t border-white pt-3 justify-center">
            <p class="text-center font-bold">${state.money}</p>
          </div>
        </div>
      </nav>
      <main class="overflow-scroll">
        <div class="flex flex-wrap gap-4 p-4">
          {state.inventory.map((entity, i) => {
            return (
              <div
                class="border border-white rounded-xl w-32 h-48 px-2 py-4"
                key={i}
              >
                <div class="border border-white rounded-full w-9 h-9 m-auto"></div>
                <p class="mb-3 text-black dark:text-white text-center">
                  {entity.attack} &gt; {state.attack}
                </p>
                <div class="flex gap-3 justify-center">
                  <SellButton state={state} inventoryEntity={entity} />
                  <EquipButton state={state} inventoryEntity={entity} />
                </div>
              </div>
            );
          })}
        </div>
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
