const btnFetch = document.getElementById('btn-fetch');
const btnAbort = document.getElementById('btn-abort');
const output   = document.getElementById('output');

let controller = null;

btnFetch.addEventListener('click', async () => {
  controller = new AbortController();
  btnFetch.disabled = true;
  btnAbort.disabled = false;
  output.textContent = 'Fetching...';

  try {
    const response = await fetch('https://reqres.in/api/users?delay=5', {
      signal: controller.signal,
    });
    const data = await response.json();
    output.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    if (err.name === 'AbortError') {
      output.textContent = 'Request aborted.';
    } else {
      output.textContent = `Error: ${err.message}`;
    }
  } finally {
    controller = null;
    btnFetch.disabled = false;
    btnAbort.disabled = true;
  }
});

btnAbort.addEventListener('click', () => {
  controller?.abort();
});
