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
    routeType: 'INTERSTATE',
    zoneNumber: '2',
    zoneLabel: 'ZONE RIDE',
    zoneSub: '1 Adult',
    durationSeconds: 30 * 60,
    qrDataUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAdYAAAHWAQAAAADiYZX3AAAEXElEQVR4nO2dXYrcOhCFT8WGeZRhFnCX4t7BXVK2Zi8lCxiQHwMy5z6o9GPCuJNw44yHUw+ebrc/ugVFqXRUqjHid23/8tsoIPZzs+BSX5EkZpJcQgLmOJALBpIRADD4B9lCuuN4xV7DgksgSSZwCQlkHIg5DjmOkdG9yT9gyv7HRX4l9sQ8BIUEkglAIHMMy86VA9TAfJmZcoSTX4n9eXYgF+xmDwzEOvk9zHE3zEwo9/7v7xX7mdnVLLsUGXfjgt0A7IZ1Goh12u3PfK/Yz8f2+RVJAoFl9gskl0BPt+Y4dM9pHhR7at16cAnpZy5u8iuxJ8bOIpA1hTmWQFYVB5cdQntafiX2feuCka8Hm3QF+LQIAHOZJX1ulF+JPbGsGrR4laMUWkJV3iIU1dT1U/mV2PfNxfSQ0NynpVFlHoRfss7lr+44XrHXsNVLfBXY9mzaAtBV9qy3e9CSX4k9Z9fJlU8u2wvNJiALoetUpCug6VdFxJrjTccr9goWfS4VS7q1lD2bfEE4xKuc2iu/EntirobCZ8TsPjnd8mWfz4M506rzoPxK7JkV9yn6AQKPyfshyTroEXccr9hr2CosAF2xTHMfV0h9W6dzOMUrsWfWOw3KZLgU+TPXX/WlV55pSW8Xe2quckYUmYpNyUp9Go9ap5XvaR4Ue2KHar5SG7oAKNr6YX8wZ/VQvBL7jF1tBJfNzB7huwHbSxGszMws61cuXZlNrSbrpuMVewVbK9hZNprRxIZ+UeiXmuRrHhR7ynpp8W7wEzekPcL3Wi8Kl9/nVkMaSHvcdbxir2BHzPEV8IgEANuYuE6RhuBRyhDSSGxDKvcAzIvOD4p930oqDhy2a9LhoVo709/TPCj2ffP1IIa6HqxlVu0kYSjV790aUetBsSfWtgH7Sqzu4o5Us/V24vCO4xV7DTv63+2V8DRqhAEvnl/N38YEbK+0mfvY5VzKr8Se2AhsBmLz9aABQ8L6yDLVSGA3rg+UT7cx5dT+L/5msR+fLZs0GKoudSxobyp73cLR/qDYp9YyqFbkfsjlUbd1as07pIuKfWLtSGBX5L504asc++p1ecUrsU+sHJRA1/DKq0TLOS+vPj48rHgl9tS6KlEvlqkFV6X1VdZF655hrU2+43jFXsO2Lh5oFVaHdljH488AqnPdcbxir2H784NtHvQeanU9yOpmQDujc8fxir2GrfNg6gr5PIYdHulLaVTfLvaZsdkCHHSGfu13qCsNOu8s9hmby0LNDDO99Mps8o6QKLWhuQVkd++v/maxN2CbLrqV3cLc46NlWt9eaF9jLRrNrSLvOl6xF7AjgH0EwhuwPgZwfbhzGWAAwpv5O+wjsRkAjAnrv293HK/Ya9hDn+0IoASj8qosCtuSUf1kxP4S25por//Qu2uvZp5QzbGlVrtx+Ri/WezHZH/oh3zsJdr1/WDsD+VIZxB7ar1MBeAgjqJrIFM+9Uc0D4o9M9P/8xL7B9j/ANJtrFEnrQrHAAAAAElFTkSuQmCC'
  },
  {
    routeType: 'INTRASTATE',
    zoneNumber: '1',
    zoneLabel: 'ZONE RIDE',
    zoneSub: '1 Adult',
    durationSeconds: 30 * 60,
    qrDataUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAdYAAAHWAQAAAADiYZX3AAAEP0lEQVR4nO2dUYrkRgyGf8WGebQhB9ijuG+QI4U9Um5gHyUHCJQfB2z+PFSpSu7NuGGZOPHw66Gxe/3RUyBKql+S14iftf2Xn0YBsV+dXawYlhEA1h4AdgNW/24xMyzWA8u4++PjTdcr9goWnAeS5AYyAYDfYuJWn+rIeSAxcQNJkvOw3XG9Yq9jdzMbyz1nAGZjRyxjR/ehd7PfkzOLmX3G74r9uiw4DxuAYStXEzdgSh055we6nIGRJMtzBbvjesVew/bxZn0jsI7gMsL8y90w/fHrhuW3v/oje8f1ir2O7VhSKwD2yBtUx5xpzXkjezd71Ocmkp/xu2K/NLuamVkPYHg3fv/2bvlqxl42rWUE8u0yAvk4+LjtesVewPaYmoK1vuVrA3oYho7A2sOAN2L6swdqugXpV2LPLOsMJXlnDoGcg/t0xJQAMsXvlLeLPbV8umPqinNNCS5dDeUAmD+m4yOQX4k9Mc4omkJ2LmY1tGNRHIqEVSQGksx5+0T5ldiPrUjtJJtflauEqsHXjSyFg+Id1yv2GvaYX1WFFG0jK44UnMtLPXdcr9hr2Br9mud4GgVUr/P6YJGzsq/Jr8R+bAd/cZtyHHRvamFxHlp9Wn4l9mMLkS4Hudq7AP8o3kSylgZVHxR7bvE8WD2HfhT0xpgNLQR6pi+/EvuxPR8FqyQahNDQiVWbsLRfiT2zkjeh7lJZSXgSFuJRUOdBsa/Nu67oe1NyXws9pMdWhil10kXFnptHP6DJVOUomB/4MSxmUxwUe2Kt5BzEqVofDKrpxHarOCj2hbVKzWGCoqstfbE+2NR4xUGx5+wy1nLNmvv1UHwI3n9l426x/ypr8Dddr9gr2CAs+DmvKgn5u0NWHzDlV2JPzHUGLxLWURwvDcYKtPdfqT4o9oXFDartV8kTrzb21TR4786643rFXsNWSdS3qiqOHqqCteXBr3QeFPuCHbY8wszv394tjzoX64g8P5h2y1c5oV972OO26xV7Aev51SFl9/YGF0dLMASq1K68Xey5ed0Z7jTpUNupjcfl4dqHrDgo9sxaCad1ibb0PBRzssOhNPwpbxd7ap6o152rpecpVgVb65XmvMS+ttZ15cNeiPODuSoIPFd55FdiT60oCbVvvYW7GW0P2579T34l9tTCW/pmoCbvUQiNLVrxZVl3XK/Ya1j4jITvSHTlvfx7nXJurQz+8B3XK/YaNmTrHgw7xrFmAP9UM9R5UOyptanBMGwzo45z+WvWYp+W6oNiX7N+zsOU9lzHscdA2qOMNcfo56PO//XfLPZ/zh7eW4uWbnm4AxDVrfKddAaxLyz4VX2zjI+kxoQ+JFkucd1xvWKvYX/0qwQ8v02taPCxjqPzoNhXbE3K17ecWnFe2yu1dyv97Qmwx7Dlj8/4XbFflz2cBw+97OXYF/oZ6gAY9H5Rsedm+v+8xP4L7N+Ola/5R3OOggAAAABJRU5ErkJggg=='
  },
  {
    routeType: 'INTERSTATE',
    zoneNumber: '2',
    zoneLabel: 'ZONE RIDE',
    zoneSub: '1 Adult',
    durationSeconds: 30 * 60,
    qrDataUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAdYAAAHWAQAAAADiYZX3AAAEGUlEQVR4nO2dUY4TMQyGfzOVeJxKHICjTG/AkRBH4gbtUTjAStnHlTIyD7Edt0tTaYGBWf1+qHbSfiqRrNj5bRdRvNXWD29GAbLvm4We01+TthfVCtUC6HlW1XN/d67+8bnucb9kt2HNc8KR2ppqBRYNH2oupYpFK1RVVc/0K7JjdhWRoz2raoXIcVJcjpO6D72IfC3OXETkT3wv2ffLwkLbXNtfLSwuZVIPkFPLwFRV1T5n2B73S3Yb9pAfnj+qAFPF5QjxxVWwfP9UcfnydLhm97hfstuwB9iJtLZnvx5OVTAX4PLl6aDAiwCzf27R3/9esu+efRYRkQOA+UVwOa4CzC+iZ6x2aF2OQHu8HAEREZHTbvdLdgPWbnctPXeJwcwlBgCTJtnBjPkV2ftmClVL3lXdm6bQSyfFUlx7iDXm7WSHZlpVcdFz0Rs3s9ti/kgBqIuSHVrS2z2+Ae2UUnezLjGoqmJpL/Qrsvct51dz9quWUDUNPk6ppUweKnlekR1Yq8+0w6gAFviQy4UWEYEIgczbyT4wO5Y80vmJFM7laXzP793X6Fdk75u5SpRw2lqLg+5NWrrOkM61Pe6X7DYscqRr4W6yzDzJDnN0MSB54h73S3YbNs4mwO55pffJ9MaY6vXp3p3F/IrswLrU7g1X0cBQXBxNnVjRhMXziuzIPMi5/NnV0Cws2KPn97wPkn1gKQRer2nuIQ05q4XKiboo2bHlq+Cs+QLY1n4RFpsxDpId2JVLVXOfllCFm+XCYdLl97hfstuwSWW3yYjSpauaGmN6BdpalelXZMdslGueRfTb58jg29oBIsdVsPw4+FrT4He7X7J/n/UxQQBxz3PBqq3V26y+YdQZyI4s1WzUddGmKdyOpMZcqmsPe9wv2W1Y75MpXcmyYo4LEN7S1zV4787a437JbsOmEOg9fDXNzHc1Pjuc8j5I9oF1/SonWeXVgL1L8qZu8bwiO7QbH3LpKhragQiGQEjtzNvJjs28qSD1M3grg9dsol/URHfqomQfWW4GTTUbACZs2V92R/TLI+Mg2aGl8yppVXNkVX1QIqZWOedF9qH1C+DVeIQ/tqogbtJ46ldkH5gpCXFApUGJeLdr8KnRgX5FdmBedzZ1wU6pKyG09zPk4jP9iuzA8vyg5kPL3u8a/JxrhrwPkh2adus/vpDGmoGkZPWaIe+DZIf2emoQ/ZcePaGPciFijX5Fdsx2qb2sIvK5Qk6zqpxsrDlHPx91/tf/ZrL/OXv1u7XITQ39IOujOLnnnXk72YElv8rilGpWSKNZ5ow+wUO/InvfXvtVvBXFZ2uRuWkCpF+RHbKRlAOQ0xzV5marWH97AeQ01/byJ76X7Ptlb++D1txXfJYi9zPkUXvqomRHJvz/vMj+BfYnEubYGC6IYBEAAAAASUVORK5CYII='
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
  const ticketIndex = pickTicketFromUrl();
  const ticket = TICKETS[ticketIndex];

  // default (in case user never picks)
  setBorderColor('Yellow');
  renderTicket(ticket);

  setupQrModal();
  setupColorPicker(() => {
    startCountdown(ticket.durationSeconds);
  });
});
