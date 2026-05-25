const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const gameOneRoot = document.querySelector("#neon-forge-game");

if (gameOneRoot) {
  const saveKey = "neonForgeSaveV1";

  const rarities = {
    common: { label: "Common", value: 18 },
    uncommon: { label: "Uncommon", value: 32 },
    rare: { label: "Rare", value: 54 },
    epic: { label: "Epic", value: 82 },
    legendary: { label: "Legendary", value: 125 },
  };

  const paths = {
    wastes: {
      name: "Glowleaf Meadow",
      description: "friendly meadow quests and steady XP",
      enemies: ["Bubble Sprite", "Button Beetle", "Cloud Cub"],
      xp: [24, 36],
      enemyHp: [42, 58],
      enemyAttack: [10, 16],
      lootChance: 0.56,
      weaponBias: 0.5,
    },
    foundry: {
      name: "Tinker Toyworks",
      description: "busy workshop quests with stronger sword drops",
      enemies: ["Spring Bot", "Gear Imp", "Lantern Golem"],
      xp: [38, 58],
      enemyHp: [58, 78],
      enemyAttack: [16, 24],
      lootChance: 0.68,
      weaponBias: 0.78,
    },
    citadel: {
      name: "Starbell Castle",
      description: "sparkly castle trials with rare armor rewards",
      enemies: ["Ribbon Knight", "Prism Pal", "Crown Sprite"],
      xp: [50, 74],
      enemyHp: [70, 96],
      enemyAttack: [20, 30],
      lootChance: 0.74,
      weaponBias: 0.32,
    },
  };

  const terrainTypes = {
    wastes: { label: "Glowleaf Meadow", symbol: "GL", chance: 0.4 },
    foundry: { label: "Tinker Toyworks", symbol: "TT", chance: 0.28 },
    citadel: { label: "Starbell Castle", symbol: "SC", chance: 0.22 },
    supply: { label: "Snack Stand", symbol: "HP", chance: 0.1 },
  };

  const placeNames = {
    wastes: ["Mossy Button Bridge", "Firefly Picnic Hill", "Pebble Star Pond", "Sunny Kite Field"],
    foundry: ["Clockwork Candy Mill", "Tin-Tune Plaza", "Wind-Up Workshop", "Jelly Gear Station"],
    citadel: ["Moon Ribbon Gate", "Crystal Bell Court", "Cloud Crown Steps", "Starlight Library"],
    supply: ["Berry Battery Stand", "Pancake Power Kiosk", "Rainbow Rest Stop", "Lemon Spark Cafe"],
  };

  const artifacts = [
    "Moon Button",
    "Sun Marble",
    "Tiny Crown Gear",
    "Cloud Charm",
    "Ribbon Compass",
    "Star Acorn",
    "Glow Shell",
  ];

  const monsterBands = [
    {
      name: "Moss Zombie",
      variant: "sprout",
      body: "#8bd47c",
      shirt: "#5f82d6",
      eyes: "#20304b",
      accent: "#ff9fd2",
      hp: [32, 44],
      attack: [7, 11],
      xp: [18, 28],
    },
    {
      name: "Runner Zombie",
      variant: "runner",
      body: "#78cf83",
      shirt: "#f3b45f",
      eyes: "#1f2e49",
      accent: "#fff1a6",
      hp: [40, 54],
      attack: [9, 14],
      xp: [24, 38],
    },
    {
      name: "Lantern Zombie",
      variant: "lantern",
      body: "#95dd9c",
      shirt: "#8b67d8",
      eyes: "#1d2744",
      accent: "#ffd76f",
      hp: [52, 70],
      attack: [11, 16],
      xp: [34, 48],
    },
    {
      name: "Ironcap Zombie",
      variant: "ironcap",
      body: "#acd69a",
      shirt: "#d67676",
      eyes: "#17203c",
      accent: "#c2d0e2",
      hp: [60, 84],
      attack: [13, 20],
      xp: [42, 62],
    },
    {
      name: "Royal Rot Zombie",
      variant: "royal",
      body: "#b6d68e",
      shirt: "#6a58ba",
      eyes: "#17203c",
      accent: "#ffe27a",
      hp: [78, 104],
      attack: [17, 25],
      xp: [58, 84],
    },
  ];

  const villageVersion = 4;
  const villagePlaces = [
    { name: "Sword Shop", kind: "weapon", x: -25, y: -13, w: 5, h: 4, color: "#ffb07c", sign: "SWORDS" },
    { name: "Armor Shop", kind: "armor", x: -25, y: -2, w: 5, h: 4, color: "#95c8ff", sign: "ARMOR" },
    { name: "Snack Shop", kind: "supply", x: -25, y: 10, w: 5, h: 4, color: "#ffe06b", sign: "SNACKS" },
    { name: "Upgrade Hall", kind: "upgrade", x: 20, y: -13, w: 5, h: 4, color: "#d4b2ff", sign: "UPGRADE" },
    { name: "Artifact Booth", kind: "artifact", x: 20, y: -2, w: 5, h: 4, color: "#fff7ad", sign: "ARTIFACTS" },
    { name: "Quest Board", kind: "quest", x: 20, y: 10, w: 5, h: 4, color: "#91e891", sign: "QUESTS" },
  ];

  const movement = {
    up: { x: 0, y: -1 },
    left: { x: -1, y: 0 },
    down: { x: 0, y: 1 },
    right: { x: 1, y: 0 },
  };

  const weapons = [
    { type: "weapon", name: "Bubble Saber", rarity: "common", attack: 10 },
    { type: "weapon", name: "Glowstick Blade", rarity: "common", attack: 13 },
    { type: "weapon", name: "Sparkle Cutter", rarity: "uncommon", attack: 18 },
    { type: "weapon", name: "Rainbow Rail Blade", rarity: "rare", attack: 25 },
    { type: "weapon", name: "Starforged Katana", rarity: "epic", attack: 34 },
    { type: "weapon", name: "Wishlight Claymore", rarity: "legendary", attack: 46 },
  ];

  const armors = [
    { type: "armor", name: "Puddle Cape", rarity: "common", defense: 4 },
    { type: "armor", name: "Button Vest", rarity: "common", defense: 7 },
    { type: "armor", name: "Titan Toymail", rarity: "uncommon", defense: 12 },
    { type: "armor", name: "Aegis Bubble Shell", rarity: "rare", defense: 18 },
    { type: "armor", name: "Prism Parade Suit", rarity: "epic", defense: 26 },
    { type: "armor", name: "Halo Hug Armor", rarity: "legendary", defense: 38 },
  ];

  const upgradeCosts = {
    health: 45,
    attack: 35,
    defense: 35,
  };

  const elements = {
    heroStatus: document.querySelector("#game-one-hero-status"),
    vitalGauge: document.querySelector("#game-one-vital-gauge"),
    quickFight: document.querySelector("#game-one-quick-fight"),
    saveStatus: document.querySelector("#save-status"),
    level: document.querySelector("#level-value"),
    xp: document.querySelector("#xp-value"),
    hp: document.querySelector("#hp-value"),
    battles: document.querySelector("#battle-value"),
    weaponName: document.querySelector("#weapon-name"),
    weaponDetails: document.querySelector("#weapon-details"),
    weaponRarity: document.querySelector("#weapon-rarity"),
    weaponStat: document.querySelector("#weapon-stat"),
    weaponValue: document.querySelector("#weapon-value"),
    weaponCard: document.querySelector("#weapon-card"),
    armorName: document.querySelector("#armor-name"),
    armorDetails: document.querySelector("#armor-details"),
    armorRarity: document.querySelector("#armor-rarity"),
    armorStat: document.querySelector("#armor-stat"),
    armorValue: document.querySelector("#armor-value"),
    armorCard: document.querySelector("#armor-card"),
    worldPanel: document.querySelector("#world-panel"),
    worldView: document.querySelector("#world-view"),
    fullscreen: document.querySelector("#fullscreen-button"),
    location: document.querySelector("#location-readout"),
    generateMap: document.querySelector("#generate-map-button"),
    fight: document.querySelector("#fight-button"),
    rest: document.querySelector("#rest-button"),
    inventoryDrawer: document.querySelector("#inventory-drawer"),
    inventoryToggle: document.querySelector("#inventory-toggle-button"),
    clearSave: document.querySelector("#clear-save-button"),
    inventory: document.querySelector("#inventory-list"),
    log: document.querySelector("#battle-log"),
  };

  const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const createId = () => {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }

    return `gear-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  };

  const cloneGear = (gear) => ({ ...gear, id: createId() });
  const tileKey = (x, y) => `${x},${y}`;
  const monsterKey = (x, y) => `${x}:${y}`;
  const monsterSectorSize = 14;
  const monsterCleanupRadius = 120;
  let lastMonsterTick = performance.now();
  let monsterStateNeedsSave = false;
  let slashEffect = null;
  let lastSlashAt = 0;
  let lastRegenAt = performance.now();
  let hudHpDisplay = 100;
  let hudHpFlash = 100;
  let hudXpDisplay = 0;
  let hudXpFlash = 0;
  let lastObservedHp = 100;
  let lastObservedXp = 0;

  function createWorld() {
    return {
      x: 0,
      y: 4,
      px: 0,
      py: 4,
      steps: 0,
      mode: "village",
      version: villageVersion,
      tiles: {
        "0,4": {
          type: "wastes",
          visited: true,
          event: "start",
          landmark: 1,
          place: "Village Center",
          artifact: null,
        },
      },
    };
  }

  function rollTerrain() {
    const roll = Math.random();
    let runningChance = 0;

    for (const [type, terrain] of Object.entries(terrainTypes)) {
      runningChance += terrain.chance;

      if (roll <= runningChance) {
        return type;
      }
    }

    return "wastes";
  }

  function ensureWorldData() {
    state.world = state.world ?? createWorld();
    if (state.world.mode !== "village" || state.world.version !== villageVersion) {
      state.world = createWorld();
      addLog("You spawned at the Village Center.");
    }

    state.world.x = Number.isFinite(state.world.x) ? state.world.x : 0;
    state.world.y = Number.isFinite(state.world.y) ? state.world.y : 4;
    state.world.px = Number.isFinite(state.world.px) ? state.world.px : state.world.x;
    state.world.py = Number.isFinite(state.world.py) ? state.world.py : state.world.y;
    state.world.steps = Number.isFinite(state.world.steps) ? state.world.steps : 0;
    state.world.tiles = state.world.tiles ?? {};
    state.artifacts = Array.isArray(state.artifacts) ? state.artifacts : [];

    if (Math.abs(state.world.x) <= 1 && Math.abs(state.world.y) <= 1) {
      state.world.x = 0;
      state.world.y = 4;
      state.world.px = 0;
      state.world.py = 4;
    }

    if (!state.world.tiles[tileKey(state.world.x, state.world.y)]) {
      state.world.tiles[tileKey(state.world.x, state.world.y)] = {
        type: state.currentPath,
        visited: true,
        event: "start",
        landmark: 1,
        place: placeNames[state.currentPath][0],
        artifact: null,
      };
    }
  }

  function ensureTile(x, y) {
    ensureWorldData();
    const key = tileKey(x, y);

    if (!state.world.tiles[key]) {
      const type = rollTerrain();
      const hasArtifact = Math.random() > 0.62;
      state.world.tiles[key] = {
        type,
        visited: false,
        event: Math.random() > 0.42 ? "challenge" : "quiet",
        landmark: randomBetween(0, 3),
        place: placeNames[type][randomBetween(0, placeNames[type].length - 1)],
        artifact: hasArtifact ? artifacts[randomBetween(0, artifacts.length - 1)] : null,
      };
    }

    const tile = state.world.tiles[key];
    tile.event = tile.event === "combat" ? "challenge" : tile.event;
    tile.landmark = Number.isFinite(tile.landmark) ? tile.landmark : randomBetween(0, 3);
    tile.place = tile.place ?? placeNames[tile.type][randomBetween(0, placeNames[tile.type].length - 1)];

    return tile;
  }

  function createSeededNumber(...values) {
    let seed = 2166136261;

    values.forEach((value, index) => {
      const numeric = Math.floor(Number(value) * 1000) + index * 374761;
      seed ^= numeric;
      seed = Math.imul(seed, 16777619);
      seed ^= seed >>> 13;
    });

    return ((seed >>> 0) % 100000) / 100000;
  }

  function createNeighborTiles() {
    Object.values(movement).forEach((direction) => {
      ensureTile(state.world.x + direction.x, state.world.y + direction.y);
    });
  }

  function getVillagePlaceAt(x, y) {
    return villagePlaces.find(
      (place) => x >= place.x && x < place.x + place.w && y >= place.y && y < place.y + place.h,
    );
  }

  function getNearbyVillagePlace() {
    return villagePlaces.find((place) => {
      const nearestX = Math.max(place.x, Math.min(state.world.x, place.x + place.w - 1));
      const nearestY = Math.max(place.y, Math.min(state.world.y, place.y + place.h - 1));
      const distance = Math.abs(state.world.x - nearestX) + Math.abs(state.world.y - nearestY);

      return distance <= 1;
    });
  }

  function isVillageSafeZone(x, y) {
    return x >= -26 && x <= 25 && y >= -18 && y <= 18;
  }

  function isInEllipse(x, y, centerX, centerY, radiusX, radiusY) {
    const dx = (x - centerX) / radiusX;
    const dy = (y - centerY) / radiusY;

    return dx * dx + dy * dy <= 1;
  }

  function getRiverCenterY(x) {
    return -24 + Math.round(Math.sin((x + 8) / 6) * 3 + Math.sin((x - 18) / 9) * 2);
  }

  function getMountainRangeCenterY(x) {
    return 36 + Math.round(Math.sin((x - 6) / 8) * 3 + Math.sin((x + 18) / 13) * 2);
  }

  function getMountainRangeHalfWidth(x) {
    return 1 + Math.round((Math.sin((x + 9) / 10) + 1) * 0.5);
  }

  function getWorldTerrainTile(x, y) {
    const inVillageCenter = x >= -22 && x <= 21 && y >= -14 && y <= 12;

    if (inVillageCenter) {
      return null;
    }

    const riverCenterY = getRiverCenterY(x);
    const inRiverBand = x >= -58 && x <= 58 && Math.abs(y - riverCenterY) <= 1;

    if (inRiverBand) {
      if ((x >= -6 && x <= -2) || (x >= 28 && x <= 32)) return "bridge";
      if (x >= 14 && x <= 16) return "stones";
      return "river";
    }

    const inLake =
      isInEllipse(x, y, 36, 28, 9, 7) ||
      isInEllipse(x, y, 41, 28, 5, 5) ||
      isInEllipse(x, y, 33, 31, 6, 4);

    if (inLake) {
      if (x >= 34 && x <= 36 && y >= 23 && y <= 33) return "causeway";
      return "lake";
    }

    const mountainCenterY = getMountainRangeCenterY(x);
    const mountainHalfWidth = getMountainRangeHalfWidth(x);
    const inMountain =
      x >= -42 &&
      x <= 36 &&
      Math.abs(y - mountainCenterY) <= mountainHalfWidth;

    if (inMountain) {
      const inWestPass = x >= -30 && x <= -25 && Math.abs(y - getMountainRangeCenterY(x)) <= 1;
      const inCenterPass = x >= -4 && x <= 1 && Math.abs(y - getMountainRangeCenterY(x)) <= 1;
      const inEastPass = x >= 20 && x <= 26 && Math.abs(y - getMountainRangeCenterY(x)) <= 1;

      if (inWestPass || inCenterPass || inEastPass) return "pass";
      return "mountain";
    }

    return null;
  }

  function getTerrainBarrier(x, y) {
    const terrain = getWorldTerrainTile(x, y);

    if (terrain === "river") return "river";
    if (terrain === "lake") return "lake";
    if (terrain === "mountain") return "mountain";

    return null;
  }

  function isWalkableLand(x, y) {
    return !getWorldTerrainTile(x, y) && !getVillagePlaceAt(x, y) && !isVillageGardenBarrier(x, y) && !isVillageSafeZone(x, y);
  }

  function getMonsterBandForPosition(x, y) {
    const distance = Math.abs(x) + Math.abs(y);

    if (distance >= 128) return monsterBands[4];
    if (distance >= 96) return monsterBands[3];
    if (distance >= 68) return monsterBands[2];
    if (distance >= 42) return monsterBands[1];
    return monsterBands[0];
  }

  function createMonsterAt(x, y, sectorX, sectorY) {
    const band = getMonsterBandForPosition(x, y);
    const roamRadius = 3 + Math.floor(createSeededNumber(sectorX, sectorY, 99) * 5);
    const hp = randomBetween(band.hp[0], band.hp[1]);
    const attack = randomBetween(band.attack[0], band.attack[1]);
    const xp = randomBetween(band.xp[0], band.xp[1]) + Math.max(0, state.level - 1) * 3;

    return {
      id: monsterKey(sectorX, sectorY),
      sectorX,
      sectorY,
      name: band.name,
      body: band.body,
      shirt: band.shirt,
      eyes: band.eyes,
      accent: band.accent,
      variant: band.variant,
      spawnX: x,
      spawnY: y,
      x,
      y,
      hp,
      maxHp: hp,
      attack,
      xp,
      roamRadius,
      moveDelay: 120 + Math.floor(createSeededNumber(sectorX, sectorY, 55) * 120),
      nextMoveAt: 0,
      nextAttackAt: 0,
      respawnAt: 0,
      dead: false,
      mode: "idle",
    };
  }

  function normalizeMonster(monster) {
    if (!monster || typeof monster !== "object") return null;

    const sectorX = Number.isFinite(monster.sectorX) ? monster.sectorX : Math.floor((monster.spawnX ?? monster.x ?? 0) / monsterSectorSize);
    const sectorY = Number.isFinite(monster.sectorY) ? monster.sectorY : Math.floor((monster.spawnY ?? monster.y ?? 0) / monsterSectorSize);
    const x = Number.isFinite(monster.x) ? monster.x : monster.spawnX;
    const y = Number.isFinite(monster.y) ? monster.y : monster.spawnY;
    const spawnX = Number.isFinite(monster.spawnX) ? monster.spawnX : x;
    const spawnY = Number.isFinite(monster.spawnY) ? monster.spawnY : y;
    const band = getMonsterBandForPosition(spawnX, spawnY);
    const maxHp = Number.isFinite(monster.maxHp) ? monster.maxHp : randomBetween(band.hp[0], band.hp[1]);

    return {
      id: monster.id ?? monsterKey(sectorX, sectorY),
      sectorX,
      sectorY,
      name: monster.name ?? band.name,
      body: monster.body ?? band.body,
      shirt: monster.shirt ?? band.shirt,
      eyes: monster.eyes ?? band.eyes,
      accent: monster.accent ?? band.accent,
      variant: monster.variant ?? band.variant,
      spawnX,
      spawnY,
      x,
      y,
      hp: Number.isFinite(monster.hp) ? monster.hp : maxHp,
      maxHp,
      attack: Number.isFinite(monster.attack) ? monster.attack : randomBetween(band.attack[0], band.attack[1]),
      xp: Number.isFinite(monster.xp) ? monster.xp : randomBetween(band.xp[0], band.xp[1]),
      roamRadius: Number.isFinite(monster.roamRadius) ? monster.roamRadius : 4,
      moveDelay: Number.isFinite(monster.moveDelay) ? monster.moveDelay : 180,
      nextMoveAt: Number.isFinite(monster.nextMoveAt) ? monster.nextMoveAt : 0,
      nextAttackAt: Number.isFinite(monster.nextAttackAt) ? monster.nextAttackAt : 0,
      respawnAt: Number.isFinite(monster.respawnAt) ? monster.respawnAt : 0,
      dead: Boolean(monster.dead),
      mode: monster.mode ?? "idle",
    };
  }

  function ensureMonsterData() {
    state.monsters = Array.isArray(state.monsters) ? state.monsters.map(normalizeMonster).filter(Boolean) : [];
  }

  function syncHudTargets() {
    hudHpDisplay = state.hp;
    hudHpFlash = state.hp;
    hudXpDisplay = state.totalXp;
    hudXpFlash = state.totalXp;
    lastObservedHp = state.hp;
    lastObservedXp = state.totalXp;
  }

  function canMonsterStandAt(x, y, ignoreId = "") {
    if (!isWalkableLand(x, y)) return false;
    if (x === state.world.x && y === state.world.y) return false;

    return !state.monsters.some((monster) => !monster.dead && monster.id !== ignoreId && monster.x === x && monster.y === y);
  }

  function getMonsterAt(x, y) {
    ensureMonsterData();
    return state.monsters.find((monster) => !monster.dead && monster.x === x && monster.y === y) ?? null;
  }

  function ensureMonstersNearPlayer() {
    ensureMonsterData();
    const sectorRadius = 7;
    const playerSectorX = Math.floor(state.world.x / monsterSectorSize);
    const playerSectorY = Math.floor(state.world.y / monsterSectorSize);
    const monstersById = new Map(state.monsters.map((monster) => [monster.id, monster]));

    for (let sy = playerSectorY - sectorRadius; sy <= playerSectorY + sectorRadius; sy += 1) {
      for (let sx = playerSectorX - sectorRadius; sx <= playerSectorX + sectorRadius; sx += 1) {
        const id = monsterKey(sx, sy);
        if (monstersById.has(id)) continue;
        if (createSeededNumber(sx, sy, 11) < 0.22) continue;

        let createdMonster = null;
        for (let attempt = 0; attempt < 10; attempt += 1) {
          const offsetX = 2 + Math.floor(createSeededNumber(sx, sy, 30 + attempt) * (monsterSectorSize - 4));
          const offsetY = 2 + Math.floor(createSeededNumber(sx, sy, 50 + attempt) * (monsterSectorSize - 4));
          const worldX = sx * monsterSectorSize + offsetX;
          const worldY = sy * monsterSectorSize + offsetY;

          if (!isWalkableLand(worldX, worldY)) continue;

          const tooCloseToAnotherMonster = state.monsters.some((monster) => {
            const distance = Math.abs(monster.spawnX - worldX) + Math.abs(monster.spawnY - worldY);
            return distance < 10;
          });

          if (tooCloseToAnotherMonster) continue;

          createdMonster = createMonsterAt(worldX, worldY, sx, sy);
          break;
        }

        if (createdMonster) {
          state.monsters.push(createdMonster);
          monstersById.set(id, createdMonster);
        }
      }
    }

    state.monsters = state.monsters.filter((monster) => {
      const distance = Math.max(Math.abs(monster.spawnX - state.world.x), Math.abs(monster.spawnY - state.world.y));
      return distance <= monsterCleanupRadius || (monster.dead && monster.respawnAt > performance.now());
    });
  }

  function moveMonsterToward(monster, targetX, targetY) {
    const directions = [];
    const deltaX = targetX - monster.x;
    const deltaY = targetY - monster.y;

    if (deltaX !== 0) directions.push({ x: Math.sign(deltaX), y: 0 });
    if (deltaY !== 0) directions.push({ x: 0, y: Math.sign(deltaY) });
    if (Math.abs(deltaX) >= Math.abs(deltaY)) directions.push({ x: Math.sign(deltaX), y: Math.sign(deltaY) });
    else directions.push({ x: Math.sign(deltaX), y: Math.sign(deltaY) });

    const fallbacks = [
      { x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 },
    ];

    for (const direction of [...directions, ...fallbacks]) {
      const nextX = monster.x + direction.x;
      const nextY = monster.y + direction.y;

      if (Math.abs(nextX - monster.spawnX) > monster.roamRadius + 2 || Math.abs(nextY - monster.spawnY) > monster.roamRadius + 2) {
        continue;
      }

      if (canMonsterStandAt(nextX, nextY, monster.id)) {
        monster.x = nextX;
        monster.y = nextY;
        return true;
      }
    }

    return false;
  }

  function updateMonsters(now) {
    let changed = false;
    ensureMonstersNearPlayer();

    state.monsters.forEach((monster) => {
      if (monster.dead) {
        if (now >= monster.respawnAt) {
          monster.dead = false;
          monster.x = monster.spawnX;
          monster.y = monster.spawnY;
          monster.hp = monster.maxHp;
          monster.mode = "idle";
          monster.nextMoveAt = now + 400;
          monster.nextAttackAt = now + 600;
          changed = true;
          monsterStateNeedsSave = true;
        }
        return;
      }

      const playerDistanceFromSpawn = Math.max(
        Math.abs(state.world.x - monster.spawnX),
        Math.abs(state.world.y - monster.spawnY),
      );
      const playerDistanceFromMonster = Math.max(
        Math.abs(state.world.x - monster.x),
        Math.abs(state.world.y - monster.y),
      );
      const playerInsideAggroRadius = playerDistanceFromSpawn <= monster.roamRadius;

      if (playerInsideAggroRadius) {
        monster.mode = "aggro";
      } else if (monster.x !== monster.spawnX || monster.y !== monster.spawnY) {
        monster.mode = "return";
      } else {
        monster.mode = "idle";
      }

      if (monster.mode === "aggro" && playerDistanceFromMonster <= 1 && now >= monster.nextAttackAt) {
        const playerDefense = state.armor.defense + state.defenseBoost;
        const damage = Math.max(3, randomBetween(monster.attack - 2, monster.attack + 3) - Math.floor(playerDefense * 0.55));
        state.hp -= damage;
        monster.nextAttackAt = now + 900;
        addLog(`${monster.name} bonked you for ${damage} HP.`);
        changed = true;
        monsterStateNeedsSave = true;

        if (state.hp <= 0) {
          state.hp = Math.max(22, Math.ceil(state.maxHp * 0.5));
          state.world.x = 0;
          state.world.y = 4;
          state.world.px = 0;
          state.world.py = 4;
          addLog("You got knocked out and woke up back in the Village Center.");
          changed = true;
          monsterStateNeedsSave = true;
        }
      }

      if (now < monster.nextMoveAt) return;
      monster.nextMoveAt = now + monster.moveDelay;

      if (monster.mode === "aggro") {
        changed = moveMonsterToward(monster, state.world.x, state.world.y) || changed;
        return;
      }

      if (monster.mode === "return") {
        changed = moveMonsterToward(monster, monster.spawnX, monster.spawnY) || changed;
        return;
      }

      if (createSeededNumber(monster.spawnX, monster.spawnY, Math.floor(now / 500)) < 0.44) {
        return;
      }

      const roamOptions = [
        { x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 },
      ];
      const startIndex = Math.floor(createSeededNumber(monster.spawnX, monster.spawnY, Math.floor(now / 400)) * roamOptions.length);

      for (let index = 0; index < roamOptions.length; index += 1) {
        const direction = roamOptions[(startIndex + index) % roamOptions.length];
        const nextX = monster.x + direction.x;
        const nextY = monster.y + direction.y;

        if (Math.abs(nextX - monster.spawnX) > monster.roamRadius || Math.abs(nextY - monster.spawnY) > monster.roamRadius) continue;
        if (!canMonsterStandAt(nextX, nextY, monster.id)) continue;

        monster.x = nextX;
        monster.y = nextY;
        changed = true;
        break;
      }
    });

    return changed;
  }

  function updatePassiveRegen(now) {
    if (state.hp >= state.maxHp) return false;
    if (now - lastRegenAt < 650) return false;

    lastRegenAt = now;
    const healAmount = state.hp < state.maxHp * 0.35 ? 2 : 1;
    const nextHp = Math.min(state.maxHp, state.hp + healAmount);

    if (nextHp === state.hp) return false;

    state.hp = nextHp;
    monsterStateNeedsSave = true;
    return true;
  }

  function updateHudAnimations() {
    if (state.hp > lastObservedHp) {
      hudHpFlash = state.hp;
    } else if (state.hp < lastObservedHp) {
      hudHpDisplay = Math.max(state.hp, hudHpDisplay);
    }

    if (state.totalXp > lastObservedXp) {
      hudXpFlash = state.totalXp;
    }

    lastObservedHp = state.hp;
    lastObservedXp = state.totalXp;
    hudHpDisplay += (state.hp - hudHpDisplay) * 0.16;
    hudHpFlash += (state.hp - hudHpFlash) * 0.08;
    hudXpDisplay += (state.totalXp - hudXpDisplay) * 0.12;
    hudXpFlash += (state.totalXp - hudXpFlash) * 0.05;
  }

  function isWaterTerrain(terrain) {
    return terrain === "river" || terrain === "lake" || terrain === "bridge" || terrain === "stones" || terrain === "causeway";
  }

  function isMountainTerrain(terrain) {
    return terrain === "mountain";
  }

  function getTerrainNeighbors(x, y, matcher) {
    return {
      north: matcher(getWorldTerrainTile(x, y - 1)),
      east: matcher(getWorldTerrainTile(x + 1, y)),
      south: matcher(getWorldTerrainTile(x, y + 1)),
      west: matcher(getWorldTerrainTile(x - 1, y)),
      northEast: matcher(getWorldTerrainTile(x + 1, y - 1)),
      southEast: matcher(getWorldTerrainTile(x + 1, y + 1)),
      southWest: matcher(getWorldTerrainTile(x - 1, y + 1)),
      northWest: matcher(getWorldTerrainTile(x - 1, y - 1)),
    };
  }

  function getTileVariant(x, y) {
    const seed = Math.abs((x * 92821 + y * 68917 + x * y * 131) % 104729);
    return {
      a: seed % 7,
      b: Math.floor(seed / 7) % 11,
      c: Math.floor(seed / 13) % 17,
      d: Math.floor(seed / 19) % 5,
      e: Math.floor(seed / 23) % 7,
      f: Math.floor(seed / 29) % 9,
    };
  }

  function drawTree(context, screenX, screenY, variant = 0) {
    const leafA = variant % 2 === 0 ? "#4fbf63" : "#63d478";
    const leafB = variant % 2 === 0 ? "#74e08b" : "#8ded97";
    context.fillStyle = "#6d4f30";
    context.fillRect(screenX + 10, screenY + 15, 5, 10);
    context.fillStyle = "#5b3f25";
    context.fillRect(screenX + 8, screenY + 18, 9, 3);
    context.fillStyle = leafA;
    drawSoftRect(context, screenX + 3, screenY + 6, 18, 9, 5);
    drawSoftRect(context, screenX + 1, screenY + 11, 23, 8, 5);
    drawSoftRect(context, screenX + 6, screenY + 1, 12, 8, 5);
    context.fillStyle = leafB;
    context.fillRect(screenX + 6, screenY + 8, 4, 3);
    context.fillRect(screenX + 14, screenY + 6, 5, 3);
    context.fillRect(screenX + 9, screenY + 3, 5, 2);
    context.fillStyle = "#3aa851";
    context.fillRect(screenX + 4, screenY + 14, 3, 2);
    context.fillRect(screenX + 18, screenY + 12, 3, 2);
    if (variant % 3 === 0) {
      context.fillStyle = "#fff4a3";
      context.fillRect(screenX + 16, screenY + 9, 2, 2);
      context.fillRect(screenX + 11, screenY + 6, 2, 2);
    }
  }

  function drawFlowers(context, screenX, screenY, color) {
    context.fillStyle = "#4ea55b";
    context.fillRect(screenX + 6, screenY + 8, 1, 8);
    context.fillRect(screenX + 15, screenY + 13, 1, 7);
    context.fillRect(screenX + 10, screenY + 18, 1, 5);
    context.fillStyle = color;
    context.fillRect(screenX + 4, screenY + 5, 5, 2);
    context.fillRect(screenX + 5, screenY + 4, 3, 4);
    context.fillRect(screenX + 13, screenY + 11, 5, 2);
    context.fillRect(screenX + 14, screenY + 10, 3, 4);
    context.fillRect(screenX + 7, screenY + 16, 5, 2);
    context.fillRect(screenX + 8, screenY + 15, 3, 4);
    context.fillStyle = "#fff4a3";
    context.fillRect(screenX + 6, screenY + 5, 1, 1);
    context.fillRect(screenX + 15, screenY + 11, 1, 1);
    context.fillRect(screenX + 9, screenY + 16, 1, 1);
  }

  function drawLamp(context, screenX, screenY, time = 0) {
    const glow = Math.round(Math.sin(time / 280 + screenX) * 1);
    context.fillStyle = "#5a4632";
    context.fillRect(screenX + 10, screenY + 7, 4, 17);
    context.fillStyle = "#2d3436";
    context.fillRect(screenX + 7, screenY + 21, 10, 3);
    context.fillRect(screenX + 9, screenY + 6, 6, 2);
    context.fillStyle = "#fff4a3";
    drawSoftRect(context, screenX + 6, screenY + 2 + glow, 12, 10, 4);
    context.fillStyle = "#ffffff";
    context.fillRect(screenX + 8, screenY + 4 + glow, 5, 3);
    context.fillStyle = "rgba(255, 244, 163, 0.35)";
    context.fillRect(screenX + 4, screenY + 12 + glow, 16, 3);
    context.strokeStyle = "#35505f";
    context.lineWidth = 1;
    context.strokeRect(screenX + 6, screenY + 2 + glow, 12, 9);
  }

  function drawPlanter(context, screenX, screenY, flowerColor) {
    context.fillStyle = "#a86d3c";
    drawSoftRect(context, screenX + 2, screenY + 13, 20, 8, 3);
    context.fillStyle = "#6b4a2e";
    context.fillRect(screenX + 4, screenY + 11, 16, 4);
    context.fillStyle = "#4fbf63";
    context.fillRect(screenX + 5, screenY + 7, 4, 6);
    context.fillRect(screenX + 13, screenY + 6, 4, 7);
    context.fillRect(screenX + 9, screenY + 8, 3, 5);
    context.fillStyle = flowerColor;
    context.fillRect(screenX + 4, screenY + 5, 5, 4);
    context.fillRect(screenX + 9, screenY + 6, 4, 3);
    context.fillRect(screenX + 12, screenY + 4, 5, 4);
    context.fillStyle = "#fff4a3";
    context.fillRect(screenX + 6, screenY + 6, 1, 1);
    context.fillRect(screenX + 14, screenY + 5, 1, 1);
  }

  function drawHedge(context, screenX, screenY, width, height) {
    context.fillStyle = "#4aaf5d";
    drawSoftRect(context, screenX, screenY, width, height, 5);
    context.fillStyle = "#7ae08a";
    context.fillRect(screenX + 3, screenY + 3, Math.max(4, width - 9), 2);
    context.fillRect(screenX + 6, screenY + Math.max(4, height - 6), Math.max(4, width - 12), 2);
    context.fillStyle = "#2f8a45";
    context.fillRect(screenX + 4, screenY + Math.round(height / 2), Math.max(4, width - 8), 2);
  }

  function drawBushCluster(context, screenX, screenY, accentColor = "#ff7aa8") {
    context.fillStyle = "#3f9f56";
    drawSoftRect(context, screenX + 2, screenY + 16, 18, 14, 7);
    drawSoftRect(context, screenX + 12, screenY + 10, 22, 18, 9);
    drawSoftRect(context, screenX + 26, screenY + 14, 18, 14, 7);
    drawSoftRect(context, screenX + 8, screenY + 18, 30, 12, 7);
    context.fillStyle = "#72d884";
    context.fillRect(screenX + 8, screenY + 18, 8, 2);
    context.fillRect(screenX + 18, screenY + 13, 10, 2);
    context.fillRect(screenX + 30, screenY + 17, 7, 2);
    context.fillRect(screenX + 14, screenY + 22, 16, 2);
    context.fillStyle = accentColor;
    context.fillRect(screenX + 11, screenY + 14, 3, 3);
    context.fillRect(screenX + 21, screenY + 9, 3, 3);
    context.fillRect(screenX + 33, screenY + 14, 3, 3);
    context.fillRect(screenX + 25, screenY + 20, 2, 2);
    context.fillStyle = "#fff4a3";
    context.fillRect(screenX + 12, screenY + 15, 1, 1);
    context.fillRect(screenX + 22, screenY + 10, 1, 1);
    context.fillRect(screenX + 34, screenY + 15, 1, 1);
    context.fillStyle = "rgba(42, 82, 45, 0.2)";
    context.fillRect(screenX + 10, screenY + 28, 24, 2);
  }

  function drawTallPlant(context, screenX, screenY, bloomColor = "#82b8ff") {
    context.fillStyle = "#4d9d58";
    context.fillRect(screenX + 11, screenY + 10, 2, 16);
    context.fillRect(screenX + 8, screenY + 15, 2, 8);
    context.fillRect(screenX + 15, screenY + 14, 2, 9);
    context.fillStyle = "#6fca77";
    context.fillRect(screenX + 7, screenY + 12, 6, 2);
    context.fillRect(screenX + 12, screenY + 9, 5, 2);
    context.fillRect(screenX + 14, screenY + 16, 5, 2);
    context.fillStyle = bloomColor;
    drawSoftRect(context, screenX + 8, screenY + 4, 8, 7, 3);
    context.fillStyle = "#fff4cf";
    context.fillRect(screenX + 11, screenY + 6, 2, 2);
  }

  function drawGoldenArch(context, screenX, screenY) {
    context.fillStyle = "#c69d3f";
    context.fillRect(screenX + 3, screenY + 12, 4, 24);
    context.fillRect(screenX + 29, screenY + 12, 4, 24);
    context.fillRect(screenX + 8, screenY + 7, 20, 4);
    context.fillRect(screenX + 6, screenY + 9, 4, 4);
    context.fillRect(screenX + 26, screenY + 9, 4, 4);
    context.fillStyle = "#f5d977";
    context.fillRect(screenX + 4, screenY + 13, 2, 20);
    context.fillRect(screenX + 30, screenY + 13, 2, 20);
    context.fillRect(screenX + 10, screenY + 8, 16, 2);
    context.fillStyle = "#fff4cf";
    context.fillRect(screenX + 15, screenY + 5, 6, 2);
    context.fillRect(screenX + 9, screenY + 11, 2, 2);
    context.fillRect(screenX + 25, screenY + 11, 2, 2);
    context.fillStyle = "#78dd7a";
    context.fillRect(screenX + 5, screenY + 16, 2, 2);
    context.fillRect(screenX + 29, screenY + 17, 2, 2);
  }

  function drawRoseBed(context, screenX, screenY, petalColor = "#ff7aa8") {
    context.fillStyle = "#4e9c58";
    drawSoftRect(context, screenX + 2, screenY + 12, 28, 12, 6);
    context.fillStyle = "#79cf86";
    context.fillRect(screenX + 5, screenY + 14, 22, 2);
    context.fillRect(screenX + 8, screenY + 19, 16, 2);
    context.fillStyle = "#2f7e43";
    context.fillRect(screenX + 8, screenY + 9, 2, 10);
    context.fillRect(screenX + 15, screenY + 7, 2, 12);
    context.fillRect(screenX + 22, screenY + 9, 2, 10);
    context.fillStyle = petalColor;
    drawSoftRect(context, screenX + 5, screenY + 6, 8, 7, 4);
    drawSoftRect(context, screenX + 12, screenY + 4, 8, 7, 4);
    drawSoftRect(context, screenX + 19, screenY + 6, 8, 7, 4);
    context.fillStyle = "#fff4cf";
    context.fillRect(screenX + 8, screenY + 8, 2, 2);
    context.fillRect(screenX + 15, screenY + 6, 2, 2);
    context.fillRect(screenX + 22, screenY + 8, 2, 2);
  }

  function drawGardenLantern(context, screenX, screenY, time = 0) {
    const glow = Math.round(Math.sin((screenX + time) / 120) * 1);
    context.fillStyle = "#6f5535";
    context.fillRect(screenX + 10, screenY + 7, 4, 17);
    context.fillStyle = "#35505f";
    context.fillRect(screenX + 7, screenY + 21, 10, 3);
    context.fillStyle = "#fff2a3";
    drawSoftRect(context, screenX + 7, screenY + 2 + glow, 10, 10, 4);
    context.fillStyle = "#ffffff";
    context.fillRect(screenX + 10, screenY + 5 + glow, 3, 3);
    context.fillStyle = "rgba(255, 242, 163, 0.3)";
    context.fillRect(screenX + 4, screenY + 13 + glow, 16, 3);
  }

  function drawStoneCurl(context, screenX, screenY, width, height) {
    context.fillStyle = "#dcc796";
    drawSoftRect(context, screenX, screenY, width, height, 7);
    context.fillStyle = "#fff1cf";
    context.fillRect(screenX + 3, screenY + 3, Math.max(4, width - 10), 2);
    context.fillStyle = "#b99759";
    context.fillRect(screenX + 4, screenY + height - 5, Math.max(4, width - 8), 2);
  }

  function drawLushGardenTile(context, screenX, screenY, variant = 0) {
    const petalPalette = ["#ff7aa8", "#fff4a3", "#82b8ff", "#78dd7a", "#d4b2ff", "#ffcf5c", "#ffc2dd", "#c4f0ff"];
    const accent = petalPalette[((variant % petalPalette.length) + petalPalette.length) % petalPalette.length];
    const accentTwo = petalPalette[(variant + 3) % petalPalette.length];

    context.fillStyle = "#3f9f56";
    drawSoftRect(context, screenX + 2, screenY + 11, 20, 11, 5);
    context.fillStyle = "#57b56a";
    drawSoftRect(context, screenX + 4, screenY + 8, 16, 10, 5);
    context.fillStyle = "#7fda8c";
    context.fillRect(screenX + 6, screenY + 10, 5, 2);
    context.fillRect(screenX + 13, screenY + 8, 5, 2);

    if (variant % 3 === 0) {
      drawBushCluster(context, screenX - 10, screenY - 8, accent);
    } else if (variant % 3 === 1) {
      drawRoseBed(context, screenX - 4, screenY - 3, accent);
    } else {
      drawTallPlant(context, screenX - 1, screenY - 5, accent);
      drawBushCluster(context, screenX - 11, screenY - 6, accentTwo);
    }

    context.fillStyle = accent;
    context.fillRect(screenX + 4, screenY + 5, 2, 2);
    context.fillRect(screenX + 17, screenY + 4, 2, 2);
    context.fillStyle = accentTwo;
    context.fillRect(screenX + 9, screenY + 3, 2, 2);
    context.fillRect(screenX + 13, screenY + 17, 2, 2);
    context.fillStyle = "#fff8d6";
    context.fillRect(screenX + 5, screenY + 6, 1, 1);
    context.fillRect(screenX + 10, screenY + 4, 1, 1);
    context.fillRect(screenX + 18, screenY + 5, 1, 1);
    context.fillStyle = "rgba(40, 92, 50, 0.24)";
    context.fillRect(screenX + 4, screenY + 20, 14, 2);
  }

  function isGardenWalkwayTile(x, y) {
    const ax = Math.abs(x);
    const ay = Math.abs(y);
    const crossPath = ax <= 2 || ay <= 2;
    const fountainRing = ax <= 5 && ay <= 5;
    const sectionAisles = (ax >= 7 && ax <= 8) || (ay >= 7 && ay <= 8);
    const outerBorderPath = (ax >= 9 && ay <= 10) || (ay >= 9 && ax <= 10);

    return crossPath || fountainRing || sectionAisles || outerBorderPath;
  }

  function isGardenTile(x, y) {
    return Math.abs(x) <= 10 && Math.abs(y) <= 10;
  }

  function isFountainCoreTile(x, y) {
    return Math.abs(x) <= 2 && Math.abs(y) <= 2;
  }

  function isVillageGardenBarrier(x, y) {
    if (!isGardenTile(x, y)) return false;
    if (isGardenWalkwayTile(x, y)) return false;
    const inTopLeft = x <= -4 && y <= -4;
    const inTopRight = x >= 4 && y <= -4;
    const inBottomLeft = x <= -4 && y >= 4;
    const inBottomRight = x >= 4 && y >= 4;

    if (!(inTopLeft || inTopRight || inBottomLeft || inBottomRight)) {
      return false;
    }

    return true;
  }

  function drawGardenWalkwayTile(context, screenX, screenY, variant = 0) {
    context.fillStyle = "#dcc796";
    drawSoftRect(context, screenX + 2, screenY + 2, 20, 20, 6);
    context.fillStyle = "#f6e7c7";
    context.fillRect(screenX + 4, screenY + 4, 16, 3);
    context.fillRect(screenX + 4, screenY + 7, 12, 1);
    context.fillStyle = "#b99759";
    context.fillRect(screenX + 4, screenY + 18, 16, 2);
    context.fillRect(screenX + 3, screenY + 3, 2, 16);
    context.fillRect(screenX + 19, screenY + 5, 2, 14);
    context.fillStyle = variant % 2 === 0 ? "#c8ae73" : "#ceb983";
    context.fillRect(screenX + 6, screenY + 9, 5, 4);
    context.fillRect(screenX + 13, screenY + 11, 5, 4);
    if (variant % 3 === 0) {
      context.fillRect(screenX + 9, screenY + 6, 4, 2);
    }
  }

  function drawGardenFence(context, screenX, screenY, width, height) {
    context.fillStyle = "#8a673b";
    if (width >= height) {
      for (let offset = 0; offset < width; offset += 10) {
        context.fillRect(screenX + offset, screenY + 2, 3, 12);
        context.fillRect(screenX + offset + 4, screenY + 2, 3, 12);
      }
      context.fillRect(screenX, screenY + 4, width, 2);
      context.fillRect(screenX, screenY + 10, width, 2);
    } else {
      for (let offset = 0; offset < height; offset += 10) {
        context.fillRect(screenX + 2, screenY + offset, 12, 3);
        context.fillRect(screenX + 2, screenY + offset + 4, 12, 3);
      }
      context.fillRect(screenX + 4, screenY, 2, height);
      context.fillRect(screenX + 10, screenY, 2, height);
    }
    context.fillStyle = "#f1ddb4";
    if (width >= height) {
      for (let offset = 0; offset < width; offset += 10) {
        context.fillRect(screenX + offset + 1, screenY + 3, 1, 8);
        context.fillRect(screenX + offset + 5, screenY + 3, 1, 8);
      }
    } else {
      for (let offset = 0; offset < height; offset += 10) {
        context.fillRect(screenX + 3, screenY + offset + 1, 8, 1);
        context.fillRect(screenX + 3, screenY + offset + 5, 8, 1);
      }
    }
  }

  function drawGardenFenceEdge(context, screenX, screenY, side) {
    context.fillStyle = "#8a673b";
    context.fillStyle = "#8a673b";
    if (side === "north" || side === "south") {
      const y = side === "north" ? screenY + 1 : screenY + 19;
      for (let offset = 2; offset <= 18; offset += 6) {
        context.fillRect(screenX + offset, y, 2, 7);
        context.fillRect(screenX + offset + 3, y, 2, 7);
      }
      context.fillRect(screenX + 2, y + 1, 18, 2);
      context.fillRect(screenX + 2, y + 5, 18, 2);
      context.fillStyle = "#f1ddb4";
      for (let offset = 2; offset <= 18; offset += 6) {
        context.fillRect(screenX + offset + 1, y + 1, 1, 5);
        context.fillRect(screenX + offset + 4, y + 1, 1, 5);
      }
    } else {
      const x = side === "west" ? screenX + 1 : screenX + 19;
      for (let offset = 2; offset <= 18; offset += 6) {
        context.fillRect(x, screenY + offset, 7, 2);
        context.fillRect(x, screenY + offset + 3, 7, 2);
      }
      context.fillRect(x + 1, screenY + 2, 2, 18);
      context.fillRect(x + 5, screenY + 2, 2, 18);
      context.fillStyle = "#f1ddb4";
      for (let offset = 2; offset <= 18; offset += 6) {
        context.fillRect(x + 1, screenY + offset + 1, 5, 1);
        context.fillRect(x + 1, screenY + offset + 4, 5, 1);
      }
    }
  }

  function drawBannerPole(context, screenX, screenY, bannerColor) {
    context.fillStyle = "#7b5b35";
    context.fillRect(screenX + 6, screenY + 2, 3, 24);
    context.fillStyle = "#fff4a3";
    context.fillRect(screenX + 5, screenY, 5, 4);
    context.fillStyle = bannerColor;
    drawSoftRect(context, screenX + 9, screenY + 5, 10, 8, 3);
    context.fillStyle = "rgba(255,255,255,0.35)";
    context.fillRect(screenX + 10, screenY + 6, 6, 2);
  }

  function drawCrate(context, screenX, screenY, color) {
    context.fillStyle = "#7b5b35";
    context.fillRect(screenX, screenY, 15, 13);
    context.fillStyle = "#936942";
    context.fillRect(screenX + 1, screenY + 1, 13, 2);
    context.fillStyle = color;
    context.fillRect(screenX + 3, screenY + 2, 9, 7);
    context.fillStyle = "#5f4128";
    context.fillRect(screenX + 7, screenY + 1, 1, 11);
    context.fillRect(screenX + 1, screenY + 6, 13, 1);
    context.strokeStyle = "#4f3825";
    context.lineWidth = 1;
    context.strokeRect(screenX, screenY, 15, 13);
    context.strokeRect(screenX + 3, screenY + 2, 9, 7);
  }

  function drawBench(context, screenX, screenY) {
    context.fillStyle = "#7b5b35";
    context.fillRect(screenX + 2, screenY + 8, 28, 5);
    context.fillRect(screenX + 4, screenY + 15, 24, 5);
    context.fillStyle = "#4f3825";
    context.fillRect(screenX + 6, screenY + 20, 4, 10);
    context.fillRect(screenX + 22, screenY + 20, 4, 10);
    context.fillRect(screenX + 8, screenY + 12, 2, 4);
    context.fillRect(screenX + 20, screenY + 12, 2, 4);
    context.fillStyle = "#f5dba2";
    context.fillRect(screenX + 4, screenY + 9, 8, 2);
    context.fillRect(screenX + 14, screenY + 16, 8, 2);
    context.fillRect(screenX + 18, screenY + 9, 5, 2);
  }

  function drawMarketStall(context, screenX, screenY, color) {
    context.fillStyle = "#7b5b35";
    context.fillRect(screenX + 5, screenY + 14, 4, 24);
    context.fillRect(screenX + 30, screenY + 14, 4, 24);
    context.fillRect(screenX + 8, screenY + 30, 3, 7);
    context.fillRect(screenX + 27, screenY + 30, 3, 7);
    context.fillStyle = "#fffdf0";
    drawSoftRect(context, screenX + 2, screenY + 8, 36, 9, 3);
    context.fillStyle = color;
    for (let stripe = 0; stripe < 4; stripe += 1) {
      context.fillRect(screenX + 2 + stripe * 9, screenY + 8, 6, 9);
    }
    context.strokeStyle = "#35505f";
    context.lineWidth = 1;
    context.strokeRect(screenX + 2, screenY + 8, 36, 9);
    context.fillStyle = "#d4b37a";
    context.fillRect(screenX + 8, screenY + 28, 24, 10);
    context.fillStyle = "#f5e8bc";
    context.fillRect(screenX + 10, screenY + 30, 20, 2);
    context.fillStyle = "#ff7aa8";
    context.fillRect(screenX + 11, screenY + 25, 5, 5);
    context.fillStyle = "#fff4a3";
    context.fillRect(screenX + 19, screenY + 24, 5, 5);
    context.fillStyle = "#78dd7a";
    context.fillRect(screenX + 26, screenY + 26, 5, 5);
    context.fillStyle = "#35505f";
    context.fillRect(screenX + 17, screenY + 18, 6, 2);
  }

  function drawSignpost(context, screenX, screenY, label) {
    context.fillStyle = "#7b5b35";
    context.fillRect(screenX + 14, screenY + 18, 5, 24);
    context.fillRect(screenX + 12, screenY + 38, 9, 3);
    context.fillStyle = "#fffdf0";
    context.strokeStyle = "#35505f";
    context.lineWidth = 2;
    drawSoftRect(context, screenX, screenY + 4, 34, 18, 5);
    context.fillStyle = "#f5e8bc";
    context.fillRect(screenX + 3, screenY + 7, 28, 3);
    context.fillStyle = "#35505f";
    context.font = "800 8px JetBrains Mono, monospace";
    context.textAlign = "center";
    context.fillText(label, screenX + 17, screenY + 16);
  }

  function drawConnectedBlob(context, screenX, screenY, tileSize, neighbors, variant, baseColor, edgeColor, detailColor) {
    const inset = Math.max(0, Math.round(tileSize * 0.08));
    const lip = Math.max(2, Math.round(tileSize * 0.14));
    const corner = Math.max(4, Math.round(tileSize * 0.28));
    const innerX = screenX + inset;
    const innerY = screenY + inset;
    const innerSize = tileSize - inset * 2;

    context.fillStyle = baseColor;
    context.strokeStyle = edgeColor;
    context.lineWidth = 1;
    drawSoftRect(context, innerX, innerY, innerSize, innerSize, corner);

    context.fillStyle = edgeColor;
    if (neighbors.north) context.fillRect(innerX + corner, screenY, innerSize - corner * 2, inset + lip);
    if (neighbors.south) context.fillRect(innerX + corner, screenY + tileSize - inset - lip, innerSize - corner * 2, inset + lip);
    if (neighbors.west) context.fillRect(screenX, innerY + corner, inset + lip, innerSize - corner * 2);
    if (neighbors.east) context.fillRect(screenX + tileSize - inset - lip, innerY + corner, inset + lip, innerSize - corner * 2);

    if (neighbors.north && neighbors.west) context.fillRect(screenX, screenY, corner + inset, corner + inset);
    if (neighbors.north && neighbors.east) context.fillRect(screenX + tileSize - corner - inset, screenY, corner + inset, corner + inset);
    if (neighbors.south && neighbors.west) context.fillRect(screenX, screenY + tileSize - corner - inset, corner + inset, corner + inset);
    if (neighbors.south && neighbors.east) context.fillRect(screenX + tileSize - corner - inset, screenY + tileSize - corner - inset, corner + inset, corner + inset);

    context.fillStyle = detailColor;
    context.fillRect(screenX + Math.round(tileSize * (0.14 + variant.a * 0.015)), screenY + Math.round(tileSize * (0.22 + variant.b * 0.01)), Math.round(tileSize * 0.22), Math.max(2, Math.round(tileSize * 0.08)));
    context.fillRect(screenX + Math.round(tileSize * (0.46 + (variant.c % 3) * 0.03)), screenY + Math.round(tileSize * (0.42 + (variant.a % 2) * 0.03)), Math.round(tileSize * 0.18), Math.max(2, Math.round(tileSize * 0.08)));
    context.fillRect(screenX + Math.round(tileSize * (0.24 + (variant.b % 3) * 0.02)), screenY + Math.round(tileSize * (0.64 - (variant.c % 2) * 0.03)), Math.round(tileSize * 0.26), Math.max(2, Math.round(tileSize * 0.08)));
  }

  function drawMountainTile(context, screenX, screenY, tileSize, neighbors, variant) {
    drawConnectedBlob(context, screenX, screenY, tileSize, neighbors, variant, "#727b88", "#5f6772", "#8e96a3");

    context.fillStyle = variant.a % 2 === 0 ? "#89929e" : "#7b8592";
    if (variant.d <= 1) {
      context.fillRect(screenX + Math.round(tileSize * 0.14), screenY + Math.round(tileSize * (0.28 + variant.b * 0.006)), Math.round(tileSize * 0.14), Math.round(tileSize * 0.16));
      context.fillRect(screenX + Math.round(tileSize * (0.58 + variant.e * 0.008)), screenY + Math.round(tileSize * 0.52), Math.round(tileSize * 0.12), Math.round(tileSize * 0.14));
    } else if (variant.d <= 3) {
      context.fillRect(screenX + Math.round(tileSize * 0.18), screenY + Math.round(tileSize * 0.34), Math.round(tileSize * 0.08), Math.round(tileSize * 0.22));
      context.fillRect(screenX + Math.round(tileSize * 0.48), screenY + Math.round(tileSize * (0.24 + variant.f * 0.004)), Math.round(tileSize * 0.16), Math.round(tileSize * 0.12));
      context.fillRect(screenX + Math.round(tileSize * 0.66), screenY + Math.round(tileSize * 0.58), Math.round(tileSize * 0.08), Math.round(tileSize * 0.1));
    } else {
      context.fillRect(screenX + Math.round(tileSize * 0.2), screenY + Math.round(tileSize * 0.3), Math.round(tileSize * 0.1), Math.round(tileSize * 0.1));
      context.fillRect(screenX + Math.round(tileSize * 0.36), screenY + Math.round(tileSize * 0.48), Math.round(tileSize * 0.2), Math.round(tileSize * 0.08));
      context.fillRect(screenX + Math.round(tileSize * 0.62), screenY + Math.round(tileSize * 0.24), Math.round(tileSize * 0.08), Math.round(tileSize * 0.18));
    }

    context.fillStyle = "#dce5f4";
    if (!neighbors.north) {
      context.fillRect(screenX + Math.round(tileSize * (0.24 + variant.a * 0.01)), screenY + Math.round(tileSize * 0.08), Math.round(tileSize * 0.18), Math.max(2, Math.round(tileSize * 0.08)));
      context.fillRect(screenX + Math.round(tileSize * (0.56 + (variant.c % 3) * 0.01)), screenY + Math.round(tileSize * 0.16), Math.round(tileSize * 0.16), Math.max(2, Math.round(tileSize * 0.08)));
    }
    if (variant.e % 2 === 0) {
      context.fillRect(screenX + Math.round(tileSize * (0.38 + variant.b * 0.005)), screenY + Math.round(tileSize * 0.54), Math.round(tileSize * 0.1), Math.max(2, Math.round(tileSize * 0.08)));
    } else {
      context.fillRect(screenX + Math.round(tileSize * 0.52), screenY + Math.round(tileSize * 0.42), Math.round(tileSize * 0.08), Math.max(2, Math.round(tileSize * 0.08)));
      context.fillRect(screenX + Math.round(tileSize * 0.3), screenY + Math.round(tileSize * 0.64), Math.round(tileSize * 0.08), Math.max(2, Math.round(tileSize * 0.08)));
    }

    const featureType = (variant.a + variant.c + variant.f) % 6;

    if (featureType === 0) {
      context.fillStyle = "#5a8b56";
      context.fillRect(screenX + Math.round(tileSize * 0.24), screenY + Math.round(tileSize * 0.58), 2, Math.round(tileSize * 0.12));
      context.fillRect(screenX + Math.round(tileSize * 0.3), screenY + Math.round(tileSize * 0.54), 2, Math.round(tileSize * 0.16));
      context.fillRect(screenX + Math.round(tileSize * 0.36), screenY + Math.round(tileSize * 0.6), 2, Math.round(tileSize * 0.1));
      context.fillStyle = "#8fcd7c";
      context.fillRect(screenX + Math.round(tileSize * 0.22), screenY + Math.round(tileSize * 0.56), 5, 2);
      context.fillRect(screenX + Math.round(tileSize * 0.29), screenY + Math.round(tileSize * 0.52), 5, 2);
    } else if (featureType === 1) {
      context.fillStyle = "#b8ecff";
      context.fillRect(screenX + Math.round(tileSize * 0.62), screenY + Math.round(tileSize * 0.34), 3, 3);
      context.fillRect(screenX + Math.round(tileSize * 0.68), screenY + Math.round(tileSize * 0.4), 2, 2);
      context.fillStyle = "#fff6b8";
      context.fillRect(screenX + Math.round(tileSize * 0.64), screenY + Math.round(tileSize * 0.36), 1, 1);
    } else if (featureType === 2) {
      context.fillStyle = "#505861";
      context.fillRect(screenX + Math.round(tileSize * 0.28), screenY + Math.round(tileSize * 0.3), Math.round(tileSize * 0.08), 2);
      context.fillRect(screenX + Math.round(tileSize * 0.34), screenY + Math.round(tileSize * 0.38), 2, Math.round(tileSize * 0.14));
      context.fillRect(screenX + Math.round(tileSize * 0.38), screenY + Math.round(tileSize * 0.5), Math.round(tileSize * 0.08), 2);
    } else if (featureType === 3) {
      context.fillStyle = "#2f3942";
      context.fillRect(screenX + Math.round(tileSize * 0.56), screenY + Math.round(tileSize * 0.18), 4, 1);
      context.fillRect(screenX + Math.round(tileSize * 0.54), screenY + Math.round(tileSize * 0.2), 2, 1);
      context.fillRect(screenX + Math.round(tileSize * 0.62), screenY + Math.round(tileSize * 0.2), 2, 1);
    }
  }

  function drawWaterTile(context, screenX, screenY, tileSize, neighbors, variant, deepColor, lightColor, foamColor) {
    const corner = Math.max(5, Math.round(tileSize * 0.32));
    context.fillStyle = deepColor;
    context.strokeStyle = "rgba(255,255,255,0)";
    drawSoftRect(context, screenX, screenY, tileSize, tileSize, corner);

    context.fillRect(screenX + corner, screenY, tileSize - corner * 2, tileSize);
    context.fillRect(screenX, screenY + corner, tileSize, tileSize - corner * 2);

    if (neighbors.north) context.fillRect(screenX + corner, screenY, tileSize - corner * 2, corner);
    if (neighbors.south) context.fillRect(screenX + corner, screenY + tileSize - corner, tileSize - corner * 2, corner);
    if (neighbors.west) context.fillRect(screenX, screenY + corner, corner, tileSize - corner * 2);
    if (neighbors.east) context.fillRect(screenX + tileSize - corner, screenY + corner, corner, tileSize - corner * 2);

    if (neighbors.north && neighbors.west) context.fillRect(screenX, screenY, corner, corner);
    if (neighbors.north && neighbors.east) context.fillRect(screenX + tileSize - corner, screenY, corner, corner);
    if (neighbors.south && neighbors.west) context.fillRect(screenX, screenY + tileSize - corner, corner, corner);
    if (neighbors.south && neighbors.east) context.fillRect(screenX + tileSize - corner, screenY + tileSize - corner, corner, corner);

    context.fillStyle = lightColor;
    if (variant.d <= 1) {
      context.fillRect(screenX + Math.round(tileSize * (0.08 + variant.a * 0.012)), screenY + Math.round(tileSize * (0.18 + (variant.b % 3) * 0.02)), Math.round(tileSize * 0.54), Math.max(2, Math.round(tileSize * 0.08)));
      context.fillRect(screenX + Math.round(tileSize * 0.28), screenY + Math.round(tileSize * (0.5 + (variant.c % 2) * 0.02)), Math.round(tileSize * 0.36), Math.max(2, Math.round(tileSize * 0.08)));
    } else if (variant.d <= 3) {
      context.fillRect(screenX + Math.round(tileSize * 0.12), screenY + Math.round(tileSize * (0.26 + (variant.e % 2) * 0.03)), Math.round(tileSize * 0.3), Math.max(2, Math.round(tileSize * 0.08)));
      context.fillRect(screenX + Math.round(tileSize * 0.46), screenY + Math.round(tileSize * (0.18 + (variant.f % 3) * 0.025)), Math.round(tileSize * 0.22), Math.max(2, Math.round(tileSize * 0.08)));
      context.fillRect(screenX + Math.round(tileSize * 0.24), screenY + Math.round(tileSize * 0.66), Math.round(tileSize * 0.32), Math.max(1, Math.round(tileSize * 0.06)));
    } else {
      context.fillRect(screenX + Math.round(tileSize * 0.14), screenY + Math.round(tileSize * 0.2), Math.round(tileSize * 0.2), Math.max(2, Math.round(tileSize * 0.08)));
      context.fillRect(screenX + Math.round(tileSize * 0.38), screenY + Math.round(tileSize * 0.4), Math.round(tileSize * 0.28), Math.max(2, Math.round(tileSize * 0.08)));
      context.fillRect(screenX + Math.round(tileSize * 0.18), screenY + Math.round(tileSize * 0.7), Math.round(tileSize * 0.18), Math.max(1, Math.round(tileSize * 0.06)));
      context.fillRect(screenX + Math.round(tileSize * 0.62), screenY + Math.round(tileSize * 0.22), Math.round(tileSize * 0.1), Math.max(1, Math.round(tileSize * 0.05)));
    }

    context.fillStyle = variant.a % 2 === 0 ? "#74d8fb" : "#65c9f2";
    if (variant.e <= 2) {
      context.fillRect(screenX + Math.round(tileSize * (0.52 - (variant.b % 3) * 0.03)), screenY + Math.round(tileSize * (0.26 + (variant.a % 2) * 0.04)), Math.round(tileSize * 0.14), Math.max(1, Math.round(tileSize * 0.06)));
    } else if (variant.e <= 4) {
      context.fillRect(screenX + Math.round(tileSize * 0.2), screenY + Math.round(tileSize * 0.52), Math.round(tileSize * 0.12), Math.max(1, Math.round(tileSize * 0.06)));
      context.fillRect(screenX + Math.round(tileSize * 0.62), screenY + Math.round(tileSize * 0.6), Math.round(tileSize * 0.1), Math.max(1, Math.round(tileSize * 0.05)));
    } else {
      context.fillRect(screenX + Math.round(tileSize * 0.34), screenY + Math.round(tileSize * 0.3), Math.round(tileSize * 0.08), Math.max(1, Math.round(tileSize * 0.05)));
      context.fillRect(screenX + Math.round(tileSize * 0.58), screenY + Math.round(tileSize * 0.48), Math.round(tileSize * 0.14), Math.max(1, Math.round(tileSize * 0.06)));
    }

    context.fillStyle = foamColor;
    if (!neighbors.north) {
      context.fillRect(screenX + Math.round(tileSize * (0.14 + (variant.a % 2) * 0.03)), screenY + Math.round(tileSize * 0.08), Math.round(tileSize * 0.18), Math.max(2, Math.round(tileSize * 0.08)));
      context.fillRect(screenX + Math.round(tileSize * (0.42 + (variant.e % 2) * 0.04)), screenY + Math.round(tileSize * 0.1), Math.round(tileSize * 0.14), Math.max(1, Math.round(tileSize * 0.06)));
    }
    if (!neighbors.west) {
      context.fillRect(screenX + Math.round(tileSize * 0.08), screenY + Math.round(tileSize * (0.28 + (variant.b % 2) * 0.04)), Math.max(2, Math.round(tileSize * 0.08)), Math.round(tileSize * 0.12));
      context.fillRect(screenX + Math.round(tileSize * 0.1), screenY + Math.round(tileSize * (0.56 + (variant.f % 2) * 0.03)), Math.max(1, Math.round(tileSize * 0.06)), Math.round(tileSize * 0.1));
    }

    const featureType = (variant.d + variant.e + variant.f) % 6;

    if (featureType === 0) {
      context.fillStyle = "#73d26f";
      drawSoftRect(
        context,
        screenX + Math.round(tileSize * 0.22),
        screenY + Math.round(tileSize * 0.42),
        Math.round(tileSize * 0.18),
        Math.round(tileSize * 0.12),
        6,
      );
      context.fillRect(screenX + Math.round(tileSize * 0.28), screenY + Math.round(tileSize * 0.38), Math.round(tileSize * 0.12), 2);
      context.fillStyle = "#ffd6f2";
      context.fillRect(screenX + Math.round(tileSize * 0.29), screenY + Math.round(tileSize * 0.44), 2, 2);
      context.fillRect(screenX + Math.round(tileSize * 0.33), screenY + Math.round(tileSize * 0.46), 2, 2);
    } else if (featureType === 1) {
      context.fillStyle = "#5fb65d";
      context.fillRect(screenX + Math.round(tileSize * 0.7), screenY + Math.round(tileSize * 0.5), 2, Math.round(tileSize * 0.18));
      context.fillRect(screenX + Math.round(tileSize * 0.76), screenY + Math.round(tileSize * 0.44), 2, Math.round(tileSize * 0.24));
      context.fillStyle = "#a4ef91";
      context.fillRect(screenX + Math.round(tileSize * 0.68), screenY + Math.round(tileSize * 0.48), 4, 2);
      context.fillRect(screenX + Math.round(tileSize * 0.74), screenY + Math.round(tileSize * 0.42), 4, 2);
    } else if (featureType === 2) {
      context.fillStyle = "rgba(236, 252, 255, 0.9)";
      context.fillRect(screenX + Math.round(tileSize * 0.24), screenY + Math.round(tileSize * 0.58), Math.round(tileSize * 0.16), 2);
      context.fillRect(screenX + Math.round(tileSize * 0.54), screenY + Math.round(tileSize * 0.34), Math.round(tileSize * 0.12), 2);
      context.fillRect(screenX + Math.round(tileSize * 0.58), screenY + Math.round(tileSize * 0.38), Math.round(tileSize * 0.08), 1);
    } else if (featureType === 3) {
      context.fillStyle = "#ffd8a6";
      context.fillRect(screenX + Math.round(tileSize * 0.56), screenY + Math.round(tileSize * 0.58), Math.round(tileSize * 0.12), Math.round(tileSize * 0.06));
      context.fillRect(screenX + Math.round(tileSize * 0.66), screenY + Math.round(tileSize * 0.56), Math.round(tileSize * 0.06), Math.round(tileSize * 0.1));
      context.fillStyle = "#fff5d8";
      context.fillRect(screenX + Math.round(tileSize * 0.58), screenY + Math.round(tileSize * 0.6), 2, 2);
    }
  }

  function drawRiverTile(context, screenX, screenY, tileSize, neighbors, variant) {
    drawWaterTile(context, screenX, screenY, tileSize, neighbors, variant, "#4eace8", "#bdefff", "#e8fbff");
  }

  function drawLakeTile(context, screenX, screenY, tileSize, neighbors, variant) {
    drawWaterTile(context, screenX, screenY, tileSize, neighbors, variant, "#418fd8", "#94ddff", "#d9f7ff");
  }

  function drawCrossingTile(context, screenX, screenY, tileSize, type, neighbors, variant) {
    if (type === "bridge") {
      drawRiverTile(context, screenX, screenY, tileSize, neighbors, variant);
      context.fillStyle = "#8a613c";
      context.fillRect(screenX + Math.round(tileSize * 0.18), screenY, Math.round(tileSize * 0.64), tileSize);
      context.fillStyle = "#c79b58";
      const plankHeight = Math.max(4, Math.round(tileSize * 0.2));
      for (let plank = 0; plank < 4; plank += 1) {
        context.fillRect(screenX + Math.round(tileSize * 0.24), screenY + 1 + plank * Math.round(tileSize * 0.24), Math.round(tileSize * 0.5), plankHeight);
      }
      context.fillStyle = "#5e4025";
      context.fillRect(screenX + Math.round(tileSize * 0.2), screenY + 1, Math.max(2, Math.round(tileSize * 0.08)), tileSize - 2);
      context.fillRect(screenX + Math.round(tileSize * 0.7), screenY + 1, Math.max(2, Math.round(tileSize * 0.08)), tileSize - 2);
    } else if (type === "stones") {
      drawRiverTile(context, screenX, screenY, tileSize, neighbors, variant);
      context.fillStyle = "#f4e7b8";
      drawSoftRect(context, screenX + Math.round(tileSize * 0.16), screenY + Math.round(tileSize * 0.52), Math.round(tileSize * 0.18), Math.round(tileSize * 0.16), 3);
      drawSoftRect(context, screenX + Math.round(tileSize * 0.42), screenY + Math.round(tileSize * 0.28), Math.round(tileSize * 0.2), Math.round(tileSize * 0.16), 3);
      drawSoftRect(context, screenX + Math.round(tileSize * 0.68), screenY + Math.round(tileSize * 0.56), Math.round(tileSize * 0.16), Math.round(tileSize * 0.16), 3);
    } else if (type === "causeway") {
      drawLakeTile(context, screenX, screenY, tileSize, neighbors, variant);
      context.fillStyle = "#e8d39a";
      context.fillRect(screenX + Math.round(tileSize * 0.24), screenY, Math.round(tileSize * 0.52), tileSize);
      context.fillStyle = "#d2b876";
      context.fillRect(screenX + Math.round(tileSize * 0.34), screenY + Math.round(tileSize * 0.18), Math.round(tileSize * 0.32), Math.max(2, Math.round(tileSize * 0.1)));
      context.fillRect(screenX + Math.round(tileSize * 0.34), screenY + Math.round(tileSize * 0.56), Math.round(tileSize * 0.32), Math.max(2, Math.round(tileSize * 0.1)));
    } else if (type === "pass") {
      context.fillStyle = "#ccb989";
      context.fillRect(screenX, screenY, tileSize, tileSize);
      context.fillStyle = "#e8d39a";
      context.fillRect(screenX + Math.round(tileSize * 0.16), screenY + Math.round(tileSize * 0.16), Math.round(tileSize * 0.68), Math.round(tileSize * 0.68));
      context.fillStyle = "#d2b876";
      context.fillRect(screenX + Math.round(tileSize * 0.3), screenY + Math.round(tileSize * 0.38), Math.round(tileSize * 0.42), Math.max(2, Math.round(tileSize * 0.1)));
    }
  }

  function drawHeart(context, screenX, screenY, color) {
    context.fillStyle = color;
    context.fillRect(screenX + 2, screenY, 4, 4);
    context.fillRect(screenX + 8, screenY, 4, 4);
    context.fillRect(screenX, screenY + 4, 14, 5);
    context.fillRect(screenX + 2, screenY + 9, 10, 4);
    context.fillRect(screenX + 5, screenY + 13, 4, 3);
    context.fillStyle = "rgba(255, 255, 255, 0.7)";
    context.fillRect(screenX + 3, screenY + 2, 2, 2);
  }

  function drawMiniBanner(context, x, y, widthPx, color) {
    const stripeWidth = Math.max(8, Math.floor(widthPx / 8));
    for (let stripe = 0; stripe < Math.ceil(widthPx / stripeWidth); stripe += 1) {
      context.fillStyle = stripe % 2 === 0 ? color : "#fffdf0";
      context.fillRect(x + stripe * stripeWidth, y, stripeWidth, 8);
    }
    context.strokeStyle = "#35505f";
    context.lineWidth = 1;
    context.strokeRect(x, y, widthPx, 8);
  }

  function drawSoftRect(context, x, y, width, height, radius) {
    const curve = Math.min(radius, width / 2, height / 2);

    context.beginPath();
    context.moveTo(x + curve, y);
    context.lineTo(x + width - curve, y);
    context.quadraticCurveTo(x + width, y, x + width, y + curve);
    context.lineTo(x + width, y + height - curve);
    context.quadraticCurveTo(x + width, y + height, x + width - curve, y + height);
    context.lineTo(x + curve, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - curve);
    context.lineTo(x, y + curve);
    context.quadraticCurveTo(x, y, x + curve, y);
    context.closePath();
    context.fill();
    context.stroke();
  }

  function drawHudBar(context, x, y, label, valueText, percent, fillColor, options = {}) {
    const safePercent = Math.max(0, Math.min(1, percent));
    const barWidth = 150;
    const barHeight = 18;
    const flashPercent = Math.max(0, Math.min(1, options.flashPercent ?? safePercent));
    const armorPercent = Math.max(0, Math.min(1, options.armorPercent ?? safePercent));
    const flashColor = options.flashColor ?? "rgba(255,255,255,0.22)";

    context.fillStyle = "#fffdf0";
    context.strokeStyle = "#253052";
    context.lineWidth = 2;
    drawSoftRect(context, x, y, 220, 34, 8);
    context.fillStyle = "#253052";
    context.font = "800 13px JetBrains Mono, monospace";
    context.textAlign = "left";
    context.fillText(label, x + 10, y + 22);

    context.fillStyle = "#d1d9e6";
    context.fillRect(x + 50, y + 8, barWidth, barHeight);
    context.fillStyle = flashColor;
    context.fillRect(x + 53, y + 11, Math.round((barWidth - 6) * flashPercent), barHeight - 6);
    context.fillStyle = fillColor;
    context.fillRect(x + 53, y + 11, Math.round((barWidth - 6) * safePercent), barHeight - 6);
    context.fillStyle = "rgba(255, 255, 255, 0.55)";
    context.fillRect(x + 53, y + 11, Math.round((barWidth - 6) * safePercent), 3);
    if (options.showArmorLine) {
      const armorX = x + 53 + Math.round((barWidth - 6) * armorPercent);
      context.fillStyle = "#68b9ff";
      context.fillRect(armorX - 1, y + 9, 3, barHeight - 2);
      context.fillStyle = "#dff4ff";
      context.fillRect(armorX, y + 10, 1, barHeight - 4);
    }
    context.strokeStyle = "#253052";
    context.strokeRect(x + 50, y + 8, barWidth, barHeight);

    context.fillStyle = "#253052";
    context.font = "700 11px JetBrains Mono, monospace";
    context.textAlign = "right";
    context.fillText(valueText, x + 214, y + 23);
  }

  function drawShopDetails(context, place, screenX, screenY, widthPx, heightPx) {
    const centerX = screenX + Math.floor(widthPx / 2);
    const baseY = screenY + heightPx;
    const wallY = screenY + 28;
    const titleY = Math.max(8, screenY - 22);
    const titleWidth = Math.min(widthPx + 38, 190);
    const titleX = centerX - Math.floor(titleWidth / 2);
    const roofTopY = screenY + 8;

    context.fillStyle = "rgba(53, 80, 95, 0.2)";
    context.fillRect(screenX + 8, baseY + 4, widthPx + 12, 10);
    context.fillStyle = "#c4a66f";
    context.strokeStyle = "#9a7645";
    context.lineWidth = 2;
    drawSoftRect(context, screenX - 4, baseY - 5, widthPx + 8, 10, 5);
    context.fillStyle = "#f5dba2";
    for (let step = 0; step < 4; step += 1) {
      context.fillRect(centerX - 20 + step * 10, baseY - 1 + step % 2, 8, 3);
    }

    context.fillStyle = "#fffdf0";
    context.strokeStyle = "#35505f";
    context.lineWidth = 3;
    drawSoftRect(context, titleX, titleY, titleWidth, 24, 10);
    context.fillStyle = "#ffffff";
    context.fillRect(titleX + 8, titleY + 6, 5, 5);
    context.fillRect(titleX + titleWidth - 13, titleY + 6, 5, 5);
    context.fillStyle = place.color;
    context.fillRect(titleX + 8, titleY + 5, titleWidth - 16, 4);
    context.fillStyle = "#253052";
    context.font = "900 13px JetBrains Mono, monospace";
    context.textAlign = "center";
    context.fillText(place.name.toUpperCase(), centerX, titleY + 18);

    context.fillStyle = "#ffeed0";
    context.strokeStyle = "#35505f";
    context.lineWidth = 3;
    drawSoftRect(context, screenX, wallY, widthPx, heightPx - 28, 14);
    context.fillStyle = "#fff8dc";
    context.strokeStyle = "rgba(53, 80, 95, 0.18)";
    context.lineWidth = 1;
    drawSoftRect(context, screenX + 7, wallY + 8, widthPx - 14, heightPx - 42, 10);

    context.fillStyle = "rgba(122, 91, 53, 0.18)";
    for (let brickY = wallY + 9; brickY < baseY - 5; brickY += 10) {
      for (let brickX = screenX + 7 + ((brickY / 10) % 2) * 8; brickX < screenX + widthPx - 10; brickX += 17) {
        context.fillRect(brickX, brickY, 9, 2);
      }
    }

    context.fillStyle = "#ffffff";
    context.strokeStyle = "rgba(53, 80, 95, 0.32)";
    drawSoftRect(context, screenX + 10, wallY + 7, 10, 10, 5);
    drawSoftRect(context, screenX + widthPx - 20, wallY + 7, 10, 10, 5);
    context.fillStyle = place.color;
    context.fillRect(screenX + 13, wallY + 10, 4, 4);
    context.fillRect(screenX + widthPx - 17, wallY + 10, 4, 4);

    context.fillStyle = place.color;
    context.strokeStyle = "#35505f";
    context.lineWidth = 3;
    drawSoftRect(context, screenX - 10, roofTopY, widthPx + 20, 22, 12);
    context.fillStyle = "#fffdf0";
    context.strokeStyle = "#35505f";
    context.lineWidth = 2;
    drawSoftRect(context, screenX - 3, roofTopY - 8, widthPx + 6, 9, 5);
    context.fillStyle = place.color;
    for (let bump = 0; bump < 5; bump += 1) {
      context.strokeStyle = "#35505f";
      context.lineWidth = 1;
      drawSoftRect(context, screenX + 5 + bump * 17, roofTopY - 13 + (bump % 2), 10, 10, 5);
    }
    context.fillStyle = "rgba(255, 255, 255, 0.38)";
    context.fillRect(screenX - 3, roofTopY + 4, widthPx + 6, 4);
    drawMiniBanner(context, screenX - 4, screenY + 25, widthPx + 8, place.color);

    context.fillStyle = "#fffdf0";
    context.strokeStyle = "#35505f";
    context.lineWidth = 2;
    drawSoftRect(context, centerX - 42, screenY + 10, 84, 15, 7);
    context.fillStyle = "#253052";
    context.font = "900 10px JetBrains Mono, monospace";
    context.fillText(place.sign, centerX, screenY + 21);

    const windowY = wallY + 13;
    const leftWindowX = screenX + 8;
    const rightWindowX = screenX + widthPx - 28;
    [leftWindowX, rightWindowX].forEach((windowX) => {
      context.fillStyle = "#ffffff";
      context.strokeStyle = "#35505f";
      context.lineWidth = 2;
      drawSoftRect(context, windowX - 2, windowY - 2, 24, 18, 6);
      context.fillStyle = "#8fd7ff";
      context.strokeStyle = "rgba(53, 80, 95, 0)";
      drawSoftRect(context, windowX, windowY, 20, 14, 4);
      context.fillStyle = "#d9f7ff";
      context.fillRect(windowX + 3, windowY + 2, 8, 3);
      context.fillStyle = "#35505f";
      context.fillRect(windowX + 9, windowY, 2, 14);
      context.fillRect(windowX, windowY + 6, 20, 2);
    });

    context.fillStyle = "#6b4a2e";
    context.strokeStyle = "#35505f";
    context.lineWidth = 2;
    drawSoftRect(context, centerX - 10, baseY - 34, 20, 34, 8);
    context.fillStyle = "#8a613c";
    context.strokeStyle = "rgba(53, 80, 95, 0)";
    drawSoftRect(context, centerX - 6, baseY - 29, 12, 29, 5);
    context.fillStyle = "#fff4a3";
    context.fillRect(centerX + 3, baseY - 16, 2, 2);
    context.fillStyle = "#d4b37a";
    context.fillRect(centerX - 14, baseY - 1, 28, 5);

    drawPlanter(context, screenX + 2, baseY - 22, "#ff7aa8");
    drawPlanter(context, screenX + widthPx - 26, baseY - 22, "#fff4a3");
    drawHeart(context, centerX - 7, baseY - 48, place.kind === "armor" ? "#82b8ff" : "#ff7aa8");

    if (place.kind === "weapon") {
      context.fillStyle = "#5b6d7e";
      context.fillRect(screenX - 14, baseY - 42, 5, 30);
      context.fillRect(screenX - 20, baseY - 17, 17, 5);
      context.fillStyle = "#d8ffe4";
      context.fillRect(screenX - 13, baseY - 49, 3, 17);
      context.fillStyle = "#ff7aa8";
      context.fillRect(screenX - 17, baseY - 36, 11, 4);
      context.fillStyle = "#ff7aa8";
      context.fillRect(screenX + widthPx + 9, baseY - 47, 3, 20);
      context.fillStyle = "#5b6d7e";
      context.fillRect(screenX + widthPx + 8, baseY - 30, 5, 18);
      context.fillRect(screenX + widthPx + 2, baseY - 17, 17, 5);
    }

    if (place.kind === "armor") {
      context.fillStyle = "#35505f";
      context.fillRect(screenX - 15, baseY - 42, 3, 32);
      context.fillRect(screenX + widthPx + 12, baseY - 42, 3, 32);
      context.fillStyle = "#cfe8ff";
      context.fillRect(screenX - 23, baseY - 36, 18, 24);
      context.fillStyle = "#82b8ff";
      context.fillRect(screenX - 18, baseY - 31, 8, 15);
      context.fillStyle = "#cfe8ff";
      context.fillRect(screenX + widthPx + 5, baseY - 36, 18, 24);
      context.fillStyle = "#82b8ff";
      context.fillRect(screenX + widthPx + 10, baseY - 31, 8, 15);
    }

    if (place.kind === "supply") {
      drawCrate(context, screenX - 19, baseY - 24, "#ff7aa8");
      drawCrate(context, screenX + widthPx + 4, baseY - 24, "#78dd7a");
      context.fillStyle = "#ff7aa8";
      context.fillRect(screenX - 15, baseY - 31, 6, 6);
      context.fillStyle = "#fff4a3";
      context.fillRect(screenX - 9, baseY - 33, 6, 6);
      context.fillStyle = "#78dd7a";
      context.fillRect(screenX + widthPx + 9, baseY - 32, 6, 6);
      context.fillStyle = "#fff4a3";
      context.fillRect(screenX + widthPx + 15, baseY - 30, 6, 6);
    }

    if (place.kind === "upgrade") {
      context.fillStyle = "#fff4a3";
      context.fillRect(screenX - 17, baseY - 43, 12, 31);
      context.fillStyle = "#c49cff";
      context.fillRect(screenX - 13, baseY - 36, 4, 17);
      context.fillStyle = "#ffffff";
      context.fillRect(screenX - 14, baseY - 47, 6, 4);
      context.fillStyle = "#fff4a3";
      context.fillRect(screenX + widthPx + 5, baseY - 43, 12, 31);
      context.fillStyle = "#c49cff";
      context.fillRect(screenX + widthPx + 9, baseY - 36, 4, 17);
      context.fillStyle = "#ffffff";
      context.fillRect(screenX + widthPx + 8, baseY - 47, 6, 4);
    }

    if (place.kind === "artifact") {
      context.fillStyle = "#fff4a3";
      context.fillRect(screenX - 15, baseY - 44, 10, 28);
      context.fillRect(screenX - 22, baseY - 36, 24, 9);
      context.fillStyle = "#ff7aa8";
      context.fillRect(screenX - 12, baseY - 47, 4, 4);
      context.fillStyle = "#fff4a3";
      context.fillRect(screenX + widthPx + 6, baseY - 42, 9, 25);
      context.fillRect(screenX + widthPx, baseY - 35, 22, 8);
      context.fillStyle = "#ff7aa8";
      context.fillRect(screenX + widthPx + 8, baseY - 45, 4, 4);
    }

    if (place.kind === "quest") {
      context.fillStyle = "#7b5b35";
      context.fillRect(screenX - 15, baseY - 42, 4, 32);
      context.fillRect(screenX + widthPx + 11, baseY - 42, 4, 32);
      context.fillStyle = "#fff8dc";
      context.fillRect(screenX - 23, baseY - 45, 20, 21);
      context.fillRect(screenX + widthPx + 3, baseY - 45, 20, 21);
      context.fillStyle = "#35505f";
      context.fillRect(screenX - 19, baseY - 39, 12, 2);
      context.fillRect(screenX - 19, baseY - 33, 14, 2);
      context.fillRect(screenX + widthPx + 7, baseY - 39, 12, 2);
      context.fillRect(screenX + widthPx + 7, baseY - 33, 14, 2);
    }
  }

  const defaultState = () => ({
    level: 1,
    xp: 0,
    totalXp: 0,
    hp: 100,
    maxHp: 100,
    attackBoost: 0,
    defenseBoost: 0,
    currentPath: "wastes",
    battles: 0,
    artifacts: [],
    world: createWorld(),
    weapon: cloneGear(weapons[0]),
    armor: cloneGear(armors[0]),
    inventory: [],
    monsters: [],
    enemy: null,
    log: ["Welcome to Neon Forge Kingdom. You arrived at the village center."],
  });

  let state = loadState();

  function loadState() {
    try {
      const saved = localStorage.getItem(saveKey);

      if (!saved) {
        return defaultState();
      }

      const hydrated = { ...defaultState(), ...JSON.parse(saved) };
      hydrated.monsters = Array.isArray(hydrated.monsters) ? hydrated.monsters.map(normalizeMonster).filter(Boolean) : [];
      return hydrated;
    } catch {
      return defaultState();
    }
  }

  function saveState() {
    try {
      localStorage.setItem(saveKey, JSON.stringify(state));
      elements.saveStatus.textContent = `SAVED ${new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } catch {
      elements.saveStatus.textContent = "SAVE BLOCKED";
    }
  }

  function addLog(message) {
    state.log = [message, ...state.log].slice(0, 7);
  }

  function gainXp(amount) {
    state.xp += amount;
    state.totalXp += amount;
    state.level = 1 + Math.floor(state.totalXp / 120);
  }

  function getGearValue(item) {
    const rarityValue = rarities[item.rarity]?.value ?? 15;
    const statValue = item.type === "weapon" ? item.attack * 2 : item.defense * 2;

    return rarityValue + statValue;
  }

  function getScaledEnemy() {
    const path = paths[state.currentPath];
    const name = path.enemies[randomBetween(0, path.enemies.length - 1)];
    const levelScale = Math.max(0, state.level - 1);

    return {
      name,
      path: path.name,
      hp: randomBetween(path.enemyHp[0], path.enemyHp[1]) + levelScale * 8,
      attack: randomBetween(path.enemyAttack[0], path.enemyAttack[1]) + levelScale * 3,
      xp: randomBetween(path.xp[0], path.xp[1]) + levelScale * 8,
    };
  }

  function rollGear(path) {
    const pool = Math.random() < path.weaponBias ? weapons : armors;
    const battleLift = Math.min(state.battles * 0.012, 0.18);
    const levelLift = Math.min(state.level * 0.018, 0.16);
    const roll = Math.random() + battleLift + levelLift;
    let rarity = "common";

    if (roll > 1.08) rarity = "legendary";
    else if (roll > 0.93) rarity = "epic";
    else if (roll > 0.76) rarity = "rare";
    else if (roll > 0.48) rarity = "uncommon";

    const rarityItems = pool.filter((item) => item.rarity === rarity);
    const fallbackItems = pool.filter((item) => item.rarity === "common");
    const choices = rarityItems.length ? rarityItems : fallbackItems;

    return cloneGear(choices[randomBetween(0, choices.length - 1)]);
  }

  function enterTile(tile) {
    const firstVisit = !tile.visited;
    tile.visited = true;

    if (paths[tile.type]) {
      state.currentPath = tile.type;
      state.enemy = getScaledEnemy();

      if (firstVisit) {
        addLog(`Arrived at ${tile.place}.`);
      }
    }

    if (tile.type === "supply" && firstVisit) {
      const repair = 18 + state.level * 3;
      state.hp = Math.min(state.maxHp, state.hp + repair);
      gainXp(8);
      tile.event = "quiet";
      addLog(`Visited ${tile.place}. Restored ${repair} HP and gained 8 XP.`);
    }

    if (tile.artifact && firstVisit) {
      state.artifacts = state.artifacts ?? [];
      state.artifacts.push(tile.artifact);
      gainXp(14);
      addLog(`Found artifact: ${tile.artifact}. Bonus 14 XP.`);
      tile.artifact = null;
    }

    if (tile.event === "challenge" && firstVisit && paths[tile.type]) {
      addLog(`A friendly challenge is waiting at ${tile.place}.`);
    }
  }

  function movePlayer(directionName) {
    const direction = movement[directionName];

    if (!direction) return;

    ensureWorldData();
    const nextX = state.world.x + direction.x;
    const nextY = state.world.y + direction.y;
    const blockedPlace = getVillagePlaceAt(nextX, nextY);
    const blockedTerrain = getTerrainBarrier(nextX, nextY);
    const blockedGarden = isVillageGardenBarrier(nextX, nextY);
    const blockedMonster = getMonsterAt(nextX, nextY);

    if (blockedPlace) {
      addLog(`${blockedPlace.name} is right here. Stand by the door to use it.`);
      saveAndRender();
      return;
    }

    if (blockedTerrain) {
      const barrierMessage = {
        river: "A river blocks the way. Find a bridge or stepping stones.",
        lake: "The lake is too deep here. Look for the causeway.",
        mountain: "Steep mountains block the path. Find the mountain pass.",
      };

      addLog(barrierMessage[blockedTerrain]);
      saveAndRender();
      return;
    }

    if (blockedGarden) {
      const gardenMessage = isFountainCoreTile(nextX, nextY)
        ? "The fountain sits in the middle. Follow the garden paths around it."
        : "Low garden fences keep you on the path through the hedges.";
      addLog(gardenMessage);
      saveAndRender();
      return;
    }

    if (blockedMonster) {
      addLog(`${blockedMonster.name} is in the way. Left click to swing your sword.`);
      saveAndRender();
      return;
    }

    state.world.x = nextX;
    state.world.y = nextY;
    state.world.px = state.world.x;
    state.world.py = state.world.y;
    state.world.steps += 1;

    const nearbyPlace = getNearbyVillagePlace();

    if (nearbyPlace) {
      addLog(`You are beside ${nearbyPlace.name}.`);
    }

    saveAndRender();
  }

  function enterNearbyPlace() {
    const nearbyPlace = getNearbyVillagePlace();

    if (!nearbyPlace) {
      addLog("No shop door nearby. Walk beside a shop, then press Space.");
      saveAndRender();
      return;
    }

    if (nearbyPlace.kind === "weapon") {
      addLog("Entered Sword Shop. Gear browsing is active, but shop battles are resting for now.");
    } else if (nearbyPlace.kind === "armor") {
      addLog("Entered Armor Shop. Armor styling is active, but arena trials are resting for now.");
    } else if (nearbyPlace.kind === "supply") {
      addLog("Entered Snack Shop. Snack healing is paused for now while passive regeneration handles recovery.");
    } else if (nearbyPlace.kind === "upgrade") {
      addLog("Entered Upgrade Hall. Choose an upgrade below to spend XP.");
      focusInventory();
    } else if (nearbyPlace.kind === "artifact") {
      const artifact = artifacts[randomBetween(0, artifacts.length - 1)];
      state.artifacts = state.artifacts ?? [];
      state.artifacts.push(artifact);
      gainXp(12);
      addLog(`Entered Artifact Booth. Found ${artifact} and gained 12 XP.`);
    } else if (nearbyPlace.kind === "quest") {
      addLog("Entered Quest Board. Quest battles are paused while the open-world zombie system is active.");
    }

    saveAndRender();
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      elements.worldPanel.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }

  function focusInventory() {
    if (elements.inventoryDrawer.hidden) {
      setInventoryVisible(true);
    }

    elements.inventoryDrawer.scrollIntoView({ behavior: "smooth", block: "nearest" });
    elements.inventoryDrawer.focus({ preventScroll: true });
  }

  function setInventoryVisible(isVisible) {
    elements.inventoryDrawer.hidden = !isVisible;
    elements.inventoryToggle.setAttribute("aria-expanded", String(isVisible));
    elements.inventoryToggle.textContent = isVisible ? "Hide Inventory" : "Show Inventory";
  }

  function toggleInventory() {
    setInventoryVisible(elements.inventoryDrawer.hidden);
  }

  function generateNewMap() {
    state.world = createWorld();
    state.currentPath = "wastes";
    state.enemy = getScaledEnemy();
    state.monsters = [];
    lastRegenAt = performance.now();
    addLog("You returned to the Village Center.");
    saveAndRender();
  }

  function fight() {
    if (!state.enemy) {
      state.enemy = getScaledEnemy();
    }

    const enemy = state.enemy;
    const playerPower = state.weapon.attack + state.attackBoost + state.level * 2;
    const playerDefense = state.armor.defense + state.defenseBoost;
    let enemyHp = enemy.hp;
    let rounds = 0;

    while (enemyHp > 0 && state.hp > 0 && rounds < 8) {
      enemyHp -= randomBetween(Math.max(4, playerPower - 3), playerPower + 8);

      if (enemyHp > 0) {
        state.hp -= Math.max(2, randomBetween(enemy.attack - 3, enemy.attack + 5) - playerDefense);
      }

      rounds += 1;
    }

    state.battles += 1;
    const currentTile = ensureTile(state.world.x, state.world.y);
    currentTile.event = "quiet";

    if (state.hp > 0 && enemyHp <= 0) {
      const path = paths[state.currentPath];
      gainXp(enemy.xp);
      addLog(`Won a friendly challenge with ${enemy.name}. Gained ${enemy.xp} XP.`);

      if (Math.random() < path.lootChance) {
        const loot = rollGear(path);
        state.inventory.push(loot);
        addLog(`Earned ${rarities[loot.rarity].label} ${loot.name}.`);
      }

      state.hp = Math.min(state.maxHp, state.hp + 8 + state.level * 2);
      state.enemy = getScaledEnemy();
    } else {
      const lostXp = Math.min(state.xp, 16 + state.level * 4);
      state.xp -= lostXp;
      state.hp = Math.ceil(state.maxHp * 0.55);
      addLog(`${enemy.name} won this round. Lost ${lostXp} XP and bounced back with partial HP.`);
      state.enemy = getScaledEnemy();
    }

    saveAndRender();
  }

  function rest() {
    const cost = 25;

    if (state.hp >= state.maxHp) {
      addLog("HP is already fully repaired.");
    } else if (state.xp < cost) {
      addLog(`Repair requires ${cost} XP.`);
    } else {
      state.xp -= cost;
      state.hp = state.maxHp;
      addLog(`Spent ${cost} XP to restore all HP.`);
    }

    saveAndRender();
  }

  function upgrade(type) {
    const cost = upgradeCosts[type];

    if (state.xp < cost) {
      addLog(`Upgrade requires ${cost} XP.`);
      saveAndRender();
      return;
    }

    state.xp -= cost;

    if (type === "health") {
      state.maxHp += 20;
      state.hp = state.maxHp;
      addLog("Core reinforced. Max HP increased by 20.");
    }

    if (type === "attack") {
      state.attackBoost += 3;
      addLog("Strike tuning complete. Attack increased by 3.");
    }

    if (type === "defense") {
      state.defenseBoost += 3;
      addLog("Plating hardened. Defense increased by 3.");
    }

    saveAndRender();
  }

  function equipItem(itemId) {
    const item = state.inventory.find((gear) => gear.id === itemId);

    if (!item) return;

    state.inventory = state.inventory.filter((gear) => gear.id !== itemId);

    if (item.type === "weapon") {
      state.inventory.push(state.weapon);
      state.weapon = item;
      addLog(`Equipped ${item.name}. Attack rating ${item.attack}.`);
    } else {
      state.inventory.push(state.armor);
      state.armor = item;
      addLog(`Equipped ${item.name}. Defense rating ${item.defense}.`);
    }

    saveAndRender();
  }

  function tradeItem(itemId) {
    const item = state.inventory.find((gear) => gear.id === itemId);

    if (!item) return;

    const value = getGearValue(item);
    state.inventory = state.inventory.filter((gear) => gear.id !== itemId);
    gainXp(value);
    addLog(`Traded ${item.name} for ${value} XP.`);
    saveAndRender();
  }

  function clearSave() {
    const confirmed = window.confirm("Clear all Neon Forge save data and restart?");

    if (!confirmed) return;

    localStorage.removeItem(saveKey);
    state = defaultState();
    state.enemy = getScaledEnemy();
    lastRegenAt = performance.now();
    syncHudTargets();
    addLog("All saved data cleared. New run initialized.");
    saveAndRender();
  }

  function renderGearCard(card, nameElement, detailsElement, item, rarityElement, statElement, valueElement) {
    const stat = item.type === "weapon" ? `Attack ${item.attack}` : `Defense ${item.defense}`;
    const rarityLabel = rarities[item.rarity].label;
    const tradeValue = getGearValue(item);

    card.dataset.rarity = item.rarity;
    card.dataset.type = item.type;
    nameElement.textContent = item.name;
    detailsElement.textContent = `${rarityLabel} ${item.type} ready for adventure`;
    if (rarityElement) {
      rarityElement.textContent = rarityLabel;
    }
    if (statElement) {
      statElement.textContent = stat;
    }
    if (valueElement) {
      valueElement.textContent = `Trade ${tradeValue} XP`;
    }
  }

  function renderInventory() {
    elements.inventory.innerHTML = "";

    if (!state.inventory.length) {
      const empty = document.createElement("p");
      empty.className = "inventory-empty";
      empty.textContent = "No spare gear yet. Explore farther from the plaza and defeat overworld zombies to earn better swords and armor.";
      elements.inventory.append(empty);
      return;
    }

    state.inventory.forEach((item) => {
      const row = document.createElement("article");
      const stat = item.type === "weapon" ? `Attack ${item.attack}` : `Defense ${item.defense}`;
      const value = getGearValue(item);
      const rarityLabel = rarities[item.rarity].label;
      const typeLabel = item.type === "weapon" ? "Sword" : "Armor";
      const artClass = item.type === "weapon" ? "inventory-art sword-art" : "inventory-art armor-art";

      row.className = "inventory-item";
      row.dataset.rarity = item.rarity;
      row.dataset.type = item.type;
      row.innerHTML = `
        <div class="inventory-item-shell">
          <div class="${artClass}" aria-hidden="true"></div>
          <div class="inventory-copy">
            <div class="inventory-copy-top">
              <p class="card-kicker">${typeLabel}</p>
              <span class="inventory-rarity-pill">${rarityLabel}</span>
            </div>
            <h3>${item.name}</h3>
            <div class="inventory-tags">
              <span class="inventory-tag">${stat}</span>
              <span class="inventory-tag inventory-tag-value">${value} XP</span>
            </div>
            <p class="inventory-caption">A bright little ${item.type === "weapon" ? "blade" : "armor set"} for your village adventures.</p>
          </div>
        </div>
        <div class="inventory-actions">
          <button class="button secondary" type="button" data-equip="${item.id}">Equip</button>
          <button class="button secondary" type="button" data-trade="${item.id}">Trade</button>
        </div>
      `;
      elements.inventory.append(row);
    });
  }

  function slashSword(clientX, clientY) {
    const now = performance.now();
    if (now - lastSlashAt < 230) return;

    const rect = elements.worldView.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(clientY - centerY, clientX - centerX);
    const reach = 2.3;
    const attackPower = state.weapon.attack + state.attackBoost + state.level * 2;
    const hits = [];

    lastSlashAt = now;
    slashEffect = { angle, until: now + 220 };
    ensureMonsterData();

    state.monsters.forEach((monster) => {
      if (monster.dead) return;

      const deltaX = monster.x - state.world.x;
      const deltaY = monster.y - state.world.y;
      const distance = Math.hypot(deltaX, deltaY);
      if (distance > reach) return;

      const monsterAngle = Math.atan2(deltaY, deltaX);
      let angleGap = Math.abs(monsterAngle - angle);
      if (angleGap > Math.PI) angleGap = Math.PI * 2 - angleGap;
      if (angleGap > Math.PI * 0.42 && distance > 0.75) return;

      const damage = randomBetween(Math.max(8, attackPower - 4), attackPower + 8);
      monster.hp -= damage;
      monster.mode = "aggro";
      hits.push({ monster, damage });

      if (monster.hp <= 0) {
        monster.dead = true;
        monster.respawnAt = now + 16000;
        monster.hp = 0;
        monster.x = monster.spawnX;
        monster.y = monster.spawnY;
        state.battles += 1;
        gainXp(monster.xp);
        addLog(`Defeated ${monster.name}. Gained ${monster.xp} XP.`);
      }
    });

    if (hits.length) {
      monsterStateNeedsSave = true;
    }

    if (!hits.length) {
      addLog("Your sword sliced the air.");
    } else {
      hits.forEach(({ monster, damage }) => {
        if (!monster.dead) {
          addLog(`Hit ${monster.name} for ${damage} damage.`);
        }
      });
    }

    saveAndRender();
  }

  function getArmorPalette(item) {
    const palettes = {
      "Puddle Cape": { chest: "#4f7cff", trim: "#fff4cf", helm: "#2c4e9b", cape: "#78b7ff" },
      "Button Vest": { chest: "#ffb25f", trim: "#fff4cf", helm: "#aa6b35", cape: "#ffd28c" },
      "Titan Toymail": { chest: "#6fb39f", trim: "#dbfff3", helm: "#477f72", cape: "#8ee0cc" },
      "Aegis Bubble Shell": { chest: "#73b6ff", trim: "#e9fbff", helm: "#4b77c8", cape: "#a8ddff" },
      "Prism Parade Suit": { chest: "#b985ff", trim: "#fff1d8", helm: "#6f46b6", cape: "#e0b5ff" },
      "Halo Hug Armor": { chest: "#ffe27b", trim: "#ffffff", helm: "#c89f2a", cape: "#fff6ba" },
    };

    return palettes[item?.name] ?? palettes["Puddle Cape"];
  }

  function getSwordPalette(item) {
    const palettes = {
      "Bubble Saber": { blade: "#d8fdff", glow: "#7fe0ff", hilt: "#5b78cc" },
      "Glowstick Blade": { blade: "#f4ffbf", glow: "#d6ff5f", hilt: "#5a6fa2" },
      "Sparkle Cutter": { blade: "#fff2f9", glow: "#ff9fd2", hilt: "#7a4fb8" },
      "Rainbow Rail Blade": { blade: "#fffdf4", glow: "#82b8ff", hilt: "#ff8a65" },
      "Starforged Katana": { blade: "#f4f4ff", glow: "#cbbdff", hilt: "#4f4a79" },
      "Wishlight Claymore": { blade: "#fff9d8", glow: "#ffe066", hilt: "#8a5a25" },
    };

    return palettes[item?.name] ?? palettes["Bubble Saber"];
  }

  function drawPlayer(context, centerX, centerY, tileSize, time) {
    const armorPalette = getArmorPalette(state.armor);
    const swordPalette = getSwordPalette(state.weapon);
    const healthRatio = state.maxHp > 0 ? state.hp / state.maxHp : 1;
    const damageStage = healthRatio < 0.28 ? 2 : healthRatio < 0.6 ? 1 : 0;
    const bob = Math.round(Math.sin(time / 190) * 1);
    const swingActive = slashEffect && slashEffect.until > time;
    const swingProgress = swingActive ? 1 - (slashEffect.until - time) / 220 : 0;
    const swordAngle = swingActive ? slashEffect.angle : -0.45;

    context.save();
    context.translate(centerX + 12, centerY + 12 + bob);
    context.fillStyle = "rgba(30, 37, 52, 0.18)";
    drawSoftRect(context, -10, 14, 20, 5, 3);
    context.fillStyle = "#ffd1a8";
    drawSoftRect(context, -8, -14, 16, 11, 5);
    context.fillStyle = "#253052";
    context.fillRect(-5, -10, 3, 3);
    context.fillRect(2, -10, 3, 3);
    context.fillRect(-3, -6, 7, 2);

    context.fillStyle = armorPalette.helm;
    drawSoftRect(context, -10, -20, 20, 8, 5);
    context.fillStyle = armorPalette.trim;
    context.fillRect(-7, -18, 14, 2);
    context.fillStyle = armorPalette.chest;
    drawSoftRect(context, -9, -4, 18, 16, 5);
    context.fillStyle = armorPalette.trim;
    context.fillRect(-2, -2, 4, 14);
    context.fillStyle = armorPalette.cape;
    context.fillRect(-12, 0, 3, 12);
    context.fillRect(9, 0, 3, 12);
    context.fillStyle = "#2f3a56";
    context.fillRect(-7, 12, 5, 7);
    context.fillRect(2, 12, 5, 7);

    if (damageStage >= 1) {
      context.fillStyle = "#8f2f2f";
      context.fillRect(-7, 0, 4, 2);
      context.fillRect(3, 5, 4, 2);
    }
    if (damageStage >= 2) {
      context.fillStyle = "#ffffff";
      context.fillRect(-10, -2, 3, 6);
      context.fillRect(7, 2, 3, 6);
    }

    context.save();
    context.translate(6, swingActive ? 2 : 0);
    context.rotate(swordAngle + swingProgress * 0.85);
    context.fillStyle = swordPalette.hilt;
    context.fillRect(1, -1, 4, 10);
    context.fillRect(-2, 2, 10, 3);
    context.fillStyle = swordPalette.blade;
    context.fillRect(2, -16, 2, 18);
    context.fillStyle = swordPalette.glow;
    context.fillRect(1, -18, 4, 4);
    context.fillRect(2, -12, 2, 8);
    context.restore();
    context.restore();
  }

  function drawMonster(context, screenX, screenY, tileSize, monster, time) {
    const pulse = Math.round(Math.sin(time / 120 + monster.spawnX * 0.17 + monster.spawnY * 0.21) * 2);
    const shadowWidth = Math.max(12, tileSize - 10);
    const hpRatio = monster.maxHp > 0 ? Math.max(0, monster.hp / monster.maxHp) : 0;
    const damageStage = hpRatio < 0.28 ? 2 : hpRatio < 0.58 ? 1 : 0;

    context.fillStyle = "rgba(29, 33, 53, 0.18)";
    drawSoftRect(context, screenX + Math.floor((tileSize - shadowWidth) / 2), screenY + tileSize - 8, shadowWidth, 6, 4);
    context.fillStyle = monster.body;
    drawSoftRect(context, screenX + 7, screenY + 7 + pulse, tileSize - 14, tileSize - 12, 8);
    context.fillStyle = monster.variant === "royal" ? "#8db467" : monster.variant === "ironcap" ? "#7f9968" : "#6f9d63";
    drawSoftRect(context, screenX + 5, screenY + 5 + pulse, tileSize - 10, 10, 6);
    context.fillStyle = "#f0d8b4";
    drawSoftRect(context, screenX + 9, screenY + 9 + pulse, tileSize - 18, 11, 5);
    context.fillStyle = monster.shirt;
    drawSoftRect(context, screenX + 7, screenY + 20 + pulse, tileSize - 14, tileSize - 24, 6);
    context.fillStyle = monster.eyes;
    context.fillRect(screenX + 12, screenY + 13 + pulse, 3, 3);
    context.fillRect(screenX + tileSize - 15, screenY + 13 + pulse, 3, 3);
    context.fillRect(screenX + Math.floor(tileSize / 2) - 2, screenY + 18 + pulse, 5, 2);
    context.fillStyle = "#cfeeb9";
    context.fillRect(screenX + 10, screenY + 10 + pulse, 4, 2);
    context.fillRect(screenX + tileSize - 16, screenY + 10 + pulse, 4, 2);

    context.fillStyle = monster.accent;
    if (monster.variant === "sprout") {
      context.fillRect(screenX + Math.floor(tileSize / 2) - 1, screenY + 2 + pulse, 2, 6);
      context.fillRect(screenX + Math.floor(tileSize / 2) - 4, screenY + 4 + pulse, 3, 2);
      context.fillRect(screenX + Math.floor(tileSize / 2) + 1, screenY + 4 + pulse, 3, 2);
    } else if (monster.variant === "runner") {
      context.fillRect(screenX + 8, screenY + 17 + pulse, tileSize - 16, 2);
      context.fillRect(screenX + 11, screenY + 5 + pulse, tileSize - 22, 3);
    } else if (monster.variant === "lantern") {
      drawSoftRect(context, screenX + tileSize - 12, screenY + 18 + pulse, 7, 7, 3);
      context.fillStyle = "#fff7bf";
      context.fillRect(screenX + tileSize - 10, screenY + 20 + pulse, 3, 3);
      context.fillStyle = monster.accent;
    } else if (monster.variant === "ironcap") {
      context.fillStyle = monster.accent;
      drawSoftRect(context, screenX + 6, screenY + 3 + pulse, tileSize - 12, 6, 3);
      context.fillStyle = "#8396a8";
      context.fillRect(screenX + 10, screenY + 5 + pulse, tileSize - 20, 2);
    } else if (monster.variant === "royal") {
      context.fillStyle = "#f7d459";
      context.fillRect(screenX + 10, screenY + 3 + pulse, 3, 4);
      context.fillRect(screenX + 15, screenY + 1 + pulse, 3, 6);
      context.fillRect(screenX + 20, screenY + 3 + pulse, 3, 4);
    }

    context.fillStyle = "#253052";
    context.fillRect(screenX + 10, screenY + tileSize - 10, 4, 6);
    context.fillRect(screenX + tileSize - 14, screenY + tileSize - 10, 4, 6);

    if (damageStage >= 1) {
      context.fillStyle = "#8e3131";
      context.fillRect(screenX + 10, screenY + 24 + pulse, 5, 2);
      context.fillRect(screenX + tileSize - 15, screenY + 19 + pulse, 4, 2);
    }
    if (damageStage >= 2) {
      context.fillStyle = "#fff7ef";
      context.fillRect(screenX + 6, screenY + 20 + pulse, 3, 6);
      context.fillRect(screenX + tileSize - 9, screenY + 12 + pulse, 3, 6);
    }

    const barWidth = Math.max(18, tileSize - 12);
    context.fillStyle = "rgba(26, 33, 47, 0.78)";
    drawSoftRect(context, screenX + Math.floor((tileSize - barWidth) / 2), screenY - 8, barWidth, 5, 3);
    context.fillStyle = "#7bea8b";
    drawSoftRect(context, screenX + Math.floor((tileSize - barWidth) / 2) + 1, screenY - 7, Math.max(3, Math.floor((barWidth - 2) * hpRatio)), 3, 2);
  }

  function getTerrainColor(type) {
    const colors = {
      wastes: "#78dd7a",
      foundry: "#ff9d66",
      citadel: "#82b8ff",
      supply: "#ffd45c",
      unknown: "#c5e7dc",
    };

    return colors[type] ?? colors.unknown;
  }

  function drawRoundedRect(context, x, y, width, height, radius) {
    const step = Math.max(2, Math.round(radius / 2));
    context.beginPath();
    context.moveTo(x + step, y);
    context.lineTo(x + width - step, y);
    context.lineTo(x + width, y + step);
    context.lineTo(x + width, y + height - step);
    context.lineTo(x + width - step, y + height);
    context.lineTo(x + step, y + height);
    context.lineTo(x, y + height - step);
    context.lineTo(x, y + step);
    context.closePath();
    context.fill();
    context.stroke();
  }

  function drawCreature(context, screenX, screenY, scale, tile, time) {
    const bob = Math.round(Math.sin(time / 360 + screenX * 0.03) * 3);

    context.save();
    context.translate(Math.round(screenX), Math.round(screenY + bob));
    context.scale(scale, scale);
    context.fillStyle = tile.event === "challenge" ? "#ff7aa8" : "#ffffff";
    context.strokeStyle = "#3d5570";
    context.lineWidth = 3;
    context.fillRect(-16, -30, 32, 24);
    context.strokeRect(-16, -30, 32, 24);
    context.fillRect(-10, -38, 8, 10);
    context.fillRect(2, -38, 8, 10);
    context.strokeRect(-10, -38, 8, 10);
    context.strokeRect(2, -38, 8, 10);
    context.fillStyle = "#3d5570";
    context.fillRect(-8, -22, 4, 4);
    context.fillRect(5, -22, 4, 4);
    context.fillRect(-4, -14, 10, 3);
    context.restore();
  }

  function drawArtifact(context, screenX, screenY, scale, time) {
    const flip = Math.sin(time / 320) > 0 ? 1 : 0.72;

    context.save();
    context.translate(Math.round(screenX), Math.round(screenY + Math.sin(time / 260) * 4));
    context.scale(scale, scale);
    context.fillStyle = "#fff4a3";
    context.strokeStyle = "#ffffff";
    context.shadowBlur = 0;
    context.fillRect(-4 * flip, -16, 8 * flip, 32);
    context.fillRect(-16 * flip, -4, 32 * flip, 8);
    context.strokeRect(-4 * flip, -16, 8 * flip, 32);
    context.strokeRect(-16 * flip, -4, 32 * flip, 8);
    context.restore();
  }

  function drawLandmark(context, screenX, screenY, scale, tile, time) {
    const color = getTerrainColor(tile.type);
    const bob = Math.round(Math.sin(time / 500 + screenX * 0.02) * 2);

    context.save();
    context.translate(Math.round(screenX), Math.round(screenY + bob));
    context.scale(scale, scale);
    context.fillStyle = color;
    context.strokeStyle = "#ffffff";
    context.lineWidth = 3;

    if (tile.type === "foundry") {
      drawRoundedRect(context, -24, -30, 48, 34, 6);
      context.fillStyle = "#fff4a3";
      context.fillRect(-12, -43, 24, 14);
      context.fillStyle = "#ff7aa8";
      context.fillRect(-7, -14, 14, 14);
    } else if (tile.type === "citadel") {
      context.fillStyle = "#bed7ff";
      context.fillRect(-22, -10, 44, 22);
      context.fillRect(-15, -30, 12, 22);
      context.fillRect(3, -38, 12, 30);
      context.strokeRect(-22, -10, 44, 22);
      context.strokeRect(-15, -30, 12, 22);
      context.strokeRect(3, -38, 12, 30);
      context.fillStyle = "#fff4a3";
      context.fillRect(-4, -2, 8, 14);
    } else if (tile.type === "supply") {
      context.fillStyle = "#ffcf5c";
      drawRoundedRect(context, -24, -24, 48, 38, 6);
      context.fillStyle = "#ffffff";
      context.fillRect(-4, -14, 8, 28);
      context.fillRect(-14, -4, 28, 8);
    } else {
      context.fillStyle = "#5ed66b";
      context.fillRect(-18, -32, 36, 28);
      context.strokeRect(-18, -32, 36, 28);
      context.fillStyle = "#fff4a3";
      context.fillRect(-5, -14, 10, 22);
    }

    context.restore();
  }

  function renderWorld() {
    ensureWorldData();
    ensureMonstersNearPlayer();
    const canvas = elements.worldView;
    const context = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const isFullscreen = document.fullscreenElement === elements.worldPanel;
    const displayHeight = isFullscreen
      ? Math.max(360, Math.min(window.innerHeight - 280, Math.floor(rect.width * 0.52)))
      : Math.min(660, Math.max(440, Math.floor(rect.width * 0.58)));
    const width = Math.max(720, Math.floor(rect.width));
    const height = displayHeight;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const canvasWidth = Math.round(width * pixelRatio);
    const canvasHeight = Math.round(height * pixelRatio);

    if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    }

    const time = performance.now();
    canvas.style.height = `${displayHeight}px`;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    context.imageSmoothingEnabled = false;
    context.clearRect(0, 0, width, height);

    const tileSize = isFullscreen ? Math.max(24, Math.min(32, Math.floor(width / 42))) : Math.max(24, Math.floor(width / 30));
    const cameraX = state.world.x;
    const cameraY = state.world.y;
    const centerX = Math.round(width / 2);
    const centerY = Math.round(height / 2);
    const visibleRadiusX = Math.ceil(width / tileSize / 2) + 3;
    const visibleRadiusY = Math.ceil(height / tileSize / 2) + 3;
    const toScreen = (x, y) => ({
      x: centerX + (x - cameraX) * tileSize,
      y: centerY + (y - cameraY) * tileSize,
    });

    context.fillStyle = "#8fdc76";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "#7fd067";
    for (let y = cameraY - visibleRadiusY; y <= cameraY + visibleRadiusY; y += 1) {
      for (let x = cameraX - visibleRadiusX; x <= cameraX + visibleRadiusX; x += 1) {
        const screen = toScreen(x, y);
        if ((x + y) % 2 === 0) {
          context.fillRect(screen.x, screen.y, tileSize, tileSize);
        }
        if ((x * 7 + y * 11) % 4 === 0) {
          context.fillStyle = "#67be58";
          context.fillRect(screen.x + 3, screen.y + 5, 5, 2);
          context.fillRect(screen.x + 14, screen.y + 16, 6, 2);
          context.fillRect(screen.x + 9, screen.y + 11, 3, 2);
          context.fillStyle = "#7fd067";
        }
        if ((x * 13 - y * 3) % 9 === 0) {
          context.fillStyle = "#fff4a3";
          context.fillRect(screen.x + 10, screen.y + 8, 2, 2);
          context.fillStyle = "#ff7aa8";
          context.fillRect(screen.x + 12, screen.y + 8, 2, 2);
          context.fillStyle = "#7fd067";
        }
        if ((x * 5 + y * 17) % 10 === 0) {
          context.fillStyle = "#a8eb91";
          context.fillRect(screen.x + 18, screen.y + 6, 2, 3);
          context.fillRect(screen.x + 6, screen.y + 18, 2, 3);
          context.fillStyle = "#7fd067";
        }
      }
    }

    for (let y = cameraY - visibleRadiusY; y <= cameraY + visibleRadiusY; y += 1) {
      for (let x = cameraX - visibleRadiusX; x <= cameraX + visibleRadiusX; x += 1) {
        const terrain = getWorldTerrainTile(x, y);

        if (!terrain) continue;

        const screen = toScreen(x, y);
        const waterNeighbors = getTerrainNeighbors(x, y, isWaterTerrain);
        const mountainNeighbors = getTerrainNeighbors(x, y, isMountainTerrain);
        const variant = getTileVariant(x, y);

        if (terrain === "river") {
          drawRiverTile(context, screen.x, screen.y, tileSize, waterNeighbors, variant);
        } else if (terrain === "lake") {
          drawLakeTile(context, screen.x, screen.y, tileSize, waterNeighbors, variant);
        } else if (terrain === "mountain") {
          drawMountainTile(context, screen.x, screen.y, tileSize, mountainNeighbors, variant);
        } else {
          drawCrossingTile(context, screen.x, screen.y, tileSize, terrain, waterNeighbors, variant);
        }
      }
    }

    const drawPathTile = (x, y, accentX = 7, accentY = 10) => {
      if (Math.abs(x) <= 14 && Math.abs(y) <= 12) {
        return;
      }

      const screen = toScreen(x, y);
      context.fillStyle = "#e8d39a";
      context.fillRect(screen.x, screen.y, tileSize, tileSize);
      context.fillStyle = "#d2b876";
      context.fillRect(screen.x + accentX, screen.y + accentY, 7, 3);
      context.fillRect(screen.x + Math.min(tileSize - 7, accentX + 8), screen.y + Math.max(3, accentY - 6), 5, 3);
      context.fillStyle = "#f5e4b8";
      context.fillRect(screen.x + 4, screen.y + 4, tileSize - 10, 2);
      context.fillStyle = "#b99356";
      context.fillRect(screen.x + 2, screen.y + tileSize - 5, tileSize - 6, 2);
    };

    for (let y = -14; y <= 12; y += 1) {
      drawPathTile(0, y, 3 + ((y + 14) % 5), 10);
    }
    for (let x = -22; x <= 21; x += 1) {
      drawPathTile(x, 0, 7, 4 + ((x + 22) % 7));
    }
    for (let y = -12; y <= 11; y += 1) {
      drawPathTile(-15, y, 4, 9);
      drawPathTile(15, y, 10, 7);
    }
    for (let x = -20; x <= 19; x += 1) {
      drawPathTile(x, -8, 6, 12);
      drawPathTile(x, 9, 9, 5);
    }

    context.fillStyle = "#f1dda8";
    const promenadeBands = [
      [-18, -11, 37, 2],
      [-18, 10, 37, 2],
      [-10, -5, 21, 2],
      [-10, 4, 21, 2],
    ];
    promenadeBands.forEach(([x, y, w, h]) => {
      const band = toScreen(x, y);
      context.fillRect(band.x, band.y, tileSize * w, tileSize * h);
    });
    context.fillStyle = "#d2b876";
    for (let x = -20; x <= 19; x += 3) {
      const upper = toScreen(x, -8);
      const lower = toScreen(x + 1, 9);
      context.fillRect(upper.x + 8, upper.y + 11, 8, 3);
      context.fillRect(lower.x + 5, lower.y + 11, 8, 3);
    }

    context.fillStyle = "#c79b58";
    for (let y = -13; y <= 11; y += 4) {
      const leftFence = toScreen(-22, y);
      const rightFence = toScreen(21, y);
      context.fillRect(leftFence.x + 6, leftFence.y + 2, 3, 18);
      context.fillRect(leftFence.x + 17, leftFence.y + 2, 3, 18);
      context.fillRect(leftFence.x + 4, leftFence.y + 9, 18, 3);
      context.fillRect(rightFence.x + 6, rightFence.y + 2, 3, 18);
      context.fillRect(rightFence.x + 17, rightFence.y + 2, 3, 18);
      context.fillRect(rightFence.x + 4, rightFence.y + 9, 18, 3);
    }
    for (let x = -20; x <= 19; x += 6) {
      const topFence = toScreen(x, -14);
      const bottomFence = toScreen(x, 12);
      context.fillRect(topFence.x + 4, topFence.y + 9, 18, 3);
      context.fillRect(bottomFence.x + 4, bottomFence.y + 9, 18, 3);
    }

    const lampPosts = [
      [-16, -11], [-8, -11], [0, -11], [8, -11], [16, -11],
      [-16, 11], [-8, 11], [0, 11], [8, 11], [16, 11],
      [-22, -4], [-22, 4], [22, -4], [22, 4],
      [-12, 0], [12, 0], [0, -15], [0, 15],
    ];
    lampPosts.forEach(([x, y]) => {
      const screen = toScreen(x, y);
      drawLamp(context, screen.x, screen.y, time);
    });

    context.fillStyle = "#edd8a8";
    const plazaTopLeft = toScreen(-16, -14);
    drawSoftRect(context, plazaTopLeft.x, plazaTopLeft.y, tileSize * 33, tileSize * 29, 16);
    context.fillStyle = "#f6e7c1";
    drawSoftRect(context, plazaTopLeft.x + 8, plazaTopLeft.y + 8, tileSize * 33 - 16, tileSize * 29 - 16, 14);
    context.fillStyle = "#e1c487";
    drawSoftRect(context, plazaTopLeft.x + tileSize * 3, plazaTopLeft.y + tileSize * 3, tileSize * 27, tileSize * 23, 18);
    context.fillStyle = "#d9ba79";
    drawSoftRect(context, plazaTopLeft.x + tileSize * 7, plazaTopLeft.y + tileSize * 7, tileSize * 19, tileSize * 15, 18);
    context.fillStyle = "#ead49c";
    for (let y = -14; y <= 14; y += 1) {
      for (let x = -16; x <= 16; x += 1) {
        const stone = toScreen(x, y);
        const stoneInset = ((x + y) % 3 === 0 ? 4 : 3);
        if ((x + y) % 2 === 0 || (Math.abs(x) <= 6 && Math.abs(y) <= 5) || (Math.abs(x) <= 2 || Math.abs(y) <= 2)) {
          context.fillRect(stone.x + stoneInset, stone.y + 3, tileSize - stoneInset * 2, tileSize - 6);
          context.fillStyle = "#f7e8c4";
          context.fillRect(stone.x + stoneInset + 2, stone.y + 5, Math.max(3, tileSize - stoneInset * 2 - 8), 2);
          context.fillStyle = "#ead49c";
        }
      }
    }
    context.fillStyle = "#c79f5b";
    for (let x = -16; x <= 16; x += 1) {
      const northEdge = toScreen(x, -14);
      const southEdge = toScreen(x, 14);
      context.fillRect(northEdge.x + 2, northEdge.y + tileSize - 4, tileSize - 4, 2);
      context.fillRect(southEdge.x + 2, southEdge.y + 2, tileSize - 4, 2);
    }
    for (let y = -13; y <= 13; y += 1) {
      const westEdge = toScreen(-16, y);
      const eastEdge = toScreen(16, y);
      context.fillRect(westEdge.x + tileSize - 4, westEdge.y + 2, 2, tileSize - 4);
      context.fillRect(eastEdge.x + 2, eastEdge.y + 2, 2, tileSize - 4);
    }
    context.fillStyle = "#fff8dc";
    for (let x = -14; x <= 14; x += 3) {
      const sparkle = toScreen(x, -10 + ((x + 14) % 4));
      context.fillRect(sparkle.x + 11, sparkle.y + 10, 3, 3);
      context.fillRect(sparkle.x + 7, sparkle.y + 14, 2, 2);
    }
    context.strokeStyle = "#b9985a";
    context.lineWidth = 2;
    context.strokeRect(plazaTopLeft.x, plazaTopLeft.y, tileSize * 33, tileSize * 29);
    context.strokeStyle = "#fff4cf";
    context.strokeRect(plazaTopLeft.x + 5, plazaTopLeft.y + 5, tileSize * 33 - 10, tileSize * 29 - 10);

    const safeZoneTopLeft = toScreen(-26, -18);
    const safeZoneWidth = tileSize * 52;
    const safeZoneHeight = tileSize * 37;
    context.fillStyle = "rgba(79, 124, 255, 0.09)";
    context.fillRect(safeZoneTopLeft.x, safeZoneTopLeft.y, safeZoneWidth, safeZoneHeight);
    context.strokeStyle = "#249dff";
    context.lineWidth = 6;
    context.strokeRect(safeZoneTopLeft.x - 4, safeZoneTopLeft.y - 4, safeZoneWidth + 8, safeZoneHeight + 8);
    context.strokeStyle = "#d9f7ff";
    context.lineWidth = 2;
    context.strokeRect(safeZoneTopLeft.x + 5, safeZoneTopLeft.y + 5, safeZoneWidth - 10, safeZoneHeight - 10);

    const villageDetails = [
      [-17, -14, "stall", "#ffb07c"], [-9, -14, "stall", "#95c8ff"], [8, -14, "stall", "#d4b2ff"], [16, -14, "stall", "#91e891"],
      [-17, 13, "stall", "#ffe06b"], [-9, 13, "stall", "#ff8f8f"], [8, 13, "stall", "#82b8ff"], [16, 13, "stall", "#fff4a3"],
      [-18, -11, "bench"], [-8, -11, "bench"], [8, -11, "bench"], [18, -11, "bench"],
      [-18, 11, "bench"], [-8, 11, "bench"], [8, 11, "bench"], [18, 11, "bench"],
      [-22, -14, "sign", "INN"], [-22, 12, "sign", "PARK"], [20, -14, "sign", "MAP"], [20, 12, "sign", "DOCK"],
      [-23, -16, "flower"], [-19, -16, "flower"], [-15, -16, "flower"], [14, -16, "flower"], [18, -16, "flower"], [22, -16, "flower"],
      [-23, 15, "flower"], [-19, 15, "flower"], [-15, 15, "flower"], [14, 15, "flower"], [18, 15, "flower"], [22, 15, "flower"],
      [-13, -5, "crate", "#ff7aa8"], [12, -5, "crate", "#82b8ff"], [-13, 5, "crate", "#fff4a3"], [12, 5, "crate", "#78dd7a"],
      [-21, -7, "crate", "#ffcf5c"], [-21, 7, "crate", "#95c8ff"], [20, -7, "crate", "#d4b2ff"], [20, 7, "crate", "#ffb07c"],
      [-13, -8, "planter", "#ff7aa8"], [12, -8, "planter", "#82b8ff"], [-13, 8, "planter", "#fff4a3"], [12, 8, "planter", "#78dd7a"],
      [-4, -12, "sign", "PLAZA"], [2, 12, "sign", "FOUNTAIN"],
      [-15, -3, "hedge"], [14, -3, "hedge"], [-15, 3, "hedge"], [14, 3, "hedge"],
      [-7, -13, "banner", "#ff7aa8"], [6, -13, "banner", "#82b8ff"], [-7, 13, "banner", "#fff4a3"], [6, 13, "banner", "#78dd7a"],
      [-19, 0, "hedge"], [18, 0, "hedge"],
      [-11, 0, "planter", "#ffcfb8"], [10, 0, "planter", "#c4f0ff"],
      [-8, -6, "flower"], [7, -6, "flower"], [-8, 6, "flower"], [7, 6, "flower"],
      [-5, -4, "planter", "#ffdca8"], [4, -4, "planter", "#d7f8ff"], [-5, 4, "planter", "#ffc2dd"], [4, 4, "planter", "#d9ffb8"],
    ];

    villageDetails.forEach(([x, y, type, detail], index) => {
      const screen = toScreen(x, y);

      if (type === "stall") {
        drawMarketStall(context, screen.x - 7, screen.y - 10, detail);
      } else if (type === "bench") {
        drawBench(context, screen.x - 4, screen.y - 3);
      } else if (type === "sign") {
        drawSignpost(context, screen.x - 5, screen.y - 9, detail);
      } else if (type === "planter") {
        drawPlanter(context, screen.x - 2, screen.y - 2, detail);
      } else if (type === "hedge") {
        drawHedge(context, screen.x - 5, screen.y + 2, 34, 10);
      } else if (type === "banner") {
        drawBannerPole(context, screen.x - 2, screen.y - 8, detail);
      } else if (type === "crate") {
        drawCrate(context, screen.x + 4, screen.y + 6, detail);
      } else {
        drawFlowers(context, screen.x, screen.y, index % 2 === 0 ? "#ff7aa8" : "#fff4a3");
      }
    });

    const scenery = [
      [-25, -16, "tree"], [-20, -16, "tree"], [-8, -16, "tree"], [8, -16, "tree"], [20, -16, "tree"], [25, -16, "tree"],
      [-25, 14, "tree"], [-20, 14, "tree"], [-8, 14, "tree"], [8, 14, "tree"], [20, 14, "tree"], [25, 14, "tree"],
      [-23, -8, "flower"], [-23, -2, "flower"], [-23, 6, "flower"], [22, -8, "flower"], [22, -2, "flower"], [22, 6, "flower"],
      [-16, -3, "flower"], [-12, -3, "flower"], [11, -3, "flower"], [15, -3, "flower"],
      [-5, -13, "flower"], [5, -13, "flower"], [-5, 12, "flower"], [5, 12, "flower"],
      [-18, -11, "tree"], [18, -11, "tree"], [-18, 10, "tree"], [18, 10, "tree"],
      [-20, -12, "banner"], [19, -12, "banner"], [-20, 10, "banner"], [19, 10, "banner"],
    ];

    scenery.forEach(([x, y, type], index) => {
      const screen = toScreen(x, y);
      if (type === "tree") {
        drawTree(context, screen.x, screen.y, index);
      } else if (type === "banner") {
        drawBannerPole(context, screen.x, screen.y, index % 2 === 0 ? "#ff7aa8" : "#82b8ff");
      } else {
        drawFlowers(context, screen.x, screen.y, index % 2 === 0 ? "#ff7aa8" : "#fff4a3");
      }
    });

    villagePlaces.forEach((place) => {
      const screen = toScreen(place.x, place.y);
      const widthPx = place.w * tileSize;
      const heightPx = place.h * tileSize;

      drawShopDetails(context, place, screen.x, screen.y, widthPx, heightPx);
    });

    const fountain = toScreen(0, 0);
    const fountainCenterX = fountain.x + Math.floor(tileSize / 2);
    const fountainCenterY = fountain.y + Math.floor(tileSize / 2);

    context.fillStyle = "rgba(60, 87, 110, 0.14)";
    drawSoftRect(context, fountainCenterX - tileSize * 4 + 8, fountainCenterY + tileSize * 3 + 8, tileSize * 8 - 16, 16, 10);
    context.fillStyle = "#5a9f63";
    drawSoftRect(context, fountainCenterX - tileSize * 6.8, fountainCenterY - tileSize * 6.8, tileSize * 13.6, tileSize * 13.6, 42);
    context.fillStyle = "#76bb7d";
    drawSoftRect(context, fountainCenterX - tileSize * 6.15, fountainCenterY - tileSize * 6.15, tileSize * 12.3, tileSize * 12.3, 40);

    for (let gy = -10; gy <= 10; gy += 1) {
      for (let gx = -10; gx <= 10; gx += 1) {
        const gardenTile = toScreen(gx, gy);
        const variant = Math.abs(gx * 17 + gy * 23);
        if (isGardenWalkwayTile(gx, gy)) {
          drawGardenWalkwayTile(context, gardenTile.x, gardenTile.y, variant);
        } else {
          drawGardenWalkwayTile(context, gardenTile.x, gardenTile.y, variant);
        }
      }
    }

    const connectedBushBeds = [
      [-10, -10, 72, 72, "#ff7aa8"],
      [4, -10, 72, 72, "#82b8ff"],
      [-10, 4, 72, 72, "#ffb07c"],
      [4, 4, 72, 72, "#78dd7a"],
    ];
    connectedBushBeds.forEach(([x, y, width, height, color]) => {
      const bed = toScreen(x, y);
      drawHedge(context, bed.x + 2, bed.y + 2, width, height);
      drawBushCluster(context, bed.x + 8, bed.y + 10, color);
      drawBushCluster(context, bed.x + width - 52, bed.y + 10, color);
      drawBushCluster(context, bed.x + 8, bed.y + height - 36, color);
      drawBushCluster(context, bed.x + width - 52, bed.y + height - 36, color);
      drawRoseBed(context, bed.x + Math.max(0, width / 2 - 18), bed.y + 6, color);
      drawRoseBed(context, bed.x + Math.max(0, width / 2 - 18), bed.y + height - 32, color);
    });

    for (let gy = -10; gy <= 10; gy += 1) {
      for (let gx = -10; gx <= 10; gx += 1) {
        if (!isGardenWalkwayTile(gx, gy)) continue;
        const fenceTile = toScreen(gx, gy);
        if (isVillageGardenBarrier(gx, gy - 1)) drawGardenFenceEdge(context, fenceTile.x, fenceTile.y, "north");
        if (isVillageGardenBarrier(gx + 1, gy)) drawGardenFenceEdge(context, fenceTile.x, fenceTile.y, "east");
        if (isVillageGardenBarrier(gx, gy + 1)) drawGardenFenceEdge(context, fenceTile.x, fenceTile.y, "south");
        if (isVillageGardenBarrier(gx - 1, gy)) drawGardenFenceEdge(context, fenceTile.x, fenceTile.y, "west");
      }
    }

    const stoneBorders = [
      [-10, -7, 84, 10], [2, -7, 84, 10], [-10, 5, 84, 10], [2, 5, 84, 10],
      [-7, -10, 10, 84], [5, -10, 10, 84], [-7, 2, 10, 84], [5, 2, 10, 84],
      [-4, -4, 36, 10], [0, -4, 36, 10], [-4, 3, 36, 10], [0, 3, 36, 10],
    ];
    stoneBorders.forEach(([x, y, width, height]) => {
      const border = toScreen(x, y);
      drawStoneCurl(context, border.x + 7, border.y + 7, width, height);
    });

    const gardenLanterns = [
      [-9, -9], [7, -9], [-9, 7], [7, 7],
    ];
    gardenLanterns.forEach(([x, y]) => {
      const lantern = toScreen(x, y);
      drawGardenLantern(context, lantern.x, lantern.y, time);
    });

    const formalBeds = [
      [-9, -9, "#ff7aa8"], [5, -9, "#82b8ff"], [-9, 5, "#ffb07c"], [5, 5, "#78dd7a"],
      [-8, -8, "#fff4a3"], [6, -8, "#d4b2ff"], [-8, 6, "#ffcf5c"], [6, 6, "#c4f0ff"],
    ];
    formalBeds.forEach(([x, y, color]) => {
      const bed = toScreen(x, y);
      drawRoseBed(context, bed.x - 8, bed.y - 8, color);
      drawBushCluster(context, bed.x - 10, bed.y - 2, color);
      drawTallPlant(context, bed.x, bed.y - 6, color);
    });

    const goldenArches = [
      [-1, -12], [-1, 11], [-12, -1], [11, -1],
    ];
    goldenArches.forEach(([x, y]) => {
      const arch = toScreen(x, y);
      drawGoldenArch(context, arch.x - 6, arch.y - 6);
    });

    context.fillStyle = "rgba(60, 87, 110, 0.18)";
    drawSoftRect(context, fountainCenterX - tileSize * 3 + 6, fountainCenterY + tileSize * 2 + 6, tileSize * 6 - 12, 14, 8);
    context.fillStyle = "#ceb183";
    drawSoftRect(context, fountainCenterX - tileSize * 4.4, fountainCenterY - tileSize * 4.4, tileSize * 8.8, tileSize * 8.8, 28);
    context.fillStyle = "#f0dfb6";
    drawSoftRect(context, fountainCenterX - tileSize * 4, fountainCenterY - tileSize * 4, tileSize * 8, tileSize * 8, 24);
    context.fillStyle = "#b9985a";
    context.fillRect(fountainCenterX - tileSize * 3, fountainCenterY - tileSize * 3 + 6, tileSize * 6, 3);
    context.fillRect(fountainCenterX - tileSize * 3, fountainCenterY + tileSize * 3 - 9, tileSize * 6, 3);
    context.fillRect(fountainCenterX - tileSize * 3 + 6, fountainCenterY - tileSize * 3, 3, tileSize * 6);
    context.fillRect(fountainCenterX + tileSize * 3 - 9, fountainCenterY - tileSize * 3, 3, tileSize * 6);

    context.fillStyle = "#b38958";
    context.strokeStyle = "#7f5e37";
    context.lineWidth = 3;
    drawSoftRect(context, fountainCenterX - tileSize * 3, fountainCenterY - tileSize * 3, tileSize * 6, tileSize * 6, 30);
    context.fillStyle = "#e7d0a6";
    drawSoftRect(context, fountainCenterX - tileSize * 3 + 8, fountainCenterY - tileSize * 3 + 8, tileSize * 6 - 16, tileSize * 6 - 16, 26);

    context.fillStyle = "#7fc8ff";
    drawSoftRect(context, fountainCenterX - tileSize * 2.2, fountainCenterY - tileSize * 2.15, tileSize * 4.4, tileSize * 4.4, 24);
    context.fillStyle = "#b7ebff";
    drawSoftRect(context, fountainCenterX - tileSize * 1.6, fountainCenterY - tileSize * 1.55, tileSize * 3.2, tileSize * 3.2, 20);

    context.fillStyle = "#c2a37d";
    context.strokeStyle = "#7f5e37";
    drawSoftRect(context, fountainCenterX - 12, fountainCenterY - tileSize * 2.3, 24, tileSize * 3.1, 10);
    drawSoftRect(context, fountainCenterX - 24, fountainCenterY - 14, 48, 22, 10);
    context.fillStyle = "#e9dcc1";
    drawSoftRect(context, fountainCenterX - 34, fountainCenterY + 10, 68, 18, 10);
    context.fillStyle = "#fff4cf";
    drawSoftRect(context, fountainCenterX - 22, fountainCenterY - tileSize * 2.55, 44, 8, 5);

    const splashBob = Math.round(Math.sin(time / 220) * 2);
    context.fillStyle = "#ffffff";
    context.fillRect(fountainCenterX - 4, fountainCenterY - tileSize * 2.8 + splashBob, 8, tileSize * 1.55);
    context.fillRect(fountainCenterX - 26, fountainCenterY - 6, 5, 15);
    context.fillRect(fountainCenterX + 21, fountainCenterY - 6, 5, 15);
    context.fillRect(fountainCenterX - 10, fountainCenterY - tileSize * 1.6, 3, 10);
    context.fillRect(fountainCenterX + 7, fountainCenterY - tileSize * 1.6, 3, 10);
    context.fillStyle = "#7fe0ff";
    context.fillRect(fountainCenterX - 2, fountainCenterY - tileSize * 2.65 + splashBob, 4, tileSize * 1.45);
    context.fillRect(fountainCenterX - 24, fountainCenterY - 4, 2, 13);
    context.fillRect(fountainCenterX + 22, fountainCenterY - 4, 2, 13);
    context.fillRect(fountainCenterX - 9, fountainCenterY - tileSize * 1.45, 1, 8);
    context.fillRect(fountainCenterX + 8, fountainCenterY - tileSize * 1.45, 1, 8);
    context.fillStyle = "#d9f7ff";
    context.fillRect(fountainCenterX - 20, fountainCenterY + tileSize * 1.45, 40, 5);
    context.fillRect(fountainCenterX - tileSize * 2.6 + 12, fountainCenterY + tileSize * 2.7 - 18, 10, 2);
    context.fillRect(fountainCenterX + tileSize * 2.6 - 22, fountainCenterY + tileSize * 2.7 - 18, 10, 2);

    state.monsters
      .filter((monster) => !monster.dead)
      .sort((left, right) => left.y - right.y)
      .forEach((monster) => {
        const monsterScreen = toScreen(monster.x, monster.y);
        drawMonster(context, monsterScreen.x, monsterScreen.y, tileSize, monster, time);
      });

    drawPlayer(context, centerX, centerY, tileSize, time);

    if (slashEffect && slashEffect.until > time) {
      const slashRadius = tileSize * 2.3;
      context.save();
      context.translate(centerX + Math.floor(tileSize / 2), centerY + Math.floor(tileSize / 2));
      context.rotate(slashEffect.angle);
      context.fillStyle = "rgba(255, 255, 255, 0.78)";
      context.beginPath();
      context.moveTo(10, -8);
      context.quadraticCurveTo(slashRadius * 0.62, -18, slashRadius, -4);
      context.quadraticCurveTo(slashRadius * 0.72, 6, 12, 9);
      context.closePath();
      context.fill();
      context.fillStyle = "rgba(127, 224, 255, 0.72)";
      context.beginPath();
      context.moveTo(14, -3);
      context.quadraticCurveTo(slashRadius * 0.55, -10, slashRadius - 8, -1);
      context.quadraticCurveTo(slashRadius * 0.62, 4, 15, 5);
      context.closePath();
      context.fill();
      context.restore();
    }

    const hpPercent = state.maxHp > 0 ? hudHpDisplay / state.maxHp : 0;
    const hpFlashPercent = state.maxHp > 0 ? hudHpFlash / state.maxHp : 0;
    const xpProgress = (hudXpDisplay % 120) / 120;
    const xpFlashProgress = (hudXpFlash % 120) / 120;
    const armorBuffer = Math.min(0.45, (state.armor.defense + state.defenseBoost * 2) / Math.max(40, state.maxHp));
    drawHudBar(context, 12, 12, "HP", `${state.hp}/${state.maxHp}`, hpPercent, "#ff4757", {
      flashPercent: hpFlashPercent,
      flashColor: "rgba(168, 232, 255, 0.28)",
      armorPercent: Math.min(1, hpPercent + armorBuffer),
      showArmorLine: true,
    });
    drawHudBar(context, 12, 42, "XP", `${state.totalXp % 120}/120`, xpProgress, "#4f7cff", {
      flashPercent: xpFlashProgress,
      flashColor: "rgba(255, 244, 163, 0.28)",
    });

    const nearbyPlace = getNearbyVillagePlace();
    elements.location.textContent = nearbyPlace ? nearbyPlace.name : `Village Center ${state.world.x},${state.world.y}`;
  }

  function render() {
    const hpPercent = Math.max(0, Math.round((state.hp / state.maxHp) * 100));
    const enemy = state.enemy ?? getScaledEnemy();

    state.enemy = enemy;
    elements.level.textContent = state.level;
    elements.xp.textContent = state.xp;
    elements.hp.textContent = `${state.hp}/${state.maxHp}`;
    elements.battles.textContent = state.battles;
    elements.vitalGauge.style.setProperty("--value", `${hpPercent}%`);
    elements.heroStatus.textContent = `${paths[state.currentPath].name} active. HP ${state.hp}/${state.maxHp}, armor ${state.armor.defense + state.defenseBoost}, XP ${state.xp}, artifacts ${state.artifacts?.length ?? 0}.`;

    renderGearCard(
      elements.weaponCard,
      elements.weaponName,
      elements.weaponDetails,
      state.weapon,
      elements.weaponRarity,
      elements.weaponStat,
      elements.weaponValue,
    );
    renderGearCard(
      elements.armorCard,
      elements.armorName,
      elements.armorDetails,
      state.armor,
      elements.armorRarity,
      elements.armorStat,
      elements.armorValue,
    );

    elements.log.innerHTML = state.log.map((entry) => `<p>${entry}</p>`).join("");
    renderWorld();
    renderInventory();
  }

  function animateWorld() {
    const now = performance.now();
    const shouldTickMonsters = now - lastMonsterTick >= 90;
    let changed = false;

    if (shouldTickMonsters) {
      lastMonsterTick = now;
      changed = updateMonsters(now);
    }

    changed = updatePassiveRegen(now) || changed;
    updateHudAnimations();

    if (changed) {
      if (monsterStateNeedsSave) {
        saveState();
        monsterStateNeedsSave = false;
      }
      render();
    } else {
      renderWorld();
    }

    window.requestAnimationFrame(animateWorld);
  }

  function saveAndRender() {
    saveState();
    updateHudAnimations();
    render();
  }

  elements.fight?.addEventListener("click", fight);
  elements.quickFight?.addEventListener("click", fight);
  elements.rest?.addEventListener("click", rest);
  elements.clearSave?.addEventListener("click", clearSave);
  elements.generateMap?.addEventListener("click", generateNewMap);
  elements.fullscreen?.addEventListener("click", toggleFullscreen);
  elements.inventoryToggle?.addEventListener("click", toggleInventory);

  document.addEventListener("fullscreenchange", () => {
    elements.fullscreen.textContent = document.fullscreenElement ? "Exit Full Screen" : "Full Screen";
    renderWorld();
  });

  document.querySelectorAll("[data-move]").forEach((button) => {
    button.addEventListener("click", () => movePlayer(button.dataset.move));
  });

  window.addEventListener("keydown", (event) => {
    const keys = {
      w: "up",
      a: "left",
      s: "down",
      d: "right",
    };
    const direction = keys[event.key.toLowerCase()];
    const isTyping = ["INPUT", "TEXTAREA", "SELECT"].includes(event.target?.tagName);

    if ((event.code === "Space" || event.key === " ") && !isTyping && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      enterNearbyPlace();
      return;
    }

    if (event.key.toLowerCase() === "i" && !isTyping && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      toggleInventory();
      return;
    }

    if (direction && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      movePlayer(direction);
    }
  });

  document.querySelectorAll(".upgrade-button").forEach((button) => {
    button.addEventListener("click", () => upgrade(button.dataset.upgrade));
  });

  elements.inventory.addEventListener("click", (event) => {
    const equipButton = event.target.closest("[data-equip]");
    const tradeButton = event.target.closest("[data-trade]");

    if (equipButton) equipItem(equipButton.dataset.equip);
    if (tradeButton) tradeItem(tradeButton.dataset.trade);
  });

  elements.worldView.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    slashSword(event.clientX, event.clientY);
  });

  ensureWorldData();
  ensureMonsterData();
  ensureMonstersNearPlayer();
  state.enemy = state.enemy ?? getScaledEnemy();
  syncHudTargets();
  saveAndRender();
  window.requestAnimationFrame(animateWorld);
}

const snakeRoot = document.querySelector("#snake-game");

if (snakeRoot) {
  const bestScoreKey = "snakeHighScoreV1";
  const canvas = document.querySelector("#snake-board");
  const context = canvas.getContext("2d");
  const scoreValue = document.querySelector("#snake-score");
  const lengthValue = document.querySelector("#snake-length");
  const statusText = document.querySelector("#snake-status-text");
  const topline = document.querySelector("#snake-topline");
  const gauge = document.querySelector("#snake-gauge");
  const startButton = document.querySelector("#snake-start-button");
  const restartButton = document.querySelector("#snake-restart-button");
  const overlay = document.querySelector("#snake-overlay");
  const finalScoreValue = document.querySelector("#snake-final-score");
  const bestScoreValue = document.querySelector("#snake-best-score");
  const overlayRestartButton = document.querySelector("#snake-overlay-restart");

  const gridSize = 16;
  const tileSize = canvas.width / gridSize;
  const baseSpeed = 210;

  let snake;
  let direction;
  let nextDirection;
  let apple;
  let score;
  let bestScore = Number.parseInt(window.localStorage.getItem(bestScoreKey) ?? "0", 10) || 0;
  let loopId = null;
  let isRunning = false;
  let hasStarted = false;

  function showOverlay() {
    overlay.hidden = false;
  }

  function hideOverlay() {
    overlay.hidden = true;
  }

  function syncBestScore() {
    bestScoreValue.textContent = String(bestScore);
  }

  function randomTile() {
    return {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
  }

  function drawRoundedRect(x, y, width, height, radius, fill) {
    context.beginPath();
    context.roundRect(x, y, width, height, radius);
    context.fillStyle = fill;
    context.fill();
  }

  function placeApple() {
    let nextApple = randomTile();

    while (snake.some((segment) => segment.x === nextApple.x && segment.y === nextApple.y)) {
      nextApple = randomTile();
    }

    apple = nextApple;
  }

  function updateStats(message) {
    scoreValue.textContent = String(score);
    lengthValue.textContent = String(snake.length);
    gauge.style.setProperty("--value", `${Math.min(100, 16 + score * 6)}%`);
    statusText.textContent = message;
    topline.textContent = hasStarted ? `APPLES ${score}` : "APPLE READY";
    syncBestScore();
  }

  function resetSnake(startLoop = false) {
    snake = [
      { x: 7, y: 8 },
      { x: 6, y: 8 },
      { x: 5, y: 8 },
    ];
    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    score = 0;
    hasStarted = startLoop;
    hideOverlay();
    placeApple();
    updateStats(startLoop ? "Use WASD to chase the apple." : "Press Start Game, then use WASD to move.");
    drawSnakeGame();

    if (loopId) {
      window.clearInterval(loopId);
      loopId = null;
    }

    isRunning = false;

    if (startLoop) {
      startSnake();
    }
  }

  function drawGrid() {
    drawRoundedRect(0, 0, canvas.width, canvas.height, 24, "#183125");

    for (let y = 0; y < gridSize; y += 1) {
      for (let x = 0; x < gridSize; x += 1) {
        const tileX = x * tileSize;
        const tileY = y * tileSize;
        const tileColor = (x + y) % 2 === 0 ? "#244433" : "#2d5340";
        drawRoundedRect(tileX + 2, tileY + 2, tileSize - 4, tileSize - 4, 9, tileColor);
      }
    }
  }

  function drawApple() {
    const x = apple.x * tileSize;
    const y = apple.y * tileSize;

    drawRoundedRect(x + 8, y + 9, tileSize - 16, tileSize - 18, 11, "#ff6c8e");
    drawRoundedRect(x + 12, y + 13, tileSize - 24, tileSize - 26, 8, "#ffd8e6");
    drawRoundedRect(x + tileSize / 2 - 3, y + 5, 6, 10, 3, "#7be36e");
  }

  function drawSnakeGame() {
    drawGrid();
    drawApple();

    snake.forEach((segment, index) => {
      const x = segment.x * tileSize;
      const y = segment.y * tileSize;

      drawRoundedRect(x + 3, y + 3, tileSize - 6, tileSize - 6, 10, index === 0 ? "#b7ff8c" : "#67ea70");
      drawRoundedRect(x + 8, y + 8, tileSize - 16, tileSize - 16, 7, index === 0 ? "#ddffb3" : "#98ff9d");

      if (index === 0) {
        drawRoundedRect(x + 11, y + 12, 4, 4, 2, "#29513a");
        drawRoundedRect(x + tileSize - 15, y + 12, 4, 4, 2, "#29513a");
      }
    });
  }

  function endSnakeRun(message) {
    isRunning = false;
    if (loopId) {
      window.clearInterval(loopId);
      loopId = null;
    }
    bestScore = Math.max(bestScore, score);
    window.localStorage.setItem(bestScoreKey, String(bestScore));
    finalScoreValue.textContent = String(score);
    syncBestScore();
    showOverlay();
    updateStats(message);
    topline.textContent = "RUN OVER";
  }

  function stepSnake() {
    direction = nextDirection;
    const head = snake[0];
    const nextHead = {
      x: head.x + direction.x,
      y: head.y + direction.y,
    };

    const hitWall =
      nextHead.x < 0 ||
      nextHead.x >= gridSize ||
      nextHead.y < 0 ||
      nextHead.y >= gridSize;

    const hitSelf = snake.some((segment) => segment.x === nextHead.x && segment.y === nextHead.y);

    if (hitWall || hitSelf) {
      drawSnakeGame();
      endSnakeRun("Game over. Press Restart to try again.");
      return;
    }

    snake.unshift(nextHead);

    if (nextHead.x === apple.x && nextHead.y === apple.y) {
      score += 1;
      placeApple();
      updateStats(`Nice. Apple ${score} collected.`);
    } else {
      snake.pop();
    }

    drawSnakeGame();
    updateStats(statusText.textContent);
  }

  function startSnake() {
    if (isRunning) return;

    hasStarted = true;
    isRunning = true;
    updateStats("Snake is moving. Stay sharp.");
    drawSnakeGame();
    loopId = window.setInterval(stepSnake, baseSpeed);
  }

  function handleSnakeDirection(key) {
    const controls = {
      w: { x: 0, y: -1 },
      a: { x: -1, y: 0 },
      s: { x: 0, y: 1 },
      d: { x: 1, y: 0 },
    };

    const requested = controls[key];
    if (!requested) return false;

    const reversing = requested.x === -direction.x && requested.y === -direction.y;
    if (reversing) return true;

    nextDirection = requested;

    if (!hasStarted) {
      startSnake();
    }

    return true;
  }

  startButton.addEventListener("click", () => {
    if (!hasStarted) {
      resetSnake(true);
      return;
    }

    startSnake();
  });

  restartButton.addEventListener("click", () => {
    resetSnake(false);
  });

  overlayRestartButton.addEventListener("click", () => {
    resetSnake(false);
  });

  window.addEventListener("keydown", (event) => {
    const isTyping = ["INPUT", "TEXTAREA", "SELECT"].includes(event.target?.tagName);
    if (isTyping || event.metaKey || event.ctrlKey || event.altKey) return;

    const handled = handleSnakeDirection(event.key.toLowerCase());
    if (handled) {
      event.preventDefault();
    }
  });

  syncBestScore();
  resetSnake(false);
}

const mergeGridRoot = document.querySelector("#merge-grid-game");

if (mergeGridRoot) {
  const bestKey = "mergeGridBestV1";
  const size = 4;
  const cellsRoot = document.querySelector("#merge-cells");
  const tilesRoot = document.querySelector("#merge-tiles");
  const scoreValue = document.querySelector("#merge-score");
  const bestValue = document.querySelector("#merge-best");
  const statusText = document.querySelector("#merge-status-text");
  const topline = document.querySelector("#merge-topline");
  const gauge = document.querySelector("#merge-gauge");
  const newGameButton = document.querySelector("#merge-new-game");
  const overlay = document.querySelector("#merge-overlay");
  const finalScoreValue = document.querySelector("#merge-final-score");
  const finalBestValue = document.querySelector("#merge-final-best");
  const overlayRestartButton = document.querySelector("#merge-overlay-restart");

  let board = [];
  let score = 0;
  let bestScore = Number.parseInt(window.localStorage.getItem(bestKey) ?? "0", 10) || 0;
  let won = false;
  let gameOver = false;

  cellsRoot.innerHTML = "";
  for (let index = 0; index < size * size; index += 1) {
    const cell = document.createElement("div");
    cell.className = "merge-grid-cell";
    cellsRoot.append(cell);
  }

  function hideOverlay() {
    overlay.hidden = true;
  }

  function showOverlay() {
    overlay.hidden = false;
  }

  function emptyBoard() {
    return Array.from({ length: size }, () => Array(size).fill(0));
  }

  function cloneBoard(source) {
    return source.map((row) => [...row]);
  }

  function randomEmptyCell() {
    const empty = [];

    board.forEach((row, rowIndex) => {
      row.forEach((value, columnIndex) => {
        if (!value) {
          empty.push({ row: rowIndex, col: columnIndex });
        }
      });
    });

    if (!empty.length) return null;
    return empty[Math.floor(Math.random() * empty.length)];
  }

  function addRandomTile() {
    const cell = randomEmptyCell();
    if (!cell) return;

    board[cell.row][cell.col] = Math.random() < 0.9 ? 2 : 4;
  }

  function syncScores() {
    scoreValue.textContent = String(score);
    bestValue.textContent = String(bestScore);
    finalBestValue.textContent = String(bestScore);
    gauge.style.setProperty("--value", `${Math.min(100, 12 + score / 40)}%`);
  }

  function getTileMetrics() {
    const gap = Number.parseFloat(window.getComputedStyle(cellsRoot).gap) || 12.8;
    const rect = tilesRoot.getBoundingClientRect();
    const cellSize = (rect.width - gap * (size - 1)) / size;
    const step = cellSize + gap;

    return { cellSize, step };
  }

  function findMatchIndex(candidates, targetRow, targetCol) {
    if (!candidates.length) return -1;

    let bestIndex = 0;
    let bestDistance = Number.POSITIVE_INFINITY;
    candidates.forEach((candidate, index) => {
      const distance = Math.abs(candidate.row - targetRow) + Math.abs(candidate.col - targetCol);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = index;
      }
    });

    return bestIndex;
  }

  function renderBoard(previousBoard = null, pops = []) {
    tilesRoot.innerHTML = "";
    const popSet = new Set(pops.map(([row, col]) => `${row},${col}`));
    const previousPositions = new Map();
    const { cellSize, step } = getTileMetrics();

    if (previousBoard) {
      previousBoard.forEach((row, rowIndex) => {
        row.forEach((value, columnIndex) => {
          if (!value) return;
          const key = String(value);
          const list = previousPositions.get(key) ?? [];
          list.push({ row: rowIndex, col: columnIndex });
          previousPositions.set(key, list);
        });
      });
    }

    board.forEach((row, rowIndex) => {
      row.forEach((value, columnIndex) => {
        if (!value) return;

        const tile = document.createElement("div");
        tile.className = "merge-grid-tile";
        if (popSet.has(`${rowIndex},${columnIndex}`)) {
          tile.classList.add("merge-pop");
        }

        tile.dataset.value = String(value);
        tile.textContent = String(value);
        tile.style.width = `${cellSize}px`;
        tile.style.height = `${cellSize}px`;
        tile.style.left = `${columnIndex * step}px`;
        tile.style.top = `${rowIndex * step}px`;
        tilesRoot.append(tile);

        const key = String(value);
        const matches = previousPositions.get(key) ?? [];
        const matchIndex = findMatchIndex(matches, rowIndex, columnIndex);
        const previous = matchIndex >= 0 ? matches.splice(matchIndex, 1)[0] : null;
        const deltaX = previous ? (previous.col - columnIndex) * step : 0;
        const deltaY = previous ? (previous.row - rowIndex) * step : 0;

        if (previous && (deltaX !== 0 || deltaY !== 0)) {
          tile.animate(
            [
              { transform: `translate(${deltaX}px, ${deltaY}px)` },
              { transform: "translate(0px, 0px)" },
            ],
            {
              duration: 260,
              easing: "cubic-bezier(0.2, 0.85, 0.22, 1)",
            },
          );
        }
      });
    });

    syncScores();
  }

  function updateStatus(message) {
    statusText.textContent = message;
    topline.textContent = gameOver ? "NO MOVES" : won ? "2048 REACHED" : `SCORE ${score}`;
  }

  function slideAndMerge(line) {
    const compact = line.filter(Boolean);
    const merged = [];
    const pops = [];
    let gained = 0;

    for (let index = 0; index < compact.length; index += 1) {
      const current = compact[index];
      const next = compact[index + 1];

      if (current && current === next) {
        const mergedValue = current * 2;
        merged.push(mergedValue);
        gained += mergedValue;
        pops.push(merged.length - 1);
        index += 1;
      } else {
        merged.push(current);
      }
    }

    while (merged.length < size) {
      merged.push(0);
    }

    return { line: merged, gained, pops };
  }

  function boardsEqual(first, second) {
    return first.every((row, rowIndex) => row.every((value, columnIndex) => value === second[rowIndex][columnIndex]));
  }

  function canMove() {
    for (let row = 0; row < size; row += 1) {
      for (let col = 0; col < size; col += 1) {
        const value = board[row][col];
        if (!value) return true;
        if (col < size - 1 && value === board[row][col + 1]) return true;
        if (row < size - 1 && value === board[row + 1][col]) return true;
      }
    }

    return false;
  }

  function move(direction) {
    if (gameOver) return;

    const previousBoard = cloneBoard(board);
    let nextBoard = emptyBoard();
    let gained = 0;
    const pops = [];

    if (direction === "left" || direction === "right") {
      for (let row = 0; row < size; row += 1) {
        const source = [...board[row]];
        const working = direction === "right" ? source.reverse() : source;
        const result = slideAndMerge(working);
        let line = result.line;

        if (direction === "right") {
          line = [...line].reverse();
          result.pops.forEach((index) => pops.push([row, size - 1 - index]));
        } else {
          result.pops.forEach((index) => pops.push([row, index]));
        }

        nextBoard[row] = line;
        gained += result.gained;
      }
    } else {
      for (let col = 0; col < size; col += 1) {
        const source = board.map((row) => row[col]);
        const working = direction === "down" ? source.reverse() : source;
        const result = slideAndMerge(working);
        let line = result.line;

        if (direction === "down") {
          line = [...line].reverse();
          result.pops.forEach((index) => pops.push([size - 1 - index, col]));
        } else {
          result.pops.forEach((index) => pops.push([index, col]));
        }

        line.forEach((value, rowIndex) => {
          nextBoard[rowIndex][col] = value;
        });
        gained += result.gained;
      }
    }

    if (boardsEqual(previousBoard, nextBoard)) {
      return;
    }

    board = nextBoard;
    score += gained;
    bestScore = Math.max(bestScore, score);
    window.localStorage.setItem(bestKey, String(bestScore));
    addRandomTile();

    if (!won && board.some((row) => row.some((value) => value >= 2048))) {
      won = true;
      updateStatus("You reached 2048! Keep going if you want a bigger score.");
    } else if (!canMove()) {
      gameOver = true;
      finalScoreValue.textContent = String(score);
      finalBestValue.textContent = String(bestScore);
      renderBoard(previousBoard, pops);
      updateStatus("No moves left. Start a new game to try again.");
      showOverlay();
      return;
    } else {
      updateStatus(gained ? `Merged tiles for +${gained} points.` : "Board shifted.");
    }

    renderBoard(previousBoard, pops);
  }

  function startGame() {
    board = emptyBoard();
    score = 0;
    won = false;
    gameOver = false;
    hideOverlay();
    addRandomTile();
    addRandomTile();
    renderBoard();
    updateStatus("Combine matching tiles to climb higher.");
  }

  function handleInput(key) {
    const directionMap = {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
      w: "up",
      a: "left",
      s: "down",
      d: "right",
    };

    const direction = directionMap[key];
    if (!direction) return false;

    move(direction);
    return true;
  }

  newGameButton.addEventListener("click", startGame);
  overlayRestartButton.addEventListener("click", startGame);

  window.addEventListener("keydown", (event) => {
    const isTyping = ["INPUT", "TEXTAREA", "SELECT"].includes(event.target?.tagName);
    if (isTyping || event.metaKey || event.ctrlKey || event.altKey) return;

    if (handleInput(event.key)) {
      event.preventDefault();
    }
  });

  window.addEventListener("resize", () => {
    renderBoard();
  });

  startGame();
}
