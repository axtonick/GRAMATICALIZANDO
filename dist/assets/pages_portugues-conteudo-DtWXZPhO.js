import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               *//* empty css             *//* empty css                   *//* empty css                */import"./app-X42WGwqI.js";import{i as $}from"./page-base-BVDhhXmt.js";import{d as g,m as b,k as C}from"./storage-CrKITpRL.js";$();const q=new URLSearchParams(window.location.search),I=q.get("id"),v=document.getElementById("studyHeader"),l=document.getElementById("studyBlocks");document.getElementById("studyTimeValue");const w=document.getElementById("studyBlocksCount"),L=document.getElementById("studyFocusLabel"),k=document.getElementById("studyNextTopics"),u=document.querySelector("[data-back-button]"),o=(t="")=>String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"),x=(t="")=>(Array.isArray(t)?t.map(n=>(typeof n=="string"?n:String((n==null?void 0:n.texto)||"")).trim()).filter(Boolean):String(t||"").split(/\n+/).map(n=>n.trim()).filter(Boolean)).map((n,s)=>{const d=n.match(/^([A-Da-d])([\)\.:\-]?\s*)(.+)$/),a=d?d[1].trim().toLowerCase():String.fromCharCode(97+s),i=d?d[3].trim():n;return{id:a,texto:i}}),h=new Map,m=new Set,B={id:"",titulo:"Conteúdo em estudo",tema:"Português",nivel:"Médio",descricao:"Revise os conteúdos e responda ao desafio.",blocos:[]},f=()=>{const t=C().filter(e=>e.status==="publicado");return t.find(e=>e.id===I)||{...B,...t[0]}},S=t=>{const e=Array.isArray(t.blocos)?t.blocos:[],n=e.filter(s=>s.tipo==="questao");w.textContent=String(n.length||e.length),L.textContent=t.tema||"Português",l.innerHTML=e.map((s,d)=>{const a=o(s.titulo||`Bloco ${d+1}`);if(s.tipo==="texto")return`
        <section class="panel-card study-block-card">
          <div class="study-block-header">
            <span class="study-block-tag">Explicação</span>
            <h3>${a}</h3>
          </div>
          <div class="study-block-body">${o(s.conteudo||"").replace(/\n/g,"<br>")}</div>
        </section>
      `;if(s.tipo==="questao"){const i=x(s.alternativas),r=String(s.id||`question-${d}`),p=h.get(r)||"";return`
        <section class="study-question-panel">
          <div class="study-question-header">
            <div>
              <span class="study-block-tag">Questão</span>
              <h2>Questão ${d+1} de ${e.length}</h2>
            </div>
            <span class="study-question-counter">${d+1}/${e.length}</span>
          </div>
          <div class="study-question-body">
            <div class="study-question-copy">
              <p class="study-question-label">${o(t.tema||"Português")}</p>
              <h3>${o(s.conteudo||"").replace(/\n/g,"<br>")}</h3>
            </div>
            <div class="study-options">
              ${i.map(c=>`
                <button
                  type="button"
                  class="study-option ${p===c.id?"is-selected":""}"
                  data-question-id="${o(r)}"
                  data-option-index="${o(c.id)}"
                  aria-pressed="${p===c.id?"true":"false"}"
                >
                  <span class="study-option-letter">${o(c.id.toUpperCase())}</span>
                  <span>${o(c.texto)}</span>
                </button>
              `).join("")}
            </div>
            <div class="study-answer-actions">
              <button type="button" class="btn btn-primary study-confirm-answer" data-question-id="${o(r)}" data-confirm-answer>Confirmar resposta</button>
              <button type="button" class="btn btn-secondary study-save-answer" data-question-id="${o(r)}" data-save-answer>Salvar para revisar</button>
            </div>
          </div>
        </section>
      `}return s.tipo==="imagem"&&(s.imagem||s.url||s.src)?`
        <section class="panel-card study-block-card">
          <div class="study-block-header">
            <span class="study-block-tag">Imagem</span>
            <h3>${a}</h3>
          </div>
          <img class="study-block-image" src="${o(s.imagem||s.url||s.src)}" alt="${o(s.nome||s.titulo||"Imagem do conteúdo")}" />
        </section>
      `:s.tipo==="pdf"&&s.pdf?`
        <section class="panel-card study-block-card">
          <div class="study-block-header">
            <span class="study-block-tag">Material</span>
            <h3>${a}</h3>
          </div>
          <a class="btn btn-secondary study-inline-link" href="${o(s.pdf)}" target="_blank" rel="noopener noreferrer">Abrir PDF: ${o(s.nome||"arquivo")}</a>
        </section>
      `:s.tipo==="video"&&s.link?`
        <section class="panel-card study-block-card">
          <div class="study-block-header">
            <span class="study-block-tag">Vídeo</span>
            <h3>${a}</h3>
          </div>
          <a class="btn btn-secondary study-inline-link" href="${o(s.link)}" target="_blank" rel="noopener noreferrer">Assistir vídeo</a>
        </section>
      `:s.tipo==="link"&&s.link?`
        <section class="panel-card study-block-card">
          <div class="study-block-header">
            <span class="study-block-tag">Link</span>
            <h3>${a}</h3>
          </div>
          <a class="btn btn-secondary study-inline-link" href="${o(s.link)}" target="_blank" rel="noopener noreferrer">Abrir link</a>
        </section>
      `:""}).join("")},A=t=>{const e=["Leitura e interpretação","Gramática aplicada","Produção textual","Revisão de conceitos"].filter(n=>n!==(t.tema||"Português"));k.innerHTML=e.map(n=>`<li>${o(n)}</li>`).join("")},P=t=>{const e=g(),n=e!=null&&e.nome?e.nome.split(" ")[0]:"aluno";v.innerHTML=`
    <div class="study-header-top">
      <div>
        <p class="dashboard-title">Conteúdo de ${o(t.tema||"Português")}</p>
        <h1>${o(t.titulo||"Conteúdo em estudo")}</h1>
      </div>
      <div class="study-user-pill">Olá, ${o(n)}</div>
    </div>
    <div class="study-header-meta">
      <span>${o(t.nivel||"Médio")}</span>
      <span>${(t.blocos||[]).length} blocos</span>
      <span>${o(t.descricao||"Conteúdo do módulo")}</span>
    </div>
  `},y=()=>{const t=g();if(!t||t.tipo!=="aluno"&&t.tipo!=="cliente")return;const e=f();!e||!e.id||b(t.id||t.email,e.id,e)},E=()=>{const t=f();if(!t||!t.id){v.innerHTML=`
      <div class="study-header-top">
        <div>
          <p class="dashboard-title">Português</p>
          <h1>Conteúdo ainda não publicado</h1>
        </div>
      </div>
    `,l.innerHTML='<div class="panel-card"><p>Nenhum conteúdo publicado foi encontrado.</p></div>';return}P(t),S(t),A(t)};u==null||u.addEventListener("click",()=>{window.location.href="/pages/portugues.html"});l==null||l.addEventListener("click",t=>{var d;const e=t.target.closest("[data-option-index]");if(e){const a=e.dataset.questionId;h.set(a,e.dataset.optionIndex),(d=e.closest(".study-options"))==null||d.querySelectorAll(".study-option").forEach(i=>{const r=i.dataset.optionIndex===e.dataset.optionIndex&&i.dataset.questionId===a;i.classList.toggle("is-selected",r),i.setAttribute("aria-pressed",r?"true":"false")});return}const n=t.target.closest("[data-confirm-answer]");if(n){const a=n.dataset.questionId;m.add(a),n.textContent="Resposta salva",n.classList.add("is-confirmed"),y();return}const s=t.target.closest("[data-save-answer]");if(s){const a=s.dataset.questionId;m.add(a),s.textContent="Salvo",y()}});E();
