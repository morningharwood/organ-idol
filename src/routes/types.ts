import type { QRL } from "@builder.io/qwik";

export type CountStore = {
  inventoryCapacity: number;
  buffer: Entity[];
  inventory: Entity[];
  time: number;
  addEntityToBuffer: QRL<(this: CountStore, entity: Entity) => void>;
  removeEntityFromBuffer: QRL<(this: CountStore) => void>;
  updateTime: QRL<(this: CountStore, time: number) => void>;
  addEntityToInventory: QRL<(this: CountStore, entity: Entity) => void>;
};
export type Status = "pending" | "executing" | "done";
export type Entity = {
  id: string;
  label: string;
  timeToCraft: number;
  status: Status;
  progress: DOMHighResTimeStamp;
  startTime: DOMHighResTimeStamp;
};
