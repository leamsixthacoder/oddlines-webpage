/* ============================================================
   ODDLINES — Tweaks panel (vanilla, host-protocol wired)
   ============================================================ */
(function(){
let panel, available=false;

function gradCSS(a){ return `linear-gradient(100deg,${a[0]},${a[1]})`; }

function refresh(){
  OD.applyTheme();
  if(OD.render) OD.render();      // pages register a re-render hook
  OD.applyI18n();
  OD.paintSlip();
  syncControls();
}

function seg(label, key, opts){
  return `<div class="tw-row"><span class="tw-lbl">${label}</span>
    <div class="tw-seg" data-key="${key}">${opts.map(o=>`<button data-val="${o.v}">${o.t}</button>`).join('')}</div></div>`;
}

function build(){
  panel=document.createElement('div');
  panel.id='odTweaks';
  panel.innerHTML=`
   <div class="tw-head"><span>${OD.icons.sliders}</span><b>Tweaks</b><button class="tw-x" aria-label="Close">${OD.icons.x}</button></div>
   <div class="tw-body">
     ${seg(OD.get('lang')==='es'?'Tema':'Theme','theme',[{v:'dark',t:OD.get('lang')==='es'?'Oscuro':'Dark'},{v:'light',t:OD.get('lang')==='es'?'Claro':'Light'}])}
     <div class="tw-row"><span class="tw-lbl">${OD.get('lang')==='es'?'Acento':'Accent'}</span>
       <div class="tw-acc" data-key="accent">
         ${Object.entries(OD.accents).map(([k,a])=>`<button data-val="${k}" style="background:${gradCSS(a)}" aria-label="${k}"></button>`).join('')}
       </div></div>
     ${seg(OD.get('lang')==='es'?'Densidad':'Density','density',[{v:'compact',t:'S'},{v:'regular',t:'M'},{v:'comfy',t:'L'}])}
     ${seg(OD.get('lang')==='es'?'Esquinas':'Corners','radius',[{v:'sharp',t:OD.get('lang')==='es'?'Recto':'Sharp'},{v:'default',t:'Mid'},{v:'round',t:OD.get('lang')==='es'?'Suave':'Round'}])}
     ${seg(OD.get('lang')==='es'?'Títulos':'Headings','headstyle',[{v:'heavy',t:'Heavy'},{v:'bold',t:'Bold'}])}
     ${seg(OD.get('lang')==='es'?'Cuotas':'Odds','odds',[{v:'decimal',t:'1.85'},{v:'american',t:'+150'},{v:'fractional',t:'5/2'}])}
   </div>`;
  document.body.appendChild(panel);

  panel.querySelector('.tw-x').onclick=dismiss;
  panel.querySelectorAll('.tw-seg').forEach(g=>{
    g.querySelectorAll('button').forEach(b=>b.onclick=()=>{ OD.set(g.dataset.key,b.dataset.val); refresh(); });
  });
  panel.querySelector('.tw-acc').querySelectorAll('button').forEach(b=>b.onclick=()=>{ OD.set('accent',b.dataset.val); refresh(); });

  injectStyle();
  syncControls();
}

function syncControls(){
  if(!panel) return;
  panel.querySelectorAll('.tw-seg').forEach(g=>{
    const cur=OD.get(g.dataset.key);
    g.querySelectorAll('button').forEach(b=>b.classList.toggle('on', b.dataset.val===cur));
  });
  panel.querySelectorAll('.tw-acc button').forEach(b=>b.classList.toggle('on', b.dataset.val===OD.get('accent')));
}

function open(){ if(!panel) build(); panel.classList.add('show'); }
function close(){ if(panel) panel.classList.remove('show'); }
function dismiss(){ close(); window.parent.postMessage({type:'__edit_mode_dismissed'},'*'); }

OD.initTweaks=function(){
  // header gear (works even outside host)
  const g=document.getElementById('tweakOpen');
  if(g){ g.style.display='grid'; g.onclick=()=>{ if(panel&&panel.classList.contains('show'))close(); else open(); }; }
  window.addEventListener('message',e=>{
    const t=e&&e.data&&e.data.type;
    if(t==='__activate_edit_mode') open();
    else if(t==='__deactivate_edit_mode') close();
  });
  available=true;
  window.parent.postMessage({type:'__edit_mode_available'},'*');
};

function injectStyle(){
  if(document.getElementById('twStyle')) return;
  const s=document.createElement('style'); s.id='twStyle';
  s.textContent=`
  #odTweaks{position:fixed;right:14px;bottom:108px;z-index:200;width:268px;max-width:calc(100vw - 28px);
    background:var(--surface);border:1px solid var(--line-2);border-radius:18px;box-shadow:var(--shadow-lg);
    transform:translateY(14px) scale(.96);opacity:0;pointer-events:none;transition:.2s;font-family:var(--f-body);}
  #odTweaks.show{transform:none;opacity:1;pointer-events:auto;}
  #odTweaks .tw-head{display:flex;align-items:center;gap:8px;padding:13px 14px;border-bottom:1px solid var(--line);}
  #odTweaks .tw-head span{display:grid;place-items:center;color:var(--acc);}
  #odTweaks .tw-head span svg{width:17px;height:17px;}
  #odTweaks .tw-head b{font-family:var(--f-head);font-weight:700;font-size:14px;letter-spacing:.02em;}
  #odTweaks .tw-x{margin-left:auto;color:var(--text-3);display:grid;place-items:center;}
  #odTweaks .tw-x svg{width:16px;height:16px;}
  #odTweaks .tw-body{padding:6px 14px 15px;display:flex;flex-direction:column;}
  #odTweaks .tw-row{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 0;border-bottom:1px solid var(--line);}
  #odTweaks .tw-row:last-child{border-bottom:none;}
  #odTweaks .tw-lbl{font-size:12.5px;font-weight:600;color:var(--text-2);}
  #odTweaks .tw-seg{display:inline-flex;background:var(--surface-2);border:1px solid var(--line);border-radius:9px;padding:2px;gap:2px;}
  #odTweaks .tw-seg button{font-family:var(--f-head);font-weight:700;font-size:10.5px;padding:5px 8px;border-radius:7px;color:var(--text-3);min-width:24px;}
  #odTweaks .tw-seg button.on{background:var(--grad);color:#fff;}
  #odTweaks .tw-acc{display:flex;gap:7px;}
  #odTweaks .tw-acc button{width:24px;height:24px;border-radius:50%;border:2px solid transparent;}
  #odTweaks .tw-acc button.on{border-color:var(--text);box-shadow:0 0 0 2px var(--bg);}
  `;
  document.head.appendChild(s);
}
})();
