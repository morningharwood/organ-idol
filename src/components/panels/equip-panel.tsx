import { component$ } from "@builder.io/qwik";
import type { CountStore } from "~/routes/types";
import { SellButton } from "~/components/button/sell-button";
import { EquipButton } from "~/components/button/equip-button";
import { TextStat } from "~/components/text/text-stat";
import { SwordIcon } from "~/components/icons/sword";
import { ShieldIcon } from "~/components/icons/shield";

type EquipPanelT = {
  state: CountStore;
};
const EquipPanel = component$<EquipPanelT>((props) => {
  const { state } = props;
  const slots = Object.entries(state.equipment);

  return (
    <div class="flex flex-col gap-4">
      <h1 class={"text-4xl font-extrabold dark:text-white p-4"}>Equipment</h1>

      <div class={`flex flex-wrap gap-4 p-4`}>
        {slots.map(([slot, entity]) => {
          return (
            <div
              class={`border border-white rounded-xl w-32 h-48 px-2 py-4`}
              key={slot}
            >
              <div class="relative border border-white rounded-full w-9 h-9 m-auto">
                <span class="absolute -top-2 left-1/2 -translate-x-1/2 bg-gray-100 text-gray-800 px-1 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 text-xxs">
                  {entity.equipmentType}
                </span>
              </div>
              <p class="mt-3 mb-1 text-black dark:text-white text-center text-xs font-mono text-ellipsis whitespace-nowrap overflow-hidden">
                {entity.label}
              </p>

              <div class="text-white text-center text-xs font-mono mt-1">
                <div class="grid grid-cols-1">
                  <span
                    class={`relative w-10 text-white tracking-widest flex flex-row justify-center`}
                  >
                    <span class={"translate-y-1.5 mr-2"}>
                      <ShieldIcon />
                    </span>{" "}
                    {entity.defense}
                  </span>

                  <span
                    class={`relative w-10 text-white tracking-widest flex flex-row justify-center`}
                  >
                    <span class={"translate-y-1 mr-1.5"}>
                      <SwordIcon />
                    </span>{" "}
                    {entity.attack}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
export { EquipPanel };
