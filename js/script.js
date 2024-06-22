const URL = "https://gist.githubusercontent.com/saniyusuf/406b843afdfb9c6a86e25753fe2761f4/raw/523c324c7fcc36efab8224f9ebb7556c09b69a14/Film.JSON";

const showList = (list) => {
    const container = document.getElementById('moviesContainer');
    container.innerHTML = '';
    list.forEach(movie => {
        localStorage[movie.imdbID] = JSON.stringify(movie);
        container.innerHTML += `
            <div class="col s12 m6 l4">
                <div class="card">
                    <div class="card-image">
                        <img src="${movie.Poster}" alt="Poster de ${movie.Title}">
                    </div>
                    <div class="card-content">
                        <span class="card-title">${movie.Title}</span>
                        <p>Año: ${movie.Year}</p>
                        <p>Género: ${movie.Genre}</p>
                        <p>Rating: ${movie.Rated}</p>
                    </div>
                    <div class="card-action">
                        <a href="detalle/?id=${movie.id}">Detalles</a>
                    </div>
                </div>
            </div>
        `;
    });
}

const getList = async () => {
    try {
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error('Error al obtener la lista de películas');
        }
        const data = await response.json();
        showList(data);
        M.toast({ html: `¡Se encontraron ${data.length} películas!` });
    } catch (error) {
        console.error('Error:', error);
        M.toast({ html: 'Error al obtener la lista de películas' });
    }
}

getList();

if (navigator?.serviceWorker) {
    navigator.serviceWorker.register('./js/service-worker.js').then(() => {
        M.toast({ html: `Modo offline activado` });
    }).catch((error) => {
        console.error('Error al registrar el Service Worker:', error);
    });
}


const loginButton = document.getElementById("loginButton");
loginButton.addEventListener('click', () => {
    signInWithEmailAndPassword(auth, "sergiod.medina@davinci.edu.ar", "email1234")
        .then((userCredential) => {
            const user = userCredential.user;
            M.toast({ html: `${user.email} logueado` })

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            M.toast({ html: `${errorMessage}` })
        });
})

window.addEventListener("beforeinstallprompt", (e) => {
    console.log("beforeinstallprompt", e)
    eventoDeInstalacion = e;
    //acá puedo también mostrar
});

const installButton = document.getElementById("installButton");
installButton.addEventListener("click", () => {
    console.log("eventoDeInstalacion", eventoDeInstalacion);
    if (eventoDeInstalacion && eventoDeInstalacion.prompt) {
        eventoDeInstalacion.prompt()
            .then((resultado) => {
                const opcionesElegida = resultado.outcome;
                console.log("opcionesElegida", opcionesElegida)
                if (opcionesElegida == "dismissed") {
                    console.log("Instalación cancelada");
                } else if (opcionesElegida == "accepted") {
                    console.log("Instalación completa")
                    ocultarBotonInstalacion();
                }
            })
            .catch((error) => console.log("error al instalar"))
    }
})

const ocultarBotonInstalacion = () => {
    installButton.style.display = "none";
}

setTimeout(() => {
    if (eventoDeInstalacion == null) {
        ocultarBotonInstalacion();
    }
}, 200);