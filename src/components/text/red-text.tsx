import { component$ } from "@builder.io/qwik";
import type { TextProps } from "~/components/text/types";

const TextRed = component$<TextProps>((props) => {
  const { inventoryEntity, state, stat } = props;
  return (
    <span class="relative tracking-widest">
      <span class="absolute tracking-widest -left-1 top-0">*</span>
      <span class="text-red-400 tracking-widest">{inventoryEntity[stat]}</span>
      <span class="tracking-widest">&lt;</span>
      <span class="tracking-widest">
        {state.equipment[inventoryEntity.equipmentType][stat]}
      </span>
    </span>
  );
});

export { TextRed };
