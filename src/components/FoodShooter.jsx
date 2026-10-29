import { useEffect } from "react";

// =====================================================================
//  FOOD SHOOTER - a retro black-and-green pixel space shooter
//  Click the footer to open the game, click it again to close it.
//  The high score is saved in the browser, so it stays after closing.
// =====================================================================

// ---------- Retro colours (only black + shades of green) ----------
const BRIGHT = "#4cff4c";
const MID = "#1fae3d";
const DIM = "#0d5c1f";
const DARK = "#062b0e";
const BG_TINTS = ["#000400", "#000a03", "#030a00"]; // very dark greens
const FONT = "'Courier New', Courier, monospace";

// ---------- Game settings (change these to tweak the game) ----------
const SHIP_SCALE = 4; // each ship "pixel" is 4 screen pixels
const SHIP_RADIUS = 14; // how big the ship is for hit checks
const SHIP_FOLLOW = 0.012; // how fast the ship follows the mouse/finger
const KEY_SPEED = 0.45; // ship speed with arrow keys / WASD
const FIRE_DELAY = 260; // milliseconds between shots (auto-fire)
const BULLET_SPEED = 0.7;
const START_LIVES = 3;
const MAX_LIVES = 5;
const POINTS_PER_HIT = 10; // points for a small meteor (big ones give more)
const POINTS_PER_LEVEL = 100; // every 100 points = next level + new background
const BOSS_EVERY = 3; // a boss shows up on level 3, 6, 9...
const BOSS_BONUS = 200;
const DROP_CHANCE = 0.12; // chance that a destroyed meteor drops a boost
const STORAGE_KEY = "foodshooter-high-score";

// ---------- Boosts (the icons are your menu pictures) ----------
const BOOSTS = [
  {
    id: "rapid",
    name: "RAPID FIRE",
    desc: "Shoots 2x faster",
    secs: 8,
    weight: 1,
    img: "/img/blueberry_smoothie.jpg",
  },
  {
    id: "triple",
    name: "TRIPLE SHOT",
    desc: "Fires 3 bullets at once",
    secs: 10,
    weight: 1,
    img: "/img/mini-fruit-tart.jpg",
  },
  {
    id: "shield",
    name: "SHIELD",
    desc: "Blocks every hit",
    secs: 8,
    weight: 1,
    img: "/img/Terrine.jpg",
  },
  {
    id: "slow",
    name: "SLOW TIME",
    desc: "Enemies move at half speed",
    secs: 8,
    weight: 1,
    img: "/img/dark-tea.webp",
  },
  {
    id: "double",
    name: "DOUBLE SCORE",
    desc: "Points count twice",
    secs: 12,
    weight: 1,
    img: "/img/strawbery-cheesecake.webp",
  },
  {
    id: "life",
    name: "EXTRA LIFE",
    desc: "Adds 1 life (max 5)",
    secs: 0,
    weight: 0.5,
    img: "/img/creme-cake.webp",
  },
];

// ---------- Pixel art. "#" = bright green, "+" = darker green, " " = empty ----------
const SPRITE_ROWS = {
  ship: [
    "    #    ",
    "    #    ",
    "   ###   ",
    "   ###   ",
    "  #####  ",
    " ####### ",
    "++ ### ++",
    "++  #  ++",
    "+   #   +",
  ],
  heart: [" ## ## ", "#######", "#######", " ##### ", "  ###  ", "   #   "],
  boss: [
    "    ########    ",
    "  ############  ",
    " ############## ",
    "####  ####  ####",
    "####  ####  ####",
    "##++########++##",
    "################",
    "  ####    ####  ",
    " ####  ##  #### ",
    "##  ##    ##  ##",
  ],
  // the meteors are food!
  donut: [
    "  ####  ",
    " ##+#+# ",
    "###  ###",
    "##    ##",
    "##    ##",
    "###  ###",
    " ###### ",
    "  ####  ",
  ],
  cookie: [
    "  ####  ",
    " #+#### ",
    "#####+##",
    "#+######",
    "####+###",
    "##+#####",
    " ###### ",
    "  ####  ",
  ],
  apple: [
    "    #+  ",
    "  ## ## ",
    " #######",
    "########",
    "########",
    "########",
    " ###### ",
    "  ####  ",
  ],
  cake: [
    "   ##   ",
    " ###### ",
    "++++++++",
    "########",
    "#+#+#+#+",
    "########",
    "########",
    " ###### ",
  ],
  pizza: [
    "########",
    "##+#####",
    " ######+",
    " ##+### ",
    "  ####  ",
    "  #+##  ",
    "   ##   ",
    "   ##   ",
  ],
};
const FOOD_KEYS = ["donut", "cookie", "apple", "cake", "pizza"];

// ---------- Turn a menu photo into a small green pixel icon ----------
const ICON_PX = 20; // the icon is 20x20 pixels, drawn at 40x40 on screen
const GREENS = [
  [6, 43, 14],
  [13, 92, 31],
  [31, 174, 61],
  [76, 255, 76],
];
const buildIcon = (img) => {
  const c = document.createElement("canvas");
  c.width = c.height = ICON_PX;
  const x = c.getContext("2d");
  const side = Math.min(img.width, img.height); // crop the middle square
  x.drawImage(
    img,
    (img.width - side) / 2,
    (img.height - side) / 2,
    side,
    side,
    0,
    0,
    ICON_PX,
    ICON_PX,
  );
  try {
    // Replace every pixel with one of 4 greens, based on how bright it was.
    const d = x.getImageData(0, 0, ICON_PX, ICON_PX);
    for (let i = 0; i < d.data.length; i += 4) {
      const lum = 0.3 * d.data[i] + 0.59 * d.data[i + 1] + 0.11 * d.data[i + 2];
      const g = GREENS[Math.min(3, Math.floor((lum / 256) * 4))];
      d.data[i] = g[0];
      d.data[i + 1] = g[1];
      d.data[i + 2] = g[2];
    }
    x.putImageData(d, 0, 0);
  } catch (e) {
    /* if the browser blocks pixel reading, the icon just stays in colour */
  }
  return c;
};

function FoodShooter() {
  useEffect(() => {
    // The game only exists on pages that have a <footer>.
    const footer = document.querySelector("footer");
    if (!footer) return;

    // ---------- The game screen (a canvas that covers the page) ----------
    const canvas = document.createElement("canvas");
    canvas.style.cssText =
      "position:fixed;inset:0;width:100vw;height:100vh;z-index:40;display:none;touch-action:none;cursor:crosshair";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    // ---------- Build the sprites and the boost icons ----------
    const makeSprite = (rows) => {
      const c = document.createElement("canvas");
      c.width = rows[0].length;
      c.height = rows.length;
      const x = c.getContext("2d");
      rows.forEach((row, ry) => {
        [...row].forEach((ch, rx) => {
          if (ch === " ") return;
          x.fillStyle = ch === "#" ? BRIGHT : MID;
          x.fillRect(rx, ry, 1, 1);
        });
      });
      return c;
    };
    const sprites = {};
    for (const k of Object.keys(SPRITE_ROWS))
      sprites[k] = makeSprite(SPRITE_ROWS[k]);

    const icons = {}; // filled in when each menu picture has loaded
    for (const b of BOOSTS) {
      const img = new Image();
      img.onload = () => {
        icons[b.id] = buildIcon(img);
      };
      img.src = b.img;
    }

    // CRT "scanlines": a thin dark line every 4 pixels, drawn over everything
    const scan = document.createElement("canvas");
    scan.width = scan.height = 4;
    const sx = scan.getContext("2d");
    sx.fillStyle = "rgba(0,0,0,0.3)";
    sx.fillRect(0, 3, 4, 1);
    const scanPattern = ctx.createPattern(scan, "repeat");

    // ---------- Game state (everything that changes while playing) ----------
    let W = 0;
    let H = 0;
    let running = false; // is the game open?
    let paused = false;
    let frameId = 0;
    let prev = 0;

    let ship, bullets, meteors, enemyShots, pickups, particles, boss;
    let score, lives, level, shownLevel, gameOver, newHigh;
    let fireTimer, spawnTimer, gridT;
    let bossCount, bossPending, warning; // boss bookkeeping
    let banner, toast, toastT, hint; // on-screen messages
    let stars = [];
    let rain = [];
    let active = {}; // running boosts: id -> milliseconds left
    const keys = {};
    const pointer = { x: 0, y: 0 };
    const ui = {}; // where the on-screen buttons are, for clicking

    let highScore = 0;
    try {
      highScore = Number(localStorage.getItem(STORAGE_KEY)) || 0;
    } catch (e) {
      /* storage blocked: the score still works until the page closes */
    }
    const saveHighScore = () => {
      try {
        localStorage.setItem(STORAGE_KEY, String(highScore));
      } catch (e) {
        /* ignore */
      }
    };

    const has = (id) => (active[id] || 0) > 0; // is this boost running?
    const rand = (a, b) => a + Math.random() * (b - a);

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Background pieces: stars (theme 1) and falling 0/1 digits (theme 3)
    const makeBackdrop = () => {
      stars = Array.from({ length: 70 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        size: Math.random() < 0.8 ? 2 : 4,
        speed: rand(0.02, 0.09),
      }));
      rain = Array.from({ length: Math.ceil(W / 18) }, (_, i) => ({
        x: i * 18 + 4,
        y: Math.random() * H,
        speed: rand(0.05, 0.16),
        seed: i,
      }));
    };
    const onResize = () => {
      resize();
      if (running) makeBackdrop();
    };
    window.addEventListener("resize", onResize);

    const resetGame = () => {
      ship = { x: W / 2, y: H - 120, invincible: 0 };
      bullets = [];
      meteors = [];
      enemyShots = [];
      pickups = [];
      particles = [];
      boss = null;
      active = {};
      score = 0;
      lives = START_LIVES;
      level = 1;
      shownLevel = 0;
      gameOver = false;
      newHigh = false;
      fireTimer = 0;
      spawnTimer = 0;
      gridT = 0;
      bossCount = 0;
      bossPending = false;
      warning = 0;
      banner = 0;
      toast = "";
      toastT = 0;
      hint = 7000;
      pointer.x = ship.x;
      pointer.y = ship.y;
      makeBackdrop();
    };

    // ---------- Small helpers ----------
    const addScore = (n) => {
      score += has("double") ? n * 2 : n;
    };
    const say = (text) => {
      toast = text;
      toastT = 3000;
    };
    const boom = (x, y, n = 10) => {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = rand(0.05, 0.3);
        particles.push({
          x,
          y,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp,
          t: rand(400, 800),
          max: 800,
          size: Math.random() < 0.5 ? 4 : 6,
        });
      }
    };

    const spawnMeteor = () => {
      const scale = 3 + Math.floor(Math.random() * 4); // 3..6, so 24px to 48px
      const size = scale * 8;
      meteors.push({
        x: size + Math.random() * Math.max(1, W - size * 2),
        y: -size,
        size,
        scale,
        hp: scale >= 5 ? 2 : 1, // big food needs two hits
        vy: rand(0.08, 0.16) + level * 0.02,
        vx: (Math.random() - 0.5) * 0.08,
        sprite: FOOD_KEYS[Math.floor(Math.random() * FOOD_KEYS.length)],
      });
    };

    // A boost capsule falls from the sky. Catch it with your ship!
    const spawnPickup = (x, y) => {
      const list = BOOSTS.filter(
        (b) => !(b.id === "life" && lives >= MAX_LIVES),
      );
      let r = Math.random() * list.reduce((s, b) => s + b.weight, 0);
      let pick = list[0];
      for (const b of list) {
        r -= b.weight;
        if (r <= 0) {
          pick = b;
          break;
        }
      }
      pickups.push({ x, y, b: pick });
    };

    const takeBoost = (b) => {
      if (b.id === "life") {
        lives = Math.min(MAX_LIVES, lives + 1);
        say("EXTRA LIFE! +1 life");
      } else {
        active[b.id] = b.secs * 1000; // picking it up again restarts the timer
        say(`${b.name}! ${b.desc}`);
      }
    };

    const spawnBoss = () => {
      bossCount++;
      const max = 20 + 10 * bossCount;
      boss = {
        x: W / 2,
        y: -60,
        w: 96,
        h: 60,
        hp: max,
        max,
        dir: 1,
        shotT: 1500,
        flash: 0,
      };
    };

    // The ship gets hit. The shield blocks it; otherwise you lose a life.
    const hurtShip = () => {
      if (ship.invincible > 0) return;
      boom(ship.x, ship.y, 14);
      if (has("shield")) {
        ship.invincible = 400;
        return;
      }
      lives--;
      ship.invincible = 1500;
      if (lives <= 0) endGame();
    };

    const endGame = () => {
      gameOver = true;
      newHigh = score > highScore;
      if (newHigh) {
        highScore = score;
        saveHighScore();
      }
    };

    // ---------- UPDATE: move everything one step ----------
    const update = (dt) => {
      level = Math.floor(score / POINTS_PER_LEVEL) + 1;
      if (level !== shownLevel) {
        shownLevel = level;
        banner = 1800; // show "LEVEL n" for a moment
      }
      banner = Math.max(0, banner - dt);
      toastT = Math.max(0, toastT - dt);
      hint = Math.max(0, hint - dt);

      // Background keeps moving, even on the game over screen
      gridT += dt * 0.04;
      for (const s of stars) {
        s.y += s.speed * dt;
        if (s.y > H) {
          s.y = 0;
          s.x = Math.random() * W;
        }
      }
      for (const c of rain) {
        c.y += c.speed * dt;
        if (c.y - 8 * 14 > H) {
          c.y = 0;
          c.speed = rand(0.05, 0.16);
        }
      }
      for (const p of particles) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.t -= dt;
      }
      particles = particles.filter((p) => p.t > 0);

      if (gameOver) return;

      // Boost timers count down. When one hits zero it ends.
      for (const id of Object.keys(active)) {
        active[id] -= dt;
        if (active[id] <= 0) delete active[id];
      }
      const fdt = has("slow") ? dt * 0.5 : dt; // "enemy time" (slowed by Slow Time)

      // --- Ship movement: keys first, otherwise follow mouse/finger ---
      let kx = 0;
      let ky = 0;
      if (keys.ArrowLeft || keys.a) kx -= 1;
      if (keys.ArrowRight || keys.d) kx += 1;
      if (keys.ArrowUp || keys.w) ky -= 1;
      if (keys.ArrowDown || keys.s) ky += 1;
      if (kx || ky) {
        ship.x += kx * KEY_SPEED * dt;
        ship.y += ky * KEY_SPEED * dt;
        pointer.x = ship.x;
        pointer.y = ship.y;
      } else {
        const follow = Math.min(1, SHIP_FOLLOW * dt);
        ship.x += (pointer.x - ship.x) * follow;
        ship.y += (pointer.y - ship.y) * follow;
      }
      ship.x = Math.min(W - 20, Math.max(20, ship.x));
      ship.y = Math.min(H - 20, Math.max(20, ship.y));
      ship.invincible = Math.max(0, ship.invincible - dt);

      // --- Auto-fire (Rapid Fire = twice as often, Triple Shot = 3 bullets) ---
      fireTimer += dt;
      if (fireTimer >= (has("rapid") ? FIRE_DELAY / 2 : FIRE_DELAY)) {
        fireTimer = 0;
        const spreads = has("triple") ? [-0.12, 0, 0.12] : [0];
        for (const vx of spreads)
          bullets.push({ x: ship.x, y: ship.y - 20, vx, vy: -BULLET_SPEED });
      }
      for (const b of bullets) {
        b.x += b.vx * dt;
        b.y += b.vy * dt;
      }
      bullets = bullets.filter((b) => b.y > -20 && b.x > -20 && b.x < W + 20);

      // --- Boss: announce it, then bring it in ---
      if (!boss && !bossPending && level >= BOSS_EVERY * (bossCount + 1)) {
        bossPending = true;
        warning = 2200;
      }
      if (bossPending) {
        warning -= dt;
        if (warning <= 0) {
          bossPending = false;
          spawnBoss();
        }
      }

      // --- Meteors (fewer while a boss is around) ---
      spawnTimer += dt;
      const spawnEvery = Math.max(350, 1100 - level * 80) * (boss ? 2 : 1);
      if (spawnTimer >= spawnEvery) {
        spawnTimer = 0;
        spawnMeteor();
      }
      for (const m of meteors) {
        m.x += m.vx * fdt;
        m.y += m.vy * fdt;
        if (m.x < m.size / 2 || m.x > W - m.size / 2) m.vx *= -1;
      }

      // --- Boss movement and shooting ---
      if (boss) {
        boss.flash = Math.max(0, boss.flash - dt);
        if (boss.y < 80) {
          boss.y += 0.1 * fdt; // flying in
        } else {
          boss.x += boss.dir * (0.12 + 0.015 * bossCount) * fdt;
          if (boss.x < boss.w / 2) boss.dir = 1;
          if (boss.x > W - boss.w / 2) boss.dir = -1;
          boss.shotT -= fdt;
          if (boss.shotT <= 0) {
            boss.shotT = Math.max(600, 1300 - bossCount * 100);
            const aim = Math.atan2(ship.y - boss.y, ship.x - boss.x);
            for (const off of [-0.3, 0, 0.3])
              enemyShots.push({
                x: boss.x,
                y: boss.y + boss.h / 2,
                vx: Math.cos(aim + off) * 0.26,
                vy: Math.sin(aim + off) * 0.26,
              });
          }
        }
      }
      for (const s of enemyShots) {
        s.x += s.vx * fdt;
        s.y += s.vy * fdt;
      }
      enemyShots = enemyShots.filter(
        (s) => s.y < H + 20 && s.y > -20 && s.x > -20 && s.x < W + 20,
      );

      // --- Bullets hit meteors ---
      for (const m of meteors) {
        for (const b of bullets) {
          if (b.hit || m.dead) continue;
          if (Math.hypot(b.x - m.x, b.y - m.y) < m.size / 2 + 4) {
            b.hit = true;
            m.hp--;
            if (m.hp <= 0) {
              m.dead = true;
              addScore(POINTS_PER_HIT * (m.scale >= 5 ? 2 : 1));
              boom(m.x, m.y, 8);
              if (Math.random() < DROP_CHANCE) spawnPickup(m.x, m.y);
            } else {
              boom(b.x, b.y, 3);
            }
          }
        }
      }

      // --- Bullets hit the boss ---
      if (boss) {
        for (const b of bullets) {
          if (b.hit) continue;
          if (
            Math.abs(b.x - boss.x) < boss.w / 2 &&
            Math.abs(b.y - boss.y) < boss.h / 2
          ) {
            b.hit = true;
            boss.hp--;
            boss.flash = 80;
          }
        }
        if (boss.hp <= 0) {
          boom(boss.x, boss.y, 40);
          addScore(BOSS_BONUS);
          spawnPickup(boss.x - 30, boss.y);
          spawnPickup(boss.x + 30, boss.y);
          enemyShots = [];
          say(`BOSS DEFEATED! +${BOSS_BONUS}`);
          boss = null;
        }
      }
      bullets = bullets.filter((b) => !b.hit);

      // --- Things that hurt the ship ---
      if (ship.invincible <= 0) {
        for (const m of meteors) {
          if (m.dead) continue;
          if (
            Math.hypot(m.x - ship.x, m.y - ship.y) <
            m.size / 2 + SHIP_RADIUS * 0.7
          ) {
            m.dead = true;
            hurtShip();
            break;
          }
        }
      }
      if (ship.invincible <= 0) {
        for (const s of enemyShots) {
          if (Math.hypot(s.x - ship.x, s.y - ship.y) < SHIP_RADIUS) {
            s.dead = true;
            hurtShip();
            break;
          }
        }
      }
      if (ship.invincible <= 0 && boss) {
        if (
          Math.abs(ship.x - boss.x) < boss.w / 2 + 8 &&
          Math.abs(ship.y - boss.y) < boss.h / 2 + 8
        )
          hurtShip();
      }
      enemyShots = enemyShots.filter((s) => !s.dead);
      meteors = meteors.filter((m) => !m.dead && m.y < H + m.size);

      // --- Boost capsules fall (not slowed) and get collected ---
      for (const p of pickups) {
        p.y += 0.09 * dt;
        if (Math.hypot(p.x - ship.x, p.y - ship.y) < 34) {
          p.taken = true;
          takeBoost(p.b);
        }
      }
      pickups = pickups.filter((p) => !p.taken && p.y < H + 30);
    };

    // ---------- DRAW helpers ----------
    const txt = (s, x, y, size = 16, color = BRIGHT, align = "left") => {
      ctx.font = `bold ${size}px ${FONT}`;
      ctx.textAlign = align;
      ctx.textBaseline = "top";
      ctx.fillStyle = color;
      ctx.shadowColor = BRIGHT; // a little phosphor glow
      ctx.shadowBlur = color === BRIGHT ? 6 : 0;
      ctx.fillText(s, x, y);
      ctx.shadowBlur = 0;
    };
    const box = (x, y, w, h, color = MID) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.strokeRect(x + 1, y + 1, w - 2, h - 2);
    };
    const sprite = (name, cx, cy, scale) => {
      const s = sprites[name];
      ctx.drawImage(
        s,
        Math.round(cx - (s.width * scale) / 2),
        Math.round(cy - (s.height * scale) / 2),
        s.width * scale,
        s.height * scale,
      );
    };
    const icon = (id, cx, cy) => {
      const x = Math.round(cx - 20);
      const y = Math.round(cy - 20);
      if (icons[id]) ctx.drawImage(icons[id], x, y, 40, 40);
      else {
        ctx.fillStyle = DIM;
        ctx.fillRect(x, y, 40, 40);
      }
      box(x - 3, y - 3, 46, 46, BRIGHT);
    };
    const button = (label, x, y, w) => {
      box(x, y, w, 26, MID);
      txt(label, x + w / 2, y + 5, 14, BRIGHT, "center");
      return { x, y, w, h: 26 };
    };
    const seconds = (ms) => (ms / 1000).toFixed(1);

    const drawBackground = () => {
      ctx.fillStyle = BG_TINTS[(level - 1) % BG_TINTS.length];
      ctx.fillRect(0, 0, W, H);
      const theme = (level - 1) % 3; // a new look every level
      if (theme === 0) {
        // Starfield
        for (const s of stars) {
          ctx.fillStyle = s.size > 2 ? MID : DIM;
          ctx.fillRect(Math.round(s.x), Math.round(s.y), s.size, s.size);
        }
      } else if (theme === 1) {
        // Scrolling grid
        ctx.fillStyle = DARK;
        for (let x = 0; x < W; x += 48) ctx.fillRect(x, 0, 1, H);
        const off = gridT % 48;
        for (let y = off - 48; y < H; y += 48)
          ctx.fillRect(0, Math.round(y), W, 1);
      } else {
        // Falling 0s and 1s
        ctx.font = `bold 12px ${FONT}`;
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillStyle = MID;
        for (const c of rain) {
          for (let k = 0; k < 8; k++) {
            const yy = c.y - k * 14;
            if (yy < -14 || yy > H) continue;
            ctx.globalAlpha = (1 - k / 8) * 0.5;
            ctx.fillText(
              (Math.floor(yy / 14) + c.seed) % 2 === 0 ? "1" : "0",
              c.x,
              yy,
            );
          }
        }
        ctx.globalAlpha = 1;
      }
    };

    const drawHud = () => {
      // Left: score, high score, level
      txt(`SCORE ${String(score).padStart(6, "0")}`, 16, 14);
      txt(
        `HI    ${String(Math.max(highScore, score)).padStart(6, "0")}`,
        16,
        36,
        16,
        MID,
      );
      txt(`LEVEL ${String(level).padStart(2, "0")}`, 16, 58, 16, MID);

      // Right: lives as little pixel hearts
      for (let i = 0; i < lives; i++) sprite("heart", W - 26 - i * 26, 24, 3);

      // Pause + Exit buttons (top middle, or under the score on narrow screens)
      const narrow = W < 560;
      const bx = narrow ? 16 : W / 2 - 82;
      const by = narrow ? 84 : 12;
      ui.pause = button(paused ? "RESUME" : "PAUSE", bx, by, 92);
      ui.exit = button("EXIT", bx + 100, by, 64);

      // Boss health bar
      if (boss) {
        const bw = Math.min(360, W - 40);
        const bxx = W / 2 - bw / 2;
        const byy = narrow ? 120 : 50;
        txt("BOSS", W / 2, byy, 14, BRIGHT, "center");
        box(bxx, byy + 18, bw, 14, MID);
        ctx.fillStyle = BRIGHT;
        ctx.fillRect(
          bxx + 3,
          byy + 21,
          Math.max(0, (bw - 6) * (boss.hp / boss.max)),
          8,
        );
      }

      // Right side: the boost list. Each shows what it does and when it ends.
      const panelW = Math.min(270, Math.floor(W * 0.55));
      const px = W - panelW - 12;
      let py = 48;
      const ids = BOOSTS.filter((b) => has(b.id));
      if (!ids.length) {
        txt("CATCH FALLING FOOD", W - 12, py, 12, DIM, "right");
        txt("ICONS FOR BOOSTS", W - 12, py + 15, 12, DIM, "right");
      }
      for (const b of ids) {
        const left = active[b.id];
        box(px, py, panelW, 66, MID);
        ctx.fillStyle = "#000";
        ctx.fillRect(px + 2, py + 2, panelW - 4, 62);
        if (icons[b.id]) ctx.drawImage(icons[b.id], px + 8, py + 8, 40, 40);
        box(px + 6, py + 6, 44, 44, BRIGHT);
        txt(b.name, px + 58, py + 8, 13);
        txt(b.desc, px + 58, py + 25, 11, MID);
        // Warn in the last 2 seconds by blinking the "ends in" text
        const blink = left < 2000 && Math.floor(left / 150) % 2 === 0;
        txt(
          `ENDS IN ${seconds(left)}s`,
          px + 58,
          py + 40,
          11,
          blink ? DIM : BRIGHT,
        );
        box(px + 8, py + 56, panelW - 16, 6, DIM);
        ctx.fillStyle = BRIGHT;
        ctx.fillRect(
          px + 10,
          py + 58,
          (panelW - 20) * (left / (b.secs * 1000)),
          2,
        );
        py += 72;
      }
    };

    const drawPauseScreen = () => {
      ctx.fillStyle = "rgba(0,0,0,0.85)";
      ctx.fillRect(0, 0, W, H);
      const x0 = Math.max(10, W / 2 - 190);
      let y = Math.max(70, H / 2 - 200);
      txt("== PAUSED ==", W / 2, y, 32, BRIGHT, "center");
      y += 50;
      txt("BOOSTS (drop from destroyed food)", W / 2, y, 13, MID, "center");
      y += 24;
      for (const b of BOOSTS) {
        icon(b.id, x0 + 24, y + 20);
        txt(b.name, x0 + 62, y + 2, 14);
        txt(b.desc, x0 + 62, y + 20, 12, MID);
        txt(
          b.secs ? `${b.secs}s` : "instant",
          x0 + 380,
          y + 12,
          12,
          MID,
          "right",
        );
        y += 50;
      }
      y += 4;
      txt(
        "MOVE: mouse / arrows / WASD    FIRE: automatic",
        W / 2,
        y,
        12,
        MID,
        "center",
      );
      txt(
        "PAUSE: P or Esc    EXIT: click the footer",
        W / 2,
        y + 16,
        12,
        MID,
        "center",
      );
      txt("TAP OR PRESS P TO RESUME", W / 2, y + 40, 16, BRIGHT, "center");
    };

    // ---------- DRAW: paint the whole screen ----------
    const draw = () => {
      ctx.imageSmoothingEnabled = false; // keeps the pixels sharp
      drawBackground();

      // Boost capsules (food icon from the menu, in a frame)
      for (const p of pickups) icon(p.b.id, p.x, p.y);

      // Meteors
      for (const m of meteors) sprite(m.sprite, m.x, m.y, m.scale);

      // Boss
      if (boss) {
        ctx.globalAlpha = boss.flash > 0 ? 0.45 : 1;
        sprite("boss", boss.x, boss.y, 6);
        ctx.globalAlpha = 1;
      }

      // Boss shots (blinking squares)
      for (const s of enemyShots) {
        ctx.fillStyle = Math.floor(performance.now() / 120) % 2 ? BRIGHT : MID;
        ctx.fillRect(Math.round(s.x) - 4, Math.round(s.y) - 4, 8, 8);
      }

      // Your bullets
      ctx.fillStyle = BRIGHT;
      for (const b of bullets)
        ctx.fillRect(Math.round(b.x) - 2, Math.round(b.y) - 8, 4, 12);

      // Ship (blinks after a hit)
      const blink =
        ship.invincible > 0 &&
        !has("shield") &&
        Math.floor(ship.invincible / 100) % 2;
      if (!gameOver && !blink) {
        sprite("ship", ship.x, ship.y, SHIP_SCALE);
        // engine flame
        ctx.fillStyle = Math.random() < 0.5 ? BRIGHT : MID;
        ctx.fillRect(
          Math.round(ship.x) - 4,
          Math.round(ship.y) + 18,
          8,
          6 + Math.floor(Math.random() * 3) * 4,
        );
      }
      // Shield ring (blinks when about to end)
      if (
        !gameOver &&
        has("shield") &&
        (active.shield > 2000 || Math.floor(active.shield / 150) % 2)
      ) {
        ctx.strokeStyle = BRIGHT;
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 6]);
        ctx.beginPath();
        ctx.arc(ship.x, ship.y, 30, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Explosion bits
      ctx.fillStyle = BRIGHT;
      for (const p of particles) {
        ctx.globalAlpha = Math.max(0, p.t / p.max);
        ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
      }
      ctx.globalAlpha = 1;

      drawHud();

      // Messages
      if (bossPending && Math.floor(warning / 300) % 2 === 0)
        txt(
          "!! WARNING: BOSS APPROACHING !!",
          W / 2,
          H / 3,
          Math.min(26, W / 18),
          BRIGHT,
          "center",
        );
      if (banner > 0 && !gameOver) {
        ctx.globalAlpha = Math.min(1, banner / 500);
        txt(`LEVEL ${level}`, W / 2, H / 2 - 40, 44, BRIGHT, "center");
        ctx.globalAlpha = 1;
      }
      if (toastT > 0) {
        ctx.globalAlpha = Math.min(1, toastT / 500);
        txt(toast, W / 2, H - 80, 16, BRIGHT, "center");
        ctx.globalAlpha = 1;
      }
      if (hint > 0 && !paused)
        txt(
          "MOVE: MOUSE/ARROWS   AUTO-FIRE   P: PAUSE   FOOTER: EXIT",
          W / 2,
          H - 110,
          12,
          MID,
          "center",
        );

      if (paused) drawPauseScreen();

      if (gameOver) {
        ctx.fillStyle = "rgba(0,0,0,0.75)";
        ctx.fillRect(0, 0, W, H);
        txt("GAME OVER", W / 2, H / 2 - 70, 44, BRIGHT, "center");
        txt(
          `SCORE ${score}    HI ${highScore}`,
          W / 2,
          H / 2 - 10,
          18,
          BRIGHT,
          "center",
        );
        if (newHigh)
          txt("* NEW HIGH SCORE *", W / 2, H / 2 + 20, 16, BRIGHT, "center");
        txt(
          "CLICK, TAP OR PRESS SPACE TO RETRY",
          W / 2,
          H / 2 + 56,
          14,
          MID,
          "center",
        );
      }

      // CRT scanlines on top of everything
      ctx.fillStyle = scanPattern;
      ctx.fillRect(0, 0, W, H);
    };

    // ---------- Game loop: runs about 60 times per second ----------
    const loop = (now) => {
      const dt = Math.min(now - prev, 50); // cap so lag spikes don't teleport things
      prev = now;
      if (!paused) update(dt);
      draw();
      frameId = requestAnimationFrame(loop);
    };

    // ---------- Open / close ----------
    const footerPos = footer.style.position;
    const footerZ = footer.style.zIndex;
    const start = () => {
      resize();
      resetGame();
      running = true;
      paused = false;
      canvas.style.display = "block";
      // Lift the footer above the game so you can always click it to close.
      if (getComputedStyle(footer).position === "static")
        footer.style.position = "relative";
      footer.style.zIndex = "41";
      prev = performance.now();
      frameId = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      paused = false;
      cancelAnimationFrame(frameId);
      if (score > highScore) {
        highScore = score; // keep the score if you close mid-run
        saveHighScore();
      }
      canvas.style.display = "none";
      footer.style.position = footerPos;
      footer.style.zIndex = footerZ;
    };

    const togglePause = () => {
      if (running && !gameOver) paused = !paused;
    };

    // ---------- Controls ----------
    const onFooterClick = () => (running ? stop() : start());
    footer.addEventListener("click", onFooterClick);
    footer.style.cursor = "pointer";

    const hit = (r, x, y) =>
      r && x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h;
    const onCanvasClick = (e) => {
      if (!running) return;
      if (hit(ui.exit, e.clientX, e.clientY)) return stop();
      if (!gameOver && hit(ui.pause, e.clientX, e.clientY))
        return togglePause();
      if (paused)
        paused = false; // tap anywhere to resume
      else if (gameOver) resetGame(); // tap anywhere to retry
    };
    canvas.addEventListener("click", onCanvasClick);

    const onMouseMove = (e) => {
      if (!running) return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onTouch = (e) => {
      if (!running || !e.touches[0]) return;
      pointer.x = e.touches[0].clientX;
      pointer.y = e.touches[0].clientY - 60; // keep the ship above your finger
    };
    const onKeyDown = (e) => {
      if (!running) return;
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      keys[key] = true;
      if (
        ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " "].includes(e.key)
      )
        e.preventDefault(); // stop the page from scrolling
      if (!e.repeat && (key === "p" || key === "Escape")) togglePause();
      if (e.key === " " && gameOver) resetGame();
    };
    const onKeyUp = (e) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      keys[key] = false;
    };
    // Switching to another browser tab pauses the game
    const onVisibility = () => {
      if (document.hidden && running && !gameOver) paused = true;
    };

    window.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("touchstart", onTouch, { passive: true });
    canvas.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    document.addEventListener("visibilitychange", onVisibility);

    // ---------- Cleanup when the component is removed ----------
    return () => {
      cancelAnimationFrame(frameId);
      footer.removeEventListener("click", onFooterClick);
      footer.style.cursor = "";
      footer.style.position = footerPos;
      footer.style.zIndex = footerZ;
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.remove();
    };
  }, []);

  return null; // the game draws itself, so there is nothing to render here
}

export default FoodShooter;
