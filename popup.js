const PAGE_URL_RE = /^https:\/\/app\.getcollectr\.com\/portfolio\/products(?:\/.*)?$/i;

const statusEl = document.getElementById('status');
const htmlButton = document.getElementById('download-html');
const pdfButton = document.getElementById('export-pdf');

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.style.color = isError ? '#b91c1c' : '#5a6478';
}

function setButtonsDisabled(disabled) {
  htmlButton.disabled = disabled;
  pdfButton.disabled = disabled;
}

async function getActiveTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

async function extractGridFromTab(tabId) {
  const [{ result }] = await chrome.scripting.executeScript({
    target: { tabId },
    func: () => {
      const selectors = [
        'div[class*="grid"]:has(img)'
      ];

      const candidates = [];

      for (const selector of selectors) {
        document.querySelectorAll(selector).forEach((node) => {
          const text = (node.textContent || '').trim();
          if (text.length < 20) return;
          const rect = node.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            candidates.push(node);
          }
        });
      }

      const root = candidates
        .filter((node) => node.tagName !== 'SCRIPT')
        .sort((a, b) => {
          const aText = (a.textContent || '').trim().length;
          const bText = (b.textContent || '').trim().length;
          return bText - aText;
        })[0] || document.body;

      const clone = root.cloneNode(true);
      clone.querySelectorAll('script, style, noscript, iframe, button, input, textarea, select, form, nav, aside').forEach((element) => element.remove());

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

            --tw-leading: var(--leading-tight);
          }
          body {
            font-family: Arial, sans-serif;
            color: #111827;
            margin: 20px;
            background-color: var(--background);
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
/* 
          img {
            max-width: 70px;
            max-height: 70px;
            object-fit: contain;
          } */

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
          }
          .items-center {
            align-items: center;
          }
          .flex-wrap {
            flex-wrap: wrap;
          }
          .flex-row {
            flex-direction: row;
          }
          .sm\:text-sm {
              font-size: var(--text-sm);
              line-height: var(--tw-leading, var(--text-sm--line-height));
          }
          .text-xs {
            font-size: var(--text-xs);
            line-height: var(--tw-leading, var(--text-xs--line-height));
          }
          :where(.space-x-1>:not(:last-child)) {
            --tw-space-x-reverse: 0;
            margin-inline-start: calc(calc(var(--spacing) * 1) * var(--tw-space-x-reverse));
            margin-inline-end: calc(calc(var(--spacing) * 1) * calc(1 - var(--tw-space-x-reverse)));
          }
          .bg-card {
            background-color: var(--card);
          }
          .underline {
            text-decoration-line: underline;
          }
          .text-muted-foreground, .text-muted-foreground/15 {
            color: var(--muted-foreground);
          }
          .text-foreground {
            color: var(--foreground);
          }
          .text-card-foreground {
              color: var(--card-foreground);
          }
          .dark:text-green-500:where(.dark *,.navyTeal *,.darkGreenTeal *,.darkBlue *,.darkPurple *,.darkYellow *,.navyBlue *,.navyPurple *,.navyYellow *,.darkGreenYellow *,.darkGreenPurple *,.darkGreenBlue *) {
            color: var(--color-green-500);
          }
          .contents {
            display: contents;
          }
          .list-none {
            list-style-type: none;
          }
          .text-muted-foreground {
            color: var(--muted-foreground);
          }
          .text-base {
              color: var(--foreground);
          }

          .sm\:text-lg {
              font-size: var(--text-lg);
              line-height: var(--tw-leading, var(--text-lg--line-height));
          }
          .font-bold {
            --tw-font-weight: var(--font-weight-bold);
            font-weight: var(--font-weight-bold);
          }
          .text-red-700 {
            color: var(--color-red-700);
          }
          .dark\:text-red-400 {
            color: var(--color-red-400);
          }
            
          .dark\:text-green-500 {
            color: var(--color-green-500);
          }
          .text-green-800 {
            color: var(--color-green-800);
          }
          .w-4 {
            width: calc(var(--spacing) * 4);
          }
          .h-4 {
            height: calc(var(--spacing) * 4);
          }
          .mr-1 {
            margin-right: calc(var(--spacing) * 1);
          }
          .text-base {
            color: var(--foreground);
          }

          .text-collectr-brand-primary {
            color: var(--collectr-brand-primary);
          }
          .gap-4 {
            gap: calc(var(--spacing) * 4);
            row-gap: calc(1rem);
            column-gap: calc(1rem);
          }
          .shadow-none, .shadow-sm {
            box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
          }
          .rounded-md {
            border-radius: calc(var(--radius) - 2px);
          }
          .border {
            border-style: var(--tw-border-style);
            border-width: 1px;
          }
          .border-input, .border-input\/50 {
            border-color: var(--input);
          }
          .flex-col {
            flex-direction: column;
          }
          /* .cursor-pointer {
            cursor: pointer;
          } */
          .py-3 {
            padding-block: calc(var(--spacing) * 3);
          }
          .px-3 {
            padding-inline: calc(var(--spacing) * 3);
          }
          .overflow-hidden, .truncate {
            overflow: hidden;
          }

          .w-full {
            width: 100%;
          }
          .h-fit {
            height: fit-content;
          }
          .mx-auto {
            margin-inline: auto;
          }
          .relative {
            position: relative;
          }
          .object-contain {
            object-fit: contain;
          }
          .inline-block {
            display: inline-block;
          }
          .ratio-content {
            inset: calc(var(--spacing) * 0);
            width: 100%;
            height: 100%;
            position: absolute;
          }
          /* .h-full {
            height: 100%;
          } */
          .flex {
            display: flex;
          }

          .ratio-card {
            aspect-ratio: 245 / 342;
          }
          .mb-1 {
            margin-bottom: calc(var(--spacing) * 1);
          }

          .mt-3 {
            margin-top: calc(var(--spacing) * 3);
          }
        </style>
      `;

      return `<!doctype html><html><head><meta charset="utf-8" /><title>Collectr Product Grid</title>${css}</head><body>${clone.outerHTML}</body></html>`;
    }
  });

  if (!result || typeof result !== 'string' || !result.includes('<')) {
    throw new Error('No product grid was found on this page.');
  }

  return result;
}

async function getGridHtml() {
  const tab = await getActiveTab();

  if (!tab || !tab.id) {
    throw new Error('No active tab found.');
  }

  if (!tab.url || !PAGE_URL_RE.test(tab.url)) {
    throw new Error('Open the Collectr products page to export it.');
  }

  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tab.id, { action: 'getGridContent' }, (response) => {
      if (chrome.runtime.lastError) {
        console.warn('Content script unavailable, falling back to direct execution:', chrome.runtime.lastError.message);
        extractGridFromTab(tab.id)
          .then(resolve)
          .catch(reject);
        return;
      }

      if (!response || !response.html) {
        extractGridFromTab(tab.id)
          .then(resolve)
          .catch(reject);
        return;
      }

      resolve(response.html);
    });
  });
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildDownloadFilename() {
  const date = new Date();
  return `collectr-products-${date.toISOString().slice(0, 10)}.html`;
}

function downloadHtml(exportHtml) {
  const blob = new Blob([exportHtml], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = buildDownloadFilename();
  a.click();
  URL.revokeObjectURL(url);
  setStatus('HTML export started successfully.');
}

function printAsPdf(exportHtml) {
  const printWindow = window.open('', '_blank', 'width=1200,height=900');

  if (!printWindow) {
    throw new Error('The print popup was blocked. Please allow popups and try again.');
  }

  const safeHtml = escapeHtml(exportHtml);

  printWindow.document.write(`<!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Collectr Products Export</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 24px; color: #1f2937; }
          table { width: 100%; border-collapse: collapse; margin-top: 12px; }
          th, td { border: 1px solid #d1d5db; padding: 10px 12px; text-align: left; vertical-align: top; }
          th { background: #f3f4f6; }
          img { max-width: 80px; max-height: 80px; object-fit: contain; }
          .page-title { font-size: 28px; margin-bottom: 12px; }
          @media print { body { margin: 0; } }
        </style>
      </head>
      <body>
        <div class="page-title">Collectr Products</div>
        ${exportHtml}
      </body>
    </html>`);

  printWindow.document.close();
  setTimeout(() => {
    printWindow.focus();
    printWindow.print();
    setStatus('Print dialog opened. Choose Save as PDF.');
  }, 300);
}

async function handleExport(type) {
  setButtonsDisabled(true);

  try {
    const html = await getGridHtml();

    if (type === 'html') {
      downloadHtml(html);
    } else if (type === 'pdf') {
      printAsPdf(html);
    }
  } catch (error) {
    setStatus(error.message, true);
  } finally {
    setButtonsDisabled(false);
  }
}

htmlButton.addEventListener('click', () => handleExport('html'));
pdfButton.addEventListener('click', () => handleExport('pdf'));

(async function init() {
  try {
    const tab = await getActiveTab();

    if (!tab || !tab.url || !PAGE_URL_RE.test(tab.url)) {
      setStatus('Open https://app.getcollectr.com/portfolio/products to use this exporter.', true);
      setButtonsDisabled(true);
      return;
    }

    setStatus('Ready to export the current grid.');
  } catch (error) {
    setStatus(error.message, true);
    setButtonsDisabled(true);
  }
})();
