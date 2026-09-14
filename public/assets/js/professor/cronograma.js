import { initProfessorPage } from './base.js';
import { getStudyPlan, saveStudyPlan } from '../storage.js';

initProfessorPage('cronograma');
const form = document.getElementById('planForm');
const stagesList = document.getElementById('stagesList');
const emptyStages = document.getElementById('emptyStages');
let plan = getStudyPlan();
const resourceTypes = ['PDF', 'Link', 'Videoaula', 'Imagem'];
const maxResourceSize = 20 * 1024 * 1024;
let stages = Array.isArray(plan.etapas) ? plan.etapas.map((stage) => ({ ...stage, recursoTipo: resourceTypes.includes(stage.recursoTipo) ? stage.recursoTipo : 'PDF' })) : [];

const escapeHtml = (value = '') => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
const newStage = () => ({ id: `stage-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, titulo: '', materia: 'Português', data: '', duracao: '50 min', descricao: '', recursoTipo: 'PDF', recursoNome: '', recursoLink: '', concluido: false });
const resourceLabel = { PDF: 'Endereço do PDF', Link: 'Endereço do link', Videoaula: 'Link da videoaula', Imagem: 'Endereço da imagem' };
const readFileAsDataUrl = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => resolve(reader.result));
  reader.addEventListener('error', () => reject(new Error('Não foi possível ler o arquivo.')));
  reader.readAsDataURL(file);
});

const renderStages = () => {
  emptyStages.classList.toggle('hidden', stages.length > 0);
  stagesList.innerHTML = stages.map((stage, index) => {
    const isUpload = stage.recursoTipo === 'PDF' || stage.recursoTipo === 'Imagem';
    const accept = stage.recursoTipo === 'PDF' ? 'application/pdf,.pdf' : 'image/*';
    const resourceField = isUpload
      ? `<input data-resource-file type="file" accept="${accept}"><small class="field-help">${stage.recursoLink ? 'Arquivo carregado.' : 'Selecione um arquivo.'} Limite de 20 MB.</small>`
      : `<input data-field="recursoLink" type="url" value="${escapeHtml(stage.recursoLink)}" placeholder="https://...">`;
    return `<article class="block-field-card" data-stage-id="${escapeHtml(stage.id)}"><div class="block-editor-header"><div><h3>Etapa ${index + 1}</h3><p>O aluno poderá marcar esta etapa como feita.</p></div><button type="button" class="btn btn-secondary" data-remove-stage>Remover</button></div><div class="block-setup-grid"><div class="input-group"><label>O que estudar? *</label><input data-field="titulo" value="${escapeHtml(stage.titulo)}" placeholder="Ex.: Funções da linguagem"></div><div class="input-group"><label>Matéria</label><input data-field="materia" value="${escapeHtml(stage.materia)}" placeholder="Ex.: Português"></div><div class="input-group"><label>Data da etapa</label><input data-field="data" type="date" value="${escapeHtml(stage.data)}"></div><div class="input-group"><label>Duração estimada</label><input data-field="duracao" value="${escapeHtml(stage.duracao)}" placeholder="Ex.: 60 min"></div></div><div class="input-group"><label>Orientação</label><textarea data-field="descricao" rows="2" placeholder="Explique como estudar esta etapa.">${escapeHtml(stage.descricao)}</textarea></div><div class="block-setup-grid"><div class="input-group"><label>Recurso</label><select data-field="recursoTipo">${resourceTypes.map((type) => `<option value="${type}" ${stage.recursoTipo === type ? 'selected' : ''}>${type}</option>`).join('')}</select></div><div class="input-group"><label>Nome do recurso</label><input data-field="recursoNome" value="${escapeHtml(stage.recursoNome)}" placeholder="Ex.: Aula 1 ou PDF de revisão"></div><div class="input-group"><label>${resourceLabel[stage.recursoTipo] || 'Endereço do recurso'}</label>${resourceField}</div></div></article>`;
  }).join('');
  document.getElementById('summaryStages').textContent = String(stages.length);
};

const syncField = (event) => { const card = event.target.closest('[data-stage-id]'); if (!card) return; const stage = stages.find((item) => item.id === card.dataset.stageId); if (stage && event.target.dataset.field) stage[event.target.dataset.field] = event.target.value; };
stagesList.addEventListener('input', syncField);
stagesList.addEventListener('change', (event) => {
  syncField(event);
  if (event.target.dataset.field === 'recursoTipo') renderStages();
});
stagesList.addEventListener('click', (event) => { const button = event.target.closest('[data-remove-stage]'); if (!button) return; const id = button.closest('[data-stage-id]').dataset.stageId; stages = stages.filter((stage) => stage.id !== id); renderStages(); });
stagesList.addEventListener('change', async (event) => {
  const input = event.target.closest('[data-resource-file]');
  if (!input || !input.files[0]) return;
  const stage = stages.find((item) => item.id === input.closest('[data-stage-id]').dataset.stageId);
  const file = input.files[0];
  const isPdf = stage.recursoTipo === 'PDF';
  const validType = isPdf ? file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf') : file.type.startsWith('image/');
  if (!validType) { window.alert(`Selecione ${isPdf ? 'um PDF' : 'uma imagem'} válido.`); input.value = ''; return; }
  if (file.size > maxResourceSize) { window.alert('O arquivo deve ter no máximo 20 MB.'); input.value = ''; return; }
  try { stage.recursoLink = await readFileAsDataUrl(file); stage.recursoNome = stage.recursoNome || file.name; renderStages(); } catch (error) { window.alert(error.message); }
});
document.getElementById('addStageBtn').addEventListener('click', () => { stages.push(newStage()); renderStages(); stagesList.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); });
document.getElementById('planName').addEventListener('input', (event) => { document.getElementById('summaryName').textContent = event.target.value.trim() || 'Sem nome'; });
['planStart', 'planEnd'].forEach((id) => document.getElementById(id).addEventListener('change', () => { const start = document.getElementById('planStart').value; const end = document.getElementById('planEnd').value; document.getElementById('summaryPeriod').textContent = start && end ? `${start} até ${end}` : 'Defina as datas'; }));

form.addEventListener('submit', (event) => { event.preventDefault(); const data = new FormData(form); const inicio = String(data.get('inicio') || ''); const fim = String(data.get('fim') || ''); if (!String(data.get('nome') || '').trim() || !inicio || !fim) return window.alert('Preencha o nome e o período do cronograma.'); if (fim < inicio) return window.alert('A data final deve ser posterior à data inicial.'); if (!stages.length) return window.alert('Adicione pelo menos uma etapa.'); if (stages.some((stage) => !stage.titulo.trim())) return window.alert('Preencha o que estudar em todas as etapas.'); saveStudyPlan({ ...plan, id: plan.id || `plan-${Date.now()}`, nome: String(data.get('nome')).trim(), objetivo: String(data.get('objetivo') || '').trim(), inicio, fim, etapas: stages }); window.alert('Cronograma salvo com sucesso.'); });

document.getElementById('planName').value = plan.nome === 'Plano de estudos' ? '' : plan.nome || '';
document.getElementById('planObjective').value = plan.objetivo || '';
document.getElementById('planStart').value = plan.inicio || '';
document.getElementById('planEnd').value = plan.fim || '';
document.getElementById('summaryName').textContent = plan.nome === 'Plano de estudos' ? 'Sem nome' : plan.nome || 'Sem nome';
renderStages();
