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
        p.style.fontSize = "0.85rem";
        p.style.padding = "2px 5px";
        p.style.borderBottom = "1px solid rgba(0, 255, 255, 0.1)";
        
        // AGREGÁ "const" AL PRINCIPIO DE ESTAS DOS LÍNEAS:
        const fecha = data.fecha ? data.fecha.toDate() : new Date();
        const hora = fecha.getHours().toString().padStart(2, '0') + ":" + fecha.getMinutes().toString().padStart(2, '0');

        p.innerHTML = `
            <span style="color: #555;">[${hora}]</span> 
            <span style="color: var(--neon-orange); font-weight: bold;">${data.nombre.toUpperCase()}:</span> 
            <span style="color: #eee;">${data.mensaje}</span>
        `;
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
