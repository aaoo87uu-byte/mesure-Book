
import React, { useState, useEffect } from 'react';
import { Measurement } from '../types';
import { storageService } from '../services/storageService';
import { exportToWord } from '../services/exportService';

const MeasurementView: React.FC = () => {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Measurement, 'id' | 'createdAt'>>({
    name: '',
    length: '',
    sleeve: '',
    shoulder: '',
    collar: '',
    width: '',
    details: ''
  });

  useEffect(() => {
    setMeasurements(storageService.getMeasurements());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      const updated = storageService.updateMeasurement(editingId, formData);
      setMeasurements(updated);
      setEditingId(null);
    } else {
      const updated = storageService.addMeasurement(formData);
      setMeasurements(updated);
    }
    setFormData({ name: '', length: '', sleeve: '', shoulder: '', collar: '', width: '', details: '' });
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا القياس؟')) {
      const updated = storageService.deleteMeasurement(id);
      setMeasurements(updated);
    }
  };

  const handleEdit = (m: Measurement) => {
    setFormData({
      name: m.name,
      length: m.length,
      sleeve: m.sleeve,
      shoulder: m.shoulder,
      collar: m.collar,
      width: m.width,
      details: m.details
    });
    setEditingId(m.id);
    setShowForm(true);
  };

  const filtered = measurements.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="relative w-full md:w-64">
          <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="بحث بالاسم..."
            className="w-full pr-10 p-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-black font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => { setShowForm(true); setEditingId(null); }}
          className="w-full md:w-auto bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          إضافة قياس جديد
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b sticky top-0 bg-white z-10 flex justify-between items-center text-black">
              <h2 className="text-xl font-bold">{editingId ? 'تعديل قياس' : 'إضافة قياس جديد'}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">اسم الزبون</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 border rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-indigo-500 text-black font-medium" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">الطول</label>
                  <input type="text" value={formData.length} onChange={e => setFormData({...formData, length: e.target.value})} className="w-full p-3 border rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-indigo-500 text-black font-medium" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">ردن</label>
                  <input type="text" value={formData.sleeve} onChange={e => setFormData({...formData, sleeve: e.target.value})} className="w-full p-3 border rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-indigo-500 text-black font-medium" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">كتف</label>
                  <input type="text" value={formData.shoulder} onChange={e => setFormData({...formData, shoulder: e.target.value})} className="w-full p-3 border rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-indigo-500 text-black font-medium" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">ياخة</label>
                  <input type="text" value={formData.collar} onChange={e => setFormData({...formData, collar: e.target.value})} className="w-full p-3 border rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-indigo-500 text-black font-medium" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">عرض</label>
                  <input type="text" value={formData.width} onChange={e => setFormData({...formData, width: e.target.value})} className="w-full p-3 border rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-indigo-500 text-black font-medium" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">تفاصيل التفصال</label>
                <textarea value={formData.details} onChange={e => setFormData({...formData, details: e.target.value})} className="w-full p-3 border rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-indigo-500 h-24 text-black font-medium"></textarea>
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white p-3 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all">حفظ البيانات</button>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {filtered.length > 0 ? (
          filtered.map(m => (
            <div key={m.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between gap-4 group hover:shadow-md transition-shadow">
              <div className="space-y-2 flex-grow">
                <h3 className="text-lg font-bold text-black">{m.name}</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
                  <div className="bg-indigo-50 p-2 rounded-lg text-indigo-700 border border-indigo-100"><span className="font-bold">الطول:</span> {m.length}</div>
                  <div className="bg-indigo-50 p-2 rounded-lg text-indigo-700 border border-indigo-100"><span className="font-bold">ردن:</span> {m.sleeve}</div>
                  <div className="bg-indigo-50 p-2 rounded-lg text-indigo-700 border border-indigo-100"><span className="font-bold">كتف:</span> {m.shoulder}</div>
                  <div className="bg-indigo-50 p-2 rounded-lg text-indigo-700 border border-indigo-100"><span className="font-bold">ياخة:</span> {m.collar}</div>
                  <div className="bg-indigo-50 p-2 rounded-lg text-indigo-700 border border-indigo-100"><span className="font-bold">عرض:</span> {m.width}</div>
                </div>
                {m.details && (
                  <div className="mt-2 text-sm text-gray-700 bg-gray-50 p-2 rounded-lg border border-gray-100">
                    <span className="font-bold block mb-1">تفاصيل:</span> {m.details}
                  </div>
                )}
              </div>
              <div className="flex md:flex-col gap-2 justify-center">
                <button onClick={() => exportToWord(m)} className="p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-colors flex items-center justify-center gap-1 text-sm border border-emerald-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  تصدير
                </button>
                <button onClick={() => handleEdit(m)} className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors flex items-center justify-center gap-1 text-sm border border-blue-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  تعديل
                </button>
                <button onClick={() => handleDelete(m.id)} className="p-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition-colors flex items-center justify-center gap-1 text-sm border border-rose-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  حذف
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-12 text-center rounded-2xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400">لا يوجد قياسات مسجلة بهذا الاسم.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeasurementView;
