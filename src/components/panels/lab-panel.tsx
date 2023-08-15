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
            <div class="border border-white rounded-full w-9 h-9 m-auto"></div>
            <p class="mb-3 text-black dark:text-white text-center">
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
  );
});

export { LabPanel };
