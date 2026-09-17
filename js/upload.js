document.addEventListener('DOMContentLoaded', () => {
  const uploadForm = document.getElementById('upload-form');
  const sourceTypeSelect = document.getElementById('source-type');
  const urlGroup = document.getElementById('url-input-group');
  const fileGroup = document.getElementById('file-input-group');
  const mediaUrlInput = document.getElementById('media-url');
  const mediaFileInput = document.getElementById('media-file');

  sourceTypeSelect.addEventListener('change', (e) => {
    if (e.target.value === 'url') {
      urlGroup.classList.remove('hidden');
      fileGroup.classList.add('hidden');
      mediaUrlInput.required = true;
      mediaFileInput.required = false;
    } else {
      urlGroup.classList.add('hidden');
      fileGroup.classList.remove('hidden');
      mediaUrlInput.required = false;
      mediaFileInput.required = true;
    }
  });

  uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value.trim();
    const type = document.getElementById('media-type').value;
    const sourceType = sourceTypeSelect.value;
    const originalSource = document.getElementById('original-source').value.trim();
    const rawTags = document.getElementById('media-tags').value;

    // Processa a string de tags em um array de palavras sem espaços extras
    const tags = rawTags.split(',')
                        .map(tag => tag.trim().toLowerCase())
                        .filter(tag => tag.length > 0);

    let mediaItem = {
      id: Date.now(),
      title: title,
      type: type,
      sourceType: sourceType,
      originalSourceUrl: originalSource || null,
      tags: tags,
      createdAt: new Date().toISOString()
    };

    if (sourceType === 'url') {
      mediaItem.url = mediaUrlInput.value.trim();
      saveMediaItem(mediaItem);
      window.location.href = 'index.html';
    } else {
      alert('A integração com o Google Drive processará os arquivos nesta modalidade.');
    }
  });

  function saveMediaItem(item) {
    const existing = JSON.parse(localStorage.getItem('my_media_items') || '[]');
    existing.push(item);
    localStorage.setItem('my_media_items', JSON.stringify(existing));
  }
});
