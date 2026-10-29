// Keep phone/tablet text emoji-free without changing saved copy or SVG icons.
(() => {
  const mobile = matchMedia('(max-width: 1023px)');
  const segments = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
  const emoji = /[\p{Extended_Pictographic}\p{Regional_Indicator}\u20e3]/u;
  const textSymbols = /^[©®™]\ufe0e?$/u;
  const ignored = 'script, style, noscript, textarea, [contenteditable="true"]';
  const originals = new Map();
  const strip = (text) => [...segments.segment(text)].map(({ segment }) =>
    emoji.test(segment) && !textSymbols.test(segment) ? '' : segment
  ).join('');

  function scan() {
    if (!mobile.matches) {
      for (const [node, entry] of originals) {
        if (node.isConnected && node.data === entry.cleaned) node.data = entry.original;
      }
      originals.clear();
      return;
    }
    for (const node of originals.keys()) if (!node.isConnected) originals.delete(node);
    const walker = document.createTreeWalker(document.body || document.documentElement, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (node.parentElement?.closest(ignored)) continue;
      let cleaned = strip(node.data);
      const button = node.parentElement?.closest('button');
      // Emoji-only controls still need a visible, meaningful label.
      if (!cleaned.trim() && button && !strip(button.textContent).trim()) {
        cleaned = strip(button.getAttribute('aria-label') || button.title || '');
      }
      if (cleaned === node.data) continue;
      const previous = originals.get(node);
      originals.set(node, { original: previous?.cleaned === node.data ? previous.original : node.data, cleaned });
      node.data = cleaned;
    }
  }

  let pending = false;
  const schedule = () => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => { pending = false; scan(); });
  };
  new MutationObserver(schedule).observe(document.documentElement, { subtree: true, childList: true, characterData: true });
  mobile.addEventListener('change', schedule);
  document.addEventListener('DOMContentLoaded', scan, { once: true });
  scan();
})();
