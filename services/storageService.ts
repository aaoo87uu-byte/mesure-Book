
import { Measurement, Debt } from '../types';

const MEASUREMENTS_KEY = 'tailor_measurements_v1';
const DEBTS_KEY = 'tailor_debts_v1';

export const storageService = {
  getMeasurements: (): Measurement[] => {
    const data = localStorage.getItem(MEASUREMENTS_KEY);
    return data ? JSON.parse(data) : [];
  },

  addMeasurement: (m: Omit<Measurement, 'id' | 'createdAt'>): Measurement[] => {
    const list = storageService.getMeasurements();
    const newItem: Measurement = {
      ...m,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now()
    };
    const newList = [newItem, ...list];
    localStorage.setItem(MEASUREMENTS_KEY, JSON.stringify(newList));
    return newList;
  },

  updateMeasurement: (id: string, m: Omit<Measurement, 'id' | 'createdAt'>): Measurement[] => {
    const list = storageService.getMeasurements();
    const newList = list.map(item => item.id === id ? { ...item, ...m } : item);
    localStorage.setItem(MEASUREMENTS_KEY, JSON.stringify(newList));
    return newList;
  },

  deleteMeasurement: (id: string): Measurement[] => {
    const list = storageService.getMeasurements();
    const newList = list.filter(item => item.id !== id);
    localStorage.setItem(MEASUREMENTS_KEY, JSON.stringify(newList));
    return newList;
  },

  getDebts: (): Debt[] => {
    const data = localStorage.getItem(DEBTS_KEY);
    return data ? JSON.parse(data) : [];
  },

  addDebt: (d: Omit<Debt, 'id' | 'updatedAt'>): Debt[] => {
    const list = storageService.getDebts();
    const newItem: Debt = {
      ...d,
      id: Math.random().toString(36).substr(2, 9),
      updatedAt: Date.now()
    };
    const newList = [newItem, ...list];
    localStorage.setItem(DEBTS_KEY, JSON.stringify(newList));
    return newList;
  },

  updateDebt: (id: string, d: Omit<Debt, 'id' | 'updatedAt'>): Debt[] => {
    const list = storageService.getDebts();
    const newList = list.map(item => item.id === id ? { ...item, ...d, updatedAt: Date.now() } : item);
    localStorage.setItem(DEBTS_KEY, JSON.stringify(newList));
    return newList;
  },

  deleteDebt: (id: string): Debt[] => {
    const list = storageService.getDebts();
    const newList = list.filter(item => item.id !== id);
    localStorage.setItem(DEBTS_KEY, JSON.stringify(newList));
    return newList;
  }
};
