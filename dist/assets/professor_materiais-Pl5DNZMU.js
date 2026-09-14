import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               *//* empty css                  */import{i as c}from"./base-bEGeGQbm.js";import{x as m,h as u,y as p}from"./storage-CrKITpRL.js";c("materiais");const o=document.getElementById("professorMaterialsList"),s=document.getElementById("formAddMaterial"),f=20*1024*1024,g=a=>new Promise((e,i)=>{const t=new FileReader;t.addEventListener("load",()=>e(t.result)),t.addEventListener("error",()=>i(new Error("Não foi possível ler o PDF."))),t.readAsDataURL(a)});function n(){if(!o)return;const a=u();if(a.length===0){o.innerHTML='<div class="activity-item">Nenhum material cadastrado.</div>';return}o.innerHTML=a.map(e=>`
    <article class="activity-item" style="display: flex; justify-content: space-between; align-items: center;">
      <div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <span class="video-lesson-badge recorded">${e.categoria}</span>
          <span style="font-size: 0.8rem; color: #7c3aed; font-weight: 700;">${e.formato} (${e.tamanho})</span>
        </div>
        <strong style="display: block; margin-top: 4px; font-size: 1rem;">${e.titulo}</strong>
        <p style="margin: 2px 0 0; font-size: 0.85rem; color: #6b607d;">${e.descricao}</p>
      </div>
      <button 
        data-del-id="${e.id}" 
        class="btn-del-mat"
        style="background: #fee2e2; color: #dc2626; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.85rem;"
      >
        Excluir
      </button>
    </article>
  `).join(""),o.querySelectorAll(".btn-del-mat").forEach(e=>{e.addEventListener("click",i=>{const t=i.currentTarget.getAttribute("data-del-id");p(t),n()})})}s&&s.addEventListener("submit",async a=>{a.preventDefault();const e=document.getElementById("matTitulo").value.trim(),i=document.getElementById("matCategoria").value,t=document.getElementById("matDescricao").value.trim(),r=document.getElementById("matArquivo").files[0];if(!e||!r)return window.alert("Informe o título e selecione um arquivo PDF.");if(r.type!=="application/pdf"&&!r.name.toLowerCase().endsWith(".pdf"))return window.alert("O arquivo precisa ser um PDF.");if(r.size>f)return window.alert("O PDF deve ter no máximo 20 MB.");let d;try{d=await g(r)}catch(l){return window.alert(l.message)}m({id:"mat-"+Date.now(),titulo:e,categoria:i,descricao:t||"Material didático disponibilizado pelo professor.",formato:"PDF",tamanho:`${(r.size/(1024*1024)).toFixed(2)} MB`,data:new Date().toLocaleDateString("pt-BR"),link:d,nomeArquivo:r.name}),s.reset(),n()});document.addEventListener("DOMContentLoaded",n);n();
