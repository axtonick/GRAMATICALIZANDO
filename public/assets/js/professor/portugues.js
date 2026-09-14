import { initProfessorPage } from './base.js';
import { getContents, deleteContent, updateContent, getContentCompletionEntries } from '../storage.js';

const session = initProfessorPage('portugues');
if (!session) throw new Error('Acesso negado.');

const listEl = document.getElementById('contentList');
const createBtn = document.getElementById('createContentBtn');
const searchInput = document.getElementById('contentSearchInput');
const filterButtons = [...document.querySelectorAll('.filter-pill')];
const summaryContentTotal = document.getElementById('summaryContentTotal');
const summaryExercises = document.getElementById('summaryExercises');
const summaryLessons = document.getElementById('summaryLessons');
const summaryCompletion = document.getElementById('summaryCompletion');
const contentCompletionModal = document.querySelector('[data-content-completions-modal]');
const contentCompletionTitle = document.getElementById('contentCompletionTitle');
const contentCompletionSummary = document.getElementById('contentCompletionSummary');
const contentCompletionList = document.getElementById('contentCompletionList');
const contentCompletionCloseButtons = document.querySelectorAll('[data-close-content-completions]');

const typeLabels = {
	aula: 'Aula',
	exercicio: 'Exercício',
	material: 'Material'
};

const escapeHtml = (value = '') => String(value)
	.replace(/&/g, '&amp;')
	.replace(/</g, '&lt;')
	.replace(/>/g, '&gt;')
	.replace(/\"/g, '&quot;')
	.replace(/'/g, '&#039;');

const getInitials = (name = '') => {
	const parts = String(name).trim().split(/\s+/).slice(0, 2);
	return parts.map((word) => word[0]?.toUpperCase() || '').join('') || 'A';
};

const typeIcons = {
	aula: '📘',
	exercicio: '✏️',
	material: '📄'
};

const normalizeType = (content) => {
	const rawType = String(content?.tipo || '').trim().toLowerCase();
	if (typeLabels[rawType]) {
		return rawType;
	}
	return 'aula';
};

const activeFilter = () => filterButtons.find((button) => button.classList.contains('active'))?.dataset.filter || 'all';

const getFilteredContents = (contents) => {
	const currentFilter = activeFilter();
	const query = (searchInput?.value || '').trim().toLowerCase();

	return contents.filter((content) => {
		const matchesFilter = currentFilter === 'all' || normalizeType(content) === currentFilter;
		const haystack = `${content.titulo || ''} ${content.tema || ''} ${content.descricao || ''}`.toLowerCase();
		const matchesSearch = !query || haystack.includes(query);
		return matchesFilter && matchesSearch;
	});
};

const updateSummary = (contents) => {
	const total = contents.length;
	const published = contents.filter((content) => content.status === 'publicado').length;
	const exercises = contents.filter((content) => normalizeType(content) === 'exercicio').length;
	const lessons = contents.filter((content) => normalizeType(content) === 'aula').length;
	const completion = total ? Math.round((published / total) * 100) : 0;

	summaryContentTotal.textContent = String(total);
	summaryExercises.textContent = String(exercises);
	summaryLessons.textContent = String(lessons);
	summaryCompletion.textContent = `${completion}%`;
};

const renderCompletionModal = (contentId) => {
	const content = getContents().find((item) => item.id === contentId);
	if (!contentCompletionModal || !content) return;

	const entries = getContentCompletionEntries(contentId);
	contentCompletionTitle.textContent = `${content.titulo || 'Conteúdo'} · ${content.tema || 'Português'}`;
	contentCompletionSummary.textContent = entries.length
		? `${entries.length} aluno${entries.length > 1 ? 's' : ''} concluíram este conteúdo.`
		: 'Nenhum aluno concluiu este conteúdo ainda.';

	contentCompletionList.innerHTML = entries.length
		? entries.map((entry) => {
			const completedAt = entry.concluidoEm
				? new Date(entry.concluidoEm).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
				: 'Sem data';

			return `
				<div class="recent-student-item">
					<span class="recent-student-avatar">${escapeHtml(getInitials(entry.nome))}</span>
					<div class="recent-student-info">
						<strong>${escapeHtml(entry.nome || 'Aluno')}</strong>
						<small>${escapeHtml(entry.email || 'Sem e-mail')} • ${escapeHtml(completedAt)}</small>
					</div>
				</div>
			`;
		}).join('')
		: `
			<div class="activity-item">
				<strong>Nenhum aluno concluiu este conteúdo</strong>
				<p>Quando um aluno abrir e confirmar o material, o nome dele aparecerá aqui.</p>
			</div>
		`;

	contentCompletionModal.classList.remove('hidden');
};

const renderContents = () => {
	if (!listEl) return;
	const contents = getContents();
	const visibleContents = getFilteredContents(contents);
	updateSummary(contents);

	if (!contents.length) {
		listEl.innerHTML = `<div class="activity-item"><strong>Nenhum conteúdo cadastrado</strong><p>Clique em "Criar conteúdo" para começar.</p></div>`;
		return;
	}

	if (!visibleContents.length) {
		listEl.innerHTML = `<div class="activity-item"><strong>Nenhum conteúdo encontrado</strong><p>Tente outro filtro ou uma palavra-chave diferente.</p></div>`;
		return;
	}

	listEl.innerHTML = `
		<div class="table-wrapper">
			<table class="table-list">
				<thead>
					<tr>
						<th>Título</th>
						<th>Categoria</th>
						<th>Nível</th>
						<th>Status</th>
						<th>Blocos</th>
						<th>Ações</th>
					</tr>
				</thead>
				<tbody>
					${visibleContents.map((content) => {
						const tipo = normalizeType(content);
						const tipoLabel = typeLabels[tipo] || 'Aula';
						const statusLabel = content.status === 'publicado' ? 'Publicado' : 'Rascunho';
						const statusClass = content.status === 'publicado' ? 'concluido' : 'pendente';
						const blocksCount = Array.isArray(content.blocos) ? content.blocos.length : 0;
						return `
						<tr>
							<td>
								<div class="content-row-title">
									<span class="content-row-icon">${typeIcons[tipo] || '📘'}</span>
									<div>
										<strong>${content.titulo || 'Conteúdo sem título'}</strong>
										<small>${content.tema || '—'}</small>
									</div>
								</div>
							</td>
							<td><span class="table-tag table-tag-${tipo}">${tipoLabel}</span></td>
							<td>${content.nivel || '—'}</td>
							<td><span class="status-chip ${statusClass}">${statusLabel}</span></td>
							<td>${blocksCount}</td>
							<td>
								<div class="table-actions">
<button type="button" class="btn btn-secondary btn-small" data-view-content-completions="${content.id}">Ver</button>
											<button type="button" class="btn btn-secondary btn-small" data-edit-content="${content.id}">Editar</button>
									<button type="button" class="btn btn-primary btn-small" data-toggle-publish="${content.id}">${content.status === 'publicado' ? 'Despublicar' : 'Publicar'}</button>
									<button type="button" class="btn btn-danger btn-small" data-delete-content="${content.id}">Excluir</button>
								</div>
							</td>
						</tr>
						`;
					}).join('')}
				</tbody>
			</table>
		</div>
	`;
};

listEl?.addEventListener('click', (event) => {
	const viewBtn = event.target.closest('[data-view-content-completions]');
	const editBtn = event.target.closest('[data-edit-content]');
	const delBtn = event.target.closest('[data-delete-content]');
	const toggleBtn = event.target.closest('[data-toggle-publish]');

	if (viewBtn) {
		const id = viewBtn.dataset.viewContentCompletions;
		renderCompletionModal(id);
		return;
	}

	if (editBtn) {
		const id = editBtn.dataset.editContent;
		window.location.href = `./portugues-criar.html?id=${encodeURIComponent(id)}`;
		return;
	}

	if (toggleBtn) {
		const id = toggleBtn.dataset.togglePublish;
		const contents = getContents();
		const match = contents.find((content) => content.id === id);
		if (!match) return;
		const nextStatus = match.status === 'publicado' ? 'rascunho' : 'publicado';
		updateContent(id, { status: nextStatus });
		renderContents();
		return;
	}

	if (delBtn) {
		const id = delBtn.dataset.deleteContent;
		if (!window.confirm('Deseja excluir este conteúdo?')) return;
		deleteContent(id);
		renderContents();
	}
});

filterButtons.forEach((button) => {
	button.addEventListener('click', () => {
		filterButtons.forEach((item) => item.classList.toggle('active', item === button));
		renderContents();
	});
});

searchInput?.addEventListener('input', () => {
	renderContents();
});

createBtn?.addEventListener('click', () => {
	window.location.href = './portugues-criar.html';
});

contentCompletionCloseButtons.forEach((button) => {
	button.addEventListener('click', () => {
		contentCompletionModal?.classList.add('hidden');
	});
});

contentCompletionModal?.addEventListener('click', (event) => {
	if (event.target === contentCompletionModal) {
		contentCompletionModal.classList.add('hidden');
	}
});

renderContents();
