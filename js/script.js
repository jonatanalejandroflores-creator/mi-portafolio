import { db } from './firebase-config.js'; 
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const colRef = collection(db, 'mensajes');

// --- CATÁLOGO DE HERRAMIENTAS ---
const herramientas = [
    { nombre: "Traductor Global IA", desc: "Servicio de traducción automática.", link: "https://traductoria-arvwgti6ebkthv3jd95sjp.streamlit.app/" },
    { nombre: "Reserva de Canchas", desc: "Sistema de turnos deportivos.", link: "https://canchaya-jona-2026.web.app" }
];

// --- RENDERIZADO ---
document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("lista-proyectos");
    if (contenedor) {
        contenedor.innerHTML = herramientas.map(h => `
            <div class="card">
                <h3>${h.nombre}</h3>
                <p>${h.desc}</p>
                <button onclick="window.open('${h.link}', '_blank')">ACCEDER</button>
            </div>
        `).join('');
    }
});

// --- LÓGICA DEL FORO ---
const q = query(colRef, orderBy('fecha', 'asc'));
onSnapshot(q, (snapshot) => {
    const caja = document.getElementById('mensajes-foro');
    if (!caja) return;
    caja.innerHTML = '';
    snapshot.docs.forEach(doc => {
        const data = doc.data();
        const p = document.createElement('p');
        p.style.margin = "5px 0";
        p.innerHTML = `<span style="color:#00ffff">${data.nombre}:</span> ${data.mensaje}`;
        caja.appendChild(p);
    });
    caja.scrollTop = caja.scrollHeight;
});

window.enviarMensaje = async function() {
    const userInp = document.getElementById('nombre-usuario');
    const msgInp = document.getElementById('texto-mensaje');
    if (!msgInp.value.trim()) return;

    try {
        await addDoc(colRef, {
            nombre: userInp.value.trim() || "Anónimo",
            mensaje: msgInp.value.trim(),
            fecha: serverTimestamp()
        });
        msgInp.value = "";
    } catch (e) {
        console.error("Error:", e);
    }
};
