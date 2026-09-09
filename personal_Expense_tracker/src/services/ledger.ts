import type { Method, Transaction } from '../types';
export const today=()=>new Date().toISOString().slice(0,10);
export const money=(paise:number)=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',minimumFractionDigits:paise%100?2:0,maximumFractionDigits:2}).format(paise/100);
export const parseMoney=(s:string)=>Math.round(Number(s)*100);
export const balanceAt=(initial:{online:number;cash:number}, txs:Transaction[], date=today())=>{const b={...initial}; txs.filter(t=>t.date<=date).forEach(t=>{if(t.type==='expense'&&t.paymentMethod)b[t.paymentMethod]-=t.amount; if(t.type==='income'&&t.paymentMethod)b[t.paymentMethod]+=t.amount; if(t.type==='transfer'&&t.transferFrom&&t.transferTo){b[t.transferFrom]-=t.amount;b[t.transferTo]+=t.amount}});return b};
export const daily=(txs:Transaction[], date:string)=>{const list=txs.filter(t=>t.date===date); const expenses=list.filter(t=>t.type==='expense'); return {list,expenses,total:expenses.reduce((s,t)=>s+t.amount,0),online:expenses.filter(t=>t.paymentMethod==='online').reduce((s,t)=>s+t.amount,0),cash:expenses.filter(t=>t.paymentMethod==='cash').reduce((s,t)=>s+t.amount,0)} };
export const inRange=(txs:Transaction[],a:string,b:string)=>txs.filter(t=>t.date>=a&&t.date<=b);
export const uid=()=>crypto.randomUUID?.()??`${Date.now()}-${Math.random().toString(36).slice(2)}`;
