let tablaGrupoC = [];
let partidosC = [];
let ls_tablaGrupoC = [];
let ls_partidosC = [];
let orden = 1;

class Equipo{
    constructor(nombre, puntos, golesAFavor, golesEnContra){
        this.nombre = nombre;
        this.puntos = puntos;
        this.golesAFavor = golesAFavor;
        this.golesEnContra = golesEnContra;
    }

    set_puntos(puntos){
        this.puntos = this.puntos + puntos;
    }

    set_golesAFavor(goles){
        this.golesAFavor = this.golesAFavor + parseInt(goles);
    }

    set_golesEnContra(goles){
        this.golesEnContra = this.golesEnContra + parseInt(goles);
    }

    get_nombre(){
        return this.nombre;
    }

    get_puntos(){
        return this.puntos;
    }

    get_golesAFavor(){
        return this.golesAFavor;
    }

    get_golesEnContra(){
        return this.golesEnContra;
    }

    get_datos(){
        return this.nombre + " | " + this.puntos + " | " + this.golesAFavor + " | "+ this.golesEnContra;
    }

    get_diferenciaGoles(){
        return this.golesAFavor - this.golesEnContra;
    }
}

class Partido{
    constructor(equipoA, golesA, equipoB, golesB){
        this.equipoA = equipoA;
        this.golesA = golesA;
        this.equipoB = equipoB;
        this.golesB = golesB;
    }

    set_golesA(goles){
        this.golesA = goles;
    }

    set_golesB(goles){
        this.golesB = goles;
    }

    get_golesA(){
        return this.golesA;
    }

    get_golesB(){
        return this.golesB;
    }

    get_equipoA(){
        return this.equipoA.get_nombre();
    }
    
    get_equipoB(){
        return this.equipoB.get_nombre();
    }
    
    get_partido(){
        return this.equipoA.nombre + " VS " + this.equipoB.nombre;
    }

    get_resultado(){
        return this.equipoA.nombre + " " + this.golesA + " | "+ this.equipoB.nombre + " " + this.golesB;
    }
}

function cargarResultados(){

    for (let i = 0; i < partidosC.length; i++){
        let l_partido = document.getElementById(`grupo${"C"}Partido${(i+1)}`);
        l_partido.getElementsByTagName("input")[0].value = partidosC[i].get_golesA();
        l_partido.getElementsByTagName("input")[1].value = partidosC[i].get_golesB();
    }
    
}

function crearTabla(){

    let tb = document.getElementById("tabla");

    if (tb != null){
        tb.remove();
    }

    let table = document.createElement("table");
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");

    table.appendChild(thead);
    table.appendChild(tbody);
    table.id = "tabla";

    document.getElementById("tablaPosiciones").appendChild(table);

    let columna1 = document.createElement("tr");
    let cabecera1 = document.createElement("th");
    cabecera1.innerHTML = `Pais <button class="ascendente">↑</button> <button class="descendente">↓</button>`;
    cabecera1.id = "pais";
    let cabecera2 = document.createElement("th");
    cabecera2.innerHTML = `Pt <button class="ascendente">↑</button> <button class="descendente">↓</button>`;
    cabecera2.id = "puntos";
    let cabecera3 = document.createElement("th");
    cabecera3.innerHTML = `GF <button class="ascendente">↑</button> <button class="descendente">↓</button>`;
    cabecera3.id = "golesF";
    let cabecera4 = document.createElement("th");
    cabecera4.innerHTML = `GC <button class="ascendente">↑</button> <button class="descendente">↓</button>`;
    cabecera4.id = "golesC";

    columna1.appendChild(cabecera1);
    columna1.appendChild(cabecera2);
    columna1.appendChild(cabecera3);
    columna1.appendChild(cabecera4);
    thead.appendChild(columna1);

    for (let equipo of tablaGrupoC){
            
        let columna = document.createElement('tr');
        let columnaPais = document.createElement('td');
        columnaPais.innerHTML = equipo.get_nombre();
        let columnaPuntos = document.createElement('td');
        columnaPuntos.innerHTML = equipo.get_puntos();
        let columnaGolesA = document.createElement('td');
        columnaGolesA.innerHTML = equipo.get_golesAFavor();
        let columnaGolesC = document.createElement('td');
        columnaGolesC.innerHTML = equipo.get_golesEnContra();

        columna.appendChild(columnaPais);
        columna.appendChild(columnaPuntos);
        columna.appendChild(columnaGolesA);
        columna.appendChild(columnaGolesC);
        tbody.appendChild(columna);

    }

    
    let btnPais = document.getElementById("pais");
    
    btnPais.addEventListener("click", function(e){
        setOrden(e.target.innerHTML);
        tablaGrupoC.sort(ordenarNombre);
        crearTabla();
    })

    let btnPuntos = document.getElementById("puntos");

    btnPuntos.addEventListener("click", function(e){
        setOrden(e.target.innerHTML);
        tablaGrupoC.sort(ordenarPuntos);
        crearTabla();
    })
    
    let btnGolesF = document.getElementById("golesF");

    btnGolesF.addEventListener("click", function(e){
        setOrden(e.target.innerHTML);
        tablaGrupoC.sort(ordenarGolesAFavor);
        crearTabla();
    })

    let btnGolesC = document.getElementById("golesC");

    btnGolesC.addEventListener("click", function(e){
        setOrden(e.target.innerHTML);
        tablaGrupoC.sort(ordenarGolesEnContra);
        crearTabla();
    })

}


function ordenarNombre(a, b){
    if(a.get_nombre() > b.get_nombre()){
        return (1 * orden);
    }else{
        return (-1 * orden);
    }
}


function ordenarPuntos(a, b){
    if(a.get_puntos() > b.get_puntos()){
        return (-1 * orden);
    }else if (a.get_puntos() == b.get_puntos()){
        if(a.get_diferenciaGoles() > b.get_diferenciaGoles()){
            return (-1 * orden);
        }else{
            return (1 * orden);
        }

        
    }else{
        return (1 * orden);
    }
}

function ordenarGolesAFavor(a, b){
    if(a.get_golesAFavor() > b.get_golesAFavor()){
        return (-1 * orden);
    }else{
        return (1 * orden);
    }
}

function ordenarGolesEnContra(a, b){
    if(a.get_golesEnContra() > b.get_golesEnContra()){
        return (-1 * orden);
    }else{
        return (1 * orden);
    }
}

function limpiarTabla(){
    for (let equipo of tablaGrupoC){
        equipo.set_puntos(- equipo.get_puntos());
        equipo.set_golesAFavor(- equipo.get_golesAFavor());
        equipo.set_golesEnContra(- equipo.get_golesEnContra());

    }
}

function setOrden(ordenar){

    if (ordenar == "↑"){
        orden = 1;
    }else if(ordenar == "↓"){
        orden = -1;
    }
    
}

if ( localStorage.getItem("partidosC") == null){
    let argentina = new Equipo("Argentina", 0, 0, 0);
    let arabia = new Equipo("Arabia Saudita", 0, 0, 0);
    let mexico = new Equipo("Mexico", 0, 0, 0);
    let polonia = new Equipo("Polonia", 0, 0, 0);

    tablaGrupoC.push(argentina);
    tablaGrupoC.push(arabia);
    tablaGrupoC.push(mexico);
    tablaGrupoC.push(polonia);

    let grupoCPartido1 = new Partido(argentina, 0, arabia, 0);
    let grupoCPartido2 = new Partido(mexico, 0, polonia, 0);
    let grupoCPartido3 = new Partido(arabia, 0, polonia, 0);
    let grupoCPartido4 = new Partido(argentina, 0, mexico, 0);
    let grupoCPartido5 = new Partido(argentina, 0, polonia, 0);
    let grupoCPartido6 = new Partido(arabia, 0, mexico, 0);

    partidosC.push(grupoCPartido1);
    partidosC.push(grupoCPartido2);
    partidosC.push(grupoCPartido3);
    partidosC.push(grupoCPartido4);
    partidosC.push(grupoCPartido5);
    partidosC.push(grupoCPartido6);

    localStorage.setItem("grupoC", JSON.stringify(tablaGrupoC));

    localStorage.setItem("partidosC", JSON.stringify(partidosC));

}else{
    ls_partidosC = JSON.parse(localStorage.getItem("partidosC"));

    ls_tablaGrupoC = JSON.parse(localStorage.getItem("grupoC"));

    
    let argentina = new Equipo("Argentina", 0, 0, 0);
    let arabia = new Equipo("Arabia Saudita", 0, 0, 0);
    let mexico = new Equipo("Mexico", 0, 0, 0);
    let polonia = new Equipo("Polonia", 0, 0, 0);
    tablaGrupoC.push(argentina);
    tablaGrupoC.push(arabia);
    tablaGrupoC.push(mexico);
    tablaGrupoC.push(polonia);

    for (let ls_equipo of ls_tablaGrupoC){
        for (let equipo of tablaGrupoC){
            if(ls_equipo.nombre == equipo.get_nombre()){
                equipo.set_puntos(ls_equipo.puntos);
                equipo.set_golesAFavor(ls_equipo.golesAFavor);
                equipo.set_golesEnContra(ls_equipo.golesEnContra);
            }
        }
    }

    let grupoCPartido1 = new Partido(argentina, 0, arabia, 0);
    let grupoCPartido2 = new Partido(mexico, 0, polonia, 0);
    let grupoCPartido3 = new Partido(arabia, 0, polonia, 0);
    let grupoCPartido4 = new Partido(argentina, 0, mexico, 0);
    let grupoCPartido5 = new Partido(argentina, 0, polonia, 0);
    let grupoCPartido6 = new Partido(arabia, 0, mexico, 0);

    partidosC.push(grupoCPartido1);
    partidosC.push(grupoCPartido2);
    partidosC.push(grupoCPartido3);
    partidosC.push(grupoCPartido4);
    partidosC.push(grupoCPartido5);
    partidosC.push(grupoCPartido6);

    for (let i = 0; i < partidosC.length; i++){
        partidosC[i].set_golesA(ls_partidosC[i].golesA);
        partidosC[i].set_golesB(ls_partidosC[i].golesB);        
    }

    cargarResultados();
}
tablaGrupoC.sort(ordenarPuntos);
crearTabla();
