function Alumno(nombre,curso,edad,id){
    this.nombre = nombre;
    this.curso = curso;
    this.edad = edad;
    this.id = id;
    this.matematicas = [];
    this.lenguaje = [];
    this.ciencias = [];

    this.agregarNotaMatematicas = (nota) => {
        this.matematicas = [...this.matematicas,nota];
    };

    this.agregarNotaLenguaje = (nota) => {
        this.lenguaje = [...this.lenguaje,nota];
    };

    this.agregarNotaciencias = (nota) => {
        this.ciencias = [...this.ciencias,nota];
    };

    this.obtenerPromedio = (asignatura) => {
        let resultado = 0;
        for(let numero of asignatura){
            resultado+=numero;
        }
        return resultado;
    };

    this.promedioFinal = () => {
        let resultado = 0;
        resultado+=((this.obtenerPromedio(this.matematicas)+this.obtenerPromedio(this.lenguaje)+this.obtenerPromedio(this.ciencias))/3);
        
        return resultado;
    };

};

function Curso(nombre,cantidad){
    this.nombre = nombre;
    this.cantidad = cantidad;
    this.alumnos = [];

    
    this.repitentes = () => {
        let listaPromedios = this.alumnos.map(alumno => { 
            if(alumno.promedioFinal()<= 4 ){
                console.log(`el alumno ${alumno.nombre} se encuentra en calidad de repitencia con un promedio de: ${alumno.promedioFinal()}`);
            };

        });
        return ;
    };
  
    this.mejorAlumno = () => {
        let max = 0;
        this.alumnos.forEach(function(alumno){
            if(alumno.promedioFinal() > max){
                max = alumno.promedioFinal();
                nombre = alumno.nombre;
            };
       });
       return console.log(`el mejor alumno es ${nombre} con un promedio de ${max}`)
    };
}


let Cursos = [];

let crearCurso = () => {
    let nombreCurso = prompt('ingrese el nombre del curso: ');
    let cantidadCurso = parseInt(prompt ('ingrese la cantidad del curso: '));

    let curso = new Curso(nombreCurso,cantidadCurso);
    Cursos = [...Cursos, curso];

    console.log(`el curso ${nombreCurso} se ha creado correctamente`);
    console.log(Cursos);
};

let crearAlumno = () => {
    let nombreAlumno = prompt('ingrese el nombre del alumno: ');
    let edadAlumno = parseInt(prompt('ingrese la edad del alumno: '));
    let idAlumno = parseInt(prompt('ingrese el id del alumno: '));

    let seguir = true;
    while(seguir){
        let cursoAlumno= prompt('ingrese el curso del alumno: ');

        let curso = Cursos.find( curso => { return curso.nombre == cursoAlumno});
        console.log(curso);
        if(!curso){
            console.log(`el curso ${cursoAlumno} no existe por favor reintente nuevamente`);
        }else{
            let alumno = new Alumno(nombreAlumno,cursoAlumno,edadAlumno,idAlumno);
            curso.alumnos.push(alumno);
            console.log(`el alumno ${nombreAlumno} fue ingresado al curso: ${cursoAlumno} con exito!`);
            seguir = false;
        };
    };

    
};

let agregarNota = () =>{
    
    let seguir = true;
    while(seguir){
        let cursoAlumno= prompt('ingrese el curso del alumno: ');

        let idAlumno = parseInt(prompt('ingrese id del alumno: '));

        let curso = Cursos.find( curso => { return curso.nombre === cursoAlumno});
        console.log(curso);
        let alumno = curso.alumnos.find( alumno => { return alumno.id === idAlumno});
        console.log(alumno);
        if(!curso || !alumno){
            console.log(`el curso:${cursoAlumno} o el alumno no existe por favor reintente nuevamente`);
        }else{
            let materiaAlumno = parseInt(prompt('Seleccione alguna materia en donde desea agregar la nota: \n1. agregar nota en matematicas\n2. agregar nota en lenguaje\n3. agregar nota en ciencias'));
            let notaAlumno = parseInt(prompt('ingrese nota del alumno: '));
            switch(materiaAlumno){
                case 1:
                    alumno.agregarNotaMatematicas(notaAlumno);
                    break;
                case 2:
                    alumno.agregarNotaLenguaje(notaAlumno);
                    break;
                case 3:
                    alumno.agregarNotaciencias(notaAlumno);
                    break;
                default:
                    console.log('opcion invalida');
                    break;

            };
            seguir = false;
        };
    };


    
    
};

let mostrar = () => {

    let nombreCurso= prompt('ingrese nombre del curso');

    let curso = Cursos.find( curso => { return curso.nombre === nombreCurso});

    let seguir = true;
    while(seguir){
        if(!curso){
            console.log(`no existe tal curso,  por favor intente nuevamente`)
        }else{
            let opcion = parseInt(prompt('ingresese 1 si desdea comprobar los alumnos repitentes del curso\ningrese 2 si desea verificar el mejor alumno'));
            switch(opcion){
                case 1:
                    curso.repitentes();
                    break;
                case 2:
                    curso.mejorAlumno();
                    break;
                default:
                    console.log('opcion invalida');
                    mostrar();
                    break;
            };
        };
    };


};



function main(){
    let opcion = parseInt(prompt('seleccione alguna opcion:\n1. Agregar curso\n2. Agregar alumno\n3. Agregar nota\n4. Diagnostico del curso\n5. Salir.'));
    switch(opcion){
        case 1:
            crearCurso();
            main();
            break;
        case 2:
            crearAlumno();
            main();
            break;
        case 3:
            agregarNota();
            main();
            break;
        case 4:
            mostrar();
            main();
            break;
        case 5:
            console.log('hasta luego');
            break;
        default:
            console.log('opcion invalida intente nuevamente');
            main();
            break;
    };
};

main();



