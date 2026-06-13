/* ============================================================
   ODDLINES — App core
   ============================================================ */
(function(){
const LS='oddlines.v1';
const def={ lang:'en', odds:'decimal', theme:'dark', density:'regular', radius:'default', headstyle:'heavy', accent:'brand', slip:[] };
let S = Object.assign({}, def, JSON.parse(localStorage.getItem(LS)||'{}'));
function save(){ localStorage.setItem(LS, JSON.stringify(S)); }
OD.get = (k)=>S[k];
OD.set = (k,v)=>{ S[k]=v; save(); };

/* ---------- accents ---------- */
OD.accents = {
  brand:['#36E2A8','#2E6BFF'],
  electric:['#2E6BFF','#2E3DFF'],
  aqua:['#36E2A8','#1FC6E0'],
  violet:['#6E8BFF','#7A5AE0'],
};

/* ---------- icons (functional UI glyphs) ---------- */
const I = OD.icons = {
  home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></svg>',
  grid:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
  odds:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V5"/><path d="M4 15l5-5 4 3 7-7"/><path d="M16 6h4v4"/></svg>',
  help:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.2 9.2a2.8 2.8 0 0 1 5.4 1c0 1.8-2.6 2.2-2.6 4"/><path d="M12 17.5h.01"/></svg>',
  bolt:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 4.5 13.2c-.4.5 0 1.3.7 1.3H11l-1 7.5 8.5-11.2c.4-.5 0-1.3-.7-1.3H12l1-7.5Z"/></svg>',
  chevron:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
  arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>',
  back:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m11 6-6 6 6 6"/></svg>',
  search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></svg>',
  slip:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3h14v18l-2.3-1.5L14.5 21 12 19.4 9.5 21l-2.2-1.5L5 21Z"/><path d="M9 8h6M9 12h6"/></svg>',
  shield:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 5 6v5c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></svg>',
  zap:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4.5 13.2c-.4.5 0 1.3.7 1.3H11l-1 7.5 8.5-11.2c.4-.5 0-1.3-.7-1.3H12l1-7.5Z"/></svg>',
  clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5L20 7"/></svg>',
  plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>',
  x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  sliders:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h11M19 7h1M4 17h5M13 17h7"/><circle cx="17" cy="7" r="2.2"/><circle cx="11" cy="17" r="2.2"/></svg>',
  star:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.2l1-5.8-4.3-4.1 5.9-.9L12 3Z"/></svg>',
  globe:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18"/></svg>',
  rocket:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 15c-1.5 1.3-2 5-2 5s3.7-.5 5-2"/><path d="M9 15l-3-3c1-5 5-9 11-9 0 6-4 10-9 11Z"/><circle cx="14.5" cy="9.5" r="1.5"/></svg>',
  trophy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4h10v5a5 5 0 0 1-10 0V4Z"/><path d="M7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3M9 19h6M10 15.5V19M14 15.5V19"/></svg>',
  // sports (simple geometric glyphs)
  soccer:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="m12 7 3 2.2-1.1 3.5h-3.8L9 9.2 12 7Z" fill="currentColor" stroke="none"/></svg>',
  basketball:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18M5.5 5.5c4 2 9 2 13 0M5.5 18.5c4-2 9-2 13 0"/></svg>',
  football:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 12c0-4 4-8 8-8s8 4 8 8-4 8-8 8-8-4-8-8Z"/><path d="M9 12h6M11 10v4M13 10v4"/></svg>',
  tennis:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M5 5c3.5 3 3.5 11 0 14M19 5c-3.5 3-3.5 11 0 14"/></svg>',
  baseball:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M7 4.5c1.5 2 1.5 13 0 15M17 4.5c-1.5 2-1.5 13 0 15"/></svg>',
  mma:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 11V7a2 2 0 0 1 4 0M10 9V6a2 2 0 0 1 4 0v3M14 9V7a2 2 0 0 1 4 0v6a6 6 0 0 1-6 6H9a5 5 0 0 1-5-5v-1a2 2 0 0 1 4 0"/></svg>',
};

/* ---------- i18n ---------- */
OD.t = (k)=> (OD.i18n[S.lang] && OD.i18n[S.lang][k]) || (OD.i18n.en[k]) || k;
function applyI18n(root){
  (root||document).querySelectorAll('[data-i18n]').forEach(el=>{
    const v = OD.t(el.getAttribute('data-i18n'));
    if(el.dataset.i18nHtml!==undefined || /\n/.test(v)) el.innerHTML = v.replace(/\n/g,'<br>');
    else el.textContent = v;
  });
  (root||document).querySelectorAll('[data-i18n-ph]').forEach(el=>{ el.placeholder = OD.t(el.getAttribute('data-i18n-ph')); });
  document.documentElement.lang = S.lang;
}
OD.applyI18n = applyI18n;

/* ---------- theme/tweak application ---------- */
function applyTheme(){
  const r=document.documentElement;
  r.setAttribute('data-theme', S.theme);
  r.setAttribute('data-density', S.density);
  r.setAttribute('data-radius', S.radius);
  r.setAttribute('data-headstyle', S.headstyle);
  const a = OD.accents[S.accent]||OD.accents.brand;
  r.style.setProperty('--acc-a', a[0]);
  r.style.setProperty('--acc-b', a[1]);
  r.style.setProperty('--acc', a[1]);
}
OD.applyTheme = applyTheme;

/* ---------- region flag-ish label ---------- */
const REGION = { ES:'🇪🇸 ES', EN:'🏴 ENG', MX:'🇲🇽 MX', US:'🇺🇸 US', INT:'🌐 INT' };

/* ---------- odds value w/ trend ---------- */
function oddVal(dec, trend){
  const v = OD.fmtOdds(dec, S.odds);
  const cls = trend==='+'?'up':trend==='-'?'down':'';
  const arr = trend==='+'?'▲':trend==='-'?'▼':'';
  return `<span class="od-val ${cls}">${v}${arr?`<span class="arrow">${arr}</span>`:''}</span>`;
}

/* ---------- bet slip ---------- */
OD.slipHas = (id)=> S.slip.includes(id);
OD.toggleSlip = (id)=>{ const i=S.slip.indexOf(id); if(i>=0)S.slip.splice(i,1); else S.slip.push(id); save(); paintSlip(); };
function paintSlip(){
  document.querySelectorAll('[data-odd]').forEach(b=>b.classList.toggle('sel', OD.slipHas(b.dataset.odd)));
  const fab=document.getElementById('slipFab');
  if(fab){ const n=S.slip.length; fab.style.display = n? 'flex':'none'; const c=fab.querySelector('.cnt'); if(c)c.textContent=n; }
  const hb=document.getElementById('slipBtnCnt');
  if(hb){ const n=S.slip.length; hb.textContent=n; hb.style.display=n?'grid':'none'; }
  renderSlipRail();
}
OD.paintSlip = paintSlip;

/* ---------- match card ---------- */
function crest(t){ return `<span class="crest" style="background:${t.color}">${t.abbr.slice(0,3)}</span>`; }
function timeLabel(e){
  if(e.live) return `<span class="live"><span class="pulse"></span>${OD.t('live')} · ${e.minute}</span>`;
  if(e.start){ const d=new Date(e.start); return `<span>${d.toLocaleDateString(S.lang,{weekday:'short',day:'numeric',month:'short'})} · ${d.toLocaleTimeString(S.lang,{hour:'2-digit',minute:'2-digit'})}</span>`; }
  return '';
}
OD.matchCard = function(e, opts){
  opts=opts||{};
  const m=e.markets.moneyline; const hasDraw = m[1]>0;
  const labels = hasDraw ? [OD.t('win'),OD.t('draw'),OD.t('win')] : [e.home.abbr, e.away.abbr];
  const sels = hasDraw
    ? [{id:e.id+'-1',d:m[0],t:e.trend[0],l:'1'},{id:e.id+'-x',d:m[1],t:e.trend[1],l:'X'},{id:e.id+'-2',d:m[2],t:e.trend[2],l:'2'}]
    : [{id:e.id+'-1',d:m[0],t:e.trend[0],l:e.home.abbr},{id:e.id+'-2',d:m[2],t:e.trend[2],l:e.away.abbr}];
  const oddsHtml = sels.map(s=>`<div class="odd"><span class="od-lbl">${s.l}</span>${oddVal(s.d,s.t)}</div>`).join('');
  return `<article class="match">
    <div class="match-top">
      <span class="match-meta"><span class="league-tag">${e.league}</span><span>·</span><span>${REGION[e.region]||e.region}</span></span>
      <span class="match-meta">${timeLabel(e)}</span>
    </div>
    <div class="match-teams">
      <div class="team">${crest(e.home)}<span class="name">${e.home.name}</span>${e.score?`<span class="score">${e.score[0]}</span>`:''}</div>
      <div class="team">${crest(e.away)}<span class="name">${e.away.name}</span>${e.score?`<span class="score">${e.score[1]}</span>`:''}</div>
    </div>
    <div class="odds-row ${hasDraw?'':'two'}">${oddsHtml}</div>
  </article>`;
};

OD.allEvents = function(){ const out=[]; OD.sports.forEach(s=>s.leagues.forEach(l=>l.events.forEach(e=>out.push(Object.assign({sport:s.key,icon:s.icon},e))))); return out; };

/* ---------- chrome ---------- */
function logoHTML(){
  return `<a class="brand" href="index.html" aria-label="Oddlines home">
    <img class="mark" src="assets/logo-icon.png" alt="">
    <img class="word" src="assets/wordmark-white.png" alt="Oddlines">
  </a>`;
}
function langSeg(){
  return `<div class="seg" role="group" aria-label="${OD.t('lang')}">
    <button data-lang="en" class="${S.lang==='en'?'on':''}">EN</button>
    <button data-lang="es" class="${S.lang==='es'?'on':''}">ES</button>
  </div>`;
}
OD.mountHeader = function(active){
  const el=document.getElementById('hdr'); if(!el) return;
  const showBack = active && active!=='home';
  el.className='hdr';
  el.innerHTML=`<div class="hdr-row">
    ${logoHTML()}
    <div class="hdr-actions">
      ${langSeg()}
      <button class="icon-btn" id="tweakOpen" aria-label="Tweaks" style="display:none">${I.sliders}</button>
    </div>
  </div>`;
  el.querySelectorAll('[data-lang]').forEach(b=>b.onclick=()=>{ OD.set('lang',b.dataset.lang); location.reload(); });
};
OD.mountTabbar = function(active){
  const el=document.getElementById('tabbar'); if(!el) return;
  const items=[
    {k:'home',href:'index.html',icon:'home',l:'nav_home'},
    {k:'sports',href:'sports.html',icon:'grid',l:'nav_sports'},
    {k:'bet',href:'bet-now.html',icon:'bolt',l:'nav_bet',cta:true},
    {k:'odds',href:'odds.html',icon:'odds',l:'nav_odds'},
    {k:'help',href:'help.html',icon:'help',l:'nav_help'},
  ];
  el.className='tabbar';
  el.innerHTML=`<a class="side-brand" href="index.html" aria-label="Oddlines home"><img class="mark" src="assets/logo-icon.png" alt=""><img class="word" src="assets/wordmark-white.png" alt="Oddlines"></a>` + items.map(it=>{
    if(it.cta) return `<a class="tab tab-cta ${active===it.k?'active':''}" href="${it.href}"><span class="fab">${I[it.icon]}</span><span>${OD.t(it.l)}</span></a>`;
    return `<a class="tab ${active===it.k?'active':''}" href="${it.href}">${I[it.icon]}<span>${OD.t(it.l)}</span></a>`;
  }).join('');
};
OD.mountFooter = function(){
  const el=document.getElementById('footer'); if(!el) return;
  el.className='footer';
  el.innerHTML=`
    <img class="word" src="assets/wordmark-white.png" alt="Oddlines">
    <div class="foot-links">
      <a href="sports.html" data-i18n="nav_sports"></a>
      <a href="odds.html" data-i18n="nav_odds"></a>
      <a href="bet-now.html" data-i18n="nav_bet"></a>
      <a href="help.html" data-i18n="nav_help"></a>
      <a href="about.html" data-i18n="nav_about"></a>
      <a href="help.html#contact" data-i18n="contact"></a>
    </div>
    <div class="foot-18"><span class="badge18">18+</span><span class="foot-legal" data-i18n="resp_d"></span></div>
    <p class="foot-legal">© 2026 Oddlines. ${S.lang==='es'?'Plataforma de cuotas con licencia. Juega responsablemente.':'Licensed odds platform. Please play responsibly.'}</p>`;
};
OD.mountSlipFab = function(){
  if(document.getElementById('slipFab')) return;
  const a=document.createElement('a'); a.id='slipFab'; a.href='bet-now.html';
  a.style.cssText='position:fixed;right:max(16px,calc(50% - 240px + 16px));bottom:96px;z-index:65;display:none;align-items:center;gap:8px;padding:12px 18px;border-radius:999px;background:var(--grad);color:#fff;font-family:var(--f-head);font-weight:700;font-size:13px;box-shadow:0 12px 30px -8px var(--acc);';
  a.innerHTML=`${I.slip}<span data-i18n="betslip">${OD.t('betslip')}</span> <span class="cnt" style="background:rgba(255,255,255,.25);border-radius:999px;padding:1px 8px">0</span>`;
  document.body.appendChild(a);
};

/* ---------- shared slip resolver ---------- */
OD.resolveSlip = function(id){
  const base=id.replace(/-(1|x|2)$/,''); const sel=id.slice(base.length+1);
  let ev=null; OD.allEvents().forEach(e=>{if(e.id===base)ev=e;});
  if(!ev) return null;
  const m=ev.markets.moneyline;
  const odds = sel==='1'?m[0]:sel==='x'?m[1]:m[2];
  const team = sel==='1'?ev.home.name:sel==='2'?ev.away.name:OD.t('draw');
  return {ev,odds,lbl:sel.toUpperCase(),team};
};

/* ---------- docked bet-slip rail (tablet drawer / desktop pinned) ---------- */
function stakeGet(){ const v=parseFloat(localStorage.getItem('oddlines.stake')); return (isFinite(v)&&v>0)?v:10; }
function stakeSet(v){ localStorage.setItem('oddlines.stake', String(v)); }

OD.mountSlipRail = function(){
  if(document.getElementById('slipRail')) return;
  const I=OD.icons, t=OD.t;
  const bd=document.createElement('div'); bd.id='slipBackdrop'; bd.onclick=()=>OD.toggleSlipRail(false);
  const r=document.createElement('aside'); r.id='slipRail'; r.setAttribute('aria-label', t('betslip'));
  r.innerHTML=`
    <div class="rail-head">
      <span class="rail-ico">${I.slip}</span>
      <b>${t('betslip')}</b>
      <span class="rail-count" id="railCount">0</span>
      <button class="rail-x" id="railClose" aria-label="Close">${I.x}</button>
    </div>
    <div class="rail-body" id="railBody"></div>
    <div class="rail-foot" id="railFoot"></div>`;
  document.body.appendChild(bd);
  document.body.appendChild(r);
  r.querySelector('#railClose').onclick=()=>OD.toggleSlipRail(false);
  renderSlipRail();
};

OD.toggleSlipRail = function(force){
  const open = (typeof force==='boolean') ? force : !document.documentElement.classList.contains('slip-open');
  document.documentElement.classList.toggle('slip-open', open);
};

function renderSlipRail(){
  const r=document.getElementById('slipRail'); if(!r) return;
  const I=OD.icons, t=OD.t, fmt=OD.get('odds');
  const ids=OD.get('slip');
  const body=r.querySelector('#railBody'), foot=r.querySelector('#railFoot');
  const cnt=r.querySelector('#railCount'); if(cnt) cnt.textContent=ids.length;
  if(!ids.length){
    body.innerHTML=`<div class="rail-empty"><span class="re-ico">${I.slip}</span><p>${t('slip_empty')}</p><span class="re-hint">${t('slip_hint')}</span><a href="odds.html">${t('oddsboard')} ${I.arrow}</a></div>`;
    foot.innerHTML='';
    return;
  }
  let combined=1;
  body.innerHTML = ids.map(id=>{
    const s=OD.resolveSlip(id); if(!s) return '';
    combined *= s.odds;
    return `<div class="rail-item">
      <button class="ri-x" onclick="OD.toggleSlip('${id}')" aria-label="Remove">${I.x}</button>
      <div class="ri-main"><div class="ri-team">${s.team}</div>
        <div class="ri-meta">${s.ev.home.abbr} v ${s.ev.away.abbr} · ${s.ev.league}</div></div>
      <span class="ri-odd">${OD.fmtOdds(s.odds,fmt)}</span></div>`;
  }).join('');
  const stake=stakeGet();
  const ret=(stake*combined);
  const isParlay = ids.length>1;
  foot.innerHTML=`
    <div class="rf-row"><span>${ids.length} ${t('selections')}</span><span class="rf-comb">${isParlay?t('combined')+' '+OD.fmtOdds(combined,fmt):''}</span></div>
    <label class="rf-stake"><span>${t('stake')}</span>
      <span class="rf-input"><i>$</i><input id="railStake" type="number" min="1" step="1" value="${stake}" inputmode="decimal"></span></label>
    <div class="rf-row rf-return"><span>${t('potential')}</span><b>$${ret.toFixed(2)}</b></div>
    <a class="btn btn-grad btn-block" href="bet-now.html">${t('continue_app')} ${I.arrow}</a>
    <button class="rf-clear" onclick="OD.set('slip',[]);OD.paintSlip();">${t('clear_slip')}</button>`;
  const si=foot.querySelector('#railStake');
  if(si) si.oninput=()=>{ const v=parseFloat(si.value); stakeSet(isFinite(v)&&v>0?v:0); const rr=r.querySelector('.rf-return b'); if(rr) rr.textContent='$'+(((isFinite(v)?v:0))*combined).toFixed(2); };
}
OD.renderSlipRail = renderSlipRail;

function initRail(){
  // header slip button: on tablet width, open drawer instead of navigating
  const b=document.getElementById('slipBtn');
  if(b) b.addEventListener('click', (e)=>{
    const w=window.innerWidth;
    if(w>=768 && w<1140){ e.preventDefault(); OD.toggleSlipRail(); }
  });
  // floating fab: same drawer behaviour on tablet
  const fab=document.getElementById('slipFab');
  if(fab) fab.addEventListener('click',(e)=>{
    const w=window.innerWidth;
    if(w>=768 && w<1140){ e.preventDefault(); OD.toggleSlipRail(); }
  });
}
OD.initRail = initRail;

/* ---------- accordion ---------- */
OD.initAccordions = function(root){
  (root||document).querySelectorAll('.acc-hd').forEach(h=>{
    h.onclick=()=>{ h.closest('.acc').classList.toggle('open'); };
  });
};

/* ---------- boot ---------- */
OD.boot = function(active){
  if(new URLSearchParams(location.search).has('embed')) document.documentElement.setAttribute('data-embed','1');
  document.documentElement.setAttribute('data-page', active||'');
  applyTheme();
  OD.mountHeader(active);
  OD.mountTabbar(active);
  OD.mountFooter();
  applyI18n();
  OD.initAccordions();
  if(OD.initTweaks) OD.initTweaks();
};
})();
