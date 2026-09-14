import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               *//* empty css                  */import{i as O}from"./base-mwdddXjL.js";import{i as v,x as P}from"./storage-GM3fP61i.js";import{n as k,s as c,f as R,t as q}from"./utils-CfagMjON.js";const U=O("essays");if(!U)throw new Error("Acesso negado.");const F=document.getElementById("essaySearch"),D=document.querySelectorAll("[data-filter]"),L=document.getElementById("essayTableBody"),M=document.getElementById("noEssaysMessage"),_=document.getElementById("priorityList"),V=document.getElementById("recentActivitiesList"),G=document.getElementById("summaryTotal"),J=document.getElementById("summaryPending"),K=document.getElementById("summaryReviewed"),Q=document.getElementById("summaryAverage"),E=document.querySelector("[data-prof-correction-modal]"),W=document.querySelectorAll("[data-prof-correction-close]"),X=document.getElementById("profCorrectionForm"),B=document.getElementById("profCorrectionPhoto"),h=document.getElementById("profCorrectionPreview"),Y=document.getElementById("profCorrectionAluno"),Z=document.getElementById("profCorrectionEmail"),tt=document.getElementById("profCorrectionTema"),et=document.getElementById("profCorrectionDate"),H=document.getElementById("profOriginalImage"),p=document.getElementById("profDownloadOriginal"),C=document.getElementById("profScore"),I=document.getElementById("profFeedbackText"),$=document.getElementById("profReopenBtn"),g=document.getElementById("profSubmitBtn");let f="all",m=null,i=v();const d=t=>{if(!t)return"pendente";const e=String(t).trim().toLowerCase();return e==="concluido"||e==="corrigida"||e==="corrigido"?"concluido":e==="em revisao"||e==="em_revisao"||e==="revisao"?"em_revisao":"pendente"},N=t=>t==="concluido"?"Corrigida":t==="em_revisao"?"Em revisão":"Pendente",j=t=>t==="concluido"?"concluido":"pendente",S=(t="")=>String(t||"").trim().split(/\s+/).slice(0,2).map(n=>{var o;return((o=n[0])==null?void 0:o.toUpperCase())||""}).join("")||"A",y=t=>t.tema_da_redacao||t.tema_gerado||"Tema não informado",b=t=>c(t.autor||"Aluno"),nt=t=>{const e=t.map(n=>{var o;return Number(((o=n.feedback)==null?void 0:o.nota)??n.nota)}).filter(n=>Number.isFinite(n));return e.length?Number((e.reduce((n,o)=>n+o,0)/e.length).toFixed(1)):0},T=()=>{const t=i.length,e=i.filter(r=>d(r.status)!=="concluido").length,n=i.filter(r=>d(r.status)==="concluido").length,o=nt(i);G.textContent=t,J.textContent=e,K.textContent=n,Q.textContent=`${o}`},x=()=>{const t=i.filter(e=>d(e.status)!=="concluido").sort((e,n)=>new Date(e.criadoEm||0)-new Date(n.criadoEm||0)).slice(0,3);if(!t.length){_.innerHTML='<div class="activity-item"><strong>Nenhuma redação prioritária</strong><p>Todos os envios já estão concluídos.</p></div>';return}_.innerHTML=t.map(e=>{const n=S(e.autor),o=y(e),r=N(d(e.status));return`
      <div class="recent-student-item">
        <span class="recent-student-avatar">${n}</span>
        <div class="recent-student-info">
          <strong>${b(e)}</strong>
          <small>${c(o)}</small>
        </div>
        <span class="status-chip ${j(d(e.status))}">${r}</span>
      </div>
    `}).join("")},w=()=>{const t=[...i].sort((e,n)=>new Date(n.criadoEm||0)-new Date(e.criadoEm||0)).slice(0,4);V.innerHTML=t.map(e=>`
    <div class="recent-student-item">
      <span class="recent-student-avatar">${S(e.autor)}</span>
      <div class="recent-student-info">
        <strong>${b(e)}</strong>
        <small>${c(y(e))}</small>
      </div>
      <small>${q(e.criadoEm)}</small>
    </div>
  `).join("")},u=()=>{const t=k(F.value),e=i.filter(n=>{const o=k(`${n.tema_da_redacao||""} ${n.tema_gerado||""} ${n.autor||""} ${n.autorId||""}`);if(!(!t||o.includes(t)))return!1;const s=d(n.status);return f==="pendente"?s==="pendente":f==="concluido"?s==="concluido":f==="em_revisao"?s==="em_revisao":!0});if(!e.length){L.innerHTML="",M.style.display="block";return}M.style.display="none",L.innerHTML=e.map(n=>{var A;const o=d(n.status),r=((A=n.feedback)==null?void 0:A.nota)??n.nota??"—",s=n.dataPrazo||"—",a=N(o),l=o==="concluido"?"Ver":o==="em_revisao"?"Revisar":"Corrigir",z=o==="concluido"?"btn btn-secondary":"btn btn-primary";return`
      <tr>
        <td><input type="checkbox" aria-label="Selecionar redação de ${c(n.autor||"Aluno")}" /></td>
        <td>
          <div class="student-cell">
            <span class="recent-student-avatar">${S(n.autor)}</span>
            <div>
              <strong>${b(n)}</strong>
            </div>
          </div>
        </td>
        <td>${c(y(n))}</td>
        <td>${R(n.criadoEm)}</td>
        <td><span class="status-chip ${j(o)}">${a}</span></td>
        <td>${r}</td>
        <td>${c(s)}</td>
        <td>
          <div class="action-buttons">
            <button type="button" class="${z}" data-action="open" data-essay-id="${n.id}">${l}</button>
          </div>
        </td>
      </tr>
    `}).join(""),L.querySelectorAll('[data-action="open"]').forEach(n=>{n.addEventListener("click",o=>{const r=o.currentTarget.dataset.essayId,s=i.find(a=>a.id===r);s&&rt(s)})})},ot=()=>{B.value="",h.innerHTML="",C.value="",I.value="",H.innerHTML="Sem imagem disponível",p.href="#",p.style.display="none",$.style.display="none",g.disabled=!1,g.textContent="Enviar correção e concluir"},rt=t=>{var e,n,o;if(m=t.id,ot(),Y.textContent=b(t),Z.textContent=c(t.email||t.autor||"—"),tt.textContent=c(y(t)),et.textContent=R(t.criadoEm),t.foto||t.imagemBase64){const r=t.foto||t.imagemBase64;H.innerHTML=`<img src="${r}" alt="Redação original" />`,p.href=r,p.style.display="inline-flex"}C.value=((e=t.feedback)==null?void 0:e.nota)??t.nota??"",I.value=((n=t.feedback)==null?void 0:n.message)||((o=t.feedback)==null?void 0:o.messageText)||"",d(t.status)==="concluido"&&($.style.display="inline-flex"),E.classList.remove("hidden")},at=t=>{if(!t){h.innerHTML="";return}const e=new FileReader;e.onload=n=>{h.innerHTML=`<img src="${n.target.result}" alt="Foto da correção" />`},e.readAsDataURL(t)};B.addEventListener("change",t=>{at(t.target.files[0])});X.addEventListener("submit",t=>{var s;if(t.preventDefault(),!m||!window.confirm("Deseja concluir a correção e salvar as alterações?"))return;const e=B.files[0],n=C.value,o=I.value.trim(),r=a=>{g.disabled=!0,g.textContent="Enviando...";const l={message:o||"",foto:a||"",nota:n?Number(n):null};P(m,{feedback:l,status:"concluido",corrigidoEm:new Date().toISOString()}),setTimeout(()=>{E.classList.add("hidden"),i=v(),T(),x(),w(),u()},300)};if(e){const a=new FileReader;a.onload=l=>r(l.target.result),a.readAsDataURL(e)}else{const a=i.find(l=>l.id===m);r(((s=a==null?void 0:a.feedback)==null?void 0:s.foto)||"")}});$.addEventListener("click",()=>{m&&(P(m,{status:"pendente"}),E.classList.add("hidden"),i=v(),T(),x(),w(),u())});W.forEach(t=>{t.addEventListener("click",()=>E.classList.add("hidden"))});F.addEventListener("input",u);D.forEach(t=>{t.addEventListener("click",()=>{D.forEach(e=>e.classList.remove("active")),t.classList.add("active"),f=t.dataset.filter,u()})});i=v();T();x();w();u();
