/* 西村直樹｜熱意の編集者 — site script v2 (no dependencies) */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* footer year */
  var y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());

  /* thanks page: absolute URL so FormSubmit can redirect back correctly */
  var next = document.getElementById('next-url');
  if (next) next.value = new URL('thanks.html', location.href).href;

  /* ---------------- reveal / redpen / stilllife on scroll ---------------- */
  var items = document.querySelectorAll('.reveal, .redpen, .stilllife');
  if (!reduce && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------------- 業務の静物: 散らばった表が整列する ---------------- */
  var grid = document.querySelector('.stilllife .grid-anim');
  if (grid) {
    var frag = document.createDocumentFragment();
    for (var i = 0; i < 35; i++) {
      var cell = document.createElement('i');
      cell.style.setProperty('--dx', (Math.random() * 60 - 30).toFixed(1) + 'px');
      cell.style.setProperty('--dy', (Math.random() * 40 - 20).toFixed(1) + 'px');
      cell.style.setProperty('--r', (Math.random() * 16 - 8).toFixed(1) + 'deg');
      cell.style.transitionDelay = (Math.random() * 0.6).toFixed(2) + 's';
      frag.appendChild(cell);
    }
    grid.appendChild(frag);
  }

  /* ---------------- 熾火: 動画があれば動画、無ければ canvas ---------------- */
  var video = document.getElementById('ember-video');
  var canvas = document.getElementById('ember-canvas');
  var useCanvas = true;

  if (video) {
    // 動画ファイルが存在するか軽く確認（HEAD）。あれば動画を採用。
    fetch(video.querySelector('source').getAttribute('src'), { method: 'HEAD' })
      .then(function (r) {
        if (r.ok) {
          video.hidden = false; video.preload = 'auto'; video.load();
          if (canvas) canvas.hidden = true;
          useCanvas = false;
          if (reduce) { video.pause(); video.removeAttribute('autoplay'); }
        }
      }).catch(function () {});
  }

  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var W, H, sparks = [], last = 0, running = true;
    var dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    function resize() {
      var r = canvas.getBoundingClientRect();
      W = Math.max(1, Math.floor(r.width)); H = Math.max(1, Math.floor(r.height));
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function spawn() {
      return { x: W * (0.35 + Math.random() * 0.45), y: H + 10, vx: (Math.random() - 0.5) * 0.25, vy: -(0.25 + Math.random() * 0.6), r: 0.8 + Math.random() * 2.2, life: 0, max: 320 + Math.random() * 380 };
    }
    function drawStatic() {
      ctx.clearRect(0, 0, W, H);
      // 炭の地面: 下部に横方向のむら
      for (var k = 0; k < 40; k++) {
        var gx = Math.random() * W, gy = H - Math.random() * H * 0.28, gr = 40 + Math.random() * 120;
        var g = ctx.createRadialGradient(gx, gy, 0, gx, gy, gr);
        g.addColorStop(0, 'rgba(224,86,42,' + (0.06 + Math.random() * 0.1) + ')');
        g.addColorStop(1, 'rgba(224,86,42,0)');
        ctx.fillStyle = g; ctx.fillRect(gx - gr, gy - gr, gr * 2, gr * 2);
      }
    }
    function frame(t) {
      if (!running || !useCanvas) { requestAnimationFrame(frame); return; }
      var dt = Math.min(40, t - last || 16); last = t;
      ctx.clearRect(0, 0, W, H);
      // 熾火の帯（呼吸）
      var breath = 0.5 + 0.5 * Math.sin(t / 2400);
      for (var k = 0; k < 6; k++) {
        var gx = W * (0.25 + k * 0.1) + Math.sin(t / 3000 + k) * 30, gy = H * 0.98, gr = 120 + k * 30;
        var g = ctx.createRadialGradient(gx, gy, 0, gx, gy, gr);
        g.addColorStop(0, 'rgba(255,140,70,' + (0.10 + 0.08 * breath) + ')');
        g.addColorStop(0.5, 'rgba(224,86,42,' + (0.05 + 0.04 * breath) + ')');
        g.addColorStop(1, 'rgba(122,43,18,0)');
        ctx.fillStyle = g; ctx.fillRect(gx - gr, gy - gr, gr * 2, gr * 2);
      }
      // 火の粉
      var target = Math.floor(W / 28);
      while (sparks.length < target) sparks.push(spawn());
      for (var i = sparks.length - 1; i >= 0; i--) {
        var s = sparks[i];
        s.life += dt; s.x += s.vx * dt * 0.06 + Math.sin(s.life / 400) * 0.15; s.y += s.vy * dt * 0.06;
        var a = Math.max(0, 1 - s.life / s.max) * 0.9;
        if (a <= 0 || s.y < -10) { sparks[i] = spawn(); continue; }
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,' + Math.floor(120 + 90 * a) + ',' + Math.floor(50 + 40 * a) + ',' + a.toFixed(2) + ')';
        ctx.shadowBlur = 8; ctx.shadowColor = 'rgba(255,140,70,.6)';
        ctx.fill(); ctx.shadowBlur = 0;
      }
      requestAnimationFrame(frame);
    }
    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', function () { running = !document.hidden; });
    if (reduce) { drawStatic(); } else { requestAnimationFrame(frame); }
  }

  /* ---------------- 退屈すると冷める（一定時間操作がないと熱が下がる） ---------------- */
  if (!reduce) {
    var coldTimer;
    function warm() {
      document.body.setAttribute('data-heat', 'warm');
      clearTimeout(coldTimer);
      coldTimer = setTimeout(function () { document.body.setAttribute('data-heat', 'cold'); }, 9000);
    }
    ['scroll', 'pointermove', 'keydown', 'touchstart', 'click'].forEach(function (ev) {
      window.addEventListener(ev, warm, { passive: true });
    });
    warm();
  }

  /* ---------------- form: inline validation ---------------- */
  var form = document.getElementById('contact-form');
  if (!form) return;
  var fields = Array.prototype.slice.call(form.querySelectorAll('input[required], textarea[required]'));
  function setState(el, valid) {
    var wrap = el.closest('.field'); if (!wrap) return;
    wrap.classList.toggle('invalid', !valid);
    el.setAttribute('aria-invalid', valid ? 'false' : 'true');
  }
  function validate(el) {
    var ok = el.checkValidity();
    if (el.tagName === 'TEXTAREA' && el.value.trim().length < 10) ok = false;
    setState(el, ok); return ok;
  }
  fields.forEach(function (el) {
    el.addEventListener(el.type === 'checkbox' ? 'change' : 'blur', function () { validate(el); });
    el.addEventListener('input', function () { if (el.closest('.field').classList.contains('invalid')) validate(el); });
  });
  form.addEventListener('submit', function (ev) {
    var firstBad = null;
    fields.forEach(function (el) { if (!validate(el) && !firstBad) firstBad = el; });
    if (firstBad) { ev.preventDefault(); firstBad.focus(); firstBad.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' }); return; }
    var btn = form.querySelector('button[type="submit"]');
    if (btn) { btn.disabled = true; btn.textContent = '送信しています…'; }
  });
})();
