import type { QRL } from "@builder.io/qwik";
export type ActivePanelT = "lab" | "research" | "equip";

export type EquipmentType =
  | "head"
  | "shoulders"
  | "arms"
  | "hands"
  | "rings"
  | "chest"
  | "belt"
  | "waist"
  | "legs"
  | "feet";

export type EquipmentT = {
  head: Entity;
  shoulders: Entity;
  arms: Entity;
  hands: Entity;
  rings: Entity;
  chest: Entity;
  belt: Entity;
  waist: Entity;
  legs: Entity;
  feet: Entity;
};

export type GameStateT = {
  activePanel: ActivePanelT;
  labPanelNotification: number;
  researchPanelNotification: number;
  equipPanelNotification: number;
  attack: 0;
  defense: 0;
  money: 0;
  inventoryCapacity: number;
  equipment: EquipmentT;
  buffer: Entity[];
  inventory: Entity[];
  upgrades: string[];
  time: number;
  clearNotifications: QRL<(this: GameStateT, panel: ActivePanelT) => void>;
  setStatus: QRL<(entity: Entity, setStatus: Status) => void>;
  updateEquipment: QRL<(this: GameStateT, entity: Entity) => void>;
  updateActivePanel: QRL<(this: GameStateT, panel: ActivePanelT) => void>;
  addEntityToBuffer: QRL<(this: GameStateT, entity: Entity) => void>;
  removeItemFromInventory: QRL<(this: GameStateT, entity: Entity) => void>;
  sellItem: QRL<(this: GameStateT, entity: Entity) => void>;
  removeEntityFromBuffer: QRL<(this: GameStateT) => void>;
  updateTime: QRL<(this: GameStateT, time: number) => void>;
  addEntityToInventory: QRL<(this: GameStateT, entity: Entity) => void>;
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
  equipmentType: EquipmentType;
};
