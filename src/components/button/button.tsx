import { $, component$ } from "@builder.io/qwik";
import type { CountStore } from "~/routes/types";

type ButtonProps = {
  state: CountStore;
};
const Button = component$<ButtonProps>((props) => {
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
      onClick$={() => {
        const entity = createEntity();
        // @ts-ignore
        entity.then((e) => props.state.addEntityToBuffer(e));
      }}
      class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
    >
      Harvest {props.state.count}
    </button>
  );
});

export { Button };
