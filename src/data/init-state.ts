import type { EquipmentT } from "~/routes/types";
import type { Status } from "~/routes/types";

const InitStateEquipmentEntity = {
  timeToCraft: 0,
  status: "done" as Status,
  progress: 0,
  startTime: 0,
  attack: 1,
  defense: 1,
  sellValue: 0,
};
const InitStateEquipment: EquipmentT = {
  head: {
    id: crypto.randomUUID(),
    equipmentType: "head",
    label: "Cloth helmet",
    ...InitStateEquipmentEntity,
  },
  shoulders: {
    id: "0002",
    equipmentType: "shoulders",
    label: "Cloth helmet",
    ...InitStateEquipmentEntity,
  },
  arms: {
    id: "0003",
    equipmentType: "arms",
    label: "Cloth arms",
    ...InitStateEquipmentEntity,
  },
  hands: {
    id: "0004",
    equipmentType: "hands",
    label: "Cloth hands",
    ...InitStateEquipmentEntity,
  },
  rings: {
    id: "0005",
    equipmentType: "rings",
    label: "broken ring",
    ...InitStateEquipmentEntity,
  },
  chest: {
    id: "0006",
    equipmentType: "chest",
    label: "Cloth chest",
    ...InitStateEquipmentEntity,
  },
  belt: {
    id: "0007",
    equipmentType: "belt",
    label: "Cloth belt",
    ...InitStateEquipmentEntity,
  },
  waist: {
    id: "0003",
    equipmentType: "waist",
    label: "Cloth waist",
    ...InitStateEquipmentEntity,
  },
  legs: {
    id: "0008",
    equipmentType: "legs",
    label: "Cloth leggings",
    ...InitStateEquipmentEntity,
  },
  feet: {
    id: "0009",
    equipmentType: "feet",
    label: "Cloth shoes",
    ...InitStateEquipmentEntity,
  },
};

export { InitStateEquipment };
