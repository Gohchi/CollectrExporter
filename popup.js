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

function sendDownloadMessage(action) {
  setButtonsDisabled(true);
  setStatus('Preparing export...');

  chrome.runtime.sendMessage({ action }, (response) => {
    setButtonsDisabled(false);

    if (chrome.runtime.lastError) {
      setStatus(chrome.runtime.lastError.message, true);
      return;
    }

    if (response && response.ok) {
      setStatus('Download started.');
      return;
    }

    setStatus(response?.error || 'Unable to export the page.', true);
  });
}

htmlButton.addEventListener('click', () => {
  sendDownloadMessage('downloadHtml');
});

pdfButton.addEventListener('click', () => {
  sendDownloadMessage('printPdf');
});
