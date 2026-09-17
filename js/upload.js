document.addEventListener('DOMContentLoaded', () => {
  const sourceTypeSelect = document.getElementById('source-type');
  const urlGroup = document.getElementById('url-input-group');
  const fileGroup = document.getElementById('file-input-group');
  const mediaUrlInput = document.getElementById('media-url');
  const mediaFileInput = document.getElementById('media-file');
  const uploadForm = document.getElementById('upload-form');

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

    if (!title) {
      alert('Por favor, informe um título.');
      return;
    }

    let mediaItem = {
      id: Date.now(),
      title: title,
      type: type,
      sourceType: sourceType,
      createdAt: new Date().toISOString()
    };

    if (sourceType === 'url') {
      const url = mediaUrlInput.value.trim();
      if (!url) {
        alert('Por favor, informe uma URL válida.');
        return;
      }
      mediaItem.url = url;

      saveMediaItem(mediaItem);
      window.location.href = 'index.html';

    } else if (sourceType === 'drive') {
      alert('A integração com o Google Drive será configurada na próxima etapa.');
    }
  });

  function saveMediaItem(item) {
    const existing = JSON.parse(localStorage.getItem('my_media_items') || '[]');
    existing.push(item);
    localStorage.setItem('my_media_items', JSON.stringify(existing));
  }
});
