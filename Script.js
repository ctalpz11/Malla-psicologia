const materias = [
  {
    nombre: "Competencias idiomáticas básicas (2cr)",
    semestre: 1,
    creditos: 2,
    id: "idioma1"
  },
  {
    nombre: "Transformación Digital y Ciudadanía (3cr)",
    semestre: 2,
    creditos: 3,
    prerequisitos: ["idioma1"]
  },
  // ... añade aquí todas las materias siguiendo este patrón ...
];

const malla = document.getElementById("malla");
const progreso = document.getElementById("progreso");

function crearMalla() {
  for (let i = 1; i <= 8; i++) {
    const columna = document.createElement("div");
    columna.classList.add("semestre");
    columna.innerHTML = `<h2>Semestre ${i}</h2>`;

    materias
      .filter(m => m.semestre === i)
      .forEach(m => {
        const boton = document.createElement("div");
        boton.textContent = m.nombre;
        boton.classList.add("materia");
        boton.dataset.id = m.id;
        columna.appendChild(boton);
      });

    malla.appendChild(columna);
  }
}

function actualizarEstado() {
  const botones = document.querySelectorAll(".materia");
  const aprobadas = JSON.parse(localStorage.getItem("materiasAprobadas")) || [];

  botones.forEach(boton => {
    const id = boton.dataset.id;
    const materia = materias.find(m => m.id === id);
    const requisitos = materia.prerequisitos || [];

    boton.classList.remove("aprobado", "bloqueado", "desbloqueado");

    if (aprobadas.includes(id)) {
      boton.classList.add("aprobado");
    } else if (requisitos.every(r => aprobadas.includes(r))) {
      boton.classList.add("desbloqueado");
    } else {
      boton.classList.add("bloqueado");
    }

    boton.onclick = () => {
      if (boton.classList.contains("bloqueado")) return;

      if (boton.classList.contains("aprobado")) {
        aprobadas.splice(aprobadas.indexOf(id), 1);
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
  const aprobadas = JSON.parse(localStorage.getItem("materiasAprobadas")) || [];
  const total = materias.reduce((acc, m) => acc + m.creditos, 0);
  const hecho = materias
    .filter(m => aprobadas.includes(m.id))
    .reduce((acc, m) => acc + m.creditos, 0);
  const porcentaje = ((hecho / total) * 100).toFixed(1);

  progreso.textContent = `Créditos completados: ${hecho} / ${total} (${porcentaje}%)`;
}

crearMalla();
actualizarEstado();
actualizarProgreso();
