export function toJSON(data) {
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json;charset=utf-8' });
  return blob;
}

export function toCSV() {
  alert('CSV export coming soon');
}

export function toHTML() {
  alert('HTML export coming soon');
}
