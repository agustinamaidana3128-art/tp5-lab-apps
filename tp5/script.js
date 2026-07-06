let nombre = document.getElementById("nombre");
let correo = document.getElementById("correo");
let btnInicio = document.getElementById("btnInicio");
let tiempo = 0;
let contador;
nombre.addEventListener("input", activarInicio);
correo.addEventListener("input", activarInicio);
function activarInicio(){
    if(nombre.value != "" && correo.value != ""){
        btnInicio.disabled=false;
    }
}

btnInicio.onclick=function(){
    document.getElementById("inicio").style.display="none";
    document.getElementById("quiz")
    .classList.remove("oculto");
    contador=setInterval(function(){
        tiempo++;
        document.getElementById("temporizador")
        .innerHTML="Tiempo: "+tiempo+" segundos";
    },1000);
}

let preguntas=[
["correcta"],
["correcta"],
["js","python"],
["correcta"],
["correcta"],
["click","submit"],
["correcta"],
["correcta"],
["radio","text"],
["correcta"]
];

let resolver=document.getElementById("resolver");
document
.getElementById("formulario")
.addEventListener("change", validar);
function validar(){
    let completas=true;
    for(let i=1;i<=10;i++){
        let respuestas=
        document.querySelectorAll("[name=p"+i+"]:checked");
        if(respuestas.length==0){
            completas=false;
        }
    }
    resolver.disabled=!completas;
}

resolver.onclick=function(e){
    e.preventDefault();
    clearInterval(contador);
    let puntos=0;
    for(let i=1;i<=10;i++){
        let seleccionadas=[];
        document
        .querySelectorAll("[name=p"+i+"]:checked")
        .forEach(x=>{
            seleccionadas.push(x.value);
        });

        if(JSON.stringify(seleccionadas.sort()) ==
        JSON.stringify(preguntas[i-1].sort())){
            puntos++;
        }
    }
    document.getElementById("temporizador")
    .style.display="none";
    document.getElementById("resultado")
    .innerHTML=
    `
    <h2>Resultado</h2>
    Usuario: ${nombre.value}
    <br>
    Puntaje: ${puntos}/10
    <br>
    Tiempo utilizado: ${tiempo} segundos
    <br><br>
    Gracias por participar.
    `;
}