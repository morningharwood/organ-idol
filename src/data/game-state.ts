import { InitStateEquipment } from "~/data/init-equipment-state";
import { $ } from "@builder.io/qwik";
import type { GameStateT } from "~/routes/types";
import type { ActivePanelT, Entity, Status } from "~/routes/types";

const GameState: GameStateT = {
  activePanel: "lab" as ActivePanelT,
  labPanelNotification: 0,
  researchPanelNotification: 0,
  equipPanelNotification: [""],
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
    this.playEquipSound();
    this.removeItemFromInventory(entity).then(() => {
      this.equipment[entity.equipmentType] = entity;
    });
  }),
  clearNotifications: $(function (this: GameStateT, panel: ActivePanelT) {
    if (panel === "lab") {
      this.labPanelNotification = 0;
    }
    if (panel === "equip") {
      this.equipPanelNotification = Object.entries(this.equipment).map(
        ([, value]) => {
          return value.id;
        }
      );
    }
    if (panel === "research") {
      this.researchPanelNotification = 0;
    }
  }),
  updateNotifications: $(function (this: GameStateT) {
    this.labPanelNotification = this.inventory.length;
    this.equipPanelNotification = Object.entries(this.equipment).map(
      ([, value]) => {
        return value.id;
      }
    );
    this.researchPanelNotification = this.upgrades.length;
  }),
  updateActivePanel: $(function (this: GameStateT, nextPanel: ActivePanelT) {
    this.updateNotifications();
    this.clearNotifications(nextPanel);
    this.activePanel = nextPanel;
  }),
  updateTime: $(function (this: GameStateT, time: number) {
    this.time = time;
  }),
  sellItem: $(function (this: GameStateT, entity: Entity) {
    const moneyCache = this.money;
    let count = 0;
    this.playSellSound();
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
  playEquipSound: $(function (this: GameStateT) {
    const ctx = new AudioContext();
    // Create the oscillator
    const osc0 = ctx.createOscillator();
    const osc = ctx.createOscillator();
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const osc3 = ctx.createOscillator();
    // Define type of wave
    osc0.type = "sawtooth";
    osc.type = "sawtooth";
    osc1.type = "sawtooth";
    osc2.type = "sawtooth";
    osc3.type = "sine";
    // We create a gain intermediary
    const volume = ctx.createGain();
    // We connect the oscillator with the gain knob
    osc0.connect(volume);
    osc.connect(volume);
    osc1.connect(volume);
    osc2.connect(volume);
    osc3.connect(volume);
    // Then connect the volume to the context destination
    volume.connect(ctx.destination);
    // We can set & modify the gain knob
    volume.gain.value = 0.015;

    //We can test it with some frequency at current time
    osc0.frequency.setValueAtTime(noteToFrequency("G") * 50, ctx.currentTime);
    // osc.frequency.setValueAtTime(noteToFrequency("G"), ctx.currentTime);
    // osc1.frequency.setValueAtTime(noteToFrequency("G") / 2, ctx.currentTime);
    // osc2.frequency.setValueAtTime(noteToFrequency("G") * 3, ctx.currentTime);
    // osc3.frequency.setValueAtTime(noteToFrequency("B") * 4, ctx.currentTime);
    const stopTime = 0.05;
    osc0.start();
    osc.start();
    osc1.start();
    osc2.start();
    osc3.start();
    osc0.stop(stopTime + 0.02);
    osc1.stop(stopTime + 0.02);
    osc.stop(stopTime);
    osc2.stop(stopTime);
    osc3.stop(stopTime);

    // We'll have to stop it at some point

    function noteToFrequency(note: string) {
      const frequencies = {
        C: 261.63,
        "C#": 277.18,
        D: 293.66,
        "D#": 311.13,
        E: 329.63,
        F: 349.23,
        "F#": 369.99,
        G: 392.0,
        "G#": 415.3,
        A: 440.0,
        "A#": 466.16,
        B: 493.88,
      };
      // @ts-ignore
      return frequencies[note];
    }
  }),
  playSellSound: $(function (this: GameStateT) {
    const ctx = new AudioContext();
    // Create the oscillator

    const osc = ctx.createOscillator();
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const osc3 = ctx.createOscillator();
    // Define type of wave
    osc.type = "square";
    osc1.type = "square";
    osc2.type = "square";
    osc3.type = "square";
    // We create a gain intermediary
    const volume = ctx.createGain();
    // We connect the oscillator with the gain knob
    osc.connect(volume);
    osc1.connect(volume);
    osc2.connect(volume);
    osc3.connect(volume);
    // Then connect the volume to the context destination
    volume.connect(ctx.destination);
    // We can set & modify the gain knob
    volume.gain.value = 0.015;

    //We can test it with some frequency at current time
    osc.frequency.setValueAtTime(noteToFrequency("C"), ctx.currentTime);
    osc1.frequency.setValueAtTime(noteToFrequency("E") / 4, ctx.currentTime);
    osc2.frequency.setValueAtTime(noteToFrequency("G") * 1.25, ctx.currentTime);
    osc3.frequency.setValueAtTime(
      noteToFrequency("A#") / 1.25,
      ctx.currentTime
    );
    const stopTime = 0.05;
    osc.start();
    osc1.start();
    osc2.start();
    osc3.start();
    osc1.stop(stopTime + 0.02);
    osc.stop(stopTime);
    osc2.stop(stopTime);
    osc3.stop(stopTime);

    // We'll have to stop it at some point

    function noteToFrequency(note: string) {
      const frequencies = {
        C: 261.63,
        "C#": 277.18,
        D: 293.66,
        "D#": 311.13,
        E: 329.63,
        F: 349.23,
        "F#": 369.99,
        G: 392.0,
        "G#": 415.3,
        A: 440.0,
        "A#": 466.16,
        B: 493.88,
      };
      // @ts-ignore
      return frequencies[note];
    }
  }),
  addEntityToBuffer: $(function (this: GameStateT, entity: Entity) {
    this.buffer.push(entity);
  }),
  removeEntityFromBuffer: $(function (this: GameStateT) {
    this.buffer = [...this.buffer.slice(1)];
  }),
  addEntityToInventory: $(function (this: GameStateT, entity: Entity) {
    this.inventory.push(entity);
    // this.updateNotifications();
  }),
};

export { GameState };
