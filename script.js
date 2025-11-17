// پخش iframe
const iframe = document.getElementById('player');
iframe.src = window.AZURA_EMBED_URL;

// نصب PWA
let deferredPrompt;
const installRow = document.getElementById('installRow');
const iosInstructions = document.getElementById('iosInstructions');
const btnInstall = document.getElementById('btnInstall');

const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

if (isIOS && isSafari) {
  setTimeout(() => iosInstructions.hidden = false, 1500);
} else {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installRow.hidden = false;
  });

  btnInstall.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') installRow.hidden = true;
    deferredPrompt = null;
  });
}

// چک PWA نصب شده (از Radio Universal)
const isPwaInstalled = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
if (isPwaInstalled) {
  // اگر نصب شده، دکمه‌ها رو پنهان کن اگر لازم
}

// SW ثبت
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW error:', err));
  });
}
