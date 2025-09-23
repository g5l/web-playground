async function fetchAndShow(path, outEl) {
  const res = await fetch(path);
  const text = await res.text();
  const headers = {};
  for (const [k,v] of res.headers.entries()) headers[k] = v;
  document.getElementById(outEl).textContent = JSON.stringify({
    url: path,
    status: res.status,
    headers,
    body: text.replace(/\n/g,'\\n')
  }, null, 2);
}

document.getElementById('fetch-resource').addEventListener('click', () => {
  fetchAndShow('/resource', 'output-resource');
});
document.getElementById('fetch-no-cache').addEventListener('click', () => {
  fetchAndShow('/no-cache', 'output-no-cache');
});
document.getElementById('fetch-expires').addEventListener('click', () => {
  fetchAndShow('/expires', 'output-expires');
});
