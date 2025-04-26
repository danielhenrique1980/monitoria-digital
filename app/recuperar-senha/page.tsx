"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RecuperarSenha() {
  const [email, setEmail] = useState(""); // Estado para armazenar o e-mail
  const [message, setMessage] = useState(""); // Estado para armazenar mensagens de sucesso ou erro
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Impede o envio do formulário padrão
    console.log("Recuperação de senha para:", email); // Exibe o e-mail no console (simulação)

    // Simulação de verificação do e-mail
    const isValidEmail = email === "user@exemplo.com"; // Exemplo de e-mail válido para recuperação

    if (isValidEmail) {
      setMessage("Instruções para recuperar sua senha foram enviadas para o seu e-mail.");
      setTimeout(() => {
        router.push("/login"); // Redireciona o usuário para a página de login após sucesso
      }, 2000);
    } else {
      setMessage("E-mail não encontrado. Por favor, tente novamente.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-center text-blue-600 text-2xl font-semibold mb-4">
          Recuperação de Senha
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Exibe a mensagem de sucesso ou erro */}
          {message && (
            <div
              className={`p-2 mt-4 text-center ${
                message.includes("enviadas") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Enviar Instruções
          </button>
        </form>

        <div className="mt-3 text-center">
          <Link href="/login" className="text-blue-500 hover:underline">
            Voltar para o Login
          </Link>
        </div>
      </div>
    </div>
  );
}
