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

/*
 var altura_1 = document.getElementById("altura1");
 var altura_2 = document.getElementById("altura2");
 var masa_1 = document.getElementById("masa1");
 var masa_2 = document.getElementById("");
 var area_1 = document.getElementById("area1");
 var area_2 = document.getElementById("");
 */

// Objeto con constructor
// var rueda = function ( d){
//   this.diametro = d;
//
//   this.girar = function () {
//       console.log("giro " + this.diametro);
//   }
// };

// var pepe = {
//     variable: "valor",
//     otravar: "otro valor",
//     otramas: 5,
//     funcion: function () {
//         console.log("esta es una funcion" + this.otramas);
//     },
//     otrafuncion: function () {
//         console.log("esta es otra funcion" + this.variable);
//     }
// };

function mostrarocultar(incognita) {

    document.getElementById("area1").value = "";
    document.getElementById("area2").value = "";
    document.getElementById("masa1").value = "";
    document.getElementById("masa2").value = "";

    document.getElementById("prueba_resultado").value = "";
    document.getElementById("presion_resultado").value = "";


    switch (incognita) {
        case "area":
            document.getElementById("p_m1").style.display = "block";
            document.getElementById("p_a1").style.display = "block";
            document.getElementById("p_a2").style.display = "none";
            document.getElementById("p_m2").style.display = "block";

            break;
        case "masa":
            document.getElementById("p_m1").style.display = "block";
            document.getElementById("p_a1").style.display = "block";
            document.getElementById("p_a2").style.display = "block";
            document.getElementById("p_m2").style.display = "none";
            break;
        default:
            break;
    }
}

function calculos() {
    if (document.getElementById("area").checked) {
        calcular_Area();
    }
    if (document.getElementById("masa").checked) {
        calcular_Masa();
    }
}

function calcular_Area() {
    //Incognita es Area, datos 1 conocidos, y altura 2
    var a1 = document.getElementById("area1").value * factor_conversion("area1");
    var m1 = document.getElementById("masa1").value * factor_conversion("masa1");
    var m2 = document.getElementById("masa2").value * factor_conversion("masa2");

    var a2 = a1 * (m2 / m1);

    var pres = (m1 * 9.81) / a1;

    dibujar(a1, m1, a2, m2, pres);

    document.getElementById("prueba_resultado").innerHTML = a2 + " m2";
    document.getElementById("presion_resultado").innerHTML = pres + " N/m2";
}

function calcular_Masa() {
    var a1 = document.getElementById("area1").value * factor_conversion("area1");
    var m1 = document.getElementById("masa1").value * factor_conversion("masa1");
    var a2 = document.getElementById("area2").value * factor_conversion("area2");

    var m2 = m1 * (a2 / a1);

    var pres = (m1 * 9.81) / a1;

    dibujar(a1, m1, a2, m2, pres);

    document.getElementById("prueba_resultado").innerHTML = m2 + " kg";
    document.getElementById("presion_resultado").innerHTML = pres + " N/m2";
}

function dibujar(a1, m1, a2, m2, pres) {
    var canvas = document.getElementById("mycanvas");
    var ctx = canvas.getContext("2d");

    var ancho = canvas.width;
    var alto = canvas.height;

    var yo = 20;            // altura base


    var rel_1 = 1, rel_2 = 1;

    var relacion_masas = m1 / m2;
    if (m1 > m2) {
        rel_1 = 1 - m2 / m1;
        rel_2 = m2 / m1;
    }
    if (m2 > m1) {
        rel_1 = m1 / m2;
        rel_2 = 1 - m1 / m2;
    }

    var p = pres;
    if (pres >= 20)
        p = 20;

    if (m1 == m2 && a1 == a2) {
        p = 0;
    }

    console.log(relacion_masas);

    var c;
    if (a1 > a2) {
        c = 1;
    }
    else {
        c = -1;
    }

    //ancho canvas= 900 alto= 440

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#9e9fa6";
    ctx.fillStyle = "#1d0bff";
    ctx.lineWidth = "8";

    ctx.beginPath();

    ctx.rect((ancho / 2) - 125, alto - yo - 30, 250, 30);   //base prensa

    ctx.rect((ancho / 2) - 125, alto - yo - 60 + c * p, 40, 60 - c * p);       //lado izq

    ctx.rect((ancho / 2) + 125 - 60, alto - yo - 60 - c * p, 60, 60 + c * p);     //lado der

    ctx.stroke();
    ctx.fill();

    ctx.closePath();

    ctx.strokeStyle = "#DB871E";
    ctx.fillStyle = "#e29f4a";

    ctx.beginPath();

    var lado_m1 = (rel_1) * 15 + 25;
    var lado_m2 = (rel_2) * 15 + 25;

    ctx.rect((ancho / 2) - 125 + 20 - lado_m1 / 2, 60 + c * p - lado_m1, lado_m1, lado_m1);    //(pos x, pos y, dim x, dim y)
    ctx.rect((ancho / 2) + 125 - 30 - lado_m2 / 2, 60 - c * p - lado_m2, lado_m2, lado_m2);

    ctx.stroke();
    ctx.fill();

    ctx.closePath();
}

function factor_conversion(unidad) {
    unidad = document.getElementById("u" + unidad).value;
    if (unidad == "g")
        return (1 / 1000);

    if (unidad == "cm2")
        return (1 / 10000);

    return 1;
}

// variables nombre y unombre 

function verificar() {
    var estado = true;
    var stringerror;
    if (document.getElementById("area1").value <= 0) {
        estado = false;
        stringerror = "El area no puede ser negativa";
    }
    if (document.getElementById("masa1").value <= 0) {
        estado = false;
        stringerror = "La masa no puede ser negativa";
    }

    if (document.getElementById("masa2").value <= 0 && document.getElementById("area2").value <= 0) {
        estado = false;
        stringerror = "Los datos no pueden ser negativos o nulos";
    }

    //////////////////falta checkar la otra       "     "           *********************

    if (estado == true)
        calculos();
    else
        alert("ESTO NO FUNCA: " + stringerror);
}