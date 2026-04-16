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

const BATTLE_TUNING = {
  fighterScale: 0.86,
  groundSpeedScale: 0.52,
  airControlScale: 0.5,
  actionTravelScale: 0.58
};

const PROJECTILE_HITSTUN_MS = 500;
const GSAP = window.gsap;
const CROUCH_METER_MULTIPLIER = 1.75;
const CROUCH_PROJECTILE_CENTER_Y = 82;
const CROUCH_PROJECTILE_TOLERANCE = 34;

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
        damage: 12,
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
    trait: "压制型：更厚更重，但精神粉碎者的霸体窗口更短。",
    stats: { health: 104, speed: 4.05, jump: 8.1, power: 9.1, defense: 8.8, meterGain: 0.9, airControl: 0.18, weight: 1.12, damageTaken: 0.97 },
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
        damage: 6,
        meterCost: 24,
        cooldown: 1380,
        startup: 68,
        active: 154,
        recovery: 460,
        burstSpeed: 8.4,
        burstLift: 3.2,
        reach: 124,
        height: 122,
        hits: 2,
        hitInterval: 92,
        armor: true,
        armorStart: 70,
        armorEnd: 132,
        push: 10.2,
        stun: 320
      },
      skill2: {
        label: "头压",
        kind: "burst",
        damage: 13,
        meterCost: 32,
        cooldown: 1700,
        startup: 94,
        active: 128,
        recovery: 540,
        burstSpeed: 6,
        burstLift: 8.6,
        reach: 86,
        height: 156,
        push: 10.8,
        stun: 360
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
        damage: 11,
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
  },
  {
    id: "kyo",
    name: "草薙京",
    title: "草薙之炎与鬼烧反击并重的高校斗士",
    intro: "用暗拂扫过地面压制空间，再以鬼烧和重拳切回属于自己的节奏。",
    trait: "火焰连段型：中近距离压迫强，爆发稳，整体节奏接近街霸式攻防。",
    stats: { health: 100, speed: 4.8, jump: 9.3, power: 8.9, defense: 8.5, meterGain: 1.02, airControl: 0.24, weight: 1, damageTaken: 1 },
    palette: {
      primary: "#f4f4f8",
      secondary: "#f0bc45",
      trim: "#1f2741",
      aura: "#ff9c47",
      skin: "#efc6a3",
      dark: "#1a1c24"
    },
    costume: {
      hair: "M -20 -152 L -8 -178 L 2 -162 L 10 -180 L 22 -150 L 10 -136 Q -2 -142 -18 -136 Z",
      emblem: "M -10 -102 L 0 -116 L 10 -102 L 2 -84 H -2 Z",
      belt: "#f0bc45"
    },
    moves: {
      light: { label: "外式·轰斧阳", damage: 6, reach: 84, height: 100, startup: 54, active: 92, recovery: 170, push: 4.9, stun: 220 },
      heavy: { label: "七十五式·改", damage: 10, reach: 114, height: 116, startup: 100, active: 114, recovery: 302, dash: 6.9, push: 10.3, stun: 340 },
      skill1: {
        label: "百八式·暗拂",
        kind: "projectile",
        damage: 10,
        meterCost: 18,
        cooldown: 840,
        castTime: 142,
        recovery: 350,
        projectileSpeed: 8.4,
        projectileRadius: 20,
        projectileHeight: 108,
        projectileShape: "ember",
        projectileWaveAmp: 0.24,
        projectileWaveSpeed: 0.08,
        projectileLife: 1900,
        push: 7.1,
        stun: 290
      },
      skill2: {
        label: "百式·鬼烧",
        kind: "burst",
        damage: 8,
        meterCost: 28,
        cooldown: 1440,
        startup: 70,
        active: 136,
        recovery: 430,
        burstSpeed: 5,
        burstLift: 10.8,
        reach: 88,
        height: 156,
        hits: 2,
        hitInterval: 72,
        push: 12,
        stun: 420
      }
    }
  },
  {
    id: "iori",
    name: "八神庵",
    title: "紫炎暗拂与琴月冲杀的狂气斗士",
    intro: "依靠暗拂逼对手站位，再用琴月阴和重击强行把压迫带进贴身距离。",
    trait: "狂攻型：爆发高、逼退强，节奏最凶，但承伤也偏高。",
    stats: { health: 96, speed: 5, jump: 9.6, power: 9.4, defense: 7.9, meterGain: 1.08, airControl: 0.28, weight: 0.94, damageTaken: 1.05 },
    palette: {
      primary: "#2e2437",
      secondary: "#c74958",
      trim: "#7b4ad8",
      aura: "#b95aff",
      skin: "#efc4a2",
      dark: "#16131f"
    },
    costume: {
      hair: "M -20 -152 L -8 -182 L 0 -160 L 10 -184 L 22 -152 L 10 -134 Q -4 -142 -18 -134 Z",
      emblem: "M -14 -100 H 14 L 0 -82 Z",
      belt: "#c74958"
    },
    moves: {
      light: { label: "外式·梦弹", damage: 6, reach: 86, height: 98, startup: 48, active: 94, recovery: 168, push: 5.1, stun: 220 },
      heavy: { label: "外式·百合折", damage: 10, reach: 108, height: 124, startup: 88, active: 110, recovery: 278, dash: 6.2, push: 9.5, stun: 320 },
      skill1: {
        label: "百八式·暗拂",
        kind: "projectile",
        damage: 10,
        meterCost: 18,
        cooldown: 820,
        castTime: 136,
        recovery: 338,
        projectileSpeed: 9.2,
        projectileRadius: 20,
        projectileHeight: 114,
        projectileShape: "dark",
        projectileWaveAmp: 1.4,
        projectileWaveSpeed: 0.18,
        projectileLife: 2050,
        push: 7.5,
        stun: 300
      },
      skill2: {
        label: "琴月阴",
        kind: "dash",
        damage: 7,
        meterCost: 28,
        cooldown: 1420,
        startup: 72,
        active: 166,
        recovery: 420,
        burstSpeed: 8.8,
        burstLift: 3.4,
        reach: 126,
        height: 122,
        hits: 2,
        hitInterval: 82,
        push: 11.2,
        stun: 360
      }
    }
  },
  {
    id: "terry",
    name: "特瑞·博加德",
    title: "能量波与燃烧指节兼备的街头冠军",
    intro: "用能量波铺路，再靠燃烧指节和重脚强行撞开正面的防线。",
    trait: "街斗型：体格厚、招式直来直往，适合拳皇与街霸混合节奏。",
    stats: { health: 104, speed: 4.6, jump: 8.9, power: 9, defense: 8.8, meterGain: 0.96, airControl: 0.22, weight: 1.06, damageTaken: 0.97 },
    palette: {
      primary: "#c83534",
      secondary: "#f6e2a2",
      trim: "#27478b",
      aura: "#ffd46b",
      skin: "#efc7a4",
      dark: "#bead4a"
    },
    costume: {
      hair: "M -18 -146 Q -8 -162 10 -160 L 20 -148 Q 8 -142 -10 -138 Z",
      emblem: "M -14 -102 H 14 L 0 -84 Z",
      belt: "#27478b"
    },
    moves: {
      light: { label: "碎石直拳", damage: 6, reach: 88, height: 102, startup: 58, active: 90, recovery: 176, push: 4.9, stun: 210 },
      heavy: { label: "强力扣篮", damage: 10, reach: 114, height: 114, startup: 102, active: 112, recovery: 314, dash: 6.6, push: 10.1, stun: 330 },
      skill1: {
        label: "能量波",
        kind: "projectile",
        damage: 10,
        meterCost: 18,
        cooldown: 900,
        castTime: 150,
        recovery: 360,
        projectileSpeed: 8.6,
        projectileRadius: 22,
        projectileHeight: 110,
        projectileShape: "disc",
        projectileWaveAmp: 0.4,
        projectileWaveSpeed: 0.08,
        projectileLife: 2000,
        push: 7.2,
        stun: 285
      },
      skill2: {
        label: "燃烧指节",
        kind: "dash",
        damage: 7,
        meterCost: 28,
        cooldown: 1480,
        startup: 78,
        active: 174,
        recovery: 420,
        burstSpeed: 9.1,
        burstLift: 3.2,
        reach: 130,
        height: 120,
        hits: 2,
        hitInterval: 84,
        push: 11.5,
        stun: 350
      }
    }
  },
  {
    id: "mai",
    name: "不知火舞",
    title: "花蝶扇与忍蜂突袭结合的炎舞忍者",
    intro: "用花蝶扇远程扰动节奏，再靠忍蜂切入，以高速位移折磨对手的防线。",
    trait: "灵舞型：最飘逸的远近切换手，机动优秀，但容错偏低。",
    stats: { health: 94, speed: 5.4, jump: 10.2, power: 7.9, defense: 7.8, meterGain: 1.12, airControl: 0.38, weight: 0.86, damageTaken: 1.06 },
    palette: {
      primary: "#d43c47",
      secondary: "#fff0b3",
      trim: "#f2f4f8",
      aura: "#ff8cb5",
      skin: "#efc8a5",
      dark: "#4d241c"
    },
    costume: {
      hair: "M -20 -150 Q -8 -168 10 -164 L 22 -148 Q 8 -142 -18 -138 Z",
      emblem: "M -12 -100 L 0 -114 L 12 -100 L 0 -86 Z",
      belt: "#f2f4f8"
    },
    moves: {
      light: { label: "舞扇掌", damage: 5, reach: 84, height: 98, startup: 46, active: 96, recovery: 164, hits: 2, hitInterval: 48, push: 3.8, stun: 150 },
      heavy: { label: "龙炎舞", damage: 9, reach: 110, height: 112, startup: 92, active: 114, recovery: 274, dash: 5.8, push: 9.1, stun: 310 },
      skill1: {
        label: "花蝶扇",
        kind: "projectile",
        damage: 9,
        meterCost: 16,
        cooldown: 780,
        castTime: 130,
        recovery: 324,
        projectileSpeed: 9.1,
        projectileRadius: 18,
        projectileHeight: 114,
        projectileShape: "petal",
        projectileWaveAmp: 1,
        projectileWaveSpeed: 0.14,
        projectileLife: 1850,
        push: 6.8,
        stun: 270
      },
      skill2: {
        label: "必杀忍蜂",
        kind: "dash",
        damage: 6,
        meterCost: 28,
        cooldown: 1380,
        startup: 66,
        active: 176,
        recovery: 398,
        burstSpeed: 9.6,
        burstLift: 3.2,
        reach: 128,
        height: 124,
        hits: 3,
        hitInterval: 58,
        push: 11.2,
        stun: 360
      }
    }
  },
  {
    id: "leona",
    name: "莉安娜",
    title: "军刀切割与X口径炮并行的冷刃战士",
    intro: "用短促军刀技打断对手，再以 X 口径炮和旋转火花完成纪律化爆发。",
    trait: "特战型：攻守切换干脆，反打硬，整体手感偏冷静精准。",
    stats: { health: 100, speed: 4.9, jump: 9.4, power: 8.7, defense: 8.7, meterGain: 1, airControl: 0.26, weight: 0.98, damageTaken: 0.99 },
    palette: {
      primary: "#2d4f82",
      secondary: "#d9e9f8",
      trim: "#5bc6d4",
      aura: "#8fdcff",
      skin: "#efc9ac",
      dark: "#3d7868"
    },
    costume: {
      hair: "M -18 -154 L -6 -182 L 4 -160 L 10 -178 L 18 -152 L 8 -136 Q -2 -142 -16 -136 Z",
      emblem: "M -14 -100 H 14 L 0 -84 Z",
      belt: "#d9e9f8"
    },
    moves: {
      light: { label: "军刀直斩", damage: 6, reach: 84, height: 100, startup: 52, active: 92, recovery: 168, push: 4.8, stun: 210 },
      heavy: { label: "月光锯", damage: 9, reach: 108, height: 126, startup: 88, active: 112, recovery: 282, dash: 5.8, push: 9.2, stun: 320 },
      skill1: {
        label: "X口径炮",
        kind: "projectile",
        damage: 10,
        meterCost: 18,
        cooldown: 900,
        castTime: 142,
        recovery: 350,
        projectileSpeed: 8.8,
        projectileRadius: 18,
        projectileHeight: 124,
        projectileShape: "fang",
        projectileWaveAmp: 0.5,
        projectileWaveSpeed: 0.1,
        projectileLife: 1900,
        push: 7,
        stun: 300
      },
      skill2: {
        label: "旋转火花",
        kind: "burst",
        damage: 7,
        meterCost: 28,
        cooldown: 1440,
        startup: 72,
        active: 134,
        recovery: 430,
        burstSpeed: 5.1,
        burstLift: 10.2,
        reach: 86,
        height: 156,
        hits: 2,
        hitInterval: 78,
        push: 11.6,
        stun: 410
      }
    }
  },
  {
    id: "athena",
    name: "麻宫雅典娜",
    title: "精神球与凤凰箭并用的偶像超能力者",
    intro: "精神球稳住中距离，凤凰箭切入空中线，打起来更像灵巧版的街霸波升体系。",
    trait: "超能型：回气快、远程稳定、空中机动灵活，但硬碰硬偏吃亏。",
    stats: { health: 95, speed: 5.1, jump: 9.8, power: 8, defense: 8, meterGain: 1.14, airControl: 0.35, weight: 0.9, damageTaken: 1.03 },
    palette: {
      primary: "#f4f2ff",
      secondary: "#f17bb8",
      trim: "#4f5fd2",
      aura: "#8fd3ff",
      skin: "#f0cbab",
      dark: "#4a2d64"
    },
    costume: {
      hair: "M -18 -150 Q -4 -170 12 -164 L 22 -146 Q 10 -142 -16 -138 Z",
      emblem: "M -14 -100 H 14 L 0 -84 Z",
      belt: "#4f5fd2"
    },
    moves: {
      light: { label: "精神掌", damage: 5, reach: 84, height: 98, startup: 48, active: 92, recovery: 164, push: 4.1, stun: 180 },
      heavy: { label: "连环回旋踢", damage: 9, reach: 108, height: 116, startup: 92, active: 112, recovery: 274, dash: 5.4, push: 8.8, stun: 300 },
      skill1: {
        label: "精神球",
        kind: "projectile",
        damage: 9,
        meterCost: 18,
        cooldown: 820,
        castTime: 136,
        recovery: 330,
        projectileSpeed: 8.6,
        projectileRadius: 20,
        projectileHeight: 116,
        projectileShape: "soul",
        projectileWaveAmp: 0.9,
        projectileWaveSpeed: 0.14,
        projectileLife: 2100,
        push: 6.9,
        stun: 280
      },
      skill2: {
        label: "凤凰箭",
        kind: "burst",
        damage: 7,
        meterCost: 28,
        cooldown: 1360,
        startup: 74,
        active: 134,
        recovery: 404,
        burstSpeed: 5.1,
        burstLift: 10.4,
        reach: 86,
        height: 154,
        hits: 2,
        hitInterval: 74,
        push: 11.1,
        stun: 390
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
  },
  kyo: {
    shoulder: 29,
    hips: 18,
    armScale: 1.02,
    legScale: 1.01,
    torsoScaleX: 1,
    torsoScaleY: 1.02,
    headScale: 1,
    headOffset: 0,
    nameY: -196,
    previewScaleX: 1,
    previewScaleY: 1.01,
    previewYOffset: 0,
    auraBase: 0.12,
    swayScale: 0.96,
    walkScale: 1.02,
    frontArmBias: -8,
    backArmBias: 12,
    frontLegBias: 4,
    backLegBias: -2,
    torsoTiltBias: -3,
    headTiltBias: -1,
    bounceScale: 0.78,
    shadowScale: 1,
    trailWidth: 10
  },
  iori: {
    shoulder: 29,
    hips: 18,
    armScale: 1.03,
    legScale: 1.02,
    torsoScaleX: 0.98,
    torsoScaleY: 1.02,
    headScale: 1.01,
    headOffset: 0,
    nameY: -197,
    previewScaleX: 1,
    previewScaleY: 1,
    previewYOffset: 1,
    auraBase: 0.16,
    swayScale: 1.08,
    walkScale: 1.12,
    frontArmBias: -12,
    backArmBias: 14,
    frontLegBias: 6,
    backLegBias: -4,
    torsoTiltBias: -6,
    headTiltBias: -2,
    bounceScale: 0.96,
    shadowScale: 0.98,
    trailWidth: 11
  },
  terry: {
    shoulder: 31,
    hips: 19,
    armScale: 1.04,
    legScale: 1.02,
    torsoScaleX: 1.04,
    torsoScaleY: 1.04,
    headScale: 1.02,
    headOffset: 0,
    nameY: -198,
    previewScaleX: 1.03,
    previewScaleY: 1.02,
    previewYOffset: -1,
    auraBase: 0.12,
    swayScale: 0.94,
    walkScale: 1.02,
    frontArmBias: -10,
    backArmBias: 14,
    frontLegBias: 4,
    backLegBias: -2,
    torsoTiltBias: -2,
    headTiltBias: 0,
    bounceScale: 0.72,
    shadowScale: 1.04,
    trailWidth: 11
  },
  mai: {
    shoulder: 24,
    hips: 18,
    armScale: 0.94,
    legScale: 1.08,
    torsoScaleX: 0.88,
    torsoScaleY: 0.94,
    headScale: 0.95,
    headOffset: 2,
    nameY: -192,
    previewScaleX: 0.93,
    previewScaleY: 0.95,
    previewYOffset: 4,
    auraBase: 0.14,
    swayScale: 1.36,
    walkScale: 1.22,
    frontArmBias: -18,
    backArmBias: 10,
    frontLegBias: 14,
    backLegBias: -10,
    torsoTiltBias: -8,
    headTiltBias: -2,
    bounceScale: 1.42,
    shadowScale: 0.92,
    trailWidth: 8
  },
  leona: {
    shoulder: 25,
    hips: 18,
    armScale: 0.98,
    legScale: 1.02,
    torsoScaleX: 0.92,
    torsoScaleY: 0.98,
    headScale: 0.96,
    headOffset: 1,
    nameY: -194,
    previewScaleX: 0.95,
    previewScaleY: 0.98,
    previewYOffset: 2,
    auraBase: 0.11,
    swayScale: 1.02,
    walkScale: 1.06,
    frontArmBias: -12,
    backArmBias: 10,
    frontLegBias: 8,
    backLegBias: -4,
    torsoTiltBias: -4,
    headTiltBias: -1,
    bounceScale: 0.9,
    shadowScale: 0.96,
    trailWidth: 9
  },
  athena: {
    shoulder: 24,
    hips: 17,
    armScale: 0.92,
    legScale: 1.02,
    torsoScaleX: 0.9,
    torsoScaleY: 0.94,
    headScale: 0.98,
    headOffset: 2,
    nameY: -192,
    previewScaleX: 0.94,
    previewScaleY: 0.95,
    previewYOffset: 3,
    auraBase: 0.15,
    swayScale: 1.18,
    walkScale: 1.16,
    frontArmBias: -16,
    backArmBias: 8,
    frontLegBias: 10,
    backLegBias: -6,
    torsoTiltBias: -5,
    headTiltBias: -2,
    bounceScale: 1.2,
    shadowScale: 0.93,
    trailWidth: 9
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
    light: "KeyZ",
    heavy: "KeyX",
    skill1: "KeyC",
    skill2: "KeyV"
  },
  p2: {
    left: "ArrowLeft",
    right: "ArrowRight",
    up: "ArrowUp",
    down: "ArrowDown",
    light: "KeyM",
    heavy: "Comma",
    skill1: "Period",
    skill2: "Slash"
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

function appendSvgSpec(parent, spec) {
  const node = createSvgElement(spec.tag, spec.attrs);
  if (spec.text) {
    node.textContent = spec.text;
  }
  parent.appendChild(node);
  return node;
}

function appendSvgSpecs(parent, specs) {
  specs.forEach((spec) => appendSvgSpec(parent, spec));
}

function serializeSvgAttrs(attributes = {}) {
  return Object.entries(attributes)
    .map(([key, value]) => `${key}="${String(value).replace(/"/g, "&quot;")}"`)
    .join(" ");
}

function createSvgMarkup(tag, attributes = {}, children = "") {
  const attrs = serializeSvgAttrs(attributes);
  return `<${tag}${attrs ? ` ${attrs}` : ""}>${children}</${tag}>`;
}

function parseHexColor(color) {
  if (typeof color !== "string") {
    return null;
  }

  const value = color.trim();
  const short = /^#([0-9a-f]{3})$/i.exec(value);
  if (short) {
    return short[1].split("").map((channel) => Number.parseInt(channel + channel, 16));
  }

  const full = /^#([0-9a-f]{6})$/i.exec(value);
  if (full) {
    return [
      Number.parseInt(full[1].slice(0, 2), 16),
      Number.parseInt(full[1].slice(2, 4), 16),
      Number.parseInt(full[1].slice(4, 6), 16)
    ];
  }

  return null;
}

function mixColor(color, target, weight = 0.5) {
  const sourceRgb = parseHexColor(color);
  const targetRgb = parseHexColor(target);
  if (!sourceRgb || !targetRgb) {
    return color;
  }

  const ratio = clamp(weight, 0, 1);
  const mixed = sourceRgb.map((channel, index) =>
    Math.round(channel + (targetRgb[index] - channel) * ratio)
      .toString(16)
      .padStart(2, "0")
  );
  return `#${mixed.join("")}`;
}

function getModelPalette(character) {
  const { palette, costume } = character;
  return {
    primaryLight: mixColor(palette.primary, "#ffffff", 0.24),
    primaryShadow: mixColor(palette.primary, "#05070d", 0.34),
    trimLight: mixColor(palette.trim, "#ffffff", 0.22),
    trimShadow: mixColor(palette.trim, "#060b14", 0.28),
    skinShade: mixColor(palette.skin, "#56372b", 0.28),
    skinGlow: mixColor(palette.skin, "#fff0c8", 0.25),
    darkSoft: mixColor(palette.dark, "#ffffff", 0.1),
    darkDeep: mixColor(palette.dark, "#04060a", 0.28),
    beltLight: mixColor(costume.belt, "#ffffff", 0.18),
    beltShade: mixColor(costume.belt, "#05070d", 0.24),
    secondarySoft: mixColor(palette.secondary, "#ffffff", 0.16),
    secondaryDeep: mixColor(palette.secondary, "#06080d", 0.26)
  };
}

const MODEL_SHAPES = {
  arm: {
    main: "M -12 0 C -16 14 -15 36 -9 58 Q -6 76 0 86 Q 6 76 9 58 C 15 36 16 14 12 0 Z",
    shadow: "M -4 6 C -8 18 -8 38 -5 56 Q -2 72 2 80 Q 5 66 5 50 C 6 30 6 16 4 4 Z",
    line: "M -2 8 C -4 26 -4 46 -1 66",
    joint: "M -8 32 Q 0 26 8 32",
    wrap: "M -11 54 Q 0 50 11 54 L 10 64 Q 0 60 -10 64 Z",
    hand: "M -13 78 Q 0 72 13 78 Q 11 92 -5 92 Q -15 89 -13 78 Z",
    knuckles: "M -6 82 Q 0 80 6 82"
  },
  leg: {
    main: "M -14 0 C -18 18 -18 46 -12 80 Q -10 96 -2 108 Q 8 108 14 92 C 18 76 18 22 14 0 Z",
    shadow: "M -4 8 C -8 26 -8 54 -4 84 Q -2 96 2 104 Q 5 88 6 68 C 6 42 6 18 4 6 Z",
    line: "M -2 10 C -5 30 -4 56 -1 88",
    knee: "M -13 44 Q 0 40 13 44 L 11 54 Q 0 50 -11 54 Z",
    foot: "M -16 94 Q -2 88 16 94 L 24 106 Q 10 114 -14 110 Z",
    sole: "M -6 104 Q 8 108 20 102"
  },
  torso: {
    neck: "M -10 -132 Q 0 -124 10 -132 L 12 -112 Q 0 -102 -12 -112 Z",
    shell: "M -34 -116 Q -22 -140 0 -144 Q 22 -140 34 -116 L 30 -82 Q 30 -52 20 -40 Q 8 -28 0 -30 Q -10 -28 -22 -40 Q -30 -52 -30 -82 Z",
    yoke: "M -26 -114 Q 0 -132 26 -114 L 18 -92 Q 0 -104 -18 -92 Z",
    abdomen: "M -20 -106 Q 0 -92 20 -106 L 18 -60 Q 0 -46 -18 -60 Z",
    centerLine: "M 0 -118 L 0 -50",
    collar: "M -18 -118 L 0 -88 L 18 -118",
    waist: "M -30 -58 Q 0 -46 30 -58 L 28 -42 Q 0 -34 -28 -42 Z",
    sashLeft: "M -8 -44 L -2 -12 L 4 -44 Z",
    sashRight: "M 8 -44 L 14 -18 L 20 -44 Z"
  },
  head: {
    face: "M -22 -148 Q -22 -172 0 -178 Q 22 -172 22 -148 Q 20 -130 0 -126 Q -20 -130 -22 -148 Z",
    jawShadow: "M -12 -142 Q 0 -132 12 -142 Q 8 -128 0 -126 Q -8 -128 -12 -142 Z",
    foreheadGlow: "M -12 -166 Q -1 -172 10 -164 Q 2 -158 -10 -160 Z",
    brows: "M -10 -154 Q -4 -157 0 -154 Q 4 -157 10 -154",
    eyeLeft: "M -10 -148 H -3",
    eyeRight: "M 3 -148 H 10",
    nose: "M 0 -149 Q 2 -144 0 -138",
    mouth: "M -7 -135 Q 0 -132 7 -135"
  }
};

function getArmShapeSpecs(character, tones) {
  const { palette } = character;
  return [
    { tag: "path", attrs: { d: MODEL_SHAPES.arm.main, fill: palette.primary } },
    { tag: "path", attrs: { d: MODEL_SHAPES.arm.shadow, fill: tones.primaryShadow, opacity: 0.82 } },
    {
      tag: "path",
      attrs: {
        d: MODEL_SHAPES.arm.line,
        fill: "none",
        stroke: tones.primaryLight,
        "stroke-width": 3,
        "stroke-linecap": "round",
        opacity: 0.74
      }
    },
    {
      tag: "path",
      attrs: {
        d: MODEL_SHAPES.arm.joint,
        fill: "none",
        stroke: tones.primaryShadow,
        "stroke-width": 2.2,
        "stroke-linecap": "round",
        opacity: 0.58
      }
    },
    { tag: "path", attrs: { d: MODEL_SHAPES.arm.wrap, fill: tones.secondaryDeep, opacity: 0.92 } },
    { tag: "path", attrs: { d: MODEL_SHAPES.arm.hand, fill: palette.skin } },
    {
      tag: "path",
      attrs: {
        d: MODEL_SHAPES.arm.knuckles,
        fill: "none",
        stroke: tones.skinShade,
        "stroke-width": 2.1,
        "stroke-linecap": "round",
        opacity: 0.68
      }
    }
  ];
}

function getLegShapeSpecs(character, tones) {
  const { palette } = character;
  return [
    { tag: "path", attrs: { d: MODEL_SHAPES.leg.main, fill: palette.trim } },
    { tag: "path", attrs: { d: MODEL_SHAPES.leg.shadow, fill: tones.trimShadow, opacity: 0.8 } },
    {
      tag: "path",
      attrs: {
        d: MODEL_SHAPES.leg.line,
        fill: "none",
        stroke: tones.trimLight,
        "stroke-width": 3.1,
        "stroke-linecap": "round",
        opacity: 0.7
      }
    },
    { tag: "path", attrs: { d: MODEL_SHAPES.leg.knee, fill: tones.secondaryDeep, opacity: 0.92 } },
    { tag: "path", attrs: { d: MODEL_SHAPES.leg.foot, fill: tones.darkDeep } },
    {
      tag: "path",
      attrs: {
        d: MODEL_SHAPES.leg.sole,
        fill: "none",
        stroke: tones.darkSoft,
        "stroke-width": 2.8,
        "stroke-linecap": "round",
        opacity: 0.85
      }
    }
  ];
}

function getTorsoShapeSpecs(character, tones) {
  const { palette, costume } = character;
  return [
    { tag: "path", attrs: { d: MODEL_SHAPES.torso.neck, fill: palette.skin } },
    { tag: "path", attrs: { d: MODEL_SHAPES.torso.shell, fill: palette.primary } },
    { tag: "path", attrs: { d: MODEL_SHAPES.torso.yoke, fill: tones.primaryLight, opacity: 0.44 } },
    { tag: "path", attrs: { d: MODEL_SHAPES.torso.abdomen, fill: tones.primaryShadow, opacity: 0.82 } },
    {
      tag: "path",
      attrs: {
        d: MODEL_SHAPES.torso.collar,
        fill: "none",
        stroke: tones.secondarySoft,
        "stroke-width": 5,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        opacity: 0.84
      }
    },
    {
      tag: "path",
      attrs: {
        d: MODEL_SHAPES.torso.centerLine,
        fill: "none",
        stroke: tones.primaryShadow,
        "stroke-width": 3,
        "stroke-linecap": "round",
        opacity: 0.38
      }
    },
    { tag: "path", attrs: { d: costume.emblem, fill: palette.secondary } },
    { tag: "path", attrs: { d: MODEL_SHAPES.torso.waist, fill: costume.belt } },
    {
      tag: "path",
      attrs: {
        d: "M -24 -52 Q 0 -44 24 -52",
        fill: "none",
        stroke: tones.beltLight,
        "stroke-width": 2.6,
        "stroke-linecap": "round",
        opacity: 0.76
      }
    },
    { tag: "path", attrs: { d: MODEL_SHAPES.torso.sashLeft, fill: tones.beltShade, opacity: 0.96 } },
    { tag: "path", attrs: { d: MODEL_SHAPES.torso.sashRight, fill: tones.beltShade, opacity: 0.92 } }
  ];
}

function getHeadShapeSpecs(character, tones) {
  const { palette, costume } = character;
  return [
    { tag: "ellipse", attrs: { cx: -22, cy: -148, rx: 4, ry: 8, fill: tones.skinShade, opacity: 0.42 } },
    { tag: "ellipse", attrs: { cx: 22, cy: -148, rx: 4, ry: 8, fill: tones.skinShade, opacity: 0.42 } },
    { tag: "path", attrs: { d: MODEL_SHAPES.head.face, fill: palette.skin } },
    { tag: "path", attrs: { d: MODEL_SHAPES.head.jawShadow, fill: tones.skinShade, opacity: 0.42 } },
    { tag: "path", attrs: { d: MODEL_SHAPES.head.foreheadGlow, fill: tones.skinGlow, opacity: 0.24 } },
    { tag: "path", attrs: { d: costume.hair, fill: palette.dark } },
    {
      tag: "path",
      attrs: {
        d: MODEL_SHAPES.head.brows,
        fill: "none",
        stroke: tones.darkDeep,
        "stroke-width": 2.8,
        "stroke-linecap": "round",
        opacity: 0.72
      }
    },
    {
      tag: "path",
      attrs: {
        d: MODEL_SHAPES.head.eyeLeft,
        fill: "none",
        stroke: tones.darkDeep,
        "stroke-width": 2.4,
        "stroke-linecap": "round",
        opacity: 0.84
      }
    },
    {
      tag: "path",
      attrs: {
        d: MODEL_SHAPES.head.eyeRight,
        fill: "none",
        stroke: tones.darkDeep,
        "stroke-width": 2.4,
        "stroke-linecap": "round",
        opacity: 0.84
      }
    },
    {
      tag: "path",
      attrs: {
        d: MODEL_SHAPES.head.nose,
        fill: "none",
        stroke: tones.skinShade,
        "stroke-width": 2.1,
        "stroke-linecap": "round",
        opacity: 0.74
      }
    },
    {
      tag: "path",
      attrs: {
        d: MODEL_SHAPES.head.mouth,
        fill: "none",
        stroke: tones.skinShade,
        "stroke-width": 2.1,
        "stroke-linecap": "round",
        opacity: 0.8
      }
    }
  ];
}

function getPreviewModelMarkup(character, profile) {
  const tones = getModelPalette(character);
  const outlineClass = "preview-outline";
  const groupMarkup = (extraClass, transform, specs, opacity = 1) =>
    createSvgMarkup(
      "g",
      {
        class: `${outlineClass} ${extraClass}`,
        transform,
        opacity
      },
      specs.map((spec) => createSvgMarkup(spec.tag, spec.attrs)).join("")
    );

  return [
    createSvgMarkup("path", {
      d: "M -74 -52 Q 0 -126 74 -52",
      fill: "none",
      stroke: character.palette.aura,
      "stroke-width": 8,
      "stroke-linecap": "round",
      opacity: 0.52
    }),
    groupMarkup(
      "preview-back-leg",
      `translate(${-profile.hips * 1.08} -48) rotate(9) scale(1 ${profile.legScale * 0.98})`,
      getLegShapeSpecs(character, tones),
      0.88
    ),
    groupMarkup(
      "preview-back-arm",
      `translate(${-profile.shoulder} -112) rotate(24) scale(1 ${profile.armScale * 0.98})`,
      getArmShapeSpecs(character, tones),
      0.9
    ),
    groupMarkup(
      "preview-torso",
      `translate(0 0) scale(${profile.torsoScaleX} ${profile.torsoScaleY})`,
      getTorsoShapeSpecs(character, tones)
    ),
    groupMarkup(
      "preview-front-leg",
      `translate(${profile.hips * 1.08} -48) rotate(-8) scale(1 ${profile.legScale})`,
      getLegShapeSpecs(character, tones)
    ),
    groupMarkup(
      "preview-front-arm",
      `translate(${profile.shoulder} -112) rotate(-24) scale(1 ${profile.armScale})`,
      getArmShapeSpecs(character, tones)
    ),
    groupMarkup(
      "preview-head",
      `translate(0 ${profile.headOffset}) scale(${profile.headScale})`,
      getHeadShapeSpecs(character, tones)
    )
  ].join("");
}

function getCharacter(id) {
  return roster.find((item) => item.id === id);
}

function keyName(code) {
  const map = {
    KeyZ: "Z",
    KeyX: "X",
    KeyC: "C",
    KeyV: "V",
    KeyM: "M",
    Comma: ",",
    Period: ".",
    Slash: "/",
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
    case "kyo":
      return `
        <path d="M -18 -108 L 0 -84 L 18 -108" fill="none" stroke="${palette.secondary}" stroke-width="7" stroke-linecap="round"></path>
        <path d="M -18 -72 Q 0 -56 18 -72" fill="none" stroke="${palette.secondary}" stroke-width="7" stroke-linecap="round" opacity="0.82"></path>
      `;
    case "iori":
      return `
        <path d="M -22 -154 Q -34 -132 -24 -104" fill="none" stroke="${palette.secondary}" stroke-width="8" stroke-linecap="round"></path>
        <path d="M 18 -154 Q 8 -130 14 -102" fill="none" stroke="${palette.trim}" stroke-width="6" stroke-linecap="round" opacity="0.86"></path>
      `;
    case "terry":
      return `
        <path d="M -24 -160 Q 0 -178 24 -160 L 18 -144 H -18 Z" fill="${palette.secondary}" opacity="0.92"></path>
        <path d="M 12 -140 Q 44 -84 46 -28" fill="none" stroke="${palette.dark}" stroke-width="7" stroke-linecap="round"></path>
      `;
    case "mai":
      return `
        <circle cx="-20" cy="-148" r="10" fill="${palette.secondary}" opacity="0.92"></circle>
        <circle cx="20" cy="-148" r="10" fill="${palette.secondary}" opacity="0.92"></circle>
        <path d="M -26 -74 Q 0 -34 26 -74" fill="${palette.secondary}" opacity="0.72"></path>
      `;
    case "leona":
      return `
        <path d="M -18 -156 L -4 -184 L 8 -156" fill="none" stroke="${palette.secondary}" stroke-width="8" stroke-linecap="round"></path>
        <path d="M -18 -108 H 18" fill="none" stroke="${palette.secondary}" stroke-width="6" stroke-linecap="round" opacity="0.8"></path>
      `;
    case "athena":
      return `
        <ellipse cx="0" cy="-154" rx="26" ry="8" fill="${palette.secondary}" opacity="0.9"></ellipse>
        <path d="M -24 -98 Q 0 -82 24 -98" fill="none" stroke="${palette.secondary}" stroke-width="6" stroke-linecap="round"></path>
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
    case "kyo":
      add(parts.torso, "path", {
        d: "M -18 -108 L 0 -84 L 18 -108",
        fill: "none",
        stroke: palette.secondary,
        "stroke-width": 7,
        "stroke-linecap": "round"
      });
      add(parts.torso, "path", {
        d: "M -18 -72 Q 0 -56 18 -72",
        fill: "none",
        stroke: palette.secondary,
        "stroke-width": 7,
        "stroke-linecap": "round",
        opacity: 0.82
      });
      break;
    case "iori":
      add(parts.head, "path", {
        d: "M -22 -154 Q -34 -132 -24 -104",
        fill: "none",
        stroke: palette.secondary,
        "stroke-width": 8,
        "stroke-linecap": "round"
      });
      add(parts.head, "path", {
        d: "M 18 -154 Q 8 -130 14 -102",
        fill: "none",
        stroke: palette.trim,
        "stroke-width": 6,
        "stroke-linecap": "round",
        opacity: 0.86
      });
      break;
    case "terry":
      add(parts.head, "path", {
        stroke: palette.secondary,
        d: "M -24 -160 Q 0 -178 24 -160 L 18 -144 H -18 Z",
        fill: palette.secondary,
        opacity: 0.92
      });
      add(parts.body, "path", {
        d: "M 12 -140 Q 44 -84 46 -28",
        fill: "none",
        stroke: palette.dark,
        "stroke-width": 7,
        "stroke-linecap": "round"
      });
      break;
    case "mai":
      add(parts.head, "path", {
        d: "M -20 -148 Q -28 -164 -12 -166 Q -4 -158 -10 -142 Z",
        fill: palette.secondary,
        opacity: 0.9
      });
      add(parts.head, "path", {
        d: "M 20 -148 Q 28 -164 12 -166 Q 4 -158 10 -142 Z",
        fill: palette.secondary,
        opacity: 0.9
      });
      add(parts.torso, "path", {
        d: "M -26 -74 Q 0 -34 26 -74",
        fill: palette.secondary,
        opacity: 0.72
      });
      break;
    case "leona":
      add(parts.head, "path", {
        d: "M -18 -156 L -4 -184 L 8 -156",
        fill: "none",
        stroke: palette.secondary,
        "stroke-width": 8,
        "stroke-linecap": "round"
      });
      add(parts.torso, "path", {
        d: "M -18 -108 H 18",
        fill: "none",
        stroke: palette.secondary,
        "stroke-width": 6,
        "stroke-linecap": "round",
        opacity: 0.8
      });
      break;
    case "athena":
      add(parts.head, "ellipse", {
        cx: 0,
        cy: -154,
        rx: 26,
        ry: 8,
        fill: palette.secondary,
        opacity: 0.9
      });
      add(parts.torso, "path", {
        d: "M -24 -98 Q 0 -82 24 -98",
        fill: "none",
        stroke: palette.secondary,
        "stroke-width": 6,
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
        ${getPreviewModelMarkup(character, profile)}
        ${getPreviewAccessoryMarkup(character)}
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
    actionSerial: 0,
    reactionSerial: 0,
    action: null,
    hitstun: 0,
    flashTimer: 0,
    guardTimer: 0,
    ko: false,
    controller,
    dom: null,
    animation: null
  };
}

function createFighterNode(fighter) {
  const tones = getModelPalette(fighter.character);
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
  const backLeg = createSvgElement("g", { class: "fighter-outline limb back-leg", opacity: 0.9 });
  const frontLeg = createSvgElement("g", { class: "fighter-outline limb front-leg" });
  const backArm = createSvgElement("g", { class: "fighter-outline limb back-arm", opacity: 0.9 });
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

  appendSvgSpecs(backLeg, getLegShapeSpecs(fighter.character, tones));
  appendSvgSpecs(frontLeg, getLegShapeSpecs(fighter.character, tones));
  appendSvgSpecs(backArm, getArmShapeSpecs(fighter.character, tones));
  appendSvgSpecs(frontArm, getArmShapeSpecs(fighter.character, tones));
  appendSvgSpecs(torso, getTorsoShapeSpecs(fighter.character, tones));
  appendSvgSpecs(head, getHeadShapeSpecs(fighter.character, tones));

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

  body.append(aura, backLeg, backArm, torso, frontLeg, frontArm, head, trail);
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
    fighter.animation = createFighterAnimation(fighter);
    syncFighterAnimation(fighter, true);
  });

  renderFighters();
}

function startMatch() {
  clearAllFighterAnimations();
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
  clearAllFighterAnimations();
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
    id: ++fighter.actionSerial,
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
  const baseHitstun = armorActive ? move.stun * 0.18 : guarding ? move.stun * 0.45 : move.stun;
  const projectileHitstun =
    !guarding && !armorActive && sourceType === "projectile" && move.kind === "projectile" ? PROJECTILE_HITSTUN_MS : 0;
  defender.hp = clamp(defender.hp - damage, 0, defender.character.stats.health);
  defender.hitstun = Math.max(baseHitstun, projectileHitstun);
  defender.flashTimer = 140;
  defender.vx = (attacker.facing * (guarding ? move.push * 0.45 : armorActive ? move.push * 0.25 : move.push)) / weight;
  defender.vy = (guarding ? 1.8 : sourceType === "projectile" ? 2.2 : move.kind === "burst" || move.kind === "dash" ? 6.2 : 3.6) / weight;
  defender.state = guarding ? "guard" : armorActive ? defender.state : "hit";
  defender.reactionSerial += 1;
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

function isCrouching(fighter) {
  return fighter.y === 0 && fighter.state === "crouch" && !fighter.action && fighter.hitstun <= 0 && !fighter.ko;
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

function tryResolveAuraHit(fighter, opponent) {
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
  const frontOk = move.frontOnly ? fighter.facing * (opponent.x - fighter.x) > -6 : true;
  if (!frontOk || xDistance > (move.auraRadius || 96) || yDistance > (move.auraHeight || 120)) {
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
    fighter.vx = fighter.facing * move.dash * BATTLE_TUNING.actionTravelScale;
  }

  if (move.kind === "dash" && action.elapsed >= move.startup * 0.55 && action.elapsed < move.startup + move.active) {
    fighter.vx = fighter.facing * move.burstSpeed * BATTLE_TUNING.actionTravelScale;
    if (!action.launched && fighter.y === 0) {
      fighter.vy = move.burstLift;
      action.launched = true;
    }
  }

  if (move.kind === "burst" && action.elapsed >= move.startup * 0.45 && action.elapsed < move.startup + move.active) {
    fighter.vx = fighter.facing * move.burstSpeed * BATTLE_TUNING.actionTravelScale;
    if (!action.launched) {
      fighter.vy = move.burstLift;
      action.launched = true;
    }
  }

  if (move.kind === "projectile" && !action.projectileSpawned && action.elapsed >= move.castTime) {
    action.projectileSpawned = true;
    spawnProjectile(fighter, move);
  }

  if (move.kind === "aura") {
    tryResolveAuraHit(fighter, opponent);
  } else if (action.key === "light" || action.key === "heavy" || move.kind === "burst" || move.kind === "dash") {
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
        fighter.state = "crouch";
        fighter.guardTimer = 120;
        fighter.vx *= 0.62;
      } else if (direction !== 0) {
        fighter.vx += (direction * fighter.character.stats.speed * BATTLE_TUNING.groundSpeedScale - fighter.vx) * 0.34;
        fighter.state = "walk";
      } else {
        fighter.vx *= 0.74;
        fighter.state = "idle";
      }
    } else {
      fighter.vx += direction * (fighter.character.stats.airControl || 0.22) * BATTLE_TUNING.airControlScale;
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
  const meterMultiplier = isCrouching(fighter) ? CROUCH_METER_MULTIPLIER : 1;
  fighter.meter = clamp(
    fighter.meter + STAGE.baseMeterGain * dtMs * (fighter.character.stats.meterGain || 1) * meterMultiplier,
    0,
    100
  );
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

    const ducking = isCrouching(target);
    const hurtboxCenterY = target.y + (ducking ? CROUCH_PROJECTILE_CENTER_Y : 106);
    const hurtboxTolerance = projectile.radius + (ducking ? CROUCH_PROJECTILE_TOLERANCE : 52);
    const hitX = Math.abs(projectile.x - target.x);
    const hitY = Math.abs(projectile.y - hurtboxCenterY);
    if (hitX < projectile.radius + 36 && hitY < hurtboxTolerance) {
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
    } else if (projectile.shape === "ember") {
      group.append(
        createSvgElement("path", {
          class: "projectile-core",
          d: `M ${-projectile.radius * 1.6} 0 Q ${-projectile.radius * 0.2} ${-projectile.radius * 1.1} ${projectile.radius * 0.8} 0 Q ${-projectile.radius * 0.2} ${projectile.radius * 1.1} ${-projectile.radius * 1.6} 0`,
          fill: projectile.color,
          opacity: 0.34
        }),
        createSvgElement("circle", {
          class: "projectile-core",
          r: projectile.radius * 0.88,
          fill: projectile.color,
          opacity: 0.9
        }),
        createSvgElement("circle", {
          r: projectile.radius * 0.36,
          fill: "#fff2cf",
          opacity: 0.88
        })
      );
    } else if (projectile.shape === "tiger") {
      group.append(
        createSvgElement("ellipse", {
          class: "projectile-core",
          rx: projectile.radius + 12,
          ry: projectile.radius * 0.72,
          fill: projectile.color,
          opacity: 0.24
        }),
        createSvgElement("ellipse", {
          class: "projectile-core",
          rx: projectile.radius,
          ry: projectile.radius * 0.6,
          fill: projectile.color,
          opacity: 0.92
        })
      );
      [-0.6, 0, 0.6].forEach((offset) => {
        group.appendChild(
          createSvgElement("path", {
            d: `M ${offset * projectile.radius * 1.4} ${-projectile.radius * 0.58} V ${projectile.radius * 0.58}`,
            stroke: "#7d2c16",
            "stroke-width": 2.6,
            opacity: 0.7
          })
        );
      });
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
    } else if (projectile.shape === "soul") {
      group.append(
        createSvgElement("ellipse", {
          class: "projectile-core",
          rx: projectile.radius + 12,
          ry: projectile.radius * 0.9,
          fill: projectile.color,
          opacity: 0.18
        }),
        createSvgElement("circle", {
          class: "projectile-core",
          r: projectile.radius * 0.88,
          fill: projectile.color,
          opacity: 0.84
        }),
        createSvgElement("path", {
          d: `M ${-projectile.radius * 1.2} 0 Q 0 ${-projectile.radius * 1.24} ${projectile.radius * 1.18} 0 Q 0 ${projectile.radius * 0.52} ${-projectile.radius * 1.2} 0`,
          fill: "none",
          stroke: "#fff6db",
          "stroke-width": 3,
          "stroke-linecap": "round",
          opacity: 0.84
        }),
        createSvgElement("circle", {
          r: projectile.radius * 0.28,
          fill: "#fffaf0",
          opacity: 0.9
        })
      );
    } else if (projectile.shape === "fang") {
      group.append(
        createSvgElement("path", {
          class: "projectile-core",
          d: `M ${-projectile.radius * 1.42} 0 Q ${-projectile.radius * 0.1} ${-projectile.radius * 1.08} ${projectile.radius * 1.18} ${-projectile.radius * 0.28} Q ${projectile.radius * 0.36} 0 ${projectile.radius * 1.18} ${projectile.radius * 0.28} Q ${-projectile.radius * 0.1} ${projectile.radius * 1.08} ${-projectile.radius * 1.42} 0 Z`,
          fill: projectile.color,
          opacity: 0.82
        }),
        createSvgElement("path", {
          d: `M ${-projectile.radius * 0.94} 0 Q ${projectile.radius * 0.04} ${-projectile.radius * 0.74} ${projectile.radius * 0.88} ${-projectile.radius * 0.2} Q ${projectile.radius * 0.28} 0 ${projectile.radius * 0.88} ${projectile.radius * 0.2} Q ${projectile.radius * 0.04} ${projectile.radius * 0.74} ${-projectile.radius * 0.94} 0 Z`,
          fill: "#ffd2f6",
          opacity: 0.82
        }),
        createSvgElement("circle", {
          r: projectile.radius * 0.22,
          fill: "#fff3ff",
          opacity: 0.92
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

function finalizePose(fighter, rawPose = {}) {
  const profile = fighter.profile;
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
    nameY: profile.nameY,
    figureY: 0,
    figureScaleX: 1,
    figureScaleY: 1,
    trailOpacity: 0,
    trailReach: 96,
    trailLift: 74,
    ...rawPose
  };

  pose.backArm += profile.backArmBias;
  pose.frontArm += profile.frontArmBias;
  pose.backLeg += profile.backLegBias;
  pose.frontLeg += profile.frontLegBias;
  pose.torsoTilt += profile.torsoTiltBias;
  pose.headTilt += profile.headTiltBias;
  pose.shadow *= profile.shadowScale;
  pose.aura = Math.max(pose.aura, profile.auraBase);

  return pose;
}

function getIdleRawPose(fighter, variant = 0) {
  const sway = 5.2 * fighter.profile.swayScale;
  const direction = variant === 0 ? 1 : -1;
  return {
    backArm: 12 + sway * 0.72 * direction,
    frontArm: -14 - sway * 0.52 * direction,
    backLeg: 16 + sway * 0.28 * direction,
    frontLeg: -18 - sway * 0.28 * direction,
    torsoY: fighter.profile.bounceScale * 1.1 * direction,
    torsoTilt: -2 * direction,
    headTilt: direction,
    figureY: -1 + direction * 2,
    figureScaleX: 1 + direction * 0.01,
    figureScaleY: 1 - direction * 0.012,
    aura: fighter.profile.auraBase + 0.02
  };
}

function getWalkRawPose(fighter, variant = 0) {
  const walk = 28 * fighter.profile.walkScale;
  const direction = variant === 0 ? 1 : -1;
  return {
    backArm: -28 - walk * 0.52 * direction,
    frontArm: 28 + walk * 0.52 * direction,
    backLeg: 26 + walk * direction,
    frontLeg: -26 - walk * direction,
    torsoY: Math.abs(walk) * 0.1,
    figureY: direction > 0 ? 4 : -1,
    figureScaleX: 1 + direction * 0.025,
    figureScaleY: 0.95 + (direction > 0 ? 0.04 : 0),
    aura: 0.18
  };
}

function getStateRawPose(fighter, state) {
  switch (state) {
    case "jump":
      return { backArm: -62, frontArm: 78, backLeg: 56, frontLeg: -48, torsoTilt: -10, shadow: 0.82, aura: 0.24, figureY: -8, figureScaleX: 0.92, figureScaleY: 1.08 };
    case "crouch":
      return { backArm: 12, frontArm: -28, backLeg: 34, frontLeg: 48, torsoTilt: -18, torsoY: 16, headTilt: -8, shadow: 0.88, aura: 0.2, figureY: 10, figureScaleX: 1.05, figureScaleY: 0.82 };
    case "guard":
      return { backArm: -12, frontArm: -96, backLeg: 20, frontLeg: 42, torsoTilt: -16, torsoY: 12, headTilt: -8, aura: 0.24, figureY: 6, figureScaleX: 1.04, figureScaleY: 0.94 };
    case "hit":
      return { backArm: 78, frontArm: 54, backLeg: 28, frontLeg: -28, torsoTilt: 20, headTilt: 14, aura: 0.2, figureY: -4, figureScaleX: 1.06, figureScaleY: 0.92 };
    case "ko":
      return { backArm: 96, frontArm: 114, backLeg: 66, frontLeg: 82, torsoTilt: 92, torsoY: 14, headTilt: 36, shadow: 0.72, aura: 0.04, figureY: 8, figureScaleX: 1.08, figureScaleY: 0.86 };
    default:
      return getIdleRawPose(fighter, 0);
  }
}

function getActionAnticRawPose(fighter) {
  if (!fighter.action) {
    return getIdleRawPose(fighter, 0);
  }

  const { key, move } = fighter.action;

  if (key === "light") {
    return { backArm: -8, frontArm: 18, backLeg: -14, frontLeg: 10, torsoTilt: 8, figureY: 4, figureScaleX: 1.04, figureScaleY: 0.95, aura: 0.14 };
  }

  if (key === "heavy") {
    return { backArm: -20, frontArm: 26, backLeg: -18, frontLeg: 18, torsoTilt: 16, headTilt: 4, figureY: 6, figureScaleX: 1.08, figureScaleY: 0.9, aura: 0.18, trailOpacity: 0.1 };
  }

  if (move.kind === "projectile") {
    return { backArm: -24, frontArm: 22, backLeg: -10, frontLeg: 12, torsoTilt: 12, headTilt: 2, figureY: 5, figureScaleX: 1.05, figureScaleY: 0.94, aura: 0.2, trailOpacity: 0.12 };
  }

  if (move.kind === "dash") {
    return { backArm: -34, frontArm: 20, backLeg: -22, frontLeg: 20, torsoTilt: 18, headTilt: 4, figureY: 8, figureScaleX: 1.08, figureScaleY: 0.9, aura: 0.22, trailOpacity: 0.16, trailReach: 120 };
  }

  if (move.kind === "burst") {
    return { backArm: -18, frontArm: 16, backLeg: -16, frontLeg: 18, torsoTilt: 20, headTilt: 6, figureY: 9, figureScaleX: 1.1, figureScaleY: 0.88, aura: 0.24, trailOpacity: 0.18, trailReach: 126 };
  }

  return getIdleRawPose(fighter, 0);
}

function getActionRawPose(fighter) {
  if (!fighter.action) {
    return getIdleRawPose(fighter, 0);
  }

  const { key, move } = fighter.action;
  let pose;

  if (key === "light") {
    pose = { frontArm: -90, backArm: 42, torsoTilt: -10, frontLeg: 20, backLeg: -2, figureY: -4, figureScaleX: 0.96, figureScaleY: 1.06, aura: 0.24, trailOpacity: 0.18, trailReach: 116, trailLift: 84 };
  } else if (key === "heavy") {
    pose = { frontLeg: -62, backLeg: 36, frontArm: -132, backArm: 52, torsoTilt: -20, headTilt: -4, figureY: -6, figureScaleX: 0.92, figureScaleY: 1.1, aura: 0.34, trailOpacity: 0.54, trailReach: 162, trailLift: 116 };
  } else if (move.kind === "projectile") {
    pose = { frontArm: -112, backArm: 56, backLeg: 8, frontLeg: -8, torsoTilt: -16, figureY: -6, figureScaleX: 0.94, figureScaleY: 1.08, aura: 0.36, trailOpacity: 0.34, trailReach: 144, trailLift: 94 };
  } else if (move.kind === "dash") {
    pose = { frontArm: -54, backArm: 108, frontLeg: -82, backLeg: 34, torsoTilt: -30, headTilt: -6, figureY: -10, figureScaleX: 0.9, figureScaleY: 1.14, aura: 0.42, trailOpacity: 0.62, trailReach: 180, trailLift: 112 };
  } else if (move.kind === "burst") {
    pose = { frontArm: -24, backArm: 132, frontLeg: -40, backLeg: 76, torsoTilt: -32, headTilt: -8, figureY: -14, figureScaleX: 0.88, figureScaleY: 1.18, aura: 0.48, trailOpacity: 0.72, trailReach: 188, trailLift: 136 };
  } else {
    pose = getIdleRawPose(fighter, 0);
  }

  if (fighter.character.id === "chunli" && key === "light") {
    pose = { frontArm: -28, backArm: 48, frontLeg: -104, backLeg: 48, torsoTilt: -18, figureY: -6, figureScaleX: 0.92, figureScaleY: 1.12, aura: 0.3, trailOpacity: 0.3, trailReach: 156, trailLift: 92 };
  }

  if (fighter.character.id === "vega" && move.kind === "dash") {
    pose = { frontArm: -120, backArm: 54, frontLeg: -92, backLeg: 26, torsoTilt: -34, figureY: -10, figureScaleX: 0.88, figureScaleY: 1.16, aura: 0.46, trailOpacity: 0.66, trailReach: 194, trailLift: 118 };
  }

  if (fighter.character.id === "akuma" && move.kind === "projectile") {
    pose = { frontArm: -126, backArm: 78, torsoTilt: -24, headTilt: 10, figureY: -8, figureScaleX: 0.92, figureScaleY: 1.1, aura: 0.44, trailOpacity: 0.42, trailReach: 166, trailLift: 108 };
  }

  if (fighter.character.id === "sakura" && move.kind === "burst") {
    pose = { frontArm: -12, backArm: 116, frontLeg: -24, backLeg: 72, torsoTilt: -30, figureY: -12, figureScaleX: 0.9, figureScaleY: 1.16, aura: 0.42, trailOpacity: 0.68, trailReach: 184, trailLift: 128 };
  }

  if (fighter.character.id === "ken" && key === "heavy") {
    pose = { frontArm: -142, backArm: 56, frontLeg: -72, backLeg: 32, torsoTilt: -24, figureY: -8, figureScaleX: 0.9, figureScaleY: 1.12, aura: 0.38, trailOpacity: 0.6, trailReach: 174, trailLift: 120 };
  }

  if (fighter.character.id === "kyo" && move.kind === "projectile") {
    pose = { frontArm: -120, backArm: 58, frontLeg: -8, backLeg: 12, torsoTilt: -18, figureY: -6, figureScaleX: 0.94, figureScaleY: 1.08, aura: 0.38, trailOpacity: 0.38, trailReach: 158, trailLift: 96 };
  }

  if (fighter.character.id === "iori" && move.kind === "dash") {
    pose = { frontArm: -92, backArm: 72, frontLeg: -94, backLeg: 20, torsoTilt: -34, headTilt: -8, figureY: -12, figureScaleX: 0.88, figureScaleY: 1.16, aura: 0.44, trailOpacity: 0.72, trailReach: 198, trailLift: 126 };
  }

  if (fighter.character.id === "terry" && move.kind === "dash") {
    pose = { frontArm: -118, backArm: 52, frontLeg: -82, backLeg: 24, torsoTilt: -28, figureY: -10, figureScaleX: 0.9, figureScaleY: 1.14, aura: 0.4, trailOpacity: 0.66, trailReach: 190, trailLift: 114 };
  }

  if (fighter.character.id === "mai" && move.kind === "projectile") {
    pose = { frontArm: -108, backArm: 22, frontLeg: -36, backLeg: 42, torsoTilt: -22, headTilt: -8, figureY: -8, figureScaleX: 0.9, figureScaleY: 1.12, aura: 0.4, trailOpacity: 0.48, trailReach: 170, trailLift: 118 };
  }

  if (fighter.character.id === "mai" && move.kind === "dash") {
    pose = { frontArm: -74, backArm: 86, frontLeg: -122, backLeg: 30, torsoTilt: -38, headTilt: -10, figureY: -14, figureScaleX: 0.86, figureScaleY: 1.2, aura: 0.48, trailOpacity: 0.8, trailReach: 214, trailLift: 132 };
  }

  if (fighter.character.id === "leona" && move.kind === "burst") {
    pose = { frontArm: -34, backArm: 124, frontLeg: -34, backLeg: 74, torsoTilt: -30, headTilt: -6, figureY: -12, figureScaleX: 0.9, figureScaleY: 1.16, aura: 0.44, trailOpacity: 0.68, trailReach: 182, trailLift: 128 };
  }

  if (fighter.character.id === "athena" && move.kind === "projectile") {
    pose = { frontArm: -118, backArm: 34, frontLeg: 2, backLeg: 8, torsoTilt: -18, headTilt: -4, figureY: -6, figureScaleX: 0.94, figureScaleY: 1.08, aura: 0.42, trailOpacity: 0.42, trailReach: 166, trailLift: 104 };
  }

  return pose;
}

function createFighterAnimation(fighter) {
  return {
    key: "",
    pose: finalizePose(fighter, getIdleRawPose(fighter, 0)),
    loop: null,
    stateTween: null,
    actionTimeline: null
  };
}

function stopFighterAnimation(fighter) {
  if (!fighter.animation || !GSAP) {
    return;
  }

  fighter.animation.loop?.kill();
  fighter.animation.stateTween?.kill();
  fighter.animation.actionTimeline?.kill();
  fighter.animation.loop = null;
  fighter.animation.stateTween = null;
  fighter.animation.actionTimeline = null;
  GSAP.killTweensOf(fighter.animation.pose);
}

function setFighterAnimationPaused(fighter, paused) {
  if (!fighter.animation) {
    return;
  }

  [fighter.animation.loop, fighter.animation.stateTween, fighter.animation.actionTimeline].forEach((animation) => {
    if (animation && typeof animation.paused === "function") {
      animation.paused(paused);
    }
  });
}

function clearAllFighterAnimations() {
  state.fighters.forEach((fighter) => {
    stopFighterAnimation(fighter);
  });
}

function tweenPose(fighter, rawPose, options = {}) {
  if (!GSAP || !fighter.animation) {
    return;
  }

  const target = finalizePose(fighter, rawPose);
  fighter.animation.stateTween = GSAP.to(fighter.animation.pose, {
    ...target,
    duration: options.duration ?? 0.16,
    ease: options.ease ?? "power2.out",
    overwrite: true
  });
}

function startPoseLoop(fighter, rawPoseA, rawPoseB, duration) {
  if (!GSAP || !fighter.animation) {
    return;
  }

  const poseA = finalizePose(fighter, rawPoseA);
  const poseB = finalizePose(fighter, rawPoseB);
  Object.assign(fighter.animation.pose, poseA);
  fighter.animation.loop = GSAP.timeline({ repeat: -1, yoyo: true });
  fighter.animation.loop.to(fighter.animation.pose, {
    ...poseB,
    duration,
    ease: "sine.inOut",
    overwrite: true
  });
}

function playActionAnimation(fighter) {
  if (!GSAP || !fighter.animation || !fighter.action) {
    return;
  }

  const move = fighter.action.move;
  const startup = Math.max(0.12, ((move.castTime || move.startup || 90) / 1000) * 0.7);
  const active = Math.max(0.08, ((move.active || 60) / 1000) * 0.42);
  const recovery = Math.max(0.18, ((move.recovery || 140) / 1000) * 0.58);
  const anticPose = finalizePose(fighter, getActionAnticRawPose(fighter));
  const actionPose = finalizePose(fighter, getActionRawPose(fighter));
  const settlePose = finalizePose(fighter, fighter.y > 0 ? getStateRawPose(fighter, "jump") : getIdleRawPose(fighter, 0));

  fighter.animation.actionTimeline = GSAP.timeline();
  fighter.animation.actionTimeline
    .to(fighter.animation.pose, {
      ...anticPose,
      duration: startup * 0.42,
      ease: "power2.in",
      overwrite: true
    })
    .to(fighter.animation.pose, {
      ...actionPose,
      duration: startup * 0.58,
      ease: "power4.out",
      overwrite: true
    })
    .to(fighter.animation.pose, {
      ...actionPose,
      duration: Math.min(active, 0.14),
      ease: "none",
      overwrite: true
    })
    .to(fighter.animation.pose, {
      ...settlePose,
      duration: recovery,
      ease: "back.out(1.1)",
      overwrite: true
    });
}

function getAnimationKey(fighter) {
  if (fighter.ko) {
    return `ko:${fighter.reactionSerial}`;
  }

  if (fighter.action) {
    return `action:${fighter.action.key}:${fighter.action.id}`;
  }

  if (fighter.hitstun > 0) {
    return `${fighter.guardTimer > 0 ? "guard" : "hit"}:${fighter.reactionSerial}`;
  }

  if (fighter.state === "walk") {
    return "walk";
  }

  if (fighter.state === "crouch") {
    return "crouch";
  }

  if (fighter.state === "jump") {
    return "jump";
  }

  if (fighter.state === "guard") {
    return "guard:hold";
  }

  return "idle";
}

function syncFighterAnimation(fighter, immediate = false) {
  if (!fighter.animation) {
    fighter.animation = createFighterAnimation(fighter);
  }

  const key = getAnimationKey(fighter);
  if (!immediate && fighter.animation.key === key) {
    return;
  }

  fighter.animation.key = key;
  stopFighterAnimation(fighter);

  if (!GSAP) {
    return;
  }

  if (fighter.action) {
    Object.assign(fighter.animation.pose, finalizePose(fighter, getIdleRawPose(fighter, 0)));
    playActionAnimation(fighter);
    return;
  }

  if (fighter.ko) {
    tweenPose(fighter, getStateRawPose(fighter, "ko"), { duration: immediate ? 0 : 0.24, ease: "power3.out" });
    return;
  }

  if (fighter.hitstun > 0) {
    tweenPose(fighter, getStateRawPose(fighter, fighter.guardTimer > 0 ? "guard" : "hit"), {
      duration: immediate ? 0 : 0.1,
      ease: "power2.out"
    });
    return;
  }

  if (fighter.state === "walk") {
    startPoseLoop(fighter, getWalkRawPose(fighter, 0), getWalkRawPose(fighter, 1), 0.18);
    return;
  }

  if (fighter.state === "crouch") {
    tweenPose(fighter, getStateRawPose(fighter, "crouch"), { duration: immediate ? 0 : 0.12, ease: "power2.out" });
    return;
  }

  if (fighter.state === "jump") {
    tweenPose(fighter, getStateRawPose(fighter, "jump"), { duration: immediate ? 0 : 0.16, ease: "power2.out" });
    return;
  }

  if (fighter.state === "guard") {
    tweenPose(fighter, getStateRawPose(fighter, "guard"), { duration: immediate ? 0 : 0.12, ease: "power2.out" });
    return;
  }

  startPoseLoop(fighter, getIdleRawPose(fighter, 0), getIdleRawPose(fighter, 1), 0.56);
}

function renderFighters() {
  state.fighters.forEach((fighter) => {
    const pose = fighter.animation?.pose || finalizePose(fighter, getIdleRawPose(fighter, 0));
    const profile = fighter.profile;
    const baseX = fighter.x;
    const baseY = STAGE.floorY - fighter.y;
    const fighterScale = BATTLE_TUNING.fighterScale;
    fighter.dom.root.setAttribute("transform", `translate(${baseX} ${baseY})`);
    fighter.dom.figure.setAttribute(
      "transform",
      `translate(0 ${pose.figureY}) scale(${fighter.facing * fighterScale * pose.figureScaleX} ${fighterScale * pose.figureScaleY})`
    );
    fighter.dom.root.classList.toggle("is-hit", fighter.flashTimer > 0);
    fighter.dom.root.classList.toggle("is-guard", fighter.guardTimer > 0);
    fighter.dom.root.classList.toggle("is-ko", fighter.ko);
    fighter.dom.nameplate.setAttribute("transform", `translate(0 ${pose.nameY * fighterScale + 10})`);

    fighter.dom.aura.setAttribute("fill", fighter.character.palette.aura);
    fighter.dom.aura.setAttribute("opacity", String(pose.aura));
    fighter.dom.aura.setAttribute("transform", `translate(0 ${pose.torsoY * 0.6}) scale(${1 + pose.aura * 0.52} ${1 + pose.aura * 0.24})`);
    fighter.dom.trail.setAttribute("stroke-width", String(profile.trailWidth));
    fighter.dom.trail.setAttribute(
      "d",
      `M ${-fighter.facing * 18} -84 Q ${-fighter.facing * (pose.trailReach * 0.68)} ${-pose.trailLift} ${-fighter.facing * pose.trailReach} -74`
    );
    fighter.dom.trail.setAttribute("opacity", String(pose.trailOpacity));

    fighter.dom.backLeg.setAttribute("transform", `translate(${-profile.hips * 1.14} -58) rotate(${pose.backLeg}) scale(1 ${profile.legScale})`);
    fighter.dom.frontLeg.setAttribute("transform", `translate(${profile.hips * 1.14} -58) rotate(${pose.frontLeg}) scale(1 ${profile.legScale})`);
    fighter.dom.backArm.setAttribute("transform", `translate(${-profile.shoulder} -114) rotate(${pose.backArm}) scale(1 ${profile.armScale})`);
    fighter.dom.frontArm.setAttribute("transform", `translate(${profile.shoulder} -114) rotate(${pose.frontArm}) scale(1 ${profile.armScale})`);
    fighter.dom.torso.setAttribute("transform", `translate(0 ${pose.torsoY}) rotate(${pose.torsoTilt}) scale(${profile.torsoScaleX} ${profile.torsoScaleY})`);
    fighter.dom.head.setAttribute("transform", `translate(0 ${pose.torsoY * 0.45 + profile.headOffset}) rotate(${pose.headTilt}) scale(${profile.headScale})`);
    fighter.dom.shadow.setAttribute("rx", String(48 * pose.shadow * fighterScale));
    fighter.dom.shadow.setAttribute("ry", String(14 * fighterScale));
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
  state.fighters.forEach((fighter) => setFighterAnimationPaused(fighter, true));
  state.projectiles = [];
  renderProjectiles();
  elements.battleOverlay.classList.remove("hidden");
  if (winner) {
    const winnerTag = winner.slot === "p1" ? "1P" : "2P";
    const winnerLabel = `${winnerTag} ${winner.character.name}`;
    const winnerMessage = `${winnerLabel} 获胜`;
    elements.overlayTitle.textContent = winnerMessage;
    elements.overlaySubtitle.textContent = `${winnerLabel} 取得本回合胜利。按空格再来一局。`;
    setAnnouncer(winnerMessage, 2500);
    return;
  }

  elements.overlayTitle.textContent = message;
  elements.overlaySubtitle.textContent = "双方体力相同，战成平局。按空格再来一局。";
  setAnnouncer(message, 2500);
}

function pauseMatch() {
  if (state.phase !== "fight") {
    return;
  }

  resetInputState();
  state.phase = "paused";
  state.fighters.forEach((fighter) => setFighterAnimationPaused(fighter, true));
  state.announcerUntil = Number.POSITIVE_INFINITY;
  elements.announcerText.textContent = "已暂停 · 按空格继续";
}

function resumeMatch() {
  if (state.phase !== "paused") {
    return;
  }

  resetInputState();
  state.phase = "fight";
  state.lastFrame = 0;
  state.fighters.forEach((fighter) => setFighterAnimationPaused(fighter, false));
  setAnnouncer("格斗继续", 900);
}

function handleSpaceAction() {
  if (!wasPressed("Space")) {
    return false;
  }

  if (state.phase === "fight") {
    pauseMatch();
    return true;
  }

  if (state.phase === "paused") {
    resumeMatch();
    return true;
  }

  if (state.phase === "over") {
    startMatch();
    return true;
  }

  return false;
}

function consumePressedKeys() {
  state.keysPressed = Object.create(null);
}

function gameLoop(timestamp) {
  if (handleSpaceAction()) {
    state.lastFrame = timestamp;
    consumePressedKeys();
    state.loopId = requestAnimationFrame(gameLoop);
    return;
  }

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
      syncFighterAnimation(p1);
      syncFighterAnimation(p2);
      solveSpacing();
      updateProjectiles(dt, dtMs);
      updateEffects(dtMs);
      renderFighters();
      renderProjectiles();
      renderEffects();
      updateHud();
    }
  } else if (state.phase === "paused") {
    renderFighters();
    renderProjectiles();
    renderEffects();
    updateHud();
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
  if (!GSAP) {
    throw new Error("GSAP 未加载，动作系统无法初始化。");
  }

  renderRoster();
  renderSelectionPanels();
  bindEvents();
}

init();
