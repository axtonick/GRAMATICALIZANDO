import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logo-icon.png';
import { authApi } from '../../services/api.js';
import { clearSession, getSession } from '../../services/storage.js';

const studentLinks = [['/home', 'Home'], ['/portugues', 'Português'], ['/redacao', 'Redação'], ['/videoaulas', 'Videoaulas'], ['/simulados', 'Simulados'], ['/materiais', 'Material'], ['/cronograma', 'Cronograma']];
const professorLinks = [['/professor', 'Painel'], ['/professor/alunos', 'Alunos'], ['/professor/redacoes', 'Redações'], ['/professor/portugues', 'Português'], ['/professor/diagnosticos', 'Diagnósticos'], ['/professor/simulados', 'Simulados'], ['/professor/materiais', 'Materiais']];

export default function AppShell({ children, professor = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const session = getSession();
  const links = professor ? professorLinks : studentLinks;

  function logout() {
    clearSession();
    authApi.logout().catch(() => {});
    navigate('/login');
  }

  if (professor) {
    return <div className="react-professor-shell"><aside className="react-professor-sidebar"><Link className="react-brand" to="/professor"><img src={logo} alt="" /><span>Gramaticalizando<small>Painel do professor</small></span></Link><nav>{links.map(([path, label]) => <Link className={location.pathname === path ? 'active' : ''} key={path} to={path}>{label}</Link>)}</nav><button className="btn btn-secondary" type="button" onClick={logout}>Sair</button></aside><main className="react-professor-main">{children}</main></div>;
  }

  return <div className="react-app-shell"><header className="react-topbar"><Link className="react-brand" to="/"><img src={logo} alt="" /><span>Gramaticalizando<small>Ambiente de estudos</small></span></Link><button className="menu-btn btn" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen}>☰</button><nav className={menuOpen ? 'open' : ''}>{links.map(([path, label]) => <Link className={location.pathname === path ? 'active' : ''} key={path} to={path} onClick={() => setMenuOpen(false)}>{label}</Link>)}</nav><div className="react-user-actions">{session ? <button className="btn btn-secondary" type="button" onClick={logout}>Sair</button> : <Link className="btn btn-primary" to="/login">Entrar</Link>}</div></header><main>{children}</main></div>;
}
