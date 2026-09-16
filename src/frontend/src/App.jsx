import { Navigate, Route, Routes } from 'react-router-dom';
import AppShell from './components/AppShell.jsx';
import { LoginPage, RegisterPage } from './components/AuthPages.jsx';
import { GenericPage, HomePage, LandingPage } from './components/StudentPages.jsx';
import { ProfessorDashboard } from './components/ProfessorPages.jsx';
import { getSession } from '../services/storage.js';

function Protected({ children }) {
  return getSession() ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return <Routes>
    <Route path="/" element={<AppShell><LandingPage /></AppShell>} />
    <Route path="/login" element={<AppShell><LoginPage /></AppShell>} />
    <Route path="/registro" element={<AppShell><RegisterPage /></AppShell>} />
    <Route path="/home" element={<AppShell><Protected><HomePage /></Protected></AppShell>} />
    <Route path="/professor/*" element={<AppShell professor><Protected><Routes><Route index element={<ProfessorDashboard />} /><Route path="*" element={<GenericPage title="Painel do professor" />} /></Routes></Protected></AppShell>} />
    <Route path="*" element={<AppShell><Protected><GenericPage title="Área de estudos" /></Protected></AppShell>} />
  </Routes>;
}
