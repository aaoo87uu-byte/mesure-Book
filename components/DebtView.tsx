
import React, { useState, useEffect } from 'react';
import { Debt } from '../types';
import { storageService } from '../services/storageService';

const DebtView: React.FC = () => {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Debt, 'id' | 'updatedAt'>>({
    customerName: '',
    amount: 0,
    notes: ''
  });

  useEffect(() => {
    setDebts(storageService.getDebts());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      const updated = storageService.updateDebt(editingId, formData);
      setDebts(updated);
      setEditingId(null);
    } else {
      const updated = storageService.addDebt(formData);
      setDebts(updated);
    }
    setFormData({ customerName: '', amount: 0, notes: '' });
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا السجل؟')) {
      const updated = storageService.deleteDebt(id);
      setDebts(updated);
    }
  };

  const handleEdit = (d: Debt) => {
    setFormData({
      customerName: d.customerName,
      amount: d.amount,
      notes: d.notes
    });
    setEditingId(d.id);
    setShowForm(true);
  };

  const filtered = debts.filter(d => 
    d.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalDebt = filtered.reduce((acc, curr) => acc + Number(curr.amount), 0);

  return (
    <div className="space-y-6">
      {/* Search and Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
           <div className="relative w-full">
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="بحث باسم المدين..."
              className="w-full pr-10 p-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all text-black font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center justify-between">
          <span className="font-bold text-amber-800">إجمالي الديون المعروضة:</span>
          <span className="text-xl font-black text-amber-900">{totalDebt.toLocaleString()} د.ع</span>
        </div>
      </div>

      <button
        onClick={() => { setShowForm(true); setEditingId(null); }}
        className="w-full bg-amber-600 text-white px-6 py-3 rounded-xl hover:bg-amber-700 flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        تسجيل دين جديد
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg">
            <div className="p-6 border-b flex justify-between items-center text-black">
              <h2 className="text-xl font-bold">{editingId ? 'تعديل سجل دين' : 'تسجيل دين جديد'}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">اسم الشخص</label>
                <input required type="text" value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} className="w-full p-3 border rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-amber-500 text-black font-medium" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">المبلغ</label>
                <input required type="number" value={formData.amount || ''} onChange={e => setFormData({...formData, amount: Number(e.target.value)})} className="w-full p-3 border rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-amber-500 text-black font-medium" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">ملاحظات إضافية</label>
                <textarea value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} className="w-full p-3 border rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-amber-500 h-24 text-black font-medium"></textarea>
              </div>
              <button type="submit" className="w-full bg-amber-600 text-white p-3 rounded-xl font-bold shadow-lg shadow-amber-200 hover:bg-amber-700 transition-all">حفظ السجل</button>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {filtered.length > 0 ? (
          filtered.map(d => (
            <div key={d.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center group hover:shadow-md transition-shadow">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-black">{d.customerName}</h3>
                <p className="text-2xl font-black text-amber-600">{d.amount.toLocaleString()} د.ع</p>
                {d.notes && <p className="text-xs text-gray-400 italic">ملاحظات: {d.notes}</p>}
                <p className="text-[10px] text-gray-300">آخر تحديث: {new Date(d.updatedAt).toLocaleDateString('ar-EG')}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(d)} className="p-3 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-100 transition-colors border border-amber-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button onClick={() => handleDelete(d.id)} className="p-3 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition-colors border border-rose-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-12 text-center rounded-2xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400">لا توجد ديون مسجلة بهذا الاسم.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DebtView;
