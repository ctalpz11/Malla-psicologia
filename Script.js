const materias = [
  { id: "idioma1", nombre: "Competencias idiomáticas básicas (2cr)", semestre: 1, creditos: 2 },
  { id: "inv1", nombre: "Introducción a la investigación (3cr)", semestre: 1, creditos: 3 },
  { id: "pam", nombre: "Percepción y atención (3cr)", semestre: 1, creditos: 3 },
  { id: "memoria", nombre: "Memoria y aprendizaje (3cr)", semestre: 1, creditos: 3 },
  { id: "historia", nombre: "Historia y fundamentos (3cr)", semestre: 1, creditos: 3 },
  { id: "electiva1", nombre: "Electiva I (1cr)", semestre: 1, creditos: 1 },
  { id: "ingles2", nombre: "Inglés II (3cr)", semestre: 1, creditos: 3 },

  { id: "tdc", nombre: "Transformación Digital (3cr)", semestre: 2, creditos: 3, prerequisitos: ["idioma1"] },
  { id: "lenguaje", nombre: "Pensamiento y lenguaje (3cr)", semestre: 2, creditos: 3 },
  { id: "invcuant", nombre: "Investigación cuantitativa (2cr)", semestre: 2, creditos: 2, prerequisitos: ["inv1"] },
  { id: "funciones", nombre: "Funciones ejecutivas y cognición social (3cr)", semestre: 2, creditos: 3, prerequisitos: ["pam"] },
  { id: "modeloapr", nombre: "Modelos de aprendizaje (2cr)", semestre: 2, creditos: 2 },
  { id: "core1", nombre: "Core I (2cr)", semestre: 2, creditos: 2 },
  { id: "ingles3", nombre: "Inglés III (3cr)", semestre: 2, creditos: 3, prerequisitos: ["ingles2"] },

  { id: "problemas", nombre: "Problemas sociales contemporáneos (2cr)", semestre: 3, creditos: 2 },
  { id: "desarrollo", nombre: "Psicología del desarrollo (3cr)", semestre: 3, creditos: 3 },
  { id: "micro1", nombre: "Micropráctica I (3cr)", semestre: 3, creditos: 3 },
  { id: "metcuant", nombre: "Métodos cuantitativos (2cr)", semestre: 3, creditos: 2, prerequisitos: ["invcuant"] },
  { id: "electiva2", nombre: "Electiva II (3cr)", semestre: 3, creditos: 3 },
  { id: "core2", nombre: "Core II (2cr)", semestre: 3, creditos: 2 },
  { id: "ingles4", nombre: "Inglés IV (3cr)", semestre: 3, creditos: 3, prerequisitos: ["ingles3"] }
];

function crearMalla() {
  const malla = document.getElementById("malla");
  for (let i = 1; i <= 8; i++) {
    const columna = document.createElement("div");
    columna.className = "semestre";
    const titulo = document.createElement("h2");
    titulo.textContent = `Semestre ${i}`;
    columna.appendChild(titulo);

    materias
      .filter(m => m.semestre === i)
      .forEach(m => {
        const div = document.createElement("div");
        div.textContent = m.nombre;
        div.className = "materia";
        div.dataset.id = m.id;
        columna.appendChild(div);
      });

    malla.appendChild(columna);
  }
}

function actualizarEstado() {
  const aprobadas = JSON.parse(localStorage.getItem("materiasAprobadas") || "[]");
  document.querySelectorAll(".materia").forEach(btn => {
    const id = btn.dataset.id;
    const materia = materias.find(m => m.id === id);
    const requisitos = materia.prerequisitos || [];

    btn.classList.remove("aprobado", "bloqueado", "desbloqueado");

    if (aprobadas.includes(id)) {
      btn.classList.add("aprobado");
    } else if (requisitos.every(r => aprobadas.includes(r))) {
      btn.classList.add("desbloqueado");
    } else {
      btn.classList.add("bloqueado");
    }

    btn.onclick = () => {
      if (btn.classList.contains("bloqueado")) return;

      const idx = aprobadas.indexOf(id);
      if (idx >= 0) {
        aprobadas.splice(idx, 1);
      } else {
        aprobadas.push(id);
      }

      localStorage.setItem("materiasAprobadas", JSON.stringify(aprobadas));
      actualizarEstado();
      actualizarProgreso();
    };
  });
}

function actualizarProgreso() {
  const aprobadas = JSON.parse(localStorage.getItem("materiasAprobadas") || "[]");
  const total = materias.reduce((sum, m) => sum + m.creditos, 0);
  const hechos = materias
    .filter(m => aprobadas.includes(m.id))
    .reduce((sum, m) => sum + m.creditos, 0);
  const porcentaje = ((hechos / total) * 100).toFixed(1);

  document.getElementById("progreso").textContent = `Créditos completados: ${hechos} / ${total} (${porcentaje}%)`;
}

crearMalla();
actualizarEstado();
actualizarProgreso();
