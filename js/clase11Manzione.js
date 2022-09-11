let completo = "NO";

function asignoGoles(){
    for (let i = 0; i < partidosC.length; i++){
        let partido = document.getElementById(`grupoCPartido${(i+1)}`);
        partidosC[i].set_golesA(partido.getElementsByTagName("input")[0].value);   
        partidosC[i].equipoA.set_golesAFavor(partido.getElementsByTagName("input")[0].value);
        partidosC[i].equipoA.set_golesEnContra(partido.getElementsByTagName("input")[1].value);

        partidosC[i].set_golesB(partido.getElementsByTagName("input")[1].value);   
        partidosC[i].equipoB.set_golesAFavor(partido.getElementsByTagName("input")[1].value);
        partidosC[i].equipoB.set_golesEnContra(partido.getElementsByTagName("input")[0].value);

        if( partidosC[i].get_golesA() > partidosC[i].get_golesB()){
            partidosC[i].equipoA.set_puntos(3);
            partidosC[i].equipoB.set_puntos(0);
        }else if(partidosC[i].get_golesA() < partidosC[i].get_golesB()){
            partidosC[i].equipoA.set_puntos(0);
            partidosC[i].equipoB.set_puntos(3);
        }else{
            partidosC[i].equipoA.set_puntos(1);
            partidosC[i].equipoB.set_puntos(1);
        } 
    }
}

let goles = document.getElementsByClassName("goles");
let botonTabla = document.getElementById("botonTabla");
let btnTabla = document.getElementById("btnTabla");

btnTabla.addEventListener("click",function(){
    let h4 = document.getElementById("error");
    completo = "SI";
    for (let gol of goles){
        if (gol.value == ""){
            completo = "NO";
        }        
    }
    if (completo == "NO"){
        if (h4 == null){
            let mensajeError = document.createElement("h4");
            mensajeError.innerHTML = `Error! <br>
                                      completar todos los resultados del grupo  <br>
                                      para poder actualizar la tabla`;
            mensajeError.id = "error";
            botonTabla.append(mensajeError);
        }
    }else {        
        if (h4 != null){
            h4.remove();
        }
        
        limpiarTabla();

        asignoGoles();
        orden = 1;
        tablaGrupoC.sort(ordenarPuntos);
        crearTabla();
        
        localStorage.setItem("grupoC", JSON.stringify(tablaGrupoC));

        localStorage.setItem("partidosC", JSON.stringify(partidosC));
    }
})



