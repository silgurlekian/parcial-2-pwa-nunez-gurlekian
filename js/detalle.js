const id = window.location.search.split('?imdbID=');
const url = 'https://gist.githubusercontent.com/saniyusuf/406b843afdfb9c6a86e25753fe2761f4/raw/523c324c7fcc36efab8224f9ebb7556c09b69a14/Film.JSON';
const mostrarDetalle = () => {
    console.log(id);
    const movie = JSON.parse(localStorage[id[1]]);
    console.log(movie)
    const contenedor = document.getElementById("contenedor")
    const div = document.createElement('div');
    contenedor.appendChild(div);
    
    const titulo = document.createElement('h2');
    titulo.innerText = movie.Title;
    div.appendChild(titulo);

    const lanzamiento = document.createElement('h3');
    lanzamiento.innerText = 'Lanzamiento' + ' : ' + movie.Released;
    div.appendChild(lanzamiento);

    const duracion = document.createElement('h3');
    duracion.innerText = 'Duración' + ' : ' + movie.Runtime; 
    div.appendChild(duracion);
   
    const genero = document.createElement('h3');
    genero.innerText = 'Género' + ' : ' + movie.Genre;
    div.appendChild(genero);

    const director = document.createElement('h3');
    director.innerText = 'Director' + ' : ' + movie.Director;
    div.appendChild(director);

    const actores = document.createElement('h3');
    actores.innerText = 'Actores' + ' : ' + movie.Actors;
    div.appendChild(actores);

    const resumen = document.createElement('h3');
    resumen.innerText = 'Resumen' + ' : ' + movie.Plot;
    div.appendChild(resumen);

    const rating = document.createElement('h3');
    rating.innerText = 'IMDB Rating' + ' : ' + movie.imdbRating;
    div.appendChild(rating);

    const awards = document.createElement('h3');
    awards.innerText = 'Premios' + ' : ' + movie.Awards;
    div.appendChild(awards);

    const img = document.createElement('img');
        img.src = movie.Images
        img.alt = movie.Title;
        div.appendChild(img);

    // movie.Images.forEach(image => {
    //     const img = document.createElement('img');
    //     img.src = image
    //     img.alt = movie.Title;
    //     div.appendChild(img);
    // });
   
    

 };



    mostrarDetalle() 
        
 