import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               *//* empty css             *//* empty css                */import"./app-X42WGwqI.js";import{i as T}from"./page-base-BVDhhXmt.js";import{d as I,l as h,i as v}from"./storage-CrKITpRL.js";T();const $=document.querySelector("[data-modal-overlay]"),f=document.querySelector("[data-correction-modal]"),b=document.querySelectorAll("[data-modal-close]"),w=document.querySelectorAll("[data-correction-close]"),C=document.getElementById("regenerateTheme"),s=document.getElementById("generatedTheme"),u=document.getElementById("essayTheme"),p=document.getElementById("essayPhoto"),g=document.getElementById("photoPreview"),c=document.getElementById("correctionMessage"),A=document.getElementById("essayForm"),d=document.getElementById("essayHistory"),y=["A importância da educação crítica na formação cidadã.","Os desafios do ensino híbrido e a inclusão digital.","Como desenvolver o pensamento crítico no ambiente escolar.","Os impactos da tecnologia na qualidade da aprendizagem.","A leitura como ferramenta de construção de conhecimento.","O papel da escola na promoção da saúde mental dos estudantes.","A influência das redes sociais no comportamento dos jovens.","Educação ambiental: desafios para a escola do século XXI.","A valorização dos professores na sociedade contemporânea.","Como a escrita contribui para a argumentação em debates públicos."],l=I(),E=()=>y[Math.floor(Math.random()*y.length)],i=e=>{$.classList.toggle("hidden",!e),e&&(s.textContent=E(),u.value=s.textContent,p.value="",g.innerHTML="")},H=(e,t)=>{const a=document.getElementById("correctionImageContainer"),n=document.getElementById("downloadOriginalBtn"),o=document.getElementById("downloadCorrectionBtn");if(a.innerHTML="",n.style.display="none",o.style.display="none",n.href="#",o.href="#",!e)c.innerHTML="Nenhuma correção disponível no momento. Aguarde o professor analisar a redação.";else if(typeof e=="string")c.textContent=e;else{const r=[];e.nota!=null&&e.nota!==""&&r.push(`<p><strong>Nota:</strong> ${e.nota}/10</p>`),e.message&&r.push(`<p>${e.message}</p>`),c.innerHTML=r.join(""),e.foto&&(a.innerHTML=`<div class="essay-photo"><img src="${e.foto}" alt="Foto da correção"></div>`,o.href=e.foto,o.style.display="inline-block")}t&&(n.href=t,n.style.display="inline-block"),f.classList.remove("hidden")},S=()=>{f.classList.add("hidden")},x=e=>{const t=new FileReader;t.onload=a=>{g.innerHTML=`<img src="${a.target.result}" alt="Foto da redação">`},t.readAsDataURL(e)};p.addEventListener("change",e=>{const t=e.target.files[0];t?x(t):g.innerHTML=""});const L=()=>{document.querySelectorAll("[data-open-write]").forEach(e=>{e.onclick=()=>i(!0)})};L();b.forEach(e=>{e.addEventListener("click",()=>i(!1))});w.forEach(e=>{e.addEventListener("click",()=>S())});C.addEventListener("click",()=>{const e=E();s.textContent=e,u.value=e});const m=()=>{const e=v().slice().reverse();if(!e.length){d.innerHTML=`
      <article class="redacao-empty-card">
        <div class="redacao-empty-content">
          <div class="redacao-empty-icon">📄</div>
          <h3>Sua primeira redação começa aqui</h3>
          <p>Crie uma nova redação e receba correções personalizadas para evoluir sua escrita.</p>
          <button type="button" class="btn btn-primary" data-open-write>+ Criar minha primeira redação</button>
        </div>
      </article>
    `;return}d.innerHTML=e.map(t=>`
      <article class="dashboard-card essay-card">
        <div class="essay-card-header">
          <div>
            <h3>${t.tema_da_redacao||t.tema_gerado}</h3>
            <p class="status-badge ${t.status}">${t.status==="concluido"?"Concluído":"Pendente"}</p>
          </div>
          <span>${new Date(t.criadoEm).toLocaleDateString("pt-BR")}</span>
        </div>
        <p><strong>Tema gerado:</strong> ${t.tema_gerado}</p>
        <p><strong>Enviado como:</strong> ${t.tema_da_redacao}</p>
        ${t.texto?`<p class="essay-excerpt">${t.texto.slice(0,160)}${t.texto.length>160?"...":""}</p>`:'<p class="essay-excerpt">Redação enviada como imagem.</p>'}
        ${t.foto?`<div class="essay-photo"><img src="${t.foto}" alt="Foto da redação"></div>`:""}
        <div class="essay-actions">
          <button type="button" class="btn btn-secondary" data-view-correction="${t.id}">Ver correção</button>
        </div>
      </article>
    `).join(""),d.querySelectorAll("[data-view-correction]").forEach(t=>{t.addEventListener("click",a=>{const n=a.currentTarget.getAttribute("data-view-correction"),o=v().find(M=>M.id===n),r=(o==null?void 0:o.feedback)||null,B=(o==null?void 0:o.foto)||null;H(r,B)})}),L()};A.addEventListener("submit",e=>{e.preventDefault();const t=u.value.trim(),a=p.files[0];if(!t||!a){alert("Envie a foto da redação pronta antes de salvar.");return}const n={id:`${Date.now()}-${Math.random().toString(16).slice(2)}`,tema_gerado:s.textContent,tema_da_redacao:t,texto:"",foto:"",feedback:"",status:"pendente",criadoEm:new Date().toISOString(),autor:(l==null?void 0:l.email)||"anônimo"};if(a){const o=new FileReader;o.onload=r=>{n.foto=r.target.result,h(n),m(),i(!1)},o.readAsDataURL(a)}else h(n),m(),i(!1)});m();
