const URL = "https://dog.ceo/api/breeds/list/all";

const showList = (list) => {
    const container = document.querySelector('.container');
    for (const breed in list) {
        if (list.hasOwnProperty(breed)) {
            const breedName = breed;
            const subBreeds = list[breed];
            subBreeds.forEach(subBreed => {
                container.innerHTML += `
                    <div class="card horizontal">
                        <div class="card-stacked">
                            <div class="card-content">
                                <p>
                                    Raza: ${breedName} ${subBreed ? '(' + subBreed + ')' : ''}
                                </p>
                            </div>
                            <div class="card-action">
                                <a href="/details/?breed=${breedName}&subbreed=${subBreed}">Detalles</a>
                            </div>
                        </div>
                    </div>
                `;
            });
        }
    }
}

const getList = async () => {
    try {
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error('Error al obtener la lista de razas de perros');
        }
        const data = await response.json();
        const breedList = data.message;
        showList(breedList);
        M.toast({ html: `¡Se encontraron ${Object.keys(breedList).length} razas de perros!` });
    } catch (error) {
        console.error('Error:', error);
        M.toast({ html: 'Error al obtener la lista de razas de perros' });
    }
}

getList();
