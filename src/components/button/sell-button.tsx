import { component$ } from "@builder.io/qwik";
import type { GameStateT } from "~/routes/types";
import type { Entity } from "~/routes/types";

type ButtonProps = {
  state: GameStateT;
  inventoryEntity: Entity;
};
const SellButton = component$<ButtonProps>((props) => {
  const { state, inventoryEntity } = props;

  return (
    <div class="flex flex-col justify-center">
      <button
        type="button"
        class="relative text-white bg-black hover:bg-black border focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:bg-black dark:hover:bg-black dark:focus:ring-blue-800"
        onClick$={() => {
          // @ts-ignore
          state.sellItem(inventoryEntity);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 13 14"
          fill="none"
        >
          <path
            d="M5.46138 13.4V12.238C2.24138 12.042 0.40738 11.006 0.29538 8.68199H3.71138C3.71138 9.25599 4.18738 9.68999 5.46138 9.84399V8.09399C1.98938 7.81399 0.44938 6.86199 0.44938 4.80399C0.44938 2.87199 2.38138 1.84999 5.46138 1.72399V0.799988H7.46338V1.76599C10.5434 2.01799 12.1814 3.17999 12.2934 5.13999H8.87738C8.87738 4.59399 8.41538 4.28599 7.46338 4.15999V5.74199C10.6694 6.00799 12.7134 6.44199 12.7134 8.93399C12.7134 11.314 10.7674 12.168 7.46338 12.266V13.4H5.46138ZM3.86538 4.80399C3.86538 5.22399 4.11738 5.43399 5.46138 5.58799V4.10399C4.20138 4.15999 3.86538 4.42599 3.86538 4.80399ZM7.46338 9.88599C8.98938 9.81599 9.29738 9.52199 9.29738 9.05999C9.29738 8.54199 9.03138 8.37399 7.46338 8.23399V9.88599Z"
            fill="white"
          />
        </svg>
        <span class="sr-only">Icon description</span>
      </button>
      <div class="text-white text-center text-xs font-mono mt-1">
        ${inventoryEntity.sellValue}
      </div>
    </div>
  );
});

export { SellButton };
