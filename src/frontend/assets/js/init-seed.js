// Script de inicialização - cria dados de teste se não existirem
(function initializeSeedData() {
  const LS_USERS = 'app_users_v1';
  const LS_ESSAYS = 'app_essays_v1';
  const LS_DIAGNOSTICS = 'app_diagnosticos_v1';
  const LS_PLANS = 'app_plans_v1';

  // Obter usuários existentes
  let users = [];
  try {
    const raw = localStorage.getItem(LS_USERS);
    users = raw ? JSON.parse(raw) : [];
  } catch (e) {
    users = [];
  }

  // Se não houver professor, criar um de teste
  const hasProfessor = users.some(u => u.tipo === 'professor');
  if (!hasProfessor) {
    const professorUser = {
      id: 'prof-' + Date.now(),
      nome: 'Professor Demo',
      email: 'professor@plataforma.com',
      telefone: '(11) 98765-4321',
      senha: 'senha123',
      tipo: 'professor',
      criadoEm: new Date().toISOString()
    };
    users.push(professorUser);
    localStorage.setItem(LS_USERS, JSON.stringify(users));
    console.log('✅ Usuário professor criado:', professorUser.email);
  }

  // Se não houver alunos, criar alguns de teste
  if (users.length === 1) {
    // Criar alunos de exemplo
    const students = [
      {
        id: 'aluno-1',
        nome: 'João Silva',
        email: 'joao@email.com',
        telefone: '(11) 99999-1111',
        senha: 'senha123',
        tipo: 'cliente',
        criadoEm: new Date().toISOString(),
        diagnostico: {
          objetivo: 'Melhorar redação para o ENEM',
          prova: 'ENEM',
          horas_semanais: 5,
          nivel: 'intermediário',
          confianca: 7,
          criadoEm: new Date().toISOString()
        }
      },
      {
        id: 'aluno-2',
        nome: 'Maria Santos',
        email: 'maria@email.com',
        telefone: '(11) 99999-2222',
        senha: 'senha123',
        tipo: 'cliente',
        criadoEm: new Date().toISOString(),
        diagnostico: {
          objetivo: 'Preparação para português avançado',
          prova: 'Concurso',
          horas_semanais: 8,
          nivel: 'avançado',
          confianca: 8,
          criadoEm: new Date(Date.now() - 7*24*60*60*1000).toISOString()
        }
      },
      {
        id: 'aluno-3',
        nome: 'Pedro Costa',
        email: 'pedro@email.com',
        telefone: '(11) 99999-3333',
        senha: 'senha123',
        tipo: 'cliente',
        criadoEm: new Date().toISOString()
      }
    ];
    users.push(...students);

    let plans = [];
    try {
      const rawPlans = localStorage.getItem(LS_PLANS);
      plans = rawPlans ? JSON.parse(rawPlans) : [];
    } catch (e) {
      plans = [];
    }

    if (!plans.length) {
      plans = [{
        id: 'plan-demo-completo',
        name: 'Plano Completo',
        description: 'Acesso completo a todos os conteúdos da plataforma.',
        price: 0,
        status: 'active',
        permissions: {
          portugues: true,
          redacao: true,
          videoaulas: true,
          simulados: true,
          material: true,
          cronograma: true
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }];
      localStorage.setItem(LS_PLANS, JSON.stringify(plans));
    }

    users = users.map((user) => {
      if (user.tipo === 'cliente' && !user.plan_id) {
        return { ...user, plan_id: 'plan-demo-completo' };
      }
      return user;
    });

    localStorage.setItem(LS_USERS, JSON.stringify(users));
    console.log('✅ Alunos de teste criados com plano demo');
  }

  // Criar redações de teste
  let essays = [];
  try {
    const raw = localStorage.getItem(LS_ESSAYS);
    essays = raw ? JSON.parse(raw) : [];
  } catch (e) {
    essays = [];
  }

  if (essays.length === 0) {
    const sampleEssays = [
      {
        id: 'essay-1',
        autor: 'João Silva',
        autorId: 'aluno-1',
        tema: 'A importância da educação na sociedade moderna',
        descricao: 'Redação sobre educação',
        criadoEm: new Date().toISOString(),
        status: 'pendente',
        imagemBase64: null,
        feedback: null,
        nota: null
      },
      {
        id: 'essay-2',
        autor: 'Maria Santos',
        autorId: 'aluno-2',
        tema: 'Tecnologia e impacto ambiental',
        descricao: 'Reflexão sobre sustentabilidade',
        criadoEm: new Date(Date.now() - 3*24*60*60*1000).toISOString(),
        status: 'concluido',
        imagemBase64: null,
        feedback: 'Excelente estrutura argumentativa!',
        nota: 8.5
      },
      {
        id: 'essay-3',
        autor: 'Pedro Costa',
        autorId: 'aluno-3',
        tema: 'Desafios da pandemia',
        descricao: 'Análise dos efeitos sociais',
        criadoEm: new Date(Date.now() - 1*24*60*60*1000).toISOString(),
        status: 'pendente',
        imagemBase64: null,
        feedback: null,
        nota: null
      }
    ];
    localStorage.setItem(LS_ESSAYS, JSON.stringify(sampleEssays));
    console.log('✅ Redações de teste criadas');
  }

  console.log('📦 Dados de teste inicializados');
})();
