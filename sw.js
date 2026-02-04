// غيرنا الرقم من v10 الى v11 - هذا هو المفتاح!
const CACHE = 'igic-pwa-v11';

const ASSETS = [
  './',
  './index.html',
  './services.html',
  './calculator.html',
  './branches.html',
  './claims.html',
  './about.html',
  './contact.html',
  './styles.css',
  './app.js',
  './manifest.json',
  './assets/logo-ui.png',
  './assets/icon-192.png',
  './assets/icon-384.png',
  './assets/icon-512.png',
  './assets/diwan.jpg'  // ضفنا صورة الديوان حتى تتخزن
];

// التنصيب (تحميل الملفات الجديدة)
self.addEventListener('install', e => {
  self.skipWaiting(); // هذا السطر مهم: يخلي التحديث ينزل فوراً بدون انتظار
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

// التفعيل (مسح النسخ القديمة)
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.map(key => {
        // اذا الكاش مو هو الاصدار الجديد (11)، امسحه فوراً
        if (key !== CACHE) return caches.delete(key);
      }));
    }).then(() => self.clients.claim())
  );
});

// جلب الملفات (Network First Strategy للبيانات المهمة، Cache First للملفات الثابتة)
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => {
      // ارجع الملف من الكاش، واذا ماكو جيبه من النت وخزنه
      return r || fetch(e.request).then(resp => {
        const copy = resp.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return resp;
      }).catch(() => caches.match('./'));
    })
  );
});