document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.getElementById('media-grid');

  try {
    grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #888;">Carregando galeria...</p>';

    // Adiciona um parâmetro nocache para garantir que pegamos os dados mais recentes sem cache local do navegador
    const response = await fetch(`data/media.json?nocache=${Date.now()}`);
    
    if (!response.ok) {
      throw new Error('Erro ao carregar dados do repositório.');
    }

    const mediaItems = await response.json();

    if (!mediaItems || mediaItems.length === 0) {
      grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #888;">Nenhuma mídia cadastrada ainda.</p>';
      return;
    }

    grid.innerHTML = '';

    mediaItems.forEach(item => {
      const card = document.createElement('div');
      card.className = 'media-card';

      let mediaElement = '';
      if (item.type === 'image') {
        mediaElement = `<img src="${item.url}" alt="${item.title}" loading="lazy" onerror="this.onerror=null; this.src='https://via.placeholder.com/300x200?text=Erro+ao+Carregar';">`;
      } else if (item.type === 'video') {
        mediaElement = `
          <video controls style="width: 100%; height: 200px; object-fit: cover;">
            <source src="${item.url}">
            Seu navegador não suporta este vídeo.
          </video>
        `;
      }

      const tagsHtml = item.tags && item.tags.length > 0
        ? `<div class="tags-container" style="margin-top: 0.5rem;">
             ${item.tags.map(t => `<span style="background:#444; color:#fff; padding:2px 6px; border-radius:4px; font-size:0.75rem; margin-right:4px;">#${t}</span>`).join('')}
           </div>`
        : '';

      const sourceLinkHtml = item.originalSourceUrl 
        ? `<p style="margin-top: 0.5rem;"><a href="${item.originalSourceUrl}" target="_blank" style="color: #007bff; text-decoration: none; font-size: 0.85rem;">🔗 Ver Fonte Original</a></p>`
        : '';

      card.innerHTML = `
        ${mediaElement}
        <div class="info" style="padding: 1rem;">
          <h3>${item.title}</h3>
          ${tagsHtml}
          ${sourceLinkHtml}
        </div>
      `;

      grid.appendChild(card);
    });

  } catch (error) {
    console.error(error);
    grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #f88;">Erro ao carregar os dados fixos do repositório.</p>';
  }
});
