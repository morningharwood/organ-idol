import type { ButtonProps } from "~/components/button/types";

export type TextProps = {
  stat: "attack" | "defense";
} & ButtonProps;
