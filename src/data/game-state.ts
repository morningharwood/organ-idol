import { InitStateEquipment } from "~/data/init-equipment-state";
import { $ } from "@builder.io/qwik";
import type { GameStateT } from "~/routes/types";
import type { ActivePanelT, Entity, Status } from "~/routes/types";

const GameState: GameStateT = {
  activePanel: "lab" as ActivePanelT,
  labPanelNotification: 0,
  researchPanelNotification: 0,
  equipPanelNotification: 0,
  attack: 0,
  defense: 0,
  inventoryCapacity: 3,
  money: 0,
  time: 0,
  buffer: [],
  equipment: InitStateEquipment,
  inventory: [],
  upgrades: [],
  updateEquipment: $(function (this: GameStateT, entity: Entity) {
    this.removeItemFromInventory(entity).then(() => {
      this.equipment[entity.equipmentType] = entity;
    });
  }),
  clearNotifications: $(function (this: GameStateT, panel: ActivePanelT) {
    if (panel === "lab") {
      this.labPanelNotification = 0;
    }
    if (panel === "equip") {
      this.equipPanelNotification = 0;
    }
    if (panel === "research") {
      this.researchPanelNotification = 0;
    }
  }),
  updateActivePanel: $(function (this: GameStateT, panel: ActivePanelT) {
    if (panel === "lab") {
      this.clearNotifications("lab");
    }
    if (panel === "equip" || panel === "research") {
      this.labPanelNotification = this.inventory.length; // subtract here
    }

    this.activePanel = panel; // set active panel
  }),
  updateTime: $(function (this: GameStateT, time: number) {
    this.time = time;
  }),
  sellItem: $(function (this: GameStateT, entity: Entity) {
    const moneyCache = this.money;
    let count = 0;
    this.removeItemFromInventory(entity).then(() => {
      const id = setInterval(() => {
        if (count >= 100) {
          window.clearInterval(id);
          count = 0;
          this.money = moneyCache;
          // I HAVE NO IDEA WHY IT"S OFF BY 1
          this.money += entity.sellValue - 1;
        }
        this.money++;
        count++;
      }, 10);
    });
  }),
  setStatus: $(function (entity: Entity, newStatus: Status) {
    entity.status = newStatus;
  }),
  removeItemFromInventory: $(function (this: GameStateT, entity: Entity) {
    const selectedEntity = this.inventory.find((e) => {
      return e.id === entity.id;
    });
    if (selectedEntity?.status) {
      this.setStatus(selectedEntity, "animate_out").then(() => {
        // Hack to ensure that setTimeouts are not called immediately
        setTimeout(() => {
          this.inventory = this.inventory.filter((e: Entity) => {
            return e.id !== entity.id;
          });
        }, 300);
      });
    }
  }),
  addEntityToBuffer: $(function (this: GameStateT, entity: Entity) {
    this.buffer.push(entity);
    console.log("add", this.buffer);
  }),
  removeEntityFromBuffer: $(function (this: GameStateT) {
    this.buffer = [...this.buffer.slice(1)];
  }),
  addEntityToInventory: $(function (this: GameStateT, entity: Entity) {
    this.inventory.push(entity);
  }),
};

export { GameState };
