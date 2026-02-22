// 1. IMPORTACIONES DE FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, onSnapshot, orderBy } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 2. CONFIGURACIÓN (Asegúrate de que estos sean tus datos reales de la consola)
const firebaseConfig = {
    apiKey: "AIzaSyAVB0-j6cQGsf_IQX1iren8xwqtv4YaG-g",
    authDomain: "mi-foro-portafolio.firebaseapp.com",
    projectId: "mi-foro-portafolio",
    storageBucket: "mi-foro-portafolio.firebasestorage.app",
    messagingSenderId: "988761302845",
    appId: "1:988761302845:web:5dc36156b5a98773584754"
};

// Inicializar
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- SECCIÓN: LÓGICA DEL FORO ---

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
            document.getElementById('texto-mensaje').value = ""; 
        } catch (e) {
            console.error("Error al enviar: ", e);
        }
    } else {
        alert("Completa tu nombre y el mensaje.");
    }
};

const q = query(collection(db, "mensajes"), orderBy("fecha", "asc"));
onSnapshot(q, (snapshot) => {
    const contenedorForo = document.getElementById('mensajes-foro');
    if (contenedorForo) {
        contenedorForo.innerHTML = ""; 
        snapshot.forEach((doc) => {
            const data = doc.data();
            const p = document.createElement('p');
            p.innerHTML = `<strong>${data.usuario}:</strong> ${data.mensaje}`;
            contenedorForo.appendChild(p);
        });
        contenedorForo.scrollTop = contenedorForo.scrollHeight;
    }
});

// --- SECCIÓN: TUS PROYECTOS (LISTA Y RENDERIZADO) ---

const misProyectos = [
    { 
        nombre: "Traductor Inteligente", 
        desc: "App de traducción que ya migré a GitHub.",
        link: "https://traductoria-arvwgti6ebkthv3jd95sjp.streamlit.app/#traductor-pro-multi-nodo" 
    },
    { 
        nombre: "Canchas Ya", 
        desc: "Gestión de reservas deportivas, ya en GitHub.",
        link: "https://canchaya-jona-2026.web.app" 
    },
    { 
        nombre: "Calculadora Pro", 
        desc: "Mi primera app en JS.",
        link: "https://traductoria-arvwgti6ebkthv3jd95sjp.streamlit.app/#traductor-pro-multi-nodo" 
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
