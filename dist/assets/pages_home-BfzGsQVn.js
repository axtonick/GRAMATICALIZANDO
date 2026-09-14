import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               *//* empty css             */import"./app-X42WGwqI.js";import{i as l}from"./page-base-BVDhhXmt.js";import"./storage-CrKITpRL.js";l();const t=document.getElementById("homeLessons"),n=document.getElementById("homeExercises"),r=(a="")=>String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"),i=(a,o,s)=>{a&&(a.innerHTML=`<div class="home-empty"><strong>${r(o)}</strong><p>${r(s)}</p></div>`)},p=({materias:a=[],aulas:o=[],exercicios:s=[]})=>{const c=new Map(a.map(e=>[e.id,e.nome]));t&&(o.length?t.innerHTML=o.slice(0,6).map(e=>`
				<article class="home-resource-card">
					<span class="home-resource-label">${r(c.get(e.materiaId)||"Aula")}</span>
					<h3>${r(e.titulo||"Aula sem título")}</h3>
					<p>${r(String(e.conteudo||"").replace(/<[^>]*>/g,"").slice(0,140)||"Conteúdo publicado pelo administrador.")}</p>
					<a class="btn btn-primary" href="/pages/materiais.html">Ir para material</a>
				</article>
			`).join(""):i(t,"Nenhuma aula publicada ainda","As aulas liberadas pelo administrador aparecerão aqui.")),n&&(s.length?n.innerHTML=s.slice(0,6).map(e=>`
				<article class="home-resource-card exercise-resource-card">
					<span class="home-resource-label">${r(c.get(e.materiaId)||"Exercício")}</span>
					<h3>${r(e.titulo||"Exercício")}</h3>
					<p>${r(e.descricao||"Pratique o conteúdo e confira seu resultado.")}</p>
					<div class="home-resource-meta">${e.totalQuestoes||0} questões</div>
					<a class="btn btn-primary" href="/exercicio.html?id=${encodeURIComponent(e.id)}">Responder questões</a>
				</article>
			`).join(""):i(n,"Nenhum exercício publicado ainda","Quando houver questões liberadas, elas aparecerão aqui para você responder."))},m=async()=>{try{const a=await fetch("/api/conteudos-publicos"),o=await a.json();if(!a.ok||!o.sucesso)throw new Error(o.mensagem||"Falha ao carregar conteúdo.");p(o)}catch(a){i(t,"Não foi possível carregar as aulas","Tente atualizar a página em alguns instantes."),i(n,"Não foi possível carregar os exercícios","Tente atualizar a página em alguns instantes."),console.error("Erro ao carregar conteúdo da home:",a)}};m();
