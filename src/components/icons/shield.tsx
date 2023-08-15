import { component$ } from "@builder.io/qwik";

const ShieldIcon = component$(() => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="6"
      height="6"
      viewBox="0 0 6 6"
      fill="none"
    >
      <path d="M6 0H0C0.2 2 1.08 6 3 6C4.92 6 5.8 2 6 0Z" fill="white" />
    </svg>
  );
});

export { ShieldIcon };
