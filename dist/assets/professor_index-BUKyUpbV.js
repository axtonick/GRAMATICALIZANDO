import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               *//* empty css                  */import{i as c}from"./base-bEGeGQbm.js";import{g as d,i as m}from"./storage-CrKITpRL.js";import{t as g}from"./utils-CfagMjON.js";const l=c("dashboard");if(!l)throw new Error("Acesso negado ao painel do professor.");const u=document.getElementById("summaryStudents"),p=document.getElementById("summaryPendingEssays"),y=document.getElementById("summaryReviewedEssays"),v=document.getElementById("summaryDiagnostics"),n=document.getElementById("recentActivities"),i=d(),s=m(),a=i.filter(t=>t.diagnostico),E=s.filter(t=>t.status==="pendente"),h=s.filter(t=>t.status==="concluido");u.textContent=i.length;p.textContent=E.length;y.textContent=h.length;v.textContent=a.length;const e=[];s.forEach(t=>{e.push({type:"essay",date:t.criadoEm,title:"Nova redação enviada",description:`${t.autor||"Aluno"} enviou uma nova redação`,target:"./redacoes.html"})});a.forEach(t=>{e.push({type:"diagnostic",date:t.diagnostico.criadoEm,title:"Diagnóstico concluído",description:`${t.nome||"Aluno"} concluiu o diagnóstico`,target:"./diagnosticos.html"})});e.sort((t,r)=>new Date(r.date)-new Date(t.date));const o=e.slice(0,5);o.length?n.innerHTML=o.map(t=>`
      <article class="activity-item">
        <strong>${t.title}</strong>
        <div class="activity-meta">
          <span>${t.description}</span>
          <span>${g(t.date)}</span>
        </div>
        <a class="activity-link" href="${t.target}">Ver todas</a>
      </article>
    `).join(""):n.innerHTML='<div class="activity-item"><strong>Nenhuma atividade recente</strong><p>Ainda não há eventos registrados.</p></div>';
