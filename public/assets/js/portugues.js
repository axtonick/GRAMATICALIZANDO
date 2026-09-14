import { initPage } from './page-base.js';
import { getContents } from './storage.js';

initPage();

const listEl = document.getElementById('studentContentList');
const countEl = document.getElementById('contentsCount');
const viewer = document.getElementById('contentViewer');

const escapeHtml = (value = '') => String(value)
	.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
	.replace(/"/g, '&quot;').replace(/'/g, '&#039;');

const openStudyPage = (content) => {
	if (!content?.id) return;
	window.location.href = `/pages/portugues-conteudo.html?id=${encodeURIComponent(content.id)}`;
};

const renderList = () => {
	if (!listEl) return;
	const contents = getContents().filter((c) => c.status === 'publicado');
	countEl.textContent = String(contents.length);
	if (!contents.length) {
		listEl.innerHTML = `
			<article class="redacao-empty-card">
				<div class="redacao-empty-content">
					<div class="redacao-empty-icon">📄</div>
					<h3>Seu conteúdo ainda não foi publicado</h3>
					<p>Aguarde o professor liberar os materiais para começar seus estudos.</p>
				</div>
			</article>
		`;
		return;
	}

	listEl.innerHTML = contents.map((c) => `
		<article class="video-lesson-card">
			<div class="video-lesson-header">
				<h3>${c.titulo}</h3>
				<span class="video-lesson-badge recorded">${c.tema || ''}</span>
			</div>
			<p>${c.descricao || ''}</p>
			<div class="video-lesson-meta">
				<span>📚 ${c.blocos?.length || 0} blocos</span>
				<span>🎯 ${c.nivel || '—'}</span>
			</div>
			<div class="video-lesson-actions">
				<button class="btn btn-primary" data-open-content="${c.id}">Abrir</button>
			</div>
		</article>
	`).join('');

	listEl.addEventListener('click', (e) => {
		const btn = e.target.closest('[data-open-content]');
		if (!btn) return;
		const id = btn.dataset.openContent;
		const content = getContents().find((x) => x.id === id);
		if (content) openStudyPage(content);
	});
};

renderList();
