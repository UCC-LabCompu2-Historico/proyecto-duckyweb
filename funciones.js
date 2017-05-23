/**
 * Created by nelon on 23/5/2017.
 */

/*
 Descripción
 * @method Nombre de la función
 * @param Parámetro A
 * @param Parámetro B
 * @return Valor que retorna
 *
 * Oculta y/o muestra los datos dependiendo de lo que se desea calcular (ver technical_issues.txt)
 * @method mostrarocultar
 * @param incognita (area|altura|masa)
 *
 * Esta funcion hace los calculos y los muestra
 * @method calculos *
 *
 */

function mostrarocultar(incognita) {
    switch (incognita) {
        case "area":
            document.getElementById("p_m1").style.display = "block";
            document.getElementById("p_h1").style.display = "block";
            document.getElementById("p_a1").style.display = "block";
            document.getElementById("p_h2").style.display = "block";

            document.getElementById("p_a2").style.display = "none";
            document.getElementById("p_m2").style.display = "none";
            break;
        case "altura":
            document.getElementById("p_m1").style.display = "block";
            document.getElementById("p_h1").style.display = "block";
            document.getElementById("p_a1").style.display = "block";
            document.getElementById("p_m2").style.display = "block";

            document.getElementById("p_h2").style.display = "none";
            document.getElementById("p_a2").style.display = "none";
            break;
        case "masa":
            document.getElementById("p_m1").style.display = "block";
            document.getElementById("p_h1").style.display = "block";
            document.getElementById("p_a1").style.display = "block";
            document.getElementById("p_a2").style.display = "block";

            document.getElementById("p_m2").style.display = "none";
            document.getElementById("p_h2").style.display = "none";
            break;
        default:
            break;
    }
}

function calculos() {
    var incognita;
    var resultado;
    if (document.getElementById("area").checked)
        incognita = "area";
    if (document.getElementById("altura").checked)
        incognita = "altura";
    if (document.getElementById("masa").checked)
        incognita = "masa";

    switch (incognita) {
        case "area":
            resultado = document.getElementById("altura2").value * document.getElementById("area1").value / document.getElementById("altura1").value;
            break;
        case "altura":
            resultado = document.getElementById("masa2").value * document.getElementById("altura1").value / document.getElementById("masa1").value;
            break;
        case "masa":
            resultado = document.getElementById("masa1").value * document.getElementById("area2").value / document.getElementById("area1").value;
            break;
    }

    document.getElementById("prueba_resultado").innerHTML = resultado;
}


function conversor(valor) {

}

