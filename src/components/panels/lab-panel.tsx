import type { CountStore } from "~/routes/types";
import { component$ } from "@builder.io/qwik";
import { SellButton } from "~/components/button/sell-button";
import { EquipButton } from "~/components/button/equip-button";

export type LabPanelT = {
  state: CountStore;
};

const LabPanel = component$<LabPanelT>((props) => {
  const { state } = props;
  return (
    <div class="flex flex-col gap-4">
      <h1 class={"text-4xl font-extrabold dark:text-white p-4"}>Labs</h1>
      {state.inventory.length <= 0 ? (
        <h2 class={"text-2 xl dark:text-white p-4"}>
          Please click action button to craft an item
        </h2>
      ) : null}
      <div class={`flex flex-wrap gap-4 p-4`}>
        {state.inventory.map((entity, i) => {
          return (
            <div
              class={`border border-white rounded-xl w-32 h-48 px-2 py-4 opacity-0 ${
                entity.status === "done"
                  ? "animate-fade-in"
                  : entity.status === "animate_out"
                  ? "animate-fade-out"
                  : null
              }`}
              key={i}
            >
              <div class="relative border border-white rounded-full w-9 h-9 m-auto">
                <span class="absolute -top-2 left-1/2 -translate-x-1/2 bg-gray-100 text-gray-800 px-1 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 text-xxs">
                  {entity.equipmentType}
                </span>
              </div>
              <p class="mt-3 mb-1 text-black dark:text-white text-center text-xs font-mono text-ellipsis whitespace-nowrap overflow-hidden">
                {entity.label}
              </p>

              <div class="flex gap-3 justify-center items-baseline">
                <SellButton state={state} inventoryEntity={entity} />
                <EquipButton state={state} inventoryEntity={entity} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export { LabPanel };
