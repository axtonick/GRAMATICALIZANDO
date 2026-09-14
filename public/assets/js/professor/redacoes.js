import { initProfessorPage } from './base.js';
import { getEssays, updateEssay } from '../storage.js';
import { normalizeSearch, formatDate, safeText, timeAgo } from './utils.js';

const session = initProfessorPage('essays');
if (!session) throw new Error('Acesso negado.');

const essaySearch = document.getElementById('essaySearch');
const filterButtons = document.querySelectorAll('[data-filter]');
const essayTableBody = document.getElementById('essayTableBody');
const noEssaysMessage = document.getElementById('noEssaysMessage');
const priorityList = document.getElementById('priorityList');
const recentActivitiesList = document.getElementById('recentActivitiesList');
const summaryTotal = document.getElementById('summaryTotal');
const summaryPending = document.getElementById('summaryPending');
const summaryReviewed = document.getElementById('summaryReviewed');
const summaryAverage = document.getElementById('summaryAverage');

const modal = document.querySelector('[data-prof-correction-modal]');
const modalCloseButtons = document.querySelectorAll('[data-prof-correction-close]');
const profCorrectionForm = document.getElementById('profCorrectionForm');
const profCorrectionPhoto = document.getElementById('profCorrectionPhoto');
const profCorrectionPreview = document.getElementById('profCorrectionPreview');
const profCorrectionAluno = document.getElementById('profCorrectionAluno');
const profCorrectionEmail = document.getElementById('profCorrectionEmail');
const profCorrectionTema = document.getElementById('profCorrectionTema');
const profCorrectionDate = document.getElementById('profCorrectionDate');
const profOriginalImage = document.getElementById('profOriginalImage');
const profDownloadOriginal = document.getElementById('profDownloadOriginal');
const profScore = document.getElementById('profScore');
const profFeedbackText = document.getElementById('profFeedbackText');
const profReopenBtn = document.getElementById('profReopenBtn');
const profSubmitBtn = document.getElementById('profSubmitBtn');

let activeFilter = 'all';
let activeEssayId = null;
let essays = getEssays();

const normalizeStatus = (value) => {
  if (!value) return 'pendente';
  const normalized = String(value).trim().toLowerCase();
  if (normalized === 'concluido' || normalized === 'corrigida' || normalized === 'corrigido') return 'concluido';
  if (normalized === 'em revisao' || normalized === 'em_revisao' || normalized === 'revisao') return 'em_revisao';
  return 'pendente';
};

const getStatusLabel = (status) => {
  if (status === 'concluido') return 'Corrigida';
  if (status === 'em_revisao') return 'Em revisão';
  return 'Pendente';
};

const getStatusClass = (status) => {
  if (status === 'concluido') return 'concluido';
  if (status === 'em_revisao') return 'pendente';
  return 'pendente';
};

const getInitials = (name = '') => {
  const parts = String(name || '').trim().split(/\s+/).slice(0, 2);
  return parts.map((word) => word[0]?.toUpperCase() || '').join('') || 'A';
};

const getEssayDisplay = (essay) => {
  return essay.tema_da_redacao || essay.tema_gerado || 'Tema não informado';
};

const getStudentName = (essay) => {
  return safeText(essay.autor || 'Aluno');
};

const getEssayPriority = (essay) => {
  const status = normalizeStatus(essay.status);
  if (status === 'pendente') return 1;
  if (status === 'em_revisao') return 2;
  return 3;
};

const getAverageNota = (items) => {
  const notes = items
    .map((item) => Number(item.feedback?.nota ?? item.nota))
    .filter((value) => Number.isFinite(value));

  if (!notes.length) return 0;
  return Number((notes.reduce((sum, value) => sum + value, 0) / notes.length).toFixed(1));
};

const renderSummary = () => {
  const total = essays.length;
  const pending = essays.filter((essay) => normalizeStatus(essay.status) !== 'concluido').length;
  const reviewed = essays.filter((essay) => normalizeStatus(essay.status) === 'concluido').length;
  const average = getAverageNota(essays);

  summaryTotal.textContent = total;
  summaryPending.textContent = pending;
  summaryReviewed.textContent = reviewed;
  summaryAverage.textContent = `${average}`;
};

const renderPriorityList = () => {
  const pending = essays
    .filter((essay) => normalizeStatus(essay.status) !== 'concluido')
    .sort((a, b) => new Date(a.criadoEm || 0) - new Date(b.criadoEm || 0))
    .slice(0, 3);

  if (!pending.length) {
    priorityList.innerHTML = '<div class="activity-item"><strong>Nenhuma redação prioritária</strong><p>Todos os envios já estão concluídos.</p></div>';
    return;
  }

  priorityList.innerHTML = pending.map((essay) => {
    const initials = getInitials(essay.autor);
    const display = getEssayDisplay(essay);
    const statusLabel = getStatusLabel(normalizeStatus(essay.status));

    return `
      <div class="recent-student-item">
        <span class="recent-student-avatar">${initials}</span>
        <div class="recent-student-info">
          <strong>${getStudentName(essay)}</strong>
          <small>${safeText(display)}</small>
        </div>
        <span class="status-chip ${getStatusClass(normalizeStatus(essay.status))}">${statusLabel}</span>
      </div>
    `;
  }).join('');
};

const renderRecentActivities = () => {
  const recent = [...essays]
    .sort((a, b) => new Date(b.criadoEm || 0) - new Date(a.criadoEm || 0))
    .slice(0, 4);

  recentActivitiesList.innerHTML = recent.map((essay) => `
    <div class="recent-student-item">
      <span class="recent-student-avatar">${getInitials(essay.autor)}</span>
      <div class="recent-student-info">
        <strong>${getStudentName(essay)}</strong>
        <small>${safeText(getEssayDisplay(essay))}</small>
      </div>
      <small>${timeAgo(essay.criadoEm)}</small>
    </div>
  `).join('');
};

const renderEssays = () => {
  const searchText = normalizeSearch(essaySearch.value);
  const filtered = essays.filter((essay) => {
    const text = normalizeSearch(`${essay.tema_da_redacao || ''} ${essay.tema_gerado || ''} ${essay.autor || ''} ${essay.autorId || ''}`);
    const matchesSearch = !searchText || text.includes(searchText);
    if (!matchesSearch) return false;

    const status = normalizeStatus(essay.status);
    if (activeFilter === 'pendente') return status === 'pendente';
    if (activeFilter === 'concluido') return status === 'concluido';
    if (activeFilter === 'em_revisao') return status === 'em_revisao';
    return true;
  });

  if (!filtered.length) {
    essayTableBody.innerHTML = '';
    noEssaysMessage.style.display = 'block';
    return;
  }

  noEssaysMessage.style.display = 'none';

  essayTableBody.innerHTML = filtered.map((essay) => {
    const status = normalizeStatus(essay.status);
    const nota = essay.feedback?.nota ?? essay.nota ?? '—';
    const prazo = essay.dataPrazo || '—';
    const statusLabel = getStatusLabel(status);
    const buttonLabel = status === 'concluido' ? 'Ver' : status === 'em_revisao' ? 'Revisar' : 'Corrigir';
    const buttonClass = status === 'concluido' ? 'btn btn-secondary' : 'btn btn-primary';

    return `
      <tr>
        <td><input type="checkbox" aria-label="Selecionar redação de ${safeText(essay.autor || 'Aluno')}" /></td>
        <td>
          <div class="student-cell">
            <span class="recent-student-avatar">${getInitials(essay.autor)}</span>
            <div>
              <strong>${getStudentName(essay)}</strong>
            </div>
          </div>
        </td>
        <td>${safeText(getEssayDisplay(essay))}</td>
        <td>${formatDate(essay.criadoEm)}</td>
        <td><span class="status-chip ${getStatusClass(status)}">${statusLabel}</span></td>
        <td>${nota}</td>
        <td>${safeText(prazo)}</td>
        <td>
          <div class="action-buttons">
            <button type="button" class="${buttonClass}" data-action="open" data-essay-id="${essay.id}">${buttonLabel}</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  essayTableBody.querySelectorAll('[data-action="open"]').forEach((button) => {
    button.addEventListener('click', (event) => {
      const essayId = event.currentTarget.dataset.essayId;
      const essay = essays.find((item) => item.id === essayId);
      if (!essay) return;
      openCorrectionModal(essay);
    });
  });
};

const resetModal = () => {
  profCorrectionPhoto.value = '';
  profCorrectionPreview.innerHTML = '';
  profScore.value = '';
  profFeedbackText.value = '';
  profOriginalImage.innerHTML = 'Sem imagem disponível';
  profDownloadOriginal.href = '#';
  profDownloadOriginal.style.display = 'none';
  profReopenBtn.style.display = 'none';
  profSubmitBtn.disabled = false;
  profSubmitBtn.textContent = 'Enviar correção e concluir';
};

const openCorrectionModal = (essay) => {
  activeEssayId = essay.id;
  resetModal();

  profCorrectionAluno.textContent = getStudentName(essay);
  profCorrectionEmail.textContent = safeText(essay.email || essay.autor || '—');
  profCorrectionTema.textContent = safeText(getEssayDisplay(essay));
  profCorrectionDate.textContent = formatDate(essay.criadoEm);

  if (essay.foto || essay.imagemBase64) {
    const imageSrc = essay.foto || essay.imagemBase64;
    profOriginalImage.innerHTML = `<img src="${imageSrc}" alt="Redação original" />`;
    profDownloadOriginal.href = imageSrc;
    profDownloadOriginal.style.display = 'inline-flex';
  }

  profScore.value = essay.feedback?.nota ?? essay.nota ?? '';
  profFeedbackText.value = essay.feedback?.message || essay.feedback?.messageText || '';

  if (normalizeStatus(essay.status) === 'concluido') {
    profReopenBtn.style.display = 'inline-flex';
  }

  modal.classList.remove('hidden');
};

const updatePreview = (file) => {
  if (!file) {
    profCorrectionPreview.innerHTML = '';
    return;
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    profCorrectionPreview.innerHTML = `<img src="${event.target.result}" alt="Foto da correção" />`;
  };
  reader.readAsDataURL(file);
};

profCorrectionPhoto.addEventListener('change', (event) => {
  updatePreview(event.target.files[0]);
});

profCorrectionForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!activeEssayId) return;
  if (!window.confirm('Deseja concluir a correção e salvar as alterações?')) return;

  const file = profCorrectionPhoto.files[0];
  const nota = profScore.value;
  const mensagem = profFeedbackText.value.trim();

  const applyUpdate = (fotoData) => {
    profSubmitBtn.disabled = true;
    profSubmitBtn.textContent = 'Enviando...';

    const feedback = {
      message: mensagem || '',
      foto: fotoData || '',
      nota: nota ? Number(nota) : null
    };

    updateEssay(activeEssayId, {
      feedback,
      status: 'concluido',
      corrigidoEm: new Date().toISOString()
    });

    setTimeout(() => {
      modal.classList.add('hidden');
      essays = getEssays();
      renderSummary();
      renderPriorityList();
      renderRecentActivities();
      renderEssays();
    }, 300);
  };

  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => applyUpdate(event.target.result);
    reader.readAsDataURL(file);
  } else {
    const essay = essays.find((item) => item.id === activeEssayId);
    applyUpdate(essay?.feedback?.foto || '');
  }
});

profReopenBtn.addEventListener('click', () => {
  if (!activeEssayId) return;
  updateEssay(activeEssayId, { status: 'pendente' });
  modal.classList.add('hidden');
  essays = getEssays();
  renderSummary();
  renderPriorityList();
  renderRecentActivities();
  renderEssays();
});

modalCloseButtons.forEach((button) => {
  button.addEventListener('click', () => modal.classList.add('hidden'));
});

essaySearch.addEventListener('input', renderEssays);
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    activeFilter = button.dataset.filter;
    renderEssays();
  });
});

essays = getEssays();
renderSummary();
renderPriorityList();
renderRecentActivities();
renderEssays();
