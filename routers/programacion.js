const express = require("express");

const routerProgramacion = express.Router();

const { programacion } = require("../datos/cursos").infoCursos;

routerProgramacion.use(express.json()); // permite tratabajar con el body en formato json

routerProgramacion.get("/", (req, res) => {
  res.send(programacion);
});

routerProgramacion.get("/:lenguaje", (req, res) => {
  const lenguaje = req.params.lenguaje;
  const resultado = programacion.filter((curso) => curso.lenguaje === lenguaje);

  if (resultado.length === 0) {
    return res.status(404).send("NOT FOUND");
  }

  if (req.query.ordenar === "vistas") {
    return res.send(resultado.sort((a, b) => b.vistas - a.vistas));
  }
  res.json(resultado);
});

routerProgramacion.get("/:lenguaje/:nivel", (req, res) => {
  const lenguaje = req.params.lenguaje;
  const nivel = req.params.nivel;
  const resultado = programacion.filter(
    (curso) => curso.lenguaje === lenguaje && curso.nivel === nivel
  );

  if (resultado.length === 0) {
    return res.status(404).send("NOT FOUND");
  }

  res.json(resultado);
});

//AGREGAR UN NUEVO CURSO
routerProgramacion.post("/", (req, res) => {
  let nuevoCurso = req.body;
  programacion.push(nuevoCurso);
  res.json(programacion);
});

// MODIFICAR TODO EL CURSO
routerProgramacion.put("/:id", (req, res) => {
  const nuevoCurso = req.body;
  const id = req.params.id;

  const indice = programacion.findIndex((curso) => curso.id == id);

  if (indice >= 0) {
    programacion[indice] = nuevoCurso;
  } else {
    return res.status(404).send("NOT FOUND");
  }

  res.json(programacion);
});

//ACTUALIZAR ALGUNA PROPIEDAD DEL CURSO
routerProgramacion.patch("/:id", (req, res) => {
  const infoActualizada = req.body;
  const id = req.params.id;

  const indice = programacion.findIndex((curso) => curso.id == id);

  if (indice >= 0) {
    Object.assign(programacion[indice], infoActualizada);
  } else {
    return res.status(404).send("NOT FOUND");
  }

  res.json(programacion);
});

//BORRAR UN CURSO
routerProgramacion.delete("/:id", (req, res) => {
  const id = req.params.id;
  const indice = programacion.findIndex((curso) => curso.id == id);

  if (indice >= 0) {
    programacion.splice(indice, 1);
  } else {
    return res.status(404).send("NOT FOUND");
  }

  res.json(programacion);
});

module.exports = routerProgramacion;
