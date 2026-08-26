const buttonHTML = `
  <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 cursor-pointer transition-all active:scale-[0.98] border bg-card shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 relative z-10 !bg-card border-transparent hover:!bg-card/90">
    <svg width="800px" height="800px" viewBox="0 0 1024 1024" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M171.547912 871.690231l91.625541-871.758789 614.461645 64.582521-91.625541 871.758789-614.461645-64.582521Z" fill="#2B6BBF" /><path d="M184.407528 102.021343h557.874737a43.932636 43.932636 0 0 1 46.024666 41.143261v836.812106a43.932636 43.932636 0 0 1-43.235292 43.932635h-557.874737A43.235292 43.235292 0 0 1 141.172236 979.97671V143.164604a43.235292 43.235292 0 0 1 43.235292-41.143261z" fill="#5D9CEC" /><path d="M464.739583 695.460594h-7.670777c-9.065464-6.276091-30.683111-20.920303-44.629979-32.077797-52.300757-41.143262-80.194493-69.734342-85.075898-92.746675a85.075897 85.075897 0 0 1-4.18406-25.104364A87.167928 87.167928 0 0 1 350.375262 479.284133a73.918403 73.918403 0 0 1 52.300757-22.314989 77.40512 77.40512 0 0 1 62.063564 30.68311 76.707776 76.707776 0 0 1 61.366221-32.077797 80.891837 80.891837 0 0 1 76.010433 82.286524 87.167928 87.167928 0 0 1-3.486717 23.709676c-4.184061 20.920303-32.077797 52.9981-82.286523 94.141362a522.310222 522.310222 0 0 1-48.116697 36.261858" fill="#E6E9ED" /></svg>
    Custom Exporter
  </button>
  `;


const template = document.createElement('template');
template.innerHTML = buttonHTML.trim();
const button = template.content.firstElementChild;

button.addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'downloadHtml' }, (response) => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError.message);
    } else if (response && !response.ok) {
      console.error(response.error || 'Unable to export grid.');
    }
  });
});

const addCustomButton = () => {
  const target = Array.from(document.querySelectorAll('button')).find(
    el => el.textContent.trim() === 'Export'
  );

  if (target) {
    if (button.parentElement !== target.parentElement || !target.parentElement?.contains(button)) {
      target.after(button);
    }
    return true;
  }

  return false;
};

const tryAddCustomButton = () => {
  if (addCustomButton()) {
    return;
  }

  window.setTimeout(tryAddCustomButton, 250);
};

if (document.readyState === 'complete') {
  tryAddCustomButton();
} else {
  window.addEventListener('load', tryAddCustomButton, { once: true });
}
