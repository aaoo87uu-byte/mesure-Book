
export interface Measurement {
  id: string;
  name: string;
  length: string;      // الطول
  sleeve: string;      // ردن
  shoulder: string;    // كتف
  collar: string;      // ياخة
  width: string;       // عرض
  details: string;     // تفاصيل التفصال
  createdAt: number;
}

export interface Debt {
  id: string;
  customerName: string;
  amount: number;
  notes: string;
  updatedAt: number;
}

export type ViewType = 'measurements' | 'debts';
