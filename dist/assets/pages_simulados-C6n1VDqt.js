import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               *//* empty css             *//* empty css                  *//* empty css                */import"./app-C7RpvBac.js";import{i as r}from"./page-base-BVDhhXmt.js";import{d,n,o as u,q as c}from"./storage-GM3fP61i.js";r();const o=document.getElementById("simuladosList"),m=document.getElementById("simuladoCountBadge"),t=d();let s=[];const l=()=>{const a=[{id:"sim-seed-2",titulo:"Simulado de Português",materia:"Português",duracao:30,dificuldade:"Médio",questoes:[{pergunta:"Qual palavra está corretamente acentuada?",opcoes:["cafe","café","cafè","cafê"],correta:"café"},{pergunta:"Qual alternativa apresenta frase com sujeito simples?",opcoes:["Os alunos estudaram bastante.","As crianças e os professores chegaram cedo.","Houve muitas dúvidas.","Faz muito calor."],correta:"Os alunos estudaram bastante."},{pergunta:"Qual das opções é uma conjunção adversativa?",opcoes:["porque","mas","embora","e"],correta:"mas"}]},{id:"sim-seed-3",titulo:"Simulado de Redação",materia:"Redação",duracao:20,dificuldade:"Avançado",questoes:[{pergunta:"Qual elemento é essencial para a coesão textual?",opcoes:["Imagem","Conectivos","Título","Fonte"],correta:"Conectivos"},{pergunta:"O que torna uma tese clara?",opcoes:["Frases longas","Argumento objetivo","Muitas ideias sem filtro","Uso de metáforas"],correta:"Argumento objetivo"}]}];c(a),s=a},i=()=>{s=n(),s.length||l()},p=()=>{o&&(i(),m.textContent=String(s.length),o.innerHTML=s.map(a=>{const e=u(a.id,(t==null?void 0:t.id)||(t==null?void 0:t.email));return`
    <article class="simulado-item">
      <div class="simulado-item-top">
        <h3>${a.titulo}</h3>
        <span class="status-badge">${a.dificuldade||"Geral"}</span>
      </div>
      <div class="simulado-meta">
        <span>Matéria: ${a.materia||"—"}</span>
        <span>Duração: ${a.duracao||30} min</span>
        <span>Questões: ${Array.isArray(a.questoes)?a.questoes.length:0}</span>
      </div>
      <button type="button" class="btn ${e?"btn-secondary":"btn-primary"}" data-simulado-id="${a.id}" ${e?"disabled":""}>${e?"Concluído":"Iniciar simulado"}</button>
    </article>
  `}).join(""))};o==null||o.addEventListener("click",a=>{const e=a.target.closest("[data-simulado-id]");!e||e.disabled||(window.location.href=`./simulado-conteudo.html?id=${encodeURIComponent(e.dataset.simuladoId)}`)});i();p();
