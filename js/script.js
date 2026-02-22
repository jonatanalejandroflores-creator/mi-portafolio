// Simulamos una base de datos de tus apps
const misProyectos = [
    { nombre: "Calculadora Pro", desc: "Mi primera app en JS" },
    { nombre: "Foro Alpha", desc: "Beta de mi sistema de discusión" }
];

const contenedor = document.getElementById('lista-proyectos');

// Renderizar proyectos automáticamente
misProyectos.forEach(proyecto => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <h3>${proyecto.nombre}</h3>
        <p>${proyecto.desc}</p>
        <button onclick="alert('Lanzando ${proyecto.nombre}...')">Ver más</button>
    `;
    contenedor.appendChild(card);
});
