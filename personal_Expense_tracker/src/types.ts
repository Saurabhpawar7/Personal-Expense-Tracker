export type Method = 'online'|'cash';
export type TransactionType = 'expense'|'income'|'transfer';
export interface Transaction { id:string; type:TransactionType; date:string; createdAt:string; amount:number; paymentMethod?:Method; category?:string; note?:string; transferId?:string; transferFrom?:Method; transferTo?:Method }
export interface Settings { initial:{online:number;cash:number}; createdAt:string; theme:'light'|'dark'|'system' }
export interface AppData { settings:Settings; transactions:Transaction[] }
