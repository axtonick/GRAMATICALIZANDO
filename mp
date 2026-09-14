==================================================
REVISAO GERAL DO PROJETO - GRAMATICALIZANDO
==================================================

Data da análise: 2026-09-14
Projeto: grammaticalizando
Base da análise: estrutura real do workspace, rotas, controladores, páginas, scripts, JSONs e comportamento em execução.


==================================================
1. RESUMO GERAL DO PROJETO
==================================================

O Gramaticalizando é uma plataforma EAD/LMS para ensino de Língua Portuguesa, com foco em aulas, exercícios, diagnósticos, redações, materiais, cronograma, planos e gestão de alunos/professor.

O projeto possui duas camadas que convivem ao mesmo tempo:
- Camada moderna no back-end em Express, com rotas em src/routes/, controllers em src/controllers/ e persistência em JSON via src/data/jsonStore.js.
- Camada legada no front-end em public/assets/js/, que usa localStorage, seed de dados e lógica de autenticação/planos separada.

Isso faz o sistema parecer "funcional", mas na prática ele está em um estado híbrido e parcialmente inconsistente.

Público-alvo:
- alunos que estudam português, redação, ENEM e concursos;
- professores/admins que publicam conteúdo, acompanham alunos e corrigem redações.

Arquitetura atual observada:
- Back-end: Express + express-session + bcryptjs + JSON files.
- Front-end: páginas HTML/CSS/JS estáticas em public/.
- Persistência: JSON em raiz do projeto, com suporte a /tmp/gramaticalizando_data no ambiente Vercel.

Como os dados são armazenados:
- src/config/paths.js aponta os JSONs usados pelo servidor.
- src/data/jsonStore.js centraliza leitura/escrita, validação e garantia de estrutura do objeto estudos.
- Arquivos principais: usuarios.json, materias.json, aulas.json, exercicios.json, redacoes.json, cursos.json e categorias.json.

Como a navegação funciona:
- src/app.js serve páginas públicas, aliases e rotas de API.
- O ambiente do aluno usa public/pages/.
- O ambiente do professor usa public/professor/.
- Há páginas administrativas protegidas por middleware em src/middlewares/auth.js.

Como a área do aluno funciona:
- cadastro + login
- diagnóstico inicial
- navegação por matérias, aulas e exercícios
- conclusão de aulas
- envio de redações
- acompanhamento de progresso dentro de usuarios.json

Como a área do professor funciona:
- painel geral
- listagem de alunos
- gestão de matérias, aulas e exercícios
- correção de redações
- gestão de planos e permissões (parcialmente implementada no front-end)

Observação importante:
- O back-end moderno existe e já implementa parte da lógica real.
- O front-end legado ainda atua como fonte paralela de dados, o que gera risco de inconsistência e pode mascarar falhas reais.


==================================================
2. ESTRUTURA DO PROJETO
==================================================

Principais pastas e arquivos importantes:

/src
- src/server.js: inicia o servidor.
- src/app.js: monta Express, sessões, aliases, rotas e arquivos estáticos.
- src/routes/: rotas da API.
- src/controllers/: lógica de business e regras de leitura/escrita.
- src/data/jsonStore.js: camada central de persistência e validação.
- src/middlewares/auth.js: autenticação e proteção de rotas/páginas.
- src/config/env.js e src/config/paths.js: configuração do ambiente e caminhos dos arquivos.

/public
- public/pages/: ambiente do aluno.
- public/professor/: ambiente do professor/admin.
- public/assets/css/: estilos.
- public/assets/js/: scripts do front-end, incluindo a camada legada.
- public/assets/img/: imagens e recursos visuais.

Arquivos e módulos que merecem atenção:
- README.md: documentação útil, mas parcial e nem sempre alinhada com o estado real.
- package.json: scripts de execução e dependências.
- vercel.json: configuração para deploy/rewrites.
- scripts/criar-admin.js: utilitário para criar conta admin.
- public/assets/js/storage.js: módulo legado com grande quantidade de lógica e persistência local.
- public/assets/js/init-seed.js: seed de dados demo, potencialmente confundindo o ambiente real.

JSONs principais:
- usuarios.json
- materias.json
- aulas.json
- exercicios.json
- redacoes.json
- cursos.json
- categorias.json


==================================================
3. PÁGINAS EXISTENTES
==================================================

AMBIENTE DO ALUNO

- public/pages/home.html
  Status: [PARCIAL]
  Função: dashboard do aluno e portal principal.

- public/pages/diagnostico.html
  Status: [OK]
  Função: diagnóstico inicial e geração de cronograma personalizado.

- public/pages/portugues.html
  Status: [PARCIAL]
  Função: catálogo de conteúdo de português.

- public/pages/portugues-conteudo.html
  Status: [PARCIAL]
  Função: leitura de conteúdo detalhado por página.

- public/pages/redacao.html
  Status: [PARCIAL]
  Função: envio, listagem e acompanhamento de redações.

- public/pages/videoaulas.html
  Status: [PARCIAL]
  Função: listagem de videoaulas.

- public/pages/simulados.html
  Status: [PARCIAL]
  Função: listagem de simulados.

- public/pages/materiais.html
  Status: [PARCIAL]
  Função: materiais e PDFs.

- public/pages/cronograma.html
  Status: [PARCIAL]
  Função: cronograma e etapas de estudo.

- public/pages/perfil.html
  Status: [PARCIAL]
  Função: perfil do aluno.

- public/pages/login.html
  Status: [PARCIAL]
  Função: login do aluno, mas com lógica legada localStorage.

- public/pages/registro.html
  Status: [PARCIAL]
  Função: cadastro do aluno.

PAINEL DO PROFESSOR / ADMIN

- public/professor/index.html
  Status: [PARCIAL]
  Função: dashboard geral do professor.

- public/professor/alunos.html
  Status: [PARCIAL]
  Função: listagem e gestão de alunos.

- public/professor/redacoes.html
  Status: [PARCIAL]
  Função: visão geral e correção de redações.

- public/professor/portugues.html
  Status: [PARCIAL]
  Função: administração de conteúdos de português.

- public/professor/portugues-criar.html
  Status: [PARCIAL]
  Função: criação de conteúdo.

- public/professor/diagnosticos.html
  Status: [PARCIAL]
  Função: painel de diagnósticos.

- public/professor/correcoes.html
  Status: [PARCIAL]
  Função: área de correções.

- public/professor/videoaulas.html
  Status: [PARCIAL]
  Função: gestão de videoaulas.

- public/professor/simulados.html
  Status: [PARCIAL]
  Função: gestão de simulados.

- public/professor/simulados-criar.html
  Status: [PARCIAL]
  Função: criação de simulados.

- public/professor/materiais.html
  Status: [PARCIAL]
  Função: materiais do professor.

- public/professor/cronograma.html
  Status: [PARCIAL]
  Função: gestão do cronograma.

- public/professor/planos.html
  Status: [PARCIAL]
  Função: criação, edição, duplicação e ativação de planos.

- public/professor/perfil.html
  Status: [PARCIAL]
  Função: perfil do professor.

- public/professor/configuracoes.html
  Status: [PARCIAL]
  Função: ajustes gerais.

PÁGINAS PÚBLICAS / LANDING

- public/index.html
  Status: [PARCIAL]
  Função: landing page pública.


==================================================
4. FUNCIONALIDADES IMPLEMENTADAS
==================================================

[OK] Registro e login de aluno via src/controllers/auth.controller.js
[OK] Login e sessão de admin via src/controllers/auth.controller.js
[OK] Proteção de páginas administrativas em src/middlewares/auth.js
[OK] CRUD de matérias em src/controllers/materias.controller.js
[OK] CRUD de aulas em src/controllers/aulas.controller.js
[OK] CRUD de exercícios em src/controllers/exercicios.controller.js
[OK] Listagem de alunos e métricas gerais em src/controllers/admin.controller.js
[OK] Diagnóstico inicial com geração de cronograma personalizado em src/controllers/diagnostico.controller.js
[OK] Envio, listagem e correção de redações em src/controllers/redacoes.controller.js
[OK] Navegação por aulas com exercícios vinculados em src/controllers/aulas.controller.js
[OK] Marcação de aulas concluídas por aluno em src/controllers/aulas.controller.js
[OK] Registro de progresso e atividades do aluno em usuarios.json via garantirDadosEstudo()
[OK] Validação de questões de exercícios em src/data/jsonStore.js
[OK] Sistema de lock de escrita para reduzir conflitos de escrita em JSON
[PARCIAL] Fluxo de planos e permissões do aluno em public/assets/js/storage.js e public/assets/js/professor/planos.js
[PARCIAL] Painel do professor e páginas relacionadas em public/professor/*
[PARCIAL] Fluxo de conteúdo do aluno em public/pages/*
[PARCIAL] Responsividade e estados vazios em várias telas
[ERRO] Coexistência de duas arquiteturas de autenticação: sessão Express + localStorage legada
[ERRO] Rotas duplicadas em src/app.js: app.use('/api', routes) e app.use(routes)
[ERRO] Planos/permissões estão sendo controlados principalmente no front-end, sem reforço no servidor
[NÃO IMPLEMENTADO] Sistema de permissões por professor/admin granular por rota/endpoint
[NÃO IMPLEMENTADO] Migração real para banco relacional
[NÃO IMPLEMENTADO] Consistência completa entre tipagem de usuário e contratos dos dados


==================================================
5. O QUE AINDA FALTA
==================================================

CRÍTICO
- Unificar autenticação e armazenamento de usuários em uma única fonte de verdade.
- Reforçar permissões por plano no back-end.
- Padronizar tipos de usuário (aluno, professor, admin) em toda a aplicação.
- Eliminar ou descontinuar o fluxo legada em localStorage.
- Resolver a duplicidade de rotas em src/app.js.

ALTA
- Finalizar integração das páginas do professor com a API real.
- Padronizar nomes de campos entre JSON, localStorage e APIs.
- Revisar criação/edição/exclusão de aulas, exercícios e materiais.
- Melhorar tratamento de erros e estados vazios.

MÉDIA
- Implementar testes automatizados para rotas e regras de negócio.
- Revisar responsividade em mobile/tablet.
- Melhorar feedback visual e consistência de interface.
- Completar páginas de perfil/configuração com dados reais.

BAIXA
- Melhorar organização visual e consistência entre CSS e componentes.
- Revisar textos, labels e nomes de botões para linguagem uniforme.
- Ajustar pequenos inconsistências de UX na landing page e painel professor.


==================================================
6. ERROS E PROBLEMAS IDENTIFICADOS
==================================================

ERRO 1: Duas autenticações diferentes coexistem no projeto.
Arquivo relacionado:
- src/controllers/auth.controller.js
- public/assets/js/auth.js
- public/assets/js/storage.js

Comportamento atual:
- back-end usa sessão Express e bcryptjs;
- front-end legado usa localStorage, sem integração com o back-end.

Comportamento esperado:
- um único fluxo de autenticação e sessão.

Possível causa:
- evolução do projeto em etapas, misturando código novo e legado.

Sugestão:
- remover o fluxo localStorage antigo e consumir a API principal do servidor.


ERRO 2: Rotas duplicadas no servidor.
Arquivo relacionado:
- src/app.js

Comportamento atual:
- app.use('/api', routes) e app.use(routes) estão ativos simultaneamente.

Comportamento esperado:
- apenas uma forma de montar as rotas da API.

Possível causa:
- compatibilidade com múltiplos ambientes e aliases, mas sem padronização.

Sugestão:
- escolher um único estilo e remover a duplicidade.


ERRO 3: Controle de acesso por plano é aplicado apenas no front-end.
Arquivo relacionado:
- public/assets/js/app.js
- public/assets/js/storage.js
- src/middlewares/auth.js

Comportamento atual:
- página do aluno é bloqueada no cliente via getStudentPermissions();
- servidor não valida permissões por plano em endpoints relevantes.

Comportamento esperado:
- o back-end deve rejeitar acessos indevidos independentemente do front-end.

Possível causa:
- implementação de permissões apenas no cliente.

Sugestão:
- criar middleware de autorização por plano no servidor.


ERRO 4: Tipos de usuário inconsistentes.
Arquivo relacionado:
- src/controllers/auth.controller.js
- public/assets/js/auth.js
- public/assets/js/init-seed.js
- public/assets/js/storage.js

Comportamento atual:
- servidor usa aluno/admin;
- legado usa cliente/professor.

Comportamento esperado:
- padronizar a nomenclatura e o contrato de usuário.

Possível causa:
- desenvolvimento em camadas paralelas e ausência de regra central.

Sugestão:
- centralizar um enum de tipos de usuários e ajustar JSON/Frontend.


ERRO 5: Dados podem divergir entre localStorage e JSON.
Arquivo relacionado:
- public/assets/js/storage.js
- public/assets/js/init-seed.js
- src/config/paths.js
- src/data/jsonStore.js

Comportamento atual:
- front-end grava estados em chaves como app_users_v1, app_plans_v1, app_essays_v1;
- back-end grava em usuarios.json, redacoes.json, etc.

Comportamento esperado:
- uma única fonte de dados para o sistema.

Possível causa:
- coexistência de camadas paralelas de persistência.

Sugestão:
- remover ou relegar o armazenamento em navegador para somente estado temporário.


ERRO 6: Há dados sensíveis e informação de sessão no browser.
Arquivo relacionado:
- public/assets/js/auth.js
- public/assets/js/storage.js

Comportamento atual:
- histórico de sessão, usuários e, em alguns casos, dados de conta ficam em localStorage.

Comportamento esperado:
- mínimo de dados no cliente; senhas nunca deveriam ser armazenadas localmente.

Possível causa:
- implementação antiga e pouca preocupação com segurança no front-end legado.

Sugestão:
- usar cookies HttpOnly e remover senhas do navegador.


ERRO 7: Middleware de autenticação aceita fallback por query/body/params.
Arquivo relacionado:
- src/middlewares/auth.js

Comportamento atual:
- obterUsuarioAutenticado() tenta recuperar usuário por query, body e params.

Comportamento esperado:
- autenticação confiável somente pela sessão.

Possível causa:
- compatibilidade com código antigo.

Sugestão:
- remover os fallbacks e exigir sessão autenticada.


ERRO 8: Páginas e endpoints não estão totalmente alinhados.
Arquivo relacionado:
- src/controllers/materias.controller.js
- src/controllers/aulas.controller.js
- src/controllers/exercicios.controller.js
- public/pages/*

Comportamento atual:
- backend cria e expõe conteúdo; o front-end legado também manipula listas locais e dados demo.

Comportamento esperado:
- todo conteúdo exibido pelas páginas deve vir de uma API única e consistente.

Possível causa:
- front-end e back-end evoluíram separadamente.

Sugestão:
- padronizar fluxos de busca, renderização e publicação.


ERRO 9: Seed de dados pode mascarar o estado real do sistema.
Arquivo relacionado:
- public/assets/js/init-seed.js

Comportamento atual:
- o script cria professor demo, alunos demo e plano demo automaticamente.

Comportamento esperado:
- dados de demonstração devem ser isolados de ambiente real.

Possível causa:
- uso de seed para facilitar desenvolvimento.

Sugestão:
- deixar seed somente em ambiente de desenvolvimento e não em produção real.


==================================================
7. PROBLEMAS DE ESTRUTURA
==================================================

- Há duplicação clara entre lógica do back-end e lógica do front-end legado.
- public/assets/js/storage.js concentra muitas responsabilidades em um único módulo.
- O projeto usa duas fontes de dados diferentes ao mesmo tempo.
- Há repetição de filtros, renderizações e manipulações de arrays em vários scripts.
- Há páginas parecidas implementadas por fluxos levemente diferentes.
- O README descreve uma arquitetura mais clara do que o estado real em execução.
- O back-end está modularizado, mas o front-end ainda tem muito código legado e não padronizado.


==================================================
8. ESTRUTURA DOS DADOS
==================================================

Arquivo principal de dados do servidor:
- usuarios.json
- materias.json
- aulas.json
- exercicios.json
- redacoes.json
- cursos.json
- categorias.json

Armazenamento observado no back-end:
- usuarios.json: usuários, admin, alunos, estudos, diagnósticos e cronograma.
- materias.json: matérias.
- aulas.json: aulas, conteúdos, publicação e relacionamento com matéria.
- exercicios.json: exercícios e questões com gabarito.
- redacoes.json: redações, status, nota e feedback.

Dados do front-end legado em localStorage:
- app_users_v1
- app_plans_v1
- app_essays_v1
- app_videoaulas_v1
- app_simulados_v1
- app_contents_v1
- app_cronograma_v1
- app_materiais_v1
- app_diagnosticos_v1

Observações importantes:
- Há campos diferentes para o mesmo conceito, como plan_id no front-end e plano no back-end.
- Há tipos de usuário diferentes em camadas diferentes: aluno/admin no servidor e cliente/professor no front-end legado.
- O projeto não possui schema formal; o estado depende do código e convenções internas.

Riscos identificados:
- referências quebradas entre matéria, aula e exercício ao excluir registros;
- plano inválido ou ausente, especialmente em front-end legado;
- dados demo misturados com dados reais em init-seed.js;
- divergência entre painel do professor e JSON real.


==================================================
9. PLANOS E PERMISSOES
==================================================

O que já funciona:
- criação, edição, duplicação, ativação e desativação de planos no front-end legado;
- helpers de permission checks em public/assets/js/storage.js;
- bloqueio de acesso a algumas páginas do aluno pelo cliente.

O que ainda não funciona de forma robusta:
- servidor não valida planos e permissões em rotas protegidas;
- não há endpoints dedicados para planos e vínculo aluno-plano no back-end principal;
- ausência de plano ou plano inexistente não é validada no servidor.

O que precisa ser testado:
- aluno sem plano
- aluno com plano inativo
- aluno com plano expirado
- plano sem permissões ativas
- acesso direto à URL de páginas protegidas
- exclusão de plano com alunos vinculados

Possíveis falhas de segurança:
- bloqueio por plano no front-end pode ser burlado;
- API de conteúdos não garante que o aluno tenha permissão correta.


==================================================
10. REVISAO DA AREA DO PROFESSOR
==================================================

Painel (public/professor/index.html)
- Objetivo: dashboard geral.
- Recursos existentes: cards de resumo, métricas e navegação lateral.
- Recursos faltando: integração real com API e dados consistentes.
- Status geral: [PARCIAL]

Alunos (public/professor/alunos.html)
- Objetivo: visualizar e gerenciar estudantes.
- Recursos existentes: busca, filtros e painel de planos.
- Recursos faltando: sincronização completa com JSON do servidor.
- Status geral: [PARCIAL]

Redações (public/professor/redacoes.html)
- Objetivo: revisar e corrigir redações.
- Recursos existentes: listagem, status e correção.
- Recursos faltando: padronização com API, arquivos e feedback.
- Status geral: [PARCIAL]

Português (public/professor/portugues.html)
- Objetivo: administrar conteúdo de português.
- Recursos existentes: estrutura e navegação.
- Recursos faltando: fluxo de publicação/edição consistente.
- Status geral: [PARCIAL]

Diagnósticos (public/professor/diagnosticos.html)
- Objetivo: acompanhar diagnósticos.
- Recursos existentes: estrutura de listagem e acompanhamento.
- Recursos faltando: conexão com dados reais e histórico do aluno.
- Status geral: [PARCIAL]

Correções (public/professor/correcoes.html)
- Objetivo: centralizar feedbacks e correções.
- Recursos existentes: página pronta para revisão.
- Recursos faltando: mais integração com redações e notas.
- Status geral: [PARCIAL]

Videoaulas (public/professor/videoaulas.html)
- Objetivo: gerenciar videoaulas.
- Recursos existentes: planejamento e listagem.
- Recursos faltando: sincronização real com conteúdo do sistema.
- Status geral: [PARCIAL]

Simulados (public/professor/simulados.html)
- Objetivo: gerir simulados.
- Recursos existentes: estrutura de listagem/criação.
- Recursos faltando: integração com públicos reais e exercícios.
- Status geral: [PARCIAL]

Material (public/professor/materiais.html)
- Objetivo: administrar materiais complementares.
- Recursos existentes: base para gestão.
- Recursos faltando: padronização de upload/link e integração definitiva.
- Status geral: [PARCIAL]

Cronograma (public/professor/cronograma.html)
- Objetivo: organizar cronograma e etapas.
- Recursos existentes: estrutura de etapas.
- Recursos faltando: sincronização com dados do aluno e consistência de estado.
- Status geral: [PARCIAL]

Planos (public/professor/planos.html)
- Objetivo: gestão de planos e permissões.
- Recursos existentes: criação, edição, duplicação, ativação e exclusão.
- Recursos faltando: reforço no servidor e APIs oficiais.
- Status geral: [PARCIAL]


==================================================
11. REVISAO DA AREA DO ALUNO
==================================================

Home (public/pages/home.html)
- Objetivo: dashboard do aluno.
- Recursos existentes: navegação, métricas e acesso a conteúdos.
- Recursos faltando: integração coesa com dados reais do servidor.
- Status geral: [PARCIAL]

Português e conteúdo
- Objetivo: consumir conteúdos e aulas.
- Recursos existentes: catálogo, navegação por matéria e exercícios.
- Recursos faltando: maior padronização de dados e validação de permissões.
- Status geral: [PARCIAL]

Redação
- Objetivo: enviar redações e acompanhar feedback.
- Recursos existentes: tema, envio e listagem.
- Recursos faltando: revisão do fluxo de arquivos/PDF e sincronização com professor.
- Status geral: [PARCIAL]

Diagnóstico
- Objetivo: realizar diagnóstico inicial e receber cronograma.
- Recursos existentes: geração de cronograma personalizado.
- Recursos faltando: persistência consistente e melhor vínculo com histórico do aluno.
- Status geral: [OK / PARCIAL]

Videoaulas e Simulados
- Objetivo: consumir material complementar.
- Recursos existentes: navegação e listagem de itens.
- Recursos faltando: autenticação e permissões reforçadas por servidor.
- Status geral: [PARCIAL]

Materiais
- Objetivo: consultar materiais e PDFs.
- Recursos existentes: listagem básica.
- Recursos faltando: organização por categoria e melhor controle de plano.
- Status geral: [PARCIAL]

Cronograma
- Objetivo: orientar rotina do aluno.
- Recursos existentes: etapas e marcação de concluído.
- Recursos faltando: sincronização com dados reais e regras de permissão.
- Status geral: [PARCIAL]

Perfil
- Objetivo: visualizar dados do aluno e configurações.
- Recursos existentes: estrutura inicial.
- Recursos faltando: dados reais e utilidades úteis.
- Status geral: [PARCIAL]

Observação especial:
- grande parte da navegação e bloqueio de conteúdo do aluno é feita no front-end com localStorage, o que torna o sistema vulnerável a manipulação direta.


==================================================
12. UX/UI
==================================================

BOM
- visual geral organizado e com identidade clara;
- uso bem distribuído de CSS e layout em geral;
- painel do professor com boa estrutura visual.

PRECISA MELHORAR
- estados vazios pouco padronizados;
- mensagens de erro/sucesso nem sempre consistentes;
- alguns cards e botões repetem padrões sem uniforme;
- feedback visual de ações pode ser mais claro.

INCONSISTENTE
- nomes de tipos de usuário variam entre front e back;
- linguagem de planos/permissões varia entre UI e regras do sistema;
- termos como professor/admin/cliente/aluno convivem sem padronização completa.


==================================================
13. RESPONSIVIDADE
==================================================

Pontos fortes:
- há intenção de responsividade nas páginas.

Pontos de risco:
- tabelas e listagens grandes podem quebrar em telas menores;
- menu lateral do professor pode precisar revisão em mobile;
- modais e componentes complexos podem extrapolar a viewport;
- cards e colunas múltiplas precisam ser validados em tablet/mobile.

Recomendação:
- testar as páginas principais em desktop, tablet e mobile.


==================================================
14. POSSÍVEIS BUGS FUTUROS
==================================================

- divergência entre localStorage e JSON pode causar inconsistência de dados;
- usuário com plan_id inválido ou plano removido pode continuar vendo páginas no cliente;
- conteúdo removido do servidor pode continuar presente em dados locais;
- planos inativos ou expirados podem ainda permitir acesso se a validação do servidor não for reforçada;
- alterações simultâneas em JSON podem gerar inconsistência parcial, embora o lock ajude;
- páginas do professor podem quebrar se os JSON forem alterados sem atualizar o seed ou a UI legada;
- campos sem padronização podem gerar falhas em filtros e renderização.


==================================================
15. SEGURANCA
==================================================

O que já foi identificado como positivo:
- uso de sessão HTTP com cookie httpOnly;
- hash com bcryptjs no back-end principal;
- proteção de páginas administrativas via middleware.

O que ainda precisa ser revisado:
- controle de planos/permissões não está reforçado no servidor;
- autenticação legada em localStorage expõe dados no navegador;
- obterUsuarioAutenticado() aceita fallback por query/body/params, o que reduz rigor na autenticação;
- há pouca validação granular por endpoint e por permissão.

Observação importante:
- não é possível afirmar falha crítica definitiva sem testes de penetração e checagem completa de ambiente, mas os riscos acima foram identificados diretamente no código.


==================================================
16. PERFORMANCE
==================================================

Pontos positivos:
- uso de JSON + leitura assíncrona é funcional para um projeto de porte médio;
- jsonStore.js já implementa lock para escrita.

Pontos de atenção:
- leitura de JSON em vários controladores pode gerar overhead;
- múltiplos filtros e manipulações de arrays em scripts cliente podem degradar telas grandes;
- uso de localStorage para dados complexos não é ideal para crescimento.

Sugestões simples:
- centralizar consultas comuns em helpers;
- evitar carregar todos os dados quando uma rota precisa só de parte deles;
- preparar migração para banco ou cache.


==================================================
17. CHECKLIST DE REVISAO
==================================================

[ ] Testar cadastro de aluno e login com sessão correta
[ ] Testar login de admin e acesso às páginas protegidas
[ ] Testar acesso de aluno sem plano
[ ] Testar aluno com plano inativo
[ ] Testar aluno com plano expirado
[ ] Testar acesso direto por URL para páginas bloqueadas
[ ] Testar criação de matéria
[ ] Testar edição de matéria
[ ] Testar exclusão de matéria e limpeza de vínculos
[ ] Testar criação de aula
[ ] Testar publicação e ocultação de aula
[ ] Testar criação de exercício com questões válidas e inválidas
[ ] Testar submissão de exercícios do aluno
[ ] Testar envio de redação
[ ] Testar correção de redação pelo professor
[ ] Testar filtros e busca nas páginas de aluno/professor
[ ] Testar mobile das páginas principais
[ ] Testar duplicação de plano
[ ] Testar alteração de status do plano
[ ] Testar exclusão de plano com aluno vinculado
[ ] Testar seed de dados e limpar estado em produção
[ ] Revisar uso de IDs e referências entre matérias, aulas e exercícios
[ ] Revisar estados vazios e mensagens de erro


==================================================
18. PROXIMOS PASSOS RECOMENDADOS
==================================================

1. Resolver autenticação e persistência
- o maior risco atual é a coexistência de fluxo moderno e legado.

2. Reforçar permissões e planos no servidor
- acesso por plano deve ser validado no back-end, não só no navegador.

3. Unificar rotas e contratos de dados
- remover duplicidade de rotas e padronizar campos/tipos de usuário.

4. Finalizar integração do painel do professor com a API real
- dashboard, alunos, redações, materiais, simulados, videoaulas e cronograma.

5. Revisar UX/UI e responsividade
- estados vazios, feedback, layout em mobile e consistência visual.

6. Preparar migração futura para banco
- a arquitetura atual em JSON funciona, mas é limitada para crescimento.


==================================================
19. ARQUIVOS QUE MERECEM ATENCAO
==================================================

src/app.js
- centraliza rotas, proteção, aliases e arquivos estáticos; ponto crítico do sistema.

src/data/jsonStore.js
- centraliza persistência, validação e regras de estudos; base importante das operações.

src/middlewares/auth.js
- define autorização; precisa ser revisado com cuidado.

src/controllers/auth.controller.js
- fluxo principal de login/registro/admin; área sensível.

src/controllers/exercicios.controller.js
- validação e regras de exercícios; área central da lógica de estudo.

src/controllers/redacoes.controller.js
- fluxo de envio e correção de redações.

public/assets/js/storage.js
- módulo legado com muita lógica e alto risco de manutenção.

public/assets/js/init-seed.js
- cria dados demo e pode mascarar o estado real do sistema.

public/professor/planos.html
- página crítica para planos e permissões.

README.md
- útil, mas parcialmente divergente do estado real observado.


==================================================
20. POSSÍVEIS MELHORIAS FUTURAS
==================================================

- migrar JSON para SQLite/PostgreSQL/Supabase;
- criar sistema de turmas e professores por turma;
- implementar logs de auditoria;
- evoluir permissões granulares por papel;
- adicionar analytics e relatórios mais detalhados;
- implementar notificações para alunos e professores;
- criar backup automático e versionamento de dados;
- organizar front-end em componentes reutilizáveis.


==================================================
21. RESUMO EXECUTIVO
==================================================

STATUS GERAL DO PROJETO
- Progresso estimado: 70%
- Funcionalidades principais: 10+
- Funcionalidades incompletas: 7+
- Erros críticos: 5+
- Erros médios: 4+
- Melhorias recomendadas: 8+
- Status geral: PRECISA DE REVISÃO

Resumo curto:
- o projeto já tem boa base funcional em Express + JSON;
- há muitos módulos prontos e parte da lógica de negócio já implementada;
- o maior problema é a mistura de arquitetura moderna com camada legada em localStorage;
- os próximos passos devem priorizar unificação de autenticação, permissões e persistência;
- sem isso, o sistema continuará sujeito a inconsistências e riscos de manutenção.


==================================================
22. CONCLUSÃO
==================================================

Este relatório foi atualizado com base no estado real do projeto observado no workspace e no código existente. Ele foi organizado para servir como documentação rápida, handoff, auditoria e checklist de revisão.

Pontos principais que outra pessoa precisa saber antes de mexer no projeto:
1. o sistema tem boa base funcional, mas está em estado híbrido;
2. autenticação e persistência precisam ser unificadas;
3. planos/permissões devem ser reforçados no servidor;
4. rotas e contratos de dados precisam ser padronizados;
5. a área do professor ainda precisa ser alinhada à API real.


==================================================
23. ARQUIVOS PRINCIPAIS REFERENCIADOS
==================================================

- README.md
- package.json
- src/server.js
- src/app.js
- src/config/paths.js
- src/data/jsonStore.js
- src/middlewares/auth.js
- src/controllers/auth.controller.js
- src/controllers/admin.controller.js
- src/controllers/materias.controller.js
- src/controllers/aulas.controller.js
- src/controllers/exercicios.controller.js
- src/controllers/diagnostico.controller.js
- src/controllers/redacoes.controller.js
- public/assets/js/storage.js
- public/assets/js/app.js
- public/assets/js/init-seed.js
- public/professor/planos.html
- public/professor/alunos.html
- public/pages/home.html
- public/pages/diagnostico.html

