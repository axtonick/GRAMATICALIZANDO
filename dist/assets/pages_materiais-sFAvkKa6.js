import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               *//* empty css             *//* empty css                */import"./app-X42WGwqI.js";import{i as c}from"./page-base-BVDhhXmt.js";import{h as p}from"./storage-CrKITpRL.js";c();const a=document.getElementById("materialsList"),d=document.querySelectorAll("#materialFilterButtons .filter-btn");let i="todos";function n(){if(!a)return;const t=p(),r=i==="todos"?t:t.filter(e=>e.categoria===i);if(r.length===0){a.innerHTML=`
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; background: #fff; border-radius: 1rem; border: 1px solid #e8e0f0;">
        <p style="color: #6b607d; margin: 0;">Nenhum material encontrado para esta categoria.</p>
      </div>
    `;return}a.innerHTML=r.map(e=>`
    <article class="dashboard-card" style="background: #ffffff; border: 1px solid rgba(124, 58, 237, 0.12); border-radius: 1.25rem; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 4px 20px rgba(124, 58, 237, 0.04); transition: transform 0.2s ease, box-shadow 0.2s ease;">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.75rem;">
          <span style="font-size: 0.75rem; font-weight: 700; color: #7c3aed; background: #f3f0ff; padding: 3px 10px; border-radius: 999px;">
            ${e.categoria}
          </span>
          <span style="font-size: 0.75rem; color: #a1a1aa; font-weight: 600;">
            ${e.formato} • ${e.tamanho}
          </span>
        </div>
        <h3 style="margin: 0 0 0.5rem; font-size: 1.05rem; color: #1f1630; line-height: 1.35;">
          ${e.titulo}
        </h3>
        <p style="margin: 0; font-size: 0.85rem; color: #6b607d; line-height: 1.5;">
          ${e.descricao}
        </p>
      </div>

      <div style="margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid #f3f0ff; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 0.75rem; color: #a1a1aa;">Atualizado: ${e.data}</span>
        <button 
          type="button"
          data-download-id="${e.id}"
          class="btn-download"
          style="background: #7c3aed; color: #ffffff; border: none; padding: 0.5rem 1rem; border-radius: 0.65rem; font-size: 0.85rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: background 0.15s ease;"
        >
          <span>Abrir PDF</span>
          <span style="font-size: 0.9rem;">↓</span>
        </button>
      </div>
    </article>
  `).join(""),a.querySelectorAll(".btn-download").forEach(e=>{e.addEventListener("click",s=>{const l=s.currentTarget.getAttribute("data-download-id"),o=t.find(f=>f.id===l);o&&(o.link&&o.link!=="#"?window.open(o.link,"_blank","noopener,noreferrer"):window.alert("Este material ainda não possui um PDF anexado."))})})}d.forEach(t=>{t.addEventListener("click",()=>{d.forEach(r=>{r.style.background="#ffffff",r.style.color="#6b607d",r.style.borderColor="#e2d9f3"}),t.style.background="#7c3aed",t.style.color="#ffffff",t.style.borderColor="#7c3aed",i=t.getAttribute("data-cat"),n()})});document.addEventListener("DOMContentLoaded",n);n();
