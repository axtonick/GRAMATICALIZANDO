import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               *//* empty css             *//* empty css                   *//* empty css                */import"./app-C7RpvBac.js";import{i as r}from"./page-base-BVDhhXmt.js";import{k as i}from"./storage-GM3fP61i.js";r();const n=document.getElementById("studentContentList"),c=document.getElementById("contentsCount");document.getElementById("contentViewer");const l=e=>{e!=null&&e.id&&(window.location.href=`/pages/portugues-conteudo.html?id=${encodeURIComponent(e.id)}`)},p=()=>{if(!n)return;const e=i().filter(t=>t.status==="publicado");if(c.textContent=String(e.length),!e.length){n.innerHTML=`
			<article class="redacao-empty-card">
				<div class="redacao-empty-content">
					<div class="redacao-empty-icon">📄</div>
					<h3>Seu conteúdo ainda não foi publicado</h3>
					<p>Aguarde o professor liberar os materiais para começar seus estudos.</p>
				</div>
			</article>
		`;return}n.innerHTML=e.map(t=>{var o;return`
		<article class="video-lesson-card">
			<div class="video-lesson-header">
				<h3>${t.titulo}</h3>
				<span class="video-lesson-badge recorded">${t.tema||""}</span>
			</div>
			<p>${t.descricao||""}</p>
			<div class="video-lesson-meta">
				<span>📚 ${((o=t.blocos)==null?void 0:o.length)||0} blocos</span>
				<span>🎯 ${t.nivel||"—"}</span>
			</div>
			<div class="video-lesson-actions">
				<button class="btn btn-primary" data-open-content="${t.id}">Abrir</button>
			</div>
		</article>
	`}).join(""),n.addEventListener("click",t=>{const o=t.target.closest("[data-open-content]");if(!o)return;const a=o.dataset.openContent,s=i().find(d=>d.id===a);s&&l(s)})};p();
