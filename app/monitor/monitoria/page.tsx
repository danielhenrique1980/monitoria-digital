"use client";
import { useState, useEffect, useRef } from "react";

// Componente JitsiMeeting para gerenciar a videochamada
const JitsiMeeting = ({ roomName, onEnd }: { roomName: string; onEnd: () => void }) => {
  // Ref para o contêiner onde o Jitsi será renderizado
  const jitsiContainerRef = useRef<HTMLDivElement | null>(null);

  // Hook useEffect para inicializar o Jitsi quando o componente for montado
  useEffect(() => {
    // Verifica se o JitsiMeetExternalAPI está disponível no objeto window
    if (typeof window !== "undefined" && window.JitsiMeetExternalAPI) {
      const JitsiMeetExternalAPI = window.JitsiMeetExternalAPI;

      // Opções para configurar a reunião no Jitsi
      const options = {
        roomName: roomName, // Nome da sala de reunião
        width: "100%", // Largura da reunião
        height: "100%", // Altura da reunião
        parentNode: jitsiContainerRef.current, // Contêiner onde o Jitsi será exibido
        configOverwrite: { startWithAudioMuted: true, startWithVideoMuted: true }, // Inicia com áudio e vídeo mutados
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: ["microphone", "camera", "hangup", "chat", "settings"], // Botões da interface
        },
      };

      // Cria a instância da API Jitsi
      const api = new JitsiMeetExternalAPI("meet.jit.si", options);

      // Adiciona um ouvinte de evento para encerrar a reunião
      api.addEventListener("readyToClose", () => {
        onEnd(); // Chama a função onEnd quando a reunião for encerrada
      });

      // Limpa a instância do Jitsi quando o componente for desmontado
      return () => {
        api.dispose(); // Libera recursos do Jitsi
      };
    }
  }, [roomName, onEnd]); // Reexecução do useEffect se roomName ou onEnd mudarem

  return (
    // Contêiner para exibir o Jitsi
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center">
      {/* Contêiner onde o Jitsi será renderizado */}
      <div ref={jitsiContainerRef} className="w-full h-full"></div>

      {/* Botão para sair da reunião */}
      <button
        onClick={onEnd}
        className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded"
      >
        Sair da Reunião
      </button>
    </div>
  );
};

// Componente FeedbackForm para coletar o feedback dos usuários após a reunião
const FeedbackForm = ({ onSubmit }: { onSubmit: (feedback: string, rating: number) => void }) => {
  // Estado para armazenar o feedback e a nota
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(5);

  // Função para lidar com o envio do feedback
  const handleSubmit = () => {
    onSubmit(feedback, rating); // Chama a função onSubmit passando feedback e nota
  };

  return (
    // Contêiner com fundo semitransparente para o formulário de feedback
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h3 className="text-lg font-semibold mb-4">Avaliação da Reunião</h3>
        
        {/* Campo de texto para o feedback */}
        <textarea
          className="w-full p-2 border rounded mb-3"
          placeholder="Deixe seu feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)} // Atualiza o feedback
        ></textarea>
        
        <div className="mb-3">
          <label className="mr-2">Nota:</label>
          
          {/* Campo para selecionar a nota de 1 a 5 */}
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>{num}</option> // Opções de notas
            ))}
          </select>
        </div>
        
        {/* Botão para enviar o feedback */}
        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
          Enviar Feedback
        </button>
      </div>
    </div>
  );
};

// Componente principal Monitoria que gerencia as reuniões e o feedback
export default function Monitoria() {
  // Estado para armazenar as reuniões
  const [meetings, setMeetings] = useState<{ roomName: string; date: string }[]>([]);
  
  // Estado para armazenar a reunião selecionada
  const [selectedMeeting, setSelectedMeeting] = useState<string | null>(null);
  
  // Estado para controlar se o formulário de feedback deve ser exibido
  const [showFeedback, setShowFeedback] = useState(false);

  // useEffect para carregar as reuniões armazenadas no localStorage
  useEffect(() => {
    const storedMeetings = localStorage.getItem("meetings");
    if (storedMeetings) {
      setMeetings(JSON.parse(storedMeetings)); // Carrega as reuniões armazenadas
    }
  }, []); // Este efeito é executado apenas uma vez após o primeiro render

  // Função chamada quando a reunião é encerrada
  const handleEndMeeting = () => {
    setSelectedMeeting(null); // Limpa a reunião selecionada
    setShowFeedback(true); // Exibe o formulário de feedback
  };

  // Função para enviar o feedback
  const handleSubmitFeedback = (feedback: string, rating: number) => {
    // Recupera os feedbacks armazenados no localStorage
    const feedbacks = JSON.parse(localStorage.getItem("feedbacks") || "[]");
    feedbacks.push({ feedback, rating, date: new Date().toLocaleString() }); // Adiciona o novo feedback
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks)); // Salva os feedbacks novamente
    setShowFeedback(false); // Fecha o formulário de feedback
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Monitoria - Videochamada</h2>

      <h3 className="text-xl font-semibold mt-6">Selecione uma reunião</h3>
      
      {/* Lista de reuniões agendadas */}
      <ul className="mt-4 space-y-2">
        {meetings.map((meeting) => (
          <li key={meeting.roomName} className="bg-white p-4 rounded shadow-md">
            <p><strong>Data:</strong> {meeting.date}</p>
            <p><strong>Sala:</strong> {meeting.roomName}</p>
            {/* Botão para iniciar a reunião */}
            <button
              onClick={() => setSelectedMeeting(meeting.roomName)}
              className="mt-2 block bg-blue-500 text-white px-4 py-2 rounded"
            >
              Iniciar Reunião
            </button>
          </li>
        ))}
      </ul>

      {/* Exibe a reunião Jitsi se uma reunião for selecionada */}
      {selectedMeeting && <JitsiMeeting roomName={selectedMeeting} onEnd={handleEndMeeting} />}

      {/* Exibe o formulário de feedback após o término da reunião */}
      {showFeedback && <FeedbackForm onSubmit={handleSubmitFeedback} />}
    </div>
  );
}
