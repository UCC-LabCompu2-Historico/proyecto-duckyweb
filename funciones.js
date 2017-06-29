/**
 * Created by nelon on 23/5/2017.
 */

/*
 Descripción
 * @method Nombre de la función
 * @param Parámetro A
 * @param Parámetro B
 * @return Valor que retorna
 */


/*
 * Oculta y/o muestra los datos dependiendo de lo que se desea calcular (ver technical_issues.txt)
 * @method mostrarocultar
 * @param incognita (area|altura|masa)
 */

function mostrarocultar(incognita) {
    resetear();
    sacar_error();
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

/*
 Interpreta la incognita y conduce a la funcion correspondiente para calcularla
 * @method calculos
 * */

function calculos() {
    sacar_error();
    if (document.getElementById("area").checked) {
        calcular_Area();
    }
    if (document.getElementById("masa").checked) {
        calcular_Masa();
    }
}

/*
 realiza los calculos y muestra resultado para area y presión
 * @method calcular_Area
 * */

function calcular_Area() {
    //Incognita es Area, datos 1 conocidos, y altura 2
    var a1 = document.getElementById("area1").value * factor_conversion("area1");
    var m1 = document.getElementById("masa1").value * factor_conversion("masa1");
    var m2 = document.getElementById("masa2").value * factor_conversion("masa2");

    var a2 = a1 * (m2 / m1);

    var pres = (m1 * 9.81) / a1;

    dibujar(a1, m1, a2, m2, pres);

    a2 = Math.round(a2 * 1000) / 1000;
    pres = Math.round(pres * 1000) / 1000;

    document.getElementById("prueba_resultado").innerHTML = a2 + " m2";
    document.getElementById("presion_resultado").innerHTML = pres + " N/m2";
}

/*
 realiza los calculos y muestra resultado para masa y presión
 * @method calcular_Masa
 * */

function calcular_Masa() {
    var a1 = document.getElementById("area1").value * factor_conversion("area1");
    var m1 = document.getElementById("masa1").value * factor_conversion("masa1");
    var a2 = document.getElementById("area2").value * factor_conversion("area2");

    var m2 = m1 * (a2 / a1);

    var pres = (m1 * 9.81) / a1;

    dibujar(a1, m1, a2, m2, pres);

    m2 = Math.round(m2 * 1000) / 1000;
    pres = Math.round(pres * 1000) / 1000;

    document.getElementById("prueba_resultado").innerHTML = m2 + " m&sup2";
    document.getElementById("presion_resultado").innerHTML = pres + " N/m&sup2";
}

/*
 Representa la sitación física a través de un gráfico (canvas) realizando los calculos necesarios para ello
 * @method dibujar
 * @param a1 (area 1)
 * @param m1 (masa 1)
 * @param a2 (area 2)
 * @param m2 (masa 2)
 * @param pres (presion)
 *
 * NOTA: altura base (yo) permite desplazar todo el gráfico hacia arriba o hacia abajo
 *
 * NOTA: en los ctx.rect no se simplifican u operan las constantes utilizadas, para mejor comprensión de
 * su funcionamiento, como así también para una sencilla modificación posterior
 *
 * NOTA: ancho canvas= 900 alto= 440
 *
 * */

function dibujar(a1, m1, a2, m2, pres) {
    var canvas = document.getElementById("mycanvas");
    var ctx = canvas.getContext("2d");


    canvas.width = 1800;
    canvas.height = 880;

    var ancho = canvas.width;
    var alto = canvas.height;

    var ratio = 1;

    var ppcion = 6;

    var yo = 10 * ppcion;

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

    var relacion_areas = 0;
    if (a1 > a2)
        relacion_areas = 20;
    if (a1 == a2)
        relacion_areas = 10;


    var ar_1 = 10, ar_2 = 20;
    if (a1 > a2) {
        ar_1 = 20;
        ar_2 = 10;
    }
    if (a1 === a2) {
        ar_2 = 10;
    }

    var p = pres;
    if (pres >= 20)
        p = 20;

    if (m1 == m2 && a1 == a2)
        p = 0;

    var c;
    if (a1 > a2)
        c = 1;
    else
        c = -1;

    var ilatina = 0;

    var int = setInterval(function () {
        canvas.width = canvas.width;
        canvas.height = canvas.height;

        ctx.strokeStyle = "#9e9fa6";
        ctx.fillStyle = "#1d0bff";
        ctx.lineWidth = "50";  //8

        ctx.beginPath();

        ctx.rect(((ancho / 2) - 125 * ppcion) * ratio, (alto - yo - 30 * ppcion) * ratio, 250 * ratio * ppcion, 30 * ratio * ppcion);   //base prensa
        ctx.rect(((ancho / 2) - 125 * ppcion) * ratio, (alto - yo - 60 * ppcion + c * ilatina) * ratio, (40 * ppcion + relacion_areas) * ratio, 60 * ppcion - c * ilatina * ratio);       //lado izq
        ctx.rect(((ancho / 2) + (125 - 60) * ppcion + relacion_areas) * ratio, (alto - yo - 60 * ppcion - c * ilatina) * ratio, 60 * ppcion - relacion_areas * ratio, (60 * ppcion + c * ilatina) * ratio);     //lado der
        ctx.stroke();
        ctx.fill();

        ctx.closePath();

        ctx.strokeStyle = "#DB871E";
        ctx.fillStyle = "#e29f4a";

        ctx.beginPath();

        var lado_m1 = (rel_1) * 15 + 25;
        var lado_m2 = (rel_2) * 15 + 25;

        ctx.rect((ancho / 2) - 125 * ppcion + (40 * ppcion + relacion_areas) / 2 - lado_m1 * ppcion / 2, (alto - yo - 60 * ppcion + c * ilatina) - lado_m1 * ppcion - 60, lado_m1 * ppcion, lado_m1 * ppcion);  //masa 1 izq

        ctx.rect(((ancho / 2) + (125 - 60) * ppcion + relacion_areas) + (60 * ppcion - relacion_areas) / 2 - lado_m2 * ppcion / 2, (alto - yo - 60 * ppcion - c * ilatina) - lado_m2 * ppcion - 60, lado_m2 * ppcion, lado_m2 * ppcion);    //masa 2 der

        ctx.stroke();
        ctx.fill();

        ctx.closePath();

        ctx.closePath();

        ctx.font = "60pt Amatic SC";
        ctx.fillStyle = '#48A';
        ctx.strokeStyle = '#0FF';

        ctx.beginPath();

        ctx.fillText("m1", (ancho / 2) - 125 * ppcion + (40 * ppcion + relacion_areas) / 2 - lado_m1 * ppcion / 2 - 25 * ppcion, (alto - yo - 60 * ppcion + c * ilatina) - lado_m1 * ppcion - 60 + lado_m1 * ppcion / 2);
        ctx.fillText("m2", ((ancho / 2) + (125 - 60) * ppcion + relacion_areas) + (60 * ppcion - relacion_areas) / 2 - lado_m2 * ppcion / 2 - 25 * ppcion, (alto - yo - 60 * ppcion - c * ilatina) - lado_m2 * ppcion - 60 + lado_m2 * ppcion / 2);

        ctx.fill();
        ctx.stroke();

        ctx.closePath();
        if (ilatina < p)
            ilatina++;
        else
            clearInterval(int);

    }, 1000 / 30);
}

/*
 Realiza la conversión de unidades al sistema internacional (MKS)
 * @method factor_conversion
 * @param dimensión del dato (metros, kilos, centímetros, gramos)
 * @return devuelve el valor equivalente de lo ingresado en MKS
 * */

function factor_conversion(unidad) {
    unidad = document.getElementById("u" + unidad).value;
    if (unidad == "g")
        return (1 / 1000);

    if (unidad == "cm2")
        return (1 / 10000);

    return 1;
}

/*
 comprueba que los datos ingresados en la página, se correspondan con su sentido físico
 * @method verificar;
 *
 * NOTA: hace llamadas a funciones como sacar_error y calculos
 * */

function verificar() {
    sacar_error();
    var estado = true;
    var stringerror;
    if (document.getElementById("area1").value <= 0) {
        estado = false;
        stringerror = "El area debe ser un número positivo";
        document.getElementById("area1").style.border = '4px solid #b21020';
    }
    if (document.getElementById("masa1").value <= 0) {
        estado = false;
        stringerror = "La masa debe ser un número positivo";
        document.getElementById("masa1").style.border = '4px solid #b21020';
    }

    if (document.getElementById("masa2").value <= 0 && document.getElementById("area2").value <= 0) {
        estado = false;
        stringerror = "El valor del último campo debe ser positivo";
        document.getElementById("masa2").style.border = '4px solid #b21020';
        document.getElementById("area2").style.border = '4px solid #b21020';
    }

    if (estado == true)
        calculos();
    else
        alert("Ups, dato erroneo! " + stringerror);
}

/*
 Elimina el contenido de los inputs de la pagina
 * @method resetear
 * */

function resetear() {
    sacar_error();
    document.getElementById("area1").value = "";
    document.getElementById("area2").value = "";
    document.getElementById("masa1").value = "";
    document.getElementById("masa2").value = "";

    document.getElementById("prueba_resultado").value = "";
    document.getElementById("presion_resultado").value = "";

    var canvas = document.getElementById("mycanvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/*
 rellena los inputs con valores aleatorios
 * @method randomear
 * */

function randomear() {
    sacar_error();
    resetear();
    document.getElementById("area1").value = Math.random() * 10;
    document.getElementById("area2").value = Math.random() * 10;
    document.getElementById("masa1").value = Math.random() * 10;
    document.getElementById("masa2").value = Math.random() * 10;
}

/*
 Elimina los bordes rojos de los inputs con valores erroneos
 * @method sacar_error
 * */

function repetir() {
    verificar();
}

function borracanvas() {
    var canvas = document.getElementById("mycanvas");
    var ctx = canvas.getContext("2d");
    canvas.width = canvas.width;
}

function sacar_error() {
    document.getElementById("area1").style.border = '';
    document.getElementById("masa1").style.border = '';
    document.getElementById("masa2").style.border = '';
    document.getElementById("area2").style.border = '';
}