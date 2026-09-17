document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('media-grid');
  const mediaItems = JSON.parse(localStorage.getItem('my_media_items') || '[]');

  if (mediaItems.length === 0) {
    grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #888;">Nenhuma mídia cadastrada ainda. Clique em "Adicionar Mídia" para começar.</p>';
    return;
  }

  grid.innerHTML = '';

  mediaItems.forEach(item => {
    const card = document.createElement('div');
    card.className = 'media-card';

    let mediaElement = '';

    if (item.type === 'image') {
      mediaElement = `<img src="${item.url}" alt="${item.title}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x200?text=Erro+ao+carregar';">`;
    } else if (item.type === 'video') {
      mediaElement = `
        <video controls>
          <source src="${item.url}" type="video/mp4">
          Seu navegador não suporta a exibição deste vídeo.
        </video>
      `;
    }

    card.innerHTML = `
      ${mediaElement}
      <div class="info">
        <h3>${item.title}</h3>
        <small style="color: #888;">Origem: ${item.sourceType.toUpperCase()}</small>
      </div>
    `;

    grid.appendChild(card);
  });
});
