import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { alunoApi } from '../../services/api.js';

export function LandingPage() { return <section className="react-landing"><div className="react-landing-copy"><span className="react-eyebrow">Plataforma de estudos</span><h1>Estude Português com foco, prática e direção.</h1><p>Videoaulas, redações, simulados e acompanhamento de progresso em uma experiência única.</p><div className="react-actions"><Link className="btn btn-primary" to="/login">Começar agora</Link><Link className="btn btn-secondary" to="/registro">Criar conta</Link></div></div><div className="react-landing-panel"><strong>Uma rotina mais clara</strong><span>Conteúdo organizado por objetivo e etapa.</span><span>Prática para transformar revisão em progresso.</span><span>Dados centralizados na API da plataforma.</span></div></section>; }

export function HomePage() {
  const [content, setContent] = useState({ materias: [], aulas: [], exercicios: [] });
  useEffect(() => { alunoApi.conteudosPublicos().then(setContent).catch(() => {}); }, []);
  return <section className="react-page"><div className="react-page-hero"><div><span className="react-eyebrow">Ambiente do aluno</span><h1>Continue seus estudos com clareza.</h1><p>Conteúdo publicado, prática e progresso reunidos em um só lugar.</p><Link className="btn btn-primary" to="/simulados">Ver simulados</Link></div><div className="react-stat-panel"><strong>{content.aulas.length}</strong><span>aulas publicadas</span><strong>{content.exercicios.length}</strong><span>exercícios disponíveis</span></div></div><div className="react-content-grid"><article><span>01</span><h2>Português</h2><p>Revise gramática, leitura e interpretação.</p><Link to="/portugues">Acessar conteúdo</Link></article><article><span>02</span><h2>Redação</h2><p>Pratique sua escrita e acompanhe correções.</p><Link to="/redacao">Escrever redação</Link></article><article><span>03</span><h2>Cronograma</h2><p>Organize seu próximo bloco de estudos.</p><Link to="/cronograma">Ver cronograma</Link></article></div></section>;
}

export function GenericPage({ title }) { return <section className="react-dashboard"><span className="react-eyebrow">Gramaticalizando</span><h1>{title}</h1><p>Esta área agora é renderizada pelo React e continua conectada à API configurada.</p></section>; }
