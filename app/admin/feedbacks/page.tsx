"use client"; // Declaração para o uso do Next.js com React (funcionalidade de "client-side")
import Navbar from '../../components/Navbar'; // Caminho correto para Navbar
import { useState } from "react"; // Importação do hook useState do React para gerenciar o estado

export default function Feedbacks() {
  const userType: 'admin' | 'monitor' | 'student' = 'admin'; // Defina corretamente o tipo de usuário

  // Estado para armazenar os feedbacks recebidos
  const [feedbacks, setFeedbacks] = useState([
    { id: "1", nome: "Aluno 1", comentario: "Gostei muito da monitoria, ajudou bastante!", data: "2025-03-06", resposta: "" },
    { id: "2", nome: "Aluno 2", comentario: "A monitoria poderia ter mais exemplos práticos.", data: "2025-03-05", resposta: "" },
  ]);

  // Estado para armazenar as respostas do administrador, associando o id do feedback com a resposta
  const [respostas, setRespostas] = useState<{ [key: string]: string }>({});
  const [isResponding, setIsResponding] = useState<{ [key: string]: boolean }>({}); // Estado para controle do processo de resposta

  // Função para manipular a mudança na resposta do administrador
  const handleRespostaChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setRespostas({ ...respostas, [id]: e.target.value }); // Atualiza a resposta associada ao feedback
  };

  // Função para enviar a resposta para um feedback
  const handleResponder = (id: string) => {
    if (!respostas[id]) return; // Impede envio se não houver resposta

    // Atualiza o feedback com a resposta fornecida pelo administrador
    setFeedbacks(feedbacks.map(feedback => 
      feedback.id === id ? { ...feedback, resposta: respostas[id] } : feedback
    ));
    setRespostas({ ...respostas, [id]: "" }); // Limpa o campo de resposta após o envio
    setIsResponding({ ...isResponding, [id]: false }); // Marca como não respondendo
  };

  return (
    <div className="flex">
      <Navbar userType={userType} /> {/* Passando a prop userType corretamente */}
      <div className="container mx-auto px-4 py-6 flex-1">
        {/* Conteúdo Principal */}
        <main className="flex-1 p-10">
          <h2 className="text-center text-2xl font-semibold text-gray-800">Feedbacks</h2>

          {/* Lista de Feedbacks Recebidos */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800">Feedbacks Recebidos</h3>
            <div className="mt-4 space-y-4">
              {/* Mapeia os feedbacks para exibi-los */}
              {feedbacks.map((feedback) => (
                <div key={feedback.id} className="bg-white p-4 rounded-lg shadow-md">
                  <p className="font-semibold text-gray-800">{feedback.nome}</p>
                  <p className="text-gray-600">{feedback.comentario}</p>
                  <p className="text-gray-400 text-sm">{feedback.data}</p>

                  {/* Exibe a resposta do administrador ou formulário para resposta */}
                  <div className="mt-4">
                    {feedback.resposta ? (
                      // Se já existe uma resposta, exibe ela
                      <div className="bg-gray-100 p-2 rounded">
                        <strong>Resposta:</strong> {feedback.resposta}
                      </div>
                    ) : (
                      // Caso contrário, exibe o campo para o administrador escrever a resposta
                      <div>
                        <label className="block text-gray-700 font-medium">Responder</label>
                        <input
                          type="text"
                          value={respostas[feedback.id] || ""} // Exibe a resposta digitada ou valor vazio
                          onChange={(e) => handleRespostaChange(feedback.id, e)} // Atualiza a resposta enquanto digita
                          className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                          placeholder="Digite sua resposta..."
                        />
                        <button
                          onClick={() => handleResponder(feedback.id)} // Envia a resposta
                          disabled={isResponding[feedback.id]} // Desabilita enquanto estiver respondendo
                          className={`mt-2 px-4 py-2 rounded transition ${isResponding[feedback.id] ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                        >
                          {isResponding[feedback.id] ? 'Respondendo...' : 'Responder'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
