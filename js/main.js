/*
Nota: esta app es online, es decir contiene una base de datos en Firebase, 
si usted modifica una tarea, agrega otra o elimina, cualquier persona que entre a la app 
vera todos los cambios reflejados . Saludos
 */

//Capturamos la ID del bloque que contiene la lista.
const listTask = document.getElementById('IDlist');
//Capturamos el ID del formulario.
const form = document.getElementById('IDform');
//Capturamos la ID del boton para que cuando se escriba la nueva tarea se guarde.
const UPDATE = document.getElementById('IDnew');
//Variable donde se va almacenar el ID de firebase de cada tarea.
let updateId = null;
//Variable que va almacenar el nuevo titulo de la tarea actualizada.
let newTitle = ''; //NOTA: titulo es un archivo en firebase que almacena las tareas escritas.


//Creo una funcion que llama a 'doc' que pertenece a firebase.
const renderList = (doc) => {

	/*---------------------------------------------------------------------------------------------------*/
	//NOTA A FUTURO: Dentro de este bloque de codigo se crean etiquetas del html

	//creo el 1er elemento que compone el bloque de la lista de tareas.
	let li = document.createElement('li');
	li.setAttribute('data-id', doc.id);

	//creo el 2do elemento que compone el bloque de la lista de tareas.
	let divPadre = document.createElement('div');
	divPadre.className = 'container-list activado';
	divPadre.setAttribute('id', 'colorFecht');

	//creo el 3er elemento que compone el bloque de la lista de tareas.
	let title = document.createElement('span');
	title.textContent = doc.data().Titulo;
	title.className = 'span';

	//creo el 4to elemento que compone el bloque de la lista de tareas.
	let divHijoP = document.createElement('div');
	divHijoP.className = 'list-input';

	//creo el 5to elemento que compone el bloque de la lista de tareas.
	let tooltips = document.createElement('span');
	tooltips.className = 'tooltips';
	tooltips.textContent = 'Listo';
	let inputs = document.createElement('input');
	inputs.setAttribute('type', 'checkbox');
	//inputs.setAttribute('id', 'fecht');

	//creo el 6to elemento que compone el bloque de la lista de tareas.
	let divHijoS = document.createElement('div');
	divHijoS.className = 'list-icon';

	//creo el 7to elemento que compone el bloque de la lista de tareas.
	let link = document.createElement('a');
	link.href = '#'
	link.setAttribute('id', 'open');
	let iconEdit = document.createElement('i');
	iconEdit.className = 'fas fa-pen';
	let iconRemove = document.createElement('i');
	iconRemove.className = 'fas fa-trash-alt';
	/*---------------------------------------------------------------------------------------------------*/

	/*---------------------------------------------------------------------------------------------------*/
	//Orden de padre e hijo que se van a crear dentro de la etiqueta ul.
	//Nota: si se altera el orden, tambien lo haran en el HTML.
	link.appendChild(iconEdit);

	divHijoS.appendChild(link);
	divHijoS.appendChild(iconRemove);
	divHijoP.appendChild(tooltips);
	divHijoP.appendChild(inputs);

	divPadre.appendChild(title);
	divPadre.appendChild(divHijoP);
	divPadre.appendChild(divHijoS);
	//finalmente ponenmos todo dentro de ul
	li.appendChild(divPadre);
	listTask.append(li);
	/*---------------------------------------------------------------------------------------------------*/

	/*---------------------------------------------------------------------------------------------------*/
	//Llamo al evento del icon borrar cuando se de click.
	iconRemove.addEventListener('click', e=> {
		//Creo una variable y le guardo el ID mediante el evento 'e'.
		//Me va guardar el ID de la tarea en la cual se hizo click.
		let removeID = e.target.parentElement.parentElement.parentElement.getAttribute('data-id');
		//Le paso la siguiente logica donde le digo a firebase que me remueva la tarea que tenga
		//la ID que guardamos en la variable 'removeID'.
		db.collection('Tareas').doc(removeID).delete();
	});
	/*---------------------------------------------------------------------------------------------------*/

	/*---------------------------------------------------------------------------------------------------*/
	inputs.addEventListener('click', e=> {
		//Esto funciona asi:
		//el divPadre es un variable que me crea una etiqueta, el cual contiene 2 clases
		//una de ellas se llama 'activado' y en css no posee ningun estilo, mas bien 
		//la usamos como 'un interruptor'. Si la clase esta activada, me vas a agregar
		//estilos cuando se le de click al checkbox y a su vez me apagas el interruptor.
		//Cuando se vuelve a dar click en el checkbox, se pregunta, ¿tiene el interruptor prendido?
		//como esta apagado, me va remover los estilos y a su vez me enciende el interruptor
		//volviendo a retomar el ciclo.
		if (divPadre.classList.contains('activado') == true) {
		divPadre.setAttribute("style","background-color: #04A75A;color: #000;transition: all 0.3s ease;");
		divPadre.classList.remove('activado');
		} else if (divPadre.classList.contains('activado') == false) {
			divPadre.removeAttribute('style');
			divPadre.classList.add('activado');
		}
	});
	/*---------------------------------------------------------------------------------------------------*/

	/*---------------------------------------------------------------------------------------------------*/
	const CLOSEBUTTON = document.querySelector('.boton-popup');
	const CANCELBUTTON = document.querySelector('.boton-popup-cancel');
	const OPENMODAL = document.querySelector('.container-modal');

	//Eventos clicks, de boton abrir y cerrar el modal o popup.
	CLOSEBUTTON.addEventListener('click', e=> {
		OPENMODAL.classList.remove('show');
	});
	CANCELBUTTON.addEventListener('click', e=> {
		OPENMODAL.classList.remove('show');
	});

	//Evento click, cuando se le de ckick al icon del lapiz.
	iconEdit.addEventListener('click', e=> {
		if (OPENMODAL.classList.contains('show') == false ) {
			OPENMODAL.classList.toggle('show');
			//console.log(OPENMODAL);;
		}
		//Accedemos con target y parent a los elementos que querramos.
		//En este caso buscamos en HTML la ID del elemento alojado en Firebase
		//y los guardamos en la variable para asi despues modificar el contenido de la variable.
		updateId = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute('data-id');
		//console.log(updateId);
	});
	/*---------------------------------------------------------------------------------------------------*/
}; //Cerramos la funcion que llama al 'doc' de firebase.


/*---------------------------------------------------------------------------------------------------*/
//Cuando se le di click al boton de actualizar tarea, me llama a un evento
UPDATE.addEventListener('click', e=> {
	//Este evento en la variable newTitle me va almacenar el arreglo del input a editar
	//Por eso llamamos al atributo 'name' del input.
	newTitle = document.getElementsByName('textActualizar')[0].value; //aca elegi este elemt pa llamar.
	//Accedemos al firebase, a la base 'Tareas' y le pasamos el doc 'updateId' el cual contiene
	//el ID del elemento tarea donde se hizo click y le decimos 'update' que actualice lo siguiente:
	//en firebase el Titulo de la tarea y va poner todo lo que se haya en la variable newTitle.
	db.collection('Tareas').doc(updateId).update({
		Titulo: newTitle
	}); // NOTA: Esto actuliza el contenido en firebase, pero no en el proyecto.
	//Cuando se actuliza los cambios, limpiame el input
	document.getElementsByName('textActualizar')[0].value = '';
});
/*---------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------*/
//Llamo al evento submit cuando se le de click al 'agregar tarea' del formulario.
form.addEventListener('submit', e=> {
	e.preventDefault();
	//En firebase adentro de Tareas, seccion: 'Titulo' me vas guardar todo lo que se haya escrito
	//en el input cuando se le dio click al boton de 'agregar tarea'.
	db.collection('Tareas').add({ //Nota: el parametro 'Tareas' es el nombre del archivo en firebase.
		Titulo: form.task.value
	});
	//Me limpia el input para la proxima tarea a escribir.
	form.task.value = '';
});
/*---------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------*/
//llamo a firebase median escritura de su logica
db.collection('Tareas').orderBy('Titulo').onSnapshot( snapshot => {
	//variable para el almacenamiento de los datos extraidos de firebase
	let change = snapshot.docChanges();

	//logica de cuando se produce algun cambio en la base de firebase
	//queremos que a su vez tambien se apliquen los mismos cambios en la app
	//para eso aplicamos lo siguiente: 
	change.forEach( e => {
		if (e.type == 'added') {
			renderList(e.doc);
		}else if (e.type == 'removed') {
			let li = listTask.querySelector(`[data-id=${e.doc.id}]`);
			listTask.removeChild(li);
		}else if (e.type == 'modified') {
			let li = listTask.querySelector(`[data-id=${e.doc.id}]`);
			li.getElementsByTagName('span')[0].textContent = newTitle;
			newTitle = '';
		}
	}); // NOTA: por estandar cuando se produce algun evento, se lo llama 'e'.
});
/*---------------------------------------------------------------------------------------------------*/