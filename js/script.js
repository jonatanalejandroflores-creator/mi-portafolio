// 1. IMPORTACIONES
import { db } from './firebase-config.js'; 
import { 
    collection, 
    addDoc, 
    query, 
    orderBy, 
    onSnapshot, 
    serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const colRef = collection(db, 'mensajes');

// --- CATÁLOGO DE HERRAMIENTAS ---
const herramientasComunitarias = [
    {
        nombre: "Traductor Global IA",
        desc: "Servicio de traducción automática optimizado para la eliminación de barreras idiomáticas en textos complejos.",
        link: "https://traductoria-arvwgti6ebkthv3jd95sjp.streamlit.app/",
        imagen: "https://placehold.co/300x180/000/00ffff?text=Traductor+IA"
    },
    {
        nombre: "Reserva de Canchas",
        desc: "Sistema centralizado para la verificación de disponibilidad y organización de turnos en espacios deportivos.",
        link: "https://canchaya-jona-2026.web.app",
        imagen: "https://placehold.co/300x180/000/00ffff?text=Reservas"
    },
    {
        nombre: "Panel Admin",
        desc: "Módulo administrativo para la supervisión de reservas y gestión de complejos deportivos.",
        link: "https://canchaya-jona-2026.web.app/admin.html",
        imagen: "https://placehold.co/300x180/000/00ffff?text=Admin"
    },
    {
        nombre: "Calculadora de Lógica",
        desc: "Herramienta de procesamiento matemático diseñada para operaciones rápidas y verificación de algoritmos.",
        link: "https://traductoria-arvwgti6ebkthv3jd95sjp.streamlit.app/",
        imagen: "https://placehold.co/300x180/000/00ffff?text=Logica"
    }
];

// --- RENDERIZADO ---
function cargarHerramientas() {
    const contenedor = document.getElementById("grid-proyectos"); // Verifica este ID en tu HTML
    if (!contenedor) return;
    contenedor.innerHTML = "";
    herramientasComunitarias.forEach(h => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <div class="card-image"><img src="${h.imagen}" style="width:100%"></div>
            <div class="card-body">
                <h3>${h.nombre}</h3>
                <p>${h.desc}</p>
                <button onclick="window.open('${h.link}', '_blank')">ACCEDER AL SERVICIO</button>
            </div>
        `;
        contenedor.appendChild(card);
    });
}

// --- LÓGICA DEL FORO (FIREBASE REAL) ---
const colRef = collection(db, 'mensajes');

// Escuchar cambios en la base de datos
const q = query(colRef, orderBy('fecha', 'asc'));
onSnapshot(q, (snapshot) => {
    const caja = document.getElementById('mensajes-foro');
    if (!caja) return;
    caja.innerHTML = '';
    snapshot.docs.forEach(doc => {
        const data = doc.data();
        const fecha = data.fecha ? data.fecha.toDate() : new Date();
        const hora = fecha.getHours() + ":" + fecha.getMinutes().toString().padStart(2, '0');
        
        const p = document.createElement('p');
        p.style.borderBottom = "1px solid rgba(180, 0, 255, 0.2)";
        p.style.margin = "5px 0";
        p.innerHTML = `<span style="color:var(--neon-orange)">[${hora}]</span> <span style="color:var(--neon-cyan)">${data.nombre}:</span> ${data.mensaje}`;
        caja.appendChild(p);
    });
    caja.scrollTop = caja.scrollHeight;
});

// FUNCIÓN PARA ENVIAR (Global para que el HTML la vea)
window.enviarMensaje = async function() {
    const userInp = document.getElementById('nombre-usuario');
    const msgInp = document.getElementById('texto-mensaje');
    
    if (!msgInp.value.trim()) return alert("Escribe un mensaje");

    try {
        await addDoc(colRef, {
            nombre: userInp.value.trim() || "Anónimo",
            mensaje: msgInp.value.trim(),
            fecha: serverTimestamp()
        });
        msgInp.value = ""; // Solo limpiamos el mensaje
    } catch (err) {
        console.error("Error Firebase:", err);
        alert("Error de conexión con la terminal.");
    }
};

document.addEventListener("DOMContentLoaded", cargarHerramientas);
