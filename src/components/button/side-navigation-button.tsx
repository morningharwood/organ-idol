import { $, component$ } from "@builder.io/qwik";
import type { GameStateT, Entity } from "~/routes/types";
import { ItemProgress } from "~/components/item-progress/item-progress";
import range from "just-range";
import shuffle from "just-shuffle";
type ButtonProps = {
  state: GameStateT;
};
const SideNavigationButton = component$<ButtonProps>((props) => {
  const { state } = props;
  const createEntity = $((): Entity => {
    const defaultValue = 100;
    const rarity = () => shuffle(range(1, 3))[0];
    const attack = shuffle(range(1, 4))[0];
    const defense = shuffle(range(1, 4))[0];
    console.log(attack, defense);
    const sellValue = attack * rarity() + defense * rarity() * defaultValue;
    return {
      id: crypto.randomUUID(),
      label: "Leather Headpiece",
      timeToCraft: 1000,
      status: "pending",
      startTime: 0,
      attack,
      defense,
      progress: 0,
      sellValue,
      equipmentType: "head",
    };
  });
  return (
    <>
      {state.buffer[0] ? <ItemProgress entity={state.buffer[0]} /> : null}
      <button
        type="button"
        class="relative text-white bg-black hover:bg-black border focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:bg-black dark:hover:bg-black dark:focus:ring-blue-800"
        onClick$={() => {
          const entity = createEntity();
          // @ts-ignore
          entity.then((e) => state.addEntityToBuffer(e));
        }}
      >
        <span class="absolute -top-1.5 -right-1 w-4 h-4 bg-blue-800 rounded-full text-center font-mono text-white text-[.65rem] leading-normal">
          <span>{state.buffer.length}</span>
        </span>
        <svg
          class="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
        <span class="sr-only">Icon description</span>
      </button>
    </>
  );
});

export { SideNavigationButton };
