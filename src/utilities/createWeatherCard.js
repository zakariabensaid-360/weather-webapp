export function createWeatherCard(data) {
  const main = document.createElement('article');
  main.className = 'flex flex-col justify-center  items-center w-full';
  
  const header = document.createElement('div');
  header.className = 'relative overflow-hidden bg-white/80 backdrop-blur-xl shadow-xl shadow-slate-200/50 p-6 sm:p-8 border  rounded-3xl w-full max-w-md flex justify-between items-center transition-all duration-300  hover:shadow-2xl border-black';
  
  const glowBg = document.createElement('div');
  glowBg.className = 'absolute -right-10 -bottom-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-2xl pointer-events-none';
  header.appendChild(glowBg);

  const leftCol = document.createElement('div');
  leftCol.className = 'flex flex-col gap-4 z-10';
  
  const locationDateBox = document.createElement('div');
  locationDateBox.className = 'flex flex-col gap-0.5';

  const locationEl = document.createElement('h3');
  locationEl.id = 'today-location';
  locationEl.className = 'font-bold text-xl text-slate-800 tracking-tight';
  locationEl.textContent = data.location;
  
  const dateEl = document.createElement('span');
  dateEl.id = 'today-date';
  dateEl.className = 'text-slate-400 text-xs font-medium uppercase tracking-wider';
  dateEl.textContent = data.date;

  locationDateBox.append(locationEl, dateEl);

  const tempStatusBox = document.createElement('div');
  tempStatusBox.className = 'flex flex-col';

  const tempEl = document.createElement('div');
  tempEl.id = 'today-tempetor';
  tempEl.className = 'text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-slate-700 tracking-tighter';
  tempEl.textContent = data.temp;

  const statusEl = document.createElement('span');
  statusEl.id = 'today-status';
  statusEl.className = 'text-blue-600 font-semibold text-sm mt-1';
  statusEl.textContent = data.status;

  tempStatusBox.append(tempEl, statusEl);
  leftCol.append(locationDateBox, tempStatusBox);

  const rightCol = document.createElement('div');
  rightCol.className = 'flex flex-col items-center justify-center pl-4 z-10';

  const codeEl = document.createElement('i');
  codeEl.id = 'today-code';
  // codeEl.className = 'text-4xl sm:text-5xl p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100/60 shadow-inner flex items-center justify-center';
  codeEl.classList = `${data.weatherCode} fa-5x`;

  rightCol.appendChild(codeEl);

  header.append(leftCol, rightCol);
  main.appendChild(header);

  return main;
}