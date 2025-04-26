"use client";
import { useState, useEffect } from "react";
import Navbar from '../../components/Navbar'; // Caminho correto para Navbar
import Link from 'next/link'; // Importa o Link do Next.js

export default function Agenda() {
  const userType: 'admin' | 'monitor' | 'student' = 'monitor'; // Defina corretamente o tipo de usuário
  const [meetings, setMeetings] = useState<{ roomName: string; date: string; turma?: string }[]>([]);
  const [meetingDate, setMeetingDate] = useState<string>("");
  const [turma, setTurma] = useState<string>("");

  useEffect(() => {
    const storedMeetings = localStorage.getItem("meetings");
    if (storedMeetings) {
      setMeetings(JSON.parse(storedMeetings));
    }
  }, []);

  const handleSchedule = () => {
    if (!meetingDate.trim()) {
      alert("Por favor, selecione uma data e hora.");
      return;
    }

    const newMeeting = {
      roomName: `meeting-${Date.now()}`,
      date: new Date(meetingDate).toLocaleString(),
      turma: turma.trim() ? turma : undefined,
    };

    const updatedMeetings = [...meetings, newMeeting];
    setMeetings(updatedMeetings);
    localStorage.setItem("meetings", JSON.stringify(updatedMeetings));

    setMeetingDate("");
    setTurma("");
  };

  const handleDeleteMeeting = (roomName: string) => {
    const updatedMeetings = meetings.filter(meeting => meeting.roomName !== roomName);
    setMeetings(updatedMeetings);
    localStorage.setItem("meetings", JSON.stringify(updatedMeetings));
  };

  return (
    <div className="flex">
      <Navbar userType={userType} /> {/* Passando a prop userType corretamente */}
      <div className="container mx-auto px-4 py-6 flex-1">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">📅 Agenda de Monitorias</h2>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-4">📌 Agendar Nova Reunião</h3>
          <input
            type="datetime-local"
            value={meetingDate}
            onChange={(e) => setMeetingDate(e.target.value)}
            className="block w-full p-2 border rounded mb-4"
          />
          <input
            type="text"
            placeholder="Turma (opcional)"
            value={turma}
            onChange={(e) => setTurma(e.target.value)}
            className="block w-full p-2 border rounded mb-4"
          />
          <button
            onClick={handleSchedule}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
          >
            Agendar Reunião
          </button>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-4">📋 Reuniões Agendadas</h3>
        {meetings.length === 0 ? (
          <p className="text-gray-600">Nenhuma reunião agendada.</p>
        ) : (
          <ul className="space-y-4">
            {meetings.map((meeting) => (
              <li key={meeting.roomName} className="bg-white p-4 rounded shadow-md flex justify-between items-center">
                <div>
                  <p><strong>📆 Data:</strong> {meeting.date}</p>
                  {meeting.turma && <p><strong>🏫 Turma:</strong> {meeting.turma}</p>}
                  <p><strong>🔗 Sala:</strong> {meeting.roomName}</p>
                  <Link
                    href={`./Monitoria?room=${meeting.roomName}`}
                    target="_blank"
                    className="text-blue-500 underline"
                  >
                    👉 Entrar na reunião
                  </Link>
                </div>
                <button
                  onClick={() => handleDeleteMeeting(meeting.roomName)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Excluir
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
