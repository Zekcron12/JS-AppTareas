/*
Nota: esta app es online, es decir contiene una base de datos en Firebase, 
si usted modifica una tarea, agrega otra o elimina, cualquier persona que entre a la app 
vera todos los cambios reflejados . Saludos
 */


/* 
    <ul class="list-task">
      <li>
        <div class="container-list" id="colorFecht">
          <div>
            <input type="checkbox" id="fecht" class="s">
          </div>
          <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id .</span>
          <div class="list-icon">
            <a href="#" id="open"><i class="fas fa-pen"></i></a>
            <i class="fas fa-trash-alt"></i>
          </div>
        </div>
      </li>
    </ul>

*/

 /*function activarColor() {
 	if (colorFecht.classList.contains('checkbox') == true) {
		colorFecht.classList.remove('checkbox');
	} else {
		colorFecht.classList.add('checkbox'); 
	}
 }*/

const listTask = document.getElementById('IDlist');
const form = document.getElementById('IDform');
//Capturamos la ID del boton para que cuando se escriba la nueva tarea se guarde.
const UPDATE = document.getElementById('IDnew');
let updateId = null;
//Variable que va almacenar el nuevo titulo de la tarea actualizada.
let newTitle = ''; //NOTA: titulo es un archivo en firebase que almacena las tareas escritas.


const renderList = (doc) => {
	//creo el 1er elemento que compone el bloque de la lista de tareas.
	let li = document.createElement('li');
	li.setAttribute('data-id', doc.id);


	//creo el 3er elemento que compone el bloque de la lista de tareas.
	let divPadre = document.createElement('div');
	divPadre.className = 'container-list activado';
	divPadre.setAttribute('id', 'colorFecht');

	//creo el 4to elemento que compone el bloque de la lista de tareas.
	let title = document.createElement('span');
	title.textContent = doc.data().Titulo;
	title.className = 'span';
	let divHijoP = document.createElement('div');
	divHijoP.className = 'list-input';
	let tooltips = document.createElement('span');
	tooltips.className = 'tooltips';
	tooltips.textContent = 'Listo';
	let inputs = document.createElement('input');
	inputs.setAttribute('type', 'checkbox');
	//inputs.setAttribute('id', 'fecht');

	let divHijoS = document.createElement('div');
	divHijoS.className = 'list-icon';
	let link = document.createElement('a');
	link.href = '#'
	link.setAttribute('id', 'open');
	let iconEdit = document.createElement('i');
	iconEdit.className = 'fas fa-pen';
	let iconRemove = document.createElement('i');
	iconRemove.className = 'fas fa-trash-alt';

	link.appendChild(iconEdit);
	divHijoS.appendChild(link);
	divHijoS.appendChild(iconRemove);
	divHijoP.appendChild(tooltips);
	divHijoP.appendChild(inputs);

	divPadre.appendChild(title);
	divPadre.appendChild(divHijoP);
	divPadre.appendChild(divHijoS);

	li.appendChild(divPadre);

	iconRemove.addEventListener('click', e=> {
		let removeID = e.target.parentElement.parentElement.parentElement.getAttribute('data-id');
		db.collection('Tareas').doc(removeID).delete();
	});

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

	const CLOSEBUTTON = document.querySelector('.boton-popup');
	const CANCELBUTTON = document.querySelector('.boton-popup-cancel');
	const OPENMODAL = document.querySelector('.container-modal');

	CLOSEBUTTON.addEventListener('click', e=> {
		OPENMODAL.classList.remove('show');
	});

	CANCELBUTTON.addEventListener('click', e=> {
		OPENMODAL.classList.remove('show');
	});

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

	listTask.append(li);
}

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

form.addEventListener('submit', e=> {
	e.preventDefault();
	db.collection('Tareas').add({
		Titulo: form.task.value
	});
	form.task.value = '';
})



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
