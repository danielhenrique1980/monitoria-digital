import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*", // permite qualquer origem (ideal para testes)
  },
});

io.on("connection", (socket) => {
  console.log("Conectado:", socket.id);

  socket.on("message", (msg) => {
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("Desconectado:", socket.id);
  });
});

httpServer.listen(3001, () => {
  console.log("Socket.IO rodando em http://localhost:3001");
});
