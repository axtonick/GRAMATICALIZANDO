import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               *//* empty css                  */import{i as m}from"./base-mwdddXjL.js";import{g as u}from"./storage-GM3fP61i.js";import{s as o,f as c}from"./utils-CfagMjON.js";const v=m("diagnostics");if(!v)throw new Error("Acesso negado.");const n=document.getElementById("diagnosticList"),d=document.querySelector("[data-diagnostic-modal]"),p=document.querySelectorAll("[data-modal-close]"),f=document.getElementById("diagnosticModalName"),E=document.getElementById("diagnosticModalDate"),y=document.getElementById("diagnosticModalResult"),M=document.getElementById("diagnosticModalStatus"),b=document.getElementById("diagnosticModalDetails"),r=u(),s=r.filter(t=>t.diagnostico).sort((t,i)=>new Date(i.diagnostico.criadoEm)-new Date(t.diagnostico.criadoEm));s.length?n.innerHTML=s.map(t=>{const i=t.diagnostico;return`
      <article class="activity-item">
        <strong>${o(t.nome)}</strong>
        <div class="activity-meta">
          <span>Diagnóstico concluído</span>
          <span>${c(i.criadoEm)}</span>
        </div>
        <p>${i.objetivo?`Objetivo: ${o(i.objetivo)}`:"Diagnóstico completo."}</p>
        <div class="action-buttons">
          <button type="button" class="btn btn-primary" data-view-diagnostic="${t.email}">Ver diagnóstico</button>
        </div>
      </article>
    `}).join(""):n.innerHTML='<div class="activity-item"><strong>Nenhum diagnóstico registrado</strong><p>Os diagnósticos serão exibidos aqui assim que concluídos.</p></div>';n.querySelectorAll("[data-view-diagnostic]").forEach(t=>{t.addEventListener("click",i=>{const l=i.currentTarget.dataset.viewDiagnostic,e=r.find(g=>g.email===l);if(!e||!e.diagnostico)return;const a=e.diagnostico;f.textContent=o(e.nome),E.textContent=c(a.criadoEm),y.textContent=a.objetivo?`Objetivo: ${o(a.objetivo)}`:"Resultado disponível",M.textContent="Concluído",b.textContent=`Prova: ${o(a.prova)} · Horas/semana: ${o(a.horas_semanais)} · Nível: ${o(a.nivel)} · Confiança: ${o(a.confianca)}`,d.classList.remove("hidden")})});p.forEach(t=>{t.addEventListener("click",()=>d.classList.add("hidden"))});
