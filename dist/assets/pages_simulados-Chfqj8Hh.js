import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               *//* empty css             *//* empty css                */import"./app-X42WGwqI.js";import{i as y}from"./page-base-BVDhhXmt.js";import{n as f,o as E}from"./storage-CrKITpRL.js";y();const r=document.getElementById("simuladosList"),Q=document.getElementById("simuladoCountBadge"),h=document.getElementById("simuladoQuiz"),C=document.getElementById("simuladoQuizTitle"),x=document.getElementById("simuladoProgress"),d=document.getElementById("simuladoQuestion"),c=document.getElementById("prevQuestionBtn"),l=document.getElementById("nextQuestionBtn"),q=document.getElementById("simuladoResults"),B=document.getElementById("simuladoResultContent");let i=[],s=null,u=[],o=0;const I=()=>{const e=[{id:"sim-seed-1",titulo:"Simulado de Matemática",materia:"Matemática",duracao:30,dificuldade:"Médio",questoes:[{pergunta:"Qual é o valor de 7 × 8?",opcoes:["45","56","64","49"],correta:"56"},{pergunta:"Qual é a raiz quadrada de 81?",opcoes:["7","8","9","10"],correta:"9"},{pergunta:"Qual é o resultado de 25 ÷ 5?",opcoes:["4","5","6","7"],correta:"5"}]},{id:"sim-seed-2",titulo:"Simulado de Português",materia:"Português",duracao:30,dificuldade:"Médio",questoes:[{pergunta:"Qual palavra está corretamente acentuada?",opcoes:["cafe","café","cafè","cafê"],correta:"café"},{pergunta:"Qual alternativa apresenta frase com sujeito simples?",opcoes:["Os alunos estudaram bastante.","As crianças e os professores chegaram cedo.","Houve muitas dúvidas.","Faz muito calor."],correta:"Os alunos estudaram bastante."},{pergunta:"Qual das opções é uma conjunção adversativa?",opcoes:["porque","mas","embora","e"],correta:"mas"}]},{id:"sim-seed-3",titulo:"Simulado de Redação",materia:"Redação",duracao:20,dificuldade:"Avançado",questoes:[{pergunta:"Qual elemento é essencial para a coesão textual?",opcoes:["Imagem","Conectivos","Título","Fonte"],correta:"Conectivos"},{pergunta:"O que torna uma tese clara?",opcoes:["Frases longas","Argumento objetivo","Muitas ideias sem filtro","Uso de metáforas"],correta:"Argumento objetivo"}]}];E(e),i=e},$=()=>{i=f(),i.length||I()},L=()=>{r&&($(),Q.textContent=`${i.length}`,r.innerHTML=i.map(e=>`
    <article class="simulado-item">
      <div class="simulado-item-top">
        <h3>${e.titulo}</h3>
        <span class="status-badge">${e.dificuldade||"Geral"}</span>
      </div>
      <div class="simulado-meta">
        <span>Matéria: ${e.materia||"—"}</span>
        <span>Duração: ${e.duracao||30} min</span>
        <span>Questões: ${Array.isArray(e.questoes)?e.questoes.length:0}</span>
      </div>
      <button type="button" class="btn btn-primary" data-simulado-id="${e.id}">Iniciar simulado</button>
    </article>
  `).join(""))},M=()=>{h.classList.remove("hidden"),q.classList.add("hidden")},S=()=>{h.classList.add("hidden"),q.classList.remove("hidden")},z=()=>{var e;return((e=s==null?void 0:s.questoes)==null?void 0:e[o])||null},m=()=>{if(!s)return;const e=z();if(!e)return;const t=s.questoes.length;C.textContent=s.titulo,x.textContent=`${o+1}/${t}`;const a=e.opcoes.map((p,n)=>`
      <button type="button" class="question-option ${u[o]===n?"selected":""}" data-option-index="${n}">
        <strong>${String.fromCharCode(65+n)}</strong>
        <span>${p}</span>
      </button>
    `).join("");d.innerHTML=`
    <div class="question-text">${o+1}. ${e.pergunta}</div>
    <div class="question-options">${a}</div>
  `,c.disabled=o===0,l.textContent=o===t-1?"Finalizar":"Próxima"},A=()=>{if(!s)return;const e=s.questoes.length,t=s.questoes.reduce((n,g,b)=>{const v=u[b];return v==null?n:g.opcoes[v]===g.correta?n+1:n},0),a=Math.round(t/e*100),p=a>=80?"Excelente desempenho.":a>=60?"Bom desempenho, continue praticando.":"Você está no caminho certo. Revise os pontos que ficaram em dúvida.";B.innerHTML=`
    <div class="result-score">${a}%</div>
    <div class="result-text">
      <strong>${s.titulo}</strong><br>
      Você acertou ${t} de ${e} questões.<br>
      ${p}
    </div>
  `,S()},j=e=>{i=f();const t=i.find(a=>a.id===e);t&&(s=t,u=Array(t.questoes.length).fill(null),o=0,M(),m())},k=()=>{if(s){if(u[o]===null){window.alert("Selecione uma alternativa antes de continuar.");return}if(o<s.questoes.length-1){o+=1,m();return}A()}},P=()=>{!s||o===0||(o-=1,m())};r==null||r.addEventListener("click",e=>{const t=e.target.closest("[data-simulado-id]");t&&j(t.dataset.simuladoId)});d==null||d.addEventListener("click",e=>{const t=e.target.closest("[data-option-index]");t&&(u[o]=Number(t.dataset.optionIndex),m())});c==null||c.addEventListener("click",P);l==null||l.addEventListener("click",k);$();L();
