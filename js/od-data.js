/* ============================================================
   ODDLINES — Data + i18n
   ------------------------------------------------------------
   API INTEGRATION (replace mock OD.sports with live fetch):

   GET /api/v1/sports
     -> [{ key, name:{en,es}, icon, eventCount }]
   GET /api/v1/sports/{sportKey}/leagues
     -> [{ key, name, region, eventCount }]
   GET /api/v1/leagues/{leagueKey}/events?status=upcoming|live
     -> [{ id, start (ISO 8601), status, minute, score:[h,a],
           home:{name,abbr,color}, away:{name,abbr,color},
           markets:{ moneyline:[h,draw,a], total:{line,over,under} },
           trend:[ '+'|'-'|'' per moneyline selection ] }]
     NOTE: all odds returned as DECIMAL; client converts format.
   ============================================================ */
window.OD = window.OD || {};

/* ---------- i18n ---------- */
OD.i18n = {
  en:{
    nav_home:"Home", nav_sports:"Sports", nav_odds:"Odds", nav_bet:"Bet Now", nav_help:"Help", nav_about:"About",
    balance:"Balance", live:"LIVE", upcoming:"Upcoming", featured:"Featured", seeall:"See all",
    boost:"Odds Boost", quicklinks:"Quick links", popular:"Popular sports", today:"Today",
    matchday:"Matchday", win:"Win", draw:"Draw", over:"Over", under:"Under", more:"more markets",
    place_app:"Open in app", betslip:"Bet Slip", events:"events", leagues:"leagues",
    hero_t:"Sharper lines\nSmarter bets", hero_s:"Live odds across every major league — built for your phone, settled in the app.",
    h_explore:"Explore sports", h_featured:"Match of the day", h_value:"Why Oddlines",
    v1t:"Best-price odds", v1d:"We surface the sharpest line across the market on every event.",
    v2t:"Instant settlement", v2d:"Bets confirm and pay out in the app the moment a market closes.",
    v3t:"Fully licensed", v3d:"Regulated operations and bank-grade security on every transaction.",
    allsports:"All Sports", oddsboard:"Odds Board", filter_all:"All", filter_live:"Live", filter_today:"Today",
    bet_t:"Heading to the\nOddlines app", bet_s:"Browsing odds happens here. Placing real bets happens in our licensed mobile app, where your wallet and bets are secured.",
    bet_cta:"Continue to the app", bet_alt:"Get the app", bet_note:"You'll be redirected to an external, licensed betting application.",
    bet_step1:"Pick your market on the web", bet_step2:"Tap Bet Now to open the app", bet_step3:"Confirm & track in real time",
    help_t:"Help Center", help_s:"Answers, guides and a direct line to our team.",
    howto:"How it works", faq:"Frequently asked", contact:"Contact us",
    c_name:"Full name", c_email:"Email", c_msg:"How can we help?", c_send:"Send message", c_sent:"Thanks — we'll reply within 24h.",
    about_t:"Built by people who\nactually watch the game", about_s:"Oddlines is an independent odds platform connecting fans to the sharpest lines across world sport.",
    stat1:"markets daily", stat2:"sports covered", stat3:"avg. settle time", stat4:"licensed markets",
    mission_t:"Our mission", mission_d:"To make sports betting transparent, fast and fair — giving every fan the same quality of information the pros rely on.",
    values:"What we stand for", team:"Leadership", responsible:"Responsible play",
    resp_d:"Betting should stay fun. Set limits, take breaks, and reach out if it stops being a game. Help is always one tap away.",
    addslip:"Add to slip", inslip:"In slip", odds_fmt:"Odds", lang:"Language",
    sport_soccer:"Soccer", sport_basketball:"Basketball", sport_football:"Am. Football",
    sport_tennis:"Tennis", sport_baseball:"Baseball", sport_mma:"MMA",
  },
  es:{
    nav_home:"Inicio", nav_sports:"Deportes", nav_odds:"Cuotas", nav_bet:"Apostar", nav_help:"Ayuda", nav_about:"Nosotros",
    balance:"Saldo", live:"EN VIVO", upcoming:"Próximos", featured:"Destacado", seeall:"Ver todo",
    boost:"Cuota Mejorada", quicklinks:"Accesos", popular:"Deportes populares", today:"Hoy",
    matchday:"Jornada", win:"Gana", draw:"Empate", over:"Más", under:"Menos", more:"mercados más",
    place_app:"Abrir en app", betslip:"Boleto", events:"eventos", leagues:"ligas",
    hero_t:"Líneas más\nafiladas", hero_s:"Cuotas en vivo de cada liga importante — pensado para tu móvil, liquidado en la app.",
    h_explore:"Explora deportes", h_featured:"Partido del día", h_value:"Por qué Oddlines",
    v1t:"Mejores cuotas", v1d:"Mostramos la línea más afilada del mercado en cada evento.",
    v2t:"Liquidación al instante", v2d:"Las apuestas se confirman y pagan en la app al cerrar el mercado.",
    v3t:"Totalmente licenciado", v3d:"Operación regulada y seguridad de nivel bancario en cada transacción.",
    allsports:"Todos los Deportes", oddsboard:"Tablero de Cuotas", filter_all:"Todo", filter_live:"En vivo", filter_today:"Hoy",
    bet_t:"Vas a la\napp de Oddlines", bet_s:"Ver cuotas ocurre aquí. Apostar de verdad ocurre en nuestra app móvil licenciada, donde tu billetera y apuestas están protegidas.",
    bet_cta:"Continuar a la app", bet_alt:"Descargar app", bet_note:"Serás redirigido a una aplicación de apuestas externa y licenciada.",
    bet_step1:"Elige tu mercado en la web", bet_step2:"Toca Apostar para abrir la app", bet_step3:"Confirma y sigue en tiempo real",
    help_t:"Centro de Ayuda", help_s:"Respuestas, guías y línea directa con nuestro equipo.",
    howto:"Cómo funciona", faq:"Preguntas frecuentes", contact:"Contáctanos",
    c_name:"Nombre completo", c_email:"Correo", c_msg:"¿Cómo podemos ayudarte?", c_send:"Enviar mensaje", c_sent:"¡Gracias! Respondemos en 24h.",
    about_t:"Hecho por gente que\nsí ve el partido", about_s:"Oddlines es una plataforma de cuotas independiente que conecta a los fans con las mejores líneas del deporte mundial.",
    stat1:"mercados al día", stat2:"deportes cubiertos", stat3:"liquidación prom.", stat4:"mercados licenciados",
    mission_t:"Nuestra misión", mission_d:"Hacer las apuestas transparentes, rápidas y justas — dando a cada fan la misma calidad de información que usan los profesionales.",
    values:"Lo que defendemos", team:"Liderazgo", responsible:"Juego responsable",
    resp_d:"Apostar debe ser divertido. Pon límites, toma pausas y contáctanos si deja de ser un juego. La ayuda está a un toque.",
    addslip:"Añadir al boleto", inslip:"En boleto", odds_fmt:"Cuotas", lang:"Idioma",
    sport_soccer:"Fútbol", sport_basketball:"Baloncesto", sport_football:"F. Americano",
    sport_tennis:"Tenis", sport_baseball:"Béisbol", sport_mma:"MMA",
  }
};

/* ---------- helpers: build an event ---------- */
function ev(id, league, region, home, away, mins, opts){
  opts = opts || {};
  return {
    id, league, region,
    home, away,
    start: opts.start || null,
    live: !!opts.live, minute: opts.minute||null, score: opts.score||null,
    markets: opts.markets,
    trend: opts.trend || ['','',''],
    big: opts.big || false
  };
}
const T = (n,a,c)=>({name:n,abbr:a,color:c});

/* ---------- mock catalogue ---------- */
OD.sports = [
  { key:'soccer', icon:'soccer', leagues:[
    { key:'laliga', name:'LaLiga', region:'ES', events:[
      ev('s1','LaLiga','ES', T('Real Madrid','RMA','#0a3d8f'), T('Barcelona','BAR','#a50044'), 90,
        {live:true,minute:67,score:[2,1],markets:{moneyline:[1.95,3.60,3.80]},trend:['+','','-'],big:true}),
      ev('s2','LaLiga','ES', T('Atlético','ATM','#c8102e'), T('Sevilla','SEV','#d81e25'), 90,
        {start:'2026-06-01T19:00:00',markets:{moneyline:[1.72,3.55,4.80]},trend:['','','+']}),
    ]},
    { key:'epl', name:'Premier League', region:'EN', events:[
      ev('s3','Premier League','EN', T('Arsenal','ARS','#ef0107'), T('Man City','MCI','#6cabdd'), 90,
        {start:'2026-06-01T16:30:00',markets:{moneyline:[2.55,3.40,2.60]},trend:['-','','+']}),
      ev('s4','Premier League','EN', T('Liverpool','LIV','#c8102e'), T('Chelsea','CHE','#034694'), 90,
        {start:'2026-06-02T14:00:00',markets:{moneyline:[2.10,3.50,3.20]},trend:['','+','']}),
    ]},
    { key:'ligamx', name:'Liga MX', region:'MX', events:[
      ev('s5','Liga MX','MX', T('América','AME','#ffd100'), T('Chivas','GDL','#c8102e'), 90,
        {live:true,minute:34,score:[1,1],markets:{moneyline:[2.05,3.10,3.60]},trend:['+','-','']}),
    ]},
  ]},
  { key:'basketball', icon:'basketball', leagues:[
    { key:'nba', name:'NBA', region:'US', events:[
      ev('b1','NBA','US', T('Lakers','LAL','#552583'), T('Celtics','BOS','#007a33'), 0,
        {live:true,minute:'Q3 4:12',score:[78,81],markets:{moneyline:[2.30,0,1.62]},trend:['-','','+'],big:true}),
      ev('b2','NBA','US', T('Warriors','GSW','#1d428a'), T('Nuggets','DEN','#0e2240'), 0,
        {start:'2026-06-01T23:00:00',markets:{moneyline:[1.88,0,1.92]},trend:['','','']}),
    ]},
  ]},
  { key:'football', icon:'football', leagues:[
    { key:'nfl', name:'NFL', region:'US', events:[
      ev('f1','NFL','US', T('Chiefs','KC','#e31837'), T('49ers','SF','#aa0000'), 0,
        {start:'2026-06-02T18:00:00',markets:{moneyline:[1.74,0,2.08]},trend:['+','','-'],big:true}),
      ev('f2','NFL','US', T('Eagles','PHI','#004c54'), T('Cowboys','DAL','#041e42'), 0,
        {start:'2026-06-02T21:30:00',markets:{moneyline:[2.20,0,1.70]},trend:['','','']}),
    ]},
  ]},
  { key:'tennis', icon:'tennis', leagues:[
    { key:'atp', name:'ATP Tour', region:'INT', events:[
      ev('t1','ATP Tour','INT', T('Alcaraz','ALC','#1a936f'), T('Sinner','SIN','#e8743b'), 0,
        {live:true,minute:'Set 2',score:[1,0],markets:{moneyline:[1.66,0,2.25]},trend:['+','','-'],big:true}),
      ev('t2','ATP Tour','INT', T('Djokovic','DJO','#0b4c8c'), T('Zverev','ZVE','#444'), 0,
        {start:'2026-06-01T12:00:00',markets:{moneyline:[1.50,0,2.62]},trend:['','','']}),
    ]},
  ]},
  { key:'baseball', icon:'baseball', leagues:[
    { key:'mlb', name:'MLB', region:'US', events:[
      ev('y1','MLB','US', T('Dodgers','LAD','#005a9c'), T('Yankees','NYY','#0c2340'), 0,
        {start:'2026-06-01T20:00:00',markets:{moneyline:[1.80,0,2.00]},trend:['','','']}),
    ]},
  ]},
  { key:'mma', icon:'mma', leagues:[
    { key:'ufc', name:'UFC', region:'INT', events:[
      ev('m1','UFC 312','INT', T('Makhachev','MAK','#b9985a'), T('Oliveira','OLI','#1f8a4c'), 0,
        {start:'2026-06-07T03:00:00',markets:{moneyline:[1.45,0,2.75]},trend:['+','','-'],big:true}),
    ]},
  ]},
];

/* ---------- odds formatting ---------- */
OD.fmtOdds = function(dec, fmt){
  if(!dec || dec<=1) return '—';
  if(fmt==='american'){
    const a = dec>=2 ? Math.round((dec-1)*100) : Math.round(-100/(dec-1));
    return (a>0?'+':'')+a;
  }
  if(fmt==='fractional'){
    let n=(dec-1), best=[Math.round(n),1], err=1e9;
    for(let d=1;d<=20;d++){const num=Math.round(n*d); const e=Math.abs(n-num/d); if(e<err){err=e;best=[num,d];}}
    const g=(a,b)=>b?g(b,a%b):a; const gg=g(best[0],best[1])||1;
    return (best[0]/gg)+'/'+(best[1]/gg);
  }
  return dec.toFixed(2); // decimal
};
