var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http, {
  path: "/imprimir",
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
  socket.on("message", (msg) => {
    console.log("message recibido:", msg);
    io.emit("socketimprimir", msg);
    console.log(`Accion en: socketimprimir: ${msg}`);
  });
});

// io.on("connection", (socket) => {
//   console.log("a user connected");
//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });

io.emit("an event sent to all connected clients");

http.listen(7667, () => {
  console.log("listening on *:7667");
});
