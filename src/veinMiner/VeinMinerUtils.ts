import {
  Dimension,
  EntityComponentTypes,
  ItemComponentTypes,
  ItemStack,
  type Block,
  type Player,
  type Vector3,
} from "@minecraft/server";
import VeinMinerConfig from "./VeinMinerConfig";

export default abstract class VeinMinerUtils {
  public static MineBlocks(
    player: Player,
    item: ItemStack,
    blockLocation: Vector3,
    blockTypeId: string,
  ): void {
    const blocks = VeinMinerUtils.GetVeinBlocks(
      player.dimension,
      blockLocation,
      blockTypeId,
    );

    if (blocks.length === 0 || blocks.length > VeinMinerConfig.MaxBlocks) {
      return;
    }

    const durability = item.getComponent(ItemComponentTypes.Durability);

    if (!durability) {
      return;
    }
    if (durability.maxDurability - durability.damage < blocks.length) {
      player.sendError(
        "Your tool is too damaged to mine this vein! Please repair it first or use a different tool.",
      );
      return;
    }

    try {
      for (const block of blocks) {
        block.setType("minecraft:air");
      }

      const container = player.getComponent(
        EntityComponentTypes.Inventory,
      )?.container;

      if (!container) {
        throw new Error("Player inventory not found.");
      }

      durability.damage += blocks.length;
      container.setItem(player.selectedSlotIndex, item);

      const items = new ItemStack(
        blockTypeId.replace("lit_", ""),
        blocks.length,
      );

      player.dimension.spawnItem(items, blockLocation);
    } catch (error) {
      console.error(
        `Error while trying to vein mine blocks at ${blockLocation.x}, ${blockLocation.y}, ${blockLocation.z}`,
        error,
      );

      player.sendError("Failed to mine the vein!");
    }
  }
  public static GetVeinBlocks(
    dimension: Dimension,
    blockLocation: Vector3,
    blockTypeId: string,
    knownBlocks: Block[] = [],
  ): Block[] {
    const blocks: Block[] = [];
    const block = dimension.getBlock(blockLocation);

    if (!block) {
      throw new Error("Block is not rendered or is not loaded in the world.");
    }

    for (const sideBlock of [
      block.above(),
      block.below(),
      block.north(),
      block.south(),
      block.east(),
      block.west(),
    ]) {
      if (
        sideBlock?.typeId.replace("lit_", "") === blockTypeId &&
        !knownBlocks.some(
          (entry) =>
            entry.location.x === sideBlock.location.x &&
            entry.location.y === sideBlock.location.y &&
            entry.location.z === sideBlock.location.z,
        )
      ) {
        knownBlocks.push(sideBlock);
        blocks.push(
          ...VeinMinerUtils.GetVeinBlocks(
            dimension,
            sideBlock.location,
            blockTypeId,
            knownBlocks,
          ),
          sideBlock,
        );
      }
    }

    return blocks;
  }
}
