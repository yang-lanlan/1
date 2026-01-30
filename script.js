/*
  Ticket mock behavior:
  - Color picker controls CSS var --qr-border
  - QR is offline: embedded PNG data URLs (version=7, so it has 3 finder + 6 alignment patterns)
  - Tap QR to enlarge
  - Countdown timer
*/

const COLORS = [
  { name: 'Green', hex: '#2bb673' },
  { name: 'Magenta', hex: '#9c27b0' },
  { name: 'Pink', hex: '#ff4fa8' },
  { name: 'Red', hex: '#e53935' },
  { name: 'Silver', hex: '#bfc5cc' },
  { name: 'Yellow', hex: '#f2d100' },
  { name: 'Blue', hex: '#2a79ff' },
];

// Offline QR images (PNG data URLs). Generated as QR version 7 (fit=false) to match the
// "9-square" look: 3 finder patterns + 6 alignment patterns.
const QR1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAeoAAAHqAQAAAADjFjCXAAAENklEQVR4nO2dTY7bMAyFH2sDs7SBHsg+enyUuYG0HEAGuxApMWm7kYNOg7y3MOKfD04AghQpShHFBR0/rtAAceLEif8zPItpzyI4RMSvzbBP6ymy5xlAnuGPz//Dlyf+ijhU06SqqopNi58moB5umNoNQG+LKjZVrc/dXvq3E/9e3DyXS2QFZF8KZF++BIfMAJbi97OI7M97O/G3xvMM2ZcCYFEFMCm2z4/q3Mz08vx3/OLbib8Nfm9EU5FjTbC8Nq/AsU5Q5J9FsCTIk99O/D3xanVePjkFyNJOpwLkVQBAsN3O2W4sCiA/4e3E3xc/a06KGlLTpJavApDdrwH5w24cIiKyPuntxN8PhwYloI7hgEl7NgtgUssmlvg8c1jiY3Ljmmr0tFJJmhRbAmAGp+o37jBaHfEhqWrzYQnQ22K1OWxaYMF1uavXYSnVOml1xMdkTguTlUqqllLN0UvFFokBTKq3FmtpdcSHZH4tdbuCO7J20NTGf/VhC8K0OuJj8tmvqUVOwKrEi6pPgZWWZrh1bswmiA/L01EfzbXganYFwI3QhnlmifR1xIfltRGYN+uHZmsea9EscWLlhPgVmfksGuyq3rG4WgB444nXUCybpdURH1Md0tUCiacPobUptDu1TyZGWOKj8npd8Rx2KV6WCxMU3SaBbn+0OuJj6ulrD5/m69STBm3DPLthUZdWR3xMcVbV+zbttJ40X7dYrst6HfFn1esAxHGdhuFbz1zD3CzrdcTH5XMOD00msNpcqOGlfs0PtDri47js7SCrO7xjtWt6y3HdhOw4xTrd/4cvT/zl8PmuUf0UYEmQTc/arK7IU3lA6rVjTdffTvw98VavA9DGdXGCDIBNhtVEopOMsMRHFeogvUDS1oj1yp0X8spdz9NL/3bi34WH2nCc5L/PMG49uU0ILQC0OuJj6p1Ov/cBxIrwQyGZVkf8gkKBeOv14t4yDISeE7/PXmLil9TnIWKsRWwGeHCHdXDHeVji4/LcAJagbu7N+kJFO+29AfVxWh3xUYU5hxZm4zKKRZuHu/OJnIclPq6+FDY02T1mrp7S2nPKdRPEL8mj6UO9rsSVsbZkAoibPdHXER9Wn/3vttYtrGcOfaFYjbVKX0d8WHFuIqF+Qusb7jU8f869I+t1xMcV1v7H9TixaBz7i1MnGWGJj0qD0p3pxZ671kucok+k1REfxfse7DgFxwpg+5Ta6SQ7ABvw5dk3LIb7v+//8sRfEX/cg93zhbgbu2/s1BbvsJeY+DX1ZYfduHys1/SHsR5zWOLjilbXJiPiJnYaF2W3tgD6OuLjmv94dfusCyVmIP8svgd2mX0j9hmy3bhugvgl3Itxp6h+iuBYJ5W9tzvVzbEnVU2n+MzZ095O/B3xtgd7/mh7dX55Duv/fCK7n1ozVOb/iBEflPCfOokTJ/4G+C94l9lLvOq6HgAAAABJRU5ErkJggg==";
const QR2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAeoAAAHqAQAAAADjFjCXAAAERklEQVR4nO2dS27rSAxFD1sGMpSBLCBLkXb20DuTl5IdSMMHSOAbFOujoHtSMjod+HJgxLIO5ADEreIlJZtzIR5/XaFBuHDhwv8zfLOImcPM7AZwmM3bjfQScQO+vP32Ly/8p+KDu7s7bG/uy7jDw94cxh1f0os7k+/w+Nhhcnf39f/x5YX/WDyUa9wBDmNawZekdWZMnyFzEZuZzc+7uvDXxg8DBudxB7OPHV8AmwFfOKxNvedfXfir4Kck2t4dtttu0/oObJYOO+zYtDj25KsLf008ZV3YJ+OOTevdeHz8Nmd732G7A9v77uklnefA9oSrC39d/Eg1aV4+B2f6fHObAZsZyl9g83aDh5mZ3Z90deGvh+Nt7ERtOrr7wuDu6+CQa1hfxtP5y4/+34V/F07Kq2kdwhsBkjdyOmsIq2RaIxNT/inrhHeF+wohc9WHO8lccvPCpSvmnrJO+AV8dI8WxB2SN+y+YzPhl6TdXHLpxvLBpt6E8N6IFbZs2hby8pm0jqyEqUGRTnYHBmmd8M5oFs2STW1yjTtMK/xThaGsE94Xp+1brmFLpzVv+HZ84VTNqoYV3h/uvhPitgJp5YTUDEvHitYRSkhUs8o64V2Rs66tZnOahaRFwjUjKNI64RfxLcZNbGbwPF9XZ05uoXpsN+zX5w2byV2K7//ywn8inhUulRRZ5qKkzZUrUBSu3eFJ64T3RfaGW5ckiobcgojFFYj2xejqTQi/ErlyDa1LQhaNrygpWl9ldPl1wp+2wgKklfNLSUvbfW3Pk9YJ741T4zW/PafZFw+5sfSUdcJ78TDobAbM7oMDh6Ux9plSr+bhdZsZXH1Y4f2RMskAnA38MR9pTt2m9T0f+/htnueL07G4tedH/+/CvwsvSyqQ9mv5WLh0+ViYxmvm1JsQfhGPUnU9LBUSSchymkUSbm9t/v39Ia0T3hvtoCZEb2wZ92IVu9cGWePcyTkR3h8162K0rkw6JQ+lcenUhxX+HLy4xNAmF0PzVx7yJPRPzonwa3hzt067hyt9MK+Tnlnrqv4p64T3RTaDh3+ZJa6znCu0o3XKOuHd0ezrytxw+iDlVZk0KaqXRwVUTQjvjbyl26GOEZ/nUE5DxrXWkNYJ741q/LYt2DpVUurV1Iw99WaVdcL74qRr7VRJdo4p8+3t3TrqTQi/EHkjV+/ROVsl2bkLqw5pnfBnVRNLHq07PV0HKMtse2csSOuEXwlvYs0H6xpaR9sXKFon50T4pTjlWthyTal6HgY4HVPWCe+N0xMn6vat1bVIx1x11DVZWSf8Ap5/TCLPMoXqHfFIzofd8u2xHGZ2P0xTncIvRDVN6m6uihvkkja0rnyg7r/w/mizbq1vTwZduT32dBuPVljhl/Aw7ca2BRu/o7Me5r4eFsPD4056dKJpllh4d3y9FaI+e4LGKqa8LTWsqgnhvWH6pU7hwoW/AP4H683lWh55XSEAAAAASUVORK5CYII=";
const QR3 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAeoAAAHqAQAAAADjFjCXAAAEYklEQVR4nO2dXarkOAxGjyaBfnTgLmCWkmxtljQ7SJbSC7iQPF5woXmw/JPiNg1OMdVFSQ+hkvjgCgjZ+iwnolyw7a8rNDjuuOOO/2/4IWbLIcImIvnaiP2abiLLMQLHSG4+/gl/3vFXxFHdB1VVVWaN6ZR5B9UddGUoN0DXoMqsqglbX/rZHX8ubpErm/4zgSwhIkv4EjYZgRDz/UNElsf17vhb48eILOFLZAmqwKDMP3+k4Gaud4y/xi/27vjb4GcnGqIAWF57TLBNA8rxEYWwIw/u3fH3xJPXZfnkJmzTZ7k5RDgmARDm9TZau6DA8YDeHX9f/JZyUsqQavkqIAuDMu+DwpFvbCIiMj2od8ffD0cb2yHN4WCwLFV3AAa1bCK07T2HdbzPsnMNafQ0qSTLJ5jDqeYbJ8y9zvEuU9USw3bQNZg2x6wRG1zDSa8jxOSd7nWO95kFLWqsA3Ozqg1jIzEwqK5lrHWvc7zLLK7teYa3Qg5k5aDlrjW2Qdi9zvEuy8rJMUQhfCZtROb9AyHsQNiReY2jzCtkNS9iycVLP7vjz8I5LcHesess9EGezVmEC+qxzvErlrURTDRJh90y1zZzyE1s1HXlxPFuq/O16leWvpYDufAkayiWzbrXOd5nVtqkZdA8lzY15U7ll5mPsI73mul1FKk4xCzLNQsUQxZNgOp/7nWO95nN60J2vSbWleLNJNWFknUUP3Wvc7zLTAxWzeovrXJHGwRVk8O5Xuf4NZy7Rf5TCYBdq5lrszY7ew7reLe1A2k5rGDaXBl/67JE2+6ln93x5+Ky1EOe4bFNdk3Xo903IQs3sXZ/wp93/OXw8VSofhM2GaLMekvF6soxxDskXdum/Xrvjr8n3mxFpOSwtdzELBTRuF7zHNbxbmv1uiKQEGpVU94tZkJePNU8vfSzO/4sPPtQsDKSJJ+Ugs5afdfksKUEwL3O8S5L8zrl+JH249QdrwpfooSvNMMTwqew/a2wTYg+pHfH3xNvBeJSc3Jar6CpOTGZpdYBvPSzO/4sPNfX7eex9rta4izfpcmdr8M63m/N6leatOVo1pR2lkWzXG4HeDbheL/VWqZ2mN1r6CvVd6W0TtVriR2/ZHUrrFUQ803mmhfNrF2Z/7nXOd5leTS90+tiu4PCtkxAFfI81jl+werqf1PQWTysZg65oF1NqlOPdY53W7s2sZN+QZVK9rt2OTq6Sux4v93t/ad6XXW4Fah7KWo79zrH+0wbq3UAwU7bfRPNNcC9zvEreH0HO1bfxPxTbB1sAWzCd4yITKXm7kG9O/6G+P072Jscosa1uinba4kdfwBe9Lqh2fHflLEnSwLxaa7nOazj/dZ6XVmMOL/spH0LSl7D8Fjn+AX71uvsfQClyK7ugg3aLFC41zneZed3sINyCLotiJqGEklbK+z0NjL/+xHlIb07/r54eQd7/YRJiMgCyJK+fNKeWjHU4d8Rc7zTRH/f5tfmX+p03HHHXwP/D2UjwRfXaijNAAAAAElFTkSuQmCC";

const TICKETS = [
  { routeType: 'INTRASTATE', zoneNumber: '1', zoneLabel: 'ZONE RIDE', zoneSub: '1 Adult', qr: QR1 },
  { routeType: 'INTERSTATE', zoneNumber: '2', zoneLabel: 'ZONE RIDE', zoneSub: '1 Adult', qr: QR2 },
  { routeType: 'INTRASTATE', zoneNumber: '1', zoneLabel: 'ZONE RIDE', zoneSub: '1 Adult', qr: QR3 },
];

function $(id){ return document.getElementById(id); }

function buildColorGrid(){
  const grid = $('colorGrid');
  grid.innerHTML = '';

  COLORS.forEach(c => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'swatch';
    btn.style.setProperty('--swatch', c.hex);
    btn.setAttribute('aria-label', c.name);
    btn.addEventListener('click', () => applyColorAndStart(c.hex));
    grid.appendChild(btn);
  });
}

function applyColorAndStart(hex){
  document.documentElement.style.setProperty('--qr-border', hex);
  $('picker').classList.add('hidden');
  $('screen').classList.add('is-visible');
  $('screen').setAttribute('aria-hidden', 'false');
  initTicket();
}

function getTicketIndex(){
  const params = new URLSearchParams(location.search);
  const t = Number.parseInt(params.get('t') || '', 10);
  if (!Number.isNaN(t) && t >= 1 && t <= TICKETS.length) return t - 1;
  return Math.floor(Math.random() * TICKETS.length);
}

function initTicket(){
  const idx = getTicketIndex();
  const ticket = TICKETS[idx];

  $('routeType').textContent = ticket.routeType;
  $('zoneNumber').textContent = ticket.zoneNumber;
  $('zoneLabel').textContent = ticket.zoneLabel;
  $('zoneSub').textContent = ticket.zoneSub;

  $('qrImage').src = ticket.qr;
  $('qrImageLarge').src = ticket.qr;

  setupModal();
  setupValidatorLink();
  startCountdown(30 * 60); // 30 minutes
}

function setupModal(){
  const modal = $('modal');
  const openBtn = $('qrButton');
  const bg = $('modalBg');

  const open = () => {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
  };
  const close = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  };

  openBtn.addEventListener('click', open);
  bg.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

function setupValidatorLink(){
  $('validatorLink').addEventListener('click', (e) => {
    e.preventDefault();
  });
}

function formatMMSS(totalSeconds){
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function startCountdown(seconds){
  const endAt = Date.now() + seconds * 1000;
  const el = $('expires');

  const tick = () => {
    const remain = Math.max(0, Math.round((endAt - Date.now()) / 1000));
    el.textContent = `Expires in ${formatMMSS(remain)}`;
    if (remain > 0) requestAnimationFrame(() => setTimeout(tick, 250));
  };
  tick();
}

// Boot
buildColorGrid();
