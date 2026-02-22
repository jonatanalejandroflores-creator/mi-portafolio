// 1. IMPORTACIONES DE FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, onSnapshot, orderBy } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 2. CONFIGURACIÓN (REEMPLAZA ESTOS DATOS CON LOS DE TU CONSOLA DE FIREBASE)
const firebaseConfig = {
  apiKey: "AIzaSyAVB0-j6cQGsf_IQX1iren8xwqtv4YaG-g",
  authDomain: "mi-foro-portafolio.firebaseapp.com",
  projectId: "mi-foro-portafolio",
  storageBucket: "mi-foro-portafolio.firebasestorage.app",
  messagingSenderId: "988761302845",
  appId: "1:988761302845:web:5dc36156b5a98773584754"
};

// Inicializar Firebase y la Base de Datos
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- SECCIÓN: LÓGICA DEL FORO ---

// Función para enviar mensajes (la hacemos global para que el botón HTML la encuentre)
window.enviarMensaje = async () => {
    const user = document.getElementById('nombre-usuario').value;
    const text = document.getElementById('texto-mensaje').value;

    if (user && text) {
        try {
            await addDoc(collection(db, "mensajes"), {
                usuario: user,
                mensaje: text,
                fecha: new Date()
            });
            document.getElementById('texto-mensaje').value = ""; // Limpiar input de mensaje
        } catch (error) {
            console.error("Error al enviar:", error);
        }
    } else {
        alert("Por favor rellena ambos campos");
    }
};

// Escuchar mensajes en tiempo real
const q = query(collection(db, "mensajes"), orderBy("fecha", "asc"));
onSnapshot(q, (snapshot) => {
    const contenedorForo = document.getElementById('mensajes-foro');
    if (contenedorForo) {
        contenedorForo.innerHTML = ""; // Limpiamos antes de actualizar
        snapshot.forEach((doc) => {
            const data = doc.data();
            const p = document.createElement('p');
            p.innerHTML = `<strong>${data.usuario}:</strong> ${data.mensaje}`;
            contenedorForo.appendChild(p);
        });
        // Scroll automático al final
        contenedorForo.scrollTop = contenedorForo.scrollHeight;
    }
});

// --- SECCIÓN: RENDERIZADO DE PROYECTOS ---

// ... (código de Firebase arriba)

const misProyectos = [
    { 
        nombre: "Traductor Inteligente", 
        desc: "App de traducción que ya migré a GitHub.",
        link: "https://traductoria-arvwgti6ebkthv3jd95sjp.streamlit.app/#traductor-pro-multi-modo" 
    },
    { 
        nombre: "Canchas Ya", 
        desc: "Gestión de reservas deportivas, ya en GitHub.",
        link: "https://canchaya-jona-2026.web.app", "https://canchaya-jona-2026.web.app/admin.html" 
    },
    { 
        nombre: "Calculadora Pro", 
        desc: "Mi primera app en JS.",
        link: "https://traductoria-arvwgti6ebkthv3jd95sjp.streamlit.app/#traductor-pro-multi-modo"
    }
];

const contenedorProyectos = document.getElementById('lista-proyectos');

if (contenedorProyectos) {
    misProyectos.forEach(proyecto => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${proyecto.nombre}</h3>
            <p>${proyecto.desc}</p>
            <button onclick="window.open('${proyecto.link}', '_blank')">Ver Proyecto</button>
        `;
        contenedorProyectos.appendChild(card);
    });
}
