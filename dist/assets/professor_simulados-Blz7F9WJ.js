import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               *//* empty css                  */import{i as n}from"./base-mwdddXjL.js";import{K as d,n as r,J as u}from"./storage-GM3fP61i.js";const c=n("simulados");if(!c)throw new Error("Acesso negado.");const a=document.getElementById("simuladoList"),s=(e="")=>String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"),i=()=>{if(!a)return;const e=r();if(!e.length){a.innerHTML=`
      <div class="activity-item">
        <strong>Nenhum simulado cadastrado</strong>
        <p>Crie um novo simulado para disponibilizar questões aos alunos.</p>
      </div>
    `;return}a.innerHTML=e.map(t=>`
    <article class="card-item">
      <div class="activity-meta">
        <strong>${s(t.titulo||"Simulado sem título")}</strong>
          <span>${s(t.dificuldade||"Geral")}</span>
      </div>
      <p><strong>Matéria:</strong> ${s(t.materia||"—")}</p>
      <p><strong>Duração:</strong> ${s(t.duracao||30)} min</p>
      <p><strong>Questões:</strong> ${Array.isArray(t.questoes)?t.questoes.length:0}</p>
      <div class="action-buttons">
        <button type="button" class="btn btn-secondary" data-edit-simulado="${s(t.id)}">Editar</button>
        <button type="button" class="btn btn-primary" data-delete-simulado="${t.id}">Excluir</button>
      </div>
    </article>
  `).join("")};a==null||a.addEventListener("click",e=>{const t=e.target.closest("[data-delete-simulado]"),o=e.target.closest("[data-edit-simulado]");if(o){window.location.href=`./simulados-criar.html?id=${encodeURIComponent(o.dataset.editSimulado)}`;return}!t||!window.confirm("Deseja excluir este simulado?")||(d(t.dataset.deleteSimulado),i())});const l=r();l.length||u({id:"sim-seed-1",titulo:"Simulado de Português",materia:"Português",duracao:30,dificuldade:"Médio",questoes:[{pergunta:"Qual palavra está corretamente acentuada?",opcoes:["cafe","café","cafè","cafê"],correta:"café"},{pergunta:"Qual alternativa apresenta uma frase com sujeito simples?",opcoes:["Os alunos estudaram bastante.","As crianças e os professores chegaram cedo.","Houve muitas dúvidas.","Faz muito calor."],correta:"Os alunos estudaram bastante."}],criadoEm:new Date().toISOString()});i();
