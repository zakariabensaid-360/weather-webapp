export function createWeatherCardSkeleton() {
  const main = document.createElement('article');
  main.className = 'flex flex-col justify-center items-center w-full animate-pulse';
  
  const header = document.createElement('div');
  header.className = 'relative overflow-hidden bg-white/80 backdrop-blur-xl shadow-xl shadow-slate-200/50 p-6 sm:p-8 border border-white/60 rounded-3xl w-full max-w-md flex justify-between items-center';
  
  const leftCol = document.createElement('div');
  leftCol.className = 'flex flex-col gap-4 z-10 w-full';
  
  const locationDateBox = document.createElement('div');
  locationDateBox.className = 'flex flex-col gap-2';

  const locationEl = document.createElement('div');
  locationEl.className = 'h-6 bg-slate-200 rounded-lg w-3/4';
  
  const dateEl = document.createElement('div');
  dateEl.className = 'h-3 bg-slate-200 rounded-md w-1/2';

  locationDateBox.append(locationEl, dateEl);

  const tempStatusBox = document.createElement('div');
  tempStatusBox.className = 'flex flex-col gap-2 mt-2';

  const tempEl = document.createElement('div');
  tempEl.className = 'h-14 bg-slate-200 rounded-xl w-2/3';

  const statusEl = document.createElement('div');
  statusEl.className = 'h-4 bg-slate-200 rounded-md w-1/3';

  tempStatusBox.append(tempEl, statusEl);
  leftCol.append(locationDateBox, tempStatusBox);

  const rightCol = document.createElement('div');
  rightCol.className = 'flex flex-col items-center justify-center pl-4 z-10';

  const codeEl = document.createElement('div');
  codeEl.className = 'w-20 h-20 bg-slate-200 rounded-2xl';

  rightCol.appendChild(codeEl);

  header.append(leftCol, rightCol);
  main.appendChild(header);

  return main;
}