import type { QRL } from "@builder.io/qwik";
export type ActivePanelT = "lab" | "research" | "equip";
export type CountStore = {
  activePanel: ActivePanelT;
  attack: 0;
  defense: 0;
  money: 0;
  inventoryCapacity: number;
  buffer: Entity[];
  inventory: Entity[];
  upgrades: string[];
  time: number;
  updateActivePanel: QRL<(this: CountStore, panel: ActivePanelT) => void>;
  addEntityToBuffer: QRL<(this: CountStore, entity: Entity) => void>;
  removeItemFromInventory: QRL<(this: CountStore, entity: Entity) => void>;
  sellItem: QRL<(this: CountStore, entity: Entity) => void>;
  removeEntityFromBuffer: QRL<(this: CountStore) => void>;
  updateTime: QRL<(this: CountStore, time: number) => void>;
  addEntityToInventory: QRL<(this: CountStore, entity: Entity) => void>;
};
export type Status =
  | "pending"
  | "executing"
  | "animate_out"
  | "animate_in"
  | "done";
export type Entity = {
  id: string;
  label: string;
  timeToCraft: number;
  status: Status;
  progress: DOMHighResTimeStamp;
  startTime: DOMHighResTimeStamp;
  attack: number;
  defense: number;
  sellValue: number;
};
