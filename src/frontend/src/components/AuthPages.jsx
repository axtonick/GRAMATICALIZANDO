import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logo-icon.png';
import { authApi } from '../../services/api.js';
import { saveSession } from '../../services/storage.js';

function AuthCard({ title, subtitle, children }) { return <section className="react-auth-page"><div className="react-auth-card"><img src={logo} alt="Gramaticalizando" /><span className="react-eyebrow">Gramaticalizando</span><h1>{title}</h1><p>{subtitle}</p>{children}</div></section>; }

export function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', senha: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  async function submit(event) { event.preventDefault(); setLoading(true); setError(''); try { const response = await authApi.login(form.email, form.senha); saveSession(response.usuario || response.user || response); navigate('/home'); } catch (requestError) { setError(requestError.message || 'Não foi possível entrar.'); } finally { setLoading(false); } }
  return <AuthCard title="Bem-vindo de volta" subtitle="Entre para continuar seus estudos."><form className="react-form" onSubmit={submit}><label>E-mail<input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required /></label><label>Senha<input type="password" value={form.senha} onChange={(event) => setForm({ ...form, senha: event.target.value })} required /></label>{error && <p className="react-error">{error}</p>}<button className="btn btn-primary" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</button><p>Não tem uma conta? <Link to="/registro">Cadastre-se</Link></p></form></AuthCard>;
}

export function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: '', email: '', senha: '' });
  const [error, setError] = useState('');
  async function submit(event) { event.preventDefault(); setError(''); try { await authApi.cadastrar(form.nome, form.email, form.senha); navigate('/login'); } catch (requestError) { setError(requestError.message || 'Não foi possível criar a conta.'); } }
  return <AuthCard title="Criar conta" subtitle="Comece sua jornada de estudos."><form className="react-form" onSubmit={submit}><label>Nome<input value={form.nome} onChange={(event) => setForm({ ...form, nome: event.target.value })} required /></label><label>E-mail<input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required /></label><label>Senha<input type="password" minLength="8" value={form.senha} onChange={(event) => setForm({ ...form, senha: event.target.value })} required /></label>{error && <p className="react-error">{error}</p>}<button className="btn btn-primary">Criar conta</button><p>Já possui uma conta? <Link to="/login">Entrar</Link></p></form></AuthCard>;
}
