const URL =
  "https://gist.githubusercontent.com/saniyusuf/406b843afdfb9c6a86e25753fe2761f4/raw/523c324c7fcc36efab8224f9ebb7556c09b69a14/Film.JSON";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDItJ1xpdhm3ePZhV_ijTNmnEGHN59ljV8",
  authDomain: "tidal-beacon-368713.firebaseapp.com",
  projectId: "tidal-beacon-368713",
  storageBucket: "tidal-beacon-368713.appspot.com",
  messagingSenderId: "350629192973",
  appId: "1:350629192973:web:711514de524e7ae132fc44",
  measurementId: "G-4G5RY180TN",
};

let eventoDeInstalacion = null;

// Inicialización de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Función para mostrar la lista de películas en la interfaz
const showList = (list) => {
  const container = document.getElementById("moviesContainer");
  container.innerHTML = "";
  list.forEach((movie) => {
    localStorage[movie.imdbID] = JSON.stringify(movie);
    container.innerHTML += `
            <div class="col s12 m6 l4">
                <div class="card">
                    <div class="card-image">
                        <img src="${movie.Images}" alt="Images de ${movie.Title}">
                    </div>
                    <div class="card-content">
                        <span class="card-title">${movie.Title}</span>
                        <p>Año: ${movie.Year}</p>
                        <p>Género: ${movie.Genre}</p>
                        <p>Rating: ${movie.Rated}</p>
                    </div>
                    <div class="card-action">
                    <a href="detalle.html?imdbID=${movie.imdbID}">Detalles</a>
                </div>
                </div>
            </div>
        `;
  });
};

// Función para obtener la lista de películas (utiliza cacheo dinámico)
const getList = async () => {
  try {
    const cache = await caches.open("movies-cache");
    const cachedResponse = await cache.match(URL);

    if (cachedResponse) {
      const data = await cachedResponse.json();
      showList(data);
      console.log("Datos obtenidos del caché:", data);
      M.toast({ html: `¡Datos obtenidos del caché!` });
    } else {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error("Error al obtener la lista de películas");
      }

      const responseToCache = response.clone();

      const data = await response.json();
      showList(data);
      console.log("Datos obtenidos del servidor:", data);
      M.toast({ html: `¡Se encontraron ${data.length} películas!` });

      await cache.put(URL, responseToCache);
      console.log("Respuesta almacenada en caché");
    }
  } catch (error) {
    console.error("Error:", error);
    M.toast({ html: "Error al obtener la lista de películas" });
  }
};

getList();

// Registrar el Service Worker para habilitar funcionalidades offline
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then((registration) => {
        console.log("Service Worker registrado con éxito:", registration);
      })
      .catch((error) => {
        console.error("Error al registrar el Service Worker:", error);
      });
  });
}

// Evento de click para el botón de login
const loginButton = document.getElementById("loginButton");
loginButton.addEventListener("click", () => {
  signInWithEmailAndPassword(
    auth,
    "silvana.gurlekian@davinci.edu.ar",
    "pwa2024"
  )
    .then((userCredential) => {
      const user = userCredential.user;
      M.toast({ html: `${user.email} logueado` });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      M.toast({ html: `${errorMessage}` });
    });
});

// Evento que captura la instalación de la aplicación como PWA
window.addEventListener("beforeinstallprompt", (e) => {
  console.log("beforeinstallprompt", e);
  eventoDeInstalacion = e;
  //acá puedo también mostrar
});

// Evento de click para el botón de instalación
const installButton = document.getElementById("installButton");
installButton.addEventListener("click", () => {
  console.log("eventoDeInstalacion", eventoDeInstalacion);
  if (eventoDeInstalacion && eventoDeInstalacion.prompt) {
    eventoDeInstalacion
      .prompt()
      .then((resultado) => {
        const opcionesElegida = resultado.outcome;
        console.log("opcionesElegida", opcionesElegida);
        if (opcionesElegida == "dismissed") {
          console.log("Instalación cancelada");
        } else if (opcionesElegida == "accepted") {
          console.log("Instalación completa");
          ocultarBotonInstalacion();
        }
      })
      .catch((error) => console.log("error al instalar"));
  }
});

// Función para ocultar el botón de instalación después de la instalación
const ocultarBotonInstalacion = () => {
  installButton.style.display = "none";
};

// Verificar si el evento de instalación es nulo después de un tiempo y ocultar el botón
setTimeout(() => {
  if (eventoDeInstalacion == null) {
    ocultarBotonInstalacion();
  }
}, 200);
