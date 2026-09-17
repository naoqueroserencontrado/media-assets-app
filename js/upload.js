document.addEventListener('DOMContentLoaded', () => {
  const sourceTypeSelect = document.getElementById('source-type');
  const urlGroup = document.getElementById('url-input-group');
  const fileGroup = document.getElementById('file-input-group');
  const uploadForm = document.getElementById('upload-form');

  // Alterna a exibição entre URL externa e Arquivo do Drive
  sourceTypeSelect.addEventListener('change', (e) => {
    if (e.target.value === 'url') {
      urlGroup.classList.remove('hidden');
      fileGroup.classList.add('hidden');
    } else {
      urlGroup.classList.add('hidden');
      fileGroup.classList.remove('hidden');
    }
  });

  // Manipulação do envio
  uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const type = document.getElementById('media-type').value;
    const sourceType = sourceTypeSelect.value;

    let mediaItem = {
      id: Date.now(),
      title: title,
      type: type,
      sourceType: sourceType,
      createdAt: new Date().toISOString()
    };

    if (sourceType === 'url') {
      const url = document.getElementById('media-url').value;
      mediaItem.url = url;

      // Salva no localStorage para testes locais imediatos
      saveMediaItem(mediaItem);
      window.location.href = 'index.html';

    } else if (sourceType === 'drive') {
      // Estrutura reservada para a API do Google Drive
      alert('A funcionalidade de upload direto para o Google Drive está preparada no formulário e será conectada à API do Google na próxima fase.');
    }
  });

  function saveMediaItem(item) {
    const existing = JSON.parse(localStorage.getItem('my_media_items') || '[]');
    existing.push(item);
    localStorage.setItem('my_media_items', JSON.stringify(existing));
  }
});
