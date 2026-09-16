import { initProfessorPage } from './base.js';
import { getMaterials, createMaterial, deleteMaterial } from '../storage.js';

initProfessorPage('materiais');

const materialsContainer = document.getElementById('professorMaterialsList');
const formAdd = document.getElementById('formAddMaterial');
const maxFileSize = 20 * 1024 * 1024;

const readFileAsDataUrl = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => resolve(reader.result));
  reader.addEventListener('error', () => reject(new Error('Não foi possível ler o PDF.')));
  reader.readAsDataURL(file);
});

function renderProfessorMaterials() {
  if (!materialsContainer) return;
  const materials = getMaterials();

  if (materials.length === 0) {
    materialsContainer.innerHTML = '<div class="activity-item">Nenhum material cadastrado.</div>';
    return;
  }

  materialsContainer.innerHTML = materials.map(mat => `
    <article class="activity-item" style="display: flex; justify-content: space-between; align-items: center;">
      <div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <span class="video-lesson-badge recorded">${mat.categoria}</span>
          <span style="font-size: 0.8rem; color: #7c3aed; font-weight: 700;">${mat.formato} (${mat.tamanho})</span>
        </div>
        <strong style="display: block; margin-top: 4px; font-size: 1rem;">${mat.titulo}</strong>
        <p style="margin: 2px 0 0; font-size: 0.85rem; color: #6b607d;">${mat.descricao}</p>
      </div>
      <button 
        data-del-id="${mat.id}" 
        class="btn-del-mat"
        style="background: #fee2e2; color: #dc2626; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.85rem;"
      >
        Excluir
      </button>
    </article>
  `).join('');

  materialsContainer.querySelectorAll('.btn-del-mat').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-del-id');
      deleteMaterial(id);
      renderProfessorMaterials();
    });
  });
}

if (formAdd) {
  formAdd.addEventListener('submit', async (e) => {
    e.preventDefault();
    const titulo = document.getElementById('matTitulo').value.trim();
    const categoria = document.getElementById('matCategoria').value;
    const descricao = document.getElementById('matDescricao').value.trim();
    const arquivo = document.getElementById('matArquivo').files[0];

    if (!titulo || !arquivo) return window.alert('Informe o título e selecione um arquivo PDF.');
    if (arquivo.type !== 'application/pdf' && !arquivo.name.toLowerCase().endsWith('.pdf')) return window.alert('O arquivo precisa ser um PDF.');
    if (arquivo.size > maxFileSize) return window.alert('O PDF deve ter no máximo 20 MB.');

    let arquivoData;
    try {
      arquivoData = await readFileAsDataUrl(arquivo);
    } catch (error) {
      return window.alert(error.message);
    }

    createMaterial({
      id: 'mat-' + Date.now(),
      titulo,
      categoria,
      descricao: descricao || 'Material didático disponibilizado pelo professor.',
      formato: 'PDF',
      tamanho: `${(arquivo.size / (1024 * 1024)).toFixed(2)} MB`,
      data: new Date().toLocaleDateString('pt-BR'),
      link: arquivoData,
      nomeArquivo: arquivo.name
    });

    formAdd.reset();
    renderProfessorMaterials();
  });
}

document.addEventListener('DOMContentLoaded', renderProfessorMaterials);
renderProfessorMaterials();
