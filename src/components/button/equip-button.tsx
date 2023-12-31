import { component$ } from "@builder.io/qwik";

import { TextStat } from "~/components/text/text-stat";
import type { ButtonProps } from "~/components/button/types";

const EquipButton = component$<ButtonProps>((props) => {
  const { state, inventoryEntity } = props;
  return (
    <div class="flex flex-col justify-center">
      <button
        type="button"
        class="relative text-white bg-black hover:bg-black border focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:bg-black dark:hover:bg-black dark:focus:ring-blue-800"
        onClick$={() => {
          state.updateEquipment(inventoryEntity);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14.0423 1.8522L8.06816 14.5365L0.501461 10.9727L2.20583 7.354L6.15382 9.21346L10.4236 0.147832L14.0423 1.8522Z"
            fill="white"
          />
        </svg>
        <span class="sr-only">Icon description</span>
      </button>
      <div class="text-white text-center text-xs font-mono mt-1">
        <div class="grid grid-cols-1">
          <TextStat
            inventoryEntity={inventoryEntity}
            state={state}
            stat={"attack"}
          />
          <TextStat
            inventoryEntity={inventoryEntity}
            state={state}
            stat={"defense"}
          />
        </div>
      </div>
    </div>
  );
});

export { EquipButton };
