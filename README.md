# Vein Miner

A lightweight **Minecraft Bedrock Edition** behavior pack that mines connected ore blocks in one operation.

Break an ore while meeting the activation requirements, and Vein Miner searches the six neighboring directions for connected blocks of the **same ore type**. It then mines the connected vein, up to the configured limit.

## Features

- Mine connected ore veins without breaking every block individually.
- Choose whether sneaking is required.
- Optionally require a **Silk Touch** pickaxe.
- Configure which ores and tools are allowed.
- Limit the size of a vein-mining operation.
- Support for normal and deepslate ore variants, including lit redstone.
- Build a `.mcpack` file on **Windows or Linux** using Bun.

## Installation

### Option 1: Download a release

You don't need to build the project yourself, just download a prebuilt release.

1. Open the [Releases page](https://github.com/Espryra/vein-miner/releases).
2. Download the latest `vein-miner.mcpack` asset.
3. Open the file with Minecraft Bedrock Edition to import it.
4. Enable **Vein Miner** under your world's **Behavior Packs**.

**No experimental features are required.**

For a dedicated server, extract the `.mcpack` archive into a folder in the server's `development_behavior_packs` directory and enable the pack for the world.

## Configuration

Configuration is defined in [`src/veinMiner/VeinMinerConfig.ts`](src/veinMiner/VeinMinerConfig.ts).

| Setting            | Default                 | Description                                                                                                 |
| ------------------ | ----------------------- | ----------------------------------------------------------------------------------------------------------- |
| `ActivateOnSneak`  | `true`                  | `true` requires sneaking to activate vein mining; `false` requires not sneaking.                            |
| `RequireSilkTouch` | `true`                  | Requires Silk Touch on the pickaxe when enabled.                                                            |
| `MaxBlocks`        | `100`                   | Maximum number of **additional** connected blocks that may be mined. Veins exceeding the limit are skipped. |
| `Ores`             | Vanilla ore ID list     | Block IDs eligible for vein mining.                                                                         |
| `Tools`            | Vanilla pickaxe ID list | Item IDs allowed to trigger vein mining.                                                                    |

Example:

```ts
const VeinMinerConfig = {
  ActivateOnSneak: true,
  RequireSilkTouch: true,

  MaxBlocks: 100,

  Ores: [
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
```

Use valid Minecraft Bedrock block and item identifiers when changing the lists.

**Important:** These settings are compiled into the script. After editing the configuration, run `bun run build` again and reinstall the updated pack. Changing a downloaded `.mcpack` does not expose a separate in-game configuration menu.

**Drop behavior:** The current implementation awards ore _blocks_ for the additional blocks mined. Disabling `RequireSilkTouch` does not change those rewards to normal vanilla drops.

## Build from source

### Requirements

- [Bun](https://bun.sh/) installed on Windows or Linux
- Git (or a downloaded source ZIP)

Clone the repository and install its dependencies:

```bash
git clone https://github.com/Espryra/vein-miner.git
cd vein-miner
bun install
```

Build the add-on:

```bash
bun run build
```

This compiles the TypeScript code and creates **`vein-miner.mcpack`** in the project root. Import that file into Minecraft or deploy its contents to your Bedrock server.

For development, compile without packaging:

```bash
bun run compile
```

Or automatically rebuild the script when source files change:

```bash
bun run watch
```

The compiled entry point is `scripts/Main.js`.

## How it works

1. Break an enabled ore block using an allowed pickaxe.
2. Meet the configured sneaking and Silk Touch requirements.
3. Vein Miner searches adjacent blocks in all six directions for the same ore type.
4. If the connected vein fits within `MaxBlocks`, the additional blocks are removed and their ore-block items are dropped.

Only directly connected blocks of the same type are included. For example, stone between two ore blocks interrupts the connection, and normal and deepslate ores are separate types.

## Compatibility

- **Platform:** Minecraft Bedrock Edition (behavior pack)
- **Minimum engine version:** `1.26.65` (as declared in `manifest.json`)
- **Script API:** `@minecraft/server` `2.11.0` (stable)

No experimental gameplay settings or Beta APIs need to be enabled. Check the release notes and your game/server version before installing.

## Source

Created by [Espryra](https://github.com/Espryra).

[View source code](https://github.com/Espryra/vein-miner) · [Download releases](https://github.com/Espryra/vein-miner/releases)
