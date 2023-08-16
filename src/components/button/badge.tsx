import { component$ } from "@builder.io/qwik";

type BadgeT = {
  notification: number;
};
const Badge = component$<BadgeT>((props) => {
  const { notification } = props;
  return (
    <span
      class={
        "w-4 h-4 rounded-full absolute right-0 -top-3 bg-indigo-700 text-white"
      }
    >
      {notification}
    </span>
  );
});

export { Badge };
