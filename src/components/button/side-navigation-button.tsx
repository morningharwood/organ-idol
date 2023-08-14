import { $, component$ } from "@builder.io/qwik";
import type { CountStore } from "~/routes/types";
type ButtonProps = {
  state: CountStore;
};
const SideNavigationButton = component$<ButtonProps>((props) => {
  const { state } = props;
  const createEntity = $(() => {
    return {
      id: "1",
      label: "Apple",
      timeToCraft: 5000,
      status: "pending",
      startTime: 0,
    };
  });
  return (
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
  );
});

export { SideNavigationButton };
