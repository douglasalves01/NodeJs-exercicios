import http from "http";
//const http = require("node:http");
const port = 3000;

const server = http.createServer((req, res) => {
  res.write("Oi HTTP"); //inserindo a resposta
  res.end(); //finalizando a resposta
});
server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
