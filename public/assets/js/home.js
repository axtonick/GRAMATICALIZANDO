import { initPage } from './page-base.js';

initPage();

const lessonsEl = document.getElementById('homeLessons');
const exercisesEl = document.getElementById('homeExercises');

const escapeHtml = (value = '') => String(value)
	.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
	.replace(/"/g, '&quot;').replace(/'/g, '&#039;');

const showEmpty = (element, title, description) => {
	if (!element) return;
	element.innerHTML = `<div class="home-empty"><strong>${escapeHtml(title)}</strong><p>${escapeHtml(description)}</p></div>`;
};

const renderHomeContent = ({ materias = [], aulas = [], exercicios = [] }) => {
	const materiaById = new Map(materias.map((materia) => [materia.id, materia.nome]));

	if (lessonsEl) {
		if (!aulas.length) {
			showEmpty(lessonsEl, 'Nenhuma aula publicada ainda', 'As aulas liberadas pelo administrador aparecerão aqui.');
		} else {
			lessonsEl.innerHTML = aulas.slice(0, 6).map((aula) => `
				<article class="home-resource-card">
					<span class="home-resource-label">${escapeHtml(materiaById.get(aula.materiaId) || 'Aula')}</span>
					<h3>${escapeHtml(aula.titulo || 'Aula sem título')}</h3>
					<p>${escapeHtml(String(aula.conteudo || '').replace(/<[^>]*>/g, '').slice(0, 140) || 'Conteúdo publicado pelo administrador.')}</p>
					<a class="btn btn-primary" href="/pages/materiais.html">Ir para material</a>
				</article>
			`).join('');
		}
	}

	if (exercisesEl) {
		if (!exercicios.length) {
			showEmpty(exercisesEl, 'Nenhum exercício publicado ainda', 'Quando houver questões liberadas, elas aparecerão aqui para você responder.');
		} else {
			exercisesEl.innerHTML = exercicios.slice(0, 6).map((exercicio) => `
				<article class="home-resource-card exercise-resource-card">
					<span class="home-resource-label">${escapeHtml(materiaById.get(exercicio.materiaId) || 'Exercício')}</span>
					<h3>${escapeHtml(exercicio.titulo || 'Exercício')}</h3>
					<p>${escapeHtml(exercicio.descricao || 'Pratique o conteúdo e confira seu resultado.')}</p>
					<div class="home-resource-meta">${exercicio.totalQuestoes || 0} questões</div>
					<a class="btn btn-primary" href="/exercicio.html?id=${encodeURIComponent(exercicio.id)}">Responder questões</a>
				</article>
			`).join('');
		}
	}
};

const loadHomeContent = async () => {
	try {
		const response = await fetch('/api/conteudos-publicos');
		const data = await response.json();
		if (!response.ok || !data.sucesso) throw new Error(data.mensagem || 'Falha ao carregar conteúdo.');
		renderHomeContent(data);
	} catch (error) {
		showEmpty(lessonsEl, 'Não foi possível carregar as aulas', 'Tente atualizar a página em alguns instantes.');
		showEmpty(exercisesEl, 'Não foi possível carregar os exercícios', 'Tente atualizar a página em alguns instantes.');
		console.error('Erro ao carregar conteúdo da home:', error);
	}
};

loadHomeContent();
