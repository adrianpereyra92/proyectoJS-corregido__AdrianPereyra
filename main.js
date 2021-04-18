console.dir(document);
console.dir(document.head);
console.dir(document.body);

const arrayPhotos = [{ id: 1, categoria: 'Junín, Mendoza', etiquetas: 'estrellas cielo espaci noche', img: "img/estrellas.jpg" },
{ id: 2, categoria: 'Los Ángeles, California', etiquetas: 'paisajes playa mar nubes atardecer', img: 'img/atardecer.jpg' },
{ id: 3, categoria: 'Potrerillos, Mendoza', etiquetas: 'animales colibri flores aves', img: 'img/colibri.jpg' },
{ id: 4, categoria: 'Potrerillos, Mendoza', etiquetas: 'naturaleza flores margaritas', img: 'img/flores.jpg' },
{ id: 5, categoria: 'Uspallata, Mendoza', etiquetas: 'paisajes rio atardecer fernet', img: 'img/rio.jpg' },
{ id: 6, categoria: 'Ciudad de Mendoza', etiquetas: 'cielo luna llena noche', img: 'img/luna.jpg' }];

class Photos {
	constructor(id, categorias, etiquetas, img) {
		this.id = id;
		this.categorias = categorias;
		this.etiquetas = etiquetas;
		this.img = img;
	}
}

let container = document.createElement("div");
container.innerHTML = `
 						<div class="container-header">
 							<h1 id="titulo" class="animate__animated animate__bounceInDown">Galería de fotos</h1>
 							<h3 id="subtitulo" class="animate__animated animate__bounceInUp">By Adrian Pereyra</h3>
 						</div>
 						<div class="container-buscador">
						 	<h2 class="titulo-buscador">Busca imágenes en Pixabay</h2>
							<form id="formulario">
 								<input type="text" id="entrada" placeholder="Ingresa tu búsqueda"></input>
 								<input value="Buscar" type="submit" id="boton-busqueda"></input> 
							</form>
						</div>
						<div id="resultado"></div>
						<div id="paginacion"></div>
						<h2 class="titulo-misFotos">Mis fotos</h2>
						`;

document.body.appendChild(container);

for (const Photo of arrayPhotos) {
	let gallery = document.createElement("div");
	gallery.innerHTML = `	<div class="gallery">
								
								<img class="misFotos" src="${Photo.img}">
						  		<p class="ubicacion"> ${Photo.categoria}</p>
							</div>`;
	document.body.appendChild(gallery);

}



const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario ');

window.onload = () => {
	formulario.addEventListener('submit', validarFormulario);
}

function validarFormulario(evento) {
	evento.preventDefault();
	const entradaBusqueda = document.querySelector('#entrada').value;
	if (entradaBusqueda === '') {
		let timerInterval
		Swal.fire({
			title: 'Campo de búsqueda vacío!',
			html: 'Ingresa una palabra en el buscador para continuar',
			timer: 3000,
			timerProgressBar: true,
			didOpen: () => {
				Swal.showLoading()
				timerInterval = setInterval(() => {
					const content = Swal.getContent()
					if (content) {
						const b = content.querySelector('b')
						if (b) {
							b.textContent = Swal.getTimerLeft()
						}
					}
				}, 100)
			},
			willClose: () => {
				clearInterval(timerInterval)
			}
		}).then((result) => {
			/* Read more about handling dismissals below */
			if (result.dismiss === Swal.DismissReason.timer) {
				console.log('I was closed by the timer')
			}
		})
	}

	buscarImagenes(entradaBusqueda);
}

function buscarImagenes(entrada){
	const key = '18476505-1ba1b1db9abe82d7357acdd00';
	const url = `https://pixabay.com/api/?key=${key}&q=${entrada}`;
	fetch(url)
		.then(respuesta => respuesta.json())
		.then(resultado => {
			mostrarImagenes(resultado.hits);
		})

}

function mostrarImagenes(imagenes){
	console.log(imagenes);

	while(resultado.firstChild){
		resultado.removeChild(resultado.firstChild);
	}

	imagenes.forEach( imagen => {
		const {previewURL, likes, views, largeImageURL} = imagen;

		resultado.innerHTML += `<div class="container-pixabay">
									<img src="${previewURL}">
									<p> ${likes} Likes </p>
									<p> ${views} Views </p>
									<a href="${largeImageURL}" target="_blank">Ir a la imagen</a>
								</div>
		`; 
	})
}