import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               *//* empty css                  */import{i as p}from"./base-bEGeGQbm.js";import{J as v,K as f,p as u,L}from"./storage-CrKITpRL.js";const h=p("videoaulas");if(!h)throw new Error("Acesso negado.");const r=document.querySelector("[data-video-modal]"),w=document.querySelectorAll("[data-video-close]"),b=document.querySelectorAll("#openLessonModalBtn, [data-open-video-modal]"),l=document.getElementById("viewLessonsTrigger"),n=document.getElementById("videoLessonsList"),i=document.getElementById("videoLessonForm"),a=(e="")=>String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"),m=(e="")=>{const t=String(e).trim();return t?/^https?:\/\//i.test(t)?t:`https://${t}`:""},S=e=>{if(!e)return"Sem data";const t=new Date(e);return Number.isNaN(t.getTime())?"Sem data":new Intl.DateTimeFormat("pt-BR",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}).format(t)},k=()=>{const e=[{id:"seed-live-1",titulo:"Aula ao vivo: Revisão de português",assunto:"Português",tipo:"ao_vivo",link:"https://meet.google.com/abc-defg-hij",data:"2026-08-10T19:00",descricao:"Revisão de gramática, interpretação de texto e ortografia.",criadoEm:new Date().toISOString()},{id:"seed-live-2",titulo:"Aula gravada: Estratégia de redação",assunto:"Redação",tipo:"gravada",link:"https://www.youtube.com/watch?v=example",data:"2026-08-08T18:30",descricao:"Aula complementar com dicas sobre coesão e estrutura.",criadoEm:new Date().toISOString()}];L(e)},y=()=>{r&&r.classList.remove("hidden")},g=()=>{r&&(r.classList.add("hidden"),i&&i.reset())},d=()=>{if(!n)return;const e=u();if(!e.length){n.innerHTML=`
      <div class="activity-item">
        <strong>Nenhuma aula cadastrada</strong>
        <p>Use o botão acima para adicionar uma aula ao vivo e enviar o link para os alunos.</p>
      </div>
    `;return}n.innerHTML=e.map(t=>{const s=t.tipo==="ao_vivo"?"Ao vivo":"Gravada",o=t.link?"Abrir link":"Sem link";return`
      <article class="card-item">
        <div class="activity-meta">
          <strong>${a(t.titulo||"Aula sem título")}</strong>
          <span>${a(s)}</span>
        </div>
        <p><strong>Assunto:</strong> ${a(t.assunto||"—")}</p>
        <p><strong>Data:</strong> ${a(S(t.data))}</p>
        <p><strong>Descrição:</strong> ${a(t.descricao||"Sem descrição cadastrada.")}</p>
        <div class="action-buttons">
          <a
            class="btn btn-secondary"
            href="${a(m(t.link))}"
            target="_blank"
            rel="noopener noreferrer"
            ${t.link?"":'aria-disabled="true" tabindex="-1"'}
          >
            ${o}
          </a>
          <button type="button" class="btn btn-primary" data-lesson-action="delete" data-lesson-id="${a(t.id||"")}">Excluir</button>
        </div>
      </article>
    `}).join("")};i&&i.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(i),s=String(t.get("titulo")||"").trim(),o=m(t.get("link"));if(!s||!o){window.alert("Preencha o título e o link da aula para continuar.");return}const c={id:window.crypto&&crypto.randomUUID?crypto.randomUUID():`video-${Date.now()}`,titulo:s,assunto:String(t.get("assunto")||"").trim(),tipo:String(t.get("tipo")||"ao_vivo"),data:String(t.get("data")||""),descricao:String(t.get("descricao")||"").trim(),link:o,criadoEm:new Date().toISOString()};v(c),g(),d()});w.forEach(e=>{e.addEventListener("click",g)});b.forEach(e=>{e.addEventListener("click",y)});l&&l.addEventListener("click",()=>{window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"})});n&&n.addEventListener("click",e=>{const t=e.target.closest("[data-lesson-action]");if(!t)return;const{lessonAction:s,lessonId:o}=t.dataset;s!=="delete"||!o||!window.confirm("Deseja excluir esta aula da lista?")||(f(o),d())});const D=u();D.length||k();d();
