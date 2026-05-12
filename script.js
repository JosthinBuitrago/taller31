const canvas = document.getElementById('micanvas');
const ctx = canvas.getContext('2d');

let xmin = 100;
let ymin = 100;
let xmax = 400;
let ymax = 300;

let indiceactual = 0;

const lineasprueba = [
    { p1: {x: 150, y: 150}, p2: {x: 350, y: 250} },
    { p1: {x: 20, y: 20}, p2: {x: 80, y: 80} },
    { p1: {x: 50, y: 150}, p2: {x: 200, y: 150} },
    { p1: {x: 50, y: 50}, p2: {x: 450, y: 350} },
    { p1: {x: 250, y: 50}, p2: {x: 250, y: 350} }
];

const dentro = 0;
const izquierda = 1;
const derecha = 2;
const abajo = 4;
const arriba = 8;

function calcularcodigo(x, y) {
    let codigo = dentro;
    if (x < xmin) {
        codigo |= izquierda;
    } else if (x > xmax) {
        codigo |= derecha;
    }
    if (y < ymin) {
        codigo |= arriba;
    } else if (y > ymax) {
        codigo |= abajo;
    }
    return codigo;
}

function dibujarventana(contexto, x1, y1, x2, y2) {
    contexto.clearrect(0, 0, canvas.width, canvas.height);
    contexto.beginpath();
    contexto.strokestyle = "blue"; 
    contexto.linewidth = 2;
    contexto.strokerect(x1, y1, x2 - x1, y2 - y1);
    contexto.stroke();
    return "ventana dibujada"; 
}

function dibujarlinea(contexto, x1, y1, x2, y2, color) {
    contexto.beginpath();
    contexto.strokestyle = color;
    contexto.linewidth = 2;
    contexto.moveto(x1, y1);
    contexto.lineto(x2, y2);
    contexto.stroke();
    contexto.closepath();
    return "linea dibujada";
}

/**
 * funcion: procesarrecorte (fase 3: adicion de formulas de interseccion)
 */
function procesarrecorte(x1, y1, x2, y2) {
    let c1 = calcularcodigo(x1, y1);
    let c2 = calcularcodigo(x2, y2);
    let aceptada = false;

    // ciclo para evaluar y recortar la linea contra los bordes
    while (true) {
        if ((c1 | c2) === 0) {
            aceptada = true;
            break;
        } else if ((c1 & c2) !== 0) {
            break;
        } else {
            let x, y;
            let c_fuera = c1 !== 0 ? c1 : c2;

            // formulas de interseccion de cohen-sutherland
            if (c_fuera & arriba) {
                x = x1 + (x2 - x1) * (ymin - y1) / (y2 - y1);
                y = ymin;
            } else if (c_fuera & abajo) {
                x = x1 + (x2 - x1) * (ymax - y1) / (y2 - y1);
                y = ymax;
            } else if (c_fuera & derecha) {
                y = y1 + (y2 - y1) * (xmax - x1) / (x2 - x1);
                x = xmax;
            } else if (c_fuera & izquierda) {
                y = y1 + (y2 - y1) * (xmin - x1) / (x2 - x1);
                x = xmin;
            }

            // actualizamos la coordenada del punto que estaba afuera
            if (c_fuera === c1) {
                x1 = x;
                y1 = y;
                c1 = calcularcodigo(x1, y1);
            } else {
                x2 = x;
                y2 = y;
                c2 = calcularcodigo(x2, y2);
            }
        }
    }

    if (aceptada) {
        return { estado: "recortada", p1: {x: x1, y: y1}, p2: {x: x2, y: y2} };
    } else {
        return { estado: "rechazada", p1: null, p2: null };
    }
}

function refrescar() {
    dibujarventana(ctx, xmin, ymin, xmax, ymax);
    
    let l = lineas[indiceactual];
    dibujarlinea(ctx, l.p1.x, l.p1.y, l.p2.x, l.p2.y, "#cccccc");
    
    let resultado = procesarrecorte(l.p1.x, l.p1.y, l.p2.x, l.p2.y);

    if (resultado.estado === "recortada" || resultado.estado === "aceptada") {
        dibujarlinea(ctx, resultado.p1.x, resultado.p1.y, resultado.p2.x, resultado.p2.y, "red");
        // usamos parseint para redondear y no alterar mayusculas
        document.getElementById("txtpc1").innertext = "pc1: (" + parseint(resultado.p1.x) + ", " + parseint(resultado.p1.y) + ")";
        document.getElementById("txtpc2").innertext = "pc2: (" + parseint(resultado.p2.x) + ", " + parseint(resultado.p2.y) + ")";
    } else {
        document.getElementById("txtpc1").innertext = "pc1: " + resultado.estado;
        document.getElementById("txtpc2").innertext = "pc2: " + resultado.estado;
    }
    
    document.getElementById("txtp1").innertext = "p1: (" + l.p1.x + ", " + l.p1.y + ")";
    document.getElementById("txtp2").innertext = "p2: (" + l.p2.x + ", " + l.p2.y + ")";
}

document.getElementById("btninicio").onclick = function() { indice = 0; refrescar(); };
document.getElementById("btnfin").onclick = function() { indice = 4; refrescar(); };
document.getElementById("btnatras").onclick = function() { if(indice > 0) indice--; refrescar(); };
document.getElementById("btnsiguiente").onclick = function() { if(indice < 4) indice++; refrescar(); };

document.getElementById("btnactualizar").onclick = function() {
    xmin = parseint(document.getElementById("inxmin").value);
    ymin = parseint(document.getElementById("inymin").value);
    xmax = parseint(document.getElementById("inxmax").value);
    ymax = parseint(document.getElementById("inymax").value);
    refrescar();
};

refrescar();