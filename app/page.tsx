// app/pages/LandingPage.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Bars3Icon,
  XMarkIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";

// Definição das seções para os botões expansíveis
const featureSections = [
  {
    id: "usuarios",
    title: "Aulas sincronas com alunos",
    description: "As aulas são agendas e são ao vivo, possibilitando sanar dúvidas durante a aula",
    expanded: true, // Inicia expandido por padrão
  },
  {
    id: "administrador",
    title: "Controle total de admimistração",
    description: "Monitoramento de desempenho dos alunos e Controle de aulas",
  },
  {
    id: "monitor",
    title: "Planeje suas aulas",
    description: "Faça seus horarios e crie suas aulas com facilidade",
  },
];

// Componente para os resultados com métricas
/*const ResultMetric = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center text-center p-4">
    <div className="text-destaque text-5xl font-bold mb-2">{value}</div>
    <div className="text-paragrafo">{label}</div>
  </div>
);*/

export default function LandingPage() {
  // Estados para controlar a expansão das seções e menu móvel
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    usuarios: true, // Apenas o primeiro começa expandido
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Função para alternar a expansão da seção
  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Barra de Navegação */}
      <nav className="bg-fundo text-titulo shadow-md py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-2xl font-bold">Monitoria Digital</h1>

          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-6">
            <Link href="#tecnologias" className="hover:text-destaque transition">
              Tecnologias
            </Link>
            <Link href="#documentacao" className="hover:text-destaque transition">
              Documentação
            </Link>

          </div>

          {/* Botões de Login e Início */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="bg-botao text-textoBotao px-4 py-2 rounded-md hover:bg-destaque transition">
              Login
            </Link>
          </div>

          {/* Botão do Menu Mobile */}
          <button
            className="md:hidden text-titulo"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-fundo border-t border-secundario">
            <div className="flex flex-col space-y-4 px-6">
              <Link
                href="#tecnologias"
                className="hover:text-destaque transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tecnologias
              </Link>
              <Link
                href="#documentacao"
                className="hover:text-destaque transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Documentação
              </Link>
              <div className="pt-4 border-t border-secundario flex flex-col space-y-4">
                <Link
                  href="/login"
                  className="bg-botao text-textoBotao px-4 py-2 rounded-md hover:bg-destaque transition text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Seção do Hero */}
      <section className="bg-fundo py-16 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Textos do Hero - Lado Esquerdo */}
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-titulo leading-tight mb-6">
              Bem-vindo a Monitoria Digital, uma plataforma para gerenciar monitorias.
              </h1>
              <p className="text-paragrafo text-lg mb-8">
              Faça o acompanhamento e controle de o desempenho dos alunos e agende suas atividades. 
              Nosso sistema oferece uma experiência intuitiva e eficiente para monitores e alunos.
              </p>
            </div>

            {/* Imagem do Hero - Lado Direito */}
            <div className="lg:w-1/2 lg:pl-10">
              {/* Placeholder para imagem - substitua pelo URL correto */}
              <div className="rounded-lg overflow-hidden shadow-xl">
                {/* TODO: Substituir pelo componente de imagem/vídeo real */}
                <div className="bg-secundario h-64 md:h-80 flex items-center justify-center text-fundo">
                  {/* Substituir por uma imagem real */}
                  <Image src={"/tela-aluno.png"} width={600} height={400} alt="Aula ao vivo"/>
                  {/* Exemplo: <Image src="/hero-image.jpg" alt="Plataforma Monitoria Digital" width={600} height={400} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Recursos com Botões Expansíveis */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row">
            {/* Coluna de Botões Expansíveis */}
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <div className="space-y-4">
                {featureSections.map((section) => (
                  <div key={section.id} className="border rounded-md overflow-hidden bg-fundo shadow-sm">
                    <button
                      className="w-full text-left px-4 py-3 flex justify-between items-center font-medium text-titulo hover:bg-gray-50 transition"
                      onClick={() => toggleSection(section.id)}
                    >
                      <span>{section.title}</span>
                      {expandedSections[section.id] ? (
                        <MinusIcon className="h-5 w-5 text-destaque" />
                      ) : (
                        <PlusIcon className="h-5 w-5 text-destaque" />
                      )}
                    </button>
                    {expandedSections[section.id] && (
                      <div className="px-4 py-3 border-t border-gray-100 text-paragrafo">
                        <p>{section.description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Coluna de Imagem/iframe */}
            <div className="lg:w-1/2 lg:pl-10">
              {/* Placeholder/sombra para screenshot do sistema */}
              <div className="bg-fundo p-2 rounded-lg border shadow-lg">
                {/*Substituir pelo iframe ou imagem real */}
                <Image src={"/opengraph-image.png"} alt="Plataforma Monitoria Digital" width={600} height={400}/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de CTA */}
      <section className="py-16 px-6 bg-destaque text-fundo">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Transforme seus estudos agora
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Conecte-se com seus alunos e monitores em potenciais e em tempo real, aumente seu desempenho acadêmico e acelere o seu aprendizado.
          </p>
          <Link
            href="/Login"
            className="bg-fundo text-destaque px-8 py-4 rounded-md hover:bg-gray-100 transition inline-block text-lg font-medium"
          >
            Conecte-se Agora
          </Link>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-titulo text-fundo py-12 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Coluna 1 - Logo e Informações */}
            <div>
              <h3 className="text-xl font-bold mb-4">Monitoria Digital</h3>
              <p className="mb-4">
                Soluções de engajamento de acadêmico para instituições modernas.
              </p>
              <div className="flex space-x-4">
                {/* Ícones de Redes Sociais */}
                <a href="#" className="hover:text-destaque transition">
                  <span className="sr-only">Facebook</span>
                  <div className="h-6 w-6 bg-fundo rounded-full"></div>
                </a>
                <a href="#" className="hover:text-destaque transition">
                  <span className="sr-only">Twitter</span>
                  <div className="h-6 w-6 bg-fundo rounded-full"></div>
                </a>
                <a href="#" className="hover:text-destaque transition">
                  <span className="sr-only">LinkedIn</span>
                  <div className="h-6 w-6 bg-fundo rounded-full"></div>
                </a>
              </div>
            </div>

            {/* Coluna 2 - Links Rápidos */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#sobre" className="hover:text-destaque transition">
                    Sobre Nós
                  </Link>
                </li>
                <li>
                  <Link href="#funcionalidades" className="hover:text-destaque transition">
                    Funcionalidades
                  </Link>
                </li>
                <li>
                  <Link href="#precos" className="hover:text-destaque transition">
                    Seja um monitor
                  </Link>
                </li>
              </ul>
            </div>

            {/* Coluna 3 - Contato */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <ul className="space-y-2">
                <li>contato@monitoriadigital.com</li>
                <li>+55 (11) 95895-2041</li>
                <li>São Paulo, SP - Brasil</li>
              </ul>
            </div>

            {/* Coluna 4 - Inscrição na Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Atualizações</h3>
              <p className="mb-4">
                Inscreva-se para receber as últimas notícias e atualizações.
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="px-4 py-2 rounded-l-md w-full text-titulo"
                />
                <button
                  type="submit"
                  className="bg-destaque px-4 py-2 rounded-r-md hover:bg-botao transition"
                >
                  Enviar
                </button>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}