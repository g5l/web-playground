const demos = Array.from(document.querySelectorAll('.demo'));
const radios = Array.from(document.querySelectorAll('input[name="mode"]'));
const noteEl = document.getElementById('support-note');

// Feature detection
const supported = CSS.supports?.('field-sizing: content');
noteEl.textContent = supported
  ? '✅ field-sizing supported in this browser. Toggle the modes to compare.'
  : '⚠️ field-sizing not detected here. A small JS fallback will auto-grow the textarea height.';

function applyMode(mode) {
  demos.forEach(el => {
    el.classList.remove('fs-content', 'fs-fixed');
    el.classList.add(mode === 'content' ? 'fs-content' : 'fs-fixed');
  });
}

// Initialize mode from the selected radio
applyMode(document.querySelector('input[name="mode"]:checked')?.value || 'content');
radios.forEach(r => r.addEventListener('change', (e) => applyMode(e.target.value)));

// Fallback: if not supported, auto-grow textareas' height on input (progressive enhancement)
if (!supported) {
  const textareas = Array.from(document.querySelectorAll('textarea.demo'));
  const autoSize = (ta) => {
    ta.style.height = 'auto';
    ta.style.height = ta.scrollHeight + 'px';
  };
  textareas.forEach(ta => {
    autoSize(ta);
    ta.addEventListener('input', () => autoSize(ta));
  });
}
