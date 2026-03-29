const SVG_NS = "http://www.w3.org/2000/svg";
const STAGE = {
  width: 1200,
  height: 640,
  floorY: 500,
  leftBound: 90,
  rightBound: 1110,
  minGap: 68,
  gravity: 1.08,
  baseMeterGain: 0.008
};

const roster = [
  {
    id: "ryu",
    name: "隆",
    title: "波动与升龙的正统格斗家",
    intro: "以波动拳压制中距离，用升龙拳反击对手的贸然突进。",
    trait: "平衡型：防守最稳，波动拳轨迹最扎实。",
    stats: { health: 106, speed: 4.2, jump: 8.7, power: 8.6, defense: 9.1, meterGain: 0.96, airControl: 0.2, weight: 1.08, damageTaken: 0.96 },
    palette: {
      primary: "#f2eee9",
      secondary: "#df4141",
      trim: "#233048",
      aura: "#71b8ff",
      skin: "#f0c9a9",
      dark: "#1f2129"
    },
    costume: {
      hair: "M -18 -152 L -6 -176 L 0 -162 L 8 -180 L 20 -152 L 12 -136 Q 0 -142 -14 -136 Z",
      emblem: "M -10 -104 L 0 -118 L 10 -104 L 4 -84 H -4 Z",
      belt: "#11161f"
    },
    moves: {
      light: { label: "中段正拳", damage: 6, reach: 82, height: 98, startup: 60, active: 88, recovery: 170, push: 4.8, stun: 220 },
      heavy: { label: "龙卷旋风脚", damage: 10, reach: 112, height: 108, startup: 110, active: 110, recovery: 320, dash: 7, push: 9.8, stun: 340 },
      skill1: {
        label: "波动拳",
        kind: "projectile",
        damage: 10,
        meterCost: 18,
        cooldown: 850,
        castTime: 150,
        recovery: 360,
        projectileSpeed: 8.8,
        projectileRadius: 20,
        projectileHeight: 116,
        projectileShape: "classic",
        projectileWaveAmp: 0.8,
        projectileWaveSpeed: 0.12,
        projectileLife: 2100,
        push: 7.2,
        stun: 300
      },
      skill2: {
        label: "升龙拳",
        kind: "burst",
        damage: 15,
        meterCost: 28,
        cooldown: 1500,
        startup: 78,
        active: 130,
        recovery: 420,
        burstSpeed: 4.6,
        burstLift: 10.4,
        reach: 88,
        height: 152,
        push: 11.5,
        stun: 420
      }
    }
  },
  {
    id: "ken",
    name: "肯",
    title: "烈焰升龙的进攻型格斗家",
    intro: "压迫感更强，火焰波动与烈火升龙更适合主动逼近。",
    trait: "突进型：前压更强，重击和升龙前冲更明显。",
    stats: { health: 98, speed: 4.7, jump: 9.1, power: 9.1, defense: 8.1, meterGain: 1.02, airControl: 0.24, weight: 0.98, damageTaken: 1.04 },
    palette: {
      primary: "#cb3432",
      secondary: "#ffd35a",
      trim: "#6a1909",
      aura: "#ff9a4c",
      skin: "#efc4a5",
      dark: "#c5a037"
    },
    costume: {
      hair: "M -20 -150 L -10 -182 L 2 -160 L 12 -184 L 24 -150 L 12 -134 Q 2 -138 -18 -132 Z",
      emblem: "M -14 -102 L -2 -118 L 14 -100 L 0 -84 Z",
      belt: "#ffd35a"
    },
    moves: {
      light: { label: "疾进正拳", damage: 6, reach: 84, height: 98, startup: 56, active: 90, recovery: 172, push: 5, stun: 230 },
      heavy: { label: "龙尾旋风脚", damage: 11, reach: 118, height: 110, startup: 96, active: 124, recovery: 300, dash: 8.6, push: 10.8, stun: 360 },
      skill1: {
        label: "火焰波动拳",
        kind: "projectile",
        damage: 11,
        meterCost: 20,
        cooldown: 900,
        castTime: 150,
        recovery: 370,
        projectileSpeed: 8.9,
        projectileRadius: 22,
        projectileHeight: 118,
        projectileShape: "flame",
        projectileWaveAmp: 1.6,
        projectileWaveSpeed: 0.16,
        projectileLife: 1950,
        push: 7.8,
        stun: 310
      },
      skill2: {
        label: "烈火升龙拳",
        kind: "burst",
        damage: 8,
        meterCost: 30,
        cooldown: 1480,
        startup: 70,
        active: 136,
        recovery: 430,
        burstSpeed: 5.4,
        burstLift: 10.8,
        reach: 90,
        height: 154,
        hits: 2,
        hitInterval: 72,
        push: 12.2,
        stun: 440
      }
    }
  },
  {
    id: "chunli",
    name: "春丽",
    title: "高速腿技与气功压制专家",
    intro: "依靠百裂脚抢节奏，用气功拳铺路，再以旋圆蹴追击。",
    trait: "速度型：轻击与旋圆蹴可多段命中，空中控制最佳。",
    stats: { health: 96, speed: 5.7, jump: 9.9, power: 7.7, defense: 8, meterGain: 1.08, airControl: 0.38, weight: 0.9, damageTaken: 1.03 },
    palette: {
      primary: "#2d78df",
      secondary: "#f9d870",
      trim: "#eff7ff",
      aura: "#7de5ff",
      skin: "#efcfaf",
      dark: "#3d251d"
    },
    costume: {
      hair: "M -24 -150 Q -14 -170 -4 -150 L 4 -168 L 14 -150 Q 28 -136 22 -126 Q 14 -124 8 -134 Q 2 -122 -4 -134 Q -10 -124 -20 -126 Z",
      emblem: "M -16 -98 H 16 L 8 -82 H -8 Z",
      belt: "#f9d870"
    },
    moves: {
      light: { label: "百裂脚", damage: 3, reach: 88, height: 106, startup: 40, active: 128, recovery: 150, hits: 3, hitInterval: 34, push: 3.2, stun: 120 },
      heavy: { label: "天升脚", damage: 8, reach: 98, height: 136, startup: 92, active: 100, recovery: 250, dash: 5.2, push: 8.4, stun: 290 },
      skill1: {
        label: "气功拳",
        kind: "projectile",
        damage: 9,
        meterCost: 16,
        cooldown: 840,
        castTime: 136,
        recovery: 340,
        projectileSpeed: 7.9,
        projectileRadius: 24,
        projectileHeight: 122,
        projectileShape: "disc",
        projectileWaveAmp: 0.3,
        projectileWaveSpeed: 0.08,
        projectileLife: 2000,
        push: 6.8,
        stun: 270
      },
      skill2: {
        label: "旋圆蹴",
        kind: "dash",
        damage: 5,
        meterCost: 28,
        cooldown: 1500,
        startup: 72,
        active: 180,
        recovery: 380,
        burstSpeed: 8.6,
        burstLift: 4.6,
        reach: 124,
        height: 128,
        hits: 3,
        hitInterval: 56,
        push: 11.3,
        stun: 360
      }
    }
  },
  {
    id: "vega",
    name: "维加",
    title: "精神力突进与压制的独裁者",
    intro: "用精神粉碎者和头压强行切入，近身则靠强势膝击压迫。",
    trait: "压制型：更厚更重，精神粉碎者带短暂无视硬直。",
    stats: { health: 112, speed: 4.15, jump: 8.2, power: 9.3, defense: 9.4, meterGain: 0.9, airControl: 0.18, weight: 1.16, damageTaken: 0.92 },
    palette: {
      primary: "#8d2232",
      secondary: "#d9dce3",
      trim: "#241c3f",
      aura: "#a56cff",
      skin: "#efc19e",
      dark: "#11121e"
    },
    costume: {
      hair: "M -20 -154 H 20 L 16 -138 H -16 Z",
      emblem: "M -12 -104 H 12 L 8 -88 H -8 Z",
      belt: "#d9dce3"
    },
    moves: {
      light: { label: "精神冲掌", damage: 7, reach: 86, height: 102, startup: 58, active: 90, recovery: 176, push: 5.8, stun: 240 },
      heavy: { label: "双膝压顶", damage: 11, reach: 110, height: 110, startup: 98, active: 116, recovery: 320, dash: 7.2, push: 11, stun: 350 },
      skill1: {
        label: "精神粉碎者",
        kind: "dash",
        damage: 8,
        meterCost: 24,
        cooldown: 1200,
        startup: 60,
        active: 168,
        recovery: 430,
        burstSpeed: 9.8,
        burstLift: 3.2,
        reach: 136,
        height: 122,
        hits: 2,
        hitInterval: 84,
        armor: true,
        armorStart: 46,
        armorEnd: 182,
        push: 12.6,
        stun: 380
      },
      skill2: {
        label: "头压",
        kind: "burst",
        damage: 16,
        meterCost: 30,
        cooldown: 1600,
        startup: 86,
        active: 140,
        recovery: 500,
        burstSpeed: 6.6,
        burstLift: 9.2,
        reach: 92,
        height: 156,
        push: 12.8,
        stun: 420
      }
    }
  },
  {
    id: "akuma",
    name: "豪鬼",
    title: "高火力爆发的修罗斗士",
    intro: "豪波动拳与豪升龙拳的压迫感极强，但体力相对更薄。",
    trait: "爆发型：伤害最高，波动压制最猛，但承伤也更高。",
    stats: { health: 90, speed: 5.25, jump: 10, power: 10.1, defense: 7.6, meterGain: 1.1, airControl: 0.32, weight: 0.92, damageTaken: 1.12 },
    palette: {
      primary: "#43323f",
      secondary: "#b5444c",
      trim: "#7b2027",
      aura: "#8f4eff",
      skin: "#d7a985",
      dark: "#d14335"
    },
    costume: {
      hair: "M -20 -148 L -10 -176 L 0 -158 L 10 -180 L 22 -150 L 12 -132 Q 2 -138 -18 -132 Z",
      emblem: "M -14 -98 L 0 -118 L 14 -98 L 0 -78 Z",
      belt: "#7b2027"
    },
    moves: {
      light: { label: "鬼烧手刀", damage: 7, reach: 84, height: 100, startup: 54, active: 92, recovery: 172, push: 5.1, stun: 230 },
      heavy: { label: "斩空旋踢", damage: 12, reach: 112, height: 114, startup: 104, active: 118, recovery: 330, dash: 7.2, push: 10.8, stun: 360 },
      skill1: {
        label: "豪波动拳",
        kind: "projectile",
        damage: 13,
        meterCost: 20,
        cooldown: 820,
        castTime: 140,
        recovery: 350,
        projectileSpeed: 10.4,
        projectileRadius: 22,
        projectileHeight: 118,
        projectileShape: "dark",
        projectileWaveAmp: 1.8,
        projectileWaveSpeed: 0.18,
        projectileLife: 2100,
        guardDamageRatio: 0.68,
        push: 8.2,
        stun: 320
      },
      skill2: {
        label: "豪升龙拳",
        kind: "burst",
        damage: 10,
        meterCost: 32,
        cooldown: 1450,
        startup: 68,
        active: 142,
        recovery: 450,
        burstSpeed: 5.3,
        burstLift: 11.2,
        reach: 92,
        height: 160,
        hits: 2,
        hitInterval: 68,
        push: 13,
        stun: 460
      }
    }
  },
  {
    id: "sakura",
    name: "春日野樱",
    title: "轻快灵动的樱花流格斗少女",
    intro: "用樱花波动拳逼出破绽，再靠春风脚和樱花升龙拳连续追击。",
    trait: "成长型：回气最快，技能冷却最短，循环最顺。",
    stats: { health: 100, speed: 5.05, jump: 9.5, power: 8.2, defense: 8.4, meterGain: 1.18, airControl: 0.34, weight: 0.96, damageTaken: 1 },
    palette: {
      primary: "#f3f1f6",
      secondary: "#ff7088",
      trim: "#203462",
      aura: "#ff9cbb",
      skin: "#efc9ac",
      dark: "#402d28"
    },
    costume: {
      hair: "M -18 -150 Q -6 -168 10 -162 L 20 -146 Q 8 -144 -6 -136 Q -16 -136 -18 -150 Z",
      emblem: "M -14 -100 H 14 L 4 -84 H -4 Z",
      belt: "#203462"
    },
    moves: {
      light: { label: "樱花掌", damage: 6, reach: 82, height: 98, startup: 58, active: 88, recovery: 176, push: 4.8, stun: 220 },
      heavy: { label: "春风脚", damage: 10, reach: 110, height: 108, startup: 108, active: 112, recovery: 320, dash: 7.1, push: 10.1, stun: 330 },
      skill1: {
        label: "樱花波动拳",
        kind: "projectile",
        damage: 9,
        meterCost: 14,
        cooldown: 760,
        castTime: 150,
        recovery: 360,
        projectileSpeed: 8.2,
        projectileRadius: 20,
        projectileHeight: 114,
        projectileShape: "petal",
        projectileWaveAmp: 1.1,
        projectileWaveSpeed: 0.16,
        projectileRise: 0.06,
        projectileLife: 1850,
        push: 7,
        stun: 280
      },
      skill2: {
        label: "樱花升龙拳",
        kind: "burst",
        damage: 7,
        meterCost: 24,
        cooldown: 1280,
        startup: 76,
        active: 132,
        recovery: 420,
        burstSpeed: 4.9,
        burstLift: 9.8,
        reach: 88,
        height: 150,
        hits: 2,
        hitInterval: 78,
        push: 11.4,
        stun: 410
      }
    }
  }
];

const styleProfiles = {
  ryu: {
    shoulder: 28,
    hips: 18,
    armScale: 1.02,
    legScale: 1,
    torsoScaleX: 1,
    torsoScaleY: 1.02,
    headScale: 1,
    headOffset: 0,
    nameY: -196,
    previewScaleX: 1,
    previewScaleY: 1,
    previewYOffset: 0,
    auraBase: 0.1,
    swayScale: 0.85,
    walkScale: 0.95,
    frontArmBias: -6,
    backArmBias: 8,
    frontLegBias: 2,
    backLegBias: -2,
    torsoTiltBias: -2,
    headTiltBias: 0,
    bounceScale: 0.5,
    shadowScale: 1,
    trailWidth: 10
  },
  ken: {
    shoulder: 29,
    hips: 18,
    armScale: 1.04,
    legScale: 1,
    torsoScaleX: 0.99,
    torsoScaleY: 1.03,
    headScale: 1.01,
    headOffset: -1,
    nameY: -196,
    previewScaleX: 1.02,
    previewScaleY: 1.02,
    previewYOffset: -2,
    auraBase: 0.13,
    swayScale: 1.05,
    walkScale: 1.1,
    frontArmBias: -12,
    backArmBias: 14,
    frontLegBias: 4,
    backLegBias: -2,
    torsoTiltBias: -5,
    headTiltBias: -1,
    bounceScale: 0.9,
    shadowScale: 0.98,
    trailWidth: 11
  },
  chunli: {
    shoulder: 25,
    hips: 20,
    armScale: 0.95,
    legScale: 1.12,
    torsoScaleX: 0.95,
    torsoScaleY: 0.96,
    headScale: 0.98,
    headOffset: 1,
    nameY: -194,
    previewScaleX: 0.98,
    previewScaleY: 0.98,
    previewYOffset: 2,
    auraBase: 0.12,
    swayScale: 1.2,
    walkScale: 1.18,
    frontArmBias: -18,
    backArmBias: 10,
    frontLegBias: 14,
    backLegBias: -10,
    torsoTiltBias: -4,
    headTiltBias: -2,
    bounceScale: 1.35,
    shadowScale: 0.96,
    trailWidth: 9
  },
  vega: {
    shoulder: 34,
    hips: 20,
    armScale: 1.05,
    legScale: 1.04,
    torsoScaleX: 1.1,
    torsoScaleY: 1.08,
    headScale: 1.02,
    headOffset: -1,
    nameY: -200,
    previewScaleX: 1.08,
    previewScaleY: 1.06,
    previewYOffset: -3,
    auraBase: 0.15,
    swayScale: 0.7,
    walkScale: 0.9,
    frontArmBias: -4,
    backArmBias: 16,
    frontLegBias: 4,
    backLegBias: 6,
    torsoTiltBias: 1,
    headTiltBias: -1,
    bounceScale: 0.35,
    shadowScale: 1.08,
    trailWidth: 12
  },
  akuma: {
    shoulder: 31,
    hips: 19,
    armScale: 1.08,
    legScale: 1.03,
    torsoScaleX: 1.07,
    torsoScaleY: 1.08,
    headScale: 1.04,
    headOffset: 0,
    nameY: -200,
    previewScaleX: 1.05,
    previewScaleY: 1.05,
    previewYOffset: -2,
    auraBase: 0.17,
    swayScale: 0.7,
    walkScale: 0.94,
    frontArmBias: -2,
    backArmBias: 18,
    frontLegBias: 0,
    backLegBias: 6,
    torsoTiltBias: 7,
    headTiltBias: 3,
    bounceScale: 0.3,
    shadowScale: 1.06,
    trailWidth: 13
  },
  sakura: {
    shoulder: 24,
    hips: 17,
    armScale: 0.94,
    legScale: 0.96,
    torsoScaleX: 0.92,
    torsoScaleY: 0.94,
    headScale: 0.96,
    headOffset: 2,
    nameY: -192,
    previewScaleX: 0.94,
    previewScaleY: 0.95,
    previewYOffset: 4,
    auraBase: 0.11,
    swayScale: 1.25,
    walkScale: 1.12,
    frontArmBias: -14,
    backArmBias: 12,
    frontLegBias: 8,
    backLegBias: -6,
    torsoTiltBias: -6,
    headTiltBias: -2,
    bounceScale: 1.4,
    shadowScale: 0.94,
    trailWidth: 8
  }
};

function getStyleProfile(characterId) {
  return styleProfiles[characterId] || styleProfiles.ryu;
}

const controls = {
  p1: {
    left: "KeyA",
    right: "KeyD",
    up: "KeyW",
    down: "KeyS",
    light: "KeyF",
    heavy: "KeyG",
    skill1: "KeyH",
    skill2: "KeyT"
  },
  p2: {
    left: "ArrowLeft",
    right: "ArrowRight",
    up: "ArrowUp",
    down: "ArrowDown",
    light: "KeyK",
    heavy: "KeyL",
    skill1: "Semicolon",
    skill2: "KeyP"
  }
};

const state = {
  selection: {
    p1: roster[0].id,
    p2: roster[1].id
  },
  keysDown: Object.create(null),
  keysPressed: Object.create(null),
  fighters: [],
  projectiles: [],
  effects: [],
  phase: "select",
  loopId: 0,
  lastFrame: 0,
  announcerUntil: 0
};

const elements = {
  selectionScreen: document.getElementById("selectionScreen"),
  battleScreen: document.getElementById("battleScreen"),
  characterGrid: document.getElementById("characterGrid"),
  startBattleButton: document.getElementById("startBattleButton"),
  playerOnePreview: document.getElementById("playerOnePreview"),
  playerTwoPreview: document.getElementById("playerTwoPreview"),
  playerOneName: document.getElementById("playerOneName"),
  playerTwoName: document.getElementById("playerTwoName"),
  playerOneTitle: document.getElementById("playerOneTitle"),
  playerTwoTitle: document.getElementById("playerTwoTitle"),
  playerOneMoves: document.getElementById("playerOneMoves"),
  playerTwoMoves: document.getElementById("playerTwoMoves"),
  fighterLayer: document.getElementById("fighterLayer"),
  projectileLayer: document.getElementById("projectileLayer"),
  fxLayer: document.getElementById("fxLayer"),
  hudP1Name: document.getElementById("hudP1Name"),
  hudP2Name: document.getElementById("hudP2Name"),
  hudP1HealthFill: document.getElementById("hudP1HealthFill"),
  hudP2HealthFill: document.getElementById("hudP2HealthFill"),
  hudP1MeterFill: document.getElementById("hudP1MeterFill"),
  hudP2MeterFill: document.getElementById("hudP2MeterFill"),
  timerDisplay: document.getElementById("timerDisplay"),
  announcerText: document.getElementById("announcerText"),
  battleOverlay: document.getElementById("battleOverlay"),
  overlayTitle: document.getElementById("overlayTitle"),
  overlaySubtitle: document.getElementById("overlaySubtitle"),
  rematchButton: document.getElementById("rematchButton"),
  backToSelectButton: document.getElementById("backToSelectButton")
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function createSvgElement(tag, attributes = {}) {
  const node = document.createElementNS(SVG_NS, tag);
  Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
  return node;
}

function getCharacter(id) {
  return roster.find((item) => item.id === id);
}

function keyName(code) {
  const map = {
    KeyF: "F",
    KeyG: "G",
    KeyH: "H",
    KeyT: "T",
    KeyK: "K",
    KeyL: "L",
    KeyP: "P",
    Semicolon: ";",
    KeyW: "W",
    KeyA: "A",
    KeyS: "S",
    KeyD: "D",
    ArrowUp: "↑",
    ArrowDown: "↓",
    ArrowLeft: "←",
    ArrowRight: "→"
  };
  return map[code] || code;
}

function setAnnouncer(text, hold = 1500) {
  elements.announcerText.textContent = text;
  state.announcerUntil = performance.now() + hold;
}

function resetInputState() {
  state.keysDown = Object.create(null);
  state.keysPressed = Object.create(null);
}

function getPreviewAccessoryMarkup(character) {
  const { palette } = character;
  switch (character.id) {
    case "ryu":
      return `
        <path d="M -18 -146 Q -44 -162 -64 -146" fill="none" stroke="${palette.secondary}" stroke-width="6" stroke-linecap="round"></path>
        <path d="M 18 -146 Q 40 -160 58 -138" fill="none" stroke="${palette.secondary}" stroke-width="6" stroke-linecap="round"></path>
      `;
    case "ken":
      return `
        <path d="M -16 -34 Q 0 -46 16 -34" fill="none" stroke="${palette.secondary}" stroke-width="8" stroke-linecap="round"></path>
        <path d="M -40 -96 H -28" stroke="${palette.secondary}" stroke-width="8" stroke-linecap="round"></path>
        <path d="M 28 -96 H 40" stroke="${palette.secondary}" stroke-width="8" stroke-linecap="round"></path>
      `;
    case "chunli":
      return `
        <circle cx="-24" cy="-148" r="10" fill="${palette.secondary}"></circle>
        <circle cx="24" cy="-148" r="10" fill="${palette.secondary}"></circle>
        <path d="M -30 -72 Q 0 -40 30 -72" fill="${palette.secondary}" opacity="0.75"></path>
      `;
    case "vega":
      return `
        <path d="M -34 -124 H 34 L 46 -100 H -46 Z" fill="${palette.secondary}" opacity="0.82"></path>
        <path d="M -30 -114 Q -74 -18 -40 26" fill="${palette.secondary}" opacity="0.24"></path>
      `;
    case "akuma":
      return `
        <g fill="${palette.secondary}" opacity="0.95">
          <circle cx="-20" cy="-118" r="4"></circle>
          <circle cx="-10" cy="-110" r="4"></circle>
          <circle cx="0" cy="-108" r="4"></circle>
          <circle cx="10" cy="-110" r="4"></circle>
          <circle cx="20" cy="-118" r="4"></circle>
        </g>
      `;
    case "sakura":
      return `
        <path d="M -12 -144 Q -36 -158 -54 -138" fill="none" stroke="${palette.secondary}" stroke-width="6" stroke-linecap="round"></path>
        <path d="M -24 -108 L 0 -78 L 24 -108" fill="none" stroke="${palette.secondary}" stroke-width="8" stroke-linecap="round"></path>
      `;
    default:
      return "";
  }
}

function decorateFighterParts(fighter, parts) {
  const { palette } = fighter.character;
  const add = (target, tag, attrs) => target.appendChild(createSvgElement(tag, attrs));

  switch (fighter.character.id) {
    case "ryu":
      add(parts.head, "path", {
        d: "M -18 -146 Q -44 -162 -64 -146",
        fill: "none",
        stroke: palette.secondary,
        "stroke-width": 6,
        "stroke-linecap": "round"
      });
      add(parts.head, "path", {
        d: "M 18 -146 Q 40 -160 58 -138",
        fill: "none",
        stroke: palette.secondary,
        "stroke-width": 6,
        "stroke-linecap": "round"
      });
      break;
    case "ken":
      add(parts.torso, "path", {
        d: "M -18 -34 Q 0 -44 18 -34",
        fill: "none",
        stroke: palette.secondary,
        "stroke-width": 8,
        "stroke-linecap": "round"
      });
      add(parts.backArm, "path", {
        d: "M -10 18 H 10",
        fill: "none",
        stroke: palette.secondary,
        "stroke-width": 8,
        "stroke-linecap": "round"
      });
      add(parts.frontArm, "path", {
        d: "M -10 18 H 10",
        fill: "none",
        stroke: palette.secondary,
        "stroke-width": 8,
        "stroke-linecap": "round"
      });
      break;
    case "chunli":
      add(parts.head, "circle", { cx: -24, cy: -148, r: 10, fill: palette.secondary });
      add(parts.head, "circle", { cx: 24, cy: -148, r: 10, fill: palette.secondary });
      add(parts.torso, "path", {
        d: "M -30 -70 Q 0 -40 30 -70",
        fill: palette.secondary,
        opacity: 0.74
      });
      break;
    case "vega":
      add(parts.torso, "path", {
        d: "M -34 -124 H 34 L 46 -100 H -46 Z",
        fill: palette.secondary,
        opacity: 0.82
      });
      add(parts.body, "path", {
        d: "M -30 -114 Q -78 -12 -42 32",
        fill: palette.secondary,
        opacity: 0.2
      });
      break;
    case "akuma":
      [-20, -10, 0, 10, 20].forEach((x, index) => {
        add(parts.body, "circle", {
          cx: x,
          cy: [-118, -110, -108, -110, -118][index],
          r: 4,
          fill: palette.secondary,
          opacity: 0.95
        });
      });
      break;
    case "sakura":
      add(parts.head, "path", {
        d: "M -12 -144 Q -36 -158 -54 -138",
        fill: "none",
        stroke: palette.secondary,
        "stroke-width": 6,
        "stroke-linecap": "round"
      });
      add(parts.torso, "path", {
        d: "M -24 -108 L 0 -78 L 24 -108",
        fill: "none",
        stroke: palette.secondary,
        "stroke-width": 8,
        "stroke-linecap": "round"
      });
      break;
    default:
      break;
  }
}

function createPreviewMarkup(character) {
  const profile = getStyleProfile(character.id);
  return `
    <svg class="preview-svg" viewBox="-120 -220 240 240" aria-hidden="true">
      <defs>
        <filter id="previewGlow-${character.id}">
          <feGaussianBlur stdDeviation="6" result="blur"></feGaussianBlur>
          <feMerge>
            <feMergeNode in="blur"></feMergeNode>
            <feMergeNode in="SourceGraphic"></feMergeNode>
          </feMerge>
        </filter>
      </defs>
      <ellipse cx="0" cy="32" rx="64" ry="16" fill="rgba(0,0,0,0.25)"></ellipse>
      <g class="preview-base" filter="url(#previewGlow-${character.id})" transform="translate(0 ${profile.previewYOffset}) scale(${profile.previewScaleX} ${profile.previewScaleY})">
        <path d="M -32 20 Q 0 -6 32 20 L 24 -72 H -24 Z" fill="${character.palette.primary}" opacity="0.8"></path>
        <rect x="-18" y="-116" width="36" height="74" rx="12" fill="${character.palette.primary}" stroke="${character.palette.secondary}" stroke-width="3"></rect>
        <path d="${character.costume.emblem}" fill="${character.palette.secondary}"></path>
        <path d="${character.costume.hair}" fill="${character.palette.dark}"></path>
        <circle cx="0" cy="-146" r="22" fill="${character.palette.skin}" stroke="${character.palette.secondary}" stroke-width="3"></circle>
        <rect x="-46" y="-112" width="14" height="74" rx="7" fill="${character.palette.primary}" transform="rotate(18 -46 -112)"></rect>
        <rect x="32" y="-112" width="14" height="74" rx="7" fill="${character.palette.primary}" transform="rotate(-18 32 -112)"></rect>
        <rect x="-26" y="-42" width="16" height="86" rx="7" fill="${character.palette.trim}" transform="rotate(8 -26 -42)"></rect>
        <rect x="10" y="-42" width="16" height="86" rx="7" fill="${character.palette.trim}" transform="rotate(-8 10 -42)"></rect>
        <path d="M -20 -32 H 20" stroke="${character.costume.belt}" stroke-width="7" stroke-linecap="round"></path>
        ${getPreviewAccessoryMarkup(character)}
        <path d="M -72 -58 Q 0 -120 72 -58" fill="none" stroke="${character.palette.aura}" stroke-width="8" opacity="0.55"></path>
      </g>
    </svg>
  `;
}

function createSkillList(character, playerKey) {
  const map = controls[playerKey];
  return `
    <li><strong>特性</strong> ${character.trait}</li>
    <li><strong>${keyName(map.light)}</strong> ${character.moves.light.label}</li>
    <li><strong>${keyName(map.heavy)}</strong> ${character.moves.heavy.label}</li>
    <li><strong>${keyName(map.skill1)}</strong> ${character.moves.skill1.label}</li>
    <li><strong>${keyName(map.skill2)}</strong> ${character.moves.skill2.label}</li>
  `;
}

function renderSelectionPanels() {
  const p1 = getCharacter(state.selection.p1);
  const p2 = getCharacter(state.selection.p2);

  elements.playerOnePreview.innerHTML = createPreviewMarkup(p1);
  elements.playerTwoPreview.innerHTML = createPreviewMarkup(p2);
  elements.playerOneName.textContent = p1.name;
  elements.playerTwoName.textContent = p2.name;
  elements.playerOneTitle.textContent = p1.title;
  elements.playerTwoTitle.textContent = p2.title;
  elements.playerOneMoves.innerHTML = createSkillList(p1, "p1");
  elements.playerTwoMoves.innerHTML = createSkillList(p2, "p2");
  elements.startBattleButton.disabled = !(p1 && p2);
}

function renderRoster() {
  elements.characterGrid.innerHTML = roster
    .map((character) => {
      return `
        <article class="character-card">
          <div class="card-preview">
            ${createPreviewMarkup(character)}
          </div>
          <div class="card-header">
            <h3>${character.name}</h3>
            <p>${character.intro}</p>
            <div class="trait-copy">${character.trait}</div>
          </div>
          <div class="stats">
            <div class="stat-pill"><span>生命</span><strong>${character.stats.health}</strong></div>
            <div class="stat-pill"><span>速度</span><strong>${character.stats.speed.toFixed(1)}</strong></div>
            <div class="stat-pill"><span>力量</span><strong>${character.stats.power.toFixed(1)}</strong></div>
            <div class="stat-pill"><span>防御</span><strong>${character.stats.defense.toFixed(1)}</strong></div>
          </div>
          <div class="skills-strip">
            <span>${character.moves.light.label}</span>
            <span>${character.moves.heavy.label}</span>
            <span>${character.moves.skill1.label}</span>
            <span>${character.moves.skill2.label}</span>
          </div>
          <div class="assign-actions">
            <button class="assign-button is-player-one" data-player="p1" data-character="${character.id}">分配给 1P</button>
            <button class="assign-button is-player-two" data-player="p2" data-character="${character.id}">分配给 2P</button>
          </div>
        </article>
      `;
    })
    .join("");

  elements.characterGrid.querySelectorAll("[data-player]").forEach((button) => {
    button.addEventListener("click", () => {
      const player = button.dataset.player;
      const characterId = button.dataset.character;
      state.selection[player] = characterId;
      renderSelectionPanels();
    });
  });
}

function makeFighter(slot, character, x) {
  const controller = controls[slot];
  return {
    slot,
    character,
    profile: getStyleProfile(character.id),
    x,
    y: 0,
    vx: 0,
    vy: 0,
    facing: slot === "p1" ? 1 : -1,
    hp: character.stats.health,
    meter: 22,
    moveCooldowns: { skill1: 0, skill2: 0 },
    state: "idle",
    intentX: 0,
    action: null,
    hitstun: 0,
    flashTimer: 0,
    guardTimer: 0,
    ko: false,
    controller,
    dom: null
  };
}

function createFighterNode(fighter) {
  const root = createSvgElement("g", { id: `fighter-${fighter.slot}`, class: "fighter" });
  const shadow = createSvgElement("ellipse", { class: "fighter-shadow", cx: 0, cy: 0, rx: 48, ry: 14 });
  root.appendChild(shadow);
  const figure = createSvgElement("g", { class: "fighter-figure" });

  const aura = createSvgElement("ellipse", {
    class: "fighter-aura",
    cx: 0,
    cy: -82,
    rx: 70,
    ry: 100,
    fill: fighter.character.palette.aura,
    opacity: 0.1
  });

  const body = createSvgElement("g", { class: "fighter-body" });
  const backLeg = createSvgElement("g", { class: "fighter-outline limb back-leg" });
  const frontLeg = createSvgElement("g", { class: "fighter-outline limb front-leg" });
  const backArm = createSvgElement("g", { class: "fighter-outline limb back-arm" });
  const frontArm = createSvgElement("g", { class: "fighter-outline limb front-arm" });
  const torso = createSvgElement("g", { class: "fighter-outline torso" });
  const head = createSvgElement("g", { class: "fighter-outline head" });
  const trail = createSvgElement("path", {
    class: "skill-trail",
    d: "M0 0",
    fill: "none",
    stroke: fighter.character.palette.aura,
    "stroke-width": 10,
    "stroke-linecap": "round",
    opacity: 0
  });

  const makeLimb = (group, fill) => {
    group.appendChild(createSvgElement("rect", { x: -7, y: 0, width: 14, height: 64, rx: 7, fill }));
    group.appendChild(createSvgElement("circle", { cx: 0, cy: 66, r: 7, fill }));
  };

  makeLimb(backLeg, fighter.character.palette.trim);
  makeLimb(frontLeg, fighter.character.palette.trim);
  makeLimb(backArm, fighter.character.palette.primary);
  makeLimb(frontArm, fighter.character.palette.primary);

  torso.appendChild(
    createSvgElement("path", {
      d: "M -24 -116 Q -8 -132 0 -132 Q 8 -132 24 -116 L 20 -52 Q 2 -44 -20 -52 Z",
      fill: fighter.character.palette.primary
    })
  );
  torso.appendChild(
    createSvgElement("path", {
      d: fighter.character.costume.emblem,
      fill: fighter.character.palette.secondary
    })
  );
  torso.appendChild(
    createSvgElement("path", {
      d: "M -22 -56 H 22",
      stroke: fighter.character.costume.belt,
      "stroke-width": 8,
      "stroke-linecap": "round"
    })
  );

  head.appendChild(
    createSvgElement("circle", {
      cx: 0,
      cy: -148,
      r: 20,
      fill: fighter.character.palette.skin
    })
  );
  head.appendChild(
    createSvgElement("path", {
      d: fighter.character.costume.hair,
      fill: fighter.character.palette.dark
    })
  );
  head.appendChild(
    createSvgElement("path", {
      d: "M -8 -150 H 8",
      stroke: fighter.character.palette.trim,
      "stroke-width": 2,
      opacity: 0.4
    })
  );

  decorateFighterParts(fighter, { body, torso, head, backArm, frontArm, backLeg, frontLeg });

  const nameplate = createSvgElement("g", { class: "fighter-nameplate" });
  nameplate.appendChild(
    createSvgElement("text", {
      x: 0,
      y: 0,
      "text-anchor": "middle",
      fill: fighter.character.palette.secondary
    })
  ).textContent = fighter.character.name;

  body.append(aura, backLeg, frontLeg, torso, backArm, frontArm, head, trail);
  figure.appendChild(body);
  root.append(figure, nameplate);

  fighter.dom = { root, shadow, figure, aura, body, backLeg, frontLeg, backArm, frontArm, torso, head, trail, nameplate };
  return root;
}

function buildScene() {
  elements.fighterLayer.innerHTML = "";
  elements.projectileLayer.innerHTML = "";
  elements.fxLayer.innerHTML = "";

  state.fighters.forEach((fighter) => {
    elements.fighterLayer.appendChild(createFighterNode(fighter));
  });
}

function startMatch() {
  const p1Character = getCharacter(state.selection.p1);
  const p2Character = getCharacter(state.selection.p2);
  resetInputState();
  state.phase = "fight";
  state.projectiles = [];
  state.effects = [];
  state.lastFrame = 0;

  state.fighters = [
    makeFighter("p1", p1Character, 330),
    makeFighter("p2", p2Character, 870)
  ];

  elements.selectionScreen.classList.add("hidden");
  elements.battleScreen.classList.remove("hidden");
  elements.battleOverlay.classList.add("hidden");
  elements.hudP1Name.textContent = p1Character.name;
  elements.hudP2Name.textContent = p2Character.name;

  buildScene();
  updateHud();
  setAnnouncer("Round 1 开始", 1500);

  cancelAnimationFrame(state.loopId);
  state.loopId = requestAnimationFrame(gameLoop);
}

function backToSelection() {
  resetInputState();
  state.phase = "select";
  cancelAnimationFrame(state.loopId);
  state.projectiles = [];
  state.effects = [];
  elements.fighterLayer.innerHTML = "";
  elements.projectileLayer.innerHTML = "";
  elements.fxLayer.innerHTML = "";
  elements.selectionScreen.classList.remove("hidden");
  elements.battleScreen.classList.add("hidden");
  elements.battleOverlay.classList.add("hidden");
  renderSelectionPanels();
}

function isDown(code) {
  return Boolean(state.keysDown[code]);
}

function wasPressed(code) {
  return Boolean(state.keysPressed[code]);
}

function canAct(fighter) {
  return !fighter.ko && fighter.hitstun <= 0 && !fighter.action;
}

function startAction(fighter, actionKey) {
  const move = fighter.character.moves[actionKey];
  if (!canAct(fighter) || !move) {
    return;
  }

  if (move.meterCost && fighter.meter < move.meterCost) {
    setAnnouncer(`${fighter.character.name} 能量不足`, 900);
    return;
  }

  if (fighter.moveCooldowns[actionKey] > 0) {
    return;
  }

  fighter.meter = clamp(fighter.meter - (move.meterCost || 0), 0, 100);
  fighter.moveCooldowns[actionKey] = move.cooldown || 0;
  fighter.action = {
    key: actionKey,
    move,
    elapsed: 0,
    hitApplied: false,
    hitCount: 0,
    lastHitAt: -Infinity,
    projectileSpawned: false,
    launched: false,
    armorSpent: false
  };
  fighter.state = actionKey;
  fighter.guardTimer = 0;
  setAnnouncer(`${fighter.character.name} 发动 ${move.label}`, 850);
}

function createImpact(x, y, color) {
  state.effects.push({
    x,
    y,
    color,
    life: 280
  });
}

function registerHit(attacker, defender, move, sourceType = "melee") {
  if (defender.ko) {
    return false;
  }

  const guarding = defender.guardTimer > 0 && defender.y === 0;
  const armorActive =
    !guarding &&
    defender.action &&
    defender.action.move.armor &&
    !defender.action.armorSpent &&
    defender.action.elapsed >= (defender.action.move.armorStart || 0) &&
    defender.action.elapsed <= (defender.action.move.armorEnd || actionTime(defender.action.move));
  const guardRatio = move.guardDamageRatio ?? 0.42;
  const damageRatio = guarding ? guardRatio : armorActive ? 0.42 : 1;
  const attackScale = (attacker.character.stats.power || 8.5) / 8.5;
  const defenseScale = 8.5 / (defender.character.stats.defense || 8.5);
  const takenScale = defender.character.stats.damageTaken || 1;
  const damage = Math.max(1, Math.round(move.damage * damageRatio * attackScale * defenseScale * takenScale));
  const weight = defender.character.stats.weight || 1;
  defender.hp = clamp(defender.hp - damage, 0, defender.character.stats.health);
  defender.hitstun = armorActive ? move.stun * 0.18 : guarding ? move.stun * 0.45 : move.stun;
  defender.flashTimer = 140;
  defender.vx = (attacker.facing * (guarding ? move.push * 0.45 : armorActive ? move.push * 0.25 : move.push)) / weight;
  defender.vy = (guarding ? 1.8 : sourceType === "projectile" ? 2.2 : move.kind === "burst" || move.kind === "dash" ? 6.2 : 3.6) / weight;
  defender.state = guarding ? "guard" : armorActive ? defender.state : "hit";
  if (armorActive) {
    defender.action.armorSpent = true;
  }

  attacker.meter = clamp(attacker.meter + (8 + move.damage * 0.45) * (attacker.character.stats.meterGain || 1), 0, 100);
  defender.meter = clamp(defender.meter + 4.5 * (defender.character.stats.meterGain || 1), 0, 100);
  createImpact(defender.x, STAGE.floorY - defender.y - 96, attacker.character.palette.aura);

  if (defender.hp <= 0) {
    defender.ko = true;
    defender.state = "ko";
    defender.hitstun = 900;
    endMatch(attacker, `${attacker.character.name} 获胜`);
  } else if (guarding) {
    setAnnouncer(`${defender.character.name} 成功格挡`, 600);
  } else if (armorActive) {
    setAnnouncer(`${defender.character.name} 强行顶住了攻击`, 600);
  } else {
    setAnnouncer(`${move.label} 命中`, 550);
  }

  return true;
}

function spawnProjectile(fighter, move) {
  state.projectiles.push({
    owner: fighter.slot,
    move,
    x: fighter.x + fighter.facing * 78,
    y: fighter.y + move.projectileHeight,
    baseY: fighter.y + move.projectileHeight,
    vx: fighter.facing * move.projectileSpeed,
    radius: move.projectileRadius,
    life: move.projectileLife || 1800,
    phase: Math.random() * Math.PI * 2,
    waveAmp: move.projectileWaveAmp || 0.65,
    waveSpeed: move.projectileWaveSpeed || 0.22,
    rise: move.projectileRise || 0,
    shape: move.projectileShape || "classic",
    color: fighter.character.palette.aura
  });
}

function actionTime(move) {
  return (move.startup || move.castTime || 0) + (move.active || 0) + (move.recovery || 0);
}

function tryResolveMeleeHit(fighter, opponent) {
  if (!fighter.action) {
    return;
  }

  const { move, elapsed } = fighter.action;
  const maxHits = move.hits || 1;
  if (fighter.action.hitCount >= maxHits) {
    fighter.action.hitApplied = true;
    return;
  }
  const startup = move.startup || 0;
  const activeEnd = startup + (move.active || 0);

  if (elapsed < startup || elapsed > activeEnd) {
    return;
  }

  const xDistance = Math.abs(opponent.x - fighter.x);
  const yDistance = Math.abs(opponent.y - fighter.y);
  const inFront = fighter.facing * (opponent.x - fighter.x) > -6;
  if (!inFront || xDistance > move.reach || yDistance > move.height) {
    return;
  }

  if (fighter.action.hitCount > 0 && elapsed - fighter.action.lastHitAt < (move.hitInterval || 90)) {
    return;
  }

  const didHit = registerHit(fighter, opponent, move);
  if (didHit) {
    fighter.action.hitCount += 1;
    fighter.action.lastHitAt = elapsed;
    fighter.action.hitApplied = fighter.action.hitCount >= maxHits;
  }
}

function updateAction(fighter, opponent, dt, dtMs) {
  if (!fighter.action) {
    return;
  }

  const action = fighter.action;
  const move = action.move;
  action.elapsed += dtMs;

  if (action.key === "heavy" && action.elapsed < move.startup + move.active) {
    fighter.vx = fighter.facing * move.dash;
  }

  if (move.kind === "dash" && action.elapsed >= move.startup * 0.55 && action.elapsed < move.startup + move.active) {
    fighter.vx = fighter.facing * move.burstSpeed;
    if (!action.launched && fighter.y === 0) {
      fighter.vy = move.burstLift;
      action.launched = true;
    }
  }

  if (move.kind === "burst" && action.elapsed >= move.startup * 0.45 && action.elapsed < move.startup + move.active) {
    fighter.vx = fighter.facing * move.burstSpeed;
    if (!action.launched) {
      fighter.vy = move.burstLift;
      action.launched = true;
    }
  }

  if (move.kind === "projectile" && !action.projectileSpawned && action.elapsed >= move.castTime) {
    action.projectileSpawned = true;
    spawnProjectile(fighter, move);
  }

  if (action.key === "light" || action.key === "heavy" || move.kind === "burst" || move.kind === "dash") {
    tryResolveMeleeHit(fighter, opponent);
  }

  if (action.elapsed >= actionTime(move)) {
    fighter.action = null;
    if (!fighter.ko && fighter.hitstun <= 0) {
      fighter.state = fighter.y > 0 ? "jump" : "idle";
    }
  }

  const trailOpacity =
    fighter.action && (fighter.action.key === "heavy" || move.kind === "burst" || move.kind === "dash") ? 0.6 : 0;
  fighter.dom.trail.setAttribute(
    "d",
    `M ${-fighter.facing * 18} -84 Q ${-fighter.facing * 68} -126 ${-fighter.facing * 96} -74`
  );
  fighter.dom.trail.setAttribute("opacity", String(trailOpacity));
}

function updateFighterState(fighter, opponent, dt, dtMs) {
  fighter.moveCooldowns.skill1 = Math.max(0, fighter.moveCooldowns.skill1 - dtMs);
  fighter.moveCooldowns.skill2 = Math.max(0, fighter.moveCooldowns.skill2 - dtMs);
  fighter.flashTimer = Math.max(0, fighter.flashTimer - dtMs);
  fighter.guardTimer = Math.max(0, fighter.guardTimer - dtMs);
  fighter.intentX = 0;

  if (fighter.ko) {
    fighter.vx *= 0.96;
  }

  fighter.facing = fighter.x <= opponent.x ? 1 : -1;

  if (!fighter.ko && fighter.hitstun > 0) {
    fighter.hitstun = Math.max(0, fighter.hitstun - dtMs);
  }

  if (!fighter.ko && fighter.hitstun <= 0 && !fighter.action) {
    const left = isDown(fighter.controller.left);
    const right = isDown(fighter.controller.right);
    const jump = wasPressed(fighter.controller.up);
    const down = isDown(fighter.controller.down);
    const direction = (right ? 1 : 0) - (left ? 1 : 0);
    fighter.intentX = direction;

    if (fighter.y === 0) {
      if (jump) {
        fighter.vy = fighter.character.stats.jump;
        fighter.state = "jump";
      }

      if (down) {
        fighter.state = "guard";
        fighter.guardTimer = 120;
        fighter.vx *= 0.78;
      } else if (direction !== 0) {
        fighter.vx += (direction * fighter.character.stats.speed - fighter.vx) * 0.34;
        fighter.state = "walk";
      } else {
        fighter.vx *= 0.74;
        fighter.state = "idle";
      }
    } else {
      fighter.vx += direction * (fighter.character.stats.airControl || 0.22);
      fighter.state = "jump";
    }

    if (wasPressed(fighter.controller.light)) {
      startAction(fighter, "light");
    } else if (wasPressed(fighter.controller.heavy)) {
      startAction(fighter, "heavy");
    } else if (wasPressed(fighter.controller.skill1)) {
      startAction(fighter, "skill1");
    } else if (wasPressed(fighter.controller.skill2)) {
      startAction(fighter, "skill2");
    }
  }

  if (fighter.hitstun > 0) {
    fighter.state = fighter.guardTimer > 0 ? "guard" : "hit";
  }

  updateAction(fighter, opponent, dt, dtMs);

  fighter.vy -= STAGE.gravity * dt;
  fighter.x += fighter.vx * dt * 6.1;
  fighter.y += fighter.vy * dt * 6.1;

  fighter.vx *= fighter.y > 0 ? 0.985 : fighter.action ? 0.95 : 0.88;

  if (fighter.y <= 0) {
    fighter.y = 0;
    fighter.vy = Math.max(0, fighter.vy);
    if (!fighter.action && fighter.hitstun <= 0 && !isDown(fighter.controller.down)) {
      fighter.state = Math.abs(fighter.vx) > 0.5 ? "walk" : "idle";
    }
  }

  fighter.x = clamp(fighter.x, STAGE.leftBound, STAGE.rightBound);
  fighter.meter = clamp(fighter.meter + STAGE.baseMeterGain * dtMs * (fighter.character.stats.meterGain || 1), 0, 100);
}

function solveSpacing() {
  const [a, b] = state.fighters;
  if (!a || !b) {
    return;
  }

  if (a.y > 18 || b.y > 18) {
    return;
  }

  const delta = b.x - a.x;
  const distance = Math.abs(delta);
  const bothNeutral = [a, b].every((fighter) => !fighter.action && fighter.hitstun <= 0 && !fighter.ko);
  const movingApart = a.intentX * delta < 0 && b.intentX * delta > 0;
  const movingSameWay = bothNeutral && a.intentX !== 0 && a.intentX === b.intentX;
  const targetGap = movingApart ? 34 : movingSameWay ? 42 : bothNeutral ? 50 : STAGE.minGap;

  if (distance < targetGap) {
    const push = (targetGap - distance) / 2;
    if (delta >= 0) {
      a.x -= push;
      b.x += push;
    } else {
      a.x += push;
      b.x -= push;
    }
  }

  if (bothNeutral && movingApart) {
    const release = Math.min(1.8, Math.max(0, targetGap - distance) * 0.12 + 0.7);
    a.x += a.intentX * release;
    b.x += b.intentX * release;
  }

  a.x = clamp(a.x, STAGE.leftBound, STAGE.rightBound);
  b.x = clamp(b.x, STAGE.leftBound, STAGE.rightBound);
}

function updateProjectiles(dt, dtMs) {
  const remove = [];

  state.projectiles.forEach((projectile, index) => {
    projectile.life -= dtMs;
    projectile.phase += dt * projectile.waveSpeed;
    projectile.x += projectile.vx * dt * 6.2;
    projectile.baseY += projectile.rise * dt * 6.2;
    projectile.y = projectile.baseY + Math.sin(projectile.phase) * projectile.waveAmp;

    const owner = state.fighters.find((fighter) => fighter.slot === projectile.owner);
    const target = state.fighters.find((fighter) => fighter.slot !== projectile.owner);
    if (!owner || !target) {
      remove.push(index);
      return;
    }

    const hitX = Math.abs(projectile.x - target.x);
    const hitY = Math.abs(projectile.y - (target.y + 106));
    if (hitX < projectile.radius + 36 && hitY < projectile.radius + 52) {
      registerHit(owner, target, projectile.move, "projectile");
      remove.push(index);
      return;
    }

    if (projectile.life <= 0 || projectile.x < 0 || projectile.x > STAGE.width) {
      remove.push(index);
    }
  });

  remove.reverse().forEach((index) => {
    state.projectiles.splice(index, 1);
  });
}

function updateEffects(dtMs) {
  state.effects.forEach((effect) => {
    effect.life -= dtMs;
  });
  state.effects = state.effects.filter((effect) => effect.life > 0);
}

function renderProjectiles() {
  elements.projectileLayer.innerHTML = "";
  state.projectiles.forEach((projectile) => {
    const group = createSvgElement("g", {
      transform: `translate(${projectile.x} ${STAGE.floorY - projectile.y})`
    });

    if (projectile.shape === "disc") {
      group.append(
        createSvgElement("ellipse", {
          class: "projectile-core",
          rx: projectile.radius + 10,
          ry: projectile.radius * 0.58,
          fill: projectile.color,
          opacity: 0.2
        }),
        createSvgElement("ellipse", {
          class: "projectile-core",
          rx: projectile.radius,
          ry: projectile.radius * 0.48,
          fill: projectile.color,
          opacity: 0.92
        }),
        createSvgElement("path", {
          d: `M ${-projectile.radius * 1.1} 0 H ${projectile.radius * 1.1}`,
          stroke: "#ffffff",
          "stroke-width": 2.8,
          "stroke-linecap": "round",
          opacity: 0.8
        })
      );
    } else if (projectile.shape === "flame") {
      group.append(
        createSvgElement("path", {
          class: "projectile-core",
          d: `M ${-projectile.radius * 1.8} 0 Q ${-projectile.radius * 0.8} ${-projectile.radius * 0.9} ${projectile.radius * 0.1} 0 Q ${-projectile.radius * 0.8} ${projectile.radius * 0.9} ${-projectile.radius * 1.8} 0`,
          fill: projectile.color,
          opacity: 0.34
        }),
        createSvgElement("circle", {
          class: "projectile-core",
          r: projectile.radius,
          fill: projectile.color,
          opacity: 0.92
        }),
        createSvgElement("circle", {
          r: projectile.radius * 0.42,
          fill: "#fff2cf",
          opacity: 0.9
        })
      );
    } else if (projectile.shape === "dark") {
      group.append(
        createSvgElement("circle", {
          class: "projectile-core",
          r: projectile.radius + 10,
          fill: projectile.color,
          opacity: 0.18
        }),
        createSvgElement("path", {
          class: "projectile-core",
          d: `M 0 ${-projectile.radius * 1.5} L ${projectile.radius * 0.46} ${-projectile.radius * 0.3} L ${projectile.radius * 1.5} 0 L ${projectile.radius * 0.46} ${projectile.radius * 0.3} L 0 ${projectile.radius * 1.5} L ${-projectile.radius * 0.46} ${projectile.radius * 0.3} L ${-projectile.radius * 1.5} 0 L ${-projectile.radius * 0.46} ${-projectile.radius * 0.3} Z`,
          fill: projectile.color,
          opacity: 0.9
        }),
        createSvgElement("circle", {
          r: projectile.radius * 0.32,
          fill: "#ffd7ef",
          opacity: 0.86
        })
      );
    } else if (projectile.shape === "petal") {
      [-0.6, 0, 0.6].forEach((offset) => {
        group.appendChild(
          createSvgElement("ellipse", {
            class: "projectile-core",
            cx: offset * projectile.radius * 1.2,
            cy: 0,
            rx: projectile.radius * 0.56,
            ry: projectile.radius * 0.8,
            fill: projectile.color,
            opacity: 0.7
          })
        );
      });
      group.appendChild(
        createSvgElement("circle", {
          r: projectile.radius * 0.36,
          fill: "#fff7f9",
          opacity: 0.95
        })
      );
    } else {
      group.append(
        createSvgElement("circle", {
          class: "projectile-core",
          r: projectile.radius + 8,
          fill: projectile.color,
          opacity: 0.16
        }),
        createSvgElement("circle", {
          class: "projectile-core",
          r: projectile.radius,
          fill: projectile.color,
          opacity: 0.9
        }),
        createSvgElement("path", {
          d: `M ${-projectile.radius * 1.4} 0 H ${projectile.radius * 1.4} M 0 ${-projectile.radius * 1.4} V ${projectile.radius * 1.4}`,
          stroke: "#ffffff",
          "stroke-width": 2.4,
          "stroke-linecap": "round",
          opacity: 0.7
        })
      );
    }

    elements.projectileLayer.appendChild(group);
  });
}

function renderEffects() {
  elements.fxLayer.innerHTML = "";
  state.effects.forEach((effect) => {
    const lifeRatio = effect.life / 280;
    const group = createSvgElement("g", {
      transform: `translate(${effect.x} ${effect.y})`
    });
    const ring = createSvgElement("circle", {
      class: "impact-ring",
      r: 42 * (1 - lifeRatio) + 16,
      fill: "none",
      stroke: effect.color,
      "stroke-width": 6 * lifeRatio + 2,
      opacity: 0.75 * lifeRatio
    });
    const flash = createSvgElement("circle", {
      class: "impact-flash",
      r: 16 + 10 * (1 - lifeRatio),
      fill: "#fff5d2",
      opacity: 0.6 * lifeRatio
    });
    group.append(ring, flash);
    elements.fxLayer.appendChild(group);
  });
}

function getPose(fighter, time) {
  const profile = fighter.profile;
  const sway = Math.sin(time * 0.01 + (fighter.slot === "p1" ? 0 : Math.PI)) * 4 * profile.swayScale;
  const walk = Math.sin(time * 0.02 + fighter.x * 0.02) * 22 * profile.walkScale;
  const pose = {
    backArm: 12,
    frontArm: -10,
    backLeg: -4,
    frontLeg: 8,
    torsoY: 0,
    torsoTilt: 0,
    headTilt: 0,
    shadow: 1,
    aura: profile.auraBase,
    nameY: profile.nameY
  };

  if (fighter.state === "walk") {
    pose.backArm = -22 - walk * 0.45;
    pose.frontArm = 22 + walk * 0.45;
    pose.backLeg = 18 + walk;
    pose.frontLeg = -18 - walk;
    pose.torsoY = Math.abs(walk) * 0.08;
    pose.aura = 0.14;
  } else if (fighter.state === "jump") {
    pose.backArm = -40;
    pose.frontArm = 58;
    pose.backLeg = 42;
    pose.frontLeg = -34;
    pose.torsoTilt = -6;
    pose.shadow = 0.85;
    pose.aura = 0.18;
  } else if (fighter.state === "guard") {
    pose.backArm = -14;
    pose.frontArm = -74;
    pose.backLeg = 12;
    pose.frontLeg = 30;
    pose.torsoTilt = -10;
    pose.torsoY = 10;
    pose.headTilt = -6;
    pose.aura = 0.22;
  } else if (fighter.state === "hit") {
    pose.backArm = 58;
    pose.frontArm = 40;
    pose.backLeg = 22;
    pose.frontLeg = -22;
    pose.torsoTilt = 14;
    pose.headTilt = 10;
    pose.aura = 0.18;
  } else if (fighter.state === "ko") {
    pose.backArm = 86;
    pose.frontArm = 100;
    pose.backLeg = 60;
    pose.frontLeg = 74;
    pose.torsoTilt = 86;
    pose.torsoY = 12;
    pose.headTilt = 34;
    pose.shadow = 0.75;
    pose.aura = 0.04;
  } else {
    pose.backArm = 10 + sway;
    pose.frontArm = -10 - sway * 0.7;
    pose.backLeg = -6 + sway * 0.25;
    pose.frontLeg = 6 - sway * 0.25;
    pose.torsoY = Math.sin(time * 0.015 + fighter.x * 0.01) * 1.5;
  }

  if (fighter.action) {
    const { key, move, elapsed } = fighter.action;
    const progress = elapsed / Math.max(actionTime(move), 1);
    if (key === "light") {
      pose.frontArm = progress < 0.45 ? -18 - progress * 70 : -58 + progress * 32;
      pose.backArm = 26;
      pose.torsoTilt = -6;
      pose.frontLeg = 12;
      pose.aura = 0.2;
    } else if (key === "heavy") {
      pose.frontLeg = -44;
      pose.backLeg = 24;
      pose.frontArm = -108;
      pose.backArm = 36;
      pose.torsoTilt = -14;
      pose.aura = 0.28;
    } else if (move.kind === "projectile") {
      pose.frontArm = -94;
      pose.backArm = 44;
      pose.torsoTilt = -10;
      pose.aura = 0.3;
    } else if (move.kind === "dash") {
      pose.frontArm = -42;
      pose.backArm = 82;
      pose.frontLeg = -58;
      pose.backLeg = 22;
      pose.torsoTilt = -18;
      pose.aura = 0.34;
    } else if (move.kind === "burst") {
      pose.frontArm = -16;
      pose.backArm = 112;
      pose.frontLeg = -26;
      pose.backLeg = 56;
      pose.torsoTilt = -20;
      pose.aura = 0.38;
    }
  }

  pose.backArm += profile.backArmBias;
  pose.frontArm += profile.frontArmBias;
  pose.backLeg += profile.backLegBias;
  pose.frontLeg += profile.frontLegBias;
  pose.torsoTilt += profile.torsoTiltBias;
  pose.headTilt += profile.headTiltBias;
  pose.torsoY += Math.sin(time * 0.014 + fighter.x * 0.012) * profile.bounceScale;
  pose.shadow *= profile.shadowScale;
  pose.aura = Math.max(pose.aura, profile.auraBase);

  if (fighter.character.id === "chunli" && fighter.action?.key === "light") {
    pose.frontArm = -22;
    pose.backArm = 36;
    pose.frontLeg = -76;
    pose.backLeg = 34;
    pose.torsoTilt = -14;
    pose.aura = 0.24;
  }

  if (fighter.character.id === "vega" && fighter.action?.move.kind === "dash") {
    pose.frontArm = -98;
    pose.backArm = 42;
    pose.frontLeg = -66;
    pose.backLeg = 20;
    pose.torsoTilt = -24;
    pose.aura = 0.36;
  }

  if (fighter.character.id === "akuma" && fighter.action?.move.kind === "projectile") {
    pose.frontArm = -108;
    pose.backArm = 62;
    pose.torsoTilt = -16;
    pose.headTilt = 8;
    pose.aura = 0.38;
  }

  if (fighter.character.id === "sakura" && fighter.action?.move.kind === "burst") {
    pose.frontArm = -8;
    pose.backArm = 98;
    pose.frontLeg = -18;
    pose.backLeg = 58;
    pose.torsoTilt = -24;
    pose.aura = 0.32;
  }

  if (fighter.character.id === "ken" && fighter.action?.key === "heavy") {
    pose.frontArm = -118;
    pose.backArm = 42;
    pose.frontLeg = -52;
    pose.backLeg = 26;
    pose.torsoTilt = -18;
    pose.aura = 0.3;
  }

  return pose;
}

function renderFighters(time) {
  state.fighters.forEach((fighter) => {
    const pose = getPose(fighter, time);
    const profile = fighter.profile;
    const baseX = fighter.x;
    const baseY = STAGE.floorY - fighter.y;
    fighter.dom.root.setAttribute("transform", `translate(${baseX} ${baseY})`);
    fighter.dom.figure.setAttribute("transform", `scale(${fighter.facing} 1)`);
    fighter.dom.root.classList.toggle("is-hit", fighter.flashTimer > 0);
    fighter.dom.root.classList.toggle("is-guard", fighter.guardTimer > 0);
    fighter.dom.root.classList.toggle("is-ko", fighter.ko);
    fighter.dom.nameplate.setAttribute("transform", `translate(0 ${pose.nameY})`);

    fighter.dom.aura.setAttribute("fill", fighter.character.palette.aura);
    fighter.dom.aura.setAttribute("opacity", String(pose.aura));
    fighter.dom.aura.setAttribute("transform", `translate(0 ${pose.torsoY * 0.6}) scale(${1 + pose.aura * 0.4} ${1 + pose.aura * 0.16})`);
    fighter.dom.trail.setAttribute("stroke-width", String(profile.trailWidth));

    fighter.dom.backLeg.setAttribute("transform", `translate(${-profile.hips} -54) rotate(${pose.backLeg}) scale(1 ${profile.legScale})`);
    fighter.dom.frontLeg.setAttribute("transform", `translate(${profile.hips} -54) rotate(${pose.frontLeg}) scale(1 ${profile.legScale})`);
    fighter.dom.backArm.setAttribute("transform", `translate(${-profile.shoulder} -114) rotate(${pose.backArm}) scale(1 ${profile.armScale})`);
    fighter.dom.frontArm.setAttribute("transform", `translate(${profile.shoulder} -114) rotate(${pose.frontArm}) scale(1 ${profile.armScale})`);
    fighter.dom.torso.setAttribute("transform", `translate(0 ${pose.torsoY}) rotate(${pose.torsoTilt}) scale(${profile.torsoScaleX} ${profile.torsoScaleY})`);
    fighter.dom.head.setAttribute("transform", `translate(0 ${pose.torsoY * 0.45 + profile.headOffset}) rotate(${pose.headTilt}) scale(${profile.headScale})`);
    fighter.dom.shadow.setAttribute("rx", String(48 * pose.shadow));
  });
}

function updateHud() {
  const [p1, p2] = state.fighters;
  if (!p1 || !p2) {
    return;
  }

  const p1Health = (p1.hp / p1.character.stats.health) * 100;
  const p2Health = (p2.hp / p2.character.stats.health) * 100;
  elements.hudP1HealthFill.style.width = `${p1Health}%`;
  elements.hudP2HealthFill.style.width = `${p2Health}%`;
  elements.hudP1MeterFill.style.width = `${p1.meter}%`;
  elements.hudP2MeterFill.style.width = `${p2.meter}%`;
  elements.timerDisplay.textContent = "∞";
}

function endMatch(winner, message) {
  if (state.phase !== "fight") {
    return;
  }

  resetInputState();
  state.phase = "over";
  state.projectiles = [];
  renderProjectiles();
  elements.battleOverlay.classList.remove("hidden");
  elements.overlayTitle.textContent = message;
  elements.overlaySubtitle.textContent = winner ? `${winner.character.name} 取得本回合胜利。` : "双方体力相同，战成平局。";
  setAnnouncer(message, 2500);
}

function consumePressedKeys() {
  state.keysPressed = Object.create(null);
}

function gameLoop(timestamp) {
  if (!state.lastFrame) {
    state.lastFrame = timestamp;
  }

  const dtMs = Math.min(32, timestamp - state.lastFrame || 16.67);
  const dt = dtMs / 16.67;
  state.lastFrame = timestamp;

  if (state.phase === "fight") {
    const [p1, p2] = state.fighters;
    if (p1 && p2) {
      updateFighterState(p1, p2, dt, dtMs);
      updateFighterState(p2, p1, dt, dtMs);
      solveSpacing();
      updateProjectiles(dt, dtMs);
      updateEffects(dtMs);
      renderFighters(timestamp);
      renderProjectiles();
      renderEffects();
      updateHud();
    }
  } else if (state.phase === "over") {
    updateEffects(dtMs);
    renderEffects();
  }

  if (timestamp > state.announcerUntil && state.phase === "fight") {
    elements.announcerText.textContent = "格斗进行中";
  }

  consumePressedKeys();
  state.loopId = requestAnimationFrame(gameLoop);
}

function bindEvents() {
  const blocked = new Set([
    "KeyW",
    "KeyA",
    "KeyS",
    "KeyD",
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "Space"
  ]);

  window.addEventListener("keydown", (event) => {
    if (blocked.has(event.code)) {
      event.preventDefault();
    }
    if (!state.keysDown[event.code]) {
      state.keysPressed[event.code] = true;
    }
    state.keysDown[event.code] = true;
  });

  window.addEventListener("keyup", (event) => {
    state.keysDown[event.code] = false;
  });

  elements.startBattleButton.addEventListener("click", startMatch);
  elements.rematchButton.addEventListener("click", startMatch);
  elements.backToSelectButton.addEventListener("click", backToSelection);
}

function init() {
  renderRoster();
  renderSelectionPanels();
  bindEvents();
}

init();
