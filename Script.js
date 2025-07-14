// === MALLA CURRICULAR COMPLETA ===
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
  ],
  4: [
    { id: "etica", nombre: "Ética profesional", creditos: 2, prerrequisitos: [] },
    { id: "invest_cualitativa", nombre: "Investigación cualitativa", creditos: 2, prerrequisitos: ["metodos_cuant"] },
    { id: "psicopatologia", nombre: "Psicopatología", creditos: 3, prerrequisitos: ["funciones_ejecutivas"] },
    { id: "medicion_eval", nombre: "Medición y evaluación del comportamiento", creditos: 3, prerrequisitos: [] },
    { id: "electiva3", nombre: "Electivas III", creditos: 3, prerrequisitos: [] },
    { id: "core3", nombre: "Core III", creditos: 2, prerrequisitos: ["core2"] },
    { id: "ingles5", nombre: "Inglés V", creditos: 3, prerrequisitos: ["ingles4"] }
  ],
  5: [
    { id: "psicologia_social", nombre: "Psicología social", creditos: 3, prerrequisitos: [] },
    { id: "metodos_cualitativos", nombre: "Métodos y análisis cualitativos", creditos: 2, prerrequisitos: ["invest_cualitativa"] },
    { id: "clinica", nombre: "Psicología clínica", creditos: 2, prerrequisitos: ["psicopatologia"] },
    { id: "micro2", nombre: "Micropráctica II", creditos: 3, prerrequisitos: ["micro1"] },
    { id: "electiva4", nombre: "Electivas IV", creditos: 3, prerrequisitos: [] },
    { id: "core4", nombre: "Core IV", creditos: 2, prerrequisitos: ["core3"] },
    { id: "ingles6", nombre: "Inglés VI", creditos: 3, prerrequisitos: ["ingles5"] }
  ],  
    6: [
    { id: "organizacional", nombre: "Psicología organizacional", creditos: 3, prerrequisitos: [] },
    { id: "educativa", nombre: "Psicología educativa", creditos: 3, prerrequisitos: [] },
    { id: "electiva5", nombre: "Electivas V", creditos: 3, prerrequisitos: [] },
    { id: "micro3", nombre: "Micropráctica III", creditos: 3, prerrequisitos: ["micro2"] },
    { id: "core5", nombre: "Core V", creditos: 3, prerrequisitos: ["core4"] },
    { id: "ingles7", nombre: "Inglés VII", creditos: 3, prerrequisitos: ["ingles6"] }
  ],
  7: [
    { id: "competencias", nombre: "Competencias profesionales", creditos: 1, prerrequisitos: [] },
    { id: "politica", nombre: "Psicología, política y ciudadanía", creditos: 2, prerrequisitos: [] },
    { id: "campo1", nombre: "Campo profesional I", creditos: 3, prerrequisitos: ["psicologia_social"] },
    { id: "campo2", nombre: "Campo profesional II", creditos: 3, prerrequisitos: ["organizacional"] },
    { id: "clinica_salud", nombre: "Práctica formativa en clínica y salud", creditos: 4, prerrequisitos: ["clinica"] },
    { id: "electiva6", nombre: "Electivas VI", creditos: 3, prerrequisitos: [] },
    { id: "proyecto1", nombre: "Proyecto en psicología I", creditos: 2, prerrequisitos: [] }
  ],
  8: [
    { id: "practica", nombre: "Prácticas en psicología", creditos: 16, prerrequisitos: ["campo1", "campo2", "clinica_salud", "proyecto1"] }
  ]
};

const cursosAprobados = new Set(JSON.parse(localStorage.getItem("cursosAprobados") || "[]"));

function actualizarVista() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";
  let total = 0, completados = 0;

  for (let s = 1; s <= 8; s++) {
    const col = document.createElement("div");
    col.className = "columna";
    const h = document.createElement("h3");
    h.textContent = `Semestre ${s}`;
    col.appendChild(h);

    for (const curso of malla[s]) {
      const btn = document.createElement("button");
      btn.textContent = `${curso.nombre} (${curso.creditos}cr)`;
      total += curso.creditos;

      const tienePrereqs = curso.prerrequisitos.every(p => cursosAprobados.has(p));
      const aprobado = cursosAprobados.has(curso.id);

      btn.className = aprobado ? "aprobado" : tienePrereqs ? "desbloqueado" : "bloqueado";
      btn.disabled = !tienePrereqs && !aprobado;

      btn.onclick = () => {
        if (cursosAprobados.has(curso.id)) {
          cursosAprobados.delete(curso.id);
        } else {
          cursosAprobados.add(curso.id);
        }
        localStorage.setItem("cursosAprobados", JSON.stringify([...cursosAprobados]));
        actualizarVista();
      };

      if (aprobado) completados += curso.creditos;
      col.appendChild(btn);
    }

    contenedor.appendChild(col);
  }

  const progreso = document.getElementById("progreso");
  progreso.textContent = `Créditos completados: ${completados} / ${total} (${Math.round((completados / total) * 100)}%)`;
}

document.addEventListener("DOMContentLoaded", actualizarVista);
