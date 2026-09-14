import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               *//* empty css                  */import{i as M}from"./base-mwdddXjL.js";import{E as k,F as N,k as R}from"./storage-GM3fP61i.js";const O=M("portugues");if(!O)throw new Error("Acesso negado.");const I=document.getElementById("contentForm"),v=document.getElementById("blocksList"),Q=document.getElementById("emptyBlocks"),q=document.getElementById("contentType"),U=new URLSearchParams(window.location.search),f=U.get("id"),j=20*1024*1024;let r=[];const d=(t="")=>String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"),$=(t="texto")=>({id:`block-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,tipo:t,titulo:"",conteudo:"",link:"",pdf:"",imagem:"",nome:"",alternativas:"",respostaCorreta:"a"}),g=(t="")=>Array.isArray(t)?t.map(e=>(typeof e=="string"?e:String((e==null?void 0:e.texto)||"")).trim()).filter(Boolean):String(t||"").split(/\n+/).map(e=>e.trim()).filter(Boolean),A=t=>String.fromCharCode(65+t),z=t=>new Promise((e,o)=>{const a=new FileReader;a.addEventListener("load",()=>e(a.result)),a.addEventListener("error",()=>o(new Error("Não foi possível ler o arquivo."))),a.readAsDataURL(t)}),m=()=>{Q.classList.toggle("hidden",r.length>0),v.innerHTML=r.map((t,e)=>{const o=t.tipo==="texto",a=t.tipo==="questao",s=t.tipo==="pdf",n=t.tipo==="imagem",l=s||n,c=o?"Conteúdo da explicação":a?"Enunciado da questão":l?`Upload de ${s?"PDF":"imagem"}`:t.tipo==="video"?"Endereço do vídeo":"Endereço do link",i=o||a?t.conteudo:s?t.pdf:n?t.imagem:t.link,h=s?".pdf,application/pdf":"image/*",L=!!t.imagem,E=t.nome||(s&&t.pdf||n&&t.imagem?"Arquivo carregado":"Nenhum arquivo selecionado"),C=s?"pdf":"imagem",b=g(t.alternativas),w=b.length?b:["Alternativa 1","Alternativa 2","Alternativa 3","Alternativa 4"],T=w.map((B,p)=>`
        <div class="question-option-row">
          <span class="question-option-letter">${A(p)}</span>
          <input type="text" data-field="alternativa" data-alt-index="${p}" value="${d(B)}" placeholder="Alternativa ${p+1}">
          <button type="button" class="btn-icon" data-remove-alternative data-alt-index="${p}" aria-label="Remover alternativa">🗑️</button>
        </div>
      `).join(""),P=a?`
      <div class="question-editor-layout">
        <div class="question-editor-main">
          <div class="input-group">
            <label>Enunciado da questão</label>
            <textarea data-field="conteudo" class="textarea-large" rows="6" placeholder="Escreva o enunciado da questão.">${d(i)}</textarea>
          </div>
          <div class="input-group">
            <label>Alternativas</label>
            <div class="question-options-list">${T}</div>
            <div class="question-options-actions">
              <button type="button" class="btn btn-secondary btn-inline" data-add-alternative>+ Adicionar alternativa</button>
              <label class="switch-inline">
                <input type="checkbox">
                <span>Embaralhar alternativas</span>
              </label>
            </div>
          </div>
          <div class="input-group">
            <label>Alternativa correta</label>
            <select data-field="respostaCorreta">
              ${w.map((B,p)=>{const y=A(p),x=y.toLowerCase();return`<option value="${x}" ${String(t.respostaCorreta||"").toLowerCase()===x?"selected":""}>${y}</option>`}).join("")}
            </select>
          </div>
        </div>
        <div class="question-editor-side">
          <div class="question-upload-card">
            <div class="question-upload-header">
              <span class="question-upload-icon">🖼️</span>
              <label class="question-upload-button">
                <input data-field="imagem" type="file" accept="image/*">
                <span>${L?"Trocar imagem":"Selecionar imagem"}</span>
              </label>
            </div>
            <div class="question-upload-preview">
              ${t.imagem?`<img class="content-block-image block-image-preview" src="${d(t.imagem)}" alt="${d(t.nome||t.titulo||"Prévia da imagem")}">`:'<div class="question-upload-empty">Clique para enviar imagem<br><small>PNG, JPG ou WEBP</small></div>'}
            </div>
            <small class="field-help">${d(E)}. Limite de 20 MB.</small>
          </div>
        </div>
      </div>
    `:"",D=`<input data-field="${C}" type="file" accept="${h}"><small class="field-help">${d(E)}. Limite de 20 MB.</small>${n&&i?`<img class="content-block-image block-image-preview" src="${d(i)}" alt="${d(t.nome||t.titulo||"Prévia da imagem")}">`:""}`,F=a?P:"";return`<article class="block-field-card" data-block-id="${d(t.id)}">
      <div class="block-editor-header"><div><h3>Bloco ${e+1}</h3><p>Escolha o formato e preencha as informações.</p></div><button type="button" class="btn btn-secondary" data-remove-block>Remover</button></div>
      <div class="block-setup-grid"><div class="input-group"><label>Título do bloco</label><input type="text" data-field="titulo" maxlength="120" value="${d(t.titulo)}" placeholder="Ex.: Regra principal"></div><div class="input-group"><label>Tipo</label><select data-field="tipo"><option value="texto" ${t.tipo==="texto"?"selected":""}>Texto</option><option value="questao" ${t.tipo==="questao"?"selected":""}>Questão</option><option value="imagem" ${t.tipo==="imagem"?"selected":""}>Imagem</option><option value="video" ${t.tipo==="video"?"selected":""}>Vídeo</option><option value="pdf" ${t.tipo==="pdf"?"selected":""}>PDF enviado</option><option value="link" ${t.tipo==="link"?"selected":""}>Link</option></select></div></div>
      ${o?`<div class="input-group"><label>${c}</label><textarea data-field="conteudo" class="textarea-large" rows="6" placeholder="Escreva a explicação, exemplos e orientações.">${d(i)}</textarea></div>`:a?"":l?`<div class="input-group"><label>${c}</label>${D}</div>`:`<div class="input-group"><label>${c}</label><input data-field="link" type="url" value="${d(i)}" placeholder="https://..."><small class="field-help">Cole um endereço público para o aluno acessar.</small></div>`}
      ${a?F:""}
      ${l?`<div class="input-group"><label>${n?"Texto alternativo":"Nome exibido do arquivo"}</label><input type="text" data-field="nome" value="${d(t.nome)}" placeholder="Ex.: ${n?"Ilustração da regra":"Apostila de revisão"}"></div>`:""}
    </article>`}).join(""),document.getElementById("summaryBlocks").textContent=String(r.length)},S=(t,e)=>{const o=r.find(a=>a.id===t.dataset.blockId);if(o){if(e.dataset.field==="alternativa"){const a=g(o.alternativas),s=Number(e.dataset.altIndex??0);a[s]=e.value,o.alternativas=a;return}o[e.dataset.field]=e.value}};v.addEventListener("input",t=>{const e=t.target.closest("[data-field]");e&&e.type!=="file"&&S(e.closest("[data-block-id]"),e)});v.addEventListener("change",t=>{const e=t.target.closest("[data-field]");if(!e)return;const o=e.closest("[data-block-id]");S(o,e),e.dataset.field==="tipo"&&m()});v.addEventListener("change",async t=>{const e=t.target.closest('[data-field="pdf"], [data-field="imagem"]');if(!e||!e.files[0])return;const o=r.find(l=>l.id===e.closest("[data-block-id]").dataset.blockId),a=e.files[0],s=e.dataset.field==="pdf";if(!(s?a.type==="application/pdf":a.type.startsWith("image/"))){window.alert(`Selecione ${s?"um arquivo PDF":"uma imagem"} válido.`),e.value="";return}if(a.size>j){window.alert("O arquivo deve ter no máximo 20 MB."),e.value="";return}try{o[e.dataset.field]=await z(a),o.nome=o.nome||a.name,m()}catch(l){window.alert(l.message)}});v.addEventListener("click",t=>{const e=t.target.closest("[data-block-id]");if(!e)return;if(t.target.closest("[data-remove-block]")){r=r.filter(n=>n.id!==e.dataset.blockId),m();return}if(t.target.closest("[data-add-alternative]")){const n=r.find(c=>c.id===e.dataset.blockId);if(!n)return;const l=g(n.alternativas);l.push(`Alternativa ${l.length+1}`),n.alternativas=l,m();return}const s=t.target.closest("[data-remove-alternative]");if(s){const n=r.find(i=>i.id===e.dataset.blockId);if(!n)return;const l=g(n.alternativas),c=Number(s.dataset.altIndex??0);l.splice(c,1),n.alternativas=l.length?l:["Alternativa 1"],m()}});document.getElementById("addBlockBtn").addEventListener("click",()=>{var t;r.push($()),m(),(t=v.lastElementChild)==null||t.scrollIntoView({behavior:"smooth",block:"nearest"})});["contentTitle","contentTheme"].forEach(t=>document.getElementById(t).addEventListener("input",()=>{document.getElementById(t==="contentTitle"?"summaryTitle":"summaryTheme").textContent=document.getElementById(t).value.trim()||(t==="contentTitle"?"Sem título":"Sem tema")}));I.addEventListener("submit",t=>{var c;t.preventDefault();const e=new FormData(I),o=String(e.get("titulo")||"").trim(),a=String(e.get("tema")||"").trim(),s=String(e.get("tipo")||"aula"),n=String(((c=t.submitter)==null?void 0:c.value)||"rascunho");if(!o||!a)return window.alert("Preencha o título e o tema do conteúdo.");if(!r.length)return window.alert("Adicione pelo menos um bloco ao conteúdo.");if(r.some(i=>{if(!i.titulo.trim())return!0;if(i.tipo==="texto")return!i.conteudo.trim();if(i.tipo==="questao"){const h=g(i.alternativas);return!i.conteudo.trim()||h.length===0||!String(i.respostaCorreta||"").trim()}return i.tipo==="imagem"?!i.imagem:i.tipo==="pdf"?!i.pdf:!(i.link||"").trim()}))return window.alert("Complete o título e o conteúdo de cada bloco.");const l={titulo:o,tema:a,tipo:s,nivel:String(e.get("nivel")||"Médio"),descricao:String(e.get("descricao")||"").trim(),status:n,blocos:r,atualizadoEm:new Date().toISOString()};f?k(f,l):N({id:`content-${Date.now()}`,...l,criadoEm:new Date().toISOString()}),window.location.href="./portugues.html"});const u=f?R().find(t=>t.id===f):null;u?(document.getElementById("pageTitle").textContent="Editar conteúdo",document.getElementById("contentTitle").value=u.titulo||"",document.getElementById("contentTheme").value=u.tema||"",q&&(q.value=u.tipo||"aula"),document.getElementById("contentLevel").value=u.nivel||"Médio",document.getElementById("contentDescription").value=u.descricao||"",r=Array.isArray(u.blocos)?u.blocos.map(t=>({...$(t.tipo),...t})):[],document.getElementById("summaryTitle").textContent=u.titulo||"Sem título",document.getElementById("summaryTheme").textContent=u.tema||"Sem tema"):r.push($());m();
