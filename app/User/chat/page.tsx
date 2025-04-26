"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@monitoriadigital/app/context/AuthContext";
import  io  from "socket.io-client";

// Cria a conexão socket
const socket = io("http://localhost:3001"); // Altere para o endereço real se necessário

export default function ChatPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    // Escuta novas mensagens do servidor
    const handleMessage = (msg: string) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, [user, router]); // Adiciona router como dependência

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("message", `${user}: ${message}`);
      setMessage("");
    }
  };

  return (
    <main className="max-w-xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Chat em tempo real</h1>
        <button onClick={logout} className="text-red-500 underline">
          Sair
        </button>
      </div>

      <div className="border p-4 rounded h-64 overflow-y-auto bg-gray-100 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className="text-sm">{msg}</div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border px-3 py-2 rounded"
          placeholder="Digite uma mensagem..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Enviar
        </button>
      </form>
    </main>
  );
}
