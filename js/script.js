// 1. IMPORTACIONES DE FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, onSnapshot, orderBy } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 2. CONFIGURACIÓN (Asegúrate de poner tus datos reales aquí)
const firebaseConfig = {
    apiKey: "AIzaSyAVB0-j6cQGsf_IQX1iren8xwqtv4YaG-g",
    authDomain: "mi-foro-portafolio.firebaseapp.com",
    projectId: "mi-foro-portafolio",
    storageBucket: "mi-foro-portafolio.firebasestorage.app",
    messagingSenderId: "988761302845",
    appId: "1:988761302845:web:5dc36156b5a98773584754"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- SECCIÓN: LÓGICA DEL FORO ---

window.enviarMensaje = async () => {
    const inputNombre = document.getElementById('nombre-usuario');
    const inputMensaje = document.getElementById('texto-mensaje');

    const user = inputNombre.value;
    const text = inputMensaje.value;

    if (user.trim() && text.trim()) {
        try {
            await addDoc(collection(db, "mensajes"), {
                usuario: user,
                mensaje: text,
                fecha: new Date()
            });
            // FORMA INFALIBLE DE LIMPIAR:
            inputMensaje.value = ""; 
            inputMensaje.focus(); // Te deja el cursor listo para escribir otro
        } catch (error) {
            console.error("Error al enviar:", error);
        }
    } else {
        alert("Por favor rellena ambos campos");
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

// --- SECCIÓN: RENDERIZADO DE PROYECTOS ---

const misProyectos = [
    { 
        nombre: "Traductor Inteligente", 
        desc: "App de traducción con IA migrada a Streamlit.",
        link: "https://traductoria-arvwgti6ebkthv3jd95sjp.streamlit.app/", 
        imagen: "https://placehold.co/300x180/10b981/white?text=Traductor+IA" 
    },
    { 
        nombre: "Canchas Ya", 
        desc: "Gestión de reservas deportivas en Firebase.",
        link: "https://canchaya-jona-2026.web.app", 
        imagen: "https://placehold.co/300x180/3b82f6/white?text=Canchas+Ya"
    },
    { 
        nombre: "Calculadora Pro", 
        desc: "Mi primera aplicación lógica en JS.",
        link: "https://jonatanalejandroflores-creator.github.io/mi-portafolio/", 
        imagen: "https://placehold.co/300x180/f59e0b/white?text=Calculadora"
    },
    { 
        nombre: "Panel Admin", 
        desc: "Gestión interna de claves y reservas del sistema.",
        link: "https://canchaya-jona-2026.web.app/admin.html", 
        imagen: "https://placehold.co/300x180/1e40af/white?text=Panel+Admin"
    }
];

// Y actualizamos el renderizado para que dibuje la imagen:
const contenedorProyectos = document.getElementById('lista-proyectos');
if (contenedorProyectos) {
    contenedorProyectos.innerHTML = ""; 
    misProyectos.forEach(proyecto => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${proyecto.imagen}" alt="${proyecto.nombre}" class="card-img">
            <h3>${proyecto.nombre}</h3>
            <p>${proyecto.desc}</p>
            <button onclick="window.open('${proyecto.link}', '_blank')">Ver Proyecto</button>
        `;
        contenedorProyectos.appendChild(card);
    });
}
