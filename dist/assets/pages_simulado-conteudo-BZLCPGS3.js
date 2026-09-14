import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               *//* empty css             *//* empty css                  *//* empty css                */import"./app-C7RpvBac.js";import{i as P}from"./page-base-BVDhhXmt.js";import{n as C,d as A,o as H,p as k}from"./storage-GM3fP61i.js";P();const Q=new URLSearchParams(window.location.search).get("id"),t=C().find(e=>e.id===Q)||C()[0],d=A(),v=(d==null?void 0:d.id)||(d==null?void 0:d.email),I=H(t==null?void 0:t.id,v),S=document.getElementById("simuladoTitle"),j=document.getElementById("simuladoProgress"),B=document.getElementById("simuladoSubject"),L=document.getElementById("simuladoDuration"),q=document.getElementById("simuladoDifficulty"),p=document.getElementById("simuladoTimer"),N=document.getElementById("simuladoCurrentMetric"),O=document.getElementById("simuladoAnsweredMetric"),c=document.getElementById("simuladoQuestion"),u=document.getElementById("prevQuestionBtn"),m=document.getElementById("nextQuestionBtn"),w=document.getElementById("simuladoResults"),M=document.getElementById("simuladoResultContent");let r=t?Array(t.questoes.length).fill(null):[],n=0,f=null,y=!1;const l=(e="")=>String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"),J=()=>Math.max(1,Number((t==null?void 0:t.duracao)||30)*60),$=()=>`simulado_tempo_${(t==null?void 0:t.id)||"indisponivel"}`,U=e=>`${String(Math.floor(e/60)).padStart(2,"0")}:${String(e%60).padStart(2,"0")}`,T=()=>{try{const e=JSON.parse(sessionStorage.getItem($())||"null");return(e==null?void 0:e.startedAt)||null}catch{return null}},V=e=>sessionStorage.setItem($(),JSON.stringify({startedAt:e})),_=()=>{f&&window.clearInterval(f),sessionStorage.removeItem($())},z=e=>{S.textContent=t.titulo||"Simulado",B.textContent=t.materia||"Português",L.textContent=`${t.duracao||30} min`,q.textContent=t.dificuldade||"Médio",p.textContent="Concluído",p.classList.add("is-expired"),c.innerHTML='<div class="panel-card"><p>Este simulado já foi concluído e não pode ser respondido novamente.</p></div>',u.classList.add("hidden"),m.classList.add("hidden"),M.innerHTML=`<div class="result-score">${e.percentage}%</div><div class="result-text"><strong>${l(t.titulo||"Simulado")}</strong><br>Você acertou ${e.correct} de ${e.total} questões.<br>Concluído em ${new Date(e.concluidoEm).toLocaleDateString("pt-BR")}.</div>`,w.classList.remove("hidden")},F=()=>{S.textContent="Simulado não encontrado",c.innerHTML='<div class="panel-card"><p>Este simulado não está disponível.</p></div>',u.disabled=!0,m.disabled=!0},D=(e=!1)=>{if(!t||y)return;y=!0,_();const o=t.questoes.length,s=t.questoes.reduce((h,x,R)=>{const E=r[R];return E!==null&&x.opcoes[E]===x.correta?h+1:h},0),i=Math.round(s/o*100),a=i>=80?"Excelente desempenho.":i>=60?"Bom desempenho, continue praticando.":"Revise os pontos que ficaram em dúvida e tente novamente.";M.innerHTML=`
    <div class="result-score">${i}%</div>
    <div class="result-text">
      <strong>${l(t.titulo||"Simulado")}</strong><br>
      ${e?"O tempo acabou. ":""}Você acertou ${s} de ${o} questões.<br>
      ${a}
    </div>
  `,v&&k({simulationId:t.id,studentId:v,titulo:t.titulo||"Simulado",correct:s,total:o,percentage:i}),c.classList.add("hidden"),u.classList.add("hidden"),m.classList.add("hidden"),w.classList.remove("hidden")},b=()=>{if(!t||y)return;const e=T(),o=e?Math.floor((Date.now()-new Date(e).getTime())/1e3):0,s=Math.max(0,J()-o);p.textContent=U(s),p.classList.toggle("is-expired",s===0),s===0&&D(!0)},K=()=>{t&&(T()||V(new Date().toISOString()),b(),f=window.setInterval(b,1e3))},g=()=>{if(!t)return F();const e=t.questoes[n],o=t.questoes.length;S.textContent=t.titulo||"Simulado",B.textContent=t.materia||"Português",L.textContent=`${t.duracao||30} min`,q.textContent=t.dificuldade||"Médio",j.textContent=`${n+1}/${o}`,N.textContent=`${n+1}/${o}`,O.textContent=String(r.filter(i=>i!==null).length);const s=e.opcoes.map((i,a)=>`
    <button type="button" class="study-option ${r[n]===a?"is-selected":""}" data-option-index="${a}" aria-pressed="${r[n]===a?"true":"false"}">
      <span class="study-option-letter">${String.fromCharCode(65+a)}</span>
      <span>${l(i)}</span>
    </button>
  `).join("");c.innerHTML=`
    <section class="study-question-panel simulado-question-panel">
      <div class="study-question-header">
        <div>
          <span class="study-block-tag">Questão ${n+1}</span>
          <h2>Escolha a alternativa correta</h2>
        </div>
        <span class="study-question-counter">${n+1}/${o}</span>
      </div>
      <div class="study-question-body">
        <div class="study-question-copy">
          <p class="study-question-label">${l(t.materia||"Português")}</p>
          <h3>${l(e.pergunta)}</h3>
        </div>
        <div class="study-options">${s}</div>
      </div>
    </section>
  `,u.disabled=n===0,m.textContent=n===o-1?"Finalizar":"Próxima"};c.addEventListener("click",e=>{const o=e.target.closest("[data-option-index]");o&&(r[n]=Number(o.dataset.optionIndex),g())});u.addEventListener("click",()=>{n!==0&&(n-=1,g())});m.addEventListener("click",()=>{if(r[n]===null){window.alert("Selecione uma alternativa antes de continuar.");return}if(n<t.questoes.length-1){n+=1,g();return}D(!1)});I?z(I):(g(),K());
