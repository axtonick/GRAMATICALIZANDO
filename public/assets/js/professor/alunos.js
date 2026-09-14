import { initProfessorPage } from './base.js';
import { getUsers, getEssays, getPlans, assignPlanToStudent, getStudentPermissions } from '../storage.js';
import { normalizeSearch, safeText } from './utils.js';

const session = initProfessorPage('students');
if (!session) throw new Error('Acesso negado.');

const studentSearch = document.getElementById('studentSearch');
const filterButtons = document.querySelectorAll('[data-filter]');
const studentTableBody = document.querySelector('#studentTable tbody');
const noStudentsMessage = document.getElementById('noStudentsMessage');
const studentModal = document.querySelector('[data-student-modal]');
const studentModalClose = document.querySelectorAll('[data-modal-close]');
const studentModalName = document.getElementById('studentModalName');
const studentModalEmail = document.getElementById('studentModalEmail');
const studentModalType = document.getElementById('studentModalType');
const studentModalDiagnosis = document.getElementById('studentModalDiagnosis');
const studentModalInfo = document.getElementById('studentModalInfo');
const studentPlanSelect = document.getElementById('studentPlanSelect');
const studentPlanStartDate = document.getElementById('studentPlanStartDate');
const studentPlanEndDate = document.getElementById('studentPlanEndDate');
const studentPlanPermissions = document.getElementById('studentPlanPermissions');
const updateStudentPlanBtn = document.getElementById('updateStudentPlanBtn');
const summaryTotal = document.getElementById('summaryTotal');
const summaryActive = document.getElementById('summaryActive');
const summaryInactive = document.getElementById('summaryInactive');
const summaryScore = document.getElementById('summaryScore');
const recentStudentsList = document.getElementById('recentStudentsList');

let currentFilter = 'all';
const users = getUsers();
const essays = getEssays();

const getUserEssayCount = (user) => essays.filter((essay) =>
  (essay.autor && essay.autor === user.email) ||
  (essay.autorId && essay.autorId === user.id)
).length;

const getUserProgress = (user) => {
  const essayCount = getUserEssayCount(user);
  if (user.diagnostico) {
    return Math.min(100, 50 + essayCount * 15);
  }

  return Math.min(55, Math.max(10, essayCount * 12));
};

const getPlanName = (user) => {
  const plan = getPlans().find((item) => item.id === user.plan_id);
  return plan?.name || 'Sem plano';
};

const getPermissionsSummary = (plan) => {
  if (!plan) return 'Sem plano vinculado.';

  const permissions = Object.entries({
    portugues: 'Português',
    redacao: 'Redação',
    videoaulas: 'Videoaulas',
    simulados: 'Simulados',
    material: 'Material',
    cronograma: 'Cronograma'
  }).filter(([key]) => plan.permissions?.[key]).map(([, label]) => label);

  return permissions.length ? permissions.join(', ') : 'Nenhuma permissão ativa.';
};

const getInitials = (name = '') => {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((word) => word[0]?.toUpperCase() || '').join('') || 'A';
};

const renderSummary = () => {
  const total = users.length;
  const active = users.filter((user) => Boolean(user.diagnostico)).length;
  const inactive = total - active;
  const average = total
    ? Math.round(users.reduce((sum, user) => sum + getUserProgress(user), 0) / total)
    : 0;

  summaryTotal.textContent = total;
  summaryActive.textContent = active;
  summaryInactive.textContent = inactive;
  summaryScore.textContent = `${average}%`;
};

const renderRecentStudents = () => {
  const recentUsers = [...users]
    .sort((a, b) => new Date(b.criadoEm || 0) - new Date(a.criadoEm || 0))
    .slice(0, 4);

  recentStudentsList.innerHTML = recentUsers.map((user) => {
    const initials = getInitials(user.nome);
    const created = user.criadoEm ? new Date(user.criadoEm).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }) : 'Sem data';

    return `
      <div class="recent-student-item">
        <span class="recent-student-avatar">${initials}</span>
        <div class="recent-student-info">
          <strong>${safeText(user.nome)}</strong>
          <small>Cadastrado há ${safeText(created)}</small>
        </div>
      </div>
    `;
  }).join('');
};

const renderStudents = () => {
  const searchText = normalizeSearch(studentSearch.value);
  const filtered = users.filter((user) => {
    const matchesSearch = normalizeSearch(user.nome).includes(searchText) || normalizeSearch(user.email).includes(searchText);
    if (!matchesSearch) return false;
    if (currentFilter === 'active') return Boolean(user.diagnostico);
    if (currentFilter === 'inactive') return !user.diagnostico;
    return true;
  });

  if (!filtered.length) {
    studentTableBody.innerHTML = '';
    noStudentsMessage.style.display = 'block';
    return;
  }

  noStudentsMessage.style.display = 'none';
  studentTableBody.innerHTML = filtered.map((user) => {
    const count = getUserEssayCount(user);
    const progress = getUserProgress(user);
    const diagnosisLabel = user.diagnostico ? 'Concluído' : 'Pendente';
    const userName = safeText(user.nome);
    const initials = getInitials(user.nome);

    return `
      <tr>
        <td><input type="checkbox" aria-label="Selecionar aluno ${userName}" /></td>
        <td>
          <div class="student-cell">
            <span class="recent-student-avatar">${initials}</span>
            <div>
              <strong>${userName}</strong>
            </div>
          </div>
        </td>
        <td>${safeText(user.email)}</td>
        <td>${safeText(getPlanName(user))}</td>
        <td>${diagnosisLabel}</td>
        <td>${count}</td>
        <td class="progress-cell">
          <div class="progress-track">
            <span class="progress-fill" style="width: ${progress}%"></span>
          </div>
          <small>${progress}%</small>
        </td>
        <td><button type="button" class="btn btn-secondary" data-view-student="${user.email}">Ver perfil</button></td>
      </tr>
    `;
  }).join('');

  studentTableBody.querySelectorAll('[data-view-student]').forEach((button) => {
    button.addEventListener('click', (event) => {
      const email = event.currentTarget.dataset.viewStudent;
      const user = users.find((item) => item.email === email);
      if (!user) return;
      const plans = getPlans();
      studentModalName.textContent = safeText(user.nome);
      studentModalEmail.textContent = safeText(user.email);
      studentModalType.textContent = safeText(user.tipo || 'Cliente');
      studentModalDiagnosis.textContent = user.diagnostico ? 'Diagnóstico disponível' : 'Sem diagnóstico';
      studentModalInfo.textContent = user.diagnostico
        ? `Objetivo: ${user.diagnostico.objetivo || '—'} · Prova: ${user.diagnostico.prova || '—'} · Horas: ${user.diagnostico.horas_semanais || '—'}`
        : 'Nenhuma informação extra disponível.';

      studentPlanSelect.innerHTML = ['<option value="">Sem plano</option>']
        .concat(plans.map((plan) => `<option value="${plan.id}">${safeText(plan.name)}</option>`))
        .join('');
      studentPlanSelect.value = user.plan_id || '';
      studentPlanStartDate.value = user.plan_start_date || '';
      studentPlanEndDate.value = user.plan_end_date || '';

      const selectedPlan = plans.find((plan) => plan.id === user.plan_id);
      studentPlanPermissions.textContent = getPermissionsSummary(selectedPlan);
      updateStudentPlanBtn.dataset.studentId = user.id || user.email;
      studentModal.classList.remove('hidden');
    });
  });
};

updateStudentPlanBtn?.addEventListener('click', () => {
  const studentId = updateStudentPlanBtn.dataset.studentId;
  const nextPlanId = studentPlanSelect.value || null;
  const startDate = studentPlanStartDate.value || '';
  const endDate = studentPlanEndDate.value || '';

  if (!studentId) return;
  if (startDate && endDate && endDate < startDate) {
    window.alert('A data final deve ser igual ou posterior à data inicial.');
    return;
  }

  assignPlanToStudent(studentId, nextPlanId, {
    startDate,
    endDate
  });

  renderSummary();
  renderStudents();
  studentModal.classList.add('hidden');
});

studentSearch.addEventListener('input', renderStudents);

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    currentFilter = button.dataset.filter;
    renderStudents();
  });
});

studentModalClose.forEach((button) => {
  button.addEventListener('click', () => studentModal.classList.add('hidden'));
});

renderSummary();
renderRecentStudents();
renderStudents();
