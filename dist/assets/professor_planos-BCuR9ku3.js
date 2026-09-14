import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               *//* empty css                  */import{i as D}from"./base-bEGeGQbm.js";import{u as r,z as C,A as S,B as M,g as L}from"./storage-CrKITpRL.js";const T=D("planos");if(!T)throw new Error("Acesso negado.");const c=document.getElementById("plansGrid"),v=document.getElementById("planSearch"),g=document.getElementById("openCreatePlanBtn"),k=document.getElementById("summaryTotalPlans"),N=document.getElementById("summaryActivePlans"),q=document.getElementById("summaryInactivePlans"),_=document.getElementById("summaryAssignedPlans"),P=document.querySelector("[data-plan-modal]"),b=document.getElementById("planModalTitle"),d=document.getElementById("planForm"),$=document.getElementById("planName"),x=document.getElementById("planPrice"),A=document.getElementById("planDescription"),E=document.getElementById("planStatus"),h=document.getElementById("savePlanBtn"),I=document.querySelectorAll("[data-filter]");let f="all",p="",u=null;const j={portugues:"Português",redacao:"Redação",videoaulas:"Videoaulas",simulados:"Simulados",material:"Material",cronograma:"Cronograma"},y=(t="")=>String(t||"").trim().toLowerCase(),z=()=>r().filter(e=>!p||y(e.name).includes(p)||y(e.description).includes(p)?f==="active"?e.status==="active":f==="inactive"?e.status!=="active":!0:!1),B=()=>{const t=r(),e=L(),a=t.filter(n=>n.status==="active").length,s=t.length-a,l=e.filter(n=>!!n.plan_id).length;k.textContent=t.length,N.textContent=a,q.textContent=s,_.textContent=l},w=()=>{P.classList.add("hidden"),d.reset(),u=null,b.textContent="Criar plano",h.textContent="Salvar plano"},F=()=>{d.reset(),E.value="active",b.textContent="Criar plano",h.textContent="Salvar plano",u=null,P.classList.remove("hidden")},i=()=>{const t=z();if(!t.length){c.innerHTML='<div class="activity-item"><strong>Nenhum plano encontrado</strong><p>Crie um novo plano para organizar acessos.</p></div>',B();return}c.innerHTML=t.map(e=>{const a=L().filter(o=>o.plan_id===e.id).length,s=Object.entries(j).filter(([o])=>{var m;return!!((m=e.permissions)!=null&&m[o])}).map(([,o])=>o).join(", ")||"Nenhuma permissão",l=e.status==="active"?"Ativo":"Inativo";return`
      <article class="card-item plan-card">
        <div class="plan-card-header">
          <div>
            <span class="status-chip ${e.status==="active"?"concluido":"pendente"}">${l}</span>
            <strong>${e.name||"Plano sem nome"}</strong>
          </div>
          <div class="action-buttons">
            <button class="btn btn-secondary" type="button" data-edit-plan="${e.id}">Editar</button>
            <button class="btn btn-secondary" type="button" data-duplicate-plan="${e.id}">Duplicar</button>
            <button class="btn btn-secondary" type="button" data-toggle-plan="${e.id}">${e.status==="active"?"Desativar":"Ativar"}</button>
            <button class="btn btn-danger" type="button" data-delete-plan="${e.id}">Excluir</button>
          </div>
        </div>
        <p>${e.description||"Sem descrição."}</p>
        <div class="plan-meta-grid">
          <div>
            <span class="detail-label">Preço</span>
            <strong>R$ ${Number(e.price||0).toFixed(2)}</strong>
          </div>
          <div>
            <span class="detail-label">Alunos</span>
            <strong>${a}</strong>
          </div>
        </div>
        <div class="plan-permissions">
          <span class="detail-label">Permissões</span>
          <div class="plan-permissions-list">${s}</div>
        </div>
      </article>
    `}).join(""),B()},O=t=>{u=t.id,$.value=t.name||"",x.value=t.price||0,A.value=t.description||"",E.value=t.status==="inactive"?"inactive":"active",document.querySelectorAll('[name="permission"]').forEach(a=>{var s;a.checked=!!((s=t.permissions)!=null&&s[a.value])}),b.textContent="Editar plano",h.textContent="Atualizar plano",P.classList.remove("hidden")};c==null||c.addEventListener("click",t=>{const e=t.target.closest("[data-edit-plan]"),a=t.target.closest("[data-delete-plan]"),s=t.target.closest("[data-toggle-plan]"),l=t.target.closest("[data-duplicate-plan]");if(e){const n=r().find(o=>o.id===e.dataset.editPlan);n&&O(n);return}if(l){const n=r().find(m=>m.id===l.dataset.duplicatePlan);if(!n)return;const o={...n,id:`plan_${Date.now()}`,name:`${n.name||"Plano"} (cópia)`,status:"inactive",created_at:new Date().toISOString(),updated_at:new Date().toISOString()};C(o),i();return}if(s){const n=r().find(o=>o.id===s.dataset.togglePlan);if(!n)return;S(n.id,{status:n.status==="active"?"inactive":"active"}),i();return}if(a){const n=a.dataset.deletePlan;if(!window.confirm("Deseja excluir este plano?"))return;M(n),i()}});g==null||g.addEventListener("click",F);v==null||v.addEventListener("input",t=>{p=y(t.target.value),i()});I.forEach(t=>{t.addEventListener("click",()=>{I.forEach(e=>e.classList.remove("active")),t.classList.add("active"),f=t.dataset.filter||"all",i()})});d==null||d.addEventListener("submit",t=>{t.preventDefault();const e={};document.querySelectorAll('[name="permission"]:checked').forEach(s=>{e[s.value]=!0});const a={name:$.value.trim(),description:A.value.trim(),price:Number(x.value||0),status:E.value||"active",permissions:e};if(!a.name){window.alert("Informe o nome do plano.");return}u?S(u,a):C(a),w(),i()});document.querySelectorAll("[data-modal-close]").forEach(t=>{t.addEventListener("click",w)});i();
