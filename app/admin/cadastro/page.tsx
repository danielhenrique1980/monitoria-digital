'use client';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Papa from 'papaparse';

type Usuario = {
  id_usuario: number;
  nome: string;
  email: string;
  tipo: string;
};

export default function CadastroPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    tipo: '',
    curso: '',
    especialidade: '',
    formacao_academica: '',
    data_nascimento: '',
  });

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const carregarUsuarios = async () => {
    const res = await fetch('/api/usuarios');
    const data = await res.json();
    setUsuarios(data);
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);

    const res = await fetch('/api/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert('Usuário cadastrado com sucesso!');
      setFormData({ nome: '', email: '', senha: '', tipo: '', curso: '', especialidade: '', formacao_academica: '', data_nascimento: '' });
      carregarUsuarios();
    } else {
      const msg = await res.text();
      alert(`Erro: ${msg}`);
    }

    setCarregando(false);
  };

  const handleDelete = async (id_usuario: number) => {
    const confirm = window.confirm('Tem certeza que deseja excluir este usuário?');
    if (!confirm) return;

    const res = await fetch(`/api/usuarios/${id_usuario}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      alert('Usuário deletado!');
      carregarUsuarios();
    } else {
      alert('Erro ao deletar usuário');
    }
  };

  const handleCSVImport = () => {
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (result: Papa.ParseResult<Record<string, string>>) => {
        for (const row of result.data) {
          await fetch('/api/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(row),
          });
        }
        alert('Importação concluída!');
        carregarUsuarios();
      },
    });
  };

  const handleCSVExport = () => {
    const csv = Papa.unparse(usuarios);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'usuarios.csv';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar userType="admin" />

      <div className="max-w-6xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Cadastro de Usuários</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded shadow mb-6">
          <input name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} className="border px-3 py-2 rounded" />
          <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border px-3 py-2 rounded" />
          <input type="password" name="senha" placeholder="Senha" value={formData.senha} onChange={handleChange} className="border px-3 py-2 rounded" />
          <select name="tipo" value={formData.tipo} onChange={handleChange} className="border px-3 py-2 rounded">
            <option value="">Tipo</option>
            <option value="admin">Administrador</option>
            <option value="monitor">Monitor</option>
            <option value="usuario">Usuário</option>
          </select>
          <input name="curso" placeholder="Curso" value={formData.curso} onChange={handleChange} className="border px-3 py-2 rounded" />
          <input name="especialidade" placeholder="Especialidade" value={formData.especialidade} onChange={handleChange} className="border px-3 py-2 rounded" />
          <input name="formacao_academica" placeholder="Formação Acadêmica" value={formData.formacao_academica} onChange={handleChange} className="border px-3 py-2 rounded" />
          <input type="date" name="data_nascimento" value={formData.data_nascimento} onChange={handleChange} className="border px-3 py-2 rounded" />
          <button type="submit" disabled={carregando} className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 col-span-1">
            {carregando ? 'Salvando...' : 'Salvar'}
          </button>
        </form>

        {/* Importação e Exportação */}
        <div className="mb-6 flex gap-4 items-center">
          <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
          <button onClick={handleCSVImport} className="bg-blue-500 text-white px-4 py-2 rounded">Importar CSV</button>
          <button onClick={handleCSVExport} className="bg-yellow-500 text-white px-4 py-2 rounded">Exportar CSV</button>
        </div>

        {/* Tabela de usuários */}
        <table className="w-full bg-white rounded shadow overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left p-2">Nome</th>
              <th className="text-left p-2">Email</th>
              <th className="text-left p-2">Tipo</th>
              <th className="text-left p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id_usuario} className="border-t hover:bg-gray-50">
                <td className="p-2">{usuario.nome}</td>
                <td className="p-2">{usuario.email}</td>
                <td className="p-2">{usuario.tipo}</td>
                <td className="p-2 space-x-2">
                  <button className="text-blue-600 hover:underline">Editar</button>
                  <button onClick={() => handleDelete(usuario.id_usuario)} className="text-red-600 hover:underline">Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
