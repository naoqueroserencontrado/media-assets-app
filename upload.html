// Configurações do seu Repositório
const GITHUB_CONFIG = {
  owner: 'naoqueroserencontrado',
  repo: 'media-assets-app',
  path: 'data/media.json'
};

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

  uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = uploadForm.querySelector('.btn-submit');
    submitBtn.textContent = 'Salvando no repositório...';
    submitBtn.disabled = true;

    const title = document.getElementById('title').value.trim();
    const type = document.getElementById('media-type').value;
    const sourceType = sourceTypeSelect.value;
    const originalSource = document.getElementById('original-source')?.value.trim() || null;
    const rawTags = document.getElementById('media-tags')?.value || '';

    const tags = rawTags.split(',')
                        .map(t => t.trim().toLowerCase())
                        .filter(t => t.length > 0);

    const newItem = {
      id: Date.now(),
      title: title,
      type: type,
      sourceType: sourceType,
      url: mediaUrlInput.value.trim(),
      originalSourceUrl: originalSource,
      tags: tags,
      createdAt: new Date().toISOString()
    };

    try {
      await saveToGitHubRepository(newItem);
      alert('Mídia salva com sucesso e fixada no repositório!');
      window.location.href = 'index.html';
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar no GitHub: ' + error.message);
      submitBtn.textContent = 'Salvar Mídia';
      submitBtn.disabled = false;
    }
  });
});

// Função que faz o Fetch e o Update direto no GitHub via REST API
async function saveToGitHubRepository(newItem) {
  // 1. Obtém o token do localStorage ou solicita ao usuário
  let token = localStorage.getItem('github_pat');

  if (!token) {
    token = prompt('Insira seu Personal Access Token do GitHub para autorizar o salvamento:');
    if (!token) {
      throw new Error('O Token de Acesso é obrigatório para salvar.');
    }
    token = token.trim();
    localStorage.setItem('github_pat', token);
  }

  const url = `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.path}`;
  const headers = {
    'Authorization': `token ${token}`,
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json'
  };

  // 2. Busca o arquivo atual no GitHub para obter a lista existente e o "sha"
  const getResponse = await fetch(url, { headers });
  
  if (getResponse.status === 401) {
    localStorage.removeItem('github_pat');
    throw new Error('Token inválido ou expirado. Tente novamente.');
  }

  if (!getResponse.ok) {
    throw new Error('Não foi possível acessar o arquivo no repositório.');
  }

  const fileData = await getResponse.json();
  
  // Decodifica o conteúdo Base64 retornado pelo GitHub
  const currentContentText = decodeURIComponent(escape(atob(fileData.content)));
  const currentList = JSON.parse(currentContentText || '[]');

  // 3. Adiciona o novo item à lista
  currentList.push(newItem);

  // 4. Re-codifica o JSON atualizado em Base64
  const updatedContentText = JSON.stringify(currentList, null, 2);
  const updatedContentBase64 = btoa(unescape(encodeURIComponent(updatedContentText)));

  // 5. Faz a requisição PUT para atualizar o arquivo fixo no repositório
  const putResponse = await fetch(url, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify({
      message: `Adiciona nova mídia: ${newItem.title}`,
      content: updatedContentBase64,
      sha: fileData.sha
    })
  });

  if (!putResponse.ok) {
    throw new Error('Falha ao atualizar os dados no GitHub.');
  }
}
