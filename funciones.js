/**
 * Created by nelon on 23/5/2017.
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
    if (document.getElementById("area").checked)
        calcular_Area();

    if (document.getElementById("masa").checked)
        calcular_Masa();
}

/*
 Realiza los calculos y muestra resultado para area y presión
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

    document.getElementById("prueba_resultado").innerHTML = a2 + " m&sup2";
    document.getElementById("presion_resultado").innerHTML = pres + " N/m&sup2";
}

/*
 Realiza los cálculos y muestra resultado para masa y presión
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

    document.getElementById("prueba_resultado").innerHTML = m2 + " kg";
    document.getElementById("presion_resultado").innerHTML = pres + " N/m&sup2";
}

/*
 Representa la situación física a través de un gráfico (canvas) realizando los cálculos necesarios para ello
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
 * NOTA: se utiliza set interval para animar el canvas
 *
 * */

function dibujar(a1, m1, a2, m2, pres) {
    cargalink(a1, m1, a2, m2);

    var canvas = document.getElementById("mycanvas");
    var ctx = canvas.getContext("2d");

    canvas.width = 1800;
    canvas.height = 880;

    var ancho = canvas.width;
    var alto = canvas.height;

    var ppcion = 6;

    var yo = 10 * ppcion;

    var j = 0;

    var m1c = m1;
    var m2c = m2;

    while (m1c >= 100000 || m2c >= 100000) {
        m1c /= 10;
        m2c /= 10;
    }

    if (m1c > m2c) {
        do
            j++;
        while (m1c * 10 / j > 50);
    }
    if (m2c > m1c) {
        do
            j++;
        while (m2c * 10 / j > 50);
    }

    if (m1c * ppcion <= 30)
        m1c = 30 / ppcion;

    if (m2c * ppcion <= 30)
        m2c = 30 / ppcion;

    if (m1c === m2c) {
        m1c = 25 / ppcion;
        m2c = 25 / ppcion;
        j = 1;
    }


    var relacion_areas = 0;
    if (a1 > a2)
        relacion_areas = 20;
    if (a1 === a2)
        relacion_areas = 10;

    /*
     var ar_1 = 10, ar_2 = 20;
     if (a1 > a2) {
     ar_1 = 20;
     ar_2 = 10;
     }
     if (a1 === a2) {
     ar_2 = 10;
     }
     */
    var p = pres;
    if (pres >= 20)
        p = 20;

    if (m1 === m2 && a1 === a2)
        p = 0;

    var c;
    if (a1 > a2)
        c = 1;
    else
        c = -1;

    var i = 0;

    var int = setInterval(function () {
        canvas.width = canvas.width;
        canvas.height = canvas.height;

        ctx.strokeStyle = "#9e9fa6";
        ctx.fillStyle = "#1d0bff";
        ctx.lineWidth = "50";

        ctx.beginPath();

        ctx.rect(((ancho / 2) - 125 * ppcion), (alto - yo - 30 * ppcion), 250 * ppcion, 30 * ppcion);   //base prensa
        ctx.rect(((ancho / 2) - 125 * ppcion), (alto - yo - 60 * ppcion + c * i), (40 * ppcion + relacion_areas * ppcion), 60 * ppcion - c * i);       //lado izq
        ctx.rect(((ancho / 2) + (125 - 60) * ppcion + relacion_areas * ppcion), (alto - yo - 60 * ppcion - c * i), 60 * ppcion - relacion_areas * ppcion, (60 * ppcion + c * i));     //lado der
        ctx.stroke();
        ctx.fill();

        ctx.closePath();

        ctx.strokeStyle = "#DB871E";
        ctx.fillStyle = "#e29f4a";

        ctx.beginPath();

        var lado_m1 = m1c * 10 / j;
        var lado_m2 = m2c * 10 / j;

        ctx.rect((ancho / 2) - 125 * ppcion + (40 * ppcion + relacion_areas * ppcion) / 2 - lado_m1 * ppcion / 2, (alto - yo - 60 * ppcion + c * i) - lado_m1 * ppcion - 60, lado_m1 * ppcion, lado_m1 * ppcion);  //masa 1 izq
        ctx.rect(((ancho / 2) + (125 - 60) * ppcion + relacion_areas * ppcion) + (60 * ppcion - relacion_areas * ppcion) / 2 - lado_m2 * ppcion / 2, (alto - yo - 60 * ppcion - c * i) - lado_m2 * ppcion - 60, lado_m2 * ppcion, lado_m2 * ppcion);    //masa 2 der

        ctx.stroke();
        ctx.fill();

        ctx.closePath();

        ctx.font = "60pt Amatic SC";
        ctx.fillStyle = '#48A';
        ctx.strokeStyle = '#0FF';

        ctx.beginPath();

        ctx.fillText("m1", (ancho / 2) - 125 * ppcion + (40 * ppcion + relacion_areas) / 2 - lado_m1 * ppcion / 2 - 20 * ppcion, (alto - yo - 60 * ppcion + c * i) - lado_m1 * ppcion - 60 + lado_m1 * ppcion / 2);
        ctx.fillText("m2", ((ancho / 2) + (125 - 60) * ppcion + relacion_areas) + (60 * ppcion - relacion_areas) / 2 - lado_m2 * ppcion / 2 - 20 * ppcion, (alto - yo - 60 * ppcion - c * i) - lado_m2 * ppcion - 60 + lado_m2 * ppcion / 2);

        ctx.fill();
        ctx.stroke();

        ctx.closePath();
        if (i < p)
            i++;
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
 Comprueba que los datos ingresados en la página, se correspondan con su sentido físico
 * @method verificar;
 *
 * NOTA: hace llamadas a funciones como sacar_error y calculos
 * */

function verificar() {
    sacar_error();
    var estado = true;
    var stringerror;
    var count = 0;
    if (document.getElementById("area1").value <= 0) {
        estado = false;
        stringerror = "El área debe ser un número positivo";
        document.getElementById("area1").style.border = '4px solid #b21020';
        count++;
    }

    if (document.getElementById("masa1").value <= 0) {
        estado = false;
        stringerror = "La masa debe ser un número positivo";
        document.getElementById("masa1").style.border = '4px solid #b21020';
        count++;
    }

    if (document.getElementById("area").checked && document.getElementById("masa2").value <= 0) {
        estado = false;
        stringerror = "La masa debe ser un número positivo";
        document.getElementById("masa2").style.border = '4px solid #b21020';
        count++;
    }

    if (document.getElementById("masa").checked && document.getElementById("area2").value <= 0) {
        estado = false;
        stringerror = "El área debe ser un número positivo";
        document.getElementById("area2").style.border = '4px solid #b21020';
        count++;
    }

    if (count > 1)
        stringerror = "Ingrese los valores correctos para calcular";

    if (estado === true)
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
 Rellena los inputs con valores aleatorios
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

function sacar_error() {
    document.getElementById("area1").style.border = '';
    document.getElementById("masa1").style.border = '';
    document.getElementById("masa2").style.border = '';
    document.getElementById("area2").style.border = '';
}

/*
 Elimina el contenido del canvas
 * @method borracanvas
 * */

function borracanvas() {
    var canvas = document.getElementById("mycanvas");
    var ctx = canvas.getContext("2d");
    canvas.width = canvas.width;
}

/*
 Modifica el link con los datos ingresados por el usuario
 * @method cargalink
 * @param area 1
 * @param masa 1
 * @param area 2
 * @param masa 2
 *
 * NOTA: esta función tiene razón de ser al utilizar repetir
 *
 * */

function cargalink(a1, m1, a2, m2) {
    var link = "#" + a1 + "#" + m1 + "#" + a2 + "#" + m2;
    window.location.replace(link);
}

/*
 Vuelve a graficar los últimos datos calculados
 * @method repetir
 *
 * NOTA: recibe los datos cargados en la url
 * */

function repetir() {
    var cadena = window.location.hash.split("#");
    document.getElementById("area1").value = cadena[1];
    document.getElementById("uarea1").value = "m2";
    document.getElementById("masa1").value = cadena[2];
    document.getElementById("umasa1").value = "kg";
    document.getElementById("area2").value = cadena[3];
    document.getElementById("uarea2").value = "m2";
    document.getElementById("masa2").value = cadena[4];
    document.getElementById("umasa2").value = "kg";

    verificar();
}