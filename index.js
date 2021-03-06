var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http, {
  path: "/socketimpresora",
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false,
});

app.get("/", (req, res) => {
  res.json({
    result: "Server socket io",
  });
});

io.on("connection", (socket) => {
  console.log("conectado");
  io.emit("an event sent to all connected clients");
  socket.on("message", (msg) => {
    console.log("message recibido:", msg);
    io.emit("socketimprimir", msg);
    console.log(`Accion en: socketimprimir: ${msg}`);
  });
  socket.on("recibe_socketimprimir_interno", (msg) => {
    console.log("message socketimprimir_interno:", msg);
    io.emit("socketimprimir_interno", msg);
    console.log(`Accion en: socketimprimir_interno: ${msg}`);
  });
  socket.on("recibe_socketimprimir_cliente", (msg) => {
    console.log("socketimprimir_cliente recibido:", msg);
    io.emit("socketimprimir_cliente", msg);
    console.log(`Accion en: socketimprimir_cliente: ${msg}`);
  });
});

// io.on("connection", (socket) => {
//   console.log("a user connected");
//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });

http.listen(7667, () => {
  console.log("listening on *:7667");
});
