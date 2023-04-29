const express = require("express");

const app = express();

const { infoCursos } = require("./datos/cursos");

//ROUTERS

const routerProgramacion = require("./routers/programacion.js");
app.use("/api/cursos/programacion", routerProgramacion);

const routerMatematicas = require("./routers/matematicas.js");
app.use("/api/cursos/matematicas", routerMatematicas);

//PAGINA INICIO
app.get("/", (req, res) => {
  res.send("PAGINA DE INICIO");
});

//CURSOS
app.get("/api/cursos", (req, res) => {
  res.send(JSON.stringify(infoCursos));
});

const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
  console.log(`Funcionando en http://localhost:${PUERTO}`);
});
