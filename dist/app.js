const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const page = document.body.dataset.page;

function go(url) {
  document.body.classList.add('leaving');
  window.setTimeout(() => { window.location.href = url; }, 380);
}

$$('[data-go]').forEach((button) => button.addEventListener('click', () => go(button.dataset.go)));

function unlock() {
  const next = $('.next');
  if (next) next.classList.add('unlocked');
}

if (page === 'intro') {
  let tries = 0;
  $('#enter').addEventListener('click', () => {
    celebrate(40);
    window.setTimeout(() => go('lesson.html'), 550);
  });
  $('#imposter').addEventListener('click', () => {
    tries += 1;
    const messages = [
      'Suspicious. Only Bokya would click that.',
      'Nice try. The confidential file still says it is yours.',
      'Identity confirmed by excessive cuteness.'
    ];
    $('#response').textContent = messages[Math.min(tries - 1, messages.length - 1)];
  });
}

if (page === 'distance') {
  $('#connect').addEventListener('click', () => {
    $('.route').classList.add('reveal');
    $('.route-note').textContent = 'Distance increased. Talking somehow increased even more.';
    window.setTimeout(unlock, 700);
  });
}

if (page === 'evidence') {
  let photoIndex = 0;
  $('#reveal-photo').addEventListener('click', () => {
    const photos = $$('.photo');
    if (photoIndex >= photos.length) return;
    photos[photoIndex].classList.add('open');
    photoIndex += 1;
    $('#reveal-photo').textContent = photoIndex < photos.length ? 'Reveal next piece →' : 'Evidence accepted ✓';
    if (photoIndex === photos.length) {
      celebrate(25);
      unlock();
    }
  });
}

if (page === 'call') {
  $('.decline').addEventListener('click', () => {
    $('#call-note').textContent = 'Impossible. Birthday calls from Italy cannot be declined.';
  });
  $('.accept').addEventListener('click', () => {
    $('.screen').innerHTML = '<div class="avatar">♡</div><h2>Happy birthday, Boku.</h2><p>You make every kilometre feel smaller.</p><p>Call connected · dinner mission activated</p>';
    celebrate(35);
    window.setTimeout(unlock, 500);
  });
}

if (page === 'final') {
  $('#wish').addEventListener('click', () => {
    celebrate(160);
    $('#wish').textContent = 'Your gift is waiting ✓';
    $('#gift-clearance').classList.add('show');
    window.setTimeout(() => $('#gift-clearance').scrollIntoView({ behavior: 'smooth', block: 'center' }), 450);
  });
}

const canvas = $('#confetti');
let context;
let particles = [];
let animationFrame;

if (canvas) {
  context = canvas.getContext('2d');
  const resizeCanvas = () => {
    const ratio = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  };
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
}

function celebrate(count = 80) {
  if (!context) return;
  const colours = ['#ff6f9f', '#e94279', '#ffd66b', '#fff1f5', '#6f3a68'];
  for (let index = 0; index < count; index += 1) {
    particles.push({
      x: window.innerWidth / 2 + (Math.random() - 0.5) * 170,
      y: window.innerHeight * 0.32,
      vx: (Math.random() - 0.5) * 11,
      vy: Math.random() * -9 - 3,
      gravity: 0.17 + Math.random() * 0.09,
      size: 5 + Math.random() * 7,
      colour: colours[Math.floor(Math.random() * colours.length)],
      rotation: Math.random() * 3,
      spin: (Math.random() - 0.5) * 0.2,
      life: 130
    });
  }
  if (!animationFrame) drawConfetti();
}

function drawConfetti() {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  particles = particles.filter((particle) => particle.life > 0 && particle.y < window.innerHeight + 30);
  particles.forEach((particle) => {
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.vy += particle.gravity;
    particle.rotation += particle.spin;
    particle.life -= 1;
    context.save();
    context.translate(particle.x, particle.y);
    context.rotate(particle.rotation);
    context.fillStyle = particle.colour;
    context.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size * 0.6);
    context.restore();
  });
  animationFrame = particles.length ? window.requestAnimationFrame(drawConfetti) : null;
}
