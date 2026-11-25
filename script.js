const toggleButtons = document.querySelectorAll('.toggle-btn');
const homeView = document.getElementById('view-home');
const shieldView = document.getElementById('view-shield');

toggleButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-view');
    toggleButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    if (target === 'shield') {
      homeView.classList.remove('active');
      shieldView.classList.add('active');
    } else {
      shieldView.classList.remove('active');
      homeView.classList.add('active');
    }
  });
});

const verses = [
  {
    text: '"Flee from sexual immorality. All other sins a person commits are outside the body, but whoever sins sexually, sins against their own body."',
    ref: '— 1 Corinthians 6:18',
  },
  {
    text: '"I made a covenant with my eyes not to look lustfully at a young woman."',
    ref: '— Job 31:1',
  },
  {
    text: '"No temptation has overtaken you except what is common to mankind. And God is faithful; He will not let you be tempted beyond what you can bear."',
    ref: '— 1 Corinthians 10:13',
  },
  {
    text: '"Flee the evil desires of youth and pursue righteousness, faith, love and peace, along with those who call on the Lord out of a pure heart."',
    ref: '— 2 Timothy 2:22',
  },
  {
    text: '"Blessed are the pure in heart, for they will see God."',
    ref: '— Matthew 5:8',
  },
];

let verseIdx = 0;
const verseTextEl = document.getElementById('verse-text');
const verseRefEl = document.getElementById('verse-ref');
const nextVerseBtn = document.getElementById('next-verse-btn');

if (nextVerseBtn && verseTextEl && verseRefEl) {
  nextVerseBtn.addEventListener('click', () => {
    verseIdx = (verseIdx + 1) % verses.length;
    verseTextEl.textContent = verses[verseIdx].text;
    verseRefEl.textContent = verses[verseIdx].ref;
  });
}

// Keep the download button synced with the latest GitHub Release APK automatically
(async function syncLatestReleaseDownload() {
  const downloadBtn = document.querySelector('.hero-actions .btn-gold');
  if (!downloadBtn) return;
  try {
    const res = await fetch(
      'https://api.github.com/repos/paulfruitful/ScreenGuard/releases/latest',
      {headers: {Accept: 'application/vnd.github+json'}},
    );
    if (!res.ok) return;
    const release = await res.json();
    const tag = release?.tag_name;
    const apkAsset = Array.isArray(release?.assets)
      ? release.assets.find((a) => typeof a?.name === 'string' && a.name.endsWith('.apk'))
      : null;
    if (apkAsset?.browser_download_url) {
      downloadBtn.setAttribute('href', apkAsset.browser_download_url);
      if (tag) {
        downloadBtn.textContent = `Download Android (${tag})`;
      }
    }
  } catch (_) {
    // Keep the static fallback href in index.html if offline or rate-limited
  }
})();
