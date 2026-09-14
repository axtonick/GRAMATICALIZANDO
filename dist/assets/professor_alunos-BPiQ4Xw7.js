import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               *//* empty css                  */import{i as x}from"./base-mwdddXjL.js";import{g as T,i as b,v as D,w as h}from"./storage-GM3fP61i.js";import{n as g,s as o}from"./utils-CfagMjON.js";const w=x("students");if(!w)throw new Error("Acesso negado.");const I=document.getElementById("studentSearch"),E=document.querySelectorAll("[data-filter]"),p=document.querySelector("#studentTable tbody"),S=document.getElementById("noStudentsMessage"),f=document.querySelector("[data-student-modal]"),j=document.querySelectorAll("[data-modal-close]"),A=document.getElementById("studentModalName"),_=document.getElementById("studentModalEmail"),k=document.getElementById("studentModalType"),N=document.getElementById("studentModalDiagnosis"),q=document.getElementById("studentModalInfo"),v=document.getElementById("studentPlanSelect"),M=document.getElementById("studentPlanStartDate"),B=document.getElementById("studentPlanEndDate"),H=document.getElementById("studentPlanPermissions"),l=document.getElementById("updateStudentPlanBtn"),U=document.getElementById("summaryTotal"),R=document.getElementById("summaryActive"),O=document.getElementById("summaryInactive"),V=document.getElementById("summaryScore"),z=document.getElementById("recentStudentsList");let y="all";const c=T(),F=b(),P=n=>F.filter(e=>e.autor&&e.autor===n.email||e.autorId&&e.autorId===n.id).length,$=n=>{const e=P(n);return n.diagnostico?Math.min(100,50+e*15):Math.min(55,Math.max(10,e*12))},G=n=>{const e=h().find(t=>t.id===n.plan_id);return(e==null?void 0:e.name)||"Sem plano"},J=n=>{if(!n)return"Sem plano vinculado.";const e=Object.entries({portugues:"Português",redacao:"Redação",videoaulas:"Videoaulas",simulados:"Simulados",material:"Material",cronograma:"Cronograma"}).filter(([t])=>{var s;return(s=n.permissions)==null?void 0:s[t]}).map(([,t])=>t);return e.length?e.join(", "):"Nenhuma permissão ativa."},C=(n="")=>n.trim().split(/\s+/).slice(0,2).map(t=>{var s;return((s=t[0])==null?void 0:s.toUpperCase())||""}).join("")||"A",L=()=>{const n=c.length,e=c.filter(d=>!!d.diagnostico).length,t=n-e,s=n?Math.round(c.reduce((d,a)=>d+$(a),0)/n):0;U.textContent=n,R.textContent=e,O.textContent=t,V.textContent=`${s}%`},K=()=>{const n=[...c].sort((e,t)=>new Date(t.criadoEm||0)-new Date(e.criadoEm||0)).slice(0,4);z.innerHTML=n.map(e=>{const t=C(e.nome),s=e.criadoEm?new Date(e.criadoEm).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric"}):"Sem data";return`
      <div class="recent-student-item">
        <span class="recent-student-avatar">${t}</span>
        <div class="recent-student-info">
          <strong>${o(e.nome)}</strong>
          <small>Cadastrado há ${o(s)}</small>
        </div>
      </div>
    `}).join("")},m=()=>{const n=g(I.value),e=c.filter(t=>g(t.nome).includes(n)||g(t.email).includes(n)?y==="active"?!!t.diagnostico:y==="inactive"?!t.diagnostico:!0:!1);if(!e.length){p.innerHTML="",S.style.display="block";return}S.style.display="none",p.innerHTML=e.map(t=>{const s=P(t),d=$(t),a=t.diagnostico?"Concluído":"Pendente",r=o(t.nome),u=C(t.nome);return`
      <tr>
        <td><input type="checkbox" aria-label="Selecionar aluno ${r}" /></td>
        <td>
          <div class="student-cell">
            <span class="recent-student-avatar">${u}</span>
            <div>
              <strong>${r}</strong>
            </div>
          </div>
        </td>
        <td>${o(t.email)}</td>
        <td>${o(G(t))}</td>
        <td>${a}</td>
        <td>${s}</td>
        <td class="progress-cell">
          <div class="progress-track">
            <span class="progress-fill" style="width: ${d}%"></span>
          </div>
          <small>${d}%</small>
        </td>
        <td><button type="button" class="btn btn-secondary" data-view-student="${t.email}">Ver perfil</button></td>
      </tr>
    `}).join(""),p.querySelectorAll("[data-view-student]").forEach(t=>{t.addEventListener("click",s=>{const d=s.currentTarget.dataset.viewStudent,a=c.find(i=>i.email===d);if(!a)return;const r=h();A.textContent=o(a.nome),_.textContent=o(a.email),k.textContent=o(a.tipo||"Cliente"),N.textContent=a.diagnostico?"Diagnóstico disponível":"Sem diagnóstico",q.textContent=a.diagnostico?`Objetivo: ${a.diagnostico.objetivo||"—"} · Prova: ${a.diagnostico.prova||"—"} · Horas: ${a.diagnostico.horas_semanais||"—"}`:"Nenhuma informação extra disponível.",v.innerHTML=['<option value="">Sem plano</option>'].concat(r.map(i=>`<option value="${i.id}">${o(i.name)}</option>`)).join(""),v.value=a.plan_id||"",M.value=a.plan_start_date||"",B.value=a.plan_end_date||"";const u=r.find(i=>i.id===a.plan_id);H.textContent=J(u),l.dataset.studentId=a.id||a.email,f.classList.remove("hidden")})})};l==null||l.addEventListener("click",()=>{const n=l.dataset.studentId,e=v.value||null,t=M.value||"",s=B.value||"";if(n){if(t&&s&&s<t){window.alert("A data final deve ser igual ou posterior à data inicial.");return}D(n,e,{startDate:t,endDate:s}),L(),m(),f.classList.add("hidden")}});I.addEventListener("input",m);E.forEach(n=>{n.addEventListener("click",()=>{E.forEach(e=>e.classList.remove("active")),n.classList.add("active"),y=n.dataset.filter,m()})});j.forEach(n=>{n.addEventListener("click",()=>f.classList.add("hidden"))});L();K();m();
