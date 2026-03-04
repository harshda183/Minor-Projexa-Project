const header = document.getElementById('mainHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});


/* ── Back to Top ──────────────────────────────────────────────── */
const btt = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  btt.classList.toggle('visible', window.scrollY > 400);
});
btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));


/* ── Countdown Timer ──────────────────────────────────────────── */
let h = 2, m = 15, s = 42;
const elH = document.getElementById('th');
const elM = document.getElementById('tm');
const elS = document.getElementById('ts');
const pad = n => String(n).padStart(2, '0');

setInterval(() => {
  if (s > 0) { s--; }
  else if (m > 0) { m--; s = 59; }
  else if (h > 0) { h--; m = 59; s = 59; }
  else { h = 2; m = 15; s = 42; } // reset for demo
  elH.textContent = pad(h);
  elM.textContent = pad(m);
  elS.textContent = pad(s);
}, 1000);


/* ── Intersection Observer — Scroll Reveal ────────────────────── */
const revealTargets = document.querySelectorAll(
  '.reveal-up, .reveal-left, .reveal-right, ' +
  '.product-card, .feature-item, .test-card, .chip'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      // unobserve after animate in — performance
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealTargets.forEach(el => observer.observe(el));


/* ── Category Chip Selection ──────────────────────────────────── */
document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
  });
});


/* ── Add to Cart Feedback ─────────────────────────────────────── */
document.querySelectorAll('.btn-add-cart').forEach(btn => {
  btn.addEventListener('click', function () {
    const orig = this.textContent;
    this.textContent = '✓ Added!';
    this.style.background = '#22c55e';
    setTimeout(() => {
      this.textContent = orig;
      this.style.background = '';
    }, 1800);
    // bump badge count
    const badge = document.querySelector('.badge');
    if (badge) badge.textContent = parseInt(badge.textContent) + 1;
  });
});


/* ── Wishlist Toggle ──────────────────────────────────────────── */
document.querySelectorAll('.wish-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const active = this.textContent === '♥';
    this.textContent = active ? '♡' : '♥';
    this.style.color   = active ? '' : '#ef4444';
    this.style.background = active ? '' : '#fff';
  });
});


/* ── Newsletter Subscribe ─────────────────────────────────────── */
function handleSubscribe(e) {
  e.preventDefault();
  const input = e.target.querySelector('input');
  const btn   = e.target.querySelector('.btn-subscribe');
  const orig  = btn.textContent;
  btn.textContent = '✓ Subscribed!';
  btn.style.background = '#22c55e';
  input.value = '';
  setTimeout(() => {
    btn.textContent = orig;
    btn.style.background = '';
  }, 3000);
}


/* ── Hamburger Menu ───────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '68px';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = '#fff';
    navLinks.style.padding = '1rem 1.5rem';
    navLinks.style.boxShadow = '0 8px 24px rgba(0,0,0,.1)';
    navLinks.style.zIndex = '800';
  });
}


/* ── Smooth hover on mosaic cards ─────────────────────────────── */
document.querySelectorAll('.mosaic-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - .5) * 14;
    const y = ((e.clientY - rect.top)  / rect.height - .5) * 14;
    card.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${-y}deg) scale(1.04)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});


/* ── Color swatch selection ───────────────────────────────────── */
document.querySelectorAll('.swatch').forEach(s => {
  s.addEventListener('click', function () {
    document.querySelectorAll('.swatch').forEach(sw => sw.style.outline = '');
    this.style.outline = '3px solid #6366f1';
    this.style.outlineOffset = '3px';
  });
});
