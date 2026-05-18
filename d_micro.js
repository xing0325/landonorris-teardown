/* =================== D micro batch · 35 demos === */

// 31 ripple
(function(){
  const btn = document.getElementById('d31Btn');
  if (!btn) return;
  btn.addEventListener('click', e => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const rip = document.createElement('span');
    rip.className = 'ripple';
    rip.style.left = x + 'px';
    rip.style.top = y + 'px';
    rip.style.width = rip.style.height = Math.max(r.width, r.height) + 'px';
    btn.appendChild(rip);
    setTimeout(() => rip.remove(), 700);
  });
})();

// 33 arrow follow cursor
(function(){
  const stage = document.getElementById('d33Stage');
  const arrow = document.getElementById('d33Arrow');
  if (!stage || !arrow) return;
  stage.addEventListener('mousemove', e => {
    const r = arrow.getBoundingClientRect();
    const ax = r.left + r.width / 2;
    const ay = r.top + r.height / 2;
    const ang = Math.atan2(e.clientY - ay, e.clientX - ax) * 180 / Math.PI;
    arrow.style.transform = `rotate(${ang}deg)`;
  });
  stage.addEventListener('mouseleave', () => arrow.style.transform = 'rotate(0deg)');
})();

// 35 loading
(function(){
  const btn = document.getElementById('d35Btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    if (btn.classList.contains('loading')) return;
    btn.classList.add('loading');
    setTimeout(() => btn.classList.remove('loading'), 1600);
  });
})();

// 36 success
(function(){
  const btn = document.getElementById('d36Btn');
  if (!btn) return;
  const origText = btn.textContent;
  btn.addEventListener('click', () => {
    if (btn.classList.contains('done')) return;
    btn.classList.add('done');
    btn.textContent = "✓ Saved";
    setTimeout(() => { btn.classList.remove('done'); btn.textContent = origText; }, 1600);
  });
})();

// 37 disabled toggle
(function(){
  const tog = document.getElementById('d37Toggle');
  const btn = document.getElementById('d37Btn');
  if (!tog || !btn) return;
  tog.addEventListener('change', () => {
    if (tog.checked) btn.removeAttribute('disabled'); else btn.setAttribute('disabled', '');
  });
})();

// 40 typewriter
(function(){
  const out = document.getElementById('d40Out');
  if (!out) return;
  const lines = ["This is a vertical drive.", "Reverse-engineered with love.", "Type · erase · loop."];
  let li = 0, ci = 0, writing = true;
  function tick(){
    const line = lines[li];
    if (writing) {
      ci++;
      out.textContent = line.slice(0, ci);
      if (ci >= line.length) { writing = false; return setTimeout(tick, 1400); }
      setTimeout(tick, 80);
    } else {
      ci--;
      out.textContent = line.slice(0, ci);
      if (ci <= 0) { writing = true; li = (li + 1) % lines.length; return setTimeout(tick, 400); }
      setTimeout(tick, 40);
    }
  }
  tick();
})();

// 41 scramble
(function(){
  const out = document.getElementById('d41Out');
  const btn = document.getElementById('d41Btn');
  if (!out || !btn) return;
  const target = out.textContent;
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*";
  let timer = null;
  function run(){
    if (timer) clearInterval(timer);
    let frame = 0;
    const total = 24;
    timer = setInterval(() => {
      frame++;
      const reveal = Math.floor((frame / total) * target.length);
      out.textContent = target.split('').map((c, i) => {
        if (c === ' ') return ' ';
        if (i < reveal) return c;
        return chars[Math.floor(Math.random() * chars.length)];
      }).join('');
      if (frame >= total) { clearInterval(timer); out.textContent = target; }
    }, 50);
  }
  btn.addEventListener('click', run);
})();

// 42 char shake
(function(){
  document.querySelectorAll('.d42-text span').forEach(s => {
    s.addEventListener('mouseenter', () => {
      const r = (Math.random() - 0.5) * 30;
      const x = (Math.random() - 0.5) * 8;
      const y = (Math.random() - 0.5) * 8;
      s.style.transform = `translate(${x}px, ${y}px) rotate(${r}deg)`;
    });
    s.addEventListener('mouseleave', () => s.style.transform = '');
  });
})();

// 43 read more
(function(){
  const coll = document.getElementById('d43Coll');
  const btn = document.getElementById('d43Toggle');
  if (!coll || !btn) return;
  btn.addEventListener('click', () => {
    const open = coll.classList.toggle('is-open');
    btn.textContent = open ? '收起 ↑' : '阅读全文 ↓';
  });
})();

// 49 slider
(function(){
  const r = document.getElementById('d49R');
  const l = document.getElementById('d49L');
  const w = r?.closest('.d49-wrap');
  if (!r || !l || !w) return;
  function up(){
    const v = r.value;
    w.style.setProperty('--p', v + '%');
    l.textContent = v;
  }
  r.addEventListener('input', up);
  up();
})();

// 50 dual range
(function(){
  const a = document.getElementById('d50A');
  const b = document.getElementById('d50B');
  const oa = document.getElementById('d50OutA');
  const ob = document.getElementById('d50OutB');
  const w = a?.closest('.d50-wrap');
  if (!a || !b || !w) return;
  function up(){
    let va = +a.value, vb = +b.value;
    if (va > vb - 5) { va = vb - 5; a.value = va; }
    if (vb < va + 5) { vb = va + 5; b.value = vb; }
    w.style.setProperty('--a', va + '%');
    w.style.setProperty('--b', vb + '%');
    oa.textContent = va;
    ob.textContent = vb;
  }
  a.addEventListener('input', up);
  b.addEventListener('input', up);
  up();
})();

// 52 validate
(function(){
  const i = document.getElementById('d52I');
  const m = document.getElementById('d52M');
  if (!i || !m) return;
  i.addEventListener('input', () => {
    const v = i.value;
    if (v.length === 0) { i.classList.remove('is-invalid','is-valid'); m.classList.remove('show'); return; }
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
      i.classList.remove('is-invalid'); i.classList.add('is-valid'); m.classList.remove('show');
    } else {
      i.classList.add('is-invalid'); i.classList.remove('is-valid'); m.classList.add('show');
    }
  });
})();

// 53 autocomplete
(function(){
  const i = document.getElementById('d53I');
  const l = document.getElementById('d53L');
  if (!i || !l) return;
  const tracks = ["Monaco","Monza","Mexico City","Spa-Francorchamps","Silverstone","Suzuka","São Paulo","Bahrain","Baku","Imola","Hungaroring","Barcelona","Zandvoort","Singapore","Las Vegas","Austin","Miami","Jeddah","Lusail","Melbourne","Abu Dhabi","Shanghai","Montreal","Red Bull Ring"];
  function up(){
    const q = i.value.trim().toLowerCase();
    if (!q) { l.classList.remove('is-open'); l.innerHTML = ''; return; }
    const hits = tracks.filter(t => t.toLowerCase().includes(q)).slice(0, 6);
    l.innerHTML = hits.map((t, idx) => `<li style="animation-delay:${idx * 50}ms">${t}</li>`).join('');
    l.classList.toggle('is-open', hits.length > 0);
  }
  i.addEventListener('input', up);
  i.addEventListener('blur', () => setTimeout(() => l.classList.remove('is-open'), 200));
})();

// 54 magic line
(function(){
  const tabs = document.getElementById('d54Tabs');
  const line = document.getElementById('d54Line');
  if (!tabs || !line) return;
  function move(btn){
    const r = btn.getBoundingClientRect();
    const pr = tabs.getBoundingClientRect();
    line.style.width = r.width + 'px';
    line.style.transform = `translateX(${r.left - pr.left}px)`;
  }
  tabs.querySelectorAll('button').forEach(b => {
    b.addEventListener('click', () => {
      tabs.querySelectorAll('button').forEach(x => x.classList.remove('is-active'));
      b.classList.add('is-active');
      move(b);
    });
  });
  setTimeout(() => move(tabs.querySelector('button.is-active')), 100);
  window.addEventListener('resize', () => {
    const a = tabs.querySelector('button.is-active');
    if (a) move(a);
  });
})();

// 55 chip
(function(){
  document.querySelectorAll('.d55-chip').forEach(c => {
    c.addEventListener('click', () => c.classList.toggle('is-on'));
  });
})();

// 56 modal
(function(){
  const bd = document.getElementById('d56Bd');
  const open = document.getElementById('d56Open');
  const close = document.getElementById('d56Close');
  if (!bd || !open) return;
  open.addEventListener('click', () => bd.classList.add('is-open'));
  close.addEventListener('click', () => bd.classList.remove('is-open'));
  bd.addEventListener('click', e => { if (e.target === bd) bd.classList.remove('is-open'); });
})();

// 57 modal shake
(function(){
  const bd = document.getElementById('d57Bd');
  const m = document.getElementById('d57M');
  const open = document.getElementById('d57Open');
  const no = document.getElementById('d57No');
  const yes = document.getElementById('d57Yes');
  if (!bd || !m || !open) return;
  open.addEventListener('click', () => bd.classList.add('is-open'));
  function close(){ bd.classList.remove('is-open'); }
  no.addEventListener('click', close);
  yes.addEventListener('click', close);
  bd.addEventListener('click', e => {
    if (e.target === bd) {
      m.classList.remove('shake');
      void m.offsetWidth;
      m.classList.add('shake');
    }
  });
})();

// 58 toast
(function(){
  const stack = document.getElementById('d58Stack');
  if (!stack) return;
  const messages = {
    success: "✓ 圈速提交成功",
    info: "ⓘ 维修区限速 80 km/h",
    error: "✕ 胎温过低 · 进站"
  };
  document.querySelectorAll('[data-toast]').forEach(b => {
    b.addEventListener('click', () => {
      const t = b.dataset.toast;
      const el = document.createElement('div');
      el.className = t;
      el.innerHTML = `<span class="dot"></span><span>${messages[t]}</span>`;
      stack.appendChild(el);
      requestAnimationFrame(() => el.classList.add('show'));
      setTimeout(() => {
        el.classList.add('gone');
        setTimeout(() => el.remove(), 400);
      }, 2800);
    });
  });
})();

// 59 tooltip delay
(function(){
  const tip = document.getElementById('d59Tip');
  if (!tip) return;
  let timer = null;
  document.querySelectorAll('.d59-trig').forEach(b => {
    b.addEventListener('mouseenter', () => {
      timer = setTimeout(() => {
        tip.textContent = b.dataset.tip;
        const r = b.getBoundingClientRect();
        tip.style.left = (r.left + r.width / 2) + 'px';
        tip.style.top = (r.bottom + 12) + 'px';
        tip.classList.add('show');
      }, 600);
    });
    b.addEventListener('mouseleave', () => {
      clearTimeout(timer);
      tip.classList.remove('show');
    });
  });
})();

// 60 tooltip edge flip
(function(){
  const tip = document.getElementById('d60Tip');
  if (!tip) return;
  document.querySelectorAll('.d60-trig').forEach(b => {
    b.addEventListener('mouseenter', () => {
      tip.textContent = b.dataset.tip;
      const r = b.getBoundingClientRect();
      tip.classList.add('show');
      tip.style.left = 'auto'; tip.style.right = 'auto'; tip.style.top = 'auto'; tip.style.bottom = 'auto';
      // measure tip
      const tw = tip.offsetWidth;
      const vw = window.innerWidth;
      let left = r.left + r.width / 2 - tw / 2;
      if (left < 8) left = 8;
      if (left + tw > vw - 8) left = vw - tw - 8;
      tip.style.left = left + 'px';
      tip.style.top = (r.bottom + 10) + 'px';
    });
    b.addEventListener('mouseleave', () => tip.classList.remove('show'));
  });
})();

// 63 notification badge
(function(){
  const badge = document.getElementById('d63Badge');
  const add = document.getElementById('d63Add');
  const clr = document.getElementById('d63Clear');
  if (!badge) return;
  let n = 0;
  function up(){
    badge.textContent = n;
    badge.classList.toggle('show', n > 0);
    badge.classList.remove('pop');
    void badge.offsetWidth;
    if (n > 0) badge.classList.add('pop');
  }
  add.addEventListener('click', () => { n++; up(); });
  clr.addEventListener('click', () => { n = 0; up(); });
})();

// 64 cursor follow lerp
(function(){
  const stage = document.getElementById('d64Stage');
  const cur = document.getElementById('d64Cur');
  if (!stage || !cur) return;
  let tx = 0, ty = 0, cx = 0, cy = 0;
  stage.addEventListener('mousemove', e => {
    const r = stage.getBoundingClientRect();
    tx = e.clientX - r.left;
    ty = e.clientY - r.top;
  });
  function tick(){
    cx += (tx - cx) * 0.15;
    cy += (ty - cy) * 0.15;
    cur.style.left = cx + 'px';
    cur.style.top = cy + 'px';
    requestAnimationFrame(tick);
  }
  tick();
})();

// 65 like + particles
(function(){
  const btn = document.getElementById('d65Like');
  const ct = document.getElementById('d65Count');
  if (!btn) return;
  let n = +ct.textContent;
  let liked = false;
  btn.addEventListener('click', () => {
    liked = !liked;
    btn.classList.toggle('liked', liked);
    n += liked ? 1 : -1;
    ct.textContent = n;
    if (liked) {
      for (let i = 0; i < 8; i++) {
        const p = document.createElement('span');
        p.className = 'particle';
        const ang = (Math.PI * 2 / 8) * i + Math.random() * 0.5;
        const dist = 30 + Math.random() * 25;
        const dx = Math.cos(ang) * dist;
        const dy = Math.sin(ang) * dist;
        p.style.setProperty('--dx', dx + 'px');
        p.style.setProperty('--dy', dy + 'px');
        p.style.transform = `translate(0,0)`;
        p.animate([
          { transform: 'translate(-50%,-50%)', opacity: 1 },
          { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`, opacity: 0 }
        ], { duration: 600, easing: 'cubic-bezier(0.2, 0.7, 0.4, 1)' });
        btn.appendChild(p);
        setTimeout(() => p.remove(), 650);
      }
    }
  });
})();
