export function createWeatherCard(data) {
  const main = document.createElement('main');
  main.className = 'flex flex-col justify-center items-center p-4';
  
  const header = document.createElement('header');
  header.className = 'flex justify-between items-center bg-gray-100 p-4 border rounded-2xl w-full max-w-md';
  
  const leftCol = document.createElement('div');
  leftCol.className = 'flex flex-col gap-2';
  
  const locationDateBox = document.createElement('div');
  const locationEl = document.createElement('h1');
  locationEl.id = 'today-location';
  locationEl.className = 'font-bold text-xl';
  locationEl.textContent = data.location;
  
  const dateEl = document.createElement('span');
  dateEl.id = 'today-date';
  dateEl.className = 'text-gray-500 text-sm';
  dateEl.textContent = data.date;

  locationDateBox.append(locationEl, dateEl);

  const tempStatusBox = document.createElement('div');
  tempStatusBox.className = 'flex flex-col';

  const tempEl = document.createElement('h2');
  tempEl.id = 'today-tempetor';
  tempEl.className = 'text-8xl font-bold';
  tempEl.textContent = data.temp;

  const statusEl = document.createElement('span');
  statusEl.id = 'today-status';
  statusEl.className = 'text-gray-500 text-sm';
  statusEl.textContent = data.status;

  tempStatusBox.append(tempEl, statusEl);
  leftCol.append(locationDateBox, tempStatusBox);

  const rightCol = document.createElement('div');
  rightCol.className = 'flex flex-col items-center justify-center pl-4';

  const codeEl = document.createElement('span');
  codeEl.id = 'today-code';
  codeEl.className = 'text-xl font-semibold text-gray-600 bg-white px-3 py-1 rounded-full border shadow-sm';
  codeEl.textContent = `${data.weatherCode}`;

  rightCol.appendChild(codeEl);

  header.append(leftCol, rightCol);
  main.appendChild(header);

  return main;
}