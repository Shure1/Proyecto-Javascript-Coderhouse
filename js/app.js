//variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

eventos();


function eventos(){
     //agregamos un tweet
    formulario.addEventListener('submit',agregartweet);

    document.addEventListener('DOMContentLoaded', () =>{
     /* si consegimos extraer tweets del localStorage se imprimira en el HTML
     si no entonces sera un array vacio */
     tweets = JSON.parse(localStorage.getItem('tweets')) || [];

     crearHtml();
    })
    

}

function agregartweet(e){
    e.preventDefault();

    //area del texto donde el user escribe
    const tweet = document.querySelector('#tweet').value;

    //validacion
    if(tweet === ''){
        mostrarError('el mensaje no puede estar vacio');
        return;//detenemos el cod
    }

    const tweetObj = {
        id: Date.now(),
        texto:tweet
    }

    tweets = [...tweets, tweetObj];
    console.log(tweets)

    crearHtml();//ponemos los tweets en HTML

    //reiniciamos el formulario
    formulario.reset();


}


function mostrarError(mensaje){
    //creamos un elemento en el HTML
    const mensajeError = document.createElement('p');
    //le asignamos el mensaje al parrafo
    mensajeError.textContent = mensaje
    //le aplicamos la clase de css para los estilos
    mensajeError.classList.add('error');

    //instauramos el contenedor padre para insertar en el HTML
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError)
}

function crearHtml(){
     limpiarHTML()//limpiamos el HTML

    if(tweets.length > 0){
        tweets.forEach(tweet =>{

          //creamos el boton X
          const btnEliminar = document.createElement('a');
          //le agregamos estilos
          btnEliminar.classList.add('borrar-tweet');
          btnEliminar.textContent = 'X'

          btnEliminar.onclick= () =>{
               borrarTweet(tweet.id)
          }

          //creamos el elemento li para el HTML
          const li = document.createElement('li');

          //le ponemos el tweet
          li.innerText = tweet.texto;

          //le agregamos el boton eliminar
          li.appendChild(btnEliminar);

          //agregamos todo al HTML (tweet y boton)
          listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

function sincronizarStorage(){
     localStorage.setItem('tweets', JSON.stringify(tweets));
}

function borrarTweet(id) {
     tweets = tweets.filter( tweet => tweet.id !== id);

     crearHtml();
}

/* ponemos la funcion ya que cuando se ingresa contenido al html ya hay contenido previo que se repetira 
cada vez que se siga ingresando tweets */
function limpiarHTML(){
     while(listaTweets.firstChild){
          listaTweets.removeChild(listaTweets.firstChild);
     }
}