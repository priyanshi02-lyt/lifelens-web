// LifeLens Data Exporter & Importer Suite

export function exportMomentsToCSV(moments) {
  if (!moments || !moments.length) return;
  const headers = ['ID', 'Date', 'Time', 'Title', 'Subtitle', 'Kind', 'Mood', 'Amount', 'Currency', 'Chapter'];
  
  const rows = moments.map(m => [
    m.id || '',
    `"${m.date || ''}"`,
    `"${m.time || ''}"`,
    `"${(m.title || '').replace(/"/g, '""')}"`,
    `"${(m.subtitle || '').replace(/"/g, '""')}"`,
    `"${m.kind || ''}"`,
    `"${m.mood || ''}"`,
    m.amount || '0',
    m.currency || 'INR',
    `"${m.chapterId || ''}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `lifelens_moments_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportDatasetToJSON(moments, chapters) {
  const data = {
    exportDate: new Date().toISOString(),
    application: 'LifeLens',
    version: '1.0.0',
    totalMoments: moments.length,
    chapters,
    moments
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `lifelens_archive_${Date.now()}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
