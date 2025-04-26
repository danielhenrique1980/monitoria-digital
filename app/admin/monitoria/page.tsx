"use client";
import Navbar from '../../components/Navbar'; // Caminho correto para Navbar
import { useState } from "react";

// Componente de cadastro de monitorias
export default function CadastroMonitoria() {
  const userType: 'admin' | 'monitor' | 'student' = 'admin'; // Defina corretamente o tipo de usuário
  const [formData, setFormData] = useState<{
    disciplina: string;
    monitorId: string;
    alunosIds: string[];
  }>({
    disciplina: "",
    monitorId: "",
    alunosIds: [],
  });

  // Dados simulados para monitores e alunos
  const monitores = [
    { id: "1", nome: "Monitor 1" },
    { id: "2", nome: "Monitor 2" },
  ];

  const alunos = [
    { id: "1", nome: "Aluno 1" },
    { id: "2", nome: "Aluno 2" },
    { id: "3", nome: "Aluno 3" },
  ];

  // Lista simulada de turmas cadastradas
  const turmas = [
    {
      id: "1",
      disciplina: "Matemática",
      monitor: "Monitor 1",
      alunos: ["Aluno 1", "Aluno 2"],
    },
    {
      id: "2",
      disciplina: "Física",
      monitor: "Monitor 2",
      alunos: ["Aluno 3"],
    },
  ];

  // Função para lidar com mudanças nos campos de texto
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Função para lidar com a mudança nas seleções múltiplas de alunos
  const handleAlunosChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, alunosIds: selectedOptions });
  };

  // Função para enviar o formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Monitoria cadastrada com sucesso!");
    setFormData({ disciplina: "", monitorId: "", alunosIds: [] });
  };

  return (
    <div className="flex">
    <Navbar userType={userType} /> {/* Passando a prop userType corretamente */}
    <div className="container mx-auto px-4 py-6 flex-1"></div>

      {/* Conteúdo Principal */}
      <main className="flex-50 p-10">
        <h2 className="text-center text-2xl font-semibold text-gray-800">Cadastrar Monitoria</h2>
        <form onSubmit={handleSubmit} className="mt-6 bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
          {/* Formulário */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Disciplina</label>
            <input
              type="text"
              name="disciplina"
              value={formData.disciplina}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Monitor</label>
            <select
              name="monitorId"
              value={formData.monitorId}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            >
              <option value="">Selecione um monitor</option>
              {monitores.map((monitor) => (
                <option key={monitor.id} value={monitor.id}>
                  {monitor.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Alunos</label>
            <select
              name="alunosIds"
              multiple
              value={formData.alunosIds}
              onChange={handleAlunosChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            >
              {alunos.map((aluno) => (
                <option key={aluno.id} value={aluno.id}>
                  {aluno.nome}
                </option>
              ))}
            </select>
            <small className="text-gray-500">Segure CTRL (Windows) ou Command (Mac) para selecionar múltiplos alunos.</small>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Cadastrar
            </button>
            <button
              type="reset"
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition"
              onClick={() => setFormData({ disciplina: "", monitorId: "", alunosIds: [] })}
            >
              Limpar
            </button>
          </div>
        </form>

        {/* Visualização das turmas cadastradas */}
        <div className="mt-10">
          <h3 className="text-center text-xl font-semibold text-gray-800">Turmas Cadastradas</h3>
          <div className="mt-6 space-y-4">
            {turmas.length === 0 ? (
              <p className="text-center text-gray-500">Nenhuma turma cadastrada.</p>
            ) : (
              turmas.map((turma) => (
                <div key={turma.id} className="bg-white p-4 rounded-lg shadow-md">
                  <h4 className="text-lg font-semibold text-gray-800">{turma.disciplina}</h4>
                  <p className="text-gray-600">Monitor: {turma.monitor}</p>
                  <p className="text-gray-600">Alunos: {turma.alunos.join(", ")}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
