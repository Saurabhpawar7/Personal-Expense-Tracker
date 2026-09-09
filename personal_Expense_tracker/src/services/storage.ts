import type { AppData } from '../types';
const KEY='expense-tracker-v1';
export const storage={load():AppData|null{try{const x=localStorage.getItem(KEY); return x?JSON.parse(x):null}catch{return null}},save(x:AppData){localStorage.setItem(KEY,JSON.stringify(x))},clear(){localStorage.removeItem(KEY)}};
export function validData(x:unknown):x is AppData { const d=x as AppData; return !!d&&!!d.settings&&typeof d.settings.initial?.online==='number'&&typeof d.settings.initial?.cash==='number'&&Array.isArray(d.transactions); }
