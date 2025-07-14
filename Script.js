// === MALLA CURRICULAR ===
const malla = {
  1: [
    { id: "idioma_basico", nombre: "Competencias idiomáticas básicas", creditos: 2, prerequisitos: [] },
    { id: "intro_invest", nombre: "Introducción a la investigación", creditos: 3, prerequisitos: [] },
    { id: "percepcion", nombre: "Percepción y atención", creditos: 3, prerequisitos: [] },
    { id: "memoria", nombre: "Memoria y aprendizaje", creditos: 3, prerequisitos: [] },
    { id: "historia_psico", nombre: "Historia y fundamentos de la psicología", creditos: 3, prerequisitos: [] },
    { id: "electiva1", nombre: "Electivas I", creditos: 1, prerequisitos: [] },
    { id: "ingles2", nombre: "Inglés II", creditos: 3, prerequisitos: [] },
  ],
  2: [
    { id: "transformacion_digital", nombre: "Transformación Digital y Ciudadanía", creditos: 3, prerequisitos: ["idioma_basico"] },
    { id: "pensamiento", nombre: "Pensamiento y lenguaje", creditos: 3, prerequisitos: [] },
    { id: "invest_cuant", nombre: "Investigación cuantitativa", creditos: 2, prerequisitos: ["intro_invest"] },
    { id: "funciones_ejecutivas", nombre: "Funciones ejecutivas y cognición social", creditos: 3, prerequisitos: ["percepcion"] },
    { id: "modelos_aprendizaje", nombre: "Modelos de aprendizaje", creditos: 2, prerequisitos: [] },
    { id: "core1", nombre: "Core I", creditos: 2, prerequisitos: [] },
    { id: "ingles3", nombre: "Inglés III", creditos: 3, prerequisitos: ["ingles2"] },
  ],
  3: [
    { id: "problemas_sociales", nombre: "Problemas sociales contemporáneos", creditos: 2, prerequisitos: [] },
    { id: "desarrollo", nombre: "Psicología del desarrollo", creditos: 3, prerequisitos: [] },
    { id: "micro1", nombre: "Micropráctica I", creditos: 3, prerequisitos: [] },
    { id: "metodos_cuant", nombre: "Métodos y análisis cuantitativos", creditos: 2, prerequisitos: ["invest_cuant"] },
    { id: "electiva2", nombre: "Electivas II", creditos: 3, prerequisitos: [] },
    { id: "core2", nombre: "Core II", creditos: 2, prerequisitos: ["core1"] },
    { id: "ingles4", nombre: "Inglés IV", creditos: 3, prerequisitos: ["ingles3"] },
  ],
  4: [
    { id: "etica", nombre: "Ética profesional", creditos: 2, prerequisitos: [] },
    { id: "invest_cual", nombre: "Investigación cualitativa", creditos: 2, prerequisitos: ["metodos_cuant"] },
    { id: "psicopatologia", nombre: "Psicopatología", creditos: 3, prerequisitos: ["funciones_ejecutivas"] },
    { id: "psicometria", nombre: "Medición y evaluación del comportamiento", creditos: 3, prerequisitos: [] },
    { id: "electiva3", nombre: "Electivas III", creditos: 3, prerequisitos: [] },
    { id: "core3", nombre: "Core III", creditos: 2, prerequisitos: ["core2"] },
    { id: "ingles5", nombre: "Inglés V", creditos: 3, prerequisitos: ["ingles4"] },
  ],
  5: [
    { id: "social", nombre: "Psicología social", creditos: 3, prerequisitos: [] },
    { id: "metodos_cual", nombre: "Métodos y análisis cualitativos", creditos: 2, prerequisitos: ["invest_cual"] },
    { id: "clinica", nombre: "Psicología clínica", creditos: 2, prerequisitos: [] },
    { id: "micro2", nombre: "Micropráctica II", creditos: 3, prerequisitos: ["micro1"] },
    { id: "electiva4", nombre: "Electivas IV", creditos: 3, prerequisitos: [] },
    { id: "core4", nombre: "Core IV", creditos: 2, prerequisitos: ["core3"] },
    { id: "ingles6", nombre: "Inglés VI", creditos: 3, prerequisitos: ["ingles5"] },
  ],
  6: [
    { id: "organizacional", nombre: "Psicología organizacional", creditos: 3, prerequisitos: [] },
    { id: "educativa", nombre: "Psicología educativa", creditos: 3, prerequisitos: [] },
    { id: "electiva5", nombre: "Electivas V", creditos: 3, prerequisitos: [] },
    { id: "micro3", nombre: "Micropráctica III", creditos: 3, prerequisitos: ["micro2"] },
    { id: "core5", nombre: "Core V", creditos: 3, prerequisitos: ["core4"] },
    { id: "ingles7", nombre: "Inglés VII", creditos: 3, prerequisitos: ["ingles6"] },
  ],
  7: [
    { id: "competencias_prof", nombre: "Competencias profesionales", creditos: 1, prerequisitos: [] },
    { id: "politica", nombre: "Psicología, política y ciudadanía", creditos: 2, prerequisitos: [] },
    { id: "campo1", nombre: "Campo profesional I", creditos: 3, prerequisitos: ["social", "organizacional", "educativa"] },
    { id: "campo2", nombre: "Campo profesional II", creditos: 3, prerequisitos: ["social", "organizacional", "educativa"] },
    { id: "practica_formativa", nombre: "Práctica formativa en clínica y salud", creditos: 4, prerequisitos: ["clinica"] },
    { id: "electiva6", nombre: "Electivas VI", creditos: 3, prerequisitos: [] },
    { id: "proyecto1", nombre: "Proyecto en psicología I", creditos: 2, prerequisitos: [] },
  ],
  8: [
    { id: "practica_final", nombre: "Prácticas en psicología", creditos: 16, prerequisitos: ["proyecto1", "practica_formativa"] },
  ],
};

let aprobadas = new Set();
let creditos = 0;
const totalCreditos = 142;

// === FUNCIONES ===

function crearBoton(materia) {
  const boton = document.createElement("button");
  boton.textContent = `${materia.nombre} (${materia.creditos}cr)`;
  boton.classList.add("materia");
  boton.id = materia.id;

  if (materia.prerequisitos.length === 0) {
    boton.classList.add("desbloqueada");
  }

  boton.addEventListener("click", () => {
    if (boton.classList.contains("desbloqueada") && !aprobadas.has(materia.id)) {
      boton.classList.remove("desbloqueada");
      boton.classList.add("aprobada");
      aprobadas.add(materia.id);
      creditos += materia.creditos;
      actualizarProgreso();
      desbloquearMaterias();
    }
  });

  return boton;
}

function desbloquearMaterias() {
  for (const semestre in malla) {
    for (const materia of malla[semestre]) {
      const boton = document.getElementById(materia.id);
      if (
        !aprobadas.has(materia.id) &&
        materia.prerequisitos.every(id => aprobadas.has(id))
      ) {
        boton.classList.add("desbloqueada");
        boton.disabled = false;
      }
    }
  }
}

function actualizarProgreso() {
  const spanCreditos = document.getElementById("creditos");
  const spanPorcentaje = document.getElementById("porcentaje");

  spanCreditos.textContent = creditos;
  spanPorcentaje.textContent = ((creditos / totalCreditos) * 100).toFixed(1);
}

function renderizarMalla() {
  const contenedor = document.getElementById("malla");

  for (const semestre in malla) {
    const columna = document.createElement("div");
    columna.classList.add("semestre");

    const titulo = document.createElement("h2");
    titulo.textContent = `Semestre ${semestre}`;
    columna.appendChild(titulo);

    for (const materia of malla[semestre]) {
      const boton = crearBoton(materia);
      columna.appendChild(boton);
    }

    contenedor.appendChild(columna);
  }
}

// === INICIO ===
renderizarMalla();
actualizarProgreso();
