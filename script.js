const canvas = document.getElementById('micanvas');
const ctx = canvas.getContext('2d');

let xmin = 100;
let ymin = 100;
let xmax = 400;
let ymax = 300;

const lineasprueba = [
    { p1: {x: 150, y: 150}, p2: {x: 350, y: 250} },
    { p1: {x: 20, y: 20}, p2: {x: 80, y: 80} },
    { p1: {x: 50, y: 150}, p2: {x: 200, y: 150} },
    { p1: {x: 50, y: 50}, p2: {x: 450, y: 350} },
    { p1: {x: 250, y: 50}, p2: {x: 250, y: 350} }
];

// constantes para los codigos de region (bits tbrl)
const dentro = 0;    // 0000
const izquierda = 1; // 0001
const derecha = 2;   // 0010
const abajo = 4;     // 0100
const arriba = 8;    // 1000

// 2. funciones de logica (fase 1)

/**
 * calcula el codigo de 4 bits para un punto dado
 * @param {number} x - coordenada x
 * @param {number} y - coordenada y
 * @returns {number} codigo de region
 */
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

// funciones de dibujo (1 de 2 permitidas)

function dibujarventana(contexto, x1, y1, x2, y2) {
    contexto.beginpath();
    contexto.strokestyle = "blue"; 
    contexto.linewidth = 1;
    contexto.strokerect(x1, y1, x2 - x1, y2 - y1);
    contexto.closepath();
    
    return "ventana dibujada"; 
}

dibujarventana(ctx, xmin, ymin, xmax, ymax);

// prueba de logica de bits en consola
console.log("--- prueba de codigos de region ---");
console.log("punto central (250, 200):", calcularcodigo(250, 200)); // deberia dar 0
console.log("punto arriba izq (50, 50):", calcularcodigo(50, 50)); // deberia dar 9 (8+1)