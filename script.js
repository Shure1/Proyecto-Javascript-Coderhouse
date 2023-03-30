console.log("Bienvenido a la calculadora de tu promedio!")

let sumatoria = (notaActual,nota) => {
    return notaActual + nota}
let promedio = (nota,cantidad) =>{ return nota/cantidad }

const numeroDeNotas = parseInt(prompt("ingrese la cantidad de calificaciones: "));

let notaPresente = 0;
let seguir = true;
let resultado = 0;
let i = 0;

while(seguir){
    if(i < numeroDeNotas){
        let nota = parseInt(prompt("ingrese nota: "));

        resultado = sumatoria(notaPresente,nota)
        notaPresente = resultado;
        console.log(resultado);
        i++;
    
    }else{

        console.log('proceso terminado');
        let notaFinal = promedio(resultado,numeroDeNotas);
        console.log(`el promedio final es ${notaFinal}`);
        seguir = false;
        

    }

}
    

    




