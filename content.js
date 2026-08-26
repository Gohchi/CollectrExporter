const PAGE_URL_RE = /^https:\/\/app\.getcollectr\.com\/portfolio\/products(?:\/.*)?$/i;

function shouldCapturePage() {
  return PAGE_URL_RE.test(window.location.href);
}

function extractGridNode() {
  if (!shouldCapturePage()) {
    return null;
  }

  const selectors = [
    'div[class*="grid"]:has(img)'
  ];

  const candidates = [];

  for (const selector of selectors) {
    document.querySelectorAll(selector).forEach((node) => {
      const text = (node.textContent || '').trim();
      if (text.length < 20) {
        return;
      }

      const rect = node.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        candidates.push(node);
      }
    });
  }

  if (!candidates.length) {
    return document.body;
  }

  const bestNode = candidates
    .filter((node) => node.tagName !== 'SCRIPT')
    .sort((a, b) => {
      const aText = (a.textContent || '').trim().length;
      const bText = (b.textContent || '').trim().length;
      return bText - aText;
    })[0];

  return bestNode || document.body;
}

function cleanClone(node) {
  const clone = node.cloneNode(true);

  clone.querySelectorAll('script, style, noscript, iframe, button, input, textarea, select, form, nav, aside').forEach((element) => {
    element.remove();
  });

  return clone;
}

function buildExportHtmlFromNode(node) {
  const wrapper = cleanClone(node);

  wrapper.style.background = 'oklch(20.5% 0 0)';
  wrapper.style.color = '#f3f4f6';
  wrapper.style.borderRadius = 'calc(var(--radius) - 2px)';
  wrapper.className = [
    'grid',
    'grid-cols-5',
    'gap-4',
    'p-4',
    'min-h-screen',
    'bg-[oklch(20.5%_0_0)]',
    'text-slate-50'
  ].join(' ');

  const cards = Array.from(wrapper.children);
  cards.forEach((card) => {
    if (!card || card.tagName === 'SCRIPT') return;
    card.style.background = 'oklch(20.5% 0 0)';
    card.style.border = '1px solid oklch(32.5% 0 0)';
    card.style.borderRadius = 'calc(var(--radius) - 2px)';
    card.style.padding = '0.75rem';
    card.style.color = '#f3f4f6';
    card.classList.add('transition-all', 'duration-200', 'shadow-sm');

    const textNodes = Array.from(card.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6, li'));
    textNodes.forEach((textNode) => {
      if (textNode.textContent && /\d/.test(textNode.textContent)) {
        textNode.style.color = '#f3f4f6';
      }
    });

    const priceNodes = Array.from(card.querySelectorAll('*')).filter((element) => {
      const text = (element.textContent || '').trim();
      return /\$|€|£|\d/.test(text) && element.tagName !== 'IMG';
    });

    priceNodes.forEach((element) => {
      const text = (element.textContent || '').trim();
      if (text && /\$|€|£/.test(text)) {
        element.style.color = 'oklch(72.3% .219 149.579)';
      }
    });

    const labels = Array.from(card.querySelectorAll('*')).filter((element) => {
      const text = (element.textContent || '').trim();
      return /out of stock|low stock|inactive|error|warning|not available|failed|sold out/i.test(text);
    });

    labels.forEach((element) => {
      element.style.color = 'oklch(70.4% .191 22.216)';
    });
  });

  const css = `
    <style>

    :root {
      --color-red-400: oklch(70.4% .191 22.216);
      --color-red-500: oklch(63.7% .237 25.331);
      --color-red-600: oklch(57.7% .245 27.325);
      --color-red-700: oklch(50.5% .213 27.518);
      --color-amber-400: oklch(82.8% .189 84.429);
      --color-amber-500: oklch(76.9% .188 70.08);
      --color-amber-600: oklch(66.6% .179 58.318);
      --color-yellow-500: oklch(79.5% .184 86.047);
      --color-green-400: oklch(79.2% .209 151.711);
      --color-green-500: oklch(72.3% .219 149.579);
      --color-green-600: oklch(62.7% .194 149.214);
      --color-green-700: oklch(52.7% .154 150.069);
      --color-green-800: oklch(44.8% .119 151.328);
      --color-blue-400: oklch(70.7% .165 254.624);
      --color-pink-400: oklch(71.8% .202 349.761);
      --color-gray-200: oklch(92.8% .006 264.531);
      --color-gray-500: oklch(55.1% .027 264.364);
      --color-gray-950: oklch(13% .028 261.692);
      --color-black: #000;
      --color-white: #fff;
      --spacing: .25rem;
      --breakpoint-lg: 64rem;
      --breakpoint-xl: 80rem;
      --breakpoint-2xl: 96rem;
      --container-xs: 20rem;
      --container-sm: 24rem;
      --container-md: 28rem;
      --container-lg: 32rem;
      --container-xl: 36rem;
      --container-2xl: 42rem;
      --container-7xl: 80rem;
      --text-xs: .75rem;
      --text-xs--line-height: calc(1 / .75);
      --text-sm: .875rem;
      --text-sm--line-height: calc(1.25 / .875);
      --text-base: 1rem;
      --text-base--line-height: calc(1.5 / 1);
      --text-lg: 1.125rem;
      --text-lg--line-height: calc(1.75 / 1.125);
      --text-xl: 1.25rem;
      --text-xl--line-height: calc(1.75 / 1.25);
      --text-2xl: 1.5rem;
      --text-2xl--line-height: calc(2 / 1.5);
      --text-3xl: 1.875rem;
      --text-3xl--line-height: calc(2.25 / 1.875);
      --text-4xl: 2.25rem;
      --text-4xl--line-height: calc(2.5 / 2.25);
      --text-5xl: 3rem;
      --text-5xl--line-height: 1;
      --font-weight-normal: 400;
      --font-weight-medium: 500;
      --font-weight-semibold: 600;
      --font-weight-bold: 700;
      --font-weight-extrabold: 800;
      --tracking-tight: -.025em;
      --tracking-wide: .025em;
      --tracking-wider: .05em;
      --tracking-widest: .1em;
      --leading-tight: 1.25;
      --leading-snug: 1.375;
      --leading-relaxed: 1.625;
      --radius-xs: .125rem;
      --radius-2xl: 1rem;
      --shadow-2xs: var(--shadow-2xs);
      --shadow-xs: var(--shadow-xs);
      --shadow-sm: var(--shadow-sm);
      --shadow-md: var(--shadow-md);
      --shadow-lg: var(--shadow-lg);
      --shadow-xl: var(--shadow-xl);
      --shadow-2xl: var(--shadow-2xl);
      --ease-out: cubic-bezier(0, 0, .2, 1);
      --ease-in-out: cubic-bezier(.4, 0, .2, 1);
      --animate-spin: spin 1s linear infinite;
      --animate-ping: ping 1s cubic-bezier(0, 0, .2, 1) infinite;
      --animate-pulse: pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;
      --blur-sm: 8px;
      --blur-md: 12px;
      --blur-xl: 24px;
      --blur-2xl: 40px;
      --aspect-video: 16 / 9;
      --default-transition-duration: .15s;
      --default-transition-timing-function: cubic-bezier(.4, 0, .2, 1);
      --default-font-family: var(--font-sans);
      --default-mono-font-family: var(--font-mono);
      --shadow: var(--shadow);
      --font-inter: var(--font-inter);
      --color-border: var(--border);
      --background-image-explore-image-light: var(--image-explore-image-light);
      --background: oklch(14.5% 0 0);
      --foreground: oklch(98.5% 0 0);
      --card: oklch(20.5% 0 0);
      --card-foreground: oklch(98.5% 0 0);
      --popover: oklch(26.9% 0 0);
      --popover-foreground: oklch(98.5% 0 0);
      --primary: oklch(92.2% 0 0);
      --primary-foreground: oklch(20.5% 0 0);
      --secondary: oklch(26.9% 0 0);
      --secondary-foreground: oklch(98.5% 0 0);
      --muted: oklch(26.9% 0 0);
      --muted-foreground: oklch(70.8% 0 0);
      --accent: oklch(37.1% 0 0);
      --accent-foreground: oklch(98.5% 0 0);
      --destructive: oklch(70.4% .191 22.216);
      --destructive-foreground: oklch(98.5% 0 0);
      --collectr-brand-primary: oklch(67.53% .1372 187.25);
      --collectr-brand-secondary: oklch(85.77% .1728 88.13);
      --border: oklch(27.5% 0 0);
      --input: oklch(32.5% 0 0);
      --ring: oklch(55.6% 0 0);
      --snake: oklch(20.5% 0 0);
      --chart-1: oklch(78.33% .1553 187.25);
      --chart-2: oklch(57.49% .2573 292.66);
      --chart-3: oklch(66.79% .1896 236.49);
      --chart-4: oklch(57.49% .1896 259.11);
      --chart-5: oklch(40.06% .1724 258.79);
      --chart-6: oklch(82.24% .1724 165.16);
      --chart-7: oklch(60.77% .1274 165.16);
      --chart-8: oklch(40.07% .1149 165.16);
      --chart-9: oklch(94.96% .1789 106.07);
      --chart-10: oklch(75.36% .1553 67.11);
      --chart-11: oklch(49.46% .105 68.8);
      --sidebar-foreground: oklch(98.5% 0 0);
      --sidebar-primary: oklch(48.8% .243 264.376);
      --sidebar-primary-foreground: oklch(98.5% 0 0);
      --sidebar-accent: oklch(26.9% 0 0);
      --sidebar-accent-foreground: oklch(98.5% 0 0);
      --sidebar-border: oklch(27.5% 0 0);
      --sidebar-ring: oklch(43.9% 0 0);
      --font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
      --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
      --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      --radius: .75rem;
      --shadow-2xs: 0 1px 3px 0px #0000000d;
      --shadow-xs: 0 1px 3px 0px #0000000d;
      --shadow-sm: 0 0 #000, 0 0 #0000, 0 0 #000 0 0 #0000, 0 1px 2px 0 #0000000d;
      --shadow: 0 1px 3px 0px #0000001a, 0 1px 2px -1px #0000001a;
      --shadow-md: 0 1px 3px 0px #0000001a, 0 2px 4px -1px #0000001a;
      --shadow-lg: 0 1px 3px 0px #0000001a, 0 4px 6px -1px #0000001a;
      --shadow-xl: 0 1px 3px 0px #0000001a, 0 8px 10px -1px #0000001a;
      --shadow-2xl: 0 1px 3px 0px #00000040;
    }
    body {
      font-family: Arial, sans-serif;
      color: #111827;
      margin: 20px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 12px;
    }

    th,
    td {
      border: 1px solid #d1d5db;
      padding: 10px 12px;
      text-align: left;
      vertical-align: top;
    }

    th {
      background: #f3f4f6;
    }

    img {
      max-width: 70px;
      max-height: 70px;
      object-fit: contain;
    }

    ul,
    ol {
      margin: 0;
      padding-left: 20px;
    }
  
    .grid {
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));

      > li {
        border-color: var(--color-gray-200, currentcolor);
      }
      .bg-card {
        background-color: var(--card);
      }
      .underline {
        text-decoration-line: underline;
      }
      .text-muted-foreground, .text-muted-foreground\/15 {
        color: var(--muted-foreground);
      }
      .text-foreground, .text-foreground\/90 {
        color: var(--foreground);
      }
      .text-card-foreground {
          color: var(--card-foreground);
      }
      .dark\:text-green-500:where(.dark *,.navyTeal *,.darkGreenTeal *,.darkBlue *,.darkPurple *,.darkYellow *,.navyBlue *,.navyPurple *,.navyYellow *,.darkGreenYellow *,.darkGreenPurple *,.darkGreenBlue *) {
        color: var(--color-green-500);
      }
    }
    .contents {
      display: contents;
    }
    .list-none {
      list-style-type: none;
    }
    </style>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              collectrBg: 'oklch(20.5% 0 0)',
              collectrCard: 'oklch(20.5% 0 0)',
              collectrBorder: 'oklch(32.5% 0 0)',
              collectrDanger: 'oklch(70.4% .191 22.216)',
              collectrSuccess: 'oklch(72.3% .219 149.579)'
            }
          }
        }
      }
    </script>
  `;

  return `<!doctype html><html><head><meta charset="utf-8" /><title>Collectr Product Grid</title>${css}</head><body>${wrapper.outerHTML}</body></html>`;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action !== 'getGridContent') {
    return;
  }

  try {
    const node = extractGridNode();
    if (!node) {
      sendResponse({ html: '' });
      return;
    }

    const html = buildExportHtmlFromNode(node);
    sendResponse({ html });
  } catch (error) {
    sendResponse({ html: '', error: error.message || 'Unable to capture grid.' });
  }

  return true;
});
