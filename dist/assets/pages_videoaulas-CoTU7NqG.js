import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               *//* empty css             *//* empty css                   *//* empty css                */import"./app-C7RpvBac.js";import{i as r}from"./page-base-BVDhhXmt.js";import{r as d}from"./storage-GM3fP61i.js";r();const o=document.getElementById("videoLessonsList"),n=document.getElementById("videoLessonsCount"),l=(t="")=>{const e=String(t).trim();return e?/^https?:\/\//i.test(e)?e:`https://${e}`:"#"},c=t=>{if(!t)return"Data a definir";const e=new Date(t);return Number.isNaN(e.getTime())?"Data a definir":new Intl.DateTimeFormat("pt-BR",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}).format(e)},m=()=>{if(!o)return;const t=d();if(!t.length){n.textContent="0",o.innerHTML=`
      <div class="video-empty">
        Nenhuma aula disponível no momento. O professor pode publicar uma nova aula ao vivo ou gravada aqui.
      </div>
    `;return}n.textContent=String(t.length),o.innerHTML=t.map(e=>{const i=e.tipo==="ao_vivo"?"live":"recorded",a=e.tipo==="ao_vivo"?"Ao vivo":"Gravada",s=l(e.link);return`
      <article class="video-lesson-card">
        <div class="video-lesson-header">
          <h3>${e.titulo||"Aula sem título"}</h3>
          <span class="video-lesson-badge ${i}">${a}</span>
        </div>

        <p class="video-lesson-subject"><strong>Assunto:</strong> ${e.assunto||"Geral"}</p>
        <p class="video-lesson-description">${e.descricao||"Aula disponível para revisão e acompanhamento do conteúdo."}</p>

        <div class="video-lesson-meta">
          <span>📅 ${c(e.data)}</span>
          <span>🎯 ${e.dificuldade||"Nível geral"}</span>
        </div>

        <div class="video-lesson-actions">
          <a
            class="btn btn-primary"
            href="${s}"
            target="_blank"
            rel="noopener noreferrer"
          >
            ${e.link?"Acessar aula":"Link indisponível"}
          </a>
        </div>
      </article>
    `}).join("")};m();
