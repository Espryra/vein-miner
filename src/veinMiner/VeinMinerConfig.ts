const VeinMinerConfig = {
  ActivateOnSneak: true, // If true, the player must be sneaking to activate vein mining. If false, the player must not be sneaking to activate vein mining.
  RequireSilkTouch: true, // Recommended as the raw block is dropped instead of the item.

  MaxBlocks: 100, // The maximum number of blocks that can be mined in one vein mining operation. This is to prevent lag and potential crashes.

  Ores: [
    // List of ores that can be vein mined. Add or remove ores as needed.
    "minecraft:coal_ore",
    "minecraft:iron_ore",
    "minecraft:copper_ore",
    "minecraft:gold_ore",
    "minecraft:lapis_ore",
    "minecraft:redstone_ore",
    "minecraft:diamond_ore",
    "minecraft:emerald_ore",
    "minecraft:nether_gold_ore",
    "minecraft:quartz_ore",
    "minecraft:deepslate_coal_ore",
    "minecraft:deepslate_iron_ore",
    "minecraft:deepslate_copper_ore",
    "minecraft:deepslate_gold_ore",
    "minecraft:deepslate_lapis_ore",
    "minecraft:deepslate_redstone_ore",
    "minecraft:deepslate_diamond_ore",
    "minecraft:deepslate_emerald_ore",
  ],
  Tools: [
    // List of tools that can be used for vein mining. Add or remove tools as needed.
    "minecraft:wooden_pickaxe",
    "minecraft:stone_pickaxe",
    "minecraft:copper_pickaxe",
    "minecraft:iron_pickaxe",
    "minecraft:golden_pickaxe",
    "minecraft:diamond_pickaxe",
    "minecraft:netherite_pickaxe",
  ],
};

export default VeinMinerConfig;
