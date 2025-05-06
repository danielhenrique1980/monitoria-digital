'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

type NavbarProps = {
  userType: 'admin' | 'monitor' | 'student';
};

type LinkItem = {
  href: string;
  label: string;
  extra?: string;
};

const Navbar: React.FC<NavbarProps> = ({ userType }) => {
  const router = useRouter();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  const getNavbarColor = () => {
    switch (userType) {
      case 'admin': return 'bg-gray-900';
      case 'monitor': return 'bg-red-800';
      case 'student': return 'bg-blue-700';
      default: return 'bg-gray-900';
    }
  };

  // Lista de links ÚNICA e CORRETA
  const links: Record<'admin' | 'monitor' | 'student', LinkItem[]> = {
    admin: [
      { href: '/admin/dashboard', label: 'Dashboard' },
      { href: '/admin/cadastro', label: 'Cadastro de Usuários' },
      { href: '/admin/feedbacks', label: 'Feedbacks' },
      { href: '/admin/monitoria', label: 'Cadastrar Monitorias' },
      { href: '/admin/Forum', label: 'Forum' },
      { href: '#', label: 'Sair', extra: 'mt-4 hover:bg-red-600' }, // Alterado para #
    ],
    monitor: [
      { href: '/monitor/dashboard', label: 'Dashboard' },
      { href: '/monitor/agenda', label: 'Agenda' },
      { href: '/monitor/monitoria', label: 'Monitorias' },
      { href: '/monitor/Forum', label: 'Forum' },
      { href: '#', label: 'Sair' }, // Alterado para #
    ],
    student: [
      { href: '/User/dashboard', label: 'Dashboard' },
      { href: '/User/agenda', label: 'Agenda' },
      { href: '/User/monitoria', label: 'Monitorias' },
      { href: '/User/Forum', label: 'Forum' },
      { href: '#', label: 'Sair' }, // Alterado para #
    ],
  };

  // Função de logout ÚNICA
  const handleLogout = () => {
    logout();
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    
    // Força limpeza do cache e redirecionamento
    window.location.href = '/login'; // Substitui o router.push
    // Ou alternativamente:
    // router.replace('/login');
    // window.location.reload();
  };

  // Função renderLinks ÚNICA e CORRETA
  const renderLinks = () => {
    return links[userType].map(({ href, label, extra = '' }) => {
      if (label === 'Sair') {
        return (
          <button
            key="logout"
            onClick={handleLogout}
            className={`w-full text-left px-4 py-2 rounded hover:bg-opacity-80 transition ${extra}`}
          >
            {label}
          </button>
        );
      }
      
      return (
        <Link
          key={href}
          href={href}
          className={`block px-4 py-2 rounded hover:bg-opacity-80 transition ${extra}`}
        >
          {label}
        </Link>
      );
    });
  };

  return (
    <>
      {!isOpen && (
        <div className={`fixed top-0 left-0 w-full flex items-center justify-between p-4 z-50 text-white ${getNavbarColor()}`}>
          <button onClick={toggleMenu}>
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold">Monitoria Digital</h1>
        </div>
      )}

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
            />

            <motion.div
              className={`fixed top-0 left-0 w-64 h-full p-6 z-50 text-white ${getNavbarColor()}`}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">
                  {userType === 'admin' ? 'ADM' : 
                  userType === 'monitor' ? 'Monitor' : 'Aluno'}
                </h3>
                <button onClick={toggleMenu}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="space-y-3">{renderLinks()}</nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;