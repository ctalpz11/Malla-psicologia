// === MALLA CURRICULAR ===
const malla = {
  1: [
    { id: "idioma_basico", nombre: "Competencias idiomáticas básicas", creditos: 2, prerrequisitos: [] },
    { id: "intro_invest", nombre: "Introducción a la investigación", creditos: 3, prerrequisitos: [] },
    { id: "percepcion", nombre: "Percepción y atención", creditos: 3, prerrequisitos: [] },
    { id: "memoria", nombre: "Memoria y aprendizaje", creditos: 3, prerrequisitos: [] },
    { id: "historia_psico", nombre: "Historia y fundamentos de la psicología", creditos: 3, prerrequisitos: [] },
    { id: "electiva1", nombre: "Electivas I", creditos: 1, prerrequisitos: [] },
    { id: "ingles2", nombre: "Inglés II", creditos: 3, prerrequisitos: [] }
  ],
  2: [
    { id: "transformacion_digital", nombre: "Transformación Digital y Ciudadanía", creditos: 3, prerrequisitos: ["idioma_basico"] },
    { id: "pensamiento", nombre: "Pensamiento y lenguaje", creditos: 3, prerrequisitos: [] },
    { id: "invest_cuant", nombre: "Investigación cuantitativa", creditos: 2, prerrequisitos: ["intro_invest"] },
    { id: "funciones_ejecutivas", nombre: "Funciones ejecutivas y cognición social", creditos: 3, prerrequisitos: ["percepcion"] },
    { id: "modelos_aprend", nombre: "Modelos de aprendizaje", creditos: 2, prerrequisitos: [] },
    { id: "core1", nombre: "Core I", creditos: 2, prerrequisitos: [] },
    { id: "ingles3", nombre: "Inglés III", creditos: 3, prerrequisitos: ["ingles2"] }
  ],
  3: [
    { id: "problemas_sociales", nombre: "Problemas sociales contemporáneos", creditos: 2, prerrequisitos: [] },
    { id: "desarrollo", nombre: "Psicología del desarrollo", creditos: 3, prerrequisitos: [] },
    { id: "micro1", nombre: "Micropráctica I", creditos: 3, prerrequisitos: [] },
    { id: "metodos_cuant", nombre: "Métodos y análisis cuantitativos", creditos: 2, prerrequisitos: ["invest_cuant"] },
    { id: "electiva2", nombre: "Electivas II", creditos: 3, prerrequisitos: [] },
    { id: "core2", nombre: "Core II", creditos: 2, prerrequisitos: ["core1"] },
    { id: "ingles4", nombre: "Inglés IV", creditos: 3, prerrequisitos: ["ingles3"] }
  ]
  // Agrega los demás semestres igual que estos 3 para completarlo.
};

// === CARGA Y RENDER ===
const contenedor = document.getElementById("contenedor");
const progreso = document.getElementById("progreso");
let aprobadas = JSON.parse(localStorage.getItem("aprobadas")) || [];

function crearBoton(materia) {
  const btn = document.createElement("button");
  btn.className = "materia";
  btn.textContent = `${materia.nombre} (${materia.creditos}cr)`;
  btn.dataset.id = materia.id;

  const cumplePrerequisitos = materia.prerrequisitos.every(pr => aprobadas.includes(pr));

  if (aprobadas.includes(materia.id)) {
    btn.classList.add("aprobada");
  } else if (cumplePrerequisitos) {
    btn.classList.add("desbloqueada");
  } else {
    btn.classList.add("bloqueada");
    btn.disabled = true;
  }

  btn.onclick = () => {
    if (aprobadas.includes(materia.id)) {
      aprobadas = aprobadas.filter(id => id !== materia.id);
    } else {
      aprobadas.push(materia.id);
    }
    localStorage.setItem("aprobadas", JSON.stringify(aprobadas));
    renderMalla();
  };

  return btn;
}

function renderMalla() {
  contenedor.innerHTML = "";
  let total = 0;
  let completados = 0;

  Object.entries(malla).forEach(([semestre, materias]) => {
    const columna = document.createElement("div");
    columna.className = "semestre";
    const titulo = document.createElement("h3");
    titulo.textContent = `Semestre ${semestre}`;
    columna.appendChild(titulo);

    materias.forEach(materia => {
      total += materia.creditos;
      if (aprobadas.includes(materia.id)) completados += materia.creditos;
      columna.appendChild(crearBoton(materia));
    });

    contenedor.appendChild(columna);
  });

  const porcentaje = ((completados / total) * 100).toFixed(1);
  progreso.textContent = `Créditos completados: ${completados} / ${total} (${porcentaje}%)`;
}

renderMalla();
