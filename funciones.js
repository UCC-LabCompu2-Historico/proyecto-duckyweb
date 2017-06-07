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

    switch (incognita) {
        case "area":
            v1 = document.getElementById("altura2").value;
            v2 = document.getElementById("area1").value;
            v3 = document.getElementById("altura1").value;

            u1 = document.getElementById("unidadesalt2").value;
            u2 = document.getElementById("unidadesa1").value;
            u3 = document.getElementById("unidadesalt1").value;

            break;
        case "altura":

            v1 = document.getElementById("masa2").value;
            v2 = document.getElementById("altura1").value;
            v3 = document.getElementById("masa1").value;

            u1 = document.getElementById("unidadesm2").value;
            u2 = document.getElementById("unidadesalt1").value;
            u3 = document.getElementById("unidadesm1").value;

            break;
        case "masa":

            v1 = document.getElementById("masa1").value;
            v2 = document.getElementById("area2").value;
            v3 = document.getElementById("area1").value;

            u1 = document.getElementById("unidadesm1").value;
            u2 = document.getElementById("unidadesa2").value;
            u3 = document.getElementById("unidadesa1").value;

            break;
    }

    document.getElementById("prueba_resultado").innerHTML = v1 *  factor_conversion(u1) * v2 * factor_conversion(u2)  / (v3 * factor_conversion(u3));
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

