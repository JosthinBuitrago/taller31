const canvas = document.getElementById('micanvas');
const ctx = canvas.getContext('2d');

let xmin = 100;
let ymin = 100;
let xmax = 400;
let ymax = 300;

// indice para saber que linea estamos viendo (0 a 4)
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

// funciones de dibujo 1 y 2

function dibujarventana(contexto, x1, y1, x2, y2) {
    contexto.clearrect(0, 0, canvas.width, canvas.height);
    contexto.beginpath();
    contexto.strokestyle = "blue"; 
    contexto.linewidth = 2;
    contexto.strokerect(x1, y1, x2 - x1, y2 - y1);
    contexto.stroke();
    return "ventana dibujada"; 
}

// segunda funcion permitida: dibuja una linea

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

// navegacion y eventos

// esta parte controla que se ve en pantalla cada vez que presionas algo
function refrescar() {
    dibujarventana(ctx, xmin, ymin, xmax, ymax);
    
    let l = lineas[indice];
    // dibujamos la linea original en gris
    dibujartrazado(ctx, l.p1.x, l.p1.y, l.p2.x, l.p2.y, "#cccccc");
    
    // actualizamos la informacion de texto
    document.getElementById("txtp1").innertext = "p1: (" + l.p1.x + ", " + l.p1.y + ")";
    document.getElementById("txtp2").innertext = "p2: (" + l.p2.x + ", " + l.p2.y + ")";
    document.getElementById("txtpc1").innertext = "pc1: pendiente";
    document.getElementById("txtpc2").innertext = "pc2: pendiente";
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

// ejecucion inicial
refrescar();