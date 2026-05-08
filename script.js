// configuracion inicial
const canvas = document.getElementById('micanvas');
const ctx = canvas.getContext('2d');

// variables de la ventana de recorte (viewport)
let xmin = 100;
let ymin = 100;
let xmax = 400;
let ymax = 300;

// arreglo con los 5 casos de prueba (lineas)
const lineasprueba = [
    { p1: {x: 150, y: 150}, p2: {x: 350, y: 250} }, // caso 1: totalmente adentro
    { p1: {x: 20, y: 20}, p2: {x: 80, y: 80} },     // caso 2: totalmente afuera
    { p1: {x: 50, y: 150}, p2: {x: 200, y: 150} },  // caso 3: corta un solo borde
    { p1: {x: 50, y: 50}, p2: {x: 450, y: 350} },   // caso 4: corta dos bordes
    { p1: {x: 250, y: 50}, p2: {x: 250, y: 350} }   // caso 5: corta superior e inferior
];

// funciones de dibujo (1 de 2 permitidas)

/**
 * funcion exclusiva para trazar el viewport (ventana de recorte)
 * recibe parametros y retorna un resultado
 */
function dibujarventana(contexto, x1, y1, x2, y2) {
    contexto.beginpath();
    contexto.strokestyle = "blue"; 
    contexto.linewidth = 1;
    // trazamos el rectangulo
    contexto.strokerect(x1, y1, x2 - x1, y2 - y1);
    contexto.closepath();
    
    return "ventana dibujada"; 
}

// dibujo inicial
dibujarventana(ctx, xmin, ymin, xmax, ymax);