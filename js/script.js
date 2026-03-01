/* ============================================================
   CONFIGURACIÓN DE SERVICIOS (CATÁLOGO DE HERRAMIENTAS)
   Enfoque: Utilidad comunitaria y terminología técnica neutral.
   ============================================================ */

const herramientasComunitarias = [
    { 
        nombre: "Traductor Global IA", 
        desc: "Servicio de traducción automática optimizado para la eliminación de barreras idiomáticas en textos complejos.",
        link: "https://traductoria-arvwgti6ebkthv3jd95sjp.streamlit.app/", 
        imagen: "https://placehold.co/300x180/f8fafc/64748b?text=Comunicacion+Global" 
    },
    { 
        nombre: "Reservas de Jugadores", 
        desc: "Sistema centralizado para la verificación de disponibilidad y organización de turnos en espacios deportivos.",
        link: "https://canchaya-jona-2026.web.app", 
        imagen: "https://placehold.co/300x180/f8fafc/64748b?text=Gestion+de+Espacios"
    },
    { 
        nombre: "Panel Admin", 
        desc: "Módulo administrativo para la supervisión de reservas, dueños de complejos deportivos.",
        link: "https://canchaya-jona-2026.web.app/admin.html", 
        imagen: "https://placehold.co/300x180/f8fafc/64748b?text=Reservas+y+Control"
    },
    { 
        nombre: "Calculadora de Lógica", 
        desc: "Herramienta de procesamiento matemático diseñada para operaciones rápidas y verificación de algoritmos base.",
        link: "https://traductoria-arvwgti6ebkthv3jd95sjp.streamlit.app/", 
        imagen: "https://placehold.co/300x180/f8fafc/64748b?text=Procesamiento+Matematico"
    }
];

/* ============================================================
   RENDERIZADO DE LA PLATAFORMA
   ============================================================ */

const contenedorHerramientas = document.getElementById("lista-proyectos");

function cargarHerramientas() {
    // Limpiamos el contenedor para asegurar carga limpia
    contenedorHerramientas.innerHTML = "";

    herramientasComunitarias.forEach(servicio => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("card");

        tarjeta.innerHTML = `
            <img src="${servicio.imagen}" alt="${servicio.nombre}" style="width:100%; border-radius:8px; margin-bottom:15px;">
            <h3>${servicio.nombre}</h3>
            <p>${servicio.desc}</p>
            <button onclick="window.open('${servicio.link}', '_blank')">Acceder al servicio</button>
        `;

        contenedorHerramientas.appendChild(tarjeta);
    });
}

/* ============================================================
   SISTEMA DE COLABORACIÓN (FORO)
   Nota: Aquí puedes conectar tu lógica de Firebase actual.
   ============================================================ */

function enviarMensaje() {
    const usuarioInput = document.getElementById('nombre-usuario');
    const mensajeInput = document.getElementById('texto-mensaje');
    const cajaMensajes = document.getElementById('mensajes-foro'); // <--- ESTE ES EL CLAVE

    // Si la caja no existe, avisar por consola
    if (!cajaMensajes) {
        console.error("ERROR: No se encontró la caja con id 'mensajes-foro'");
        return;
    }

    const nombre = usuarioInput.value.trim() || "ANÓNIMO";
    const mensaje = mensajeInput.value.trim();

    if (mensaje === "") {
        alert("Por favor, escriba un mensaje.");
        return;
    }

    const ahora = new Date();
    const horaStr = ahora.getHours() + ":" + ahora.getMinutes().toString().padStart(2, '0');

    // Creamos el párrafo del mensaje
    const nuevoElemento = document.createElement('p');
    nuevoElemento.style.color = "#fff";
    nuevoElemento.style.margin = "8px 0";
    nuevoElemento.style.fontSize = "0.9rem";
    nuevoElemento.style.borderBottom = "1px solid rgba(180, 0, 255, 0.3)";
    
    nuevoElemento.innerHTML = `
        <span style="color: var(--neon-orange)">[${horaStr}]</span> 
        <span style="color: var(--neon-cyan)">${nombre.toUpperCase()}:</span> 
        ${mensaje}
    `;

    // Lo metemos en la caja
    cajaMensajes.appendChild(nuevoElemento);
    
    // Scroll automático al último mensaje
    cajaMensajes.scrollTop = cajaMensajes.scrollHeight;

    // Limpiamos los campos
    usuarioInput.value = "";
    mensajeInput.value = "";
}
