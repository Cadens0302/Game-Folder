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

  const villageVersion = 4;
  const villagePlaces = [
    { name: "Sword Shop", kind: "weapon", x: -18, y: -10, w: 5, h: 4, color: "#ffb07c", sign: "SWORDS" },
    { name: "Armor Shop", kind: "armor", x: -18, y: -2, w: 5, h: 4, color: "#95c8ff", sign: "ARMOR" },
    { name: "Snack Shop", kind: "supply", x: -18, y: 7, w: 5, h: 4, color: "#ffe06b", sign: "SNACKS" },
    { name: "Upgrade Hall", kind: "upgrade", x: 13, y: -10, w: 5, h: 4, color: "#d4b2ff", sign: "UPGRADE" },
    { name: "Artifact Booth", kind: "artifact", x: 13, y: -2, w: 5, h: 4, color: "#fff7ad", sign: "ARTIFACTS" },
    { name: "Quest Board", kind: "quest", x: 13, y: 7, w: 5, h: 4, color: "#91e891", sign: "QUESTS" },
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
    weaponCard: document.querySelector("#weapon-card"),
    armorName: document.querySelector("#armor-name"),
    armorDetails: document.querySelector("#armor-details"),
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
    };
  }

  function drawTree(context, screenX, screenY, variant = 0) {
    context.fillStyle = "#7b5b35";
    context.fillRect(screenX + 9, screenY + 12, 6, 10);
    context.fillStyle = variant % 2 === 0 ? "#4fbf63" : "#63d478";
    context.fillRect(screenX + 4, screenY + 4, 16, 10);
    context.fillRect(screenX + 1, screenY + 10, 22, 8);
    context.fillRect(screenX + 7, screenY, 10, 8);
    context.fillStyle = "#fff4a3";
    if (variant % 3 === 0) context.fillRect(screenX + 16, screenY + 8, 3, 3);
  }

  function drawFlowers(context, screenX, screenY, color) {
    context.fillStyle = color;
    context.fillRect(screenX + 5, screenY + 5, 3, 3);
    context.fillRect(screenX + 14, screenY + 12, 3, 3);
    context.fillRect(screenX + 8, screenY + 17, 3, 3);
    context.fillStyle = "#fff4a3";
    context.fillRect(screenX + 6, screenY + 6, 1, 1);
    context.fillRect(screenX + 15, screenY + 13, 1, 1);
    context.fillRect(screenX + 9, screenY + 18, 1, 1);
  }

  function drawLamp(context, screenX, screenY, time = 0) {
    const glow = Math.round(Math.sin(time / 280 + screenX) * 1);
    context.fillStyle = "#594531";
    context.fillRect(screenX + 10, screenY + 8, 4, 16);
    context.fillStyle = "#2d3436";
    context.fillRect(screenX + 6, screenY + 22, 12, 3);
    context.fillStyle = "#fff4a3";
    context.fillRect(screenX + 6, screenY + 2 + glow, 12, 9);
    context.fillStyle = "#ffffff";
    context.fillRect(screenX + 8, screenY + 4 + glow, 4, 3);
    context.strokeStyle = "#35505f";
    context.lineWidth = 1;
    context.strokeRect(screenX + 6, screenY + 2 + glow, 12, 9);
  }

  function drawPlanter(context, screenX, screenY, flowerColor) {
    context.fillStyle = "#a86d3c";
    context.fillRect(screenX + 2, screenY + 13, 20, 8);
    context.fillStyle = "#6b4a2e";
    context.fillRect(screenX + 4, screenY + 11, 16, 4);
    context.fillStyle = "#4fbf63";
    context.fillRect(screenX + 5, screenY + 7, 4, 6);
    context.fillRect(screenX + 13, screenY + 6, 4, 7);
    context.fillStyle = flowerColor;
    context.fillRect(screenX + 4, screenY + 5, 5, 4);
    context.fillRect(screenX + 12, screenY + 4, 5, 4);
  }

  function drawCrate(context, screenX, screenY, color) {
    context.fillStyle = "#7b5b35";
    context.fillRect(screenX, screenY, 15, 13);
    context.fillStyle = color;
    context.fillRect(screenX + 3, screenY + 2, 9, 7);
    context.strokeStyle = "#4f3825";
    context.lineWidth = 1;
    context.strokeRect(screenX, screenY, 15, 13);
    context.strokeRect(screenX + 3, screenY + 2, 9, 7);
  }

  function drawBench(context, screenX, screenY) {
    context.fillStyle = "#7b5b35";
    context.fillRect(screenX + 2, screenY + 9, 28, 5);
    context.fillRect(screenX + 4, screenY + 16, 24, 5);
    context.fillStyle = "#4f3825";
    context.fillRect(screenX + 6, screenY + 21, 4, 9);
    context.fillRect(screenX + 22, screenY + 21, 4, 9);
    context.fillStyle = "#f5dba2";
    context.fillRect(screenX + 4, screenY + 10, 6, 2);
    context.fillRect(screenX + 14, screenY + 17, 7, 2);
  }

  function drawMarketStall(context, screenX, screenY, color) {
    context.fillStyle = "#7b5b35";
    context.fillRect(screenX + 5, screenY + 14, 4, 24);
    context.fillRect(screenX + 30, screenY + 14, 4, 24);
    context.fillStyle = "#fffdf0";
    context.fillRect(screenX + 2, screenY + 8, 36, 9);
    context.fillStyle = color;
    for (let stripe = 0; stripe < 4; stripe += 1) {
      context.fillRect(screenX + 2 + stripe * 9, screenY + 8, 6, 9);
    }
    context.strokeStyle = "#35505f";
    context.lineWidth = 1;
    context.strokeRect(screenX + 2, screenY + 8, 36, 9);
    context.fillStyle = "#d4b37a";
    context.fillRect(screenX + 8, screenY + 30, 24, 9);
    context.fillStyle = "#ff7aa8";
    context.fillRect(screenX + 11, screenY + 25, 5, 5);
    context.fillStyle = "#fff4a3";
    context.fillRect(screenX + 19, screenY + 24, 5, 5);
    context.fillStyle = "#78dd7a";
    context.fillRect(screenX + 26, screenY + 26, 5, 5);
  }

  function drawSignpost(context, screenX, screenY, label) {
    context.fillStyle = "#7b5b35";
    context.fillRect(screenX + 14, screenY + 18, 5, 24);
    context.fillStyle = "#fffdf0";
    context.strokeStyle = "#35505f";
    context.lineWidth = 2;
    drawSoftRect(context, screenX, screenY + 4, 34, 18, 5);
    context.fillStyle = "#35505f";
    context.font = "800 8px JetBrains Mono, monospace";
    context.textAlign = "center";
    context.fillText(label, screenX + 17, screenY + 16);
  }

  function drawMountainTile(context, screenX, screenY, neighbors) {
    context.fillStyle = "#727b88";
    context.fillRect(screenX, screenY, 24, 24);

    context.fillStyle = "#5f6772";
    if (!neighbors.north) {
      context.fillRect(screenX + 6, screenY, 12, 5);
      context.fillRect(screenX + 3, screenY + 3, 6, 3);
      context.fillRect(screenX + 15, screenY + 3, 6, 3);
    }

    if (!neighbors.west) {
      context.fillRect(screenX, screenY + 5, 4, 14);
    }

    if (!neighbors.east) {
      context.fillRect(screenX + 20, screenY + 5, 4, 14);
    }

    if (!neighbors.south) {
      context.fillStyle = "#535b66";
      context.fillRect(screenX, screenY + 19, 24, 5);
    }

    context.fillStyle = "#808996";
    context.fillRect(screenX + 2, screenY + 8, 6, 5);
    context.fillRect(screenX + 8, screenY + 7, 5, 4);
    context.fillRect(screenX + 13, screenY + 9, 6, 5);
    context.fillRect(screenX + 5, screenY + 13, 5, 4);
    context.fillRect(screenX + 10, screenY + 12, 6, 5);
    context.fillRect(screenX + 16, screenY + 14, 5, 4);

    context.fillStyle = "#dce5f4";
    context.fillRect(screenX + 8, screenY + 3, 4, 2);
    context.fillRect(screenX + 14, screenY + 7, 3, 2);
    context.fillRect(screenX + 5, screenY + 10, 2, 2);
    context.fillRect(screenX + 12, screenY + 13, 2, 2);
  }

  function drawWaterTile(context, screenX, screenY, neighbors, deepColor, lightColor) {
    context.fillStyle = deepColor;
    context.fillRect(screenX, screenY, 24, 24);
    context.fillStyle = lightColor;

    context.fillRect(screenX, screenY + (neighbors.north ? 4 : 2), 24, 2);
    context.fillRect(screenX + 2, screenY + 10, 20, 2);
    context.fillRect(screenX, screenY + 17, 18, 2);
    context.fillRect(screenX + 10, screenY + 21, 10, 1);
  }

  function drawRiverTile(context, screenX, screenY, neighbors) {
    drawWaterTile(context, screenX, screenY, neighbors, "#5aaee8", "#d9f7ff");
  }

  function drawLakeTile(context, screenX, screenY, neighbors) {
    drawWaterTile(context, screenX, screenY, neighbors, "#4a99db", "#8fd7ff");
  }

  function drawCrossingTile(context, screenX, screenY, type, neighbors) {
    if (type === "bridge") {
      drawRiverTile(context, screenX, screenY, neighbors);
      context.fillStyle = "#8a613c";
      context.fillRect(screenX + 4, screenY, 16, 24);
      context.fillStyle = "#c79b58";
      for (let plank = 0; plank < 4; plank += 1) {
        context.fillRect(screenX + 6, screenY + 1 + plank * 6, 12, 5);
      }
      context.fillStyle = "#5e4025";
      context.fillRect(screenX + 5, screenY + 1, 2, 22);
      context.fillRect(screenX + 17, screenY + 1, 2, 22);
    } else if (type === "stones") {
      drawRiverTile(context, screenX, screenY, neighbors);
      context.fillStyle = "#f4e7b8";
      context.fillRect(screenX + 4, screenY + 12, 5, 4);
      context.fillRect(screenX + 10, screenY + 7, 5, 4);
      context.fillRect(screenX + 16, screenY + 13, 4, 4);
    } else if (type === "causeway") {
      drawLakeTile(context, screenX, screenY, neighbors);
      context.fillStyle = "#e8d39a";
      context.fillRect(screenX + 6, screenY, 12, 24);
      context.fillStyle = "#d2b876";
      context.fillRect(screenX + 8, screenY + 4, 8, 3);
      context.fillRect(screenX + 8, screenY + 13, 8, 3);
    } else if (type === "pass") {
      context.fillStyle = "#ccb989";
      context.fillRect(screenX, screenY, 24, 24);
      context.fillStyle = "#e8d39a";
      context.fillRect(screenX + 4, screenY + 4, 16, 16);
      context.fillStyle = "#d2b876";
      context.fillRect(screenX + 7, screenY + 9, 10, 3);
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

  function drawHudBar(context, x, y, label, valueText, percent, fillColor) {
    const safePercent = Math.max(0, Math.min(1, percent));
    const barWidth = 150;
    const barHeight = 18;

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
    context.fillStyle = fillColor;
    context.fillRect(x + 53, y + 11, Math.round((barWidth - 6) * safePercent), barHeight - 6);
    context.fillStyle = "rgba(255, 255, 255, 0.55)";
    context.fillRect(x + 53, y + 11, Math.round((barWidth - 6) * safePercent), 3);
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

      return { ...defaultState(), ...JSON.parse(saved) };
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
      state.currentPath = "foundry";
      state.enemy = getScaledEnemy();
      addLog("Entered Sword Shop. The shopkeeper prepared a sword challenge.");
    } else if (nearbyPlace.kind === "armor") {
      state.currentPath = "citadel";
      state.enemy = getScaledEnemy();
      addLog("Entered Armor Shop. A shield trial is ready.");
    } else if (nearbyPlace.kind === "supply") {
      addLog("Entered Snack Shop.");
      rest();
      return;
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
      state.enemy = getScaledEnemy();
      addLog("Entered Quest Board. A friendly challenge has started.");
      fight();
      return;
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
    addLog("All saved data cleared. New run initialized.");
    saveAndRender();
  }

  function renderGearCard(card, nameElement, detailsElement, item) {
    const stat = item.type === "weapon" ? `Attack ${item.attack}` : `Defense ${item.defense}`;

    card.dataset.rarity = item.rarity;
    nameElement.textContent = item.name;
    detailsElement.textContent = `${rarities[item.rarity].label} - ${stat}`;
  }

  function renderInventory() {
    elements.inventory.innerHTML = "";

    if (!state.inventory.length) {
      const empty = document.createElement("p");
      empty.className = "inventory-empty";
      empty.textContent = "No spare gear yet. Win friendly challenges to earn pixel swords and armor.";
      elements.inventory.append(empty);
      return;
    }

    state.inventory.forEach((item) => {
      const row = document.createElement("article");
      const stat = item.type === "weapon" ? `Attack ${item.attack}` : `Defense ${item.defense}`;
      const value = getGearValue(item);

      row.className = "inventory-item";
      row.dataset.rarity = item.rarity;
      row.innerHTML = `
        <div>
          <p class="card-kicker">${rarities[item.rarity].label} ${item.type}</p>
          <h3>${item.name}</h3>
          <p>${stat} - Trade value ${value} XP</p>
        </div>
        <div class="inventory-actions">
          <button class="button secondary" type="button" data-equip="${item.id}">Equip</button>
          <button class="button secondary" type="button" data-trade="${item.id}">Trade</button>
        </div>
      `;
      elements.inventory.append(row);
    });
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

    context.fillStyle = "#9be878";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "#8adc6f";
    for (let y = cameraY - visibleRadiusY; y <= cameraY + visibleRadiusY; y += 1) {
      for (let x = cameraX - visibleRadiusX; x <= cameraX + visibleRadiusX; x += 1) {
        const screen = toScreen(x, y);
        if ((x + y) % 3 === 0) {
          context.fillRect(screen.x, screen.y, tileSize, tileSize);
        }
        if ((x * 7 + y * 11) % 5 === 0) {
          context.fillStyle = "#74cf65";
          context.fillRect(screen.x + 4, screen.y + 6, 4, 2);
          context.fillRect(screen.x + 15, screen.y + 16, 5, 2);
          context.fillStyle = "#8adc6f";
        }
        if ((x * 13 - y * 3) % 11 === 0) {
          context.fillStyle = "#fff4a3";
          context.fillRect(screen.x + 11, screen.y + 8, 2, 2);
          context.fillStyle = "#ff7aa8";
          context.fillRect(screen.x + 13, screen.y + 8, 2, 2);
          context.fillStyle = "#8adc6f";
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

        if (terrain === "river") {
          drawRiverTile(context, screen.x, screen.y, waterNeighbors);
        } else if (terrain === "lake") {
          drawLakeTile(context, screen.x, screen.y, waterNeighbors);
        } else if (terrain === "mountain") {
          drawMountainTile(context, screen.x, screen.y, mountainNeighbors);
        } else {
          drawCrossingTile(context, screen.x, screen.y, terrain, waterNeighbors);
        }
      }
    }

    const drawPathTile = (x, y, accentX = 7, accentY = 10) => {
      if (Math.abs(x) <= 6 && Math.abs(y) <= 5) {
        return;
      }

      const screen = toScreen(x, y);
      context.fillStyle = "#e8d39a";
      context.fillRect(screen.x, screen.y, tileSize, tileSize);
      context.fillStyle = "#d2b876";
      context.fillRect(screen.x + accentX, screen.y + accentY, 7, 3);
      context.fillRect(screen.x + Math.min(tileSize - 7, accentX + 8), screen.y + Math.max(3, accentY - 6), 5, 3);
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
      [-11, -7], [-4, -7], [4, -7], [11, -7],
      [-11, 7], [-4, 7], [4, 7], [11, 7],
      [-16, -1], [-16, 4], [16, -1], [16, 4],
      [-7, 0], [7, 0], [0, -11], [0, 10],
    ];
    lampPosts.forEach(([x, y]) => {
      const screen = toScreen(x, y);
      drawLamp(context, screen.x, screen.y, time);
    });

    context.fillStyle = "#f4e7b8";
    const plazaTopLeft = toScreen(-8, -6);
    context.fillRect(plazaTopLeft.x, plazaTopLeft.y, tileSize * 17, tileSize * 13);
    context.fillStyle = "#ead49c";
    for (let y = -6; y <= 6; y += 1) {
      for (let x = -8; x <= 8; x += 1) {
        if ((x + y) % 2 === 0 || (Math.abs(x) <= 2 && Math.abs(y) <= 2)) {
          const stone = toScreen(x, y);
          context.fillRect(stone.x + 3, stone.y + 3, tileSize - 6, tileSize - 6);
        }
      }
    }
    context.fillStyle = "#fff8dc";
    for (let x = -6; x <= 6; x += 3) {
      const sparkle = toScreen(x, -4 + ((x + 6) % 2));
      context.fillRect(sparkle.x + 11, sparkle.y + 10, 3, 3);
    }
    context.strokeStyle = "#b9985a";
    context.lineWidth = 2;
    context.strokeRect(plazaTopLeft.x, plazaTopLeft.y, tileSize * 17, tileSize * 13);

    const safeZoneTopLeft = toScreen(-22, -14);
    const safeZoneWidth = tileSize * 44;
    const safeZoneHeight = tileSize * 27;
    context.fillStyle = "rgba(79, 124, 255, 0.09)";
    context.fillRect(safeZoneTopLeft.x, safeZoneTopLeft.y, safeZoneWidth, safeZoneHeight);
    context.strokeStyle = "#249dff";
    context.lineWidth = 6;
    context.strokeRect(safeZoneTopLeft.x - 4, safeZoneTopLeft.y - 4, safeZoneWidth + 8, safeZoneHeight + 8);
    context.strokeStyle = "#d9f7ff";
    context.lineWidth = 2;
    context.strokeRect(safeZoneTopLeft.x + 5, safeZoneTopLeft.y + 5, safeZoneWidth - 10, safeZoneHeight - 10);

    const villageDetails = [
      [-12, -11, "stall", "#ffb07c"], [-7, -11, "stall", "#95c8ff"], [6, -11, "stall", "#d4b2ff"], [11, -11, "stall", "#91e891"],
      [-12, 10, "stall", "#ffe06b"], [-7, 10, "stall", "#ff8f8f"], [6, 10, "stall", "#82b8ff"], [11, 10, "stall", "#fff4a3"],
      [-9, -6, "bench"], [-3, -6, "bench"], [2, -6, "bench"], [8, -6, "bench"],
      [-9, 5, "bench"], [-3, 5, "bench"], [2, 5, "bench"], [8, 5, "bench"],
      [-19, -12, "sign", "INN"], [-19, 10, "sign", "PARK"], [17, -12, "sign", "MAP"], [17, 10, "sign", "DOCK"],
      [-20, -13, "flower"], [-17, -13, "flower"], [-13, -13, "flower"], [12, -13, "flower"], [16, -13, "flower"], [19, -13, "flower"],
      [-20, 12, "flower"], [-16, 12, "flower"], [-12, 12, "flower"], [12, 12, "flower"], [16, 12, "flower"], [19, 12, "flower"],
      [-6, -2, "crate", "#ff7aa8"], [5, -2, "crate", "#82b8ff"], [-6, 2, "crate", "#fff4a3"], [5, 2, "crate", "#78dd7a"],
      [-14, -4, "crate", "#ffcf5c"], [-14, 4, "crate", "#95c8ff"], [13, -4, "crate", "#d4b2ff"], [13, 4, "crate", "#ffb07c"],
    ];

    villageDetails.forEach(([x, y, type, detail], index) => {
      const screen = toScreen(x, y);

      if (type === "stall") {
        drawMarketStall(context, screen.x - 7, screen.y - 10, detail);
      } else if (type === "bench") {
        drawBench(context, screen.x - 4, screen.y - 3);
      } else if (type === "sign") {
        drawSignpost(context, screen.x - 5, screen.y - 9, detail);
      } else if (type === "crate") {
        drawCrate(context, screen.x + 4, screen.y + 6, detail);
      } else {
        drawFlowers(context, screen.x, screen.y, index % 2 === 0 ? "#ff7aa8" : "#fff4a3");
      }
    });

    const scenery = [
      [-21, -13, "tree"], [-18, -13, "tree"], [-6, -13, "tree"], [6, -13, "tree"], [18, -13, "tree"], [21, -13, "tree"],
      [-21, 11, "tree"], [-18, 11, "tree"], [-6, 11, "tree"], [6, 11, "tree"], [18, 11, "tree"], [21, 11, "tree"],
      [-20, -6, "flower"], [-20, -1, "flower"], [-20, 5, "flower"], [19, -6, "flower"], [19, -1, "flower"], [19, 5, "flower"],
      [-12, -1, "flower"], [-10, -1, "flower"], [9, -1, "flower"], [11, -1, "flower"],
      [-2, -9, "flower"], [2, -9, "flower"], [-2, 8, "flower"], [2, 8, "flower"],
      [-15, -9, "tree"], [15, -9, "tree"], [-15, 8, "tree"], [15, 8, "tree"],
    ];

    scenery.forEach(([x, y, type], index) => {
      const screen = toScreen(x, y);
      if (type === "tree") {
        drawTree(context, screen.x, screen.y, index);
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

    context.fillStyle = "rgba(60, 87, 110, 0.18)";
    drawSoftRect(context, fountainCenterX - tileSize * 2 + 6, fountainCenterY + tileSize + 6, tileSize * 4 - 12, 12, 8);

    context.fillStyle = "#b38958";
    context.strokeStyle = "#7f5e37";
    context.lineWidth = 3;
    drawSoftRect(context, fountainCenterX - tileSize * 2, fountainCenterY - tileSize * 2, tileSize * 4, tileSize * 4, 24);
    context.fillStyle = "#e7d0a6";
    drawSoftRect(context, fountainCenterX - tileSize * 2 + 6, fountainCenterY - tileSize * 2 + 6, tileSize * 4 - 12, tileSize * 4 - 12, 20);

    context.fillStyle = "#7fc8ff";
    drawSoftRect(context, fountainCenterX - tileSize * 1.5, fountainCenterY - tileSize * 1.45, tileSize * 3, tileSize * 3, 18);
    context.fillStyle = "#b7ebff";
    drawSoftRect(context, fountainCenterX - tileSize * 1.1, fountainCenterY - tileSize * 1.05, tileSize * 2.2, tileSize * 2.2, 16);

    context.fillStyle = "#c2a37d";
    context.strokeStyle = "#7f5e37";
    drawSoftRect(context, fountainCenterX - 10, fountainCenterY - tileSize * 1.5, 20, tileSize * 2.2, 8);
    drawSoftRect(context, fountainCenterX - 18, fountainCenterY - 10, 36, 16, 8);
    context.fillStyle = "#e9dcc1";
    drawSoftRect(context, fountainCenterX - 24, fountainCenterY + 8, 48, 14, 8);

    const splashBob = Math.round(Math.sin(time / 220) * 2);
    context.fillStyle = "#ffffff";
    context.fillRect(fountainCenterX - 3, fountainCenterY - tileSize * 1.9 + splashBob, 6, tileSize + 4);
    context.fillRect(fountainCenterX - 16, fountainCenterY - 4, 4, 11);
    context.fillRect(fountainCenterX + 12, fountainCenterY - 4, 4, 11);
    context.fillStyle = "#7fe0ff";
    context.fillRect(fountainCenterX - 2, fountainCenterY - tileSize * 1.75 + splashBob, 4, tileSize + 3);
    context.fillRect(fountainCenterX - 15, fountainCenterY - 2, 2, 9);
    context.fillRect(fountainCenterX + 13, fountainCenterY - 2, 2, 9);
    context.fillStyle = "#d9f7ff";
    context.fillRect(fountainCenterX - 14, fountainCenterY + tileSize - 4, 28, 4);

    const playerBob = Math.round(Math.sin(time / 190) * 1);
    context.save();
    context.translate(centerX + 12, centerY + 12 + playerBob);
    context.shadowBlur = 0;
    context.fillStyle = "#3a2f5f";
    context.fillRect(-9, -20, 18, 7);
    context.fillStyle = "#ffd1a8";
    context.fillRect(-8, -14, 16, 10);
    context.strokeStyle = "#253052";
    context.lineWidth = 2;
    context.strokeRect(-8, -14, 16, 10);
    context.fillStyle = "#4f7cff";
    context.fillRect(-8, -4, 16, 15);
    context.strokeRect(-8, -4, 16, 15);
    context.fillStyle = "#ffcf5c";
    context.fillRect(-10, -2, 3, 10);
    context.fillRect(7, -2, 3, 10);
    context.fillStyle = "#2f3a56";
    context.fillRect(-6, 11, 5, 6);
    context.fillRect(1, 11, 5, 6);
    context.fillStyle = "#ffffff";
    context.fillRect(-4, -10, 3, 3);
    context.fillRect(3, -10, 3, 3);
    context.fillStyle = "#253052";
    context.fillRect(-3, -6, 7, 2);
    context.restore();

    const hpPercent = state.maxHp > 0 ? state.hp / state.maxHp : 0;
    const xpProgress = (state.totalXp % 120) / 120;
    drawHudBar(context, 12, 12, "HP", `${state.hp}/${state.maxHp}`, hpPercent, "#ff4757");
    drawHudBar(context, 12, 42, "XP", `${Math.round(xpProgress * 120)}/120`, xpProgress, "#4f7cff");

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
    elements.heroStatus.textContent = `${paths[state.currentPath].name} active. HP ${state.hp}/${state.maxHp}, XP ${state.xp}, artifacts ${state.artifacts?.length ?? 0}.`;

    renderGearCard(elements.weaponCard, elements.weaponName, elements.weaponDetails, state.weapon);
    renderGearCard(elements.armorCard, elements.armorName, elements.armorDetails, state.armor);

    elements.log.innerHTML = state.log.map((entry) => `<p>${entry}</p>`).join("");
    renderWorld();
    renderInventory();
  }

  function animateWorld() {
    renderWorld();
    window.requestAnimationFrame(animateWorld);
  }

  function saveAndRender() {
    saveState();
    render();
  }

  elements.fight.addEventListener("click", fight);
  elements.quickFight.addEventListener("click", fight);
  elements.rest.addEventListener("click", rest);
  elements.clearSave.addEventListener("click", clearSave);
  elements.generateMap.addEventListener("click", generateNewMap);
  elements.fullscreen.addEventListener("click", toggleFullscreen);
  elements.inventoryToggle.addEventListener("click", toggleInventory);

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

  ensureWorldData();
  state.enemy = state.enemy ?? getScaledEnemy();
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
