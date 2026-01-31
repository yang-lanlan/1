// Offline (no network) QR: the QR images below are embedded data URLs.
// If you want real ticket payloads, replace the payload strings used to generate these.

const BORDER_COLORS = {
  Green:   '#22c55e',
  Magenta: '#d946ef',
  Pink:    '#ff4fa3',
  Red:     '#ef4444',
  Silver:  '#c7c7c7',
  Yellow:  '#f2d100',
  Blue:    '#2563eb'
};

const TICKETS = [
  {
    routeType: 'INTRASTATE',
    zoneNumber: '1',
    zoneLabel: 'ZONE RIDE',
    zoneSub: '1 Adult',
    durationSeconds: 60 * 60,
    qrDataUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAdYAAAHWAQAAAADiYZX3AAAEP0lEQVR4nO2dUYrkRgyGf8WGebQhB9ijuG+QI4U9Um5gHyUHCJQfB2z+PFSpSu7NuGGZOPHw66Gxe/3RUyBKql+S14iftf2Xn0YBsV+dXawYlhEA1h4AdgNW/24xMyzWA8u4++PjTdcr9goWnAeS5AYyAYDfYuJWn+rIeSAxcQNJkvOw3XG9Yq9jdzMbyz1nAGZjRyxjR/ehd7PfkzOLmX3G74r9uiw4DxuAYStXEzdgSh055we6nIGRJMtzBbvjesVew/bxZn0jsI7gMsL8y90w/fHrhuW3v/oje8f1ir2O7VhSKwD2yBtUx5xpzXkjezd71Ocmkp/xu2K/NLuamVkPYHg3fv/2bvlqxl42rWUE8u0yAvk4+LjtesVewPaYmoK1vuVrA3oYho7A2sOAN2L6swdqugXpV2LPLOsMJXlnDoGcg/t0xJQAMsXvlLeLPbV8umPqinNNCS5dDeUAmD+m4yOQX4k9Mc4omkJ2LmY1tGNRHIqEVSQGksx5+0T5ldiPrUjtJJtflauEqsHXjSyFg+Id1yv2GvaYX1WFFG0jK44UnMtLPXdcr9hr2Br9mud4GgVUr/P6YJGzsq/Jr8R+bAd/cZtyHHRvamFxHlp9Wn4l9mMLkS4Hudq7AP8o3kSylgZVHxR7bvE8WD2HfhT0xpgNLQR6pi+/EvuxPR8FqyQahNDQiVWbsLRfiT2zkjeh7lJZSXgSFuJRUOdBsa/Nu67oe1NyXws9pMdWhil10kXFnptHP6DJVOUomB/4MSxmUxwUe2Kt5BzEqVofDKrpxHarOCj2hbVKzWGCoqstfbE+2NR4xUGx5+wy1nLNmvv1UHwI3n9l426x/ypr8Dddr9gr2CAs+DmvKgn5u0NWHzDlV2JPzHUGLxLWURwvDcYKtPdfqT4o9oXFDartV8kTrzb21TR4786643rFXsNWSdS3qiqOHqqCteXBr3QeFPuCHbY8wszv394tjzoX64g8P5h2y1c5oV972OO26xV7Aev51SFl9/YGF0dLMASq1K68Xey5ed0Z7jTpUNupjcfl4dqHrDgo9sxaCad1ibb0PBRzssOhNPwpbxd7ap6o152rpecpVgVb65XmvMS+ttZ15cNeiPODuSoIPFd55FdiT60oCbVvvYW7GW0P2579T34l9tTCW/pmoCbvUQiNLVrxZVl3XK/Ya1j4jITvSHTlvfx7nXJurQz+8B3XK/YaNmTrHgw7xrFmAP9UM9R5UOyptanBMGwzo45z+WvWYp+W6oNiX7N+zsOU9lzHscdA2qOMNcfo56PO//XfLPZ/zh7eW4uWbnm4AxDVrfKddAaxLyz4VX2zjI+kxoQ+JFkucd1xvWKvYX/0qwQ8v02taPCxjqPzoNhXbE3K17ecWnFe2yu1dyv97Qmwx7Dlj8/4XbFflz2cBw+97OXYF/oZ6gAY9H5Rsedm+v+8xP4L7N+Ola/5R3OOggAAAABJRU5ErkJggg=='
  }
];

const $ = (sel) => document.querySelector(sel);

function pad2(n){ return String(n).padStart(2, '0'); }

function formatCountdown(seconds){
  if (seconds < 0) seconds = 0;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${pad2(s)}`;
}

function setBorderColor(colorName){
  const hex = BORDER_COLORS[colorName] || BORDER_COLORS.Yellow;
  document.documentElement.style.setProperty('--qr-border', hex);
}

function pickTicketFromUrl(){
  // ?t=1 (1-based). If missing or invalid, use the first ticket.
  const t = new URLSearchParams(window.location.search).get('t');
  const idx = (t ? Number(t) - 1 : 0);
  if (Number.isFinite(idx) && idx >= 0 && idx < TICKETS.length) return idx;
  return 0;
}

function renderTicket(ticket){
  $('#route-type').textContent = ticket.routeType;
  $('#zone-number').textContent = ticket.zoneNumber;
  $('#zone-label').textContent = ticket.zoneLabel;
  $('#zone-sub').textContent = ticket.zoneSub;

  $('#qr-image').src = ticket.qrDataUrl;
  $('#qr-modal-img').src = ticket.qrDataUrl;
}

function startCountdown(seconds){
  let left = seconds;
  const el = $('#timer');

  const tick = () => {
    el.textContent = `Expires in ${formatCountdown(left)}`;
    left -= 1;
    if (left < 0) left = 0;
  };

  tick();
  return setInterval(tick, 1000);
}

function setupQrModal(){
  const modal = $('#qr-modal');
  const open = () => modal.classList.add('show');
  const close = () => modal.classList.remove('show');

  $('#qr-frame').addEventListener('click', open);
  $('#qr-frame').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
  });

  modal.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

function setupColorPicker(onDone){
  document.querySelectorAll('.swatch').forEach((btn) => {
    btn.addEventListener('click', () => {
      const colorName = btn.getAttribute('data-color');
      setBorderColor(colorName);
      $('#color-selection').classList.add('hidden');
      $('#container').classList.add('is-visible');
      onDone?.(colorName);
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const etIndex = pickTicketFromUrl();
  const ticket = TICKETS[ticketIndex];

  // default (in case user never picks)
  setBorderColor('Yellow');
  renderTicket(ticket);

  setupQrModal();
  setupColorPicker(() => {
    startCountdown(ticket.durationSeconds);
  });
});
