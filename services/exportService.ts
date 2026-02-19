
import { Measurement } from '../types';

export const exportToWord = (m: Measurement) => {
  const content = `
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; }
        .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 30px; }
        .row { display: flex; margin-bottom: 15px; font-size: 18px; }
        .label { font-weight: bold; width: 120px; }
        .details { margin-top: 30px; padding: 15px; border: 1px solid #ccc; background: #f9f9f9; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>تفاصيل قياسات الزبون</h1>
        <p>الاسم: ${m.name}</p>
        <p>التاريخ: ${new Date(m.createdAt).toLocaleDateString('ar-EG')}</p>
      </div>
      
      <div class="row"><span class="label">الطول:</span> <span>${m.length}</span></div>
      <div class="row"><span class="label">الردن:</span> <span>${m.sleeve}</span></div>
      <div class="row"><span class="label">الكتف:</span> <span>${m.shoulder}</span></div>
      <div class="row"><span class="label">الياخة:</span> <span>${m.collar}</span></div>
      <div class="row"><span class="label">العرض:</span> <span>${m.width}</span></div>
      
      <div class="details">
        <h3>تفاصيل إضافية:</h3>
        <p>${m.details || 'لا توجد ملاحظات إضافية'}</p>
      </div>
      
      <div style="margin-top: 50px; text-align: left;">
        <p>توقيع الخياط: ..........................</p>
      </div>
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', content], {
    type: 'application/msword'
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `قياس_${m.name}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
