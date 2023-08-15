import { $, component$, useStore, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import type { ActivePanelT, CountStore, Entity, Status } from "~/routes/types";
import { SideNavigationButton } from "~/components/button/side-navigation-button";
import { LabPanel } from "~/components/panels/lab-panel";
import { EquipPanel } from "~/components/panels/equip-panel";
import { InitStateEquipment } from "~/data/init-state";
import { delay$ } from "~/hooks/delay";

export default component$(() => {
  const state = useStore<CountStore>({
    activePanel: "lab",
    attack: 0,
    defense: 0,
    inventoryCapacity: 3,
    money: 0,
    time: 0,
    buffer: [],
    equipment: InitStateEquipment,
    inventory: [],
    upgrades: [],
    updateEquipment: $(function (this: CountStore, entity: Entity) {
      this.removeItemFromInventory(entity).then(() => {
        this.equipment[entity.equipmentType] = entity;
      });
    }),
    updateActivePanel: $(function (this: CountStore, panel: ActivePanelT) {
      this.activePanel = panel;
    }),
    updateTime: $(function (this: CountStore, time: number) {
      this.time = time;
    }),
    sellItem: $(function (this: CountStore, entity: Entity) {
      this.removeItemFromInventory(entity).then(() => {
        this.money += entity.sellValue;
      });
    }),
    setStatus: $(function (entity: Entity, newStatus: Status) {
      entity.status = newStatus;
    }),
    removeItemFromInventory: $(function (this: CountStore, entity: Entity) {
      const selectedEntity = this.inventory.find((e) => {
        return e.id === entity.id;
      });
      if (selectedEntity?.status) {
        this.setStatus(selectedEntity, "animate_out").then(() => {
          setTimeout(() => {
            this.inventory = this.inventory.filter((e: Entity) => {
              return e.id !== entity.id;
            });
          }, 1000);
        });
      }
    }),
    addEntityToBuffer: $(function (this: CountStore, entity: Entity) {
      this.buffer.push(entity);
      console.log("add", this.buffer);
    }),
    removeEntityFromBuffer: $(function (this: CountStore) {
      this.buffer = [...this.buffer.slice(1)];
    }),
    addEntityToInventory: $(function (this: CountStore, entity: Entity) {
      this.inventory.push(entity);
    }),
  });

  useVisibleTask$(({ cleanup }) => {
    let id: number;
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
    cleanup(() => {
      window.cancelAnimationFrame(id as number);
    });
  });

  return (
    <div class="h-full w-full grid grid-cols-[58px_auto] overflow-hidden">
      <nav class="border-r border-white h-full grid grid-rows-[1fr_auto] justify-center">
        <div class="pt-4 flex flex-col gap-3 text-[10px] text-white text-center">
          <button
            onClick$={() => state.updateActivePanel("lab")}
            class={`pb-4 border-b border-white font-mono ${
              state.activePanel === "lab"
                ? "border-indigo-500 text-indigo-500"
                : null
            }`}
          >
            Lab
          </button>
          <button
            onClick$={() => state.updateActivePanel("research")}
            class={`pb-4 border-b border-white font-mono ${
              state.activePanel === "research"
                ? "border-indigo-500 text-indigo-500"
                : null
            }`}
          >
            Research
          </button>
          <button
            onClick$={() => state.updateActivePanel("equip")}
            class={`pb-4 border-b border-white font-mono ${
              state.activePanel === "equip"
                ? "border-indigo-500 text-indigo-500"
                : null
            }`}
          >
            Equip
          </button>
        </div>
        <div class="py-3 flex flex-col gap-3">
          <div class="m-auto grid gap-3 ">
            <SideNavigationButton state={state} />
          </div>
          <div class="text-white text-xs border-t border-white pt-3 justify-center">
            <p class="text-center font-bold">${state.money}</p>
          </div>
        </div>
      </nav>
      <main class="overflow-y-auto">
        {state.activePanel === "lab" ? <LabPanel state={state} /> : null}
        {state.activePanel === "equip" ? <EquipPanel state={state} /> : null}
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
