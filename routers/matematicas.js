const express = require("express");

const { matematicas } = require("../datos/cursos").infoCursos;

const routerMatematicas = express.Router();

routerMatematicas.use(express.json());

routerMatematicas.get("/", (req, res) => {
  res.json(matematicas);
});

routerMatematicas.get("/:tema", (req, res) => {
  const tema = req.params.tema;
  const resultado = matematicas.filter((curso) => curso.tema === tema);

  if (resultado.length === 0) {
    return res.status(404).send("NOT FOUND");
  }
  res.json(resultado);
});

routerMatematicas.get("/:tema/:nivel", (req, res) => {
  const tema = req.params.tema;
  const nivel = req.params.nivel;
  const resultado = matematicas.filter(
    (curso) => curso.tema === tema && curso.nivel === nivel
  );

  if (resultado.length === 0) {
    return res.status(404).send("NOT FOUND");
  }

  res.json(resultado);
});

//AGREGAR UN NUEVO CURSO
routerMatematicas.post("/", (req, res) => {
  let nuevoCurso = req.body;
  matematicas.push(nuevoCurso);
  res.json(matematicas);
});

//ACTUALIZAR UN CURSO COMPLETO
routerMatematicas.put("/:id", (req, res) => {
  const actualizacionCurso = req.body;
  const id = req.params.id;
  const indice = matematicas.findIndex((curso) => curso.id == id);

  if (indice >= 0) {
    matematicas[indice] = actualizacionCurso;
  } else {
    return res.status(404).send("NOT FOUND");
  }

  res.json(matematicas);
});

//ACTUALIZAR ALGUNA PROPIEDAD
routerMatematicas.patch("/:id", (req, res) => {
  const infoActualizada = req.body;
  const id = req.params.id;

  const indice = matematicas.findIndex((curso) => curso.id == id);

  if (indice >= 0) {
    Object.assign(matematicas[indice], infoActualizada);
  } else {
    return res.status(404).send("NOT FOUND");
  }

  res.json(matematicas);
});

//BORRAR UN CURSO
routerMatematicas.delete("/:id", (req, res) => {
  const id = req.params.id;
  const indice = matematicas.findIndex((curso) => curso.id == id);

  if (indice >= 0) {
    matematicas.splice(indice, 1);
  } else {
    return res.status(404).send("NOT FOUND");
  }

  res.json(matematicas);
});

module.exports = routerMatematicas;
