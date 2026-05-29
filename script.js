document.addEventListener("DOMContentLoaded", () => {
  // ── SCROLL REVEALS ──
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => io.observe(el));

  // ── SPACE CANVAS (GRAVITY WELL & LENSING) ──
  const canvas = document.getElementById('space-canvas');
  if (canvas) {
    initSpaceCanvas(canvas);
  }

  // ── GEOLOCATION COORDINATES ──
  const coordsEl = document.getElementById('hero-coords-dynamic');
  if (coordsEl) {
    initGeolocation(coordsEl);
  }

  // ── FOOTER QUOTE ──
  initFooterQuote();

  // ── MOBILE MENU SYSTEM ──
  const nav = document.querySelector('nav');
  if (nav) {
    const navLinks = nav.querySelector('.nav-links');
    if (navLinks) {
      // Create menu toggle button
      const toggleBtn = document.createElement('button');
      toggleBtn.className = 'menu-toggle';
      toggleBtn.setAttribute('aria-label', 'Toggle menu');
      toggleBtn.innerHTML = `
        <svg class="menu-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <line x1="4" y1="6" x2="20" y2="6" class="line-top"></line>
          <line x1="4" y1="12" x2="20" y2="12" class="line-mid"></line>
          <line x1="4" y1="18" x2="20" y2="18" class="line-bot"></line>
        </svg>
      `;

      // Insert toggle button into nav before .nav-links
      nav.insertBefore(toggleBtn, navLinks);

      // Click event
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        nav.classList.toggle('menu-active');
      });

      // Close when clicking links
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          nav.classList.remove('menu-active');
        });
      });

      // Close when clicking outside
      document.addEventListener('click', (e) => {
        if (nav.classList.contains('menu-active') && !nav.contains(e.target)) {
          nav.classList.remove('menu-active');
        }
      });
    }
  }
});


/* ============================================================
   GEOLOCATION → STELLARIUM LINK
   ============================================================ */
const DARK_SKY_RESERVES = [
  { name: "Hanle Dark Sky Reserve, Ladakh",   lat: 32.7794, lng: 78.9616 },
  { name: "Pangong Tso, Ladakh",              lat: 33.7578, lng: 78.6652 },
  { name: "Spiti Valley, Himachal Pradesh",    lat: 32.2461, lng: 78.0349 },
  { name: "Rann of Kutch, Gujarat",            lat: 23.7337, lng: 69.8597 },
  { name: "Horsley Hills, Andhra Pradesh",     lat: 13.6603, lng: 78.3926 },
];

function toStellariumUrl(lat, lng) {
  const now = new Date().toISOString();
  return `https://stellarium-web.org/skysource/Sun?fov=70&date=${encodeURIComponent(now)}&lat=${lat}&lng=${lng}`;
}

function toGmapsUrl(lat, lng) {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

function formatDMS(deg, posChar, negChar) {
  const sign = deg >= 0 ? posChar : negChar;
  const abs = Math.abs(deg);
  const d = Math.floor(abs);
  const mFull = (abs - d) * 60;
  const m = Math.floor(mFull);
  const s = Math.round((mFull - m) * 60);
  return `${sign}${d}° ${String(m).padStart(2,'0')}′ ${String(s).padStart(2,'0')}″`;
}

function renderCoords(el, lat, lng, label, isStellarium) {
  const latStr = formatDMS(lat, 'N', 'S');
  const lngStr = formatDMS(lng, 'E', 'W');
  const url = isStellarium ? toStellariumUrl(lat, lng) : toGmapsUrl(lat, lng);
  el.innerHTML = `<a href="${url}" target="_blank" rel="noopener noreferrer" id="stellarium-link" style="color: var(--text-dim); text-decoration: none; border-bottom: 1px solid var(--text-dim); transition: color 0.3s, border-color 0.3s;">${latStr} · ${lngStr}</a> &nbsp;|&nbsp; ${label}`;
  // Hover effect
  const link = el.querySelector('#stellarium-link');
  if (link) {
    link.addEventListener('mouseenter', () => { link.style.color = 'var(--star)'; link.style.borderColor = 'var(--star)'; });
    link.addEventListener('mouseleave', () => { link.style.color = 'var(--text-dim)'; link.style.borderColor = 'var(--text-dim)'; });
  }
}

function initGeolocation(el) {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        renderCoords(el, pos.coords.latitude, pos.coords.longitude, 'Your Night Sky · Open in Stellarium', true);
      },
      () => {
        // Fallback: random dark sky reserve
        const reserve = DARK_SKY_RESERVES[Math.floor(Math.random() * DARK_SKY_RESERVES.length)];
        renderCoords(el, reserve.lat, reserve.lng, reserve.name + ' · View on Maps', false);
      },
      { timeout: 5000, enableHighAccuracy: false }
    );
  } else {
    const reserve = DARK_SKY_RESERVES[Math.floor(Math.random() * DARK_SKY_RESERVES.length)];
    renderCoords(el, reserve.lat, reserve.lng, reserve.name + ' · View on Maps', false);
  }
}


/* ============================================================
   FOOTER COSMOS QUOTES
   ============================================================ */
const COSMOS_QUOTES = [
  { text: "For me, it is far better to grasp the Universe as it really is than to persist in delusion, however satisfying and reassuring.", author: "Carl Sagan" },
  { text: "The cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself.", author: "Carl Sagan" },
  { text: "We are like butterflies who flutter for a day and think it is forever.", author: "Carl Sagan" },
  { text: "Books permit us to voyage through time, to tap the wisdom of our ancestors.", author: "Carl Sagan" },
  { text: "Science is more than a body of knowledge; it is a way of thinking.", author: "Carl Sagan" }
];

function initFooterQuote() {
  const quoteEl = document.getElementById('footer-quote');
  if (!quoteEl) return;
  const q = COSMOS_QUOTES[Math.floor(Math.random() * COSMOS_QUOTES.length)];
  quoteEl.innerHTML = `"${q.text}" <span style="opacity:0.5;">— ${q.author}</span>`;
}


/* ============================================================
   SPACE CANVAS (GRAVITY WELL & GRAVITATIONAL LENSING)
   ============================================================ */
function initSpaceCanvas(canvas) {
  const ctx = canvas.getContext('2d');
  let width, height;
  let dpr = window.devicePixelRatio || 1;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }
  window.addEventListener('resize', resize);
  resize();

  let mouse = { x: 0, y: 0, active: false };
  let gravityPoint = { x: width / 2 || 0, y: height / 2 || 0 };
  let targetGravity = { x: width / 2 || 0, y: height / 2 || 0 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true;
  });
  window.addEventListener('mouseleave', () => { mouse.active = false; });
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; mouse.active = true;
    }
  }, { passive: true });
  window.addEventListener('touchend', () => { mouse.active = false; });

  const starsCount = 130;
  const stars = [];
  const starColors = ['#ffffff', '#a8c0ff', '#ffd8a8', '#f0f4ff'];

  for (let i = 0; i < starsCount; i++) {
    stars.push({
      x: Math.random() * (width || window.innerWidth),
      y: Math.random() * (height || window.innerHeight),
      size: 0.4 + Math.random() * 1.0,
      speedX: -0.015 - Math.random() * 0.035,
      speedY: -0.01 - Math.random() * 0.02,
      color: starColors[Math.floor(Math.random() * starColors.length)],
      twinkle: Math.random() * Math.PI
    });
  }

  const gridSize = 65;
  const EinsteinRadius = 50;
  const gravityCore = 45;
  const gravityFalloff = 220;
  const gravityStrength = 80;
  let time = 0;

  function animate() {
    time += 1;
    ctx.clearRect(0, 0, width, height);

    if (mouse.active) {
      targetGravity.x = mouse.x; targetGravity.y = mouse.y;
    } else {
      targetGravity.x = width / 2 + Math.cos(time * 0.005) * (width * 0.22);
      targetGravity.y = height / 2 + Math.sin(time * 0.007) * (height * 0.18);
    }
    gravityPoint.x += (targetGravity.x - gravityPoint.x) * 0.08;
    gravityPoint.y += (targetGravity.y - gravityPoint.y) * 0.08;

    ctx.strokeStyle = 'rgba(111, 163, 239, 0.04)';
    ctx.lineWidth = 1;

    for (let y = Math.floor(gravityPoint.y % gridSize) - gridSize; y < height + gridSize; y += gridSize) {
      ctx.beginPath(); let first = true;
      for (let x = -50; x < width + 50; x += 15) {
        let px = x, py = y;
        let dx = px - gravityPoint.x, dy = py - gravityPoint.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0) {
          let warp = (gravityStrength * dist) / (dist * dist + gravityCore * gravityCore) * Math.exp(-dist / gravityFalloff);
          px -= (dx / dist) * warp; py -= (dy / dist) * warp;
        }
        if (first) { ctx.moveTo(px, py); first = false; } else { ctx.lineTo(px, py); }
      }
      ctx.stroke();
    }

    for (let x = Math.floor(gravityPoint.x % gridSize) - gridSize; x < width + gridSize; x += gridSize) {
      ctx.beginPath(); let first = true;
      for (let y = -50; y < height + 50; y += 15) {
        let px = x, py = y;
        let dx = px - gravityPoint.x, dy = py - gravityPoint.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0) {
          let warp = (gravityStrength * dist) / (dist * dist + gravityCore * gravityCore) * Math.exp(-dist / gravityFalloff);
          px -= (dx / dist) * warp; py -= (dy / dist) * warp;
        }
        if (first) { ctx.moveTo(px, py); first = false; } else { ctx.lineTo(px, py); }
      }
      ctx.stroke();
    }

    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      s.x += s.speedX; s.y += s.speedY;
      if (s.x < -10) s.x = width + 10;
      if (s.y < -10) s.y = height + 10;
      if (s.x > width + 10) s.x = -10;
      if (s.y > height + 10) s.y = -10;

      let dx = s.x - gravityPoint.x, dy = s.y - gravityPoint.y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      let twinkleAlpha = 0.25 + 0.75 * Math.abs(Math.sin(time * 0.008 + s.twinkle));
      ctx.fillStyle = s.color; ctx.strokeStyle = s.color;

      if (dist < EinsteinRadius * 5) {
        let lensFactor = (EinsteinRadius * EinsteinRadius) / (dist * dist + 100);
        let apparentX = s.x + dx * lensFactor, apparentY = s.y + dy * lensFactor;
        let tx = -dy / (dist + 0.1), ty = dx / (dist + 0.1);
        let stretch = lensFactor * 10;
        ctx.globalAlpha = twinkleAlpha;
        if (stretch > 1.2) {
          ctx.lineWidth = s.size * 0.8; ctx.beginPath();
          ctx.moveTo(apparentX - tx * stretch, apparentY - ty * stretch);
          ctx.lineTo(apparentX + tx * stretch, apparentY + ty * stretch);
          ctx.stroke();
        } else {
          ctx.beginPath(); ctx.arc(apparentX, apparentY, s.size, 0, Math.PI * 2); ctx.fill();
        }
      } else {
        ctx.globalAlpha = twinkleAlpha;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2); ctx.fill();
      }
    }
    ctx.globalAlpha = 1.0;
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    stars.forEach(s => { s.x = Math.random() * width; s.y = Math.random() * height; });
  });

  animate();
}


/* ============================================================
   PLANETARY LOADER
   ============================================================ */
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader-container");
  if (!loader) return;
  loader.style.opacity = "0";
  setTimeout(() => { loader.style.display = "none"; }, 500);
});
