import {
  ItemComponentTypes,
  PlayerBreakBlockAfterEvent,
  world,
} from "@minecraft/server";
import VeinMinerConfig from "./VeinMinerConfig";
import VeinMinerUtils from "./VeinMinerUtils";

export default class VeinMinerHandler {
  public constructor() {
    world.afterEvents.playerBreakBlock.subscribe((event) =>
      this.OnBreak(event),
    );
  }

  private OnBreak(event: PlayerBreakBlockAfterEvent): void {
    const {
      block,
      player,
      itemStackAfterBreak: item,
      brokenBlockPermutation: brokenBlock,
    } = event;

    if (
      !item ||
      !VeinMinerConfig.Ores.includes(brokenBlock.type.id) ||
      !VeinMinerConfig.Tools.includes(item.typeId) ||
      player.isSneaking !== VeinMinerConfig.ActivateOnSneak
    ) {
      return;
    }
    if (VeinMinerConfig.RequireSilkTouch) {
      const enchantComponent = item.getComponent(
        ItemComponentTypes.Enchantable,
      );

      if (
        !enchantComponent ||
        !enchantComponent.getEnchantment("minecraft:silk_touch")
      ) {
        return;
      }
    }

    VeinMinerUtils.MineBlocks(
      player,
      item,
      block.location,
      brokenBlock.type.id,
    );
  }
}
