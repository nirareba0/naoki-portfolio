(() => {
  'use strict';
  const ribbon = document.querySelector('.project-ribbon');
  const ribbonButton = document.getElementById('ribbon-toggle');
  ribbonButton?.addEventListener('click', () => {
    const paused = ribbon.classList.toggle('is-paused');
    ribbonButton.setAttribute('aria-pressed', String(paused));
    ribbonButton.textContent = paused ? '動きを再開する ▷' : '動きを止める Ⅱ';
  });
  const video = document.getElementById('ember-video');
  const button = document.getElementById('motion-toggle');
  let paused = false;
  button?.addEventListener('click', () => {
    paused = !paused;
    document.body.classList.toggle('is-motion-paused', paused);
    button.setAttribute('aria-pressed', String(paused));
    button.textContent = paused ? '背景の動きを再開する ▷' : '背景の動きを止める Ⅱ';
    if (paused) video?.pause(); else video?.play().catch(() => {});
  });
  video?.addEventListener('play', () => { if (paused) video.pause(); });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) video?.pause();
    else if (!paused && !matchMedia('(prefers-reduced-motion: reduce)').matches && video && !video.hidden) video.play().catch(() => {});
  });
  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', e => {
    if (e.matches) { video?.pause(); document.getElementById('shift-video')?.pause(); document.getElementById('fund-intro')?.pause(); }
  });
  const fundVideo = document.getElementById('fund-intro');
  const fundReplay = document.getElementById('fund-replay');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (fundVideo && !reduceMotion && 'IntersectionObserver' in window) {
    const fundObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        fundVideo.currentTime = 0;
        fundVideo.play().catch(() => {});
        fundObserver.disconnect();
      }
    }, { threshold: .55 });
    fundObserver.observe(fundVideo);
  }
  fundReplay?.addEventListener('click', () => {
    fundVideo.currentTime = 0;
    fundVideo.play().catch(() => {});
  });
})();
