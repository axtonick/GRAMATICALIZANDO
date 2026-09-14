import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               *//* empty css                  */import{i as f}from"./base-mwdddXjL.js";import{k as h,E,G as $,H as L}from"./storage-GM3fP61i.js";const w=f("portugues");if(!w)throw new Error("Acesso negado.");const l=document.getElementById("contentList"),g=document.getElementById("createContentBtn"),r=document.getElementById("contentSearchInput"),b=[...document.querySelectorAll(".filter-pill")],S=document.getElementById("summaryContentTotal"),B=document.getElementById("summaryExercises"),x=document.getElementById("summaryLessons"),T=document.getElementById("summaryCompletion"),c=document.querySelector("[data-content-completions-modal]"),A=document.getElementById("contentCompletionTitle"),I=document.getElementById("contentCompletionSummary"),k=document.getElementById("contentCompletionList"),q=document.querySelectorAll("[data-close-content-completions]"),y={aula:"Aula",exercicio:"Exercício",material:"Material"},m=(t="")=>String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/'/g,"&#039;"),H=(t="")=>String(t).trim().split(/\s+/).slice(0,2).map(e=>{var o;return((o=e[0])==null?void 0:o.toUpperCase())||""}).join("")||"A",P={aula:"📘",exercicio:"✏️",material:"📄"},p=t=>{const n=String((t==null?void 0:t.tipo)||"").trim().toLowerCase();return y[n]?n:"aula"},N=()=>{var t;return((t=b.find(n=>n.classList.contains("active")))==null?void 0:t.dataset.filter)||"all"},j=t=>{const n=N(),e=((r==null?void 0:r.value)||"").trim().toLowerCase();return t.filter(o=>{const a=n==="all"||p(o)===n,s=`${o.titulo||""} ${o.tema||""} ${o.descricao||""}`.toLowerCase(),i=!e||s.includes(e);return a&&i})},D=t=>{const n=t.length,e=t.filter(i=>i.status==="publicado").length,o=t.filter(i=>p(i)==="exercicio").length,a=t.filter(i=>p(i)==="aula").length,s=n?Math.round(e/n*100):0;S.textContent=String(n),B.textContent=String(o),x.textContent=String(a),T.textContent=`${s}%`},F=t=>{const n=h().find(o=>o.id===t);if(!c||!n)return;const e=L(t);A.textContent=`${n.titulo||"Conteúdo"} · ${n.tema||"Português"}`,I.textContent=e.length?`${e.length} aluno${e.length>1?"s":""} concluíram este conteúdo.`:"Nenhum aluno concluiu este conteúdo ainda.",k.innerHTML=e.length?e.map(o=>{const a=o.concluidoEm?new Date(o.concluidoEm).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric"}):"Sem data";return`
				<div class="recent-student-item">
					<span class="recent-student-avatar">${m(H(o.nome))}</span>
					<div class="recent-student-info">
						<strong>${m(o.nome||"Aluno")}</strong>
						<small>${m(o.email||"Sem e-mail")} • ${m(a)}</small>
					</div>
				</div>
			`}).join(""):`
			<div class="activity-item">
				<strong>Nenhum aluno concluiu este conteúdo</strong>
				<p>Quando um aluno abrir e confirmar o material, o nome dele aparecerá aqui.</p>
			</div>
		`,c.classList.remove("hidden")},d=()=>{if(!l)return;const t=h(),n=j(t);if(D(t),!t.length){l.innerHTML='<div class="activity-item"><strong>Nenhum conteúdo cadastrado</strong><p>Clique em "Criar conteúdo" para começar.</p></div>';return}if(!n.length){l.innerHTML='<div class="activity-item"><strong>Nenhum conteúdo encontrado</strong><p>Tente outro filtro ou uma palavra-chave diferente.</p></div>';return}l.innerHTML=`
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
					${n.map(e=>{const o=p(e),a=y[o]||"Aula",s=e.status==="publicado"?"Publicado":"Rascunho",i=e.status==="publicado"?"concluido":"pendente",u=Array.isArray(e.blocos)?e.blocos.length:0;return`
						<tr>
							<td>
								<div class="content-row-title">
									<span class="content-row-icon">${P[o]||"📘"}</span>
									<div>
										<strong>${e.titulo||"Conteúdo sem título"}</strong>
										<small>${e.tema||"—"}</small>
									</div>
								</div>
							</td>
							<td><span class="table-tag table-tag-${o}">${a}</span></td>
							<td>${e.nivel||"—"}</td>
							<td><span class="status-chip ${i}">${s}</span></td>
							<td>${u}</td>
							<td>
								<div class="table-actions">
<button type="button" class="btn btn-secondary btn-small" data-view-content-completions="${e.id}">Ver</button>
											<button type="button" class="btn btn-secondary btn-small" data-edit-content="${e.id}">Editar</button>
									<button type="button" class="btn btn-primary btn-small" data-toggle-publish="${e.id}">${e.status==="publicado"?"Despublicar":"Publicar"}</button>
									<button type="button" class="btn btn-danger btn-small" data-delete-content="${e.id}">Excluir</button>
								</div>
							</td>
						</tr>
						`}).join("")}
				</tbody>
			</table>
		</div>
	`};l==null||l.addEventListener("click",t=>{const n=t.target.closest("[data-view-content-completions]"),e=t.target.closest("[data-edit-content]"),o=t.target.closest("[data-delete-content]"),a=t.target.closest("[data-toggle-publish]");if(n){const s=n.dataset.viewContentCompletions;F(s);return}if(e){const s=e.dataset.editContent;window.location.href=`./portugues-criar.html?id=${encodeURIComponent(s)}`;return}if(a){const s=a.dataset.togglePublish,u=h().find(v=>v.id===s);if(!u)return;const C=u.status==="publicado"?"rascunho":"publicado";E(s,{status:C}),d();return}if(o){const s=o.dataset.deleteContent;if(!window.confirm("Deseja excluir este conteúdo?"))return;$(s),d()}});b.forEach(t=>{t.addEventListener("click",()=>{b.forEach(n=>n.classList.toggle("active",n===t)),d()})});r==null||r.addEventListener("input",()=>{d()});g==null||g.addEventListener("click",()=>{window.location.href="./portugues-criar.html"});q.forEach(t=>{t.addEventListener("click",()=>{c==null||c.classList.add("hidden")})});c==null||c.addEventListener("click",t=>{t.target===c&&c.classList.add("hidden")});d();
