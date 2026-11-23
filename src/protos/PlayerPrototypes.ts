import { Player, system } from "@minecraft/server";

declare module "@minecraft/server" {
  interface Player {
    sendError(message: string): void;
  }
}

Player.prototype.sendError = function (message: string): void {
  this.sendMessage(`§c${message}`);
  system.run(() => this.playSound("note.bass"));
};
