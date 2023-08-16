import { component$, useStore, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import type { Entity } from "~/routes/types";
import { SideNavigationButton } from "~/components/button/side-navigation-button";
import { LabPanel } from "~/components/panels/lab-panel";
import { EquipPanel } from "~/components/panels/equip-panel";

import { Badge } from "~/components/button/badge";
import { GameState } from "~/data/game-state";

export default component$(() => {
  const state = useStore(GameState);
  useVisibleTask$(({ cleanup }) => {
    let id: number;
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
            class={`relative pb-4 border-b border-white font-mono ${
              state.activePanel === "lab"
                ? "border-indigo-500 text-indigo-500"
                : null
            }`}
          >
            <span>Lab</span>
            {state.labPanelNotification > 0 &&
            state.inventory.length > state.labPanelNotification ? (
              <Badge notification={state.labPanelNotification} />
            ) : null}
          </button>
          <button
            onClick$={() => state.updateActivePanel("research")}
            class={`pb-4 border-b border-white font-mono ${
              state.activePanel === "research"
                ? "border-indigo-500 text-indigo-500"
                : null
            }`}
          >
            <span>Research</span>
            {state.researchPanelNotification > 0 ? (
              <Badge notification={state.researchPanelNotification} />
            ) : null}
          </button>
          <button
            onClick$={() => state.updateActivePanel("equip")}
            class={`pb-4 border-b border-white font-mono ${
              state.activePanel === "equip"
                ? "border-indigo-500 text-indigo-500"
                : null
            }`}
          >
            <span>Equip</span>
            {state.equipPanelNotification > 0 ? (
              <Badge notification={state.equipPanelNotification} />
            ) : null}
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
