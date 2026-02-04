
if ('serviceWorker' in navigator){ window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js')); }
let deferredPrompt=null;
window.addEventListener('beforeinstallprompt',(e)=>{ e.preventDefault(); deferredPrompt=e; const b=document.getElementById('installBtn'); if(b){ b.innerText='تثبيت التطبيق'; b.dataset.ready='1'; } });
function triggerInstall(){ if (deferredPrompt){ deferredPrompt.prompt(); deferredPrompt.userChoice.finally(()=>{ deferredPrompt=null; }); } else { alert('من فضلك استخدم خيار «إضافة إلى الشاشة الرئيسية» من قائمة المتصفح.'); } }

// Calculator logic
const RATES = {
  "خصوصي_4": {risk: 2.975, liability: 0.525, terror: 1.2},
  "خصوصي_6": {risk: 3.1875, liability: 0.5625, terror: 1.4},
  "خصوصي_8": {risk: 3.4, liability: 0.6, terror: 1.6},
  "اجرة_4":   {risk: 3.6125, liability: 0.6375, terror: 1.6},
  "اجرة_6":   {risk: 4.675, liability: 0.825, terror: 1.8},
  "اجرة_8":   {risk: 5.525, liability: 0.975, terror: 2.0},
  "حمل_خاص":  {risk: 3.2, liability: 0.8, terror: 1.7},
  "حمل_عام":  {risk: 4.0, liability: 1.0, terror: 2.0},
  "باص_7_12": {risk: 5.2, liability: 1.3, terror: 2.2},
  "باص_12_24":{risk: 5.6, liability: 1.4, terror: 2.4},
  "باص_25plus":{risk: 6.0, liability: 1.5, terror: 2.5}
};
function formatIQD(n){ return new Intl.NumberFormat('ar-IQ',{maximumFractionDigits:0}).format(n)+' دينار'; }
function calcPremium(price, cat, includeTerror){
  const r=RATES[cat]; if(!r) return {base:0,terror:0,total:0};
  const base=(price*(r.risk/100)) + (price*(r.liability/100));
  const t=includeTerror ? ((price/2)*(r.terror/100)) : 0;
  return {base, terror:t, total: Math.round(base+t)};
}
