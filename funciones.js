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

    if (document.getElementById("area").checked)
        incognita = "area";
    if (document.getElementById("altura").checked)
        incognita = "altura";
    if (document.getElementById("masa").checked)
        incognita = "masa";

    var v1, v2, v3, u1, u2, u3;
    var unidad_final;

    switch (incognita) {
        case "area":
            v1 = document.getElementById("altura2").value;
            v2 = document.getElementById("area1").value;
            v3 = document.getElementById("altura1").value;

            u1 = document.getElementById("unidadesalt2").value;
            u2 = document.getElementById("unidadesa1").value;
            u3 = document.getElementById("unidadesalt1").value;

            unidad_final = "m2";

            break;
        case "altura":

            v1 = document.getElementById("masa2").value;
            v2 = document.getElementById("altura1").value;
            v3 = document.getElementById("masa1").value;

            u1 = document.getElementById("unidadesm2").value;
            u2 = document.getElementById("unidadesalt1").value;
            u3 = document.getElementById("unidadesm1").value;

            unidad_final = "m";

            break;
        case "masa":

            v1 = document.getElementById("masa1").value;
            v2 = document.getElementById("area2").value;
            v3 = document.getElementById("area1").value;

            u1 = document.getElementById("unidadesm1").value;
            u2 = document.getElementById("unidadesa2").value;
            u3 = document.getElementById("unidadesa1").value;

            unidad_final = "kg";

            break;
    }

    document.getElementById("prueba_resultado").innerHTML = v1 * factor_conversion(u1) * v2 * factor_conversion(u2) / (v3 * factor_conversion(u3)) + " " + unidad_final;
    dibujar();
}


function dibujar() {
    var canvas = document.getElementById("mycanvas");
    var ctx = canvas.getContext("2d");

    var ancho = canvas.width;
    var alto = canvas.height;

    var yo = 20;
    var h1 = 10;
    var h2 = -h1;

    //ancho canvas= 900 alto= 440

    ctx.strokeStyle = "#9e9fa6";
    ctx.fillStyle = "#1d0bff";
    ctx.lineWidth = "8";

    ctx.beginPath();

    ctx.rect((ancho / 2) - 125, alto - yo - 30, 250, 30);   //base prensa

    ctx.rect((ancho / 2) - 125, alto - yo - 60 - h1, 40, 60 + h1);       //lado izq

    ctx.rect((ancho / 2) + 125 - 60, alto - yo - 60 - h2, 60, 60 + h2);     //lado der

    ctx.stroke();
    ctx.fill();

    ctx.closePath();

    ctx.strokeStyle = "#fffc4d";
    ctx.fillStyle = "#ff0000";

    ctx.beginPath();

    ctx.rect((ancho / 2) - 125 + 20 - 10, alto - yo - 90, 20, 20);
    ctx.rect((ancho / 2) + 125 - 40, alto - yo - 90, 20, 20);

    ctx.stroke();
    ctx.fill();


    ctx.closePath();
}

function factor_conversion(unidad) {
    if (unidad == "g")
        return 1 / 1000;

    if (unidad == "cm")
        return 1 / 100;

    if (unidad == "cm2")
        return 1 / (10000);

    return 1;
}

function verificar() {
    var estado = true;
    if(document.getElementById("area1").value <= 0)
        estado = false;
    if(document.getElementById("masa1").value <= 0)
        estado = false;
    if(document.getElementById("altura1").value < 0)
        estado = false;

    var incognita;

    if (document.getElementById("area").checked)
        incognita = "area";
    if (document.getElementById("altura").checked)
        incognita = "altura";
    if (document.getElementById("masa").checked)
        incognita = "masa";

    switch (incognita){

    }

    if(estado == true)
        calculos();
    else
        alert("ESTO NO FUNCA");


}