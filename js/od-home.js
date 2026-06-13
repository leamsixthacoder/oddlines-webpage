/* ============================================================
   ODDLINES — Home (bet-page) content
   Category rail · promos · boost cards · bet builder · sidebar
   Mock content for demo; swap with /api/v1 feeds in production.
   ============================================================ */
(function(){
const I=OD.icons, t=OD.t, fmt=()=>OD.get('odds');
const $=(id)=>document.getElementById(id);
const dec=(v)=>OD.fmtOdds(v, fmt());
const money=(n)=>'$'+n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});

/* ---------- category rail ---------- */
function renderCats(){
  const cats=[
    {icon:'trophy',l:'World Cup',href:'sports.html#soccer'},
    {icon:'soccer',l:t('sport_soccer'),href:'sports.html#soccer'},
    {icon:'basketball',l:t('sport_basketball'),href:'sports.html#basketball'},
    {icon:'tennis',l:t('sport_tennis'),href:'sports.html#tennis'},
    {icon:'football',l:t('sport_football'),href:'sports.html#football'},
    {icon:'baseball',l:t('sport_baseball'),href:'sports.html#baseball'},
    {icon:'mma',l:t('sport_mma'),href:'sports.html#mma'},
    {icon:'f1',l:'Formula 1',href:'sports.html'},
    {icon:'casino',l:t('casino'),href:'bet-now.html'},
    {icon:'esports',l:'Esports',href:'sports.html'},
    {icon:'odds',l:t('in_play'),href:'odds.html'},
  ];
  $('catRail').innerHTML=cats.map(c=>`<a class="cat" href="${c.href}"><span class="ci">${I[c.icon]}</span><span>${c.l}</span></a>`).join('');
}

/* ---------- promos ---------- */
function renderPromos(){
  const promos=[
    {ico:'rocket',e:'promo_eyebrow',h:'promo1_t',c:'promo1_c'},
    {ico:'trophy',e:'promo2_eyebrow',h:'promo2_t',c:'promo2_c'},
    {ico:'star',e:'promo3_eyebrow',h:'promo3_t',c:'promo3_c'},
  ];
  $('promoRow').innerHTML=promos.map(p=>`<a class="promo" href="bet-now.html">
    <div class="promo-bg"></div><div class="promo-tint"></div><div class="promo-glow"></div>
    <span class="ph-ico">${I[p.ico]}</span>
    <div class="promo-in">
      <span class="pe">${t(p.e)}</span>
      <h3>${t(p.h)}</h3>
      <span class="pc">${t(p.c)}</span>
    </div>
  </a>`).join('');
}

/* ---------- filter chips ---------- */
function renderChips(){
  const chips=['World Cup 2026',t('in_play'),'NBA Finals','MLB',t('sport_soccer'),'UFC'];
  $('chipRow').innerHTML=chips.map((c,i)=>`<a class="chip ${i===0?'on':''}" href="#g${i<4?Math.min(i,2):''}">${c}</a>`).join('');
}

/* ---------- boost cards ---------- */
const C={rma:'#0a3d8f',bar:'#a50044',bra:'#f7d117',swi:'#d52b1e',mor:'#006233',sco:'#0b4ea2',hai:'#00209f',aus:'#00843d',
  nyk:'#1d428a',sas:'#000000',bos:'#007a33',den:'#0e2240',lal:'#552583',gsw:'#1d428a',
  lad:'#005a9c',nyy:'#0c2340',pit:'#fdb827',bal:'#df4601',ana:'#ba0021'};
function bdot(ab,color){return `<span class="bdot" style="background:${color}">${ab}</span>`;}
function leg(ab,color,name,mkt){return `<div class="bleg">${bdot(ab,color)}<span class="blt"><b>${name}</b> ${mkt}</span></div>`;}

const groups=[
  {id:'g0',ico:'soccer',name:'Group Stage',cards:[
    {t:'GOALS GALORE',m:'Anytime Scorer',legs:[leg('BRA',C.bra,'Vinícius Jr.','to score'),leg('SWI',C.swi,'Embolo','to score'),leg('MOR',C.mor,'En-Nesyri','to score')],more:0,boost:'super',fire:'2.8k',old:1.95,neu:3.00,ret:30},
    {t:'TOURNAMENT FAVS',m:'Full Time Result',ep:true,legs:[leg('SWI',C.swi,'Switzerland','(v Qatar)'),leg('BRA',C.bra,'Brazil','(v Morocco)'),leg('SCO',C.sco,'Scotland','(v Haiti)'),leg('AUS',C.aus,'Australia','win')],more:0,boost:'acca',acca:'+7.5%',fire:'32.8k',neu:5.16,ret:51.60},
    {t:'UNDERDOG DOUBLE',m:'Double Chance',legs:[leg('SWI',C.swi,'Qatar/Draw','(v Switzerland)'),leg('MOR',C.mor,'Draw/Morocco','(v Brazil)'),leg('HAI',C.hai,'Haiti/Draw','(v Scotland)')],more:0,boost:'bet',fire:'5.6k',old:47.50,neu:60.11,ret:601.17},
    {t:'MAIN MEN ON TARGET',m:'Player Shots on Target',legs:[leg('SWI',C.swi,'Amdouni','Over 1.5'),leg('BRA',C.bra,'Vinícius Jr.','Over 1.5'),leg('SCO',C.sco,'McTominay','Over 1.5')],more:0,boost:'bet',fire:'2.9k',old:12.50,neu:14.47,ret:144.70},
  ]},
  {id:'g1',ico:'basketball',name:'NBA Finals — Game 5',cards:[
    {t:'SERIES CLINCHER',m:'Match Result & Points',legs:[leg('LAL',C.lal,'Match Result','Lakers'),leg('LAL',C.lal,'James','25+ Points'),leg('LAL',C.lal,'Davis','20+ Points')],more:2,boost:'bet',fire:'2.1k',old:16.00,neu:17.00,ret:170},
    {t:'ROAD WARRIORS',m:'Match Result',legs:[leg('BOS',C.bos,'Match Result','Celtics'),leg('BOS',C.bos,'Tatum','25+ Points'),leg('BOS',C.bos,'Brown','25+ Points')],more:0,boost:'bet',fire:'1.9k',old:16.00,neu:17.00,ret:170},
    {t:'STAR SCORERS',m:'30+ Points',legs:[leg('LAL',C.lal,'James','30+ Points'),leg('BOS',C.bos,'Tatum','30+ Points')],more:0,boost:'bet',fire:'887',old:4.60,neu:5.50,ret:55},
    {t:'TRIPLE THREAT',m:'Three-Pointers',legs:[leg('BOS',C.bos,'White','4+ Threes'),leg('BOS',C.bos,'Brown','3+ Threes'),leg('LAL',C.lal,'Russell','2+ Threes'),leg('LAL',C.lal,'Reaves','1+ Threes')],more:0,boost:'bet',fire:'877',old:13.50,neu:15.00,ret:150},
  ]},
  {id:'g2',ico:'baseball',name:'MLB',cards:[
    {t:'EVERYBODY HITS!',m:'Hits',legs:[leg('LAD',C.lad,'Betts','1+ Hits'),leg('LAD',C.lad,'Freeman','1+ Hits'),leg('NYY',C.nyy,'Judge','1+ Hits')],more:9,boost:'bet',fire:'380',old:32.56,neu:46.26,ret:462.63},
    {t:'STRIKEOUT KINGS',m:'Pitcher Strikeouts',legs:[leg('LAD',C.lad,'Glasnow','6+ Ks'),leg('NYY',C.nyy,'Cole','6+ Ks'),leg('BAL',C.bal,'Burnes','6+ Ks')],more:3,boost:'bet',fire:'260',old:49.50,neu:62.43,ret:624.39},
    {t:'GOING DEEP',m:'Home Runs',legs:[leg('NYY',C.nyy,'Judge','1+ HR'),leg('LAD',C.lad,'Ohtani','1+ HR'),leg('ANA',C.ana,'Trout','1+ HR')],more:7,boost:'bet',fire:'359',old:52.55,neu:66.93,ret:669.37},
    {t:'MIGHTY MONEYLINE',m:'Money Line',ep:true,legs:[leg('NYY',C.nyy,'NY Yankees','win'),leg('PIT',C.pit,'PIT Pirates','win'),leg('BAL',C.bal,'BAL Orioles','win')],more:7,boost:'acca',acca:'+30%',fire:'662',neu:204.73,ret:2658.58},
  ]},
];

function boostCard(c){
  const label = c.boost==='super' ? `<span class="bb-label sup">${I.fire}${t('super_boost')}</span>`
    : c.boost==='acca' ? `<span class="bb-label">${c.acca} ACCA</span>`
    : `<span class="bb-label">${I.zap}${t('bet_boost')}</span>`;
  const more = c.more ? `<a class="bcard-more" href="bet-now.html">${I.chevron} ${t('view_all')} ${c.more} ${t('view_more_legs')}</a>` : '';
  const oddLine = `<div class="bo-line">${c.old?`<span class="bo-old">${dec(c.old)}</span><span class="bo-arrow">»</span>`:''}<span class="bo-new">${dec(c.neu)}</span></div>`;
  return `<a class="bcard" href="bet-now.html">
    <div class="bcard-t">${c.t}</div>
    <div class="bcard-m"><span>${c.m}</span>${c.ep?`<span class="ep">${t('early_payout')}</span>`:''}</div>
    <div class="bcard-legs">${c.legs.join('')}</div>
    ${more}
    <div class="bcard-foot">
      <div class="bcard-boost">${label}<span class="bb-fire">${I.fire}${c.fire}</span></div>
      <div class="bcard-odds">${oddLine}<div class="bo-ret">$10 ${t('returns')} ${money(c.ret)}</div></div>
    </div>
  </a>`;
}

function renderBoosts(){
  $('boostWrap').innerHTML = groups.map(g=>`<section class="boost-group" id="${g.id}">
    <div class="bg-hd"><span class="bg-ico">${I[g.ico]}</span><h2>${g.name}</h2><a class="bg-all" href="odds.html">${t('view_all')}</a></div>
    <div class="boost-cards">${g.cards.map(boostCard).join('')}</div>
  </section>`).join('');
}

/* ---------- bet builder ---------- */
const players=[
  {n:'LeBron James',num:23,col:C.lal,ab:'LAL',last:[28,31,26,29,24]},
  {n:'Jayson Tatum',num:0,col:C.bos,ab:'BOS',last:[33,27,30,22,35]},
  {n:'Anthony Davis',num:3,col:C.lal,ab:'LAL',last:[24,19,28,31,26]},
  {n:'Jaylen Brown',num:7,col:C.bos,ab:'BOS',last:[22,26,18,24,29]},
  {n:'Derrick White',num:9,col:C.bos,ab:'BOS',last:[16,12,21,14,18]},
  {n:'Austin Reaves',num:15,col:C.lal,ab:'LAL',last:[15,18,11,20,13]},
];
const markets={
  Points:{lines:[15,20,25,30,35],base:[1.18,1.55,2.45,4.40,8.80]},
  Assists:{lines:[2,4,6,8,10],base:[1.20,1.62,2.70,5.50,11.0]},
  Rebounds:{lines:[4,6,8,10,12],base:[1.22,1.70,2.95,6.00,12.5]},
  Threes:{lines:[1,2,3,4,5],base:[1.15,1.58,2.85,5.80,11.5]},
};
const pFactor=[1.0,0.96,1.08,1.05,1.22,1.30];
function builderRows(mk){
  const m=markets[mk];
  const head=`<div class="brow head"><div class="bhcell lead">Player / Last 5</div>${m.lines.map(l=>`<div class="bhcell">${l}+</div>`).join('')}</div>`;
  const rows=players.map((p,i)=>{
    const cells=m.lines.map((l,j)=>{
      let o=1+(m.base[j]-1)*pFactor[i];
      o=Math.max(1.04, Math.round(o*100)/100);
      return `<div class="bcell"><span class="bc-line">${l}+</span><span class="bc-odd">${dec(o)}</span></div>`;
    }).join('');
    return `<div class="brow">
      <div class="bplayer"><span class="bp-num" style="background:${p.col}">${p.num}</span>
        <div><div class="bp-name">${p.n}</div><div class="bp-last">${p.last.map((x,k)=>k===4?`<b>${x}</b>`:x).join(' ')}</div></div></div>
      ${cells}</div>`;
  }).join('');
  return head+rows;
}
function renderBuilder(){
  const tabs=Object.keys(markets);
  $('builder').innerHTML=`
    <div class="builder-hd"><span class="bh-t">Bet Builder<span>+</span></span>
      <a class="bh-link" href="bet-now.html">${t('player_markets')} ${I.arrow}</a></div>
    <div class="builder-match"><div class="bm-teams">LA Lakers <span class="vs">@</span> Boston Celtics</div>
      <div class="bm-meta">${t('builder_lead')} · NBA Sat 20:30</div></div>
    <div class="builder-tabs" id="builderTabs">${tabs.map((tb,i)=>`<button class="bt-tab ${i===0?'on':''}" data-mk="${tb}">${tb}</button>`).join('')}</div>
    <div class="btable-wrap"><div class="btable" id="builderTable">${builderRows('Points')}</div></div>
    <a class="builder-foot" href="bet-now.html">${t('show_more')} ${I.chevron}</a>`;
  const tabsEl=$('builderTabs');
  tabsEl.querySelectorAll('.bt-tab').forEach(b=>b.onclick=()=>{
    tabsEl.querySelectorAll('.bt-tab').forEach(x=>x.classList.remove('on'));
    b.classList.add('on');
    $('builderTable').innerHTML=builderRows(b.dataset.mk);
  });
}

/* ---------- content sidebar ---------- */
function renderSidebar(){
  const evs=OD.allEvents();
  const trending=[...evs.filter(e=>e.live), ...evs.filter(e=>!e.live&&e.big)].slice(0,6);
  const trendHtml=trending.map(e=>`<a class="side-link ${e.live?'is-live':''}" href="odds.html#${e.sport}">
    <span class="sl-ico">${I[e.icon]}</span><span>${e.home.abbr} v ${e.away.abbr}</span>
    ${e.live?`<span class="sl-live live"><span class="pulse"></span></span>`:''}</a>`).join('');

  const most=[{ic:'basketball',l:t('sport_basketball'),h:'sports.html#basketball'},
    {ic:'soccer',l:t('sport_soccer'),h:'sports.html#soccer'},
    {ic:'odds',l:t('in_play'),h:'odds.html'}];
  const mostHtml=most.map(s=>`<a class="side-link" href="${s.h}"><span class="sl-ico">${I[s.ic]}</span><span>${s.l}</span></a>`).join('');

  const az=OD.sports.map(s=>({key:s.key,icon:s.icon,name:t('sport_'+s.key)})).sort((a,b)=>a.name.localeCompare(b.name));
  const azHtml=az.map(s=>`<a class="side-link" href="sports.html#${s.key}"><span class="sl-ico">${I[s.icon]}</span><span>${s.name}</span></a>`).join('');

  $('homeSide').innerHTML=`
    <div class="side-sec"><h3>${t('trending')}</h3>${trendHtml}</div>
    <div class="side-sec"><h3>${t('most_used')}</h3>${mostHtml}</div>
    <div class="side-sec"><h3>${t('az')}</h3>${azHtml}</div>
    <a class="side-cta" href="bet-now.html"><span class="sc-ico">${I.bolt}</span><span><b>${t('nav_bet')}</b><span>${t('bet_step2')}</span></span></a>`;
}

OD.renderHome=function(){
  $('searchIco').innerHTML=I.search;
  renderCats();
  renderPromos();
  renderChips();
  renderBoosts();
  renderBuilder();
  renderSidebar();
};
})();
