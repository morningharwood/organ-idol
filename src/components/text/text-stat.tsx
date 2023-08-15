import { component$ } from "@builder.io/qwik";
import type { TextProps } from "~/components/text/types";

const TextStat = component$<TextProps>((props) => {
  const { inventoryEntity, state, stat } = props;
  let status = "";
  if (
    inventoryEntity[stat] > state.equipment[inventoryEntity.equipmentType][stat]
  ) {
    status = "text-green-400";
  } else if (
    inventoryEntity[stat] ===
    state.equipment[inventoryEntity.equipmentType][stat]
  ) {
    status = "text-yellow-300";
  } else {
    status = "text-red-600";
  }
  return (
    <span class="relative tracking-widest pl-[5px]">
      <span class="absolute tracking-widest left-[-2px]">
        {stat === "defense" ? (
          <svg
            class="mt-[5px]"
            xmlns="http://www.w3.org/2000/svg"
            width="6"
            height="6"
            viewBox="0 0 6 6"
            fill="none"
          >
            <path d="M6 0H0C0.2 2 1.08 6 3 6C4.92 6 5.8 2 6 0Z" fill="white" />
          </svg>
        ) : (
          <svg
            class="mt-1"
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.95724 5.33567L0.646454 6.64645L1.35356 7.35356L2.66434 6.04278L4.90195 6.4903L5.09807 5.50972L3.51418 5.19294L7.35356 1.35356L6.64645 0.646454L2.80707 4.48583L2.4903 2.90195L1.50972 3.09807L1.95724 5.33567Z"
              fill="white"
            />
          </svg>
        )}
      </span>
      <span class={`${status} tracking-widest`}>{inventoryEntity[stat]}</span>
      <span class="tracking-widest">&gt;</span>
      <span class="tracking-widest">
        {state.equipment[inventoryEntity.equipmentType][stat]}
      </span>
    </span>
  );
});

export { TextStat };
