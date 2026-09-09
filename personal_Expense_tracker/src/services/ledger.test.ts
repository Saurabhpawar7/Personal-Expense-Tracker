import { describe, expect, it } from 'vitest';
import { balanceAt, daily } from './ledger';
import type { Transaction } from '../types';

const initial={online:1_000_000,cash:500_000};
const tx=(x:Partial<Transaction>):Transaction=>({id:crypto.randomUUID(),type:'expense',date:'2026-09-09',createdAt:'2026-09-09T10:00:00',amount:0,...x});
describe('continuous ledger',()=>{
 it('subtracts online and cash expenses',()=>expect(balanceAt(initial,[tx({amount:2050,paymentMethod:'online'}),tx({amount:10025,paymentMethod:'cash'})])).toEqual({online:997950,cash:489975}));
 it('adds income',()=>expect(balanceAt(initial,[tx({type:'income',amount:200000,paymentMethod:'online'})])).toEqual({online:1200000,cash:500000}));
 it('moves money without changing the total',()=>{const b=balanceAt(initial,[tx({type:'transfer',amount:100000,transferFrom:'online',transferTo:'cash'})]);expect(b).toEqual({online:900000,cash:600000});expect(b.online+b.cash).toBe(1500000)});
 it('calculates historical balances and excludes future transactions',()=>{const all=[tx({date:'2026-09-08',amount:10000,paymentMethod:'online'}),tx({date:'2026-09-10',amount:20000,paymentMethod:'cash'})];expect(balanceAt(initial,all,'2026-09-09')).toEqual({online:990000,cash:500000})});
 it('keeps paise exact and totals categories separately',()=>{const all=[tx({amount:1050,paymentMethod:'cash',category:'Chai'}),tx({amount:2050,paymentMethod:'cash',category:'Food'})];expect(daily(all,'2026-09-09').total).toBe(3100);expect(balanceAt(initial,all).cash).toBe(496900)});
 it('permits negative balances',()=>expect(balanceAt({online:0,cash:0},[tx({amount:1,paymentMethod:'online'})]).online).toBe(-1));
});
