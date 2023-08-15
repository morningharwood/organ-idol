import { component$ } from "@builder.io/qwik";
import type { CountStore, Entity } from "~/routes/types";
type ButtonProps = {
  state: CountStore;
  inventoryEntity: Entity;
};
type TextProps = {
  stat: "attack" | "defense";
} & ButtonProps;
const TextGreen = component$<TextProps>((props) => {
  const { inventoryEntity, state, stat } = props;
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
      <span class="text-green-400 tracking-widest">
        {inventoryEntity[stat]}
      </span>
      <span class="tracking-widest">&gt;</span>
      <span class="tracking-widest">{state[stat]}</span>
    </span>
  );
});

const TextRed = component$<TextProps>((props) => {
  const { inventoryEntity, state, stat } = props;
  return (
    <span class="relative tracking-widest">
      <span class="absolute tracking-widest -left-1 top-0">*</span>
      <span class="text-red-400 tracking-widest">{inventoryEntity[stat]}</span>
      <span class="tracking-widest">&lt;</span>
      <span class="tracking-widest">{state[stat]}</span>
    </span>
  );
});

const EquipButton = component$<ButtonProps>((props) => {
  const { state, inventoryEntity } = props;
  return (
    <div class="flex flex-col justify-center">
      <button
        type="button"
        class="relative text-white bg-black hover:bg-black border focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:bg-black dark:hover:bg-black dark:focus:ring-blue-800"
        onClick$={() => {}}
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
        {inventoryEntity.attack > state.attack ? (
          <div class="grid grid-cols-1">
            <TextGreen
              inventoryEntity={inventoryEntity}
              state={state}
              stat={"attack"}
            />
            <TextGreen
              inventoryEntity={inventoryEntity}
              state={state}
              stat={"defense"}
            />
          </div>
        ) : (
          <div class="grid grid-cols-1">
            <TextRed
              inventoryEntity={inventoryEntity}
              state={state}
              stat={"attack"}
            />
            <TextRed
              inventoryEntity={inventoryEntity}
              state={state}
              stat={"defense"}
            />
          </div>
        )}
      </div>
    </div>
  );
});

export { EquipButton };
