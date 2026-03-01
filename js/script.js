// 1. IMPORTACIONES DE FIREBASE
import { db } from './firebase-config.js'; 
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// --- CONFIGURACIÓN DE SERVICIOS (CATÁLOGO) ---
const herramientasComunitarias = [
    {
        nombre: "Traductor Global IA",
        desc: "Servicio de traducción automática optimizado para la eliminación de barreras idiomáticas en textos complejos.",
        link: "https://traductoria-arvwgti6ebkthv3jd95sjp.streamlit.app/",
        imagen: "https://placehold.co/300x180/f8fafc/64748b?text=Comunicacion+Global"
    },
    {
        nombre: "Reserva de Canchas",
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

// --- RENDERIZADO DE LA PLATAFORMA ---
const contenedorHerramientas = document.getElementById("lista-proyectos");

function cargarHerramientas() {
    if (!contenedorHerramientas) return;
    contenedorHerramientas.innerHTML = "";
    
    herramientasComunitarias.forEach(servicio => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("card");
        tarjeta.innerHTML = `
            <img src="${servicio.imagen}" alt="${servicio.nombre}" style="width:100%; border-radius:8px; margin-bottom:15px;">
            <h3>${servicio.nombre}</h3>
            <p>${servicio.desc}</p>
            <button onclick="window.open('${servicio.link}', '_blank')">ACCEDER AL SERVICIO</button>
        `;
        contenedorHerramientas.appendChild(tarjeta);
    });
}

// --- LÓGICA DEL FORO (FIREBASE) ---
const colRef = collection(db, 'mensajes');

// Escuchar mensajes en tiempo real
const q = query(colRef, orderBy('fecha', 'asc'));
onSnapshot(q, (snapshot) => {
    const cajaMensajes = document.getElementById('mensajes-foro');
    if (!cajaMensajes) return;
    
    cajaMensajes.innerHTML = ''; 
    snapshot.docs.forEach(doc => {
        const data = doc.data();
        const fecha = data.fecha ? data.fecha.toDate() : new Date();
        const horaStr = fecha.getHours() + ":" + fecha.getMinutes().toString().padStart(2, '0');

        const p = document.createElement('p');
        p.style.borderBottom = "1px solid rgba(180, 0, 255, 0.2)";
        p.style.padding = "5px";
        p.style.margin = "8px 0";
        
        p.innerHTML = `
            <span style="color: var(--neon-orange)">[${horaStr}]</span> 
            <span style="color: var(--neon-cyan)">${data.nombre.toUpperCase()}:</span> 
            <span style="color: #fff">${data.mensaje}</span>
        `;
        cajaMensajes.appendChild(p);
    });
    cajaMensajes.scrollTop = cajaMensajes.scrollHeight;
});

// Función global para enviar
window.enviarMensaje = async function() {
    const usuarioInput = document.getElementById('nombre-usuario');
    const mensajeInput = document.getElementById('texto-mensaje');

    const nombre = usuarioInput.value.trim() || "ANÓNIMO";
    const mensaje = mensajeInput.value.trim();

    if (mensaje === "") return alert("Por favor, escriba un mensaje.");

    try {
        await addDoc(colRef, {
            nombre: nombre,
            mensaje: mensaje,
            fecha: serverTimestamp()
        });
        mensajeInput.value = ""; 
    } catch (e) {
        console.error("Error al enviar:", e);
    }
};

// Inicialización
document.addEventListener("DOMContentLoaded", cargarHerramientas);
