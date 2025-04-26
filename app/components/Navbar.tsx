'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type NavbarProps = {
  userType: 'admin' | 'monitor' | 'student';
};

type LinkItem = {
  href: string;
  label: string;
  extra?: string;
};

const Navbar: React.FC<NavbarProps> = ({ userType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  const getNavbarColor = () => {
    switch (userType) {
      case 'admin':
        return 'bg-gray-900';
      case 'monitor':
        return 'bg-red-800';
      case 'student':
        return 'bg-blue-700';
      default:
        return 'bg-gray-900';
    }
  };

  const links: Record<'admin' | 'monitor' | 'student', LinkItem[]> = {
    admin: [
      { href: '/admin/dashboard', label: 'Dashboard' },
      { href: '/admin/cadastro', label: 'Cadastro de Usuários' },
      { href: '/admin/feedbacks', label: 'Feedbacks' },
      { href: '/admin/monitoria', label: 'Cadastrar Monitorias' },
      { href: '/', label: 'Sair', extra: 'mt-4 hover:bg-red-600' },
    ],
    monitor: [
      { href: '/monitor/dashboard', label: 'Dashboard' },
      { href: '/monitor/agenda', label: 'Agenda' },
      { href: '/monitor/monitoria', label: 'Monitorias' },
      { href: '/', label: 'Sair' },
    ],
    student: [
      { href: '/user/dashboard', label: 'Dashboard' },
      { href: '/user/agenda', label: 'Agenda' },
      { href: '/user/monitoria', label: 'Monitorias' },
      { href: '/', label: 'Sair' },
    ],
  };

  const renderLinks = () =>
    links[userType].map(({ href, label, extra = '' }) => (
      <Link
        key={href}
        href={href}
        className={`block px-4 py-2 rounded hover:bg-opacity-80 transition ${extra}`}
      >
        {label}
      </Link>
    ));

  return (
    <>
      {/* Renderiza o botão apenas se o menu estiver fechado */}
      {!isOpen && (
        <div
          className={`fixed top-0 left-0 w-full flex items-center justify-between p-4 z-50 text-white ${getNavbarColor()}`}
        >
          <button onClick={toggleMenu}>
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold">Monitoria Digital</h1>
          
        </div>
      )}

      {/* Drawer lateral animado visível apenas quando isOpen = true */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Fundo escurecido */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
            />

            {/* Menu lateral */}
            <motion.div
              className={`fixed top-0 left-0 w-64 h-full p-6 z-50 text-white ${getNavbarColor()}`}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">
                  {userType === 'admin'
                    ? 'ADM'
                    : userType === 'monitor'
                    ? 'Monitor'
                    : 'Aluno'}
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
